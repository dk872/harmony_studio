import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsFaqPage from './NewsFaqPage';

jest.mock('../Accordion/Accordion', () => ({ items }: any) => (
  <div data-testid="accordion">{items.length}</div>
));

jest.mock('../OurPromise/OurPromise', () => () => <div data-testid="our-promise">OurPromise</div>);

describe('NewsFaqPage', () => {
  test('renders News and FAQ headings', () => {
    render(<NewsFaqPage />);
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  test('renders news accordion with correct number of items', () => {
    render(<NewsFaqPage />);
    const accordions = screen.getAllByTestId('accordion');
    expect(accordions[0]).toHaveTextContent('5');
  });

  test('renders FAQ accordion with correct number of items', () => {
    render(<NewsFaqPage />);
    const accordions = screen.getAllByTestId('accordion');
    expect(accordions[1]).toHaveTextContent('5');
  });

  test('renders OurPromise component', () => {
    render(<NewsFaqPage />);
    expect(screen.getByTestId('our-promise')).toBeInTheDocument();
  });
});
