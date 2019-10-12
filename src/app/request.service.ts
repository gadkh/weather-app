import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  key="qREWg9ZTL3GqcAywv8GE7QR8dhETAQ57";
  basicUrl="http://dataservice.accuweather.com/";
  language="en";
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
}
