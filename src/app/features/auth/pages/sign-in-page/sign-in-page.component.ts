import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignInPayload } from '@core/models/payloads/sign-in.payload';
import { GetErrorResponse } from '@core/models/responses/error.response';
import { UserService } from '@core/services/user.service';
import { FormErrorComponent } from '@shared/form-error/form-error.component';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  protected form = this.formBuilder.group({
    emailOrUsername: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected errorSignal: WritableSignal<string | null> = signal(null);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as SignInPayload;

    this.userService.signIn(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        const errorResponse = GetErrorResponse(error);

        if (errorResponse.status >= 400 && errorResponse.status < 500) {
          this.errorSignal.set(errorResponse.details);
        }
      },
    });
  }
}
