import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServicesSection from './ServicesSection';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ServicesSection', () => {
  test('renders section title', () => {
    renderWithRouter(<ServicesSection />);
    expect(screen.getByText('Our Services')).toBeInTheDocument();
  });

  test('renders all service cards', () => {
    renderWithRouter(<ServicesSection />);
    const serviceNames = ['Face', 'Eyes', 'Massage', 'Manicure', 'Eyebrows', 'Lips'];
    serviceNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('renders background image', () => {
    renderWithRouter(<ServicesSection />);
    const bgImage = screen.getByAltText('Branch Background') as HTMLImageElement;
    expect(bgImage).toBeInTheDocument();
    expect(bgImage.src).toContain('services.png');
  });
});
