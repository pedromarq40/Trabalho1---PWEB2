import { Router } from 'express'
import { type Request, type Response } from 'express'
import prisma from '../db/prisma'

const loginRouter = Router()

export default loginRouter