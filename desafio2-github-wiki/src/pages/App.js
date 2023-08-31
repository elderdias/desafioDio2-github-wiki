import { useState } from 'react';
import gitLogo from '../assets/github.png'
import ItemRepo from '../components/ItemRepo';
import Input from '../components/input';
import Button from '../components/Button';
import { api } from '../services/api'

import { Container } from './styles'

function App() {
  // Estado para o nome do repositório a ser pesquisado
  const [currentRepo, setCurrentRepo] = useState('');

  // Estado para armazenar a lista de repositórios
  const [repos, setRepos] = useState([]);

  // Função para buscar um repositório
  const handleSearchRepo = async () => {
    console.log('Searching for repo:', currentRepo);
  
    try {
      // Faz a chamada à API para obter dados do repositório
      const { data } = await api.get(`repos/${currentRepo}`);
  
      if (data.id) {
        // Verifica se o repositório já existe na lista
        const isExist = repos.find(repo => repo.id === data.id)

        if(!isExist){
          // Adiciona o repositório à lista se ele não existe
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
        }
      } else {
        alert('Repositório não encontrado!');
      }
    } catch (error) {
      console.error('API Error:', error);
      if (error.response && error.response.status === 404) {
        alert('Repositório não encontrado!');
      } else {
        alert('Ocorreu um erro ao buscar o repositório.');
      }
    }
  };
  
  // Função para remover um repositório da lista
  const handleRemoveRepo = (repoId) => {
    // Filtra a lista de repositórios para excluir o repositório pelo ID
    const updatedRepos = repos.filter(repo => repo.id !== repoId);
    setRepos(updatedRepos);
  };
  
  return (
    <Container>
      {/* Renderiza a imagem do logo */}
      <img src={gitLogo} width={72} height={72} alt='github logo'/>
      {/* Input para inserir o nome do repositório */}
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      {/* Botão para buscar repositório */}
      <Button onClick={handleSearchRepo}/>
      {/* Mapeia e renderiza a lista de repositórios com o componente ItemRepo */}
      {repos.map(repo => <ItemRepo key={repo.id} repo={repo} onRemove={() => handleRemoveRepo(repo.id)}/>)}
    </Container>
  );
}

export default App;
