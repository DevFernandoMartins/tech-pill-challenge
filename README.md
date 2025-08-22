# 🔧 Documentação Técnica - API gRPC do Consórcio

## 🏗️ Visão Geral da Arquitetura

### **Arquitetura do Sistema**

```
┌─────────────────────────────────────────────────────────────┐
│                 Aplicações Cliente                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Web App   │  │  Mobile App │  │  CLI Tools  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Camada API gRPC                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │PersonService│  │ PlanService │  │ContractedPlan│         │
│  │             │  │             │  │   Service   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Camada de Lógica de Negócio                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │PersonService│  │ PlanService │  │ContractedPlan│         │
│  │Implementation│ │Implementation│ │Service Impl.│          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Camada de Acesso a Dados                  │
│                    ┌─────────────────┐                      │
│                    │   Prisma ORM    │                      │
│                    │   (Type-safe)   │                      │
│                    └─────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Banco de Dados MySQL                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Persons   │  │    Plans    │  │Contracted   │          │
│  │   Table     │  │   Table     │  │ Plans Table │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### **Detalhes da Stack Tecnológica**

| Componente | Tecnologia | Versão | Propósito |
|-----------|------------|---------|---------|
| **Protocolo** | gRPC | 1.13.4 | Framework RPC de alta performance |
| **Serialização** | Protocol Buffers | 3.x | Serialização binária eficiente |
| **Linguagem** | TypeScript | 5.9.2 | JavaScript com tipagem |
| **Runtime** | Node.js | 18+ | Runtime JavaScript |
| **ORM do Banco** | Prisma | 6.14.0 | Cliente de banco type-safe |
| **Banco de Dados** | MySQL | 8.0+ | Banco de dados relacional |
| **Desenvolvimento** | nodemon | 3.1.10 | Hot reload para desenvolvimento |

## 📊 Modelo de Dados

### **Entidades Principais**

#### **Person (Pessoa)** 👤
```typescript
{
  id: number;
  name: string;
  cpf: string;        // CPF único brasileiro
  email: string;      // Email único
  phone: string;
  contracted_plans: ContractedPlan[]; // Relacionamento um-para-muitos
}
```

#### **Plan (Plano)** 📋
```typescript
{
  id: number;
  name: string;
  credit_value: number;           // Valor do crédito em centavos
  installments: number;           // Total de parcelas
  admin_fee_percentage: number;   // Percentual de taxa administrativa
  contracted_plans: ContractedPlan[]; // Relacionamento um-para-muitos
}
```

#### **ContractedPlan (Plano Contratado)** 📝
```typescript
{
  id: number;
  person_id: number;
  plan_id: number;
  contract_date: Date;
  status: string;              // 'active' | 'contemplated' | 'defaulting' | 'paid'
  paid_installments: number;
  person: Person;              // Dados da pessoa relacionada
  plan: Plan;                  // Dados do plano relacionado
}
```

## 🚀 Começando

### **Pré-requisitos**
- Node.js 18+ 
- MySQL 8.0+
- npm ou yarn

### **Instalação**

1. **Clone o repositório**
```bash
git clone https://github.com/DevFernandoMartins/tech-pill-challenge/tree/main
cd GANHADOR-DA-NFT
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configuração do Ambiente**
```bash
# Crie o arquivo .env
cp .env.example .env

# Configure seu banco MySQL
DATABASE_URL="mysql://usuario:senha@localhost:3306/klubi"
GRPC_PORT=50051
GRPC_HOST=0.0.0.0
```

4. **Configuração do Banco de Dados**
```bash
# Gere o cliente Prisma e sincronize o banco
npm run setup
```

## 🎮 Uso

### **Iniciando o Servidor**
```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm run build
npm start

# Iniciar servidor diretamente
npm run server
```

### **Testando a API**
```bash
# Execute o cliente de teste
npm run client
```

### **Gerenciamento do Banco de Dados**
```bash
# Gerar cliente Prisma
npm run db:generate

# Enviar schema para o banco
npm run db:push

# Executar migrações
npm run db:migrate

# Abrir Prisma Studio (interface gráfica)
npm run db:studio
```

## 📡 Serviços gRPC

### **1. PersonService** 👥

#### **Listar Pessoas**
```typescript
// Requisição
{
  page?: number;    // Padrão: 1
  limit?: number;   // Padrão: 10
}

// Resposta
{
  persons: Person[];
  total: number;
  page: number;
  total_pages: number;
}
```

#### **Obter Pessoa**
```typescript
// Requisição
{
  id: number;
}

// Resposta
{
  person: Person;
}
```

#### **Criar Pessoa**
```typescript
// Requisição
{
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

// Resposta
{
  person: Person;
}
```

#### **Atualizar Pessoa**
```typescript
// Requisição
{
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

// Resposta
{
  person: Person;
}
```

#### **Deletar Pessoa**
```typescript
// Requisição
{
  id: number;
}

// Resposta
{
  success: boolean;
  message: string;
}
```

### **2. PlanService** 📋

#### **Listar Planos**
```typescript
// Requisição
{
  page?: number;    // Padrão: 1
  limit?: number;   // Padrão: 10
}

// Resposta
{
  plans: Plan[];
  total: number;
  page: number;
  total_pages: number;
}
```

#### **Obter Plano**
```typescript
// Requisição
{
  id: number;
}

// Resposta
{
  plan: Plan;
}
```

#### **Criar Plano**
```typescript
// Requisição
{
  name: string;
  credit_value: number;
  installments: number;
  admin_fee_percentage: number;
}

// Resposta
{
  plan: Plan;
}
```

#### **Atualizar Plano**
```typescript
// Requisição
{
  id: number;
  name: string;
  credit_value: number;
  installments: number;
  admin_fee_percentage: number;
}

// Resposta
{
  plan: Plan;
}
```

#### **Deletar Plano**
```typescript
// Requisição
{
  id: number;
}

// Resposta
{
  success: boolean;
  message: string;
}
```

### **3. ContractedPlanService** 📝

#### **Listar Planos Contratados**
```typescript
// Requisição
{
  page?: number;    // Padrão: 1
  limit?: number;   // Padrão: 10
}

// Resposta
{
  contracted_plans: ContractedPlan[];
  total: number;
  page: number;
  total_pages: number;
}
```

#### **Obter Plano Contratado**
```typescript
// Requisição
{
  id: number;
}

// Resposta
{
  contracted_plan: ContractedPlan;
}
```

#### **Criar Plano Contratado**
```typescript
// Requisição
{
  person_id: number;
  plan_id: number;
  contract_date: string;      // String de data ISO
  status: string;
  paid_installments: number;
}

// Resposta
{
  contracted_plan: ContractedPlan;
}
```

#### **Atualizar Plano Contratado**
```typescript
// Requisição
{
  id: number;
  person_id: number;
  plan_id: number;
  contract_date: string;
  status: string;
  paid_installments: number;
}

// Resposta
{
  contracted_plan: ContractedPlan;
}
```

#### **Deletar Plano Contratado**
```typescript
// Requisição
{
  id: number;
}

// Resposta
{
  success: boolean;
  message: string;
}
```

#### **Listar Por Pessoa** (Consulta Especializada)
```typescript
// Requisição
{
  person_id: number;
  page?: number;
  limit?: number;
}

// Resposta
{
  contracted_plans: ContractedPlan[];
  total: number;
}
```

#### **Listar Por Status** (Consulta Especializada)
```typescript
// Requisição
{
  status: string;
  page?: number;
  limit?: number;
}

// Resposta
{
  contracted_plans: ContractedPlan[];
  total: number;
}
```

## 🔧 Desenvolvimento

### **Estrutura do Projeto**
```
├── proto/
│   └── consorcio.proto          # Definições do protocolo gRPC
├── prisma/
│   ├── schema.prisma           # Schema do banco de dados
│   └── migrations/             # Migrações do banco
├── src/
│   ├── services/               # Camada de lógica de negócio
│   │   ├── PersonService.ts
│   │   ├── PlanService.ts
│   │   └── ContractedPlanService.ts
│   ├── types/
│   │   └── grpc.ts            # Interfaces TypeScript
│   ├── client.ts              # Implementação do cliente gRPC
│   ├── test-client.ts         # Exemplos de uso
│   ├── server.ts              # Servidor gRPC
│   └── app.ts                 # Ponto de entrada da aplicação
├── package.json               # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
└── README.md                 # Esta documentação
```

### **Características Principais**

#### **Type Safety** 🛡️
- Implementação completa em TypeScript
- Tipos Prisma gerados
- Definições de tipos de mensagens gRPC
- Verificação de erros em tempo de compilação

#### **Gerenciamento de Banco de Dados** 🗄️
- Prisma ORM para operações type-safe no banco
- Geração automática de migrações
- Tratamento de relacionamentos
- Pool de conexões

