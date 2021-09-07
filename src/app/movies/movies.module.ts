import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MovieRegisterComponent } from './movie-register/movie-register.component';
import { MaterialModule } from '../shared/material/material.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { InputsModule } from '../shared/components/inputs/inputs.module';
import { MoviesViewComponent } from './movies-view/movies-view.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InputsModule,
    InfiniteScrollModule
  ],
  declarations: [MovieRegisterComponent, MoviesListComponent, MoviesViewComponent]
})
export class MoviesModule { }
