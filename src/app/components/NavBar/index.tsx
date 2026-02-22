'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import classes from './index.module.scss';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  /**
   * Smart anchor navigation:
   * - If already on "/", just scroll to the section id.
   * - If on another route, navigate to "/#id" first (browser will scroll).
   */
  const goToSection = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      closeMenu();

      const targetHash = `#${id}`;

      if (pathname === '/' || pathname === '') {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.location.hash = targetHash;
        }
        return;
      }

      router.push(`/${targetHash}`);
    },
    [pathname, router]
  );

  return (
    <nav className={classes.navbar}>
      {/* Logo → Home */}
      <div className={classes.logo}>
        <Link href="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>

      {/* Hamburger / Close Button */}
      <button
        className={`${classes.hamburger} ${isOpen ? classes.close : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="main-menu"
        type="button"
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Menu */}
      <ul
        id="main-menu"
        className={`${classes.menu} ${isOpen ? classes.open : classes.closed}`}
        role="menubar"
      >
        <li role="none">
          <a href="/#about" onClick={goToSection('about')}>
            About
          </a>
        </li>

       

        <li role="none">
          <a href="/#gallery" onClick={goToSection('gallery')}>
            Projects
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
