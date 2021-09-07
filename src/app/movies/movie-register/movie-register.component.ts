import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Alert } from '../../shared/models/alert';
import { MoviesService } from 'src/app/core/movies.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidateInputService } from 'src/app/shared/components/inputs/validate-input.service';
import { Movie } from 'src/app/shared/models/movie';


@Component({
  selector: 'dio-movie-register',
  templateUrl: './movie-register.component.html',
  styleUrls: ['./movie-register.component.scss']
})
export class MovieRegisterComponent implements OnInit {

  register: FormGroup;

  genres: Array<string>;
  
  constructor(
              public dialog: MatDialog,
              public validation: ValidateInputService, 
              private fb: FormBuilder,
              private movieService: MoviesService,
              private router: Router,) {}

  get f(){
    return this.register.controls;
  }

  ngOnInit() {
    this.register = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      pictureUrl: ['', [Validators.minLength(10)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      score: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      imdbUrl: ['', [Validators.minLength(10)]],
      genre: ['', [Validators.required]]
    });

    this.genres = ["Action", "Adventure","Comedy", "Drama", "Fantasy", "Horror", "Mystery","Musical", "Science Fiction", "Suspense", "Western"]

  }

  public submit(): void {
    this.register.markAllAsTouched();
    if(this.register.invalid){
      return;
    }
    const movie = this.register.getRawValue() as Movie;
    this.save(movie);
  }

  public clearForm(): void {
    this.register.reset();
  }

  private save(movie: Movie): void{
    this.movieService.save(movie).subscribe(() => {
      const config = {
        data: {
          btnSuccess: "Finish",
          btnCancel: "New Entry",
          hasBtnClose: true,
          colorBtnCancel: "primary"
        } as Alert

      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe((option: boolean) => {
        if (option){
          this.router.navigateByUrl('movies');
        } else {
          this.clearForm();
        }
      })
    },
    () => {
      const config = {
        data: {
          title: "Oops!",
          description: "Sorry, your request has failed.",
          colorBtnSuccess: "warn",
          btnSuccess: "Close",
        } as Alert,
      };
        this.dialog.open(AlertComponent, config);
      })
  }

}
