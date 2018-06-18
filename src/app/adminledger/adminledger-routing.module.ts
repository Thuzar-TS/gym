import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminledgerComponent } from './adminledger.component';

const routes: Routes = [
  {
    path: '',
    component: AdminledgerComponent,
    data: {
      title: 'Admin Ledger'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminledgerRoutingModule {}
