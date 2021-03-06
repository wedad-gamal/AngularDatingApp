import { PresenceService } from './presence.service';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private presence: PresenceService) { }
  
  login(model: any){
    return this.http.post(this.baseUrl+'account/login',model).pipe(
      //rxjs operator
      map((response: User) => {
        const user = response;
        if(user){
          this.SetCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl+'account/register', model).pipe(
      map((user: User) => {
        if(user){         
          this.SetCurrentUser(user);
          this.presence.createHubConnection(user);
        }
        return user;
      })
    )
  }

  SetCurrentUser(user: User){
    if(user !== null)
    { 
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;
      Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);

      localStorage.setItem('user',JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();

  }

  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }
}
