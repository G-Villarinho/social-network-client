import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [LucideAngularModule],
  template: ` <div
    class="w-full px-3 py-2 bg-red-400 rounded-md text-white mb-4 flex items-center gap-2"
  >
    <lucide-icon name="triangle-alert" />
    {{ message() }}
  </div>`,
})
export class FormErrorComponent {
  message = input<string>();
}
