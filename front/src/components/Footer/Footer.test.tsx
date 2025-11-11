import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

jest.mock('./Footer.styles', () => ({
  FooterContainer: ({ children }: any) => <div data-testid="footer-container">{children}</div>,
  FooterContent: ({ children }: any) => <div data-testid="footer-content">{children}</div>,
  FooterContacts: ({ children }: any) => <div data-testid="footer-contacts">{children}</div>,
  FooterAddress: ({ children }: any) => <div data-testid="footer-address">{children}</div>,
  FooterIcons: ({ children }: any) => <div data-testid="footer-icons">{children}</div>,
  FooterParagraph: ({ children }: any) => <p data-testid="footer-paragraph">{children}</p>,
  FooterCopyright: ({ children }: any) => <div data-testid="footer-copyright">{children}</div>,
  A: ({ children, ...props }: any) => <a data-testid="footer-link" {...props}>{children}</a>,
}));

describe('Footer', () => {
  test('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.getByText('+38 (093) 287-25-80')).toBeInTheDocument();
    expect(screen.getByText('harmony.studio@gmail.com')).toBeInTheDocument();
  });

  test('renders address information', () => {
    render(<Footer />);
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Springfield, 62704')).toBeInTheDocument();
    expect(screen.getByText('123 Maple Street')).toBeInTheDocument();
  });

  test('renders social media icons with correct links', () => {
    render(<Footer />);
    const links = screen.getAllByTestId('footer-link');
    const hrefs = links.map(link => link.getAttribute('href'));
    expect(hrefs).toEqual([
      'https://facebook.com',
      'https://instagram.com',
      'https://telegram.org',
      'https://linkedin.com',
    ]);
  });

  test('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('© 2025 Harmony Studio. All rights reserved.')).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer-container')).toBeInTheDocument();
    expect(screen.getByTestId('footer-content')).toBeInTheDocument();
    expect(screen.getByTestId('footer-contacts')).toBeInTheDocument();
    expect(screen.getByTestId('footer-address')).toBeInTheDocument();
    expect(screen.getByTestId('footer-icons')).toBeInTheDocument();
    expect(screen.getByTestId('footer-copyright')).toBeInTheDocument();
  });
});
