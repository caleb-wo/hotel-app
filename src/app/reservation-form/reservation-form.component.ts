import { Component, OnInit } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private resService: ReservationService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ["", Validators.required],
      checkOutDate: ["", Validators.required],
      guestName: ["", Validators.required],
      guestEmail: ["", [
        Validators.required, Validators.email
      ]],
      roomNumber: ["", Validators.required],
    })
  }

  onSubmit(): void {
    if(this.reservationForm.valid){
      let res: Reservation = this.reservationForm.value;
      this.resService.addReservation(res);

      this.router.navigate(["/list"]);
    }
  }
}
