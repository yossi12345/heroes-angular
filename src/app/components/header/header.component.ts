import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{
  @Input() isUserPage!:boolean
  subscriber!:Subscription
  user!:User|null
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.subscriber=this.authService.userObservable.subscribe((user)=>{
      this.user=user
    })
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }
  signOut(){
    this.authService.signOut()
  }
}
