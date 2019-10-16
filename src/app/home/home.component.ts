import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Forecasts } from '../forecasts';
import { FormsModule } from '@angular/forms'; 
import { City } from '../city';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  city:City;
  forecasts:Forecasts;
  cities;
  currectCity:boolean;
  backgroundImge:string;
  constructor(private request:RequestService) {
    this.forecasts=new Forecasts();
    this.city=new City();
    this.currectCity=true;
    this.backgroundImge="../../assets/img/background.jpg";
   }

  ngOnInit() {
   this.getWeather(this.request.currentForecats.city.cityKey,this.request.currentForecats.city.cityName);
   
  }
  AddToFavorites(){
    
    this.request.addToFavorites(this.forecasts); 
    
  }
  removeFromFavorites(){
   this.request.removeFromFavorites(this.forecasts);
  }

  checkIfCityExist(){
    let check=this.request.checkIfCityExist(this.forecasts.city);
    return check;
  }
  onKey(event: KeyboardEvent) { // with type info
    var valClick=(event.target as HTMLInputElement).value;
    if(valClick!=""){
    this.request.getAutocompleteSearch(valClick).subscribe(x=>{
      if(x!=""){
        var data=JSON.stringify(x);
        this.cities=JSON.parse(data);
    }
    else{
      this.cities=null;
    }
  });
}
}
  setValue(city){    
    if(city.LocalizedName!=null){
      this.city.cityName=city.LocalizedName;
      this.city.cityKey=city.Key;
    }
  }
  sendData(){
    this.getWeather( this.city.cityKey, this.city.cityName);
  }
  getWeather(cityKey,cityName){
    this.request.getForecastsForFiveDay(cityKey).subscribe(returnValue=>{
      this.currectCity=true;
      this.forecasts.city.cityName=cityName;
      this.forecasts.city.cityKey=cityKey;
      for(let i=0;i<returnValue["DailyForecasts"].length;i++)
      {
        this.forecasts.fiveDaysForecasts.pop()
        this.forecasts.fiveNightForecasts.pop()
        this.forecasts.dates.pop();
        this.forecasts.minTemperature.pop();
        this.forecasts.maxTemperature.pop()
      }
      for(let i=0;i<returnValue["DailyForecasts"].length;i++)
      {
        this.forecasts.fiveDaysForecasts.push(returnValue["DailyForecasts"][i]["Day"]["IconPhrase"]);
        this.forecasts.fiveNightForecasts.push(returnValue["DailyForecasts"][i]["Night"]["IconPhrase"]);
        let date=returnValue["DailyForecasts"][i]["Date"].substring(0,10);
        this.forecasts.dates.push(date);
        this.forecasts.minTemperature.push(returnValue["DailyForecasts"][i]["Temperature"]["Minimum"]["Value"]);
        this.forecasts.maxTemperature.push(returnValue["DailyForecasts"][i]["Temperature"]["Maximum"]["Value"]);

      }
    },
    (err)=>{ 
      this.currectCity=false;
    });
  }
 }


