import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'expense',
        loadChildren: './expense/expense.module#ExpenseModule'
      },
      {
        path: 'adminledger',
        loadChildren: './adminledger/adminledger.module#AdminledgerModule'
      },
      {
        path: 'income',
        loadChildren: './income/income.module#IncomeModule'
      },
      {
        path: 'member',
        loadChildren: './member/member.module#MemberModule'
      },
      {
        path: 'excelreport',
        loadChildren: './excel/excel.module#ExcelModule'
      },
      {
        path: 'config',
        loadChildren: './config/config.module#ConfigModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Set Up'
    },
    children: [
      {
        path: 'setup',
        loadChildren: './setup/setup.module#SetupModule'
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
