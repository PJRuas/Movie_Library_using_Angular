import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateInputService } from 'src/app/shared/components/inputs/validate-input.service';


@Component({
  selector: 'dio-movie-register',
  templateUrl: './movie-register.component.html',
  styleUrls: ['./movie-register.component.scss']
})
export class MovieRegisterComponent implements OnInit {

  register: FormGroup;

  genres: Array<string>;
  
  constructor(public validation: ValidateInputService, 
              private fb: FormBuilder) {}

  get f(){
    return this.register.controls;
  }

  ngOnInit() {
    this.register = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlPicture: ['', [Validators.minLength(10)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      score: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      imdbUrl: ['', [Validators.minLength(10)]],
      genre: ['', [Validators.required]]
    });

    this.genres = ["Action", "Adventure","Comedy", "Drama", "Fantasy", "Horror", "Mystery","Musical", "Science Fiction", "Suspense", "Western"]

  }

  public save(): void {
    this.register.markAllAsTouched();
    if(this.register.invalid){
      return;
    }
    alert('Success!\n\n' + JSON.stringify(this.register.value, null, 4));
  }

  public clearForm(): void {
    this.register.reset();
  }

}
