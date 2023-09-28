import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { Hero } from 'src/app/database';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-user-heroes-page',
  templateUrl: './user-heroes-page.component.html',
  styleUrls: ['./user-heroes-page.component.scss']
})
export class UserHeroesPageComponent implements OnInit, OnDestroy{
  constructor(public route:ActivatedRoute,private heroesService:HeroesService,private router:Router){}
  isModalClose!:boolean
  heroes!:Hero[]
  amountOfHeroes!:number
  page!:number
  subscriber!:Subscription
  ngOnInit():void{
    this.subscriber=this.route.data.subscribe((data:any)=>{
      console.log("user resolver data:",data[0])
      this.heroes=data[0].heroes
      this.amountOfHeroes=data[0].amount
      this.page=data[0].page
    })
    this.subscriber.add(this.heroesService.isModalClose.subscribe((data)=>{
      this.isModalClose=data
    }))
  }
  afterUnownHero(){
    this.heroesService.getUserHeroes(this.page).pipe(first()).subscribe((data)=>{
      const {heroes,amount}=data as {heroes:Hero[],amount:number}
      if (heroes.length===0&&this.page>1)
        this.router.navigate(['/user-heroes/'+(this.page-1)],{replaceUrl:true})
      else{
        this.heroes=heroes
        this.amountOfHeroes=amount
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
