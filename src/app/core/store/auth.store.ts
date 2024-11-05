import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '@core/models/user';
import { LocalStorageService } from '@shared/services/local-storage.service';

const AUTH_DATA = 'x.Auth';

@Injectable({
    providedIn: 'root',
})
export class AuthStore {
    private localStorageService: LocalStorageService<User> = inject(
        LocalStorageService<User>
    );

    private userSignal: WritableSignal<User | null> = signal(null);

    constructor() {
        this.loadUserFromStorage();
    }

    isAuthenticated(): boolean {
        return this.userSignal() !== null;
    }

    clearAuth(): void {
        this.userSignal.set(null);
    }

    setUser(user: User): void {
        this.userSignal.set(user);
    }

    getUser(): User | null {
        return this.userSignal();
    }

    saveUserToLocalStorage(user: User): void {
        this.localStorageService.setItem(AUTH_DATA, user);
    }

    private loadUserFromStorage() {
        const user = this.localStorageService.getItem(AUTH_DATA);
        if (user !== null) {
            this.userSignal.set(user);
        }
    }
}
