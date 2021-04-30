import { render, screen } from '@testing-library/react';
import StockTable from './StockTable';

const stocks = [{
  symbol: 'FOO',
  latestPrice: 100.00,
  change: 5,
  changePercent: 0.03
}]

test('StockTable - renders table', () => {
  render(<StockTable stocks={stocks}/>);
  const columnElement = screen.getByText(/FOO/i);
  expect(columnElement).toBeInTheDocument();
});