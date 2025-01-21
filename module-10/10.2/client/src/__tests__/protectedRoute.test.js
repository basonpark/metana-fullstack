import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import React from 'react';
import '@testing-library/jest-dom';

// Mock the entire module
jest.mock('../context/AuthProvider', () => {
    // Create a mock function that we can control
    const mockUseAuth = jest.fn();
    
    // Set default return value
    mockUseAuth.mockReturnValue({
        user: null,
        isLoggedIn: false
    });

    // Return an object with useAuth property
    return {
        useAuth: mockUseAuth
    };
});

// Import the mocked version
import { useAuth } from '../context/AuthProvider';

describe('ProtectedRoute Component', () => {

    //reset all mocks before each test
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('redirects to login if not loggged in', () => {
      useAuth.mockReturnValue({
        user: null,
        isLoggedIn: false
    });

        console.log('Rendering ProtectedRoute component when user not logged in...');
        const { container } = render(
            <Router>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </Router>
        )
    });
    console.log(
      'Checking if Protected Content is not present due to redirect.'
    );
    // We can't directly test for the Navigate component in this scenario,
    // Instead, check if the protected content is not present
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

    console.log('Protected Content is not present as expected.');
  });

  test('renders children if logged in', () => {
    useAuth.mockReturnValue({
      user: { name: 'John Doe' },
      isLoggedIn: true
    });

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