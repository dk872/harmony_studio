import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';

jest.mock('./Accordion.styles', () => ({
  AccordionContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AccordionItem: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-item">{children}</div>,
  AccordionHeader: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick} data-testid="accordion-header">
      {children}
    </button>
  ),
  AccordionContent: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) => (
    <div data-testid="accordion-content" data-open={isOpen}>
      {children}
    </div>
  ),
  IconWrapper: ({ children }: { children: React.ReactNode }) => <span data-testid="icon-wrapper">{children}</span>,
}));

jest.mock('react-icons/fa', () => ({
  FaPlus: () => <svg data-testid="icon-plus" />,
  FaMinus: () => <svg data-testid="icon-minus" />,
}));

const mockItems = [
  { title: 'Question 1', content: 'Answer for question 1.' },
  { title: 'Question 2', content: 'Answer for question 2.' },
  { title: 'Question 3', content: 'Answer for question 3.' },
];

describe('Accordion', () => {
  test('renders all item headers correctly', () => {
    render(<Accordion items={mockItems} />);
    mockItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test('initially renders all content sections closed', () => {
    render(<Accordion items={mockItems} />);
    const items = screen.getAllByTestId('accordion-item');
    items.forEach(item => {
      const content = within(item).getByTestId('accordion-content');
      expect(content).toHaveAttribute('data-open', 'false');
      expect(within(item).getByTestId('icon-plus')).toBeInTheDocument();
    });
  });

  test('opens and closes content when header is clicked', () => {
    render(<Accordion items={mockItems} />);
    const item = screen.getAllByTestId('accordion-item')[0];
    const header = within(item).getByTestId('accordion-header');
    const content = within(item).getByTestId('accordion-content');

    fireEvent.click(header);
    expect(content).toHaveAttribute('data-open', 'true');
    expect(within(header).getByTestId('icon-minus')).toBeInTheDocument();

    fireEvent.click(header);
    expect(content).toHaveAttribute('data-open', 'false');
    expect(within(header).getByTestId('icon-plus')).toBeInTheDocument();
  });

  test('switches content correctly (single open item allowed)', () => {
    render(<Accordion items={mockItems} />);
    const [item1, item2] = screen.getAllByTestId('accordion-item');
    const header1 = within(item1).getByTestId('accordion-header');
    const header2 = within(item2).getByTestId('accordion-header');
    const content1 = within(item1).getByTestId('accordion-content');
    const content2 = within(item2).getByTestId('accordion-content');

    fireEvent.click(header1);
    expect(content1).toHaveAttribute('data-open', 'true');
    expect(content2).toHaveAttribute('data-open', 'false');

    fireEvent.click(header2);
    expect(content1).toHaveAttribute('data-open', 'false');
    expect(content2).toHaveAttribute('data-open', 'true');

    expect(within(header2).getByTestId('icon-minus')).toBeInTheDocument();
    expect(within(header1).getByTestId('icon-plus')).toBeInTheDocument();
  });

  test('content text is displayed correctly when open', () => {
    render(<Accordion items={mockItems} />);
    const item = screen.getAllByTestId('accordion-item')[1];
    const header = within(item).getByTestId('accordion-header');
    fireEvent.click(header);
    expect(within(item).getByText('Answer for question 2.')).toBeInTheDocument();
  });
});
