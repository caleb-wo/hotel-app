import { Component, OnInit } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activeRoute: ActivatedRoute,
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
  
    let id = this.activeRoute.snapshot.paramMap.get("id");

    if (id){
      let reservation = this.resService.getReservation(id).subscribe(res => {
        if (res){
          this.reservationForm.patchValue(res)
        }
      });
    }
  }

  onSubmit(): void {
    if(this.reservationForm.valid){
      let res: Reservation = this.reservationForm.value;
      let id = this.activeRoute.snapshot.paramMap.get("id");

      if (id){
        this.resService.updateReservation(id, res).subscribe(()=> console.log("Update request processed."));
      } else {
        this.resService.addReservation(res).subscribe(()=> console.log("Create request processed."));
      }

      this.router.navigate(["/list"]);
    }
  }
}
