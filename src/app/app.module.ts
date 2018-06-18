import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgFor } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './login/login.component';

//import { NgDatepickerModule } from 'ng2-datepicker';
//import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

//import { DirectiveModule } from '../directive.module';
import {PaginationDirective} from './shared/directives/pagination.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2UploaderModule } from 'ng2-uploader';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule ,
    FormsModule,
    ModalModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2UploaderModule    
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    PaginationDirective   
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
