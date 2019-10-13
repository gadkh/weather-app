import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Forecasts } from '../forecasts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites:Forecasts[]=[];
  constructor(private request:RequestService, private router:Router) { 
    this.favorites=this.request.getAllFavorites();
    this.request.currentForecats=this.request.defaultForects;
  }
  ngOnInit() {
  }
  removeFromFavorites(forecasts:Forecasts){
     this.request.removeFromFavorites(forecasts);
     this.favorites=this.request.getAllFavorites();
  }
  getDetailes(fav:Forecasts){
    this.request.currentForecats.cityKey=fav.cityKey;
    this.request.currentForecats.cityName=fav.cityName;
    console.log(this.request.favorites[0]);
    this.router.navigate([""]);
  }
}
