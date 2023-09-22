'use client';
import React from 'react';
import LogoSection from './LogoSection';
import UserSection from './UserSection';

export default function Navbar() {
    return (
        <nav className="relative px-4 py-4 flex justify-between items-center bg-gray-800">
            <LogoSection />
            <UserSection />
        </nav>
    );
}
