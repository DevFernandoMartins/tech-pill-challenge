import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { PrismaClient } from '@prisma/client';
import { PersonService } from './services/PersonService';
import { PlanService } from './services/PlanService';
import { ContractedPlanService } from './services/ContractedPlanService';
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

const prisma = new PrismaClient();

const personService = new PersonService(prisma);
const planService = new PlanService(prisma);
const contractedPlanService = new ContractedPlanService(prisma);

const server = new grpc.Server();

server.addService(consortium.PersonService.service, {
  listPersons: async (call: any, callback: any) => {
    try {
      const response = await personService.listPersons(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getPerson: async (call: any, callback: any) => {
    try {
      const response = await personService.getPerson(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: error instanceof Error ? error.message : 'Person not found'
      });
    }
  },

  createPerson: async (call: any, callback: any) => {
    try {
      const response = await personService.createPerson(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error creating person'
      });
    }
  },

  updatePerson: async (call: any, callback: any) => {
    try {
      const response = await personService.updatePerson(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error updating person'
      });
    }
  },

  deletePerson: async (call: any, callback: any) => {
    try {
      const response = await personService.deletePerson(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error deleting person'
      });
    }
  }
});

server.addService(consortium.PlanService.service, {
  listPlans: async (call: any, callback: any) => {
    try {
      const response = await planService.listPlans(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getPlan: async (call: any, callback: any) => {
    try {
      const response = await planService.getPlan(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: error instanceof Error ? error.message : 'Plan not found'
      });
    }
  },

  createPlan: async (call: any, callback: any) => {
    try {
      const response = await planService.createPlan(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error creating plan'
      });
    }
  },

  updatePlan: async (call: any, callback: any) => {
    try {
      const response = await planService.updatePlan(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error updating plan'
      });
    }
  },

  deletePlan: async (call: any, callback: any) => {
    try {
      const response = await planService.deletePlan(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error deleting plan'
      });
    }
  }
});

server.addService(consortium.ContractedPlanService.service, {
  listContractedPlans: async (call: any, callback: any) => {
    try {
      const response = await contractedPlanService.listContractedPlans(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  getContractedPlan: async (call: any, callback: any) => {
    try {
      const response = await contractedPlanService.getContractedPlan(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: error instanceof Error ? error.message : 'Contracted plan not found'
      });
    }
  },

  createContractedPlan: async (call: any, callback: any) => {
    try {
      const response = await contractedPlanService.createContractedPlan(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error creating contracted plan'
      });
    }
  },

  updateContractedPlan: async (call: any, callback: any) => {
    try {
      const response = await contractedPlanService.updateContractedPlan(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error updating contracted plan'
      });
    }
  },

  deleteContractedPlan: async (call: any, callback: any) => {
    try {
      const response = await contractedPlanService.deleteContractedPlan(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Error deleting contracted plan'
      });
    }
  },

  listByPerson: async (call: any, callback: any) => {
    try {
      const response = await contractedPlanService.listByPerson(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  },

  listByStatus: async (call: any, callback: any) => {
    try {
      const response = await contractedPlanService.listByStatus(call.request);
      callback(null, response);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error instanceof Error ? error.message : 'Internal server error'
      });
    }
  }
});

const PORT = process.env.GRPC_PORT || 50051;
const HOST = process.env.GRPC_HOST || '0.0.0.0';

server.bindAsync(
  `${HOST}:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error('Failed to bind server:', err);
      return;
    }
    
    server.start();
    console.log(`🚀 gRPC server running on ${HOST}:${port}`);
    console.log('📋 Available services:');
    console.log('  - PersonService');
    console.log('  - PlanService');
    console.log('  - ContractedPlanService');
  }
);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gRPC server...');
  server.tryShutdown(() => {
    console.log('✅ gRPC server stopped');
    prisma.$disconnect().then(() => {
      console.log('✅ Database connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gRPC server...');
  server.tryShutdown(() => {
    console.log('✅ gRPC server stopped');
    prisma.$disconnect().then(() => {
      console.log('✅ Database connection closed');
      process.exit(0);
    });
  });
});
