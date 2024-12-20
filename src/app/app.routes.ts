import { ActivatedRouteSnapshot, RouterOutlet, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';

import { ProductsService } from './shared/services/products.service';
import { inject } from '@angular/core';
import { UserprofileComponent } from './shared/components/userprofile/userprofile.component';
import { userprofileGuard } from './guards/userprofile.guard';
import { AuthGuard, authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: ListComponent,
  },
  {
    path: 'create-product',
    loadComponent: () =>
      import('./features/create/create.component').then(
        (m) => m.CreateComponent
      ),
  },
  {
    path: 'edit-product/:id',
    resolve: {
      product: (route: ActivatedRouteSnapshot) => {
        const productsService = inject(ProductsService);

        return productsService.get(route.paramMap.get('id') as string);
      },
    },
    loadComponent: () =>
      import('./features/edit/edit.component').then((m) => m.EditComponent),
  },

  {
    path: 'userprofile',

    component: UserprofileComponent,

    canActivate: [userprofileGuard, authGuardFn],
  },
  { path: 'list', component: RouterOutlet,  canActivate: [AuthGuard] },
];
