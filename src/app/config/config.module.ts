import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { ConfigRoutingModule } from './config-routing.module';
import {NG2DataTableModule} from "angular2-datatable-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConfigRoutingModule,
    NG2DataTableModule
  ],
  declarations: [ ConfigComponent ]
})
export class ConfigModule { }