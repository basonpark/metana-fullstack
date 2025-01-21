import { render, screen } from '@testing-library/react';
import Navigation from '../components/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/AuthProvider';

// Mock useAuth hook
jest.mock('../context/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

describe('Navigation Component', () => {
  test('renders navigation links correctly when logged out', () => {
    useAuth.mockImplementation(() => ({
        user: null,
        isLoggedIn: false
    }));

    console.log('Rendering Navigation component when user is logged out...');
    render(
      <Router>
        <Navigation />
      </Router>
    );

    console.log('Checking if the navigation links are rendered correctly.');
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();

    console.log('All navigation links for logged out state are present.');
  });

  test('renders user profile link when logged in', () => {
    useAuth.mockImplementation(() => ({
        user: { name: 'John Doe' },
        isLoggedIn: true
    }));

    console.log('Rendering Navigation component when user is logged in...');
    render(
      <Router>
        <Navigation />
      </Router>
    );

    console.log(
      'Checking if the user profile link is rendered and login link is not present.'
    );
    expect(screen.queryByText('Log in')).not.toBeInTheDocument();

    console.log('User profile link is present and login link is not.');
  });
});