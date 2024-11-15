import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CreatePostPayload } from '@core/models/payloads/create-post.payload';
import { CreatePostModalService } from '@core/services/create-post-modal.service';
import { PostService } from '@core/services/post.service';
import { AuthStore } from '@core/store/auth.store';
import { InputStyleDirective } from '@shared/directives/input-style.directive';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-create-post-modal',
    standalone: true,
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        InputStyleDirective,
        LucideAngularModule,
    ],
    templateUrl: './create-post-modal.component.html',
    styleUrl: './create-post-modal.component.scss',
})
export class CreatePostModalComponent {
    private createPostModalService = inject(CreatePostModalService);
    private authStore = inject(AuthStore);
    private postService = inject(PostService);
    private formBuilder = inject(NonNullableFormBuilder);

    protected isOpen$ = this.createPostModalService.isOpen$;
    protected user = this.authStore.getUser();
    protected isSubmitting = signal(false);

    protected postForm = this.formBuilder.group({
        title: [
            { value: '', disabled: this.isSubmitting() },
            [Validators.required, Validators.maxLength(50)],
        ],
        content: [
            { value: '', disabled: this.isSubmitting() },
            [Validators.required],
        ],
    });

    protected createPost() {
        if (this.postForm.invalid) {
            return;
        }

        this.isSubmitting.set(true);
        const payload = this.postForm.value as CreatePostPayload;
        this.postService.CreatePost(payload).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                this.postForm.reset();
                this.close();
            },
            error: () => {
                this.isSubmitting.set(false);
            },
        });
    }

    protected close() {
        this.createPostModalService.close();
    }
}
