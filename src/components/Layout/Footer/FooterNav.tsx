import React from 'react';
import { Link } from 'react-router-dom';

const navigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' }
  ],
  services: [
    { name: 'Corporate Events', href: '/services/corporate' },
    { name: 'Weddings', href: '/services/weddings' },
    { name: 'Private Events', href: '/services/private' }
  ]
};

const FooterNav: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-4">Company</h3>
        <ul className="space-y-3">
          {navigation.company.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="text-gray-400 hover:text-white transition-colors">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-4">Services</h3>
        <ul className="space-y-3">
          {navigation.services.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="text-gray-400 hover:text-white transition-colors">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default FooterNav;