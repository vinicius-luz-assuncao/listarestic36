import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/users';
  // private apiUrl = 'http://192.168.1.7:3000/users';


  constructor(private http: HttpClient) {}

  
  getOrCreateUser(userId: string, userEmail: string, userName: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          console.log("Usuário encontrado:", users[0]);
          return of(users[0]);
        } else {
          const newUser: User = { userId, userEmail, userName, products: [] };
          return this.http.post<User>(this.apiUrl, newUser).pipe(
            tap(response => console.log("Novo usuário criado:", response))
          );
        }
      })
    );
  }
}
