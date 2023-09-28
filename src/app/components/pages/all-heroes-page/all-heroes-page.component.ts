import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Subscription, first } from 'rxjs';
import { Hero } from 'src/app/database';

@Component({
  selector: 'app-all-heroes-page',
  templateUrl: './all-heroes-page.component.html',
  styleUrls: ['./all-heroes-page.component.scss']
})
export class AllHeroesPageComponent implements OnInit,OnDestroy {
  constructor(private route:ActivatedRoute){}
  heroes!:Hero[]
  amountOfHeroes!:number
  page!:number
  subscriber!:Subscription
  ngOnInit():void{
   this.subscriber=this.route.data.subscribe((data:any)=>{
      console.log("resolver data:",data)
      this.heroes=data[0].heroes
      this.amountOfHeroes=data[0].amount
      this.page=data[0].page
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
