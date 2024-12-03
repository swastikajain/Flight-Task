import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private registerUserApi = 'http://localhost:8081/api/insert/user';
  private getAllFlightsApi = 'http://localhost:8081/api/flight/all';
  private getUserApi = 'http://localhost:8081/api/getUser/';
  private bookFlightApi = 'http://localhost:8081/api/flight/book?flight_id=2&user_id=3';
   

  constructor(private httpClient: HttpClient) {}

  public registerUser(obj: any): Observable<any> {
    const uobj = {
      name: obj.name,
      contact: obj.contact
    };
  
    return this.httpClient.post(this.registerUserApi, uobj);
  }

  public getAllFlights(): Observable<any> {
    return this.httpClient.get(this.getAllFlightsApi);
  }

  public getUser(id: any): Observable<any> {
    return this.httpClient.get(this.getUserApi + id);
  }

  public bookFlight(obj: any): Observable<any> {
    const fobj = {
      user: obj.user,
      flight_id: obj.flight_id, 
      date_of_journey: obj.date_of_journey,
      number_of_passengers: obj.number_of_passengers
    };
    return this.httpClient.post(this.bookFlightApi, fobj);
    

  }
 
 
}
