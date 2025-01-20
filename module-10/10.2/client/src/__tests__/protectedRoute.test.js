import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import React from 'react';
import { useAuth } from '../context/AuthProvider';

//Mock useAuth hook
jest.mock('../context/AuthProvider', () => {
    useAuth: jest.fn()
});

describe('ProtectedRoute Component', () => {
    test('redirects to login if not loggged in', () => {
        useAuth.mockReturnValue({ user: null, isLoggedIn: false });

        console.log('Rendering ProtectedRoute component when user not logged in...');
        const { container } = render(
            <Router>
                <div>Protected Content</div>
            </Router>
        )
    });
    console.log(
      'Checking if Protected Content is not present due to redirect.'
    );
    // We can’t directly test for the Navigate component in this scenario,
    // Instead, check if the protected content is not present
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

    console.log('Protected Content is not present as expected.');
  });

  test('renders children if logged in', () => {
    useAuth.mockReturnValue({ user: { name: 'John Doe' }, isLoggedIn: true });

    console.log('Rendering ProtectedRoute component when user is logged in...');
    render(
      <Router>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </Router>
    );

    console.log('Checking if Protected Content is present for logged-in user.');
    expect(screen.getByText('Protected Content')).toBeInTheDocument();

    console.log('Protected Content is present as expected for logged-in user.');
  });