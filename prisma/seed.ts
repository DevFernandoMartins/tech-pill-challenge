import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.contractedPlan.deleteMany();
  await prisma.person.deleteMany();
  await prisma.plan.deleteMany();

  const persons = await Promise.all([
    prisma.person.create({
      data: {
        id: 1,
        name: "Ana Silva",
        cpf: "123.456.789-00",
        email: "ana.silva@example.com",
        phone: "+55 11 91234-5678"
      }
    }),
    prisma.person.create({
      data: {
        id: 2,
        name: "Bruno Souza",
        cpf: "987.654.321-00",
        email: "bruno.souza@example.com",
        phone: "+55 11 99876-5432"
      }
    }),
    prisma.person.create({
      data: {
        id: 3,
        name: "Carla Mendes",
        cpf: "111.222.333-44",
        email: "carla.mendes@example.com",
        phone: "+55 21 92345-6789"
      }
    }),
    prisma.person.create({
      data: {
        id: 4,
        name: "Diego Pereira",
        cpf: "555.666.777-88",
        email: "diego.pereira@example.com",
        phone: "+55 31 93456-1122"
      }
    }),
    prisma.person.create({
      data: {
        id: 5,
        name: "Eduarda Lima",
        cpf: "999.888.777-66",
        email: "eduarda.lima@example.com",
        phone: "+55 41 95678-2211"
      }
    }),
    prisma.person.create({
      data: {
        id: 6,
        name: "Felipe Costa",
        cpf: "444.333.222-11",
        email: "felipe.costa@example.com",
        phone: "+55 61 97890-3344"
      }
    }),
    prisma.person.create({
      data: {
        id: 7,
        name: "Gabriela Rocha",
        cpf: "222.111.333-55",
        email: "gabriela.rocha@example.com",
        phone: "+55 85 93456-6677"
      }
    }),
    prisma.person.create({
      data: {
        id: 8,
        name: "Henrique Oliveira",
        cpf: "666.555.444-33",
        email: "henrique.oliveira@example.com",
        phone: "+55 71 92345-7788"
      }
    }),
    prisma.person.create({
      data: {
        id: 9,
        name: "Isabela Martins",
        cpf: "777.888.999-22",
        email: "isabela.martins@example.com",
        phone: "+55 51 95678-8899"
      }
    }),
    prisma.person.create({
      data: {
        id: 10,
        name: "João Almeida",
        cpf: "111.999.888-77",
        email: "joao.almeida@example.com",
        phone: "+55 19 91234-4455"
      }
    })
  ]);

  const plans = await Promise.all([
    prisma.plan.create({
      data: {
        id: 101,
        name: "Basic Auto Consortium",
        credit_value: 50000,
        installments: 60,
        admin_fee_percentage: 15
      }
    }),
    prisma.plan.create({
      data: {
        id: 102,
        name: "Popular Real Estate Consortium",
        credit_value: 150000,
        installments: 180,
        admin_fee_percentage: 12
      }
    }),
    prisma.plan.create({
      data: {
        id: 103,
        name: "Economic Motorcycle Consortium",
        credit_value: 20000,
        installments: 48,
        admin_fee_percentage: 18
      }
    }),
    prisma.plan.create({
      data: {
        id: 104,
        name: "Premium Auto Consortium",
        credit_value: 100000,
        installments: 72,
        admin_fee_percentage: 14
      }
    }),
    prisma.plan.create({
      data: {
        id: 105,
        name: "Premium Real Estate Consortium",
        credit_value: 300000,
        installments: 200,
        admin_fee_percentage: 10
      }
    }),
    prisma.plan.create({
      data: {
        id: 106,
        name: "Services Consortium",
        credit_value: 15000,
        installments: 36,
        admin_fee_percentage: 20
      }
    }),
    prisma.plan.create({
      data: {
        id: 107,
        name: "Home Appliances Consortium",
        credit_value: 10000,
        installments: 24,
        admin_fee_percentage: 22
      }
    }),
    prisma.plan.create({
      data: {
        id: 108,
        name: "Executive Auto Consortium",
        credit_value: 80000,
        installments: 60,
        admin_fee_percentage: 13
      }
    }),
    prisma.plan.create({
      data: {
        id: 109,
        name: "Travel Consortium",
        credit_value: 25000,
        installments: 36,
        admin_fee_percentage: 19
      }
    }),
    prisma.plan.create({
      data: {
        id: 110,
        name: "Health Consortium",
        credit_value: 5000,
        installments: 12,
        admin_fee_percentage: 25
      }
    })
  ]);

  const contractedPlans = await Promise.all([
    prisma.contractedPlan.create({
      data: {
        id: 1001,
        person_id: 1,
        plan_id: 101,
        contract_date: new Date("2023-05-10"),
        status: "active",
        paid_installments: 12
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1002,
        person_id: 2,
        plan_id: 102,
        contract_date: new Date("2022-03-15"),
        status: "contemplated",
        paid_installments: 40
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1003,
        person_id: 3,
        plan_id: 103,
        contract_date: new Date("2024-01-20"),
        status: "defaulting",
        paid_installments: 5
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1004,
        person_id: 4,
        plan_id: 104,
        contract_date: new Date("2023-11-01"),
        status: "active",
        paid_installments: 8
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1005,
        person_id: 5,
        plan_id: 105,
        contract_date: new Date("2021-08-18"),
        status: "contemplated",
        paid_installments: 55
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1006,
        person_id: 6,
        plan_id: 106,
        contract_date: new Date("2024-02-05"),
        status: "active",
        paid_installments: 3
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1007,
        person_id: 7,
        plan_id: 107,
        contract_date: new Date("2022-09-12"),
        status: "paid",
        paid_installments: 24
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1008,
        person_id: 8,
        plan_id: 108,
        contract_date: new Date("2023-07-30"),
        status: "defaulting",
        paid_installments: 6
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1009,
        person_id: 9,
        plan_id: 109,
        contract_date: new Date("2024-03-01"),
        status: "active",
        paid_installments: 2
      }
    }),
    prisma.contractedPlan.create({
      data: {
        id: 1010,
        person_id: 10,
        plan_id: 110,
        contract_date: new Date("2022-12-22"),
        status: "paid",
        paid_installments: 12
      }
    })
  ]);
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
