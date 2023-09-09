import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileUpdate from './ProfileUpdate';

test('renders Home', () => {
  render(<ProfileUpdate />);
  const linkElement = screen.getByText(/ProfileUpdate/i);
  expect(linkElement).toBeInTheDocument();
});