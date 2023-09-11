import { API_KEY } from "../../../secrets";
import "./filme-detalhes.css";
import { Filme } from "../../models/filme";
import { FilmeService } from "../../services/filme-service";

export class DetalhesFilme {

  private filmeService: FilmeService;
  titulo: HTMLElement;
  poster: HTMLImageElement;
  iFrameTrailer: HTMLIFrameElement;
  sinopse: HTMLElement;
  genero: HTMLElement;

  
  constructor() {
      this.filmeService = new FilmeService();

      this.registrarElementos()

      const url = new URLSearchParams(window.location.search);

      const id = url.get('id') as string;

      this.pesquisarFilmePorId(id);
  }
  registrarElementos() {
      this.titulo = document.getElementById("titulo") as HTMLElement;

      this.poster = document.getElementById("poster") as HTMLImageElement;
      this.iFrameTrailer = document.getElementById("iFrameTrailer") as HTMLIFrameElement;
      this.sinopse = document.getElementById("sinopse") as HTMLElement;
      this.genero = document.getElementById("genero") as HTMLElement;
  }

  pesquisarFilmePorId(id: string) {
      this.filmeService.pesquisarPorId(id)
          .then(filme => this.AtualizarDadosFilme(filme))
  }

  AtualizarDadosFilme(filme: Filme) {
      if (this.titulo) {

          this.titulo.textContent = filme.titulo;
      }


      if (this.poster) {
          this.poster.src = filme.poster;
      }

      if (this.iFrameTrailer) {

          this.iFrameTrailer.src = filme.video;
      }

      if (this.sinopse) {
          this.sinopse.textContent = filme.sinopse;
      }

      // if (this.genero) {
      //     this.genero.textContent = filme.genero[0];
      // }
      // if (filme.genero.length > 1) {
      //     for (let i = 1; i < filme.genero.length; i++) {
      //         if (filme.genero[i]) {

      //             const novoElementoSpan = document.createElement("span");
      //             novoElementoSpan.classList.add("badge", "rounded-pill", "fs-7", "px-2", "py-2", "bg-warning", "text-dark");
      //             novoElementoSpan.textContent = filme.genero[i];
              
      //         }
      //     }
      // }


  }

}

window.addEventListener('load', () => new DetalhesFilme());