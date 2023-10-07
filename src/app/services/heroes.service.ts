import { Injectable } from '@angular/core';
import { Hero, getAllHeroes, getSpecificHero, getUserHeroes, giveHero, removeHero } from '../database';
import { AuthService } from './auth.service';
import {  BehaviorSubject, first, map, of, } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class HeroesService {
  constructor(private authService:AuthService,private router:Router){}
  private allHeroesSub=new BehaviorSubject<{heroes:Hero[],page:number,amount:number}|null>(null)
  allHeroes$=this.allHeroesSub.asObservable()
  private userHeroesSub=new BehaviorSubject<Hero[]|null>(null)
  userHeroes$=this.userHeroesSub.asObservable()
  private heroForHeroPage:null|Hero=null
  cleanUserHeroesStates(){
    this.userHeroesSub.next(null)
  }
  navigateToHeroPage(hero:Hero){
    this.heroForHeroPage=hero
    this.router.navigate(['/hero/'+hero.name])
  }
  getSpecificHero(heroName:string){
    // const allHeroes=this.allHeroesSub.getValue()
    // const userHeroes=this.userHeroesSub.getValue()
    // console.log("UYUY")
    // if (userHeroes){
    //   const hero=userHeroes.find((hero)=>(hero.name===heroName))
    //   if (hero) return of(hero)
    // }
    // if (allHeroes){
    //   const hero=allHeroes.heroes.find((hero)=>(hero.name===heroName))
    //   if (hero) return of(hero)
    // } 
    if (this.heroForHeroPage?.name===heroName) return of(this.heroForHeroPage)
    return getSpecificHero(heroName).pipe(map((response)=>{
      if (response.status===200){
        this.heroForHeroPage=response.hero
        return response.hero
      }
      return null
    }))
  }
  updateAllHeroesState(page:number=1):void{
    const currentAllHeroes=this.allHeroesSub.getValue()
    if (page===currentAllHeroes?.page)
      this.allHeroesSub.next(currentAllHeroes)
    else
      getAllHeroes(page).pipe(first()).subscribe((response)=>{
        this.allHeroesSub.next({
          heroes:response.heroes,
          amount:response.amount,
          page
        })
      })
  }
  updateUserHeroesState():void{
    const token:string|null=this.authService.getToken()
    if (!token){
      this.userHeroesSub.next(null)
      return 
    }
    console.log("update",this.userHeroesSub.getValue())
    if (!this.userHeroesSub.getValue()){
      getUserHeroes(token).pipe(first()).subscribe((response)=>{
        this.userHeroesSub.next(response.status===200?response.heroes:null)
      })
    }
  }
  ownHero(hero:Hero){
    const token:string|null=this.authService.getToken()
    if (!token||hero.owner)return;
    const userHeroes=this.userHeroesSub.getValue()
    giveHero(hero,token).pipe(first()).subscribe((response)=>{
      if (response.status===200&&userHeroes){
        userHeroes.push(hero)
        this.userHeroesSub.next(userHeroes)
      }
    })
  }
  unownHero(hero:Hero){
    const token:string|null=this.authService.getToken()
    const userHeroes=this.userHeroesSub.getValue()
    if (!token||!hero.owner)return
    // if (!token||!userHeroes)return;
    // const heroIndex=userHeroes.indexOf(hero)
    // if (heroIndex===-1) return;
    removeHero(hero,token).pipe(first()).subscribe((response)=>{
      if (response.status===200&&userHeroes){
        userHeroes.splice(userHeroes.indexOf(hero),1)
        this.userHeroesSub.next(userHeroes)
      }
    })
  }
  train(hero:Hero){
    const token:string|null=this.authService.getToken()
    if (!token)
      return {isSucceeded:false}
    const heroRestTimeInMiliseconds=86400000
    const now=new Date()
    const lastTrainingDateTime=hero.lastTrainingDate.getTime()
    if (hero.amountOfTrainingsToday===5&&(now.getTime()-lastTrainingDateTime)<heroRestTimeInMiliseconds)
        return {isSucceeded:false,allowedNextTrainDate:new Date(lastTrainingDateTime+heroRestTimeInMiliseconds)}
    const response=hero.train(token)
    if (response.status===404)
      return {isSucceeded:false}
    if (response.status===200)
      return {isSucceeded:true}
    return {isSucceeded:false,allowedNextTrainDate:response.allowedNextTrainDate}
  }
}
