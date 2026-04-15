import { Router } from 'express'; 
import pacienteRouter from './paciente.routes';
import medicoRouter from './medico.routes';
import atendimentoRouter from './atendimento.routes'

const router = Router();

router.use('/paciente', pacienteRouter);
router.use('/medico', medicoRouter)
router.use('/atendimento', atendimentoRouter)

export default router;