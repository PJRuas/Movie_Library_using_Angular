import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesModule } from './movies/movies.module';
import { MovieRegisterComponent } from './movies/movie-register/movie-register.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesViewComponent } from './movies/movies-view/movies-view.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'movies',
      pathMatch: 'full'
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        component: MoviesListComponent
      },
      {
        path: 'database',
        children: [
          {
            path: '',
            component: MovieRegisterComponent
          },
          {
            path: ':id',
            component: MovieRegisterComponent
          }
        ]
      },
      {
        path: ':id',
        component: MoviesViewComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'movies' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MoviesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
