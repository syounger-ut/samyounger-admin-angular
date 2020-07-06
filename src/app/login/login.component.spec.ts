import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        LoginComponent,
      ],
    }).compileComponents();
  }));

  it('should render the component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const loginComponent = fixture.componentInstance;
    expect(loginComponent).toBeTruthy();
  });
});
