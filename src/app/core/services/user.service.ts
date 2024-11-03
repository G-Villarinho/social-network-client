import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignInPayload } from '@core/models/payloads/sign-in.payload';
import { UserUpdatePayload } from '@core/models/payloads/user-update.payload';
import { UserPayload } from '@core/models/payloads/user.payload';
import { User } from '@core/models/user';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.baseUrl}/users`;
  private httpClient = inject(HttpClient);

  CreateUser(payload: UserPayload) {
    return this.httpClient.post<null>(this.apiUrl, payload);
  }

  signIn(payload: SignInPayload) {
    return this.httpClient.post<null>(`${this.apiUrl}/sign-in`, payload);
  }

  signOut() {
    return this.httpClient.post<null>(`${this.apiUrl}/sign-out`, {});
  }

  getUser() {
    return this.httpClient.get<User>(`${this.apiUrl}/me`);
  }

  updateUser(payload: UserUpdatePayload) {
    return this.httpClient.put<null>(this.apiUrl, payload);
  }

  deleteUser() {
    return this.httpClient.delete<null>(this.apiUrl);
  }
}
