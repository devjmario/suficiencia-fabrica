import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import { authtoken } from './middleware/middleware.js'
import { cadastro } from './controller/cadastro.js'
import { login } from './controller/login.js'
import bcrypt from 'bcrypt'
import cors from 'cors'

const app = express()

const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.listen(3000)


//CADASTRO
app.post('/cadastro', cadastro)

//LOGIN
app.post('/login', login)

//TESTE
app.get('/teste', authtoken, (req, res) =>{
    res.json({message: 'Deu certo'})
})

//TAREFAS
app.post('/tarefas', authtoken, async (req, res) => {
    try {
        await prisma.tarefa.create({
            data:{
                title: req.body.titulo,
                description: req.body.descricao,
                usuarioId: req.user.id
            }
        })

        res.status(201).json({ message: 'Tarefa criada'})
    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
})

app.get('/tarefas', authtoken, async (req, res) => {
    try{
        const tarefas = await prisma.tarefa.findMany({
            where: {
                usuarioId: req.user.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                completed: true
            }
        })

        res.status(201).json(tarefas)
    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})

app.put('/tarefas/', authtoken, async (req, res) => {
    try {
        await prisma.tarefa.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.titulo,
                description: req.body.descricao,
                completed: req.body.completed
            }
        })

        res.status(201).json({ message: 'Tarefa atualizada'})

    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})

app.delete('/tarefas', authtoken, async (req, res) => {
    try{
        await prisma.tarefa.delete({
            where: {
                id: req.body.id
            }
        })

        res.status(201).json({ message: 'Tarefa excluida'})
    } catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})