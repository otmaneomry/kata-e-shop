import {Link, useLocation} from 'react-router-dom';
import {useCart} from '../../hooks/useCart';
import {EnvelopeIcon, HomeIcon, ShoppingCartIcon} from '@heroicons/react/24/outline';

export const Sidebar = () => {
    const location = useLocation();
    const {getTotalItems} = useCart();

    const navItems = [
        {path: '/', label: 'Products', icon: HomeIcon},
        {path: '/cart', label: 'Cart', icon: ShoppingCartIcon, badge: getTotalItems()},
        {path: '/contact', label: 'Contact', icon: EnvelopeIcon},
    ];

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">My Shop</h1>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                flex items-center space-x-2 px-4 py-3 rounded-lg
                ${location.pathname === item.path
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }
              `}
                        >
                            <item.icon className="w-6 h-6"/>
                            <span>{item.label}</span>
                            {item.badge ? (
                                <span className="ml-auto bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                  {item.badge}
                </span>
                            ) : null}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};