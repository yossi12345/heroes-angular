import { Injectable } from '@angular/core';
import { User, getUserByToken, signIn,signUp } from '../database';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HeroesService } from './heroes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router:Router) {}
  private token:string|null=sessionStorage.getItem('token')
  private tokenSub=new BehaviorSubject<string|null>(this.token)
  private userSub=new BehaviorSubject<User|null>(this.token?getUserByToken(this.token):null)
  token$=this.tokenSub.asObservable()
  user$=this.userSub.asObservable()
  getToken():null|string{
    return this.token
  }
  signIn(username:string,password:string){
    const {user,token}=signIn(username,password)
    if (token&&user){
      this.handleLogSuccessfully(user,token)
      return true
    }
    return false
  }
  signUp(username:string,password:string){
    const {user,token}=signUp(username,password)
    if (token&&user){
      this.handleLogSuccessfully(user,token)
      return true
    }
    return false
  }
  signOut(heroesService:HeroesService){
    sessionStorage.removeItem('token')
    this.tokenSub.next(null)
    this.userSub.next(null)
    this.token=null
    heroesService.cleanUserHeroesStates()
    this.router.navigate(['/sign-in'],{replaceUrl:true})
  }
  isLogged(){
    return (this.token&&getUserByToken(this.token))?true:false
  }
  private handleLogSuccessfully(user:User,token:string){
    sessionStorage.setItem('token',token)
    this.tokenSub.next(token)
    this.token=token
    this.userSub.next(user)
    
    this.router.navigate(['/heroes/1'],{replaceUrl:true})
  }
}
