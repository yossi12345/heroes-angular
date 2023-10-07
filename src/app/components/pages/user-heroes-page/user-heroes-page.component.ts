import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  allUserHeroes!:Hero[]
  heroesInPage!:Hero[]
  page!:number
  subscriber!:Subscription
  ngOnInit():void{
    this.subscriber=this.route.data.subscribe((data:any)=>{
      console.log("user resolver data:",data[0])
      this.allUserHeroes=data[0].heroes
      this.page=data[0].page
      this.updateHeroesInPage()
      if (this.heroesInPage.length===0&&this.page!==1)
        this.router.navigate(['/user-heroes/1'],{replaceUrl:true})
    })
    this.subscriber.add(this.heroesService.userHeroes$.subscribe((heroes)=>{
      if (!heroes) return 
      this.allUserHeroes=heroes
      this.updateHeroesInPage()
      if (this.page>1&&this.heroesInPage.length===0)
        this.router.navigate(['/user-heroes/'+(this.page-1)],{replaceUrl:true})
    }))
  }
  updateHeroesInPage(){
    const result=[]
    for(let i=(this.page-1)*3;i<this.allUserHeroes.length&&i<(this.page*3);i++)
      result.push(this.allUserHeroes[i])
    this.heroesInPage=result
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
}
