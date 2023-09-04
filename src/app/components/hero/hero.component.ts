import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/database';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Input() hero!:Hero
  @Input() isUserPage!:boolean
  constructor(private heroesService:HeroesService){}
  ownHero(){
    this.heroesService.ownHero(this.hero)
  }

}
