import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
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
}
