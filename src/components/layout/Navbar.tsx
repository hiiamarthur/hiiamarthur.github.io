import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Navbar: Component = () => {
  return (
    <nav class="navbar">
      <div class="nav-brand">Your Name</div>
      <div class="nav-links">
        <ul>
          <li><A href="/" end>Home</A></li>
          <li><A href="/experience">Experience</A></li>
          <li><A href="/projects">Projects</A></li>
          <li><A href="/contact">Contact</A></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 