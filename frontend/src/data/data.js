
// import { Home, Calendar, UserCheck, User } from 'lucide-react';
// import React from 'react';

// export const adminMenu = [
//     { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
//     { key: '/doctors', icon: React.createElement(UserCheck), label: 'Doctors', path: '/doctors' },
//     { key: '/users', icon: React.createElement(User), label: 'Users', path: '/users' },
//     { key: '/profile', icon: React.createElement(User), label: 'Profile', path: '/profile' },
// ];


// // User Menu
// export const userMenu = [
//     { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
//     { key: '/appointments', icon: React.createElement(Calendar), label: 'Appointments', path: '/appointments' },
//     { key: '/apply-doctor', icon: React.createElement(UserCheck), label: 'Apply Doctor', path: '/apply-doctor' },
//     { key: '/profile', icon: React.createElement(User), label: 'Profile', path: '/profile' },
// ];

// // Doctor Menu
// export const doctorMenu = [
//     { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
//     { key: '/appointments', icon: React.createElement(Calendar), label: 'Appointments', path: '/appointments' },
//     { key: '/apply-doctor', icon: React.createElement(UserCheck), label: 'Apply Doctor', path: '/apply-doctor' },
//     { key: '/profile', icon: React.createElement(User), label: 'Profile', path: '/profile' },
// ];


import { Home, Calendar, UserCheck, User, Stethoscope, Clipboard } from 'lucide-react';
import React from 'react';

// Admin Menu
export const adminMenu = [
    { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
    { key: '/doctors', icon: React.createElement(Stethoscope), label: 'Doctors', path: '/doctors' },
    { key: '/users', icon: React.createElement(User), label: 'Users', path: '/users' },
    { key: '/profile', icon: React.createElement(User), label: 'Profile', path: '/profile' },
];

// User Menu
export const userMenu = [
    { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
    { key: '/appointments', icon: React.createElement(Calendar), label: 'Appointments', path: '/appointments' },
    { key: '/apply-doctor', icon: React.createElement(Clipboard), label: 'Apply Doctor', path: '/apply-doctor' },
    { key: '/profile', icon: React.createElement(User), label: 'Profile', path: '/profile' },
];

// Doctor Menu
export const doctorMenu = [
    { key: '/', icon: React.createElement(Home), label: 'Home', path: '/' },
    { key: '/appointments', icon: React.createElement(Calendar), label: 'Appointments', path: '/appointments' },
    { key: '/apply-doctor', icon: React.createElement(Clipboard), label: 'Apply Doctor', path: '/apply-doctor' },
    { key: '/profile', icon: React.createElement(User), label: 'Profile', path: '/profile' },
];
