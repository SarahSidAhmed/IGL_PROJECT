import { Routes } from '@angular/router';
import { DpiCardComponent } from './gestiondpi/dpi-card/dpi-card.component';
import { DpiListComponent } from './gestiondpi/dpi-list/dpi-list.component';
import { StaffFormComponent } from './gestiondpi/add-staff/add-staff.component';

export const routes: Routes = [

    {path: 'dpilist', component:DpiListComponent},
    {path: 'add-staff', component:StaffFormComponent},
];
