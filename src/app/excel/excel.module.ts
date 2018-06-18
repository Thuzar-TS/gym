import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExcelComponent } from './excel.component';
import { ExcelRoutingModule } from './excel-routing.module';
import {NG2DataTableModule} from "angular2-datatable-pagination";
//import * as saveAs from 'file-saver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExcelRoutingModule,
    NG2DataTableModule
  ],
  declarations: [ 
  ExcelComponent
  ]
})
export class ExcelModule { }