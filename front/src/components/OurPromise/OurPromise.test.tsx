import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OurPromise from './OurPromise';

describe('OurPromise', () => {
  test('renders the main title', () => {
    render(<OurPromise />);
    expect(screen.getByText('Our Promise to You')).toBeInTheDocument();
  });

  test('renders all promise items', () => {
    render(<OurPromise />);
    const items = screen.getAllByText(/:/);
    expect(items.length).toBe(5);
    expect(items[0]).toHaveTextContent('Expertise You Can Trust');
    expect(items[1]).toHaveTextContent('Personalized Experience');
    expect(items[2]).toHaveTextContent('Commitment to Quality');
    expect(items[3]).toHaveTextContent('Relaxing Atmosphere');
    expect(items[4]).toHaveTextContent('Client-Centric Approach');
  });
});
