import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../../service/flight.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book-flight',
  imports: [NgFor],  
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  flights: any[] = [];
  selectedFlight: any;

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data;
      },
      error: (err) => {
        console.error('Error fetching flights:', err);
      }
    });
  }

  bookFlight(flight: any) {
    this.selectedFlight = flight;
    this.router.navigate(['/user-register', flight.id], {
      state: { flight: this.selectedFlight }
    });
  }
  
  }

