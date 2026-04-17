import { Router } from 'express'
import { type Request, type Response } from 'express'
import prisma from '../db/prisma'
import bcrypt from 'bcrypt'

const medicoRouter = Router()
const saltRound : number = 10

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
        const senhaHash = await bcrypt.hash(data.senha, saltRound)
        data.senha = senhaHash
        await prisma.medico.create({data: data})
        res.status(200).json({mensagem: "Médico criado com sucesso"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "Erro ao tentar criar novo médico"})
    }
})

medicoRouter.patch('/:id', async ( req : Request<{id : string}>, res : Response) => {
    try{
        const id = parseInt(req.params.id)
        await prisma.medico.update({
            where : { id : id},
            data : req.body
        })
        res.status(200).json({mensagem : "Médico atualizado com sucesso"})
    }catch(error){
        const response = {
            mensagem : "Erro ao atualizar médico",
            error : error
        }
        res.status(404).json(response)
        console.error(error)
    }
})

export default medicoRouter
