import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, retry } from "rxjs/operators";
import User, { Repository } from '../models/user';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  page: number = 1;
  constructor(
    private _http: HttpClient
  ) { }

  findUser(username: string): Observable<User> {

    return this._http.get(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&page=${this.page}&per_page=10`).pipe(
      map((response: any) => {
        let user = response[0].owner;
        //this.user.login = response[0].owner.login  //get only one piece of data
        //this.user.avatar_url = response[0].owner.avatar_url
        response.forEach((rep:Repository) => {
          rep.git_url=rep.git_url.replace('git', 'https');
        });
        user.repositories = response;
        // user.git_url=response.git_url
        console.log(response);
        return user;
      })
      );
  }
}