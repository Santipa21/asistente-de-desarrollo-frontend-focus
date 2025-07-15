// src/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from './Header'; // Adjust path if necessary
import React from 'react';

describe('Header Component', () => {
  it('renders the DevAssist title', () => {
    render(<Header />);
    expect(screen.getByText(/DevAssist/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend Specialist/i)).toBeInTheDocument();
  });

  it('renders the GitHub integration text on wider screens (mocking CSS might be needed for full check)', () => {
    render(<Header />);
    // This text is inside a md:flex container, so it might not be straightforward to test visibility without more setup.
    // For now, just check if the text exists.
    const githubIntegrationText = screen.queryByText(/Integrado con GitHub/i);
    // We can't easily assert visibility here without a more complex setup involving viewport changes or CSS mocking.
    // A simple check for existence is a starting point.
    expect(githubIntegrationText).toBeInTheDocument();
  });

  it('renders the status indicator', () => {
    render(<Header />);
    // The status indicator is visual (colored divs). We can check for its presence by structure if needed,
    // or by a test ID if one were added. For now, this test is more of a placeholder for visual elements.
    // Example: Check for the container of the pulsing dot.
    const headerElement = screen.getByRole('banner'); // The header element
    const statusContainer = headerElement.querySelector('.bg-green-900\\/50'); // Using a class selector
    expect(statusContainer).toBeInTheDocument();
    const pulsingDot = statusContainer?.querySelector('.bg-green-400');
    expect(pulsingDot).toBeInTheDocument();
  });
});
