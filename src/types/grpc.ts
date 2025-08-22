import { PrismaClient } from '@prisma/client';

export interface Person {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

export interface Plan {
  id: number;
  name: string;
  credit_value: number;
  installments: number;
  admin_fee_percentage: number;
}

export interface ContractedPlan {
  id: number;
  person_id: number;
  plan_id: number;
  contract_date: string;
  status: string;
  paid_installments: number;
  person?: Person;
  plan?: Plan;
}

export interface ListPersonsRequest {
  page?: number;
  limit?: number;
}

export interface ListPersonsResponse {
  persons: Person[];
  total: number;
  page: number;
  total_pages: number;
}

export interface GetPersonRequest {
  id: number;
}

export interface GetPersonResponse {
  person: Person;
}

export interface CreatePersonRequest {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

export interface CreatePersonResponse {
  person: Person;
}

export interface UpdatePersonRequest {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

export interface UpdatePersonResponse {
  person: Person;
}

export interface DeletePersonRequest {
  id: number;
}

export interface DeletePersonResponse {
  success: boolean;
  message: string;
}

export interface ListPlansRequest {
  page?: number;
  limit?: number;
}

export interface ListPlansResponse {
  plans: Plan[];
  total: number;
  page: number;
  total_pages: number;
}

export interface GetPlanRequest {
  id: number;
}

export interface GetPlanResponse {
  plan: Plan;
}

export interface CreatePlanRequest {
  name: string;
  credit_value: number;
  installments: number;
  admin_fee_percentage: number;
}

export interface CreatePlanResponse {
  plan: Plan;
}

export interface UpdatePlanRequest {
  id: number;
  name: string;
  credit_value: number;
  installments: number;
  admin_fee_percentage: number;
}

export interface UpdatePlanResponse {
  plan: Plan;
}

export interface DeletePlanRequest {
  id: number;
}

export interface DeletePlanResponse {
  success: boolean;
  message: string;
}

export interface ListContractedPlansRequest {
  page?: number;
  limit?: number;
}

export interface ListContractedPlansResponse {
  contracted_plans: ContractedPlan[];
  total: number;
  page: number;
  total_pages: number;
}

export interface GetContractedPlanRequest {
  id: number;
}

export interface GetContractedPlanResponse {
  contracted_plan: ContractedPlan;
}

export interface CreateContractedPlanRequest {
  person_id: number;
  plan_id: number;
  contract_date: string;
  status: string;
  paid_installments: number;
}

export interface CreateContractedPlanResponse {
  contracted_plan: ContractedPlan;
}

export interface UpdateContractedPlanRequest {
  id: number;
  person_id: number;
  plan_id: number;
  contract_date: string;
  status: string;
  paid_installments: number;
}

export interface UpdateContractedPlanResponse {
  contracted_plan: ContractedPlan;
}

export interface DeleteContractedPlanRequest {
  id: number;
}

export interface DeleteContractedPlanResponse {
  success: boolean;
  message: string;
}

export interface ListByPersonRequest {
  person_id: number;
  page?: number;
  limit?: number;
}

export interface ListByPersonResponse {
  contracted_plans: ContractedPlan[];
  total: number;
}

export interface ListByStatusRequest {
  status: string;
  page?: number;
  limit?: number;
}

export interface ListByStatusResponse {
  contracted_plans: ContractedPlan[];
  total: number;
}

export interface GrpcContext {
  prisma: PrismaClient;
}
