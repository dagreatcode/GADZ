import React from 'react';
import { render, screen } from '@testing-library/react';
import Employee from './Employee';

test('renders Home', () => {
  render(<Employee />);
  const linkElement = screen.getByText(/Employee/i);
  expect(linkElement).toBeInTheDocument();
});