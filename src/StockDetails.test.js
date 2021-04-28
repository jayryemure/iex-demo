import { render, screen } from '@testing-library/react';
import App from './App';

test('StockDetails - renders form', () => {
  render(<StockDetails />);
  const inputElement = screen.getByText(/Ticker symbol/i);
  const buttonElement = screen.getByText(/submit/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});