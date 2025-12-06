import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeLogin from './EmployeeLogin';

test('renders Home', () => {
  render(<EmployeeLogin />);
  const linkElement = screen.getByText(/EmployeeLogin/i);
  expect(linkElement).toBeInTheDocument();
});