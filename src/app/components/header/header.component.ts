import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/database';
import { AuthService } from 'src/app/services/auth.service';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{
  subscriber!:Subscription
  user!:User|null
  @Input() isUserHeroesPage!:boolean
  @Input() isAllHeroesPage!:boolean
  constructor(private authService:AuthService,private heroService:HeroesService){}
  ngOnInit(): void {
    this.subscriber=this.authService.user$.subscribe((user)=>{
      this.user=user
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
  signOut(){
    this.authService.signOut(this.heroService)
  }
}
