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
    },
    {
        path: 'add-vehicle',
        loadComponent: () => import('./addVehicle/addVehicle.component').then((m) => m.AddVehicle)
    },
    {
        path: 'edit-vehicle/:id',
        loadComponent: () => import('./editVehicle/editVehicle.component').then((m) => m.EditVehicle)
    },
];
