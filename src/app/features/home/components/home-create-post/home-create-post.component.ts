import { Component, inject, signal } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CreatePostPayload } from '@core/models/payloads/create-post.payload';
import { PostService } from '@core/services/post.service';
import { AuthStore } from '@core/store/auth.store';
import { InputStyleDirective } from '@shared/directives/input-style.directive';

@Component({
    selector: 'app-home-create-post',
    standalone: true,
    imports: [InputStyleDirective, ReactiveFormsModule],
    templateUrl: './home-create-post.component.html',
    styleUrl: './home-create-post.component.scss',
})
export class HomeCreatePostComponent {
    private authStore = inject(AuthStore);
    private postService = inject(PostService);
    private formBuilder = inject(NonNullableFormBuilder);

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
            },
            error: () => {
                this.isSubmitting.set(false);
            },
        });
    }
}
