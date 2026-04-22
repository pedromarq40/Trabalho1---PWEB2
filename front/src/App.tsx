import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import CadastroMedico from './pages/CadastroMedico'
import CadastroPaciente from './pages/CadastroPaciente'
import Login from "./pages/Login"
import DashboardPaciente from './pages/DashboardPaciente'
import DashboardMedico from './pages/DashboardMedico'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RotaProtegida from './components/RotaProtegida'

function App() {
    const [tipoLogin, setTipoLoginState] = useState<string>(() => {
        return localStorage.getItem('tipoLogin') ?? ''
    })

    function setTipoLogin(value: string) {
        localStorage.setItem('tipoLogin', value)
        setTipoLoginState(value)
    }

    return (
        <>
            <BrowserRouter>
                <Header setTipoLogin={setTipoLogin}/>
                <Routes>
                    <Route path="/" element={<RotaProtegida children={<Home/>} condicao={!tipoLogin.trim()} redirecionamento={`/dashboard/${tipoLogin}`}/>} />
                    <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
                    <Route path="/cadastro-medico" element={<CadastroMedico />} />
                    <Route path="/login" element={<RotaProtegida children={<Login setTipoLogin={setTipoLogin} />} condicao={!tipoLogin.trim()} redirecionamento={`/dashboard/${tipoLogin}`}/>} />
                    <Route path="/dashboard/paciente" element={<RotaProtegida children={<DashboardPaciente />} redirecionamento='/' condicao={tipoLogin === "paciente"} />} />
                    <Route path="/dashboard/medico" element={<RotaProtegida children={<DashboardMedico />} redirecionamento='/' condicao={tipoLogin === "medico"} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
