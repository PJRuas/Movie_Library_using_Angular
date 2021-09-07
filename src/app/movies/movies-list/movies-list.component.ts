import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { MoviesService } from 'src/app/core/movies.service';
import { Movie } from 'src/app/shared/models/movie';
import { ConfigPrams } from 'src/app/shared/models/config-prams';

@Component({
  selector: 'dio-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  movies: Movie[] = [];
  filtrosListagem: FormGroup;
  genres: Array<string>;

  constructor(private moviesService: MoviesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      text: [''],
      genre: ['']
    });

    this.filtrosListagem.get('text').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('genre').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'genre', valor: val};
      this.resetarConsulta();
    });

    this.genres = ["Action", "Adventure","Comedy", "Drama", "Fantasy", "Horror", "Mystery","Musical", "Science Fiction", "Suspense", "Western"];

    this.listMovies();
  }

  onScroll(): void {
    this.listMovies();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/movies/' + id);
  }

  private listMovies(): void {
    this.config.pagina++;
    this.moviesService.list(this.config)
      .subscribe((movies: Movie[]) => this.movies.push(...movies));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.movies = [];
    this.listMovies();
  }
}
