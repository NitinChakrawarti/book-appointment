import { Home, Calendar, User, Stethoscope, Clipboard } from 'lucide-react';
import React from 'react';

// Admin Menu
export const adminMenu = [
    { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
    { key: '/admin/doctors', icon: React.createElement(Stethoscope), label: 'Doctors', path: '/admin/doctors' },
    { key: '/admin/users', icon: React.createElement(User), label: 'Users', path: '/admin/users' },
    { key: '/admin/profile', icon: React.createElement(User), label: 'Profile', path: '/admin/profile' },
];

// User Menu
export const userMenu = [
    { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
    { key: '/user/appointments', icon: React.createElement(Calendar), label: 'Appointments', path: '/user/appointments' },
    { key: '/apply-doctor', icon: React.createElement(Clipboard), label: 'Apply Doctor', path: '/apply-doctor' },
    { key: '/user/profile', icon: React.createElement(User), label: 'Profile', path: '/user/profile' },
];

// Doctor Menu
export const doctorMenu = [
    { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
    { key: '/doctor/appointments', icon: React.createElement(Calendar), label: 'Appointments', path: '/doctor/appointments' },
    { key: '/doctor/profile', icon: React.createElement(User), label: 'Profile', path: '/doctor/profile' },
];
