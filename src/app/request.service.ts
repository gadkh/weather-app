import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Forecasts } from './forecasts';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  key="qREWg9ZTL3GqcAywv8GE7QR8dhETAQ57";
  basicUrl="http://dataservice.accuweather.com/";
  language="en";
  favorites:Forecasts[]=[];
  defaultForects:Forecasts;
  currentForecats:Forecasts;
  constructor(private http:HttpClient) { 
    this.defaultForects=new Forecasts();
    this.currentForecats=new Forecasts();

    this.defaultForects.cityName="Tel Aviv";
    this.defaultForects.cityKey="215854";

    this.currentForecats.cityName="Tel Aviv";
    this.currentForecats.cityKey="215854";
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
    var url=this.basicUrl+"forecasts/v1/daily/5day/"+code+"?apikey="+this.key+"&language="+this.language+"&details=false&metric=false";
    return this.http.get(url);
  }
  addToFavorites(forecasts:Forecasts){
    
    var index=this.checkIfCityExist(forecasts);
  if(index==-1){
    this.favorites.push(forecasts);
    console.log("in service");
    console.log(this.favorites);
    
    
  }
}
  removeFromFavorites(forecasts:Forecasts){
    var index=this.checkIfCityExist(forecasts);
    console.log(index);
    this.favorites.splice(index,1);
  }
  getAllFavorites() {
    return [...this.favorites]; 
}
  checkIfCityExist(forecasts:Forecasts){
    var index=-1;
    for (let i = 0; i < this.favorites.length&&index==-1;i++){
      if(this.favorites[i].cityKey==forecasts.cityKey)
      {
        index=i;
      }
  }
  return index;
  }
}
