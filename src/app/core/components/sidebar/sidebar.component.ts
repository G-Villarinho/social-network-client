import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreatePostModalService } from '@core/services/create-post-modal.service';
import { UserService } from '@core/services/user.service';
import { AuthStore } from '@core/store/auth.store';
import { LucideAngularModule } from 'lucide-angular';

export type SidebarItem = {
    icon: string;
    label: string;
    route: string[];
};

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [LucideAngularModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
    private authStore = inject(AuthStore);
    private userService = inject(UserService);
    private router = inject(Router);
    private createPostModalService = inject(CreatePostModalService);

    protected isDropdownOpen = false;
    protected user = this.authStore.getUser();
    protected sidebarItems: SidebarItem[] = [
        {
            icon: 'house',
            label: 'Home',
            route: ['/home'],
        },
        {
            icon: 'compass',
            label: 'Explore',
            route: ['/explore'],
        },
        {
            icon: 'user',
            label: 'Profile',
            route: ['/profile'],
        },
        {
            icon: 'bookmark',
            label: 'Bookmarks',
            route: ['/bookmarks'],
        },
    ];

    protected toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    protected openCreatePostModal(): void {
        this.createPostModalService.open();
    }

    logout(): void {
        this.userService.signOut().subscribe(() => {
            this.router.navigate(['auth', 'sign-in']);
            this.authStore.clearAuth();
        });
    }
}
