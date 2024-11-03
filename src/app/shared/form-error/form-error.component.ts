import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  template: ` <div
    class="w-full px-3 py-2 bg-red-400 rounded-md text-white mb-2"
  >
    {{ message() }}
  </div>`,
})
export class FormErrorComponent {
  message = input<string>();
}
