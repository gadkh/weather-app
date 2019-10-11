import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"favorites",component:FavoritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
