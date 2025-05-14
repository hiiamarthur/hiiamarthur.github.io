import { Component, createSignal, onMount } from "solid-js";
import { A } from "@solidjs/router";
import styles from "./Home.module.css";
import MainLayout from "../layouts/MainLayout";
import Typewriter from "../components/typewriter";
import Tab from "../components/Tab";
import { experiences } from "../data/experiences";
import ExperienceCard from "../components/experience/ExperienceCard";
import { projects } from "../data/projects";
import { FaBrandsGithub, FaSolidEnvelope, FaSolidPhone } from "solid-icons/fa";
import YieldedIcon from "../components/yieldedIcon";
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
      <a href="#hello"></a>
      <section
        id="hello"
        class="hero min-h-screen flex items-center justify-center"
      >
        <Typewriter>
          <h1>Hi, I'm Arthur</h1>
        </Typewriter>
      </section>
      <a href="#about"></a>
      <section
        id="about"
        class="hero min-h-screen flex-col items-center justify-center relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-flow"></div>
        <div class="z-10">
          <h1>About Me</h1>
          <div class="id-card relative max-w-[600px] mx-auto my-6 p-8 bg-black/30 backdrop-blur-md rounded-lg border border-cyan-500/30 shadow-neon">
            <div class="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500 rounded-tl-lg"></div>
            <div class="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg"></div>
            <div class="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500 rounded-bl-lg"></div>
            <div class="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500 rounded-br-lg"></div>

            <div class="flex-col md:flex-row gap-8 items-end justify-center">
              <img
                src="/images/photo.png"
                alt="Arthur"
                class="w-full max-w-[300px] mx-auto rounded-lg animate-float shadow-neon"
              />

              <div class="w-full mx-auto mt-4">
                <div class="mb-2 text-cyan-500 text-sm tracking-wider">
                  ID: ART-HUR
                </div>
                <p class="text-lg leading-relaxed animate-fade-in">
                Result-driven Software Developer with 5+ years of experience 
                specializing in full stack development using C# (.NET), React, 
                Next.js, Flutter, and cloud services (AWS, Azure). Recognized 
                for delivering scalable, secure, and high-performing systems 
                across domains like vending automation, ERP, IoT, and gaming. 
                Strong in cross-functional communication, system design, and 
                architecture. Consistently seek technical craftsmanship through 
                architectural leadership, collaborative mentorship and maintainable 
                code practices.
                </p>
                <div class="mt-2 grid grid-cols-2 gap-4 text-xl">
                  <div class="stats-item">
                    <div class="text-cyan-500">Experience</div>
                    <div>5+ Years</div>
                  </div>
                  <div class="stats-item">
                    <div class="text-cyan-500">Education</div>
                    <div>Bsc. Computer Science in CUHK</div>
                  </div>
                </div>
                <div class="stats-item text-xl mt-2">
                  <div class="text-cyan-500">Certificate</div>
                  <div>AWS Solutions Architect Associate(In Progress)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <a href="#experience"></a>
      <section
        id="experience"
        class="hero min-h-screen flex-col items-start justify-start"
      >
        <h1 class="animate-fade-in-left items-start text-start">
          Working Experience
        </h1>
        <Tab
          tabs={experiences.map((experience) => ({
            id: experience.id,
            label: experience.company,
            content: <ExperienceCard experience={experience} />,
          }))}
          defaultTab="about"
        />
      </section>

      <a href="#projects"></a>
      <section id="projects" class="hero min-h-screen">
        <h1 class="animate-fade-in-left self-end text-end">Self Projects</h1>
        <div class="cards">
          {projects.map((project) => (
            <div class="card">
              {project.image && (
                <div class="card-image-container flex items-center justify-center h-96">
                  <img
                    src={project.image}
                    alt={`${project.name} preview`}
                    class="card-image max-h-96 object-contain w-full"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/default-project-image.png";
                    }}
                  />
                </div>
              )}
              <div class="card-content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.technologies && (
                  <div class="inline-flex flex-wrap gap-2">
                    {project.technologies.map((technology, index) => (
                      <span
                        class="animate-fade-in-up"
                        style={{
                          "animation-delay": `${index * 0.1 + 1.2}s`,
                        }}
                      >
                        <YieldedIcon keyword={technology}>
                          {technology}
                        </YieldedIcon>
                      </span>
                    ))}
                  </div>
                )}
                <div class="flex items-center gap-2 justify-center">
                  {project.link !== "Coming Soon" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try it out
                    </a>
                  ) : <></>}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaBrandsGithub size={21} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <a href="#contact"></a>
      <section
        id="contact"
        class="hero min-h-screen flex-col items-center justify-center relative overflow-hidden"
      >
        <div class="z-10 w-full max-w-4xl mx-auto">
          <h1 class=" mb-12">Contact</h1>

          <div class="flex-col flex gap-10 p-4">
            <div
              class="contact-card group cursor-pointer"
              onClick={() => handlePhoneClick("4379337316")}
            >
              <div class="card-content">
                <div class="icon-wrapper"></div>
                <div class="contact-info">
                  <a
                    onClick={() => handlePhoneClick("4379337316")}
                    target="_blank"
                    class={
                      /Android|webOS|iPhone|iPad|iPod/i.test(
                        navigator.userAgent
                      )
                        ? styles.link + "card-content"
                        : " hidden" + ""
                    }
                  >
                    <FaSolidPhone size={21} />
                  </a>
                </div>
              </div>
            </div>

            <div
              class="contact-card group"
              onClick={() => handleEmailClick("pingtunglau@gmail.com")}
            >
              <a
                target="_blank"
                onClick={() => handleEmailClick("pingtunglau@gmail.com")}
                class={styles.link + "card-content cursor-pointer"}
              >
                <div class="icon-wrapper">
                  <FaSolidEnvelope size={21} />
                </div>
              </a>
            </div>

            <div class="contact-card group">
              <a
                href="https://github.com/hiiamarthur"
                target="_blank"
                rel="noopener noreferrer"
                class="card-content"
              >
                <div class="icon-wrapper">
                  <FaBrandsGithub size={21} />
                </div>
              </a>
            </div>

            <div class="contact-card group">
              <a
                href="https://www.linkedin.com/in/arthur-lau-363342208/"
                target="_blank"
                rel="noopener noreferrer"
                class="card-content"
              >
                <div class="icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
