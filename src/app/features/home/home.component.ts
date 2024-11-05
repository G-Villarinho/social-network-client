import { Component } from '@angular/core';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SidebarComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {}
