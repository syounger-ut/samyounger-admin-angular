import { of } from 'rxjs';

interface MockAuthenticationService {
  login: () => void;
}

export const MockAuthenticationService = (): MockAuthenticationService => {
  return {
    login: jest.fn(() => {
      return of({});
    }),
  }
}
