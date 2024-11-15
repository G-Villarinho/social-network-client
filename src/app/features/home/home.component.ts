import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { HomeCreatePostComponent } from './components/home-create-post/home-create-post.component';
import { FeedStore } from '@core/store/feed.store';
import { FeedService } from '@core/services/feed.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import {
    combineLatest,
    first,
    filter,
    switchMap,
    tap,
    Subject,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HomeCreatePostComponent,
        AsyncPipe,
        InfiniteScrollDirective,
        CommonModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
    private feedStore = inject(FeedStore);
    private feedService = inject(FeedService);
    private destroy$ = new Subject<void>();

    private currentPage = 1;
    private readonly limit = 10;

    protected feed$ = this.feedStore.feed$;
    protected isLoading$ = this.feedStore.isLoading$;

    ngOnInit(): void {
        this.loadFeed().pipe(takeUntil(this.destroy$)).subscribe();
    }

    loadFeed() {
        return combineLatest([
            this.feedStore.isLoading$,
            this.feedStore.hasMorePosts$,
        ]).pipe(
            first(),
            filter(([isLoading, hasMorePosts]) => !isLoading && hasMorePosts),
            tap(() => this.feedStore.setLoading(true)),
            switchMap(() =>
                this.feedService.getFeed(this.currentPage, this.limit).pipe(
                    tap((response) => {
                        this.feedStore.appendPosts(response.rows);
                        this.feedStore.setHasMorePosts(
                            response.rows.length === this.limit
                        );
                        this.currentPage++;
                    }),
                    tap(() => this.feedStore.setLoading(false))
                )
            )
        );
    }

    onScroll() {
        this.loadFeed().pipe(takeUntil(this.destroy$)).subscribe();
    }

    refreshFeed() {
        this.currentPage = 1;
        this.feedStore.clearFeed();
        this.loadFeed().pipe(takeUntil(this.destroy$)).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
