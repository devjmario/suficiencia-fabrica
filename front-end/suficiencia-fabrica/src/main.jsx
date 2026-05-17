import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/home/index.jsx'
import Tarefa from './pages/tarefa/index.jsx'
import Cadastro from './pages/cadastro/index.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tarefa" element={<Tarefa />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>
)
