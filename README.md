PokéAPI React App Este projeto é uma aplicação React que consome a PokéAPI para listar Pokémons e exibir seus detalhes através de rotas dinâmicas.

✨ Funcionalidades Listagem de Pokémons com imagens.

Navegação para página de detalhes de cada Pokémon.

Consumo de API externa (PokéAPI).

Rotas dinâmicas utilizando React Router.

🚀 Tecnologias Utilizadas React

React Router DOM

Axios (ou fetch, dependendo do seu projeto)

PokéAPI (Fonte dos dados)

📦 Instalação e Uso Siga os passos abaixo para rodar o projeto localmente:

Clone o repositório

bash Copiar Editar git clone https://github.com/seu-usuario/seu-repo.git cd seu-repo Instale as dependências

bash Copiar Editar npm install Execute o projeto

bash Copiar Editar npm start O app estará rodando em: http://localhost:3000

📁 Estrutura de Pastas css Copiar Editar src/ ├── components/ │ ├── PokemonList.jsx │ └── PokemonDetail.jsx ├── App.jsx ├── index.jsx 📄 Rotas / — Página inicial listando os Pokémons.

/pokemon/:id — Página de detalhes de um Pokémon específico.