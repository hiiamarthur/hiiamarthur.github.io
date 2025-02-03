import { Component, createSignal } from 'solid-js';
import { header } from '../data/header';

const Header: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen());

  return (
    <header class="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div class="container flex mx-auto relative justify-between items-center w-full">
        <h1 class="flex-1 float-start text-2xl font-light">
          <a href="/" class="text-cyan-400 hover:text-cyan-300 transition-colors">
            {`${"<Hello World/>"}`}
          </a>
        </h1>
        
        <div class="lg:hidden">
          <button 
            class="menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div class={`h-1 w-6 bg-white mb-1 transition-all ${isMenuOpen() ? 'rotate-45 translate-y-2' : ''}`} />
            <div class={`h-1 w-6 bg-white mb-1 ${isMenuOpen() ? 'opacity-0' : ''}`} />
            <div class={`h-1 w-6 bg-white ${isMenuOpen() ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <nav class={` justify-end lg:flex lg:items-center lg:space-x-6 absolute lg:static top-20 left-0 w-full bg-gray-900 lg:bg-transparent transition-transform duration-300 ${isMenuOpen() ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <ul class="flex flex-col lg:flex-row lg:space-x-6 p-4 lg:p-0">
            {header.menu.map((item, index) => (
              <li style={{ "--delay": index }}>
                <a href={item.path} onclick={() => setIsMenuOpen(false)} class="block my-auto py-2 px-4 text-white hover:text-cyan-400">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
