import { Router } from 'express'
import { type Request, type Response } from 'express'
import prisma from '../db/prisma'

const mensagemRouter = Router()

mensagemRouter.get('/atendimento/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const atendimentoId = parseInt(req.params.id)
        const mensagens = await prisma.mensagem.findMany({
            where: { atendimentoId },
            orderBy: { criadoEm: 'asc' }
        })
        res.status(200).json(mensagens)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensagem: 'Erro ao buscar mensagens.' })
    }
})

mensagemRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { atendimentoId, remetente, texto } = req.body
        const mensagem = await prisma.mensagem.create({
            data: {
                atendimentoId,
                remetente,
                texto
            }
        })
        res.status(200).json(mensagem)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensagem: 'Erro ao enviar mensagem.' })
    }
})

export default mensagemRouter
