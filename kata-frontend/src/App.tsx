import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Main} from './components/layouts/Main.tsx';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
    return (
        <Router>
            <Main>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Main>
        </Router>
    );
};

export default App;