import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminLogin from './AdminLogin';

test('renders Home', () => {
  render(<AdminLogin />);
  const linkElement = screen.getByText(/AdminLogin/i);
  expect(linkElement).toBeInTheDocument();
});