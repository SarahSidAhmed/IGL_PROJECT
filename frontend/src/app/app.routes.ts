import { Routes } from '@angular/router';
import { DpiCardComponent } from './gestiondpi/dpi-card/dpi-card.component';
import { DpiListComponent } from './gestiondpi/dpi-list/dpi-list.component';
import { CreateDpiComponent } from './gestiondpi/create-dpi/create-dpi.component';
import { RadioCardComponent } from './radios-todo/radio-card/radio-card.component';
import { RadioListComponent } from './radios-todo/radio-list/radio-list.component';

export const routes: Routes = [

    {path: 'dpilist', component:DpiListComponent},
    {path: 'create-dpi', component:CreateDpiComponent},
    {path: 'radio-list', component:RadioListComponent}
];
