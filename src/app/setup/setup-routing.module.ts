import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  {
    path: '',    
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'members',
        component: MembersComponent,
        data: {
          title: 'Members'
        }
      },
      {
        path: 'membertype',
        component: MembertypeComponent,
        data: {
          title: 'Member Type'
        }
      },
      {
        path: 'registerid',
        component: RegisteridComponent,
        data: {
          title: 'Register ID Generate'
        }
      },
      {
        path: 'promotiontype',
        component: PromotiontypeComponent,
        data: {
          title: 'Promotion Type'
        }
       },
       {
        path: 'categories',
        component: CategoriesComponent,
        data: {
          title: 'Categories'
        }
      },
      {
        path: 'alertlimit',
        component: AlertLimitComponent,
        data: {
          title: 'Alert Limit'
        }
      },
      {
        path: 'offday',
        component: OffdayComponent,
        data: {
          title: 'Off Day'
        }
      },
      {
        path: 'ledgers/:id',
        component: LedgersComponent,
        data: {
          title: 'Ledgers'
        }
      },
      {
        path: 'registers/:id',
        component: RegistersComponent,
        data: {
          title: 'Registers'
        }
      },
      {
        path: 'trainers',
        component: TrainersComponent,
        data: {
          title: 'Trainers'
        }
      },
      {
        path: 'training',
        component: TrainingComponent,
        data: {
          title: 'Training'
        }
      }  
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
  RouterModule
  ]
})
export class SetupRoutingModule { }
