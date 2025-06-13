import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl : string = "http://localhost:8085/api/v1/users";

  constructor(private httpClient: HttpClient, private headerService: HeaderService) { }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`,{headers:this.headerService.headers});
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl,{headers:this.headerService.headers});
  }
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user,{headers:this.headerService.headers});
  }
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${user.id}`, user,{headers:this.headerService.headers});
  }
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`,{headers:this.headerService.headers});
  }
}
