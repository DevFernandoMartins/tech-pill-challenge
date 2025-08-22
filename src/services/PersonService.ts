import { PrismaClient } from '@prisma/client';
import { GrpcContext, Person, ListPersonsRequest, ListPersonsResponse, GetPersonRequest, GetPersonResponse, CreatePersonRequest, CreatePersonResponse, UpdatePersonRequest, UpdatePersonResponse, DeletePersonRequest, DeletePersonResponse } from '../types/grpc';

export class PersonService {
  private prisma: GrpcContext['prisma'];

  constructor(prisma: GrpcContext['prisma']) {
    this.prisma = prisma;
  }

  async listPersons(request: ListPersonsRequest): Promise<ListPersonsResponse> {
    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    const [persons, total] = await Promise.all([
      this.prisma.person.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' }
      }),
      this.prisma.person.count()
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      persons: persons.map(this.mapPersonToGrpc),
      total,
      page,
      total_pages: totalPages
    };
  }

  async getPerson(request: GetPersonRequest): Promise<GetPersonResponse> {
    const person = await this.prisma.person.findUnique({
      where: { id: request.id }
    });

    if (!person) {
      throw new Error(`Person with ID ${request.id} not found`);
    }

    return {
      person: this.mapPersonToGrpc(person)
    };
  }

  async createPerson(request: CreatePersonRequest): Promise<CreatePersonResponse> {
    const person = await this.prisma.person.create({
      data: {
        name: request.name,
        cpf: request.cpf,
        email: request.email,
        phone: request.phone
      }
    });

    return {
      person: this.mapPersonToGrpc(person)
    };
  }

  async updatePerson(request: UpdatePersonRequest): Promise<UpdatePersonResponse> {
    const person = await this.prisma.person.update({
      where: { id: request.id },
      data: {
        name: request.name,
        cpf: request.cpf,
        email: request.email,
        phone: request.phone
      }
    });

    return {
      person: this.mapPersonToGrpc(person)
    };
  }

  async deletePerson(request: DeletePersonRequest): Promise<DeletePersonResponse> {
    try {
      await this.prisma.person.delete({
        where: { id: request.id }
      });

      return {
        success: true,
        message: `Person with ID ${request.id} deleted successfully`
      };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting person: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private mapPersonToGrpc(person: any): Person {
    return {
      id: person.id,
      name: person.name,
      cpf: person.cpf,
      email: person.email,
      phone: person.phone
    };
  }
}
