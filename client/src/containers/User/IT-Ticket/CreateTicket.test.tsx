import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateTicket from './CreateTicket';

test('renders Home', () => {
  render(<CreateTicket />);
  const linkElement = screen.getByText(/CreateTicket/i);
  expect(linkElement).toBeInTheDocument();
});