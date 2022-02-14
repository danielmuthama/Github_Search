import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositoryProxy } from 'src/models/repository.proxy';
import { UserProxy } from '../../models/user.proxy';

@Injectable({
  providedIn: 'root',
})
export class GithubSearchService {
  BASE_URL = 'https://api.github.com';
  constructor(private http: HttpClient) {}

  getUsers(user: string): Observable<UserProxy> {
    let params = new HttpParams().set('q', user);
    const USER_URL = '/search/users';
    return this.http.get<UserProxy>(this.BASE_URL + USER_URL, {
      params: params
    });
  }

  getRepos(user: string): Observable<RepositoryProxy[]> {
    const REPOS_URL = `/users/${user}/repos`;
    return this.http.get<RepositoryProxy[]>(this.BASE_URL + REPOS_URL);
  }

  getStarred(user: string): Observable<RepositoryProxy[]> {
    const STARRED_URL = `/users/${user}/starred`;
    return this.http.get<RepositoryProxy[]>(this.BASE_URL + STARRED_URL);
  }


}