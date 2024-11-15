import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { MainLayoutComponent } from '@core/layouts/main.layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('@features/auth/auth.routes').then((m) => m.authRoutes),
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'home',
                loadComponent: () =>
                    import('@features/home/home.component').then(
                        (m) => m.HomeComponent
                    ),
                canActivate: [AuthGuard],
            },
        ],
    },
];
