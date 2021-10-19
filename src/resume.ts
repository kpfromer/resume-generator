import { Resume } from './types.js';

export const PHONE_NUMBER = '07534563401';
export const PROFILE_URL = 'https://www.linkedin.com/in/dolan1';
export const EMAIL = 'docx@com';

export const resume: Resume = {
  basics: {
    name: 'Kyle Pfromer',
    email: 'kpfromer2@gmail.com',
    phone: '7204020069',
    summary: `
I am a full stack developer that uses ReactJs, AngularJs for the frontend and ExpressJs and SpringIO for the backend. I also have experience in C++,
which I have used to create an assembler, compiler, and an interpreter.
`.trim(),
    profiles: [
      {
        network: 'Personal Site',
        url: 'kylepfromer.com',
      },
      {
        network: 'LinkedIn',
        username: 'kyle-pfromer',
        url: 'linkedin.com/in/kyle-pfromer',
      },
      {
        network: 'GitHub',
        username: 'kpfromer',
        url: 'github.com/kpfromer',
      },
    ],
  },
  work: [
    {
      name: 'Facebook',
      position: 'SWE Intern',
      startDate: { month: 5, year: 2021 },
      endDate: { month: 8, year: 2021 },
      summary: `
Apart of the internal Network UI team.

- Delivered an internal UI to enable network engineers to quickly view and test various network topologies.
- Worked with various technologies, such as React, Hack, Thrift, GraphQL.
`.trim(),
    },
    {
      name: 'Google',
      position: 'SWE Intern',
      startDate: { month: 5, year: 2020 },
      endDate: { month: 8, year: 2020 },
      summary: `
- Worked on integrating Google Cloud AI's Platform Optimizer Product with JupyterLab.
- Enabled users to easily tune their machine learning model hyperparameters within the JupyterLab environment.
- Worked with user experience designers, product managers, and backend engineers to deliver the first full feature user interface for the Vizier Optimizer service.
`.trim(),
    },
  ],
  education: [
    {
      institution: 'University of Colorado, Boulder',
      studyType: 'Bachelor of Science',
      startDate: { month: 8, year: 2019 },
      endDate: { month: 5, year: 2023 },
    },
  ],
  skills: [],
  projects: [],
};

export const experiences = [
  {
    isCurrent: true,
    summary: 'Full-stack developer working with Angular and Java. Working for the iShares platform',
    title: 'Associate Software Developer',
    startDate: {
      month: 11,
      year: 2017,
    },
    company: {
      name: 'BlackRock',
    },
  },
  {
    isCurrent: false,
    summary:
      'Full-stack developer working with Angular, Node and TypeScript. Working for the iShares platform. Emphasis on Dev-ops and developing the continous integration pipeline.',
    title: 'Software Developer',
    endDate: {
      month: 11,
      year: 2017,
    },
    startDate: {
      month: 10,
      year: 2016,
    },
    company: {
      name: 'Torch Markets',
    },
  },
  {
    isCurrent: false,
    summary:
      'Used ASP.NET MVC 5 to produce a diversity data collection tool for the future of British television.\n\nUsed AngularJS and C# best practices. Technologies used include JavaScript, ASP.NET MVC 5, SQL, Oracle, SASS, Bootstrap, Grunt.',
    title: 'Software Developer',
    endDate: {
      month: 10,
      year: 2016,
    },
    startDate: {
      month: 3,
      year: 2015,
    },
    company: {
      name: 'Soundmouse',
    },
  },
  {
    isCurrent: false,
    summary:
      'Develop web commerce platforms for constious high profile clients.\n\nCreated a log analysis web application with the Play Framework in Java, incorporating Test Driven Development. It asynchronously uploads and processes large (2 GB) log files, and outputs meaningful results in context with the problem. \n\nAnalysis  and  development  of  the payment system infrastructure and user accounts section to be used by several clients of the company such as Waitrose, Tally Weijl, DJ Sports, Debenhams, Ann Summers, John Lewis and others.\n\nTechnologies used include WebSphere Commerce, Java, JavaScript and JSP.',
    title: 'Java Developer',
    endDate: {
      month: 10,
      year: 2014,
    },
    startDate: {
      month: 3,
      year: 2013,
    },
    company: {
      name: 'Soundmouse',
    },
  },
];

export const education = [
  {
    degree: 'Master of Science (MSc)',
    fieldOfStudy: 'Computer Science',
    notes:
      'Exam Results: 1st Class with Distinction, Dissertation: 1st Class with Distinction\n\nRelevant Courses: Java and C# Programming, Software Engineering, Artificial Intelligence, \nComputational Photography, Algorithmics, Architecture and Hardware.\n\nCreated a Windows 8 game in JavaScript for the dissertation. \n\nCreated an award-winning 3D stereoscopic game in C# using XNA.',
    schoolName: 'University College London',
    startDate: {
      year: 2012,
    },
    endDate: {
      year: 2013,
    },
  },
  {
    degree: 'Bachelor of Engineering (BEng)',
    fieldOfStudy: 'Material Science and Engineering',
    notes:
      'Exam Results: 2:1, Dissertation: 1st Class with Distinction\n\nRelevant courses: C Programming, Mathematics and Business for Engineers.',
    schoolName: 'Imperial College London',
    startDate: {
      year: 2009,
    },
    endDate: {
      year: 2012,
    },
  },
];

export const skills = [
  {
    name: 'Angular',
  },
  {
    name: 'TypeScript',
  },
  {
    name: 'JavaScript',
  },
  {
    name: 'NodeJS',
  },
];

export const achievements = [
  {
    issuer: 'Oracle',
    name: 'Oracle Certified Expert',
  },
];
