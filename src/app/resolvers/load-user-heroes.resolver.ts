import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../database';

export const loadUserHeroesResolver: ResolveFn<{heroes:Hero[],amount:number}|null> = (route, state) => {
  const page=route.params['page']*1
  const router=inject(Router)
  if (!(page>=1)){
    router.navigate(['user-heroes/1'])
    return of(null)
  }

  const heroesService=inject(HeroesService)  
  return heroesService.getUserHeroes(page).pipe(map((heroesAndAmount)=> {
    if (heroesAndAmount) 
      return {heroes:heroesAndAmount.heroes,amount:heroesAndAmount.amount,page}
    alert('you sign out somehow you need to sign in again')
    router.navigate(['sign-in'])
    return null
  }))
}
