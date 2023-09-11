import "bootstrap";
import "./filme-listagem.css";
import { FilmeService } from "../../services/filme-service";
import { Filme } from "../../models/filme";

class TelaInicio {
  filmeService: FilmeService;
  containerFilmes: HTMLElement; 

  constructor() {
      this.filmeService = new FilmeService();
      this.registrarElementos();

      this.filmeService.PesquisarTopRated()
          .then(filmes => this.TopRared(filmes));
  }

  registrarElementos() {
      this.containerFilmes = document.getElementById("containerFilmes") as HTMLElement;
  }

  TopRared(filmes: Filme[]): any {
      for (let filme of filmes) {
          const card = this.GerarFilme(filme);

          this.containerFilmes.appendChild(card);
      }
  }

  GerarFilme(filme: Filme) {
      const card = document.createElement('div');
      card.classList.add('card','card_red','card_violet','title', 'fa','text-center','col-6', 'col-md-4', 'col-lg-1', 'mb-4'); 
      const containerDiv = document.createElement('div');
      containerDiv.classList.add('d-grid', 'gap-5', 'text-center');
      const imagem = document.createElement('img');

      imagem.classList.add('card-img-top','img-fluid', 'rounded-4');
      imagem.id = 'poster';
      imagem.src = filme.poster;
      
      const titulo = document.createElement('a');
      titulo.classList.add('titulo');
      titulo.id = 'titulo';
      titulo.textContent = filme.titulo;
      containerDiv.appendChild(imagem);
      containerDiv.appendChild(titulo);
      card.appendChild(containerDiv);
      card.addEventListener('click', () => this.redirecionarUsuario(filme.id))
      return card;
  }

  redirecionarUsuario(id: number): any {
    window.location.href = "detalhes.html?id=" + id;
  }
}

window.addEventListener('load', () => new TelaInicio());