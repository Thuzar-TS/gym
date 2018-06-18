import { NgModule } from '@angular/core';
import { MemberRoutingModule } from './member-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { RegistersComponent } from './registers/registers.component';
import { LedgersComponent } from './ledgers/ledgers.component';
import { DailyactionComponent } from './dailyaction/dailyaction.component';
import { ProfileComponent } from './profile/profile.component';
//import {PaginationDirective} from '../shared/directives/pagination.directive';
import {NG2DataTableModule} from "angular2-datatable-pagination";
import { Ng2UploaderModule } from 'ng2-uploader';


@NgModule({
  imports: [
    MemberRoutingModule,
    CommonModule,
    FormsModule,
    NG2DataTableModule,
    Ng2UploaderModule
  ],
  declarations: [ 
 // PaginationDirective,
 RegistersComponent,
  MemberlistComponent,
  LedgersComponent,
  MemberComponent,
  DailyactionComponent,
  ProfileComponent
  ]
})
export class MemberModule { }