"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon, CogIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import  Image  from 'next/image'
import logo from '../../assets/logo.png'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`sidebar fixed top-0 left-0 h-full bg-gradient-to-l from-cyan-900 to-slate-800 shadow-lg transition-all duration-400 ${
        isOpen ? 'w-52 lg:w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col items-center h-full">
        <div className="flex items-center justify-center h-20 w-full shadow">
          <span className="text-white lg:text-2xl mr-2">{isOpen ? 'ASTRUS' : ''}</span>
          <Image
            src={logo}
            alt="Logo"
            className='h-5 w-5 lg:h-7 lg:w-7'
          />
          <span className="text-white text-lg lg:text-2xl ml-2">{isOpen ? 'DIGITAL' : ''}</span>
        </div>
        <nav className="flex flex-col mt-6 w-full font-semibold text-sm lg:text-base">
          <NavItem href="/" icon={<HomeIcon className="h-5 w-5 lg:h-6 lg:w-6" />} text="Home" isOpen={isOpen} />
          <NavItem href="/products" icon={<ShoppingBagIcon className="h-5 w-5 lg:h-6 lg:w-6" />} text="Produtos" isOpen={isOpen} />
          <NavItem href="#" icon={<CogIcon className="h-5 w-5 lg:h-6 lg:w-6" />} text="Configurações" isOpen={isOpen} />
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