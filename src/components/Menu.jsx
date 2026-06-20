import React from 'react';

export default function Menu({ setPagina }) {
  return (
    <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
      <button onClick={() => setPagina('inicio')}>
        Início
      </button>

      <button onClick={() => setPagina('equipamentos')}>
        Equipamentos
      </button>

      <button onClick={() => setPagina('cidades')}>
        Cidades
      </button>

      <button onClick={() => setPagina('funcionarios')}>
        Funcionários
      </button>

      <button onClick={() => setPagina('servicos')}>
        Serviços
      </button>
    </nav>
  );
}