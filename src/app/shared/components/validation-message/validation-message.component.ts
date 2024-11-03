import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  template: `
    @if (control().invalid && control().errors && (control().dirty ||
    control().touched)) { @if (control().hasError(error())) {
    <small class="text-red-600 font-medium" role="alert">
      <ng-content />
    </small>
    } }
  `,
})
export class ValidationMessageComponent {
  control = input.required<FormControl>();
  error = input.required<string>();
}
