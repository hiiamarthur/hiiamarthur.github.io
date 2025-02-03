import { Component, createSignal, onMount } from 'solid-js';
import { A } from '@solidjs/router';
import styles from './Home.module.css';
import Button from '../components/Buttons/Button';
import Button2 from '../components/Buttons/Button2';
import MainLayout from '../layouts/MainLayout';
import Typewriter from '../components/typewriter';
import Tab from '../components/Tab';
import { experiences } from '../data/experiences';
import ExperienceCard from '../components/experience/ExperienceCard';

const Home: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);
  
  onMount(() => {
    setIsVisible(true);
  });

  const handlePhoneClick = (phone: string) => {
    if (/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <MainLayout class={styles.container}>
      {/* <Button>test</Button> */}
      <a href="#hello"></a>
      <section id="hello" class="hero min-h-screen flex items-center justify-center">
        <Typewriter>
          <h1>Hi, I'm Arthur</h1> 
        </Typewriter>
      
    </section>
    <a href="#about"></a>
    <section id="about" class="hero min-h-screen flex items-center justify-center">

        {/* <Typewriter> */}
        <p>A developer who is a Chinese University of Hong Kong (CUHK) graduate with 4+ years of experience, seeking for more learning opportunities in the IT industry to enhance personal values gained through project and social experiences. There is a believe throughout my career path that maintaining competitiveness is important via passionate about everything happend around the world.</p>
        {/* </Typewriter> */}
        {/* <a href="#">Explore More</a> */}
    </section>

    <a href="#experience"></a>
    <section id="experience" class="hero min-h-screen flex items-center justify-center">
    <Tab tabs={
      experiences.map(experience => ({
        id: experience.id,
        label: experience.company,
        content: <ExperienceCard experience={experience} />
      }))
      } defaultTab="about" />
    </section>

    <a href="#projects"></a>
    <section id="projects" class="cards min-h-screen">
        <div class="card">
            <h3>Neon City</h3>
            <p>Discover the vibrant life and dynamic energy of the city.</p>
        </div>
        <div class="card">
            <h3>Tech Revolution</h3>
            <p>Embrace the cutting-edge technology shapin g our world.</p>
        </div>
        <div class="card">
            <h3>Cyber Security</h3>
            <p>Stay protected in the digital age with advanced security measures.</p>
        </div>
    </section>
      {/* Profile Summary Section */}
      <section class={`${styles.section} ${isVisible() ? styles.fadeIn : ''}`}>
        <h2>Profile Summary</h2>
        <p class={styles.summary}>
          A developer who is a Chinese University of Hong Kong (CUHK) graduate with 4+ years of experience, 
          seeking for more learning opportunities in the IT industry to enhance personal values gained 
          through project and social experiences.
        </p>
      </section>

      {/* Contact Section */}
      <section class={`${styles.section} ${isVisible() ? styles.slideIn : ''}`}>
        <h2>Contact</h2>
        <div class={styles.contactInfo}>
          <p>
            Phone: <span 
              onClick={() => handlePhoneClick('4379337316')}
              class={/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) ? styles.link : ''}
            >
              437-933-7316
            </span>
          </p>
          <p>
            Email: <span 
              onClick={() => handleEmailClick('pingtunglau@gmail.com')}
              class={styles.link}
            >
              pingtunglau@gmail.com
            </span>
          </p>
          <p>
            Github: <a href="https://github.com/hiiamarthur" target="_blank" rel="noopener noreferrer">
              github.com/hiiamarthur
            </a>
          </p>
          <p>
            LinkedIn: <a href="https://www.linkedin.com/in/arthur-lau-363342208/" target="_blank" rel="noopener noreferrer">
              Arthur Lau
            </a>
          </p>
        </div>
      </section>

      {/* Navigation Section */}
      <section class={`${styles.section} ${isVisible() ? styles.slideInDelayed : ''}`}>
        <h2>Explore More</h2>
        <div class={styles.navigation}>
          <A href="/experience" class={styles.navLink}>
            <h3>Working Experience</h3>
            <p>Discover my professional journey and achievements</p>
          </A>
          <A href="/projects" class={styles.navLink}>
            <h3>Project Experience</h3>
            <p>View my portfolio of completed projects</p>
          </A>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home; 