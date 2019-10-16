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
  forecasts:Forecasts;
  constructor(private request:RequestService, private router:Router) { 
    this.forecasts=new Forecasts();
    this.favorites=this.request.getAllFavorites();
    this.forecasts=this.request.defaultForects;
  }
  ngOnInit() {
    this.request.currentForecats=this.request.defaultForects;
  }
  removeFromFavorites(forecasts:Forecasts){
     this.request.removeFromFavorites(forecasts);
     this.favorites=this.request.getAllFavorites();
  }
  getDetailes(fav:Forecasts){
    this.request.currentForecats.city.cityKey=fav.city.cityKey;
    this.request.currentForecats.city.cityName=fav.city.cityName;
    this.router.navigate([""]);
  }
  checkIsFavoriteEmpty(){
    if(this.request.getAllFavorites().length>0)
    {
      return false;
    }
    else{
      return true;
    }
  }
}
