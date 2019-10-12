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
  constructor(private http:HttpClient) { }
  get(){
    var url="http://dataservice.accuweather.com/locations/v1/adminareas/US?apikey=qREWg9ZTL3GqcAywv8GE7QR8dhETAQ57"
    // var url="http://dataservice.accuweather.com/locations/v1/adminareas/NY?apikey=qREWg9ZTL3GqcAywv8GE7QR8dhETAQ57&language=en&offset=20"
    return this.http.get(url);
  }
  newGet()
  {
    var url="http://dataservice.accuweather.com/forecasts/v1/daily/1day/US?apikey=qREWg9ZTL3GqcAywv8GE7QR8dhETAQ57"
    return this.http.get(url);
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
  addToFavorites(forecasts:Forecasts){
    var index=this.checkIfCityExist(forecasts);
  if(index==-1){
    this.favorites.push(forecasts);
  }
}
  removeFromFavorites(forecasts:Forecasts){
    var index=this.checkIfCityExist(forecasts);
    console.log(index);
    this.favorites.splice(index,1);
  }
  getAllFavorites() {
    return [...this.favorites]; // copy the original post arry and it content to new arry, is not a copy of reference
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
