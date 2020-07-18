import { Shallow } from 'shallow-render';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

import { LoginComponent } from './login.component';
import { AlertService } from '@root/_services';

const routes: Routes = [{ path: 'home', component: class DummyComponent {} }];

describe('LoginComponent', () => {
  let shallow: Shallow<LoginComponent>;

  @NgModule({
    imports: [
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(routes)
    ],
    declarations: [LoginComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  })
  class TestingModule {}

  beforeEach(() => {
    shallow = new Shallow(LoginComponent, TestingModule).replaceModule(
      RouterModule,
      RouterTestingModule.withRoutes(routes)
    );
    shallow.mock(AlertService, { clear: () => true,  })
  });

  it('renders the component', async () => {
    const { find } = await shallow.render();

    expect(find('form')).toBeTruthy();
  });
});
