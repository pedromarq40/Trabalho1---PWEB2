import { Router } from 'express'
import { type Request, type Response } from 'express'
import prisma from '../db/prisma'
import bcrypt from 'bcrypt'

const loginRouter = Router()

loginRouter.post('/medico', async ( req : Request<{email : string}>, res : Response ) => {
    try{
        const email = String(req.body.email)
        const senha = String(req.body.senha)
        const usuario = await prisma.medico.findUnique({ where : { email : email}})
        if (!usuario) return res.status(401).json({error : "email ou senha inválidos"})
        const valido = await bcrypt.compare(senha, usuario.senha)
            if(valido){
                res.status(200).json({mensagem : "login efetuado com sucesso"})
            }else{
                res.status(401).json({mensagem : "Senha Errada!"})
            }
    }catch(error){
        console.error(error)
        res.status(404).json({mensagem : error})
    }
})

loginRouter.post('/paciente', async ( req : Request<{email : string}>, res : Response ) => {
    try{
        const email = String(req.body.email)
        const senha = String(req.body.senha)
        const usuario = await prisma.paciente.findUnique({ where : { email : email}})
        if (!usuario) return res.status(401).json({error : "email ou senha inválidos"})
        const valido = await bcrypt.compare(senha, usuario.senha)
            if(valido){
                res.status(200).json({mensagem : "login efetuado com sucesso"})
            }else{
                res.status(401).json({mensagem : "Senha Errada!"})
            }
    }catch(error){
        res.status(404).json({mensagem : error})
    }
})

export default loginRouter