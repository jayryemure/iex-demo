import { render, screen } from '@testing-library/react';
import App from './App';

test('App - renders header', () => {
  render(<App />);
  const textElement = screen.getByText(/IEX Demo/i);
  expect(textElement).toBeInTheDocument();
});