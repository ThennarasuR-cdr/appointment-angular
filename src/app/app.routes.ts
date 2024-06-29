import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppointmentsComponent } from './appointments/appointments.component';

export const routes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' }
];
