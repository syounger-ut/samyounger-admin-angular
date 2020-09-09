import { of } from 'rxjs';

interface MockAlertService {
  error: () => void;
  clear: () => void;
  success: () => void;
}

export const MockAlertService = (): MockAlertService => {
  return {
    error: jest.fn(() => {
      return of({});
    }),
    clear: jest.fn(() => {
      return of({});
    }),
    success: jest.fn(() => {
      return of({});
    }),
  }
}
