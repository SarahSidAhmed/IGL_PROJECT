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
import { QrCardComponent } from './Pages/qr-card/qr-card.component';
import { EditDpiComponent } from './Pages/edit-dpi/edit-dpi.component';
import { DpiComponent } from './Pages/dpi-patient/dpi-patient.component';
import { ConsultationDetailComponent } from './Pages/consultation-detail/consultation-detail.component';
import { DpiDoctorComponent } from './Pages/dpi-doctor/dpi-doctor.component';
import { TestCardComponent } from './components/test-card/test-card.component';
import { ConsultationCardComponent } from './components/consultation-card/consultation-card.component';
import { InfoCardComponent } from './components/info-card/info-card.component';


export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'dpilist', component: DpiListComponent },
  { path: 'dpi-patient/:id', component: DpiComponent },
  { path: 'dpi-doctor/:id', component: DpiDoctorComponent },
  { path: 'consultation-patient/:id/:dpiid', component: ConsultationDetailComponent },
  { path: 'rech-doctor', component: RechDoctorComponent },
  { path: 'create-dpi', component: CreateDpiComponent },
  { path: 'radio-list', component: RadioListComponent },
  { path: 'soin-list', component: SoinListComponent },
  { path: 'tests-list', component: TestListComponent},
  { path: 'qr', component: QrCardComponent},
  { path: 'consultation-detail-doctor/:id/:dpiid', component: ConsultationDetailDoctorComponent},
  { path: 'doctor/:id',component: RechDoctorComponent},
  { path: 'qr-card', component: QrCardComponent },
  {path: 'edit-dpi/:id', component: EditDpiComponent},
  {path: 'dpi-doctor/:id', component: DpiDoctorComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
