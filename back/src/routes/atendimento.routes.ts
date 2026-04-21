import { Router } from 'express'
import { type Request, type Response } from 'express'
import prisma from '../db/prisma'

const atendimentoRouter = Router()

atendimentoRouter.get('/', async (req : Request, res : Response )=> {
    try{
        const response = await prisma.atendimento.findMany({
            include: {
                medico: true,
                paciente: true
            }
        })
        res.status(200).json(response)
    }catch(error){
        const response = {error: 'Erro ao tentar buscar atendimentos'}
        res.status(404).json(response)
    }
})

atendimentoRouter.get('/paciente/:id', async(req : Request<{ id : string}>, res : Response ) => {
    try{
        const id = parseInt(req.params.id)
        const response = await prisma.atendimento.findMany({
            where: { pacienteId: id },
            include: {
                medico: true,
                paciente: true
            },
            orderBy: { dataCriacao: 'desc' }
        })
        res.status(200).json(response)
    }catch(error){
        const response = {
            mensagem : "Erro ao tentar buscar atendimentos do paciente",
            error : error
        }
        console.error(error)
        res.status(404).json(response)
    }
})

atendimentoRouter.get('/medico/:id', async(req : Request<{ id : string}>, res : Response ) => {
    try{
        const id = parseInt(req.params.id)
        const response = await prisma.atendimento.findMany({
            where: { medicoId: id },
            include: {
                medico: true,
                paciente: true
            },
            orderBy: { dataCriacao: 'desc' }
        })
        res.status(200).json(response)
    }catch(error){
        const response = {
            mensagem : "Erro ao tentar buscar atendimentos do médico",
            error : error
        }
        console.error(error)
        res.status(404).json(response)
    }
})

atendimentoRouter.get('/:id', async(req : Request<{ id : string}>, res : Response ) => {
    try{
        const id = parseInt(req.params.id)
        const response = await prisma.atendimento.findUnique({
            where : { id : id},
            include: {
                medico: true,
                paciente: true
            }
        })
        if(!response) throw new Error()
        res.status(200).json(response)
    }catch(error){
        const response = {
            mensagem : "Erro ao tentar encontrar atendimento",
            error : error
        }
        console.error(error)
        res.status(404).json(response)
    }
})

atendimentoRouter.post('/',  async (req : Request, res : Response ) => {
    try{
        const data = req.body
        const created = await prisma.atendimento.create({
            data: {
                pacienteId: data.pacienteId,
                medicoId: data.medicoId,
                descricao: data.descricao ?? '',
                prescricao: data.prescricao ?? '',
                status: 'PENDENTE'
            }
        })
        res.status(200).json({mensagem : "Solicitação de atendimento criada com sucesso!", atendimento: created})
    }catch(error){
        const response = {
            mensagem: "Erro ao criar solicitação de atendimento",
            erro: error
        }
        res.status(404).json(response)
    }
})

atendimentoRouter.patch('/:id', async ( req : Request<{id : string}>, res : Response) => {
    try{
        const id = parseInt(req.params.id)
        const updated = await prisma.atendimento.update({
            where : { id : id},
            data : req.body
        })
        res.status(200).json({mensagem : "Atendimento atualizado com sucesso", atendimento: updated})
    }catch(error){
        const response = {
            mensagem : "Erro ao atualizar atendimento",
            error : error
        }
        res.status(404).json(response)
        console.error(error)
    }
})

export default atendimentoRouter