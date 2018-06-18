import { NgModule } from '@angular/core';
import { SetupRoutingModule } from './setup-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users/users.component';
import { MembersComponent } from './members/members.component';
import { MembertypeComponent } from './membertype/membertype.component';
import { RegisteridComponent } from './registerid/registerid.component';
import { PromotiontypeComponent } from './promotiontype/promotiontype.component';
import { CategoriesComponent } from './categories/categories.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainingComponent } from './training/training.component';
import { AlertLimitComponent } from './alertlimit/alertlimit.component';
import { OffdayComponent } from './offday/offday.component';
import { LedgersComponent } from './ledgers/ledgers.component';
import { RegistersComponent } from './registers/registers.component';
//import {PaginationDirective} from '../shared/directives/pagination.directive';
import {NG2DataTableModule} from "angular2-datatable-pagination";
//import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
//import { DirectiveModule } from '../../directive.module';

@NgModule({
  imports: [
    SetupRoutingModule,
    CommonModule,
    FormsModule,
    NG2DataTableModule
  //  AngularDateTimePickerModule
  ],
  declarations: [
  UsersComponent,
  MembersComponent,
  MembertypeComponent,
  PromotiontypeComponent,
  CategoriesComponent,
  AlertLimitComponent,
  OffdayComponent,
  LedgersComponent,
  RegisteridComponent,
  RegistersComponent,
  TrainersComponent,
  TrainingComponent
 // PaginationDirective
  ]
})
export class SetupModule { }