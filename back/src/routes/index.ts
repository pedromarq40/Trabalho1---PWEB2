import { Router } from 'express'; 
import pacienteRouter from './paciente.routes';
import medicoRouter from './medico.routes';

const router = Router();

router.use('/paciente', pacienteRouter);
router.use('/medico', medicoRouter)

export default router;