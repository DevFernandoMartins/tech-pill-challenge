import { PrismaClient } from '@prisma/client';
import { GrpcContext, ContractedPlan, ListContractedPlansRequest, ListContractedPlansResponse, GetContractedPlanRequest, GetContractedPlanResponse, CreateContractedPlanRequest, CreateContractedPlanResponse, UpdateContractedPlanRequest, UpdateContractedPlanResponse, DeleteContractedPlanRequest, DeleteContractedPlanResponse, ListByPersonRequest, ListByPersonResponse, ListByStatusRequest, ListByStatusResponse } from '../types/grpc';

export class ContractedPlanService {
  private prisma: GrpcContext['prisma'];

  constructor(prisma: GrpcContext['prisma']) {
    this.prisma = prisma;
  }

  async listContractedPlans(request: ListContractedPlansRequest): Promise<ListContractedPlansResponse> {
    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    const [contractedPlans, total] = await Promise.all([
      this.prisma.contractedPlan.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: {
          person: true,
          plan: true
        }
      }),
      this.prisma.contractedPlan.count()
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      contracted_plans: contractedPlans.map(this.mapContractedPlanToGrpc),
      total,
      page,
      total_pages: totalPages
    };
  }

  async getContractedPlan(request: GetContractedPlanRequest): Promise<GetContractedPlanResponse> {
    const contractedPlan = await this.prisma.contractedPlan.findUnique({
      where: { id: request.id },
      include: {
        person: true,
        plan: true
      }
    });

    if (!contractedPlan) {
      throw new Error(`Contracted plan with ID ${request.id} not found`);
    }

    return {
      contracted_plan: this.mapContractedPlanToGrpc(contractedPlan)
    };
  }

  async createContractedPlan(request: CreateContractedPlanRequest): Promise<CreateContractedPlanResponse> {
    const contractedPlan = await this.prisma.contractedPlan.create({
      data: {
        person_id: request.person_id,
        plan_id: request.plan_id,
        contract_date: new Date(request.contract_date),
        status: request.status,
        paid_installments: request.paid_installments
      },
      include: {
        person: true,
        plan: true
      }
    });

    return {
      contracted_plan: this.mapContractedPlanToGrpc(contractedPlan)
    };
  }

  async updateContractedPlan(request: UpdateContractedPlanRequest): Promise<UpdateContractedPlanResponse> {
    const contractedPlan = await this.prisma.contractedPlan.update({
      where: { id: request.id },
      data: {
        person_id: request.person_id,
        plan_id: request.plan_id,
        contract_date: new Date(request.contract_date),
        status: request.status,
        paid_installments: request.paid_installments
      },
      include: {
        person: true,
        plan: true
      }
    });

    return {
      contracted_plan: this.mapContractedPlanToGrpc(contractedPlan)
    };
  }

  async deleteContractedPlan(request: DeleteContractedPlanRequest): Promise<DeleteContractedPlanResponse> {
    try {
      await this.prisma.contractedPlan.delete({
        where: { id: request.id }
      });

      return {
        success: true,
        message: `Contracted plan with ID ${request.id} deleted successfully`
      };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting contracted plan: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async listByPerson(request: ListByPersonRequest): Promise<ListByPersonResponse> {
    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    const [contractedPlans, total] = await Promise.all([
      this.prisma.contractedPlan.findMany({
        where: { person_id: request.person_id },
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: {
          person: true,
          plan: true
        }
      }),
      this.prisma.contractedPlan.count({
        where: { person_id: request.person_id }
      })
    ]);

    return {
      contracted_plans: contractedPlans.map(this.mapContractedPlanToGrpc),
      total
    };
  }

  async listByStatus(request: ListByStatusRequest): Promise<ListByStatusResponse> {
    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    const [contractedPlans, total] = await Promise.all([
      this.prisma.contractedPlan.findMany({
        where: { status: request.status },
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: {
          person: true,
          plan: true
        }
      }),
      this.prisma.contractedPlan.count({
        where: { status: request.status }
      })
    ]);

    return {
      contracted_plans: contractedPlans.map(this.mapContractedPlanToGrpc),
      total
    };
  }

  private mapContractedPlanToGrpc(contractedPlan: any): ContractedPlan {
    return {
      id: contractedPlan.id,
      person_id: contractedPlan.person_id,
      plan_id: contractedPlan.plan_id,
      contract_date: contractedPlan.contract_date.toISOString(),
      status: contractedPlan.status,
      paid_installments: contractedPlan.paid_installments,
      person: contractedPlan.person ? {
        id: contractedPlan.person.id,
        name: contractedPlan.person.name,
        cpf: contractedPlan.person.cpf,
        email: contractedPlan.person.email,
        phone: contractedPlan.person.phone
      } : undefined,
      plan: contractedPlan.plan ? {
        id: contractedPlan.plan.id,
        name: contractedPlan.plan.name,
        credit_value: contractedPlan.plan.credit_value,
        installments: contractedPlan.plan.installments,
        admin_fee_percentage: contractedPlan.plan.admin_fee_percentage
      } : undefined
    };
  }
}
