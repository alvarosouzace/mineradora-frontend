import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Cidades() {
  const [cidades, setCidades] = useState([])
  const [nome, setNome] = useState('')
  const [editandoId, setEditandoId] = useState(null)

  useEffect(() => {
    carregarCidades()
  }, [])

  async function carregarCidades() {
    const { data, error } = await supabase
      .from('cidades')
      .select('*')
      .order('id')

    if (error) {
      console.error(error)
      return
    }

    setCidades(data)
  }

  async function cadastrar() {
    if (!nome) {
      alert('Digite o nome da cidade')
      return
    }

    if (editandoId) {
      const { error } = await supabase
        .from('cidades')
        .update({
          nome
        })
        .eq('id', editandoId)

      if (error) {
        alert(error.message)
        return
      }

      alert('Cidade atualizada!')
      setEditandoId(null)
    } else {
      const { error } = await supabase
        .from('cidades')
        .insert([
          {
            nome
          }
        ])

      if (error) {
        alert(error.message)
        return
      }

      alert('Cidade cadastrada!')
    }

    setNome('')
    carregarCidades()
  }

  function editar(cidade) {
    setNome(cidade.nome)
    setEditandoId(cidade.id)
  }

  async function excluir(id) {
    const confirmar = window.confirm(
      'Deseja realmente excluir esta cidade?'
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('cidades')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    carregarCidades()
  }

  return (
    <div>
      <h2>Gestão de Cidades</h2>

      <input
        type="text"
        placeholder="Nome da cidade"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <button onClick={cadastrar}>
        {editandoId ? 'Atualizar' : 'Cadastrar'}
      </button>

      <hr />

      <h3>Cidades cadastradas</h3>

      <ul>
        {cidades.map((cidade) => (
          <li key={cidade.id}>
            {cidade.nome}

            <button
              style={{ marginLeft: '10px' }}
              onClick={() => editar(cidade)}
            >
              Editar
            </button>

            <button
              style={{ marginLeft: '5px' }}
              onClick={() => excluir(cidade.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}