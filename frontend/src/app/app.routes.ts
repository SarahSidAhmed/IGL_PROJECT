import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DpiCardComponent } from './pages/gestiondpi/dpi-card/dpi-card.component';
import { DpiListComponent } from './pages/gestiondpi/dpi-list/dpi-list.component';
import { CreateDpiComponent } from './pages/gestiondpi/create-dpi/create-dpi.component';
import { RadioListComponent } from './pages/radios-todo/radio-list/radio-list.component';
import { SoinListComponent } from './pages/soins-todo/soin-list/soin-list.component';
import { TestListComponent } from './pages/tests-todo/test-list/test-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { QrCardComponent } from './pages/qr-card/qr-card.component';


export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'dpilist', component: DpiListComponent },
  { path: 'create-dpi', component: CreateDpiComponent },
  { path: 'radio-list', component: RadioListComponent },
  { path: 'soin-list', component: SoinListComponent },
  { path: 'tests-list', component: TestListComponent},
  { path: 'qr', component: QrCardComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
