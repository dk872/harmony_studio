import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from './MainPage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../Header/Header', () => ({ isAuthenticated }: any) => <div data-testid="header">{isAuthenticated ? 'Auth' : 'Guest'}</div>);
jest.mock('../Footer/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../ServicesPage/ServicesSection', () => () => <div data-testid="services">ServicesSection</div>);
jest.mock('../NewsFaq/NewsFaqPage', () => () => <div data-testid="newsfaq">NewsFaqPage</div>);
jest.mock('../Button/Button', () => ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>);

describe('MainPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
  });

  test('renders header, sections, and footer', () => {
    render(<MainPage />);
    expect(screen.getByTestId('header')).toHaveTextContent('Auth');
    expect(screen.getByTestId('services')).toBeInTheDocument();
    expect(screen.getByTestId('newsfaq')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders main heading and description', () => {
    render(<MainPage />);
    expect(screen.getByText('Harmony Studio')).toBeInTheDocument();
    expect(screen.getByText('Welcome to Harmony Studio')).toBeInTheDocument();
  });

  test('See more button navigates to /services', () => {
    render(<MainPage />);
    const button = screen.getByRole('button', { name: /See more/i });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/services');
  });

  test('renders image', () => {
    render(<MainPage />);
    const img = screen.getByAltText('Harmony Studio Model');
    expect(img).toBeInTheDocument();
  });
});
