import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import React from 'react';

describe('Header Component', () => {
    console.log('Rendering Header Component...');
    render(<Header />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('This is the page Header')).toBeInTheDocument();

    console.log('Header component rendered successfully');

})