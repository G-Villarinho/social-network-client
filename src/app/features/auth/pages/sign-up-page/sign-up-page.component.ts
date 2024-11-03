import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  ErrorResponse,
  GetErrorResponse,
} from '@core/models/responses/error.response';
import { UsernameSuggetionsResponse } from '@core/models/responses/username-suggetions.response';
import { UserService } from '@core/services/user.service';
import { FormErrorComponent } from '@shared/components/form-error/form-error.component';
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormErrorComponent,
    RouterModule,
    ValidationMessageComponent,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  private formBuilder = inject(NonNullableFormBuilder);
  private userService = inject(UserService);

  protected isSubmitting = signal(false);
  protected globalErrorSignal = signal<string | null>(null);
  protected usernameErrorSignal = signal<string | null>(null);
  protected usernameSuggestions = signal<string[]>([]);

  protected form = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(255)]],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(255)],
    ],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  checkUsername() {
    const usernameControl = this.form.controls.username;
    if (usernameControl.invalid) {
      usernameControl.markAsTouched();
      return;
    }

    this.userService.checkUsername(usernameControl.value).subscribe({
      next: () => {
        this.usernameSuggestions.set([]);
        this.usernameErrorSignal.set(null);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          const suggestionsResponse = error.error as UsernameSuggetionsResponse;
          this.usernameErrorSignal.set('Username already exists:');
          this.usernameSuggestions.set(suggestionsResponse.suggestions);
          return;
        }
      },
    });
  }
}
