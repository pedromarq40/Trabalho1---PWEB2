import Header from './components/Header'
import Protegida from './components/Protegida'
import Home from './pages/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

function App() {
  return(
    <>
      <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
