import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AngularFireModule }  from '@angularfire2';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
 
import { AppRoutingModule }     from './app-routing.module';
 
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { FilmDetailComponent }  from './film-detail/film-detail.component';
import { FilmsComponent }      from './films/films.component';
import { FilmSearchComponent }  from './film-search/film-search.component';
import { FilmService }          from './film.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { FileDropDirective } from './file-drop.directive';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';

export const firebaseConfig = {
  
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseconfig),
    routes,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    FilmsComponent,
    FilmDetailComponent,
    MessagesComponent,
    FilmSearchComponent,
    FileDropDirective,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent
  ],
  providers: [ FilmService, MessageService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }