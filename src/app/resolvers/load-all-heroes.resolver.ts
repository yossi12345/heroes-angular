import {ResolveFn,Router} from '@angular/router';
import {Hero} from '../database';
import {inject} from '@angular/core';
import {map,of} from 'rxjs';
import {HeroesService} from '../services/heroes.service';
export const loadAllHeroesResolver: ResolveFn<Hero[]|null> = (route, state) => {
  const page=route.params['page']*1
  const router=inject(Router)
  if (!(page>=1)){
    router.navigate(['hero/1'])
    return of(null)
  }

  const heroesService=inject(HeroesService)  
  return heroesService.getAllHeroes(page).pipe(map((heroes)=> {
    console.log(';;',heroes[0])
    if(heroes.length===0){
      router.navigate(['heroes/1'])
      return null
    }
    return heroes
  }))
}


