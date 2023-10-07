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
import { DisplayPagesComponent } from './components/display-pages/display-pages.component';
import { HeaderComponent } from './components/header/header.component';
import { DifferenceTimeFromNowPipe } from './pipes/difference-time-from-now.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { HeroPageComponent } from './components/pages/hero-page/hero-page.component';
import { HeroesContainerComponent } from './components/heroes-container/heroes-container.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    SignInPageComponent,
    LogFormComponent,
    UserHeroesPageComponent,
    AllHeroesPageComponent,
    HeroComponent,
    DisplayPagesComponent,
    HeaderComponent,
    
    DifferenceTimeFromNowPipe,
    DialogComponent,
    HeroPageComponent,
    HeroesContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// לעשות רספונסיבי=להקטין הקלף 
//// לעשות דיאלוג גנרי שמקבל מחרוזת להצגה וזהו 
//// להוציא מהסרוויס של הגיבורים דברים שקשורים למודל 
// להוסיף עמוד של גיבור בודד
//// בסרוויס של הגיבורים לטעון את כל הגיבורים בפעם הראשונה בלבד ואותו דבר גיבורים של היוזר
//// גם לעדכן את השעה שבה הגיבור יכול להתאמן