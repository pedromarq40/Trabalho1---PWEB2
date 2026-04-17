import { Router } from 'express'; 
import pacienteRouter from './paciente.routes';
import medicoRouter from './medico.routes';
import atendimentoRouter from './atendimento.routes';
import loginRouter from './login.routes';

const router = Router();

router.use('/paciente', pacienteRouter);
router.use('/medico', medicoRouter)
router.use('/atendimento', atendimentoRouter)
router.use('/login', loginRouter)

export default router;