import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import {NG2DataTableModule} from "angular2-datatable-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExpenseRoutingModule,
    NG2DataTableModule
  ],
  declarations: [ ExpenseComponent ]
})
export class ExpenseModule { }