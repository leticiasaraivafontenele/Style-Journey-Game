# Backend - Style Journey Game

API REST para o jogo educacional Style Journey, focado no aprendizado de CSS3.

## 🏗️ Arquitetura

O backend segue o padrão de **Arquitetura em Camadas** com ORM Sequelize:

- **Controllers**: Lidam com requisições HTTP
- **Services**: Implementam lógica de negócio
- **Repositories**: Gerenciam acesso ao banco de dados via ORM
- **Models**: Definem entidades do Sequelize

📖 Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes completos da arquitetura.

## 🚀 Configuração e Execução

### Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### Executar

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Compilar TypeScript
npm run build

# Produção
npm start
```

## 🗄️ Banco de Dados

### ORM Sequelize

O projeto usa **Sequelize** como ORM para PostgreSQL. Benefícios:
- ✅ Proteção contra SQL Injection
- ✅ Validações automáticas
- ✅ Suporte a relacionamentos
- ✅ Migrações de schema
- ✅ TypeScript support

### Criar o banco de dados

```bash
# PostgreSQL
psql -U postgres
CREATE DATABASE cssjourney_db;
\q
```

O Sequelize criará as tabelas automaticamente na primeira execução.

## 📡 Endpoints da API

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/register` | Registrar novo usuário | ❌ |
| POST | `/api/login` | Login de usuário | ❌ |
| POST | `/api/refreshtoken` | Renovar access token | ❌ |
| POST | `/api/logout` | Logout de usuário | ❌ |
| POST | `/api/profile` | Obter perfil do usuário | ✅ |

### Exemplo de Requisição

**Registro:**
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepassword123"
  }'
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt (salt rounds: 10)
- JWT para autenticação (Access Token: 15min, Refresh Token: 7 dias)
- HttpOnly cookies para Refresh Tokens
- Secrets gerenciados via variáveis de ambiente

## 📁 Estrutura de Diretórios

```
backend/
├── src/
│   ├── config/          # Configurações (DB, JWT, ENV)
│   ├── repository/      # Camada de acesso ao banco (ORM)
│   ├── service/         # Lógica de negócio
│   ├── controller/      # Handlers de requisições HTTP
│   ├── model/           # Modelos Sequelize
│   ├── db/              # Conexão com banco
│   ├── auth/            # Autenticação e autorização
│   ├── route/           # Rotas da API
│   └── index.ts         # Entry point
├── dist/                # Código compilado (gerado)
├── .env                 # Variáveis de ambiente (não commitado)
├── .env.example         # Template de variáveis de ambiente
├── package.json
├── tsconfig.json
└── ARCHITECTURE.md      # Documentação da arquitetura
```

## 🛠️ Tecnologias

- **Runtime**: Node.js com TypeScript
- **Framework**: Express.js
- **ORM**: Sequelize
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (jsonwebtoken)
- **Criptografia**: bcryptjs
- **Variáveis de Ambiente**: dotenv

## 📝 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento com nodemon + tsx
npm run build    # Compilar TypeScript → JavaScript
npm start        # Executar em produção (requer build primeiro)
```

## 🧪 Exemplo de Uso da Arquitetura

### Adicionar nova funcionalidade: Atualizar perfil

**1. Repository** (`src/repository/userRepository.ts`):
```typescript
async updateProfile(userId: number, data: { email?: string }) {
  const user = await this.findById(userId);
  if (!user) return null;
  return await user.update(data);
}
```

**2. Service** (`src/service/userService.ts`):
```typescript
async updateUserProfile(userId: number, data: { email?: string }) {
  const user = await userRepository.updateProfile(userId, data);
  if (!user) throw new Error("USER_NOT_FOUND");
  return { username: user.username, email: user.email };
}
```

**3. Controller** (`src/controller/userController.ts`):
```typescript
export const updateProfileController = async(req, res) => {
  try {
    const userData = await userService.updateUserProfile(req.user.id, req.body);
    return res.status(200).json({ message: "Profile updated!", userData });
  } catch (error) {
    // tratamento de erro
  }
};
```

## 📚 Documentação Adicional

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura detalhada
- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Resumo das mudanças
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - 🔧 **Solução de problemas comuns**
- [QUICK_START.md](./QUICK_START.md) - Início rápido

## 🤝 Contribuindo

Ao adicionar novas funcionalidades, siga sempre o padrão:
1. **Model** → Definir entidade no Sequelize
2. **Repository** → Criar métodos de acesso ao banco
3. **Service** → Implementar lógica de negócio
4. **Controller** → Criar handler HTTP
5. **Route** → Registrar endpoint

## 📄 Licença

Este projeto é parte de um TCC (Trabalho de Conclusão de Curso).
