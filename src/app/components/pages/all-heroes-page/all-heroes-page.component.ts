import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/database';

@Component({
  selector: 'app-all-heroes-page',
  templateUrl: './all-heroes-page.component.html',
  styleUrls: ['./all-heroes-page.component.scss']
})
export class AllHeroesPageComponent implements OnInit,OnDestroy {
  constructor(public route:ActivatedRoute){}
  heroes!:Hero[]
  subscriber!:Subscription
  subscriber2!:Subscription
  page!:number
  ngOnInit():void{
    this.subscriber=this.route.data.subscribe((data:any)=>{
      console.log("fff",data[0])
      this.heroes=data[0]
    })
    this.subscriber2= this.route.paramMap.subscribe(params=>{
      const page=params.get("page") as string
      this.page=parseInt(page)
      console.log(this.page)
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
    this.subscriber2.unsubscribe()
  }
}
