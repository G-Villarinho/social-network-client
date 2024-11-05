import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { SignInPayload } from '@core/models/payloads/sign-in.payload';
import { HttpErrorResponse } from '@angular/common/http';
import { GetErrorResponse } from '@core/models/responses/error.response';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthStore } from '@core/store/auth.store';

@Injectable({
    providedIn: 'root',
})
export class SignInPageFacade {
    private userService = inject(UserService);
    private authStore = inject(AuthStore);

    protected errorSignal: WritableSignal<string | null> = signal(null);
    protected isSubmitting = signal(false);

    signIn(payload: SignInPayload) {
        this.isSubmitting.set(true);
        this.errorSignal.set(null);

        return this.userService.signIn(payload).pipe(
            switchMap(() =>
                this.userService.getUser().pipe(
                    tap((user) => {
                        this.authStore.setUser(user);
                        this.authStore.saveUserToLocalStorage(user);
                    })
                )
            ),
            tap(() => {
                this.isSubmitting.set(false);
            }),
            catchError((error: HttpErrorResponse) => {
                this.isSubmitting.set(false);
                const errorResponse = GetErrorResponse(error);

                if (errorResponse.status >= 400 && errorResponse.status < 500) {
                    this.errorSignal.set(errorResponse.details);
                }

                return of(null);
            })
        );
    }

    getErrorSignal(): WritableSignal<string | null> {
        return this.errorSignal;
    }

    getIsSubmittingSignal(): WritableSignal<boolean> {
        return this.isSubmitting;
    }
}
