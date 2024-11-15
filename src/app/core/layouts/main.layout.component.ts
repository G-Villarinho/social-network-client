import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreatePostModalComponent } from '@core/components/create-post-modal/create-post-modal.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';

@Component({
    selector: 'app-main.layout',
    standalone: true,
    imports: [SidebarComponent, RouterOutlet, CreatePostModalComponent],
    template: `
        <div class="flex justify-center min-h-screen bg-gray-100">
            <app-sidebar />

            <div class="flex-1 lg:max-w-2xl p-4">
                <app-create-post-modal #modal />
                <router-outlet />
            </div>

            <div class="hidden xl:block w-80 p-4">
                <div class="bg-white rounded-lg shadow p-4">
                    <h2 class="font-bold text-lg">Trending</h2>
                </div>
            </div>
        </div>
    `,
})
export class MainLayoutComponent {}
