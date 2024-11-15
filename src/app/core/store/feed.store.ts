import { Injectable } from '@angular/core';
import { PostResponse } from '@core/models/responses/post.response';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FeedStore {
    private feedSubject = new BehaviorSubject<PostResponse[]>([]);
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    private hasMorePostsSubject = new BehaviorSubject<boolean>(true);

    feed$ = this.feedSubject.asObservable();
    isLoading$ = this.isLoadingSubject.asObservable();
    hasMorePosts$ = this.hasMorePostsSubject.asObservable();

    setLoading(isLoading: boolean) {
        this.isLoadingSubject.next(isLoading);
    }

    setHasMorePosts(hasMore: boolean) {
        this.hasMorePostsSubject.next(hasMore);
    }

    appendPosts(posts: PostResponse[]) {
        const updatedFeed = [...this.feedSubject.value, ...posts];
        this.feedSubject.next(updatedFeed);
    }

    clearFeed() {
        this.feedSubject.next([]);
        this.hasMorePostsSubject.next(true);
    }
}
