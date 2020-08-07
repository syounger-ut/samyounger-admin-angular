import { of } from 'rxjs';

interface MockAlertService {
  error: () => void;
  clear: () => void;
}

export const MockAlertService = (): MockAlertService => {
  return {
    error: jest.fn(() => {
      return of({});
    }),
    clear: jest.fn(() => {
      return of({});
    })
  }
}
