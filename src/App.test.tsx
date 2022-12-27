import React from 'react';
import { render, screen } from '@testing-library/react';
import {NormalEdit} from './App';

test('renders learn react link', () => {
  render(<NormalEdit />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
