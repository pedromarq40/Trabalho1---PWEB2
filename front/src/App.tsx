import Header from './components/Header'
import Protegida from './components/Protegida'
import Home from './pages/Home'
import CadastroPaciente from './pages/cadastroPaciente'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

function App() {
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cadastro-paciente" element={<CadastroPaciente/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
