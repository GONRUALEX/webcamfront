import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoginGuard, LoginGuard } from '@core/guards/login.guard';
import { ChangePasswordComponent } from '@core/auth/password/change-password/change-password.component';
import * as GRANT from '@shared/models/Constant/roleConstant';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'private',
    loadChildren: () =>
      import('./pages/private/private.module').then((m) => m.PrivateModule),
    data: {
      grant: [GRANT.ADMIN],
    },
    canActivate: [IsLoginGuard],
  },
  //{path:'', component: IndexComponent},
  //{path:'shop',  loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule), canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  {
    path: 'change-password/:tokenpassword',
    component: ChangePasswordComponent,
    canActivate: [IsLoginGuard],
  },
  //{path:'mantenimiento',  loadChildren: () => import('./pages/producto/producto.module').then(m => m.ProductoModule), canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
