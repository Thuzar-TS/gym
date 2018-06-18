import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminledgerComponent } from './adminledger.component';
import { AdminledgerRoutingModule } from './adminledger-routing.module';
import {NG2DataTableModule} from "angular2-datatable-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminledgerRoutingModule,
    NG2DataTableModule
  ],
  declarations: [ AdminledgerComponent ]
})
export class AdminledgerModule { }