import Header from './components/Header'
import Protegida from './components/Protegida'
import Home from './pages/Home'
import CadastroMedico from './pages/cadastroMedico'
import CadastroPaciente from './pages/cadastroPaciente'
import Login from "./pages/login"
import { Route, BrowserRouter, Routes } from 'react-router-dom'

function App() {
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cadastro-paciente" element={<CadastroPaciente/>}/>
                    <Route path="/cadastro-medico" element={<CadastroMedico/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
