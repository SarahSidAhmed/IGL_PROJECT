import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DpiCardComponent } from './Pages/gestiondpi/dpi-card/dpi-card.component';
import { DpiListComponent } from './Pages/gestiondpi/dpi-list/dpi-list.component';
import { CreateDpiComponent } from './Pages/gestiondpi/create-dpi/create-dpi.component';
import { RadioListComponent } from './Pages/radios-todo/radio-list/radio-list.component';
import { SoinListComponent } from './Pages/soins-todo/soin-list/soin-list.component';
import { TestListComponent } from './Pages/tests-todo/test-list/test-list.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { ConsultationDetailDoctorComponent } from './Pages/consultation-detail-doctor/consultation-detail-doctor.component';
import { RechDoctorComponent } from './Pages/rech-doctor/rech-doctor/rech-doctor.component';
import { DpiComponent } from './Pages/dpi-patient/dpi-patient.component';
import { ConsultationDetailComponent } from './Pages/consultation-detail/consultation-detail.component';


export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'dpilist', component: DpiListComponent },
  { path: 'dpi-patient/:id', component: DpiComponent },
  { path: 'consultation-patient/:id', component: ConsultationDetailComponent },
  { path: 'rech-doctor', component: RechDoctorComponent },
  { path: 'create-dpi', component: CreateDpiComponent },
  { path: 'radio-list', component: RadioListComponent },
  { path: 'soin-list', component: SoinListComponent },
  { path: 'tests-list', component: TestListComponent},
  { path: 'consultation-detail-doctor', component: ConsultationDetailDoctorComponent},
  {
    path: 'doctor/:id',
  component: RechDoctorComponent
  }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
