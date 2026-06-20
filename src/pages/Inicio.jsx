import React from 'react';

export default function Inicio() {
  return (
    <div>
      <h1>Sistema Integrado da Mineradora</h1>

      <p>
        Bem-vindo ao sistema de gerenciamento da mineradora.
      </p>

      <p>
        Utilize o menu superior para realizar o controle dos recursos
        cadastrados no sistema.
      </p>

      <hr />

      <h2>Funcionalidades Disponíveis</h2>

      <ul>
        <li>Gerenciamento de Equipamentos</li>
        <li>Gerenciamento de Cidades</li>
        <li>Gerenciamento de Funcionários</li>
        <li>Gerenciamento de Serviços</li>
        <li>Cadastro, consulta, edição e exclusão de registros</li>
        <li>Integração com banco de dados Supabase</li>
      </ul>

      <hr />

      <p>
        Projeto desenvolvido utilizando React e Supabase.
      </p>
    </div>
  );
}