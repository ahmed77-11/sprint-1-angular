import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // users: User[] = [
  //   { username: 'admin', password: '123', roles: ['ADMIN'] },
  //   { username: 'ahmed', password: '123', roles: ['USER'] },
  // ];
  apiURL:String = 'http://localhost:8082/users';
  token!: string | null;
  private helper=new JwtHelperService()
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  public registeredUser: User=new User();

  constructor(private router: Router,private http:HttpClient) {}


  login(user : User)
  {
    console.log(user)
    this.isloggedIn=true;
    return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
  }

  saveToken(jwt: string | null){
    if (typeof jwt === "string") {
      localStorage.setItem('jwt', jwt);
    }
    this.token = jwt;
    this.isloggedIn = true;
    localStorage.setItem('isloggedIn', this.isloggedIn.toString());
    this.decodeJWT();
  }
  private decodeJWT() {
    if(this.token==undefined) {
      return;
    }
    console.log(this.token)

    const decodedToken=this.helper.decodeToken(this.token);
    this.roles=decodedToken.roles;
    this.loggedUser=decodedToken.sub;
  }


  loadToken() {
    this.token = localStorage.getItem('jwt');
    this.decodeJWT();
  }
  getToken():string {
    return <string>this.token;
  }
  logout() {
    this.isloggedIn = false;
    this.token=undefined!;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('jwt');
    localStorage.setItem("isloggedIn", "false");
    this.router.navigate(['/login']);
  }
  isAdmin(): Boolean {
    if (!this.roles)
      //this.roles== undefiened
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }
  /*SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (
        user.username == curUser.username &&
        user.password == curUser.password
      ) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    /*this.getUserRoles(login);*/
  }
  /*getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }*/

  isTokenExpired() {
    return this.helper.isTokenExpired(this.token);
  }
  registerUser(user:User){
    return this.http.post<User>(this.apiURL+'/register', user, {observe:'response'});
  }

  setRegisteredUser(user:User){
    this.registeredUser=user;
  }
  getRegisteredUser(){
    return this.registeredUser;
  }
  validateEmail(code : string){
    return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
  }
  removeToken(){
    this.token=null;
    localStorage.removeItem('jwt');
  }
}

