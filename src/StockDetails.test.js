import { render, screen } from '@testing-library/react';
import StockDetails from './StockDetails';

test('StockDetails - renders form', () => {
  render(<StockDetails />);
  const inputElement = screen.getByText(/Enter ticker symbol/i);
  const buttonElement = screen.getByText(/submit/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});