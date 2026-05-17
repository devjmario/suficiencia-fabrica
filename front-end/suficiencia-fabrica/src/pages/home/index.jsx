import { useState, useRef } from 'react'
import './style.css'
import api from '../../services/api.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()
  const inputEmail = useRef()
  const inputSenha = useRef()

  async function loginUsuario() {

  try {

    const response = await api.post('/login', {
      email: inputEmail.current.value,
      senha: inputSenha.current.value
    })

    localStorage.setItem(
      'token',
      response.data.token
    )

    console.log('Login OK')

    navigate('/tarefa')
  } catch(error) {

    console.log(error.response?.data)

  }
}

  return (
    <div className='Home'>
      <form>
        <h1>Login</h1>
        <input placeholder='Email' type='email' ref={inputEmail}/>
        <input placeholder='Senha' type='password' ref={inputSenha}/>
        <button type= 'button' onClick={loginUsuario}>Entrar</button>
        <div className='cadastrar'>
          <p>
            <Link to="/cadastro">Cadastrar</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Home