#### **Design da API** 📡
- Design de serviço gRPC similar ao RESTful
- Tratamento consistente de erros
- Suporte a paginação
- Métodos de consulta especializados

#### **Experiência de Desenvolvimento** ⚡
- Hot reload com nodemon
- Compilação TypeScript
- Separação clara de responsabilidades
- Logging abrangente

## 🧪 Testes

### **Testes Manuais**
```bash
# Inicie o servidor
npm run server

# Em outro terminal, execute o cliente de teste
npm run client
```

### **Saída Esperada dos Testes**
```
🚀 Testando Cliente gRPC Simples...

👥 Testando Serviço de Pessoas:
📋 Listando pessoas...
Encontradas 10 pessoas (mostrando 5):
  - Ana Silva (ana.silva@example.com)
  - Bruno Souza (bruno.souza@example.com)
  - Carla Mendes (carla.mendes@example.com)
  - Diego Pereira (diego.pereira@example.com)
  - Eduarda Lima (eduarda.lima@example.com)

📋 Testando Serviço de Planos:
📋 Listando planos...
Encontrados 10 planos (mostrando 5):
  - Consórcio Auto Básico (R$ 50.000,00)
  - Consórcio Imobiliário Popular (R$ 150.000,00)
  - Consórcio Moto Econômico (R$ 20.000,00)
  - Consórcio Auto Premium (R$ 100.000,00)
  - Consórcio Imobiliário Premium (R$ 300.000,00)

📋 Testando Serviço de Planos Contratados:
📋 Listando planos contratados...
Encontrados 10 planos contratados (mostrando 5):
  - Ana Silva - Consórcio Auto Básico (Ativo)
  - Bruno Souza - Consórcio Imobiliário Popular (Contemplado)
  - Carla Mendes - Consórcio Moto Econômico (Inadimplente)
  - Diego Pereira - Consórcio Auto Premium (Ativo)
  - Eduarda Lima - Consórcio Imobiliário Premium (Contemplado)

✅ Todos os testes concluídos com sucesso!
```

## 🔍 Qualidade do Código

### **Configuração TypeScript**
- Modo estrito habilitado
- Source maps para debug
- Geração de arquivos de declaração
- Sistema de módulos CommonJS

### **Tratamento de Erros**
- Respostas de erro graciosas
- Códigos de status HTTP apropriados
- Mensagens de erro detalhadas
- Validação de restrições do banco

### **Considerações de Performance**
- Consultas eficientes ao banco
- Pool de conexões
- Paginação para grandes conjuntos de dados
- Serialização otimizada de mensagens gRPC

## 🚀 Deploy

### **Build de Produção**
```bash
# Build da aplicação
npm run build

# Iniciar servidor de produção
npm start
```

### **Variáveis de Ambiente**
```bash
# Obrigatórias
DATABASE_URL="mysql://usuario:senha@host:porta/banco"

# Opcionais
GRPC_PORT=50051
GRPC_HOST=0.0.0.0
NODE_ENV=production
```

### **Suporte Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 50051
CMD ["npm", "start"]
```

## 📈 Monitoramento e Observabilidade

### **Logging**
- Logging estruturado para todas as operações
- Rastreamento e relatório de erros
- Métricas de performance
- Logging de requisições/respostas

### **Health Checks**
- Verificações de conectividade do banco
- Monitoramento de disponibilidade do serviço
- Tratamento de shutdown gracioso

## 🔐 Considerações de Segurança

### **Validação de Dados**
- Sanitização de entrada
- Validação de tipos
- Aplicação de restrições do banco
- Prevenção de SQL injection (via Prisma)

### **Autenticação e Autorização**
- Pronto para integração JWT
- Estrutura de controle de acesso baseado em roles
- Suporte a gerenciamento de chaves de API

## 🤝 Contribuindo

### **Fluxo de Desenvolvimento**
1. Faça fork do repositório
2. Crie uma branch de feature
3. Implemente mudanças com testes
4. Submeta um pull request
5. Code review e merge

### **Padrões de Código**
- TypeScript modo estrito
- Configuração ESLint
- Formatação Prettier
- Commits convencionais

## 📚 Recursos Adicionais

### **Documentação**
- [Documentação Oficial gRPC](https://grpc.io/docs/)
- [Documentação Prisma](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### **Ferramentas Utilizadas**
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [Node.js gRPC](https://github.com/grpc/grpc-node)
- [Prisma Studio](https://www.prisma.io/studio)
