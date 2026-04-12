import { useNavigate } from 'react-router-dom'

interface RotaProtegidaProps{
    condicao: boolean,
    children: React.JSX.Element,
    redirecionamento: string
}

export default function RotaProtegida({condicao, children, redirecionamento}: RotaProtegidaProps){
    const navigate = useNavigate()
    if (condicao) return children
    navigate(redirecionamento)
}