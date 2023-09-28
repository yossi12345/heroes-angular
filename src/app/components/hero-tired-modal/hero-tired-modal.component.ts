import { Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Hero } from 'src/app/database';
import { HeroesService } from 'src/app/services/heroes.service';
@Component({
  selector: 'app-hero-tired-modal',
  templateUrl: './hero-tired-modal.component.html',
  styleUrls: ['./hero-tired-modal.component.scss']
})
export class HeroTiredModalComponent{
  hero:Observable<Hero|null>=this.heroesService.heroForModal
  allowedNextTrainingDate:Observable<Date|null>=this.heroesService.dateForModal
  constructor(private heroesService:HeroesService){}
  onClick(){
    this.heroesService.closeModal()
  }
}
