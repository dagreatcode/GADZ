import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('renders Home', () => {
  render(<UserProfile />);
  const linkElement = screen.getByText(/UserProfile/i);
  expect(linkElement).toBeInTheDocument();
});