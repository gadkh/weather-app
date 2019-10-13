import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Forecasts } from '../forecasts';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //temp:any="";
  tempForcast:Forecasts[]=[];
  forecasts:Forecasts;
  values;
  valu:any;
  datesTemp:string[]=["2019-10-12","2019-10-131","2019-10-141","2019-10-151","2019-10-161"];
  days:string[]=["Sunny","Sunny","Partly sunny","Partly sunny","Partly sunny"];
  night:string[]=["Partly sunny","Partly sunny","Partly sunny","Sunny","Sunny"]
  constructor(private request:RequestService) {
    // for(let i=0;i<5;i++)
    // {
    //   let tempFor=new Forecasts();
    //   tempFor.cityName=""+i;
    //   tempFor.cityKey=""+i;
    //   for(let j=0;j<5;j++)
    //   {
    //     tempFor.fiveDaysForecasts[j]="Sunny";
    //     tempFor.fiveNightForecasts[j]="Sunny";
    //     tempFor.dates[j]="2019-10-0"+i;
        
    //   }
    //   this.tempForcast[i]=tempFor;
    // }

    // this.forecasts=new Forecasts();
    // this.forecasts.cityName=this.request.currentForecats.cityName;
    // this.forecasts.cityKey=this.request.currentForecats.cityKey;
    
    this.request.getForecastsForFiveDay(this.request.currentForecats.cityKey).subscribe(returnValue=>{
      console.log(returnValue);
      
      for(let i=0;i<returnValue["DailyForecasts"].length;i++)
      {
        this.request.currentForecats.fiveDaysForecasts.push(returnValue["DailyForecasts"][i]["Day"]["IconPhrase"])
        this.request.currentForecats.fiveNightForecasts.push(returnValue["DailyForecasts"][i]["Night"]["IconPhrase"])
        let date=returnValue["DailyForecasts"][i]["Date"].substring(0,10);
        this.request.currentForecats.dates.push(date);
      }

    
    });

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
    this.request.addToFavorites(this.request.currentForecats);
    // for(let i=0;i<5;i++)
    // {
    //   this.request.currentForecats.dates.pop();
    //   this.request.currentForecats.fiveDaysForecasts.pop();
    //   this.request.currentForecats.fiveNightForecasts.pop();
    // }
    
    // for (let i = 0; i < 5; i++) {
    //      this.request.addToFavorites(this.tempForcast[i])
    // }
    // this.request.addToFavorites(this.tempForcast[0])
   // console.log(this.request.favorites);
  }
  removeFromFavorites(){
    this.request.removeFromFavorites(this.forecasts);
    console.log(this.request.favorites);
  }
}
