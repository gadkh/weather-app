import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  temp:any="";
  constructor(private request:RequestService) { }

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
}
