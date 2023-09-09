import React from 'react';
import { render, screen } from '@testing-library/react';
import PrintOut from './PrintOut';

test('renders Home', () => {
  render(<PrintOut />);
  const linkElement = screen.getByText(/PrintOut/i);
  expect(linkElement).toBeInTheDocument();
});