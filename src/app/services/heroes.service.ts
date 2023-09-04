import { Injectable } from '@angular/core';

import { Hero, getAllHeroes, getUserHeroes, giveHero } from '../database';
import { AuthService } from './auth.service';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor(private authService:AuthService){}
  getAllHeroes(page:number=1){
    const response=getAllHeroes(3,page)
    return response.pipe(map((response)=>response.heroes))
  }
  getUserHeroes(page:number=1){
    const token:string|null=this.authService.getToken()
    if (token){
      const response=getUserHeroes(token,page)
      return response.pipe(map((response)=>{
        if (response.status===200)
          return response.heroes
        return null
      }))
    }
    return of(null)
  }
  getAllowedNextTrainingDate(hero:Hero){
    return hero.getAllowedNextTrainingDate()
  }
  ownHero(hero:Hero){
    const token:string|null=this.authService.getToken()
    if (!token)return 
    giveHero(hero,token)
  }
}
