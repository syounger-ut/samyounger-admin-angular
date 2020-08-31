import { Shallow } from 'shallow-render';
import { NgModule } from '@angular/core';
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

const routes: Routes = [{ path: 'home', component: class DummyComponent {} }];
const mockAuthenticationService = MockAuthenticationService();
const mockAlertService = MockAlertService();

describe('RegisterComponent', () => {
  let shallow: Shallow<RegisterComponent>;
  let fixture: ComponentFixture<RegisterComponent[]>;
  let instance: RegisterComponent;
  let find: any;

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
});
