import Header from './components/Header'
import Protegida from './components/Protegida'
import Home from './pages/Home'
import CadastroPaciente from './pages/CadastroPaciente'
import LoginPaciente from './pages/LoginPaciente'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

function App() {
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cadastro-paciente" element={<CadastroPaciente/>}/>
                    <Route path="/login-paciente" element={<LoginPaciente/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
