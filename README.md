# 🚀 Demonstração

🌐 **Frontend (produção)**  
https://suficiencia-fabrica.vercel.app/

🔗 **Backend (API em produção)**  
https://suficiencia-fabrica.onrender.com

---

# 🧠 Sobre o projeto

Sistema fullstack de gerenciamento de tarefas com autenticação de usuários.  
O usuário pode criar, editar, excluir e gerenciar suas tarefas de forma segura utilizando JWT.

---

# 🏗️ Arquitetura

```txt
Frontend (React + Vite)
        ↓ HTTP (Axios + JWT)
Backend (Node.js + Express)
        ↓
Prisma
        ↓
MongoDB Atlas

🧠 Funcionalidades
👤 Autenticação
Cadastro de usuário
Login com JWT
Logout
Proteção de rotas
📝 Tarefas
Criar tarefa
Listar tarefas do usuário autenticado
Atualizar título, descrição e status
Marcar como concluída / pendente
Excluir tarefa
🛠️ Tecnologias
Frontend
React
Vite
React Router DOM
Axios
Backend
Node.js
Express
Prisma
MongoDB Atlas
JWT
bcrypt
dotenv
📦 Como executar o projeto
🌐 Frontend
▶️ Instalação e execução
cd front-end/suficiencia-fabrica
npm install
npm run dev

A aplicação ficará disponível em:
http://localhost:5173

🔌 Conexão com o backend

O frontend já está configurado para consumir a API em produção.

Arquivo responsável:

src/services/api.js

Base URL utilizada:

https://suficiencia-fabrica.onrender.com
🖥️ Backend (API em produção)

https://suficiencia-fabrica.onrender.com

▶️ Backend local (opcional)
cd back-end
npm install
npm run dev
⚙️ Configuração do backend

Crie um arquivo .env na pasta backend:

DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDoBanco"
JWT_SECRET="sua_chave_secreta"
🗄️ Banco de dados (MongoDB Atlas)

Este projeto utiliza MongoDB Atlas.

Passos:
Criar conta: https://www.mongodb.com/atlas
Criar cluster gratuito
Criar banco de dados
Obter string de conexão:
mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDoBanco
🗄️ Prisma
npx prisma generate
npx prisma db push
🔐 Autenticação
Authorization: Bearer <token>
📡 Endpoints da API
Auth
POST /login
POST /cadastro
Tarefas
GET    /tarefas
POST   /tarefas
PUT    /tarefas
DELETE   /tarefas
🔒 Segurança
Senhas criptografadas com bcrypt
Autenticação via JWT
Middleware de proteção de rotas
Isolamento de dados por usuário
⚠️ Observações importantes
Backend depende de MongoDB Atlas configurado via .env
Frontend já está conectado ao backend em produção
Projeto desacoplado (frontend + backend independentes)