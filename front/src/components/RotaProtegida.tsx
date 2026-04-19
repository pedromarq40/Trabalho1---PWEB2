import { Navigate } from 'react-router-dom'

interface RotaProtegidaProps{
    condicao: boolean,
    children: React.JSX.Element,
    redirecionamento: string
}

export default function RotaProtegida({condicao, children, redirecionamento}: RotaProtegidaProps){
    if (condicao) return children
    return <Navigate to={redirecionamento} replace />
}