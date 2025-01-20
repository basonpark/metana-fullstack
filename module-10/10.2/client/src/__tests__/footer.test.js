import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import React from 'react';
import { COPYRIGHT_INFO, CONTACT_EMAIL } from '../config';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
    console.log('Rendering Footer Component...');

    test('renders footer component', () => {
        render(<Footer />);
        console.log('Checking if copyright info is correct');
        expect(screen.getByText(`Copyright: ${COPYRIGHT_INFO}`)).toBeInTheDocument();
    
        console.log('Checking if email address is present and correctly linked');
        const emailElement = screen.getByText(CONTACT_EMAIL);
        expect(emailElement).toBeInTheDocument();
        expect(emailElement).toHaveAttribute('href', `mailto:${CONTACT_EMAIL}`);
        
        console.log(
          'Checking if the phone number is correctly formatted and present.'
        );
        expect(screen.getByText(/ph:\s*\+1\(234\)567-8901/)).toBeInTheDocument();
    
        console.log('Footer component rendered with correct content.');
    });

})