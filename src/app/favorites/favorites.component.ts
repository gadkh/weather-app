import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Forecasts } from '../forecasts';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites:Forecasts[]=[];
  constructor(private request:RequestService) { 
    this.favorites=this.request.getAllFavorites();
  }
  ngOnInit() {
  }
  removeFromFavorites(forecasts:Forecasts){
     this.request.removeFromFavorites(forecasts);
     this.favorites=this.request.getAllFavorites();
  }
}
