import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    id: "1",
    company: "IVM Technology Limited",
    position: "Senior Software Developer -> Analyst Programmer",
    duration: "Aug. 2023 - Jan. 2025",
    description: [
      "Developed CMS and Vending POS UI on vending machine using NestJS, Embedded JS (EJS) with HTML, CSS, and jQuery.",
      "Implemented project architectural design, infrastructure, and production development for weight-oriented vending machine with MSSQL as database, Next.js as web server with HTTPS API, Flutter as client interface with Java + Kotlin connecting signal hardware with Android, and Socket.IO for intra-communication.",
      "Created API linkage with machine and payment gateway using C#.",
      "Managed AWS services including EC2, S3, CloudFront, Watch, Lambda, and CloudFlare.",
      "Implemented DevOps with automated CI/CD using GitHub Actions.",
      "Implemented customization on Android OS at motherboard level.",
      "Developed project architectural design and infrastructure for revamped ERP system using Redis as real-time DB, SQLite as local DB, MSSQL as server DB, EJS as frontend, C# as backend with HTTPS API, and MQTT for intra-communication.",
    ],
    technologies: [
      "NestJS",
      "EJS",
      "HTML",
      "CSS",
      "jQuery",
      "Next.js",
      "Flutter",
      "Java",
      "Kotlin",
      "Socket.IO",
      "C#",
      "MSSQL",
      "AWS",
      "GitHub Actions",
      "Redis",
      "SQLite",
      "MQTT",
    ],
    projects: [
      {
        id: "1",
        title: "Weighted Sensor Vending System",
        description: [
          "Spearheaded Hong Kong’s first <strong>non-mechanical vending machine</strong> (smart fridge), enabling <strong>Octopus payments</strong>, <strong>credit card transactions</strong>, and <strong>loyalty redemptions</strong>, increasing customer adoption by <strong>30% in 3 months</strong>.",
          "Led a <strong>3-person team</strong> in architecting a <strong>scalable vending system</strong>, integrating <strong>weight sensors</strong> for accurate inventory tracking with <strong>95%+ accuracy</strong>. Coded an <strong>admin portal</strong> for <strong>0s latency</strong> control and monitoring.",
          "Used <strong>Next.js</strong> as a web server framework in <strong>TypeScript</strong> that exposes <strong>HTTPS APIs</strong> for third-party integrations, leveraged <strong>TypeORM</strong> package <strong>Prisma</strong> to manage an <strong>MSSQL datastore</strong>, bridged integration below with a <strong>Flutter</strong> client app, and implemented connection via <strong>Socket.IO</strong>.",
        ],
      },
      {
        id: "2",
        title: "Payment Gateway and Android OS Integration",
        description: [
          "Integrated Octopus Hardware POS and SoePay machines into Android OS, implementing app lifecycle management and security measures to prevent spam clicking/false triggering by 80%, using Java and Kotlin.",
        ],
      },
      {
        id: "3",
        title: "Old Vending POS UI & CMS",
        description: [
          "Developed admin portal with 10k+ users, managing machines generating $1M+ monthly revenue, using NestJS",
          "Coded UI for Product Selection and Ads in embedded js(ejs) with HTML and CSS, jQuery.",
        ],
      },
      {
        id: "4",
        title: "Cloud & DevOps Management",
        description: [
          "Managed and monitored AWS EC2 instances with CloudWatch, implemented S3 with CloudFront caching, reducing network costs by 60%. Configured Auto Scaling and AWS Backup for high availability.",
          "Automated CI/CD deployments using GitHub Actions, running on WSL (Windows Subsystem for Linux), to deploy code to AWS EC2 via merge requests.",
        ],
      },
      {
        id: "5",
        title: "Project Management",
        description: [
          "Translated business requirements into technical specifications, integrating with 10+ external partners in the smart fridge project and 20+ APIs for the old POS UI. Managed project timelines, estimated man-hours, and ensured quality assurance through merge request approvals.",
        ],
      },
      {
        id: "6",
        title: "ERP System Revamp",
        description: [
          "Led a 2-person team in architecting a microservices-based ERP system, reducing system latency by 50% and improving API response times by 40%. Automated procurement and stock workflows, cutting manual processing time by 60%.",
          "Used C# as centralized server instance, local server instance, MSSQL data store and interface to hardware communication, was migrating to AngularJS as Frontend due to scalability and MQTT for instant communication.",
        ],
      },
    ],
  },
  {
    id: "2",
    company: "Makeitfun Limited",
    position: "Software Developer",
    duration: "Jul. 2022 - Aug. 2023",
    description: [
      "Implemented multiple UI/UX frontend logic on client admin portal and promotion website using React, Next.js, and Flutter.",
      "Developed backend API and system design using Express with Strapi framework, linked to MongoDB and PostgreSQL.",
      "Implemented CI/CD with Docker and Kubernetes on GitLab.",
      "Applied proof of concept (PoC) on self-hosting a Metaverse Server (Mozilla Hubs) using React as frontend and Erlang, Elixir as backend.",
      "Developed game logic using image tracking on AR foundation, face + gesture recognition on Unity with C# scripts, and PlayCanvas with WebGL JS scripts.",
    ],
    technologies: [
      "React",
      "Next.js",
      "Flutter",
      "Express",
      "Strapi",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "GitLab",
      "Erlang",
      "Elixir",
      "Unity",
      "C#",
      "WebGL",
      "PlayCanvas",
    ],
    projects: [
      {
        id: "1",
        title: "Metaverse Platform Integration",
        description: [
          "Executed a POC and demo using the Mozilla Hubs Metaverse Server for virtual concerts and exhibitions.",
          "Featured hubs as web-based 3D Game Panel, reticulum as database store and centralized server, spoke as custom 3D asset and scene creation tools, dialog as communication gateway.",
        ],
      },
      {
        id: "2",
        title: "Client Admin portal, Promotion Website",
        description: [
          "Developed UIUX,data fetching and session storage on Nextjs/React featuring SEO and tracking usage using Google Analytic for short term events and enterprise.",
        ],
      },
      {
        id: "3",
        title: "Backend API Gateway",
        description: [
          "Designed on Strapi Framework for various projects using Express, MongoDB and Postgres.",
        ],
      },
      {
        id: "4",
        title: "Flappy Bird & Snowing Driving",
        description: [
          "Developed game logic using image tracking on AR foundation, face + gesture recognition on Unity with C# scripts, and PlayCanvas with WebGL JS scripts.",
        ],
      },

      {
        id: "5",
        title: "Image and Gesture Recognition App",
        description: [
          "Programmed an AR app with image and gesture recognition using MediaPipe and Vuforia (area scanning) in Unity, designed for roleplay and costume customization.",
        ],
      },
    ],
  },
  {
    id: "3",
    company: "Flexsystem Limited",
    position: "Programmer",
    duration: "Jul. 2021 - Jul. 2022",
    description: [
      "Developed tailored ERP system UI/UX (Sales, Inventory, Procurement) for enterprises using React and C# endpoints linked to ISAM DB.",
      "Revamped UI of an HR system using React.",
      "Implemented RPA scripts using Jest, Selenium, and Playwright.",
    ],
    technologies: ["React", "C#", "ISAM", "Jest", "Selenium", "Playwright"],
    projects: [
      {
        id: "1",
        title: "Custom ERP System",
        description: [
          "Tailor-made ERP sales, inventory, and procurement system for company sized 1k+ using React, C#, and ISAM.",
        ],
      },
      {
        id: "2",
        title: "HR System UI/UX",
        description: ["Revamped UI of an HR system using React."],
      },
      {
        id: "3",
        title: "RPA Scripts",
        description: [
          "Implemented RPA scripts using Jest, Selenium, and Playwright.",
        ],
      },
    ],
  },
  {
    id: "4",
    company: "Excohk Limited",
    position: "Full Stack Developer",
    duration: "Dec. 2020 - Jul. 2021",
    description: [
      "Developed OAuth2 and Booking module for an exhibition mobile app using React Native, Expo as frontend, and Java EE as backend.",
      "Implemented Temporal Storage Point using DynamoDB and Firebase.",
    ],
    technologies: ["React Native", "Expo", "Java EE", "DynamoDB", "Firebase"],
    projects: [
      {
        id: "1",
        title: "Event Booking & Viewing App",
        description: [
          "Developed OAuth2 and Booking module for an exhibition mobile app using React Native, Expo as frontend, and Java EE as backend.",
          "Implemented Temporal Storage Point using DynamoDB and Firebase.",
        ],
      },
    ],
  },

  {
    id: "5",
    company: "East Technology Limited",
    position: "Full Stack Developer (Internship)",
    duration: "Jun. 2020 - Sep. 2020",
    description: [
      "Implemented UX on SPA website using PHP, jQuery, and JavaScript.",
      "Developed CMS using PHP, Apache, and phpMyAdmin.",
    ],
    technologies: ["PHP", "jQuery", "JavaScript", "Apache", "phpMyAdmin"],
    projects: [
      {
        id: "1",
        title: "Business Websites",
        description: [
          "Implemented UX on SPA website using PHP, jQuery, and JavaScript.",
        ],
      },
      {
        id: "2",
        title: "Custom Management System",
        description: ["Developed CMS using PHP, Apache, and phpMyAdmin."],
      },
    ],
  },
  {
    id: "6",
    company: "Youyu Finance Technology Limited",
    position: "Backend Developer (Internship)",
    duration: "Jun. 2019 - Aug. 2019",
    description: [
      "Debugged and unit-tested Flask Server API of Youyu Smart Trade App using Python scripts towards MySQL.",
    ],
    technologies: ["Flask", "Python", "MySQL"],
    projects: [
      {
        id: "1",
        title: "Flask Server API",
        description: [
          "Debugged and unit-tested Flask Server API of Youyu Smart Trade App using Python scripts towards MySQL.",
        ],
      },
    ],
  },
];
