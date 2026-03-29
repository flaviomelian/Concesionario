import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((m) => m.Home)
    },
    {
        path: 'financing',
        loadComponent: () => import('./financing/financing.component').then((m) => m.Financing)
    },
    {
        path: 'services',
        loadComponent: () => import('./services/services.component').then((m) => m.Services)
    }
];
