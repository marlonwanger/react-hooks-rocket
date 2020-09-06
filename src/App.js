import React, { useState, useEffect } from 'react';

// useEffect é utilizado para didMount , didUpdate e willUnmount

function App() {
  //    valor do state, seta o state          valor inicial
  const [repositories, setRepositories] = useState([]);
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function getGithubData() {
      const response = await fetch(
        'https://api.github.com/users/marlonwanger/repos'
      );
      const data = await response.json();
      setRepositories(data);
    }
    getGithubData();

    const watchId = navigator.geolocation.watchPosition(handlePositionReceived);

    // toda vez que um effect tiver return é executado como 'willUnmount'
    return () => navigator.geolocation.clearWatch(watchId);
  }, []); /* no segundo parametro e passo variaveis (comparaçoes) indicando quando esse efect
  vai ser executado vazio, vai ser executado apenas 1 vez */

  // esse aqui pode ser considerado um coponentDidUpdate
  useEffect(() => {
    //filter espera um bool e favorite é true or false
    const filtered = repositories.filter((repo) => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories]); // só será executado quando repositories mudar.

  function handlePositionReceived({ coords }) {
    console.log(coords);

    const { latitude, longitude } = coords;

    setLocation({
      latitude,
      longitude,
    });
  }

  function handleFavorite(id) {
    const newRepositories = repositories.map((repo) => {
      // retorna o repositorio inteiro + a opcao de favorite
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
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
      <h3>Coodinates</h3>
      Latitude: {location.latitude} <br />
      Longitude: {location.longitude}
    </div>
  );
}

export default App;
