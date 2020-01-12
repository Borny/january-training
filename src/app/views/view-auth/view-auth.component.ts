import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthResponseData } from '../../shared/models/auth-response.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'view-auth',
  templateUrl: './view-auth.component.html',
  styleUrls: ['./view-auth.component.scss']
})
export class ViewAuthComponent {

  @ViewChild('inputEmail', { static: true }) emailInput: ElementRef;

  public isFetching = false;
  public error = null;
  public success = null;
  public logginIn = 'Loggin In...';

  constructor(private authService: AuthService, private router: Router) {
  }

  public onSubmitTemplate(form: NgForm) {
    this.error = null;
    this.success = null;

    if (!form.valid) {
      return;
    }
    this.isFetching = true;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signIn(email, password)
      .subscribe(
        (resData: AuthResponseData) => {
          this.isFetching = false;
          this.success = `Log in successful!!`;
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        (errorMessage) => {
          this.error = errorMessage;
          this.isFetching = false;
        });

    form.reset();
  }

}
