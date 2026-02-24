# Backend - Style Journey Game

Backend desenvolvido em TypeScript com Express, PostgreSQL e Sequelize.

## Estrutura do Projeto

```
backend/
├── src/              # Código-fonte TypeScript
│   ├── index.ts      # Ponto de entrada da aplicação
│   ├── auth/         # Autenticação e autorização
│   ├── controller/   # Controladores das rotas
│   ├── db/           # Configuração do banco de dados
│   ├── model/        # Modelos Sequelize
│   ├── route/        # Definição de rotas
│   └── utils/        # Utilitários
├── dist/             # Código JavaScript compilado
└── tsconfig.json     # Configuração do TypeScript
```

## Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Modo desenvolvimento (com hot-reload)
npm run dev

# Compilar TypeScript para JavaScript
npm run build

# Executar em produção (após build)
npm start
```

## Tecnologias

- **TypeScript** - Linguagem de programação
- **Express** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação com tokens
- **bcryptjs** - Hash de senhas

## API Endpoints

- `POST /api/register` - Registro de usuário
- `POST /api/login` - Login de usuário
- `POST /api/refreshtoken` - Renovar token de acesso
- `POST /api/logout` - Logout de usuário
- `POST /api/profile` - Perfil do usuário (requer autenticação)

## Configuração do Banco de Dados

Certifique-se de ter o PostgreSQL instalado e criar o banco de dados:

```sql
CREATE DATABASE cssjourney_db;
```

As credenciais padrão estão configuradas em `src/index.ts`. Para produção, use variáveis de ambiente.
