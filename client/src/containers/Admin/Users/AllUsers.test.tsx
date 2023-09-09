import React from 'react';
import { render, screen } from '@testing-library/react';
import AllUsers from './AllUsers';

test('renders Home', () => {
  render(<AllUsers />);
  const linkElement = screen.getByText(/AllUsers/i);
  expect(linkElement).toBeInTheDocument();
});