import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  register: FormGroup;
  
  constructor(private fb: FormBuilder) {}

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
      gender: ['', [Validators.required]]
    });
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
