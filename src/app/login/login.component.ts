import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { AlertService, AuthenticationService } from '@root/_services';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: true }) public form: NgForm;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    const email = this.form.value.email;
    const password = this.form.value.password;
    // // reset alerts on submit
    this.alertService.clear();

    // // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(email, password).subscribe(
      _res => {
        this.ngZone.run(() => this.router.navigate([this.returnUrl]));
      },
      err => {
        this.alertService.error(err);
        this.loading = false;
      },
    )
  }
}
