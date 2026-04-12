import { Router } from 'express'
import { type Request, type Response } from 'express'
import prisma from '../db/prisma'

const medicoRouter = Router()

medicoRouter.get("/", async (req: Request, res: Response) => {
    try{
        const medicos = await prisma.medico.findMany()
        res.status(200).json(medicos)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "Erro ao tentar acessar todos os médicos"}
        )
    }
})

medicoRouter.get('/:id', async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id as string)
        const medico = await prisma.medico.findUnique({where: {id:id}})
        res.status(200).json(medico)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "Erro ao tentar buscar médico"})
    }
})

medicoRouter.post('/', async (req: Request, res: Response) => {
    try{
        const data = req.body
        await prisma.medico.create({data: data})
        res.status(200).json({mensagem: "Médico criado com sucesso"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "Erro ao tentar criar novo médico"})
    }
})

export default medicoRouter
