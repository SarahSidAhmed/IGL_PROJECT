import { RouterModule, Routes } from '@angular/router';
import { DpiCardComponent } from './gestiondpi/dpi-card/dpi-card.component';
import { DpiListComponent } from './gestiondpi/dpi-list/dpi-list.component';
import { CreateDpiComponent } from './gestiondpi/create-dpi/create-dpi.component';
import { RadioListComponent } from './radios-todo/radio-list/radio-list.component';
import { SoinListComponent } from './soins-todo/soin-list/soin-list.component';
import { TestListComponent } from './tests-todo/test-list/test-list.component';
import { SigninComponent } from './signin/signin.component';
import { ConsultationDetailDoctorComponent } from './consultation-detail-doctor/consultation-detail-doctor.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  ];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
//     })
// export class AppRoutingModule{}
/*
{ path: '', redirectTo: 'consultation-detail-doctor', pathMatch: 'full' }, // Default route
{ path: 'dpilist', component: DpiListComponent },
  { path: 'create-dpi', component: CreateDpiComponent },
  { path: 'radio-list', component: RadioListComponent },
  { path: 'soin-list', component: SoinListComponent },
  {path: 'tests-list', component: TestListComponent}
*/