import React from 'react';
import { render, screen } from '@testing-library/react';
import LiveChat from './LiveChat';

test('renders Home', () => {
  render(<LiveChat />);
  const linkElement = screen.getByText(/LiveChat/i);
  expect(linkElement).toBeInTheDocument();
});