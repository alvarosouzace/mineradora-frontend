import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Servicos() {
  const [servicos, setServicos] = useState([])
  const [descricao, setDescricao] = useState('')
  const [responsavel, setResponsavel] = useState('')
  const [editandoId, setEditandoId] = useState(null)

  useEffect(() => {
    carregarServicos()
  }, [])

  async function carregarServicos() {
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .order('id')

    if (error) {
      console.error(error)
      return
    }

    setServicos(data)
  }

  async function cadastrar() {
    if (!descricao || !responsavel) {
      alert('Preencha todos os campos')
      return
    }

    if (editandoId) {
      const { error } = await supabase
        .from('servicos')
        .update({
          descricao,
          responsavel
        })
        .eq('id', editandoId)

      if (error) {
        alert(error.message)
        return
      }

      alert('Serviço atualizado!')
      setEditandoId(null)
    } else {
      const { error } = await supabase
        .from('servicos')
        .insert([
          {
            descricao,
            responsavel
          }
        ])

      if (error) {
        alert(error.message)
        return
      }

      alert('Serviço cadastrado!')
    }

    setDescricao('')
    setResponsavel('')

    carregarServicos()
  }

  function editar(servico) {
    setDescricao(servico.descricao)
    setResponsavel(servico.responsavel)
    setEditandoId(servico.id)
  }

  async function excluir(id) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este serviço?'
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('servicos')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    carregarServicos()
  }

  return (
    <div>
      <h2>Gestão de Serviços</h2>

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        type="text"
        placeholder="Responsável"
        value={responsavel}
        onChange={(e) => setResponsavel(e.target.value)}
      />

      <button onClick={cadastrar}>
        {editandoId ? 'Atualizar' : 'Cadastrar'}
      </button>

      <hr />

      <h3>Serviços cadastrados</h3>

      <ul>
        {servicos.map((servico) => (
          <li key={servico.id}>
            {servico.descricao} - {servico.responsavel}

            <button
              style={{ marginLeft: '10px' }}
              onClick={() => editar(servico)}
            >
              Editar
            </button>

            <button
              style={{ marginLeft: '5px' }}
              onClick={() => excluir(servico.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}