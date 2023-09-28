import { Injectable } from '@angular/core';

import { Hero, getAllHeroes, getUserHeroes, giveHero, removeHero } from '../database';
import { AuthService } from './auth.service';
import { BehaviorSubject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor(private authService:AuthService){}
  allHeroes=1
  getAllHeroes(page:number=1){
    const response=getAllHeroes(page)
    return response.pipe(map((response)=>{
      return {
        heroes: response.heroes,
        amount:response.amount
      }
    }))
  }
  getUserHeroes(page:number=1){
    const token:string|null=this.authService.getToken()
    if (!token)
      return of(null)
    return getUserHeroes(token,page).pipe(map((response)=>{
      return response.status!==200?null:{heroes:response.heroes,amount:response.amount}
    }))
  }
  getAllowedNextTrainingDate(hero:Hero){
    return hero.getAllowedNextTrainingDate()
  }
  ownHero(hero:Hero){
    const token:string|null=this.authService.getToken()
    if (token)
      giveHero(hero,token)
  }
  unownHero(hero:Hero){
    const token:string|null=this.authService.getToken()
    if (!token)
      return false 
    return removeHero(hero,token).status===200
  }
  train(hero:Hero){
    const token:string|null=this.authService.getToken()
    if (!token)
      return false
    const response=hero.train(token)
    if (response.status===404)
      return false
    if (response.status===200)
      return true
    return false
  }
}
