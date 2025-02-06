import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'IVM Technology Limited',
    position: 'Senior Software Developer -> Analyst Programmer',
    duration: 'Aug. 2023 - Dec. 2024',
    description: [
      'Developed CMS and Vending POS UI on vending machine using NestJS, Embedded JS (EJS) with HTML, CSS, and jQuery.',
      'Implemented project architectural design, infrastructure, and production development for weight-oriented vending machine with MSSQL as database, Next.js as web server with HTTPS API, Flutter as client interface with Java + Kotlin connecting signal hardware with Android, and Socket.IO for intra-communication.',
      'Created API linkage with machine and payment gateway using C#.',
      'Managed AWS services including EC2, S3, CloudFront, Watch, Lambda, and CloudFlare.',
      'Implemented DevOps with automated CI/CD using GitHub Actions.',
      'Implemented customization on Android OS at motherboard level.',
      'Developed project architectural design and infrastructure for revamped ERP system using Redis as real-time DB, SQLite as local DB, MSSQL as server DB, EJS as frontend, C# as backend with HTTPS API, and MQTT for intra-communication.'
    ],
    technologies: ['NestJS', 'EJS', 'HTML', 'CSS', 'jQuery', 'Next.js', 'Flutter', 'Java', 'Kotlin', 'Socket.IO', 'C#', 'MSSQL', 'AWS', 'GitHub Actions', 'Redis', 'SQLite', 'MQTT']
  },
  {
    id: '2',
    company: 'Makeitfun Limited',
    position: 'Software Developer',
    duration: 'Jul. 2022 - Aug. 2023',
    description: [
      'Implemented multiple UI/UX frontend logic on client admin portal and promotion website using React, Next.js, and Flutter.',
      'Developed backend API and system design using Express with Strapi framework, linked to MongoDB and PostgreSQL.',
      'Implemented CI/CD with Docker and Kubernetes on GitLab.',
      'Applied proof of concept (PoC) on self-hosting a Metaverse Server (Mozilla Hubs) using React as frontend and Erlang, Elixir as backend.',
      'Developed game logic using image tracking on AR foundation, face + gesture recognition on Unity with C# scripts, and PlayCanvas with WebGL JS scripts.'
    ],
    technologies: ['React', 'Next.js', 'Flutter', 'Express', 'Strapi', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitLab', 'Erlang', 'Elixir', 'Unity', 'C#', 'WebGL', 'PlayCanvas']
  },
  {
    id: '3',
    company: 'Flexsystem Limited',
    position: 'Programmer',
    duration: 'Jul. 2021 - Jul. 2022',
    description: [
      'Developed tailored ERP system UI/UX (Sales, Inventory, Procurement) for enterprises using React and C# endpoints linked to ISAM DB.',
      'Revamped UI of an HR system using React.',
      'Implemented RPA scripts using Jest, Selenium, and Playwright.'
    ],
    technologies: ['React', 'C#', 'ISAM DB', 'Jest', 'Selenium', 'Playwright']
  },
  {
    id: '4',
    company: 'Excohk Limited',
    position: 'Full Stack Developer',
    duration: 'Dec. 2020 - Jul. 2021',
    description: [
      'Developed OAuth2 and Booking module for an exhibition mobile app using React Native, Expo as frontend, and Java EE as backend.',
      'Implemented Temporal Storage Point using DynamoDB and Firebase.'
    ],
    technologies: ['React Native', 'Expo', 'Java EE', 'DynamoDB', 'Firebase']
  },
  {
    id: '5',
    company: 'East Technology Limited',
    position: 'Full Stack Developer (Internship)',
    duration: 'Jun. 2020 - Sep. 2020',
    description: [
      'Implemented UX on SPA website using PHP, jQuery, and JavaScript.',
      'Developed CMS using PHP, Apache, and phpMyAdmin.'
    ],
    technologies: ['PHP', 'jQuery', 'JavaScript', 'Apache', 'phpMyAdmin']
  },
  {
    id: '6',
    company: 'Youyu Finance Technology Limited',
    position: 'Backend Developer (Internship)',
    duration: 'Jun. 2019 - Aug. 2019',
    description: [
      'Debugged and unit-tested Flask Server API of Youyu Smart Trade App using Python scripts towards MySQL.'
    ],
    technologies: ['Flask', 'Python', 'MySQL']
  }
];



