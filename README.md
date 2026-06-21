# Sistema Integrado da Mineradora

Projeto desenvolvido para a disciplina de Desenvolvimento de Software.

## Descrição

O Sistema Integrado da Mineradora foi desenvolvido para auxiliar no gerenciamento das operações da empresa, permitindo o controle de equipamentos, cidades, funcionários e serviços através de uma interface web integrada a um banco de dados em nuvem.

## Funcionalidades

### Equipamentos

* Cadastrar equipamentos
* Listar equipamentos
* Editar equipamentos
* Excluir equipamentos

### Cidades

* Cadastrar cidades
* Listar cidades
* Editar cidades
* Excluir cidades

### Funcionários

* Cadastrar funcionários
* Listar funcionários
* Editar funcionários
* Excluir funcionários

### Serviços

* Cadastrar serviços
* Listar serviços
* Editar serviços
* Excluir serviços

## Tecnologias Utilizadas

* React
* Vite
* JavaScript
* Supabase
* Git
* GitHub
* Netlify

## Banco de Dados

O projeto utiliza o Supabase para armazenamento dos dados, com as seguintes tabelas:

* equipamentos
* cidades
* funcionarios
* servicos

## Estrutura do Projeto

```text
src/
├── components/
│   └── Menu.jsx
├── pages/
│   ├── Inicio.jsx
│   ├── Equipamentos.jsx
│   ├── Cidades.jsx
│   ├── Funcionarios.jsx
│   └── Servicos.jsx
├── lib/
│   └── supabase.js
├── App.jsx
└── main.jsx
```

## Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/alvarosouzace/mineradora-frontend.git
```

2. Entre na pasta:

```bash
cd mineradora-frontend
```

3. Instale as dependências:

```bash
npm install
```

4. Execute o projeto:

```bash
npm run dev
```

## Autor

Álvaro Souza Freire

Universidade Federal do Ceará (UFC) – Campus Crateús

Curso de Ciência da Computação

