import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    toggleMenu();
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className='font-poppins'>
      {/* Menu Toggle Button */}
      <div className='lg:hidden flex items-center'>
        <button
          onClick={toggleMenu}
          className='text-white cursor-pointer hover:text-teal-300 transition focus:outline-none'
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={30} /> : <MenuIcon size={30} />}
        </button>
      </div>

      {/* Sidebar Menu Content */}
      {isMenuOpen && (
        <div className='lg:hidden absolute top-[73px] h-[90vh] left-0 right-0 bg-[#04293a] z-50 flex flex-col justify-between py-10 gap-4 text-[20px] overflow-y-auto transition-all duration-300 ease-in-out'>

          {/* Public Links */}
          <Link href='/' onClick={handleLinkClick}>
            <div className={`cursor-pointer pl-6 py-2 ${pathname === '/' ? "text-teal-400 font-bold" : "text-[#FFFFFF]" } hover:text-teal-300 transition`}>
              Home
            </div>
          </Link>
          <div className='w-full border-t border-[#FFFFFF80]'></div>

          <Link href='/pricings' onClick={handleLinkClick}>
            <div className={`cursor-pointer py-2 pl-6 ${pathname === '/pricings' ? "text-teal-400 font-bold" : "text-[#FFFFFF]" } hover:text-teal-300 transition`}>
              Our offerings
            </div>
          </Link>
          <div className='w-full border-t border-[#FFFFFF80]'></div>

          <Link href='/about-us' onClick={handleLinkClick}>
            <div className={`cursor-pointer py-2 pl-6 ${pathname === '/about-us' ? "text-teal-400 font-bold" : "text-[#FFFFFF]" } hover:text-teal-300 transition`}>
              About Us
            </div>
          </Link>
          <div className='w-full border-t border-[#FFFFFF80]'></div>

          <Link href='/partners' onClick={handleLinkClick}>
            <div className={`cursor-pointer py-2 pl-6 ${pathname === '/partners' ? "text-teal-400 font-bold" : "text-[#FFFFFF]" } hover:text-teal-300 transition`}>
              Partners
            </div>
          </Link>
          <div className='w-full border-t border-[#FFFFFF80]'></div>

          <Link href='/blogs' onClick={handleLinkClick}>
            <div className={`cursor-pointer py-2 pl-6 ${pathname === '/blogs' ? "text-teal-400 font-bold" : "text-[#FFFFFF]" } hover:text-teal-300 transition`}>
              Blogs
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;