import React from 'react';
import { render, screen } from '@testing-library/react';
import Consultation from './Consultation';

test('renders Home', () => {
  render(<Consultation />);
  const linkElement = screen.getByText(/Consultation/i);
  expect(linkElement).toBeInTheDocument();
});