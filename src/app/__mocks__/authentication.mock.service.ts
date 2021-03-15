import { of, Observable } from 'rxjs';

interface MockAuthenticationService {
  login$: () => Observable<{}>;
  register$: () => Observable<{}>;
}

export const MockAuthenticationService = (): MockAuthenticationService => {
  return {
    login$: jest.fn(() => {
      return of({});
    }),
    register$: jest.fn(() => {
      return of({});
    }),
  };
};
