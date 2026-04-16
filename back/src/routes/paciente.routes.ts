import { Router } from 'express'
import { type Request, type Response } from 'express';   
import prisma from '../db/prisma'

const pacienteRouter = Router()

pacienteRouter.get('/', async (req: Request, res: Response) => {
    try{
        const pacientes = await prisma.paciente.findMany()
        res.status(200).json(pacientes) 
    }
    catch(error){
        console.error(error)
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
        console.error(error)
        res.status(500).json({error: "Erro ao tentar buscar paciente"})
    }
})

pacienteRouter.post('/', async (req: Request, res: Response) => {
    try{
        const data = req.body
        await prisma.paciente.create({data:data})
        res.status(201).json({mensagem: "Paciente criado com sucesso"})
    }
    catch(error){
        res.status(500).json({error: "erro ao tentar criar novo usuário"})
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

pacienteRouter.post("/login", async (req: Request, res: Response) => {
    try{
        const { emailOrCpf, senha } = req.body
        const paciente = await prisma.paciente.findFirst({
            where: {
                OR: [
                    { email: emailOrCpf },
                    { cpf: emailOrCpf }
                ]
            }
        })
        if (!paciente) {
            return res.status(401).json({error: "Credenciais inválidas"})
        }
        if (paciente.senha !== senha) {
            return res.status(401).json({error: "Credenciais inválidas"})
        }
        res.status(200).json({ mensagem: "Login efetuado com sucesso", paciente: { id: paciente.id, nome: paciente.nome, email: paciente.email } })
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: "Erro ao tentar fazer login"})
    }
})

export default pacienteRouter       