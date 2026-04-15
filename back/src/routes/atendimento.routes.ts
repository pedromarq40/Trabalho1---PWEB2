import { Router } from 'express'
import { type Request, type Response } from 'express'
import prisma from '../db/prisma'

const atendimentoRouter = Router()

atendimentoRouter.get('/', async (req : Request, res : Response )=> {
    try{
        const response = await prisma.atendimento.findMany()
        res.status(200).json(response)
    }catch(error){
        const response = {error: 'Erro ao tentar buscar atendimentos'}
        res.status(404).json(response)
    }
})

atendimentoRouter.get('/:id', async(req : Request<{ id : string}>, res : Response ) => {
    try{
        const id = parseInt(req.params.id)
        const response = await prisma.atendimento.findUnique({where : { id : id}})
        if(!response){
            throw new Error()
        }
        res.status(200).json(response)
    }catch(error){
        const response = {
            mensagem : "Erro ao tentar encontrar médico",
            error : error
        }
        res.status(404).json(response)
    }
})

atendimentoRouter.post('/',  async (req : Request, res : Response ) => {
    try{
        const data = req.body
        await prisma.atendimento.create({data : data})
        res.status(200).json({mensagem : "Atendimento criado com sucesso!"})
    }catch(error){
        const response = {
            mensagem: "Erro ao criar atendiemnto",
            erro: error
        }
        res.status(404).json(response)
    }
})

export default atendimentoRouter