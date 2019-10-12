import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Forecasts } from '../forecasts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //temp:any="";
  forecasts:Forecasts;
  values;
  valu:any;
  constructor(private request:RequestService) {
    this.forecasts=new Forecasts();
    this.forecasts.cityName="Tel Aviv";
    this.forecasts.cityKey="215854";
    // this.request.getForecastsForOneDay(this.forecasts.cityKey).subscribe(returnValue=>{
    //    this.forecasts.currentDayForecasts=returnValue["DailyForecasts"][0]["Day"]["IconPhrase"];
    //    this.forecasts.currentNightForecasts=returnValue["DailyForecasts"][[0]]["Night"]["IconPhrase"];
    //    this.forecasts.date=returnValue["DailyForecasts"][0]["Date"];
    //   //console.log(returnValue["DailyForecasts"][0]["Date"]);
      
    //   // DailyForecasts.Day.IconPhrase	
    // })
    // console.log(this.request.getAutocompleteSearch("Tel Aviv").subscribe(x=>{
    //   console.log(x);
    // }));
   }

  ngOnInit() {
  }

  click()
  {
    //this.temp=this.request.get();
    // console.log(this.request.get().subscribe(x=>{
    //   console.log(x[0].ID);
      
      
    // }));
    console.log(this.request.newGet().subscribe(x=>{
      console.log(x);
    }));
  }
  clickMe(search){
    console.log(search);
    
  }
  onKey(event: KeyboardEvent) { // with type info
    var valClick=(event.target as HTMLInputElement).value;
    if(valClick!=""){

    this.request.getAutocompleteSearch(valClick).subscribe(x=>{
      this.values=x;
      console.log(x[0].LocalizedName);
      
    });
    this.values = (event.target as HTMLInputElement).value;
  }
  else{
    }
  }

  AddToFavorites(){
    this.request.addToFavorites(this.forecasts);
    console.log(this.request.favorites);
  }
  removeFromFavorites(){
    this.request.removeFromFavorites(this.forecasts);
    console.log(this.request.favorites);
  }
}
