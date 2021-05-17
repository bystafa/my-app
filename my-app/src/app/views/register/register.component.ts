import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('',[Validators.required])
    })
  }
  ngOnDestroy(): void {
    if (this.aSub) this.aSub.unsubscribe()
  }

  onSubmit(): void {
    this.form.disable()
    this.aSub = this.authService.register(this.form.value).subscribe(
      () => this.router.navigate(['/']),
      error => {
        console.log(error)
        this.form.enable()
      }
    )
  }
}
