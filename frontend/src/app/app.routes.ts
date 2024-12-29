import { Routes } from '@angular/router';
import { DpiCardComponent } from './gestiondpi/dpi-card/dpi-card.component';
import { DpiListComponent } from './gestiondpi/dpi-list/dpi-list.component';
import { CreateDpiComponent } from './gestiondpi/create-dpi/create-dpi.component';
import { RadioListComponent } from './radios-todo/radio-list/radio-list.component';
import { SoinListComponent } from './soins-todo/soin-list/soin-list.component';
import { TestListComponent } from './tests-todo/test-list/test-list.component';

export const routes: Routes = [
    { path: 'dpilist', component: DpiListComponent },
    { path: 'create-dpi', component: CreateDpiComponent },
    { path: 'radio-list', component: RadioListComponent },
    { path: 'soin-list', component: SoinListComponent },
    {path: 'tests-list', component: TestListComponent}
];
/*
{ path: 'dpilist', component: DpiListComponent },
  { path: 'create-dpi', component: CreateDpiComponent },
  { path: 'radio-list', component: RadioListComponent },
  { path: 'soin-list', component: SoinListComponent },
  {path: 'tests-list', component: TestListComponent}
*/