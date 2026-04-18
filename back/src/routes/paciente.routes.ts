import { Router } from 'express'
import { type Request, type Response } from 'express';   
import prisma from '../db/prisma'
import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'

const pacienteRouter = Router()
const saltRound : number = 10

pacienteRouter.get('/', async (req: Request, res: Response) => {
    try{
        const pacientes = await prisma.paciente.findMany()
        res.status(200).json(pacientes) 
    }
    catch(error){
        res.status(500).json({error: "erro ao tentar listar pacientes"})
    }
})

pacienteRouter.get('/:id', async (req: Request<{id : string}>, res: Response) => {
    try{
        const id = parseInt(req.params.id)
        const paciente = await prisma.paciente.findUnique({where: {id: id}})
        if (!paciente) throw new Error()
        res.status(200).json(paciente)
    }
    catch(error){
        res.status(500).json({error: "erro ao tentar listar paciente"})
    }
})

pacienteRouter.post('/', async (req: Request, res: Response) => {
    try{
        const data = req.body
        const senhaHash = await bcrypt.hash(data.senha, saltRound)
        data.senha = senhaHash
        //if (data.dataDeNascimento) {data.dataDeNascimento = new Date(data.dataDeNascimento).toISOString()}
        await prisma.paciente.create({data:data})
        res.status(201).json({mensagem: "Paciente criado com sucesso"})
    }
    catch(error : any){
        if ( error.code === 'P2002'){
            return res.status(409).json({error : "Este CPF ou Email já está cadastrado!"})
        }
        if (error.message && error.message.includes('PrismaClientValidationError')){
            return res.status(400).json({error : "Dados inválidos ou campos faltando"})
        }
        console.error(error)
        return res.status(500).json({ error: "Erro interno ao tentar criar novo paciente" })
    }
})

pacienteRouter.patch('/:id', async ( req : Request<{id : string}>, res : Response) => {
    try{
        const id = parseInt(req.params.id)
        await prisma.paciente.update({
            where : { id : id},
            data : req.body
        })
        res.status(200).json({mensagem : "Paciente atualizado com sucesso"})
    }catch(error){
        const response = {
            mensagem : "Erro ao atualizar paciente",
            error : error
        }
        res.status(404).json(response)
        console.error(error)
    }
})

export default pacienteRouter       