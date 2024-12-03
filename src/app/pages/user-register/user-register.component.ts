import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../../service/flight.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class RegisterUserComponent implements OnInit {
  userFlightForm: FormGroup;
  flight: any;
  successMsg: string = '';
  errorMsg: string = '';
  

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.flight = navigation?.extras?.state?.['flight'];

    if (!this.flight) {
      this.router.navigate(['/']);  
    }

    this.userFlightForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      date_of_journey: ['', Validators.required],
      number_of_passengers: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    if (this.flight) {
      const user = this.userFlightForm.value;

      this.flightService.registerUser(user).subscribe({
        next: (registeredUser) => {
          console.log('User registered successfully:', registeredUser);

          const userFlight = {
            ...this.userFlightForm.value,
            flightId: this.flight.id,
            user: registeredUser  
          };

          this.flightService.bookFlight(userFlight).subscribe({
            next: () => {
              alert('Flight booked successfully!');
              this.router.navigate(['/']);
            },
            error: (err) => {
              console.error('Error booking flight:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error registering user:', err);
        }
      });
    } else {
      console.error('No flight selected!');
    }
  }

  resetMsg() {
    this.successMsg = '';
    this.errorMsg = '';
  }
}
