import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignInPayload } from '@core/models/payloads/sign-in.payload';
import { SignInPageFacade } from './sign-in-page.facade';
import { FormErrorComponent } from '@shared/components/form-error/form-error.component';
import { InputStyleDirective } from '@shared/directives/input-style.directive';

@Component({
    selector: 'app-sign-in-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormErrorComponent,
        RouterModule,
        InputStyleDirective,
    ],
    templateUrl: './sign-in-page.component.html',
    styleUrl: './sign-in-page.component.scss',
    providers: [SignInPageFacade],
})
export class SignInPageComponent {
    private formBuilder = inject(NonNullableFormBuilder);
    private facade = inject(SignInPageFacade);
    private router = inject(Router);

    protected form = this.formBuilder.group({
        emailOrUsername: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
    });

    protected errorSignal = this.facade.getErrorSignal();
    protected isSubmitting = this.facade.getIsSubmittingSignal();

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const payload = this.form.value as SignInPayload;

        this.facade.signIn(payload).subscribe({
            next: (result) => {
                if (result !== null) {
                    this.router.navigate(['/home']);
                }
            },
        });
    }
}
