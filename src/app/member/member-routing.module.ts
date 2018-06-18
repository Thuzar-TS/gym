import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { RegistersComponent } from './registers/registers.component';
import { LedgersComponent } from './ledgers/ledgers.component';
import { DailyactionComponent } from './dailyaction/dailyaction.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',    
    children: [
      {
        path: 'memberlist',
        component: MemberlistComponent,
        data: {
          title: 'Member List'
        }
      },
      {
        path: 'registers/:id',
        component: RegistersComponent,
        data: {
          title: 'Register History'
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
        path: 'profile/:id',
        component: ProfileComponent,
        data: {
          title: 'Member Profile'
        }
      },
      {
        path: 'dailyaction/:id',
        component: DailyactionComponent,
        data: {
          title: 'Daily Action'
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
export class MemberRoutingModule { }
