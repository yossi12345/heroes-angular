import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/database';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit{
  @Input() isSignIn!:any
  logForm!:FormGroup
  isUserSubmited:boolean=false
  upperError:string=""
  constructor(private fb:FormBuilder,private auth:AuthService){}
  ngOnInit(): void {
    this.logForm=this.fb.group({
      username:['',[Validators.required,Validators.maxLength(10)]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      repeatedPassword:['',[]]
    })
  }
  getControl(name:'password'|'repeatedPassword'|'username'):FormControl{
    return this.logForm.get(name) as FormControl
  }
  getError(isPassword:boolean){
    const control=this.getControl(isPassword?'password':'username')
    if ((control.touched||this.isUserSubmited)&&control.getError('required'))
      return (isPassword?'password':'username')+' is required'
    if (this.isSignIn||!control.touched)
      return ""
    if (!isPassword&&control.getError('maxlength'))
      return "username can't be more than 10 characters"
    if (isPassword&&(control.getError('maxlength')||control.getError('minlength')))
      return 'password must be 8-20 characters'
    return ""
  }
  handleSubmit(){
    this.isUserSubmited=true
    if (this.logForm.invalid)
      return
    const password=this.getControl('password').value
    const username=this.getControl('username').value
    if (this.isSignIn){
      const isLogSuccessfully=this.auth.signIn(username,password)
      if (!isLogSuccessfully){
        this.upperError=""
        setTimeout(()=>{
          this.upperError='the username or password is wrong'
        },1000)
      }
    }
    else if (password===this.getControl('repeatedPassword').value){
      const isLogSuccessfully=this.auth.signUp(username,password)
      if (!isLogSuccessfully){
        this.upperError=""
        setTimeout(()=>{
          this.upperError='this username already exists'
        },1000)
      }
    } 
  }
}
