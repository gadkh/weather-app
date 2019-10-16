import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Forecasts } from './forecasts';
import { City } from './city';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  key="qREWg9ZTL3GqcAywv8GE7QR8dhETAQ57";

  basicUrl="//dataservice.accuweather.com/";
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
    forecasts.maxTemperature.forEach(maxTemp => {
      forecastsNew.maxTemperature.push(maxTemp);
    });
    forecasts.minTemperature.forEach(minTemp => {
      forecastsNew.minTemperature.push(minTemp);
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
    return [...this.favorites]; 
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

