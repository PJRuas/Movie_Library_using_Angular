import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from 'src/app/core/movies.service';
import { Movie } from 'src/app/shared/models/movie';
import { Alert } from 'src/app/shared/models/alert';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'dio-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.css']
})
export class MoviesViewComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  movie: Movie;
  id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private moviesService: MoviesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.view();
  }

  edit(): void {
    this.router.navigateByUrl('/movies/database/' + this.id);
  }

  delete(): void {
    const config = {
      data: {
        title: 'Are you sure?',
        description: 'This change cannot be undone.',
        corBtnCancel: 'primary',
        corBtnSuccess: 'warn',
        hasBtnClose: true
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((option: boolean) => {
      if (option) {
        this.moviesService.delete(this.id)
        .subscribe(() => this.router.navigateByUrl('/movies'));
      }
    });
  }

  private view(): void {
    this.moviesService.view(this.id).subscribe((movie: Movie) => this.movie = movie);
  }

}
