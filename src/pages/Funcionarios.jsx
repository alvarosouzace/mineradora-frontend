import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [editandoId, setEditandoId] = useState(null)

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  async function carregarFuncionarios() {
    const { data, error } = await supabase
      .from('funcionarios')
      .select('*')
      .order('id')

    if (error) {
      console.error(error)
      return
    }

    setFuncionarios(data)
  }

  async function cadastrar() {
    if (!nome || !cargo) {
      alert('Preencha todos os campos')
      return
    }

    if (editandoId) {
      const { error } = await supabase
        .from('funcionarios')
        .update({
          nome,
          cargo
        })
        .eq('id', editandoId)

      if (error) {
        alert(error.message)
        return
      }

      alert('Funcionário atualizado!')
      setEditandoId(null)
    } else {
      const { error } = await supabase
        .from('funcionarios')
        .insert([
          {
            nome,
            cargo
          }
        ])

      if (error) {
        alert(error.message)
        return
      }

      alert('Funcionário cadastrado!')
    }

    setNome('')
    setCargo('')

    carregarFuncionarios()
  }

  function editar(funcionario) {
    setNome(funcionario.nome)
    setCargo(funcionario.cargo)
    setEditandoId(funcionario.id)
  }

  async function excluir(id) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este funcionário?'
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('funcionarios')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    carregarFuncionarios()
  }

  return (
    <div>
      <h2>Gestão de Funcionários</h2>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Cargo"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
      />

      <button onClick={cadastrar}>
        {editandoId ? 'Atualizar' : 'Cadastrar'}
      </button>

      <hr />

      <h3>Funcionários cadastrados</h3>

      <ul>
        {funcionarios.map((funcionario) => (
          <li key={funcionario.id}>
            {funcionario.nome} - {funcionario.cargo}

            <button
              style={{ marginLeft: '10px' }}
              onClick={() => editar(funcionario)}
            >
              Editar
            </button>

            <button
              style={{ marginLeft: '5px' }}
              onClick={() => excluir(funcionario.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}