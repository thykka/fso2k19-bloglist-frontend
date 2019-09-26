import '@testing-library/jest-dom/extend-expect';

let mockStorage = {};

const mockLocalStorage = {
  setItem: (key, value) => mockStorage[key] = value,
  getItem: key => mockStorage[key],
  clear: mockStorage = {}
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
