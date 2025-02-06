import { Component } from 'solid-js';

const Footer: Component = () => {
  const handleNavClick = (e: Event, path: string) => {
    e.preventDefault();
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  
      history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <footer class="bg-gray-800 text-white p-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2025 | Designed by <a href="#about" onClick={(e) => handleNavClick(e, "#about")} class="text-cyan-400 hover:text-cyan-300">Arthur</a></p>
      </div>
    </footer>
  );
};

export default Footer; 