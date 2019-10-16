import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Forecasts } from './forecasts';
import { City } from './city';
import { throwError, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  // key="qREWg9ZTL3GqcAywv8GE7QR8dhETAQ57";
  // key="p8bw0H51f34qpz0A3csdVhjhTowWojvA";
  //key="ffA32sKUhlcWEgZKpT2sWD9eYutJgfeE";
  key="sTPje46idRkkhQvkEa4uUrB6hYS5THSO";
  basicUrl="http://dataservice.accuweather.com/";
  language="en";
  favorites:Forecasts[]=[];

  defaultForects:Forecasts;
  currentForecats:Forecasts;
  constructor(private http:HttpClient) { 
    
    this.defaultForects=new Forecasts();
    this.currentForecats=new Forecasts();

    this.defaultForects.city.cityName="Tel Aviv";
    this.defaultForects.city.cityKey="215854";

    this.currentForecats.city.cityName="Tel Aviv";
    this.currentForecats.city.cityKey="215854";
  }
 
  getAutocompleteSearch(cityName)
  {
    var url=this.basicUrl+"locations/v1/cities/autocomplete?apikey="+this.key+"&q="+cityName+"&language="+this.language;
    return this.http.get(url);
  }
  getForecastsForOneDay(code)
  {
    var url=this.basicUrl+"forecasts/v1/daily/1day/"+code+"?apikey="+this.key+"&language="+this.language+"&details=false&metric=false";
    return this.http.get(url);
  }
  getForecastsForFiveDay(code)
  {
    var url=this.basicUrl+"forecasts/v1/daily/5day/"+code+"?apikey="+this.key+"&language="+this.language+"&details=true&metric=true";
    return this.http.get(url);
  }
  addToFavorites(forecasts:Forecasts){
    // let index=this.checkIfCityExist(forecasts.city);
    var forecastsNew:Forecasts=new Forecasts();
    forecastsNew.city.cityKey=forecasts.city.cityKey;
    forecastsNew.city.cityName=forecasts.city.cityName;
    forecasts.dates.forEach(date => {
      forecastsNew.dates.push(date);
    });
    forecasts.fiveDaysForecasts.forEach(day => {
      forecastsNew.fiveDaysForecasts.push(day);
    });
    forecasts.fiveNightForecasts.forEach(night => {
      forecastsNew.fiveNightForecasts.push(night);
    });
     let index=this.checkIfCityExist(forecastsNew.city);
    if(index==-1){
      this.favorites.push(forecastsNew);  
  }
}
  removeFromFavorites(forecasts:Forecasts){
    let index=this.checkIfCityExist(forecasts.city);
    this.favorites.splice(index,1);
  }
  getAllFavorites() {
    //return [...this.favorites]; 
    return this.favorites;
}
 

  checkIfCityExist(city:City){
    let index=-1;
    for (let i = 0; i < this.favorites.length&&index==-1;i++){
      if(this.favorites[i].city.cityKey==city.cityKey)
      {
        index=i;
      }
  }  
  return index;
  }
}

