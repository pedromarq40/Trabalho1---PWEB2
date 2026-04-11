import { Router } from 'express'; 
import { type Request, type Response } from 'express';    
import prisma from '../db/prisma'

const pacienteRouter = Router();

pacienteRouter.get('/', async (req: Request, res: Response) => {
    try{
        const pacientes = await prisma.paciente.findMany()
        res.status(200).json(pacientes) 
    }
    catch(error){
        res.json(500).json({error: "erro ao tentar listar pacientes"})
    }
});

pacienteRouter.get('/:id', async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string)
        const paciente = await prisma.paciente.findUnique({where: {id: id}})
        if (!paciente) throw new Error()
        res.status(200).json(paciente)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "Erro ao tentar buscar paciente"})
    }
})
pacienteRouter.post('/',async (req: Request, res: Response) => {
    try{
        const data = req.body
        await prisma.paciente.create({data:data})
        res.status(201).json({mensagem: "Paciente criado com sucesso"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "erro ao tentar criar novo usuário"})
    }
})

export default pacienteRouter       