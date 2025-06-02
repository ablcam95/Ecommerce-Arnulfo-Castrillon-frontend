import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl : string = "http://localhost:8085/api/v1/users";

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
