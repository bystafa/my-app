import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  ngOnDestroy(): void {
    if (this.aSub) this.aSub.unsubscribe()
  }

  onSubmit(): void {
    this.form.disable()
    this.aSub = this.authService.login(this.form.value).subscribe(
      () => {
        const modalRef = this.modalService.open(ModalComponent, { centered: true });
        modalRef.componentInstance.text = 'Вы успешно авторизовались';
        modalRef.componentInstance.type = 'POSITIVE';
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 500);
        setTimeout(() => {
          modalRef.close()
        }, 2000);
      },
      error => {
        console.log(error)
        this.form.enable()
      }
    )
  }
}
