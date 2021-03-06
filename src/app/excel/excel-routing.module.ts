import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelComponent } from './excel.component';

const routes: Routes = [
  {
    path: '',
    component: ExcelComponent,
    data: {
      title: 'Income'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcelRoutingModule {}
