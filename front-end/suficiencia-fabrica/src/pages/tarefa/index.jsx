import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

function Tarefa() {

    const navigate = useNavigate()

    const [tarefas, setTarefas] = useState([])

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const [editandoId, setEditandoId] = useState(null)

    function logout() {

        localStorage.removeItem('token')

        navigate('/')
    }

    async function carregarTarefas() {

        try {

            const token = localStorage.getItem('token')

            const response = await api.get('/tarefas', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setTarefas(response.data)

        } catch(error) {

            console.log(error.response?.data)

        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(!token) {
            navigate('/')
            return
        }
        carregarTarefas()

    }, [])


    async function criarTarefa() {

        if (!titulo.trim()) {

            alert('Digite um título.')

            return
        }
        
        const token = localStorage.getItem('token')

        await api.post('/tarefas',

            {
                titulo,
                descricao
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setTitulo('')
        setDescricao('')

        carregarTarefas()
    }


    async function salvarEdicao(id) {

        try {

            const token = localStorage.getItem('token')

            if (!titulo.trim()) {

                alert('Digite um título.')

                return
            }

            await api.put('/tarefas', {

                id,
                titulo,
                descricao

            }, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            })

            setEditandoId(null)
            setTitulo('')
            setDescricao('')

            carregarTarefas()

        } catch(error) {

            console.log(error.response?.data)

        }
    }

    async function toggleCompleted(tarefa) {

    try {

        const token = localStorage.getItem('token')

        await api.put('/tarefas',

            {
                id: tarefa.id,
                titulo: tarefa.title,
                descricao: tarefa.description,
                completed: !tarefa.completed
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        carregarTarefas()

    } catch(error) {

        console.log(error.response?.data)

    }
}

    async function deletarTarefa(id) {

        const token = localStorage.getItem('token')

        await api.delete('/tarefas', {

            headers: {
                Authorization: `Bearer ${token}`
            },

            data: {
                id
            }
        })

        carregarTarefas()
    }

    return (

        <div>

            <button onClick={logout}>
                Logout
            </button>

            <h1>Minhas tarefas</h1>

            {editandoId === null && (

                <>

                    <input
                        placeholder='Título'
                        value={titulo}
                        onChange={(e)=>
                            setTitulo(e.target.value)
                        }
                    />

                    <input
                        placeholder='Descrição'
                        value={descricao}
                        onChange={(e)=>
                            setDescricao(e.target.value)
                        }
                    />

                    <button onClick={criarTarefa}>
                        Criar tarefa
                    </button>

                </>

            )}

            {tarefas.map(tarefa => (

                <div key={tarefa.id}>

                    {editandoId === tarefa.id ? (

                        <>
                            <input
                                value={titulo}
                                onChange={(e)=>
                                    setTitulo(e.target.value)
                                }
                            />

                            <input
                                value={descricao}
                                onChange={(e)=>
                                    setDescricao(e.target.value)
                                }
                            />

                            <button
                                onClick={() =>
                                    salvarEdicao(tarefa.id)
                                }
                            >
                                Salvar
                            </button>
                        </>

                    ) : (

                        <>
                            <h3>{tarefa.title}</h3>

                            <p>{tarefa.description}</p>

                            <p>
                                Status:
                                {tarefa.completed
                                    ? ' Concluída'
                                    : ' Pendente'}
                            </p>
                            
                            <button
                                onClick={() =>
                                    toggleCompleted(tarefa)
                                }
                            >

                                {tarefa.completed
                                    ? 'Marcar pendente'
                                    : 'Marcar concluída'}

                            </button>

                            <button
                                onClick={() => {

                                    setEditandoId(tarefa.id)

                                    setTitulo(
                                        tarefa.title
                                    )

                                    setDescricao(
                                        tarefa.description
                                    )

                                }}
                            >
                                Editar
                            </button>
                        </>

                    )}

                    <button
                        onClick={() =>
                            deletarTarefa(tarefa.id)
                        }
                    >
                        Excluir
                    </button>

                </div>

            ))}

        </div>
    )
}

export default Tarefa