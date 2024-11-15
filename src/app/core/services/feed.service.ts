import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '@core/models/pagination';
import { PostResponse } from '@core/models/responses/post.response';
import { environment } from '@environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class FeedService {
    private readonly apiUrl = `${environment.baseUrl}/feed`;

    private httpClient = inject(HttpClient);

    getFeed(page: number, limit: number) {
        const params = new HttpParams().set('page', page).set('limit', limit);
        return this.httpClient.get<Pagination<PostResponse>>(this.apiUrl, {
            params,
        });
    }
}
