import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@root/_services';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  public loading: boolean = false;

  public submitted: boolean = false;

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private ngZone: NgZone,
    ) {}

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  public get f(): Record<string, AbstractControl> {
    return this.registerForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register$(this.registerForm.value)
      .pipe(first())
      .subscribe(
        _data => {
          this.alertService.success('Registration successful', true);
          this.ngZone.run(() => this.router.navigate(['/']));
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
      });
  }
}
