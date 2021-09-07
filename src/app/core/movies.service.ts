import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../shared/models/movie';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/movies/';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  save(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(url, movie);
  }

  edit(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(url + movie.id, movie);
  }

  list(config: ConfigPrams): Observable<Movie[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Movie[]>(url, {params: configPrams});
  }

  view(id: number): Observable<Movie> {
    return this.http.get<Movie>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
