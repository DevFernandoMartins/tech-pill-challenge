import { PrismaClient } from '@prisma/client';
import { GrpcContext, Plan, ListPlansRequest, ListPlansResponse, GetPlanRequest, GetPlanResponse, CreatePlanRequest, CreatePlanResponse, UpdatePlanRequest, UpdatePlanResponse, DeletePlanRequest, DeletePlanResponse } from '../types/grpc';

export class PlanService {
  private prisma: GrpcContext['prisma'];

  constructor(prisma: GrpcContext['prisma']) {
    this.prisma = prisma;
  }

  async listPlans(request: ListPlansRequest): Promise<ListPlansResponse> {
    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    const [plans, total] = await Promise.all([
      this.prisma.plan.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' }
      }),
      this.prisma.plan.count()
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      plans: plans.map(this.mapPlanToGrpc),
      total,
      page,
      total_pages: totalPages
    };
  }

  async getPlan(request: GetPlanRequest): Promise<GetPlanResponse> {
    const plan = await this.prisma.plan.findUnique({
      where: { id: request.id }
    });

    if (!plan) {
      throw new Error(`Plan with ID ${request.id} not found`);
    }

    return {
      plan: this.mapPlanToGrpc(plan)
    };
  }

  async createPlan(request: CreatePlanRequest): Promise<CreatePlanResponse> {
    const plan = await this.prisma.plan.create({
      data: {
        name: request.name,
        credit_value: request.credit_value,
        installments: request.installments,
        admin_fee_percentage: request.admin_fee_percentage
      }
    });

    return {
      plan: this.mapPlanToGrpc(plan)
    };
  }

  async updatePlan(request: UpdatePlanRequest): Promise<UpdatePlanResponse> {
    const plan = await this.prisma.plan.update({
      where: { id: request.id },
      data: {
        name: request.name,
        credit_value: request.credit_value,
        installments: request.installments,
        admin_fee_percentage: request.admin_fee_percentage
      }
    });

    return {
      plan: this.mapPlanToGrpc(plan)
    };
  }

  async deletePlan(request: DeletePlanRequest): Promise<DeletePlanResponse> {
    try {
      await this.prisma.plan.delete({
        where: { id: request.id }
      });

      return {
        success: true,
        message: `Plan with ID ${request.id} deleted successfully`
      };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting plan: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private mapPlanToGrpc(plan: any): Plan {
    return {
      id: plan.id,
      name: plan.name,
      credit_value: plan.credit_value,
      installments: plan.installments,
      admin_fee_percentage: plan.admin_fee_percentage
    };
  }
}
