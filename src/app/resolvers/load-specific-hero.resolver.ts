import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../database';

export const loadSpecificHeroResolver: ResolveFn<null|Hero> = (route, state) => {
  const heroesService=inject(HeroesService)
  const heroName=route.params['name']
  return heroesService.getSpecificHero(heroName)
};
