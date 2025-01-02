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



export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'dpilist', component: DpiListComponent },
  { path: 'create-dpi', component: CreateDpiComponent },
  { path: 'radio-list', component: RadioListComponent },
  { path: 'soin-list', component: SoinListComponent },
  { path: 'tests-list', component: TestListComponent},
  { path: 'qr', component: QrCardComponent}
  { path: 'consultation-detail-doctor', component: ConsultationDetailDoctorComponent},
  { path: 'doctor/:id',component: RechDoctorComponent},
  { path: 'qr-card', component: QrCardComponent },
  { path: 'edit-dpi/:id', component: EditDpiComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
