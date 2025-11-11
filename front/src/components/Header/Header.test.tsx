import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

jest.mock('./Header.styles', () => ({
  HeaderContainer: ({ children }: any) => <div data-testid="header-container">{children}</div>,
  Logo: ({ children, onClick }: any) => <div data-testid="logo" onClick={onClick}>{children}</div>,
  Nav: ({ children }: any) => <nav data-testid="nav">{children}</nav>,
  NavLink: ({ children, onClick }: any) => <span data-testid="nav-link" onClick={onClick}>{children}</span>,
}));

jest.mock('../Button/Button', () => ({ children, ...props }: any) => (
  <button data-testid="header-button" {...props}>{children}</button>
));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Header', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  test('renders logo and home link', () => {
    render(<Header isAuthenticated={false} />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('renders sign up button when not authenticated', () => {
    render(<Header isAuthenticated={false} />);
    const button = screen.getByTestId('header-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Sign up');
  });

  test('renders My profile link when authenticated', () => {
    render(<Header isAuthenticated={true} />);
    expect(screen.getByText('My profile')).toBeInTheDocument();
    expect(screen.queryByTestId('header-button')).not.toBeInTheDocument();
  });

  test('clicking logo navigates to home', () => {
    render(<Header isAuthenticated={false} />);
    fireEvent.click(screen.getByTestId('logo'));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('clicking home link navigates to home', () => {
    render(<Header isAuthenticated={false} />);
    fireEvent.click(screen.getByText('Home'));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('clicking My profile navigates to profile', () => {
    render(<Header isAuthenticated={true} />);
    fireEvent.click(screen.getByText('My profile'));
    expect(navigateMock).toHaveBeenCalledWith('/profile');
  });

  test('clicking Sign up button navigates to login', () => {
    render(<Header isAuthenticated={false} />);
    fireEvent.click(screen.getByTestId('header-button'));
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });
});
