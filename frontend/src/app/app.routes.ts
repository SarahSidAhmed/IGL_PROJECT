import { Routes } from '@angular/router';
import { DpiCardComponent } from './gestiondpi/dpi-card/dpi-card.component';
import { DpiListComponent } from './gestiondpi/dpi-list/dpi-list.component';
import { CreateDpiComponent } from './gestiondpi/create-dpi/create-dpi.component';

export const routes: Routes = [

    {path: 'dpilist', component:DpiListComponent},
    {path: 'create-dpi', component:CreateDpiComponent},
];
