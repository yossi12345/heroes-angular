import { Injectable } from '@angular/core';
import { User, getUserByToken, signIn,signUp } from '../database';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router:Router) { }
  private token:string|null=sessionStorage.getItem('token')
  private tokenBehaviorSubject=new BehaviorSubject<string|null>(this.token)
  private userBehaviorSubject=new BehaviorSubject<User|null>(this.token?getUserByToken(this.token):null)
  tokenObservable=this.tokenBehaviorSubject.asObservable()
  userObservable=this.userBehaviorSubject.asObservable()
  getToken():null|string{
    return this.tokenBehaviorSubject.getValue()
  }
  signIn(username:string,password:string){
    const {user,token}=signIn(username,password)
    if (token&&user){
      console.log('weffsa')
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
  signOut(){
    sessionStorage.removeItem('token')
    this.tokenBehaviorSubject.next(null)
    this.userBehaviorSubject.next(null)
    this.token=null
    this.router.navigate(['/sign-in'],{replaceUrl:true})
  }
  isLogged(){
    // console.log("dd",this.token)
    // if (this.token&&getUserByToken(this.token)){
      
    //   return true
    // }
    // return false
    return (this.token&&getUserByToken(this.token))?true:false
  }
  private handleLogSuccessfully(user:User,token:string){
    sessionStorage.setItem('token',token)
    this.tokenBehaviorSubject.next(token)
    this.token=token
    this.userBehaviorSubject.next(user)
    
    this.router.navigate(['/heroes/1'],{replaceUrl:true})
  }
}
