import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreatePostPayload } from '@core/models/payloads/create-post.payload';
import { environment } from '@environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private readonly apiUrl = `${environment.baseUrl}/posts`;
    private httpClient = inject(HttpClient);

    CreatePost(payload: CreatePostPayload) {
        return this.httpClient.post<null>(this.apiUrl, payload);
    }
}
