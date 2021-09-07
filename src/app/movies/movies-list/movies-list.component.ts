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
  readonly pictureNotFound = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigPrams = {
    page: 0,
    limit: 4
  };
  movies: Movie[] = [];
  listFilter: FormGroup;
  genres: Array<string>;

  constructor(private moviesService: MoviesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.listFilter = this.fb.group({
      text: [''],
      genre: ['']
    });

    this.listFilter.get('text').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.search = val;
      this.clearSearch();
    });

    this.listFilter.get('genre').valueChanges.subscribe((val: string) => {
      this.config.field = {type: 'genre', value: val};
      this.clearSearch();
    });

    this.genres = ["Action", "Adventure","Comedy", "Drama", "Fantasy", "Horror", "Mystery","Musical", "Science Fiction", "Suspense", "Western"];

    this.listMovies();
  }

  onScroll(): void {
    this.listMovies();
  }

  open(id: number): void {
    this.router.navigateByUrl('/movies/' + id);
  }

  private listMovies(): void {
    this.config.page++;
    this.moviesService.list(this.config)
      .subscribe((movies: Movie[]) => this.movies.push(...movies));
  }

  private clearSearch(): void {
    this.config.page = 0;
    this.movies = [];
    this.listMovies();
  }
}
