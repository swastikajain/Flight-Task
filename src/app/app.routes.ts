import { Routes } from '@angular/router';
import { BookFlightComponent } from './pages/book-flight/book-flight.component';
import { RegisterUserComponent } from './pages/user-register/user-register.component';

export const routes: Routes = [

        { 
            path: '', component: BookFlightComponent 
        },
        { 
            path: 'user-register/:id', component: RegisterUserComponent 
        }
      
];
