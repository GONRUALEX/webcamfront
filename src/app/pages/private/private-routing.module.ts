import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceUserComponent } from '@pages/private/maintenance-user/maintenance-user.component';
import * as GRANT from '@shared/models/Constant/roleConstant';
import { IsLoginGuard } from '@core/guards/login.guard';
const routes: Routes = [
  {
    path: '',
    data: {
      grant: [GRANT.ADMIN],
    },
    canActivate: [IsLoginGuard],

    children: [
      {
        path: '',
        component: MaintenanceUserComponent,
        data: {
          grant: [GRANT.ADMIN],
        },
        canActivate: [IsLoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
