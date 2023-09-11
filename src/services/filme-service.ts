import { API_KEY } from "../../secrets";
import { Filme } from "../models/filme";

export class FilmeService{
 
    pesquisarPorId(id: string): Promise<Filme> {
    const url = `https://api.themoviedb.org/3/movie/${id}`;

    return fetch(url, this.obterHeaderAutorizacao())
            .then(res => res.json())
            .then((obj: any): Promise<Filme> => this.mapearFilme(obj));
}
  async mapearFilme(obj: any): Promise<Filme> {

    // const nomesDosGeneros = obj.genres.map((genero: any) => genero.name);
    const link = await this.pequisarVideo(obj.id);
    console.log(link);
    let key = "";
    if (link == undefined) {
      key = "https://www.youtube.com";
  }
    else {
      key = link.key as string;

  }


  return {

      id: obj.id,
      titulo: obj.title,
      // genero: nomesDosGeneros,
      sinopse: obj.overview,
      poster: `https://image.tmdb.org/t/p/original/${obj.poster_path}`,
      video: `https://www.youtube.com/embed/${key}`,


  }
}






async mapearLista(obj: any): Promise<Filme> {


  return {

      id: obj.id,
      titulo: obj.title,
      // genero: ['', ''],
      sinopse: obj.overview,
      poster: `https://image.tmdb.org/t/p/original/${obj.poster_path}`,
      video: `https://www.youtube.com/embed/`,


  }
}



pequisarVideo(id: any): Promise<any> {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-En`;
  return fetch(url, this.obterHeaderAutorizacao())
      .then(res => res.json())
      .then(data => {
          return data.results[data.results.length - 1] as string;
      });

}



PesquisarTopRated(): Promise<Filme[]> {

  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-EN&page=1';

  return fetch(url, this.obterHeaderAutorizacao())
      .then(res => res.json())
      .then((obj: any): Promise<Filme[]> => this.mapearListaFilme(obj.results));
}

private mapearListaFilme(objetos: any[]): any {
  const filmes = objetos.map(obj => this.mapearLista(obj))

  return Promise.all(filmes);

}

private obterHeaderAutorizacao() {

  return {
      method: "GET",
      headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
      },
  }
}


}