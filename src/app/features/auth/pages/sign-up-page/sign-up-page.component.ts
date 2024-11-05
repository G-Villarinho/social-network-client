import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserPayload } from '@core/models/payloads/user.payload';
import { GetErrorResponse } from '@core/models/responses/error.response';
import { UsernameSuggetionsResponse } from '@core/models/responses/username-suggetions.response';
import { UserService } from '@core/services/user.service';
import { confirmPasswordValidator } from '@core/validators/password-match.validator';
import { FormErrorComponent } from '@shared/components/form-error/form-error.component';
import { ValidationMessageComponent } from '@shared/components/validation-message/validation-message.component';
import { InputStyleDirective } from '@shared/directives/input-style.directive';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormErrorComponent,
    RouterModule,
    ValidationMessageComponent,
    InputStyleDirective,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private userService = inject(UserService);

  protected isSubmitting = signal(false);
  protected globalErrorSignal = signal<string | null>(null);
  protected usernameErrorSignal = signal<string | null>(null);
  protected usernameSuggestions = signal<string[]>([]);
  protected errorPasswordWeakMessage: string = '';

  protected form = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(255)]],
    lastName: ['', [Validators.required, Validators.maxLength(255)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(255)],
    ],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: [
      '',
      [Validators.required, confirmPasswordValidator('password')],
    ],
  });

  ngOnInit(): void {
    this.form.controls.password.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.checkPasswordStrong();
      });
  }

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
        usernameControl.setErrors(null);
      },
      error: (error: HttpErrorResponse) => {
        usernameControl.setErrors({ usernameInvalid: true });
        if (error.status === 409) {
          const suggestionsResponse = error.error as UsernameSuggetionsResponse;
          this.usernameErrorSignal.set('Username already exists:');
          this.usernameSuggestions.set(suggestionsResponse.suggestions);
          return;
        }

        if (error.status === 422) {
          const errorResponse = GetErrorResponse(error);
          const errorDetails = errorResponse.errors?.[0].message;
          this.usernameErrorSignal.set(errorDetails!);
        }
      },
    });
  }

  checkPasswordStrong() {
    const passwordControl = this.form.controls.password;
    if (passwordControl.invalid) {
      passwordControl.markAsTouched();
      return;
    }

    this.userService.checkPasswordStrong(passwordControl.value).subscribe({
      next: () => {
        passwordControl.setErrors(null);
      },
      error: (error: HttpErrorResponse) => {
        passwordControl.setErrors({ passwordWeak: true });
        const errorResponse = GetErrorResponse(error);
        const errorDetails = errorResponse.errors?.[0].message;
        this.errorPasswordWeakMessage = errorDetails!;
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as UserPayload;

    this.isSubmitting.set(true);
    this.form.disable();
    this.userService.CreateUser(payload).subscribe({
      next: () => {
        this.globalErrorSignal.set(null);
        this.isSubmitting.set(false);
      },
      error: (error: HttpErrorResponse) => {
        const errorResponse = GetErrorResponse(error);

        if (errorResponse.status >= 400 && errorResponse.status < 500) {
          this.globalErrorSignal.set(errorResponse.details);
        }

        this.isSubmitting.set(false);
        this.form.enable();
      },
      complete: () => {
        this.isSubmitting.set(false);
        this.form.enable();
      },
    });
  }
}
