import { City } from './city';

export class Forecasts {
    city:City;
    currentDayForecasts:string;
    currentNightForecasts:string;
    fiveDaysForecasts:string[]=[];
    fiveNightForecasts:string[]=[];
    dates:string[]=[];
    date:string;
    minTemperature:number[]=[];
    maxTemperature:number[]=[];
    constructor(){
        this.city=new City();
    }

}
