import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactUs from './ContactUs';

test('renders Home', () => {
  render(<ContactUs />);
  const linkElement = screen.getByText(/ContactUs/i);
  expect(linkElement).toBeInTheDocument();
});