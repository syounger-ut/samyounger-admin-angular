import { Shallow } from 'shallow-render';
import { NgModule, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

import { RegisterComponent } from './register.component';
import { AlertService, AuthenticationService } from '@root/_services';
import { ComponentFixture } from '@angular/core/testing';
import { MockAuthenticationService } from '@root/__mocks__/authentication.mock.service';
import { MockAlertService } from '@root/__mocks__/alert.mock.service';
import { QueryMatch } from 'shallow-render/dist/lib/models/query-match';

const routes: Routes = [{ path: 'home', component: class DummyComponent {} }];
const mockAuthenticationService = MockAuthenticationService();
const mockAlertService = MockAlertService();

describe('RegisterComponent', () => {
  let shallow: Shallow<RegisterComponent>;
  let fixture: ComponentFixture<RegisterComponent[]>;
  let instance: RegisterComponent;
  let find: (cssOrDirective: any, options?: any) => QueryMatch<DebugElement>;

  @NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forRoot(routes)
    ],
    declarations: [RegisterComponent],
    providers: [
      { provide: APP_BASE_HREF, useValue: '/' },
      { provide: AuthenticationService, useValue: mockAuthenticationService },
      { provide: AlertService, useValue: mockAlertService },
    ],
  })
  class TestingModule {}

  beforeEach(() => {
    shallow = new Shallow(RegisterComponent, TestingModule).replaceModule(
      RouterModule,
      RouterTestingModule.withRoutes(routes)
    );
    shallow.dontMock(
      AuthenticationService,
      AlertService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', async () => {
    ({ find } = await shallow.render());

    expect(find('form')).toBeTruthy();
  });

  describe('validation', () => {
    beforeEach(async () => {
      ({ find, instance } = await shallow.render())
      instance.registerForm.setValue({
        first_name: 'foo',
        last_name: 'bar',
        email: 'foo@bar.com',
        password: 'password',
      });
    });

    const fieldValidation = (fieldName: string, falseValue, trueValue: string): void => {
      instance.registerForm.controls[fieldName].setValue(falseValue);
      expect(instance.registerForm.valid).toBeFalsy();
      instance.registerForm.controls[fieldName].setValue(trueValue);
      expect(instance.registerForm.valid).toBeTruthy();
    }

    describe('first_name', () => {
      it('is required', () => {
        fieldValidation('first_name', '', 'Foo Bar');
      });
    });

    describe('last_name', () => {
      it('is required', () => {
        fieldValidation('last_name', '', 'Foo Bar')
      });
    });

    describe('email', () => {
      it('is required', () => {
        fieldValidation('email', '', 'foo@bar.com')
      });

      it('must be a valid email string', () => {
        fieldValidation('email', 'foobar', 'foo@bar.com');
      });
    });

    describe('password', () => {
      it('is required', () => {
        fieldValidation('password', '', 'password')
      });

      it('must be 6 or more chars', () => {
        fieldValidation('password', '12345', '123456');
      });
    });
  });
});
