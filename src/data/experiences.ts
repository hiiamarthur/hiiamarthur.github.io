import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    id: "1",
    company: "IVM Technology Limited",
    companyIntroduction:
      "A Fastest-growing vending machine company currently 2nd in domestic market serving 2K+ users and 500K+ customers",
    position: "Senior Software Egineer",
    duration: "Aug. 2023 - Jul. 2025",
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
      ".Net",
      "sqlServer",
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
          "Spearheaded the development of the first <strong>non-mechanical vending machine</strong> (smart fridge), featuring <strong>offline payments</strong>, <strong>credit card transactions</strong>, and <strong>loyalty redemptions</strong>.",
          "Led a team in designing a <strong>scalable vending system</strong>, integrating weight sensors with RS-232 signals to facilitate a <strong>fast, secure self-pickup and checkout experience</strong>. Developed an admin portal for <strong>real-time monitoring and control</strong>.",
          "Used <strong>Next.js</strong> as a web server framework in <strong>TypeScript</strong> that exposes <strong>HTTPS APIs</strong> for third-party integrations, leveraged <strong>TypeORM</strong> package <strong>Prisma</strong> to manage an <strong>MSSQL datastore</strong>, established a <strong>Socket.IO</strong> connection between the <strong>Flutter</strong> client app and the backend system",
        ],
      },
      {
        id: "2",
        title: "Payment Gateway and Android OS Integration",
        description: [
          "Pioneered the first integration of Octopus, a payment system with a <strong>98% domestic market share</strong>, into <strong>Android OS</strong>-achieving a competitive edge.",
          "Implemented custom app lifecycle management and security measures in <strong>Java</strong> and <strong>Kotlin</strong> that monitor background app activity to prevent spam clicking and false triggering by 80% from user's feedback.",
        ],
      },
      {
        id: "3",
        title: "Old Vending POS UI & CMS",
        description: [
          "Developed admin portal with 10k+ users, managing machines generating $1M+ monthly revenue, featuring product management, machine management, and user management using <strong>NestJS</strong> and <strong>MSSQL</strong>.",
          "Coded UI for Product Selection, Payment, and Advertisment Module in <strong>embedded js(ejs)</strong> with <strong>HTML</strong> and <strong>CSS</strong>, <strong>jQuery</strong>.",
        ],
      },
      {
        id: "4",
        title: "Cloud & DevOps Management",
        description: [
          "Managed and monitored <strong>AWS EC2 instances</strong>, configuring <strong>CloudWatch</strong>, inbound/outbound rules, and <strong>Nginx</strong> for hosting internal services.",
          "Implemented <strong>S3</strong> with <strong>CloudFront</strong> caching, optimizing content delivery and reducing network costs by 60%.",
          "Configured <strong>Auto Scaling</strong> and <strong>AWS Backup</strong> to enhance high availability and disaster recovery.",
          "Automated <strong>CI/CD</strong> deployments using <strong>GitHub Actions</strong>, running on <strong>Windows Subsystem for Linux (WSL)</strong>, to seamlessly deploy code to <strong>AWS EC2</strong> via merge requests.",
        ],
      
      },
      {
        id: "5",
        title: "Project Management",
        description: [
          "Collaborated across <strong>design and operations teams</strong> with 10+ smart fridge partners, translating business requirements into technical specifications to align technical solutions with business needs, ensuring seamless interoperability ",
          "Managed project timelines, estimated man-hours, and maintained quality assurance by overseeing merge request approvals and enforcing best development practices.",
        ],
        
      },
      {
        id: "6",
        title: "ERP System Revamp",
        description: [
          "Led a 2-person team in modernizing an outdated <strong>ERP system</strong> by revamping on sales, procurement, and inventory management modules.",
          // "Led a team in modernizing an outdated ERP system by implementing <strong>microservices architecture</strong>, reducing system latency by 50% and improving API response times by 40%. Automated procurement and stock workflows, cutting manual processing time by 60%.",
          "Modified <strong>.Net</strong> server to <strong>microservices architecture</strong> with <strong>MSSQL</strong> database for scalable and modular development, Transitioned from <strong>EJS</strong> to <strong>AngularJS</strong>, enhancing scalability and modular development. Migrated from HTTPS polling to <strong>MQTT</strong>, enabling instant updates and reducing server load",
          "Managed using Azure DevOps hosted on <strong>Azure VM</strong> with <strong>CI/CD</strong> pipeline using <strong>Nuget</strong>.",
        ],
      },
    ],
  },
  {
    id: "2",
    company: "Makeitfun Limited",
    position: "Software Engineer",
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
      "dotnet",
      "WebGL",
      "PlayCanvas",
    ],
    projects: [
      {
        id: "1",
        title: "Metaverse Platform Integration",
        description: [
          "Required for virtual concerts, a POC was executed on <strong>Mozilla Hubs</strong>, adding features in an <strong>open-source metaverse platform</strong> with a voting system",
          // "Executed a POC and demo using the Mozilla Hubs Metaverse Server for virtual concerts and exhibitions.",
          "Featured <strong>Hubs</strong> by <strong>React</strong> as web-based 3D Game Panel, <strong>Reticulum</strong> by <strong>Elixir</strong> and <strong>Erlang</strong> connecting <strong>PostgreSQL</strong> as database store and centralized server, <strong>Spoke</strong> by <strong>Express</strong> as custom 3D asset and scene creation tools, <strong>Dialog</strong> by <strong>Express</strong> with <strong>WebRTC</strong> as communication gateway between this services.",
          "Evaluated <strong>feasibility</strong> by assessing <strong>technical complexity</strong>, <strong>cost-benefit relation</strong> is unsustainable, thus recommended halting the project",
          // "Halting the project due to the high cost of <strong>hosting</strong> and <strong>development</strong> of the custom server."
        ],
      },  
      {
        id: "2",  
        title: "Client Admin Portal, Marketing and Event Website",
        description: [
          "Developed from figma UIUX design,containing <strong>data fetching</strong>, <strong>OAuth2</strong>, <strong>RPC</strong>, <strong>session storage</strong> on <strong>Next/React</strong> featuring <strong>SEO</strong> and tracking usage using <strong>Google Analytic</strong> for short term events and enterprise.",
        ],
      },
      {
        id: "3",
        title: "Backend API Gateway",
        description: [
          "Designed Schemas and logic flow on <strong>Strapi Framework</strong> for 10+ projects using <strong>Express</strong>, <strong>MongoDB</strong> and <strong>Postgres</strong> and <strong>Docker</strong> for containerization, <strong>Kubernetes</strong> for orchestration.",
        ],
      },
      // {
      //   id: "4",
      //   title: "Flappy Bird & Snowing Driving",
      //   description: [
      //     "Developed game logic using image tracking on AR foundation, face + gesture recognition on Unity with C# scripts, and PlayCanvas with WebGL JS scripts.",
      //   ],
      // },

      {
        id: "5",
        title: "Disney-affiliated Studio Interactive App",
        description: [
          "Programmed an AR app with image and gesture recognition featuring AR animation according to user's pose using <strong>MediaPipe</strong> and <strong>Vuforia</strong> (area scanning) in <strong>Unity</strong>.",
        ],
      },
    ],
  },
  {
    id: "3",
    company: "Flexsystem Limited",
    position: "Software Engineer",
    duration: "Jul. 2021 - Jul. 2022",
    description: [
      "Developed tailored ERP system UI/UX (Sales, Inventory, Procurement) for enterprises using React and C# endpoints linked to ISAM DB.",
      "Revamped UI of an HR system using React.",
      "Implemented RPA scripts using Jest, Selenium, and Playwright.",
    ],
    technologies: ["React", "C#", ".NET", "ISAM", "Jest", "Selenium", "Playwright"],
    projects: [
      {
        id: "1",
        title: "Custom ERP System",
        description: [
          "Developed a custom <strong>ERP system</strong> for sales, inventory, and procurement management, serving 2M+ users across multiple business units",
          "Built the frontend using <strong>React</strong>, enhancing user experience with dynamic <strong>dashboards</strong>, <strong>RPAC</strong>, <strong>listing</strong>, <strong>form</strong> and <strong>admin management</strong>",
          "Developed backend APIs using <strong>.NET</strong>, integrating with <strong>ISAM(Indexed Storage Access Method)</strong> DB for fast file-based data storage",
          // "Tailor-made ERP sales, inventory, and procurement system for company sized 1k+ using React, C#, and ISAM.",
        ],
      },
      {
        id: "2",
        title: "HR System UI/UX",
        description: ["Revamped UI of an HR system using <strong>React</strong> and <strong>Bootstrap</strong>."],
      },
      {
        id: "3",
        title: "RPA Scripts",
        description: [
          "Implemented RPA scripts using <strong>Jest</strong>, <strong>Selenium</strong>, and <strong>Playwright</strong>.",
        ],
      },
    ],
  },
  {
    id: "4",
    company: "Excohk Limited",
    position: "Full Stack Engineer",
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
          "Developed <strong>OAuth2</strong> and <strong>Booking module</strong> for an exhibition mobile app using <strong>React Native</strong>, <strong>Expo</strong> as frontend, and <strong>Java EE</strong> as backend.",
          "Enabled <strong>Personalized</strong> event experiences on 50+ large-scale cultural events.",
          "Implemented <strong>Temporal Storage Point</strong> using <strong>DynamoDB</strong> and <strong>Firebase</strong>.",
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
          "Implemented <strong>UX</strong> on <strong>SPA</strong> website using <strong>PHP</strong>, <strong>jQuery</strong>, and <strong>JavaScript</strong> across 20+ business and educational domains.",
        ],
      },
      {
        id: "2",
        title: "Custom Management System",
        description: ["Developed <strong>CMS</strong> using <strong>PHP</strong>, <strong>Apache</strong>, and <strong>phpMyAdmin</strong>,enabling customzied page updates for non-technical users."],
      },
    ],
  },
  {
    id: "6",
    company: "Youyu Finance Technology Limited",
    position: "Backend Developer (Internship)",
    duration: "Jun. 2019 - Aug. 2019",
    description: [
      "Debugged and unit-tested <strong>Flask Server API</strong> of Youyu Smart Trade App using <strong>Python</strong> scripts towards <strong>MySQL</strong>.",
    ],
    technologies: ["Flask", "Python", "MySQL"],
    projects: [
      {
        id: "1",
        title: "Flask Server API",
        description: [
          "Debugged and unit-tested <strong>Flask Server API</strong> of Youyu Smart Trade App using <strong>Python</strong> scripts towards <strong>MySQL</strong>.",
        ],
      },
    ],
  },
];
