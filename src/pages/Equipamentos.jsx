import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([])
  const [nome, setNome] = useState('')
  const [setor, setSetor] = useState('')
  const [editandoId, setEditandoId] = useState(null)

  useEffect(() => {
    carregarEquipamentos()
  }, [])

  async function carregarEquipamentos() {
    const { data, error } = await supabase
      .from('equipamentos')
      .select('*')
      .order('id')

    if (error) {
      console.error(error)
      return
    }

    setEquipamentos(data)
  }

  async function cadastrar() {
    if (!nome || !setor) {
      alert('Preencha todos os campos')
      return
    }

    if (editandoId) {
      const { error } = await supabase
        .from('equipamentos')
        .update({
          nome,
          setor
        })
        .eq('id', editandoId)

      if (error) {
        alert(error.message)
        return
      }

      alert('Equipamento atualizado!')
      setEditandoId(null)
    } else {
      const { error } = await supabase
        .from('equipamentos')
        .insert([
          {
            nome,
            setor
          }
        ])

      if (error) {
        alert(error.message)
        return
      }

      alert('Equipamento cadastrado!')
    }

    setNome('')
    setSetor('')

    carregarEquipamentos()
  }

  function editar(equipamento) {
    setNome(equipamento.nome)
    setSetor(equipamento.setor)
    setEditandoId(equipamento.id)
  }

  async function excluir(id) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este equipamento?'
    )

    if (!confirmar) return

    const { error } = await supabase
      .from('equipamentos')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    carregarEquipamentos()
  }

  return (
    <div>
      <h2>Gestão de Equipamentos</h2>

      <input
        type="text"
        placeholder="Nome do equipamento"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Setor"
        value={setor}
        onChange={(e) => setSetor(e.target.value)}
      />

      <button onClick={cadastrar}>
        {editandoId ? 'Atualizar' : 'Cadastrar'}
      </button>

      <hr />

      <h3>Equipamentos cadastrados</h3>

      <ul>
        {equipamentos.map((equipamento) => (
          <li key={equipamento.id}>
            <strong>{equipamento.nome}</strong> - {equipamento.setor}

            <button
              style={{ marginLeft: '10px' }}
              onClick={() => editar(equipamento)}
            >
              Editar
            </button>

            <button
              style={{ marginLeft: '5px' }}
              onClick={() => excluir(equipamento.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}