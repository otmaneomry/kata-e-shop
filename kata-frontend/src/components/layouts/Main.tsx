import React from 'react';
import {Sidebar} from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const Main: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar/>
            <main className="flex-1 p-8 ml-64"> {/* ml-64 matches sidebar width */}
                {children}
            </main>
        </div>
    );
};