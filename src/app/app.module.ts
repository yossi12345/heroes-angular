import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpPageComponent } from './components/pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
import { LogFormComponent } from './components/log-form/log-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserHeroesPageComponent } from './components/pages/user-heroes-page/user-heroes-page.component';
import { AllHeroesPageComponent } from './components/pages/all-heroes-page/all-heroes-page.component';
import { HeroComponent } from './components/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    SignInPageComponent,
    LogFormComponent,
    UserHeroesPageComponent,
    AllHeroesPageComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
