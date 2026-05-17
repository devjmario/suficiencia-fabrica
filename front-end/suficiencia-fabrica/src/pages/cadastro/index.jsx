import { useState, useRef } from 'react'
import './style.css'
import api from '../../services/api.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Cadastro() {
  const navigate = useNavigate()
  const inputNome = useRef()
  const inputEmail = useRef()
  const inputSenha = useRef()

  async function CadastroUsuario() {

  try {

    if (
        !inputNome.current.value.trim() ||
        !inputEmail.current.value.trim() ||
        !inputSenha.current.value.trim()
    ) {
        alert('Preencha todos os campos')
        return
    }

    const response = await api.post('/cadastro', {
        nome: inputNome.current.value,
        email: inputEmail.current.value,
        senha: inputSenha.current.value
    })

    alert('Cadastro Realizado')

    navigate('/')
  } catch(error) {

    alert(error.response?.data?.error)
    console.log(error.response?.data)

  }
}

  return (
    <div className='Home'>
      <form>
        <h1>Cadastro</h1>
        <input placeholder='Nome' type='text' ref={inputNome}/>
        <input placeholder='Email' type='email' ref={inputEmail}/>
        <input placeholder='Senha' type='password' ref={inputSenha}/>
        <button type= 'button' onClick={CadastroUsuario}>Cadastrar</button>
        <div className='cadastrar'>
          <p>
            <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Cadastro
