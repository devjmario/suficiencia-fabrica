import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function login(req, res){
    try{
            const {email, senha} = req.body
            const user = await prisma.usuario.findUnique({
                where: {
                    email
                }
            })
    
            if(!user) return res.send(401).json({ message: 'Email já cadastrado'})
    
            const senhaCorreta = await bcrypt.compare(
                    senha,
                    user.password
                )
            
            if(!senhaCorreta) return res.send(401).json({ message: 'Senha incorreta'})
            
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.status(201).json({ message: 'Login realizado', token} )
        } catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
}