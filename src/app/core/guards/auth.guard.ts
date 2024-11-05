import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@core/store/auth.store';
import { firstValueFrom } from 'rxjs';

export const AuthGuard: CanActivateFn = async () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    if (!authStore.isAuthenticated()) {
        await router.navigate(['auth', 'sign-in']);
        return false;
    }

    return true;
};
