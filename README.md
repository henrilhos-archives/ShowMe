# Sistema de Recomendação de Músicas

Gabriela Liz Moreira, Henrique de Castilhos e Luiz Eduardo Kraisch Silva

## Sobre

O propósito do projeto é criar um sistema de recomendação de músicas baseado em um conjunto de dados do Spotify. A ideia é recomendar novas músicas para um usuário a partir de um conjunto de músicas que ele já ouviu.

## Especificações do Projeto

Inicialmente será desenvolvido uma série de Jupyter Notebooks para validar as hipóteses e os dados. Após a validação, será desenvolvido um sistema em Flask utilizando os dados obtidos atráves dos Jupyter Notebooks e outro em React para a interface do usuário.

### Etapa de validação

Para a validação do projeto, será necessário criar um dataset com variadas músicas e seus metadados do Spotify. Após a criação do dataset, será feita a análise exploratória dos dados para entender melhor o que será necessário para a recomendação e o sistema de recomendação em si.

### Sistema de Recomendação

Após tudo criado e validado utilizando notebooks, será passado o sistema de recomendações para uma aplicação em Flask, que será responsável por receber as músicas que o usuário já ouviu através de um endpoint e retornar as músicas recomendadas para ele.

Com os endpoints necessários criados, será desenvolvido uma aplicação em React para apresentar ao usuário as músicas recomendadas.

### Aplicação Web

Para o usuário poder ver as recomendações fornecidas pelo sistema, será criada uma aplicação Web conectada à aplicação em Flask para poder facilitar o acesso do usuário ao recomendador. O design e conteúdos desta aplicação Web estão disponíveis [neste Figma](https://www.figma.com/file/2SK0fUF40iDj3jg6bg5Rll/ShowMe---Song-Recommendation?type=design&node-id=0%3A1&t=8hn3QSE7cjraNKeY-1).

#### Funcionamento da aplicação Web

Para utilizar a aplicação, o usuário deve ter uma conta no Spotify e com um histórico de músicas e playlist disponíveis para análise.

<p align="center" style="text-align: center;">
    <img alt="Tela inicial da aplicação Web" src="./assets/home.png" width="600" height="400"/>
    <figcaption>Tela inicial da aplicação Web.</figcaption>
</p>

Ao entrar na plataforma, o usuário deverá realizar o login usando sua conta do Spotify e continuar pelas próximas telas para selecionar uma playlist que lhe agrade para a recomendação ser feita.

<p align="center" style="text-align: center;">
    <img alt="Tela de seleção de playlists" src="./assets/playlist-list.png" width="600" height="400"/>
    <figcaption>Tela de seleção de playlists.</figcaption>
</p>

Ao final, a aplicação Web exibirá todas as músicas recomendadas com base na playlist fornecida e deixará disponível um botão para a playlist ser adicionada à conta do Spotify do usuário.

<p align="center" style="text-align: center;">
    <img alt="Tela de exibição da playlist criada" src="./assets/playlist-created.png" width="600" height="400"/>
    <figcaption>Tela de exibição da playlist criada.</figcaption>
</p>

## Implementação

Como informado nas especificações do projeto, será desenvolvido um sistema de recomendações para o usuário, seguindo a pipeline abaixo:

<p align="center" style="text-align: center;">
    <img alt="Pipeline do Sistema de Recomendação" src="./assets/pipeline.png"/>
</p>

Após a conclusão do sistema de recomendação, será criado a API e a aplicação em React para o usuário poder utilizar o mesmo, como mostrado no artefato abaixo:

<p align="center" style="text-align: center;">
    <img height="200px" alt="Artefato" src="./assets/artifacts.png" />
</p>

## Progresso do Projeto

* Notebook de recomendações: 100%
* Front-end: 75%
* Back-end: 0% (Não iniciado)

## Critérios de Avaliação

- Relevância do projeto e complexidade (10%)
- Documentação (20%)
- Código-fonte (20%)
- Estruturas de engenharia (25%)
