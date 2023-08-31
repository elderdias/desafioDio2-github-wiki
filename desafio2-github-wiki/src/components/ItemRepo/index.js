import React from 'react';
import { ItemContainer } from './styles';

function ItemRepo({ repo, onRemove }) {
  // Função que será chamada quando o botão de "Remover" for clicado
  const handleRemoveClick = () => {
    onRemove(repo.id); // Chama a função onRemove passando o id do repositório
  };

  return (
    <ItemContainer>
      {/* Exibe o nome do repositório */}
      <h3>{repo.name}</h3>
      {/* Exibe o nome completo do repositório */}
      <p>{repo.full_name}</p>
      {/* Link para ver o repositório no GitHub */}
      <a href={repo.html_url} rel='noreferrer' target='_blank' >Ver repositório</a><br />
      {/* Link de "Remover" que chama a função handleRemoveClick */}
      <a href='#' onClick={handleRemoveClick} className='remover'>Remover</a>
      {/* Linha horizontal para separar os itens */}
      <hr />
    </ItemContainer>
  );
}

export default ItemRepo;
