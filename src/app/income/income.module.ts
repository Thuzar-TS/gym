import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from './income.component';
import { IncomeRoutingModule } from './income-routing.module';
import {NG2DataTableModule} from "angular2-datatable-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IncomeRoutingModule,
    NG2DataTableModule
  ],
  declarations: [ IncomeComponent ]
})
export class IncomeModule { }