import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {NG2DataTableModule} from "angular2-datatable-pagination";

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    NG2DataTableModule,
    FormsModule,
    CommonModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
