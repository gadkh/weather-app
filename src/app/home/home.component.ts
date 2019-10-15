import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Forecasts } from '../forecasts';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { City } from '../city';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  city:City;
  tempForcast:Forecasts[]=[];
  forecasts:Forecasts;
  values;
  cities;
  valu:any;
  datesTemp:string[]=["2019-10-12","2019-10-131","2019-10-141","2019-10-151","2019-10-161"];
  days:string[]=["Sunny","Sunny","Partly sunny","Partly sunny","Partly sunny"];
  night:string[]=["Partly sunny","Partly sunny","Partly sunny","Sunny","Sunny"]
  constructor(private request:RequestService) {
    this.forecasts=new Forecasts();
    this.city=new City();
    this.getWeather(this.request.defaultForects.cityKey,this.request.defaultForects.cityName);
   }

  ngOnInit() {
  }


  AddToFavorites(){
    this.request.addToFavorites(this.forecasts);    
  }
  removeFromFavorites(){
    this.request.removeFromFavorites(this.forecasts);
  }

  checkIfCityExist(){
    return this.request.checkIfCityExist(this.forecasts);
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
    this.getWeather(this.city.cityKey,this.city.cityName);
    
  }

  getWeather(cityKey,cityName){
    this.request.getForecastsForFiveDay(cityKey).subscribe(returnValue=>{
      console.log(returnValue);
      this.forecasts.cityName=cityName;
      this.forecasts.cityKey=cityKey;
      for(let i=0;i<returnValue["DailyForecasts"].length;i++)
      {
        this.forecasts.fiveDaysForecasts.pop()
        this.forecasts.fiveNightForecasts.pop()
        this.forecasts.dates.pop();
      }
      for(let i=0;i<returnValue["DailyForecasts"].length;i++)
      {
        this.forecasts.fiveDaysForecasts.push(returnValue["DailyForecasts"][i]["Day"]["IconPhrase"])
        this.forecasts.fiveNightForecasts.push(returnValue["DailyForecasts"][i]["Night"]["IconPhrase"])
        let date=returnValue["DailyForecasts"][i]["Date"].substring(0,10);
        this.forecasts.dates.push(date);
      }
    
    
    });
  }
 }


