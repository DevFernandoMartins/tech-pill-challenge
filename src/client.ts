import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../proto/consorcio.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const consortium = protoDescriptor.consortium as any;

class SimpleGrpcClient {
  private personClient: any;
  private planClient: any;
  private contractedPlanClient: any;

  constructor(serverAddress: string = 'localhost:50051') { // Foi colocado localhost:50051 para testar localmente, mas deve ser alterado para o endereço do servidor
    this.personClient = new consortium.PersonService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
    this.planClient = new consortium.PlanService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
    this.contractedPlanClient = new consortium.ContractedPlanService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
  }

  async listPersons(page: number = 1, limit: number = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this.personClient.listPersons({ page, limit }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async getPerson(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.personClient.getPerson({ id }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async createPerson(name: string, cpf: string, email: string, phone: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.personClient.createPerson({ name, cpf, email, phone }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async updatePerson(id: number, name: string, cpf: string, email: string, phone: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.personClient.updatePerson({ id, name, cpf, email, phone }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async deletePerson(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.personClient.deletePerson({ id }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async listPlans(page: number = 1, limit: number = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this.planClient.listPlans({ page, limit }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async getPlan(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.planClient.getPlan({ id }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async createPlan(name: string, credit_value: number, installments: number, admin_fee_percentage: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.planClient.createPlan({ name, credit_value, installments, admin_fee_percentage }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async updatePlan(id: number, name: string, credit_value: number, installments: number, admin_fee_percentage: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.planClient.updatePlan({ id, name, credit_value, installments, admin_fee_percentage }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async deletePlan(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.planClient.deletePlan({ id }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async listContractedPlans(page: number = 1, limit: number = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractedPlanClient.listContractedPlans({ page, limit }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async getContractedPlan(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractedPlanClient.getContractedPlan({ id }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async createContractedPlan(person_id: number, plan_id: number, contract_date: string, status: string, paid_installments: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractedPlanClient.createContractedPlan({ person_id, plan_id, contract_date, status, paid_installments }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async updateContractedPlan(id: number, person_id: number, plan_id: number, contract_date: string, status: string, paid_installments: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractedPlanClient.updateContractedPlan({ id, person_id, plan_id, contract_date, status, paid_installments }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async deleteContractedPlan(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractedPlanClient.deleteContractedPlan({ id }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async listByPerson(person_id: number, page: number = 1, limit: number = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractedPlanClient.listByPerson({ person_id, page, limit }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }

  async listByStatus(status: string, page: number = 1, limit: number = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractedPlanClient.listByStatus({ status, page, limit }, (error: any, response: any) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }
}

export default SimpleGrpcClient;
