import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function cadastro(req, res) {
    try {
        const { nome, email, senha } = req.body

        // verifica se usuário já existe
        const userExists = await prisma.usuario.findUnique({
            where: {
                email
            }
        })

        if(userExists) {
            return res.status(400).json({
                error: 'Email já cadastrado'
            })
        }

        // criptografa senha
        const hashedPassword = await bcrypt.hash(senha, 10)

        // cria usuário
        const user = await prisma.usuario.create({
            data: {
                name: nome,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            message: 'Usuário criado',
            user
        })

    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}