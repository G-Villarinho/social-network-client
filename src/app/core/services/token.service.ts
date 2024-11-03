import { inject, Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { CookieService } from 'ngx-cookie-service';

const TOKEN = 'x.Token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private cookieService = inject(CookieService);

  getToken(): string | null {
    return this.cookieService.get(TOKEN);
  }

  decodeToken(): User | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    return JSON.parse(atob(token.split('.')[1])) as User;
  }
}
