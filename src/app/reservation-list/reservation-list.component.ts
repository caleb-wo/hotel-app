import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private resService: ReservationService){}

  ngOnInit(): void {
    this.resService.getReservations().subscribe(res => {
      this.reservations = res;
    });
  }

  deleteReservation(id: string): void {
    this.resService.deleteReservation(id).subscribe(() => console.log("Delete reqest processed."));
  }
}
