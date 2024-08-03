"use client";

import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gradient-to-l from-cyan-900  to-slate-800 shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col items-center h-full">
        <div className="flex items-center justify-center h-20 w-full">
          <span className="text-white font-font-bold text-2xl">{isOpen ? 'Zeus' : 'Z'}</span>
          {/* <img src="./logo.png"  className="h-10 w-10 rounded-full" alt="" /> */}
        </div>
        <nav className="flex flex-col mt-6 w-full font-semibold">
          <NavItem href="/" icon={<HomeIcon className="h-6 w-6" />} text="Home" isOpen={isOpen} />
          <NavItem href="/products" icon={<UserIcon className="h-6 w-6" />} text="Products" isOpen={isOpen} />
          <NavItem href="/settings" icon={<CogIcon className="h-6 w-6" />} text="Settings" isOpen={isOpen} />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ href, icon, text, isOpen }: { href: string; icon: React.ReactNode; text: string; isOpen: boolean }) => {
  return (
    <Link href={href} className="relative flex items-center px-5 py-2 my-1 text-white transition-colors duration-200 hover:bg-cyan-900">
      <div className="flex items-center">
        {icon}
      </div>
      <span
        className={`ml-4 transition-all duration-300 ${isOpen ? 'opacity-100 w-auto ml-4' : 'opacity-0 w-0 ml-0'}`}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      >
        {text}
      </span>
    </Link>
  );
};

export default Sidebar;
