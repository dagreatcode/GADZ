import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs';

test('renders Home', () => {
  render(<AboutUs />);
  const linkElement = screen.getByText(/AboutUs/i);
  expect(linkElement).toBeInTheDocument();
});