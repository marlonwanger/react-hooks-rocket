import React, { useState, useEffect } from 'react';

// useEffect é utilizado para didMount , didUpdate e willUnmount

function App() {
  //    valor do state, seta o state          valor inicial
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getGithubData() {
      const response = await fetch(
        'https://api.github.com/users/marlonwanger/repos'
      );
      const data = await response.json();
      setRepositories(data);
    }

    getGithubData();
  }, []); /* no segundo parametro e passo variaveis (comparaçoes) indicando quando esse efect
  vai ser executado vazio, vai ser executado apenas 1 vez */

  function handleFavorite(id) {
    const newRepositories = repositories.map((repo) => {
      // retorna o repositorio inteiro + a opcao de favorite
      return repo.id === id ? { ...repo, favorite: true } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <div className="App">
      <h2>Repositories List</h2>

      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
            {/* Chamando dessa forma a funcao é imediatamente executada */}
            {/* <button onClick={handleFavorite()}>Favoritar</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
