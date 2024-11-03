import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '@core/models/user';
import { TokenService } from '@core/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private tokenService = inject(TokenService);

  private userSignal: WritableSignal<User | null> = signal(null);

  constructor() {
    this.loadUserFromToken();
  }

  private loadUserFromToken(): void {
    const user = this.tokenService.decodeToken();
    this.userSignal.set(user);
  }

  get user(): User | null {
    return this.userSignal();
  }

  isAuthenticated(): boolean {
    return this.userSignal() !== null;
  }

  clearAuth(): void {
    this.userSignal.set(null);
  }
}
