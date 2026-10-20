/* Single source of truth for all site content. Every fact comes from Manish_Gupta.docx. */

import { asset } from "./asset";

export const PROFILE = {
  name: "Manish Gupta",
  firstName: "Manish",
  initials: "MG",
  role: "Consultant Software Engineer",
  heroTitle: "Site Reliability Engineer",
  dept: "SRE & Automation",
  company: "Societe Generale",
  since: "Jul 2026",
  location: "Bengaluru, Karnataka",
  email: "manish.max.gupta@gmail.com",
  phone: "+91 860-569-8837",
  phoneHref: "tel:+918605698837",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  resume: asset("/cv.pdf"),
  resumeSummary:
    "Consultant Software Engineer and Certified Site Reliability Engineer with 10+ years of comprehensive experience delivering high-resilience SRE, observability, and cutting-edge Agentic AI solutions. Architect of autonomous ServiceNow AI agents for major incident management (automated 5-Why root-cause analysis & executive summaries) and digital change review governance across leading institutions including Societe Generale, Wells Fargo, and UBS.",
} as const;

export type SectionId = "about" | "skills" | "work" | "certifications" | "experience" | "achievements" | "contact";

/** Section tag numbers follow rendered order. Use as `${index} — ${label}`. */
export const SECTIONS: Record<SectionId, { index: string; label: string }> = {
  about: { index: "01", label: "About me" },
  skills: { index: "02", label: "Skills" },
  work: { index: "03", label: "Selected work" },
  certifications: { index: "04", label: "Certifications" },
  experience: { index: "05", label: "Experience" },
  achievements: { index: "06", label: "Honours & metrics" },
  contact: { index: "07", label: "Contact" },
};

export interface NavItem {
  id: SectionId;
  label: string;
  index: string;
}
export const NAV: NavItem[] = (["about", "skills", "work", "experience", "certifications", "achievements", "contact"] as const).map((id) => ({
  id,
  index: SECTIONS[id].index,
  label: id === "work" ? "Work" : id[0].toUpperCase() + id.slice(1),
}));

/* ---------- Skills ---------- */
export type SkillFamily = "Languages" | "Tools" | "Databases" | "Observability" | "Platforms";

export interface Skill {
  /** Logo key for <TechLogo name=... /> (brand file in /public/logos or a concept icon). */
  logo: string;
  name: string;
  family: SkillFamily;
  /** Unique 2-letter element symbol. */
  symbol: string;
  /** Atomic number: 1-based position in the whole table. */
  number: number;
  /** Where the CV says it was used. Absent when the CV doesn't say. */
  usedIn?: string[];
}
export interface SkillGroup {
  family: SkillFamily;
  skills: Skill[];
}

type RawSkill = Omit<Skill, "number" | "family">;

const RAW: Record<SkillFamily, RawSkill[]> = {
  Platforms: [
    { logo: "azure", name: "Azure", symbol: "Az", usedIn: ["Microsoft Certified: Azure Administrator Associate", "Microsoft Certified: Azure DevOps Engineer Expert", "Microsoft Certified: Azure Fundamental"] },
    { logo: "linux", name: "Unix / Linux", symbol: "Li", usedIn: ["Expertise in Unix - Excellent", "Societe Generale, Wells Fargo, UBS, Infosys Limited"] },
    { logo: "kubernetes", name: "Kubernetes", symbol: "Ku", usedIn: ["UBS - Agile automation projects with Docker, Kubernetes"] },
    { logo: "docker", name: "Docker", symbol: "Do", usedIn: ["UBS - Agile automation projects with Docker"] },
    { logo: "aws", name: "Cloud Technologies", symbol: "Ct", usedIn: ["Google Cloud Associate Engineer", "Wells Fargo - cloud migration planning"] },
  ],
  Tools: [
    { logo: "python", name: "Agentic AI", symbol: "Ai", usedIn: ["Wells Fargo - Major Incident Management & Change Review Autonomous AI Agents"] },
    { logo: "azure-devops", name: "Azure DevOps", symbol: "Ad", usedIn: ["UBS - automation projects with Azure DevOps"] },
    { logo: "jenkins", name: "CI/CD Pipelines", symbol: "Ci", usedIn: ["Wells Fargo - CI/CD automation", "Infosys - continuous integration software"] },
    { logo: "jira", name: "ServiceNow / JIRA", symbol: "Sn", usedIn: ["Wells Fargo - ServiceNow Agentic AI integration", "UBS - Agile methodology with JIRA"] },
    { logo: "confluence", name: "MQ / EMS", symbol: "Me", usedIn: ["UBS - MQ, EMS in automation projects"] },
    { logo: "ansible", name: "Config Management", symbol: "Cm", usedIn: ["Configuration Management - Excellent", "Infosys - installed, configured, ongoing config management"] },
    { logo: "github", name: "GitLab / Git", symbol: "Gt", usedIn: ["UBS - GitLab, Git in Agile projects"] },
  ],
  Observability: [
    { logo: "kibana", name: "Kibana", symbol: "Ki", usedIn: ["Wells Fargo - reports and alerts using Kibana"] },
    { logo: "grafana", name: "Splunk", symbol: "Sp", usedIn: ["Splunk User Certification 2018", "Splunk Power User Certification 2018", "Wells Fargo - creating alerts using Splunk"] },
    { logo: "dynatrace", name: "AppDynamics", symbol: "Ap", usedIn: ["Wells Fargo - reports and alerts using AppDynamics"] },
    { logo: "prometheus", name: "Elastic Search", symbol: "Es", usedIn: ["UBS - onboarded applications using Kafka and Elastic Search"] },
  ],
  Languages: [
    { logo: "python", name: "Python", symbol: "Py", usedIn: ["Expertise in Python - Good", "UBS - Python scripting", "Wells Fargo - Agentic AI"] },
    { logo: "powershell", name: "PowerShell", symbol: "Ps", usedIn: ["UBS - scripting through bash and PowerShell"] },
    { logo: "bash", name: "Bash Scripting", symbol: "Ba", usedIn: ["UBS - scripting through bash"] },
    { logo: "sql", name: "Automation & SRE", symbol: "Au", usedIn: ["Societe Generale - SRE automation", "UBS - resolved 47% of tickets by Automation"] },
  ],
  Databases: [
    { logo: "mysql", name: "MySQL / Data", symbol: "My", usedIn: ["Data analysis - Very Good"] },
    { logo: "mongodb", name: "Kafka", symbol: "Ka", usedIn: ["UBS - onboarded real-time applications using Kafka"] },
    { logo: "postgresql", name: "Robotics (RPA)", symbol: "Rp", usedIn: ["AA Certified Advanced RPA Professional 2019", "Robotics - Good"] },
  ],
};

export const SKILL_FAMILIES = Object.keys(RAW) as SkillFamily[];

let atomic = 0;
export const SKILL_GROUPS: SkillGroup[] = SKILL_FAMILIES.map((family) => ({
  family,
  skills: RAW[family].map((s) => ({ ...s, family, number: ++atomic })),
}));
export const SKILLS: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);

/* ---------- Experience & education ---------- */
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}
export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "socgen",
    role: "Consultant Software Engineer",
    company: "Societe Generale",
    period: "Jul 2026 - Present",
    bullets: [
      "Driving enterprise Site Reliability Engineering (SRE) and intelligent automation strategies across critical banking and financial platforms.",
      "Architecting self-healing infrastructure, resilience engineering patterns, and end-to-end observability frameworks to ensure high availability.",
      "Leading cloud reliability transformations, automated deployment pipelines, and next-generation incident management operations.",
    ],
  },
  {
    id: "wellsfargo",
    role: "Senior Software Engineer (AVP)",
    company: "Wells Fargo",
    period: "Feb 2021 - Jun 2026",
    bullets: [
      "Architected and deployed an autonomous Agentic AI Major Incident Management agent integrated with ServiceNow: automatically ingests incident telemetry, creates real-time executive summaries, formulates 5-Why root cause trees, and matches historical incident patterns to recommend probable causes.",
      "Built an Agentic AI Digital Change Review solution that proactively audits changes across digital technology, checks ServiceNow change records for critical deployment specifications, and notifies reviewers/engineers of missing prerequisites.",
      "Created centralized tribe-level monitoring and alerting architectures, integrating events across distributed services with AppDynamics, Splunk, and Kibana.",
      "Demonstrated advanced knowledge of software delivery life cycle with Agile and varied delivery methodology with CI/CD automation.",
      "Completed Google Cloud Associate Engineer certification to spearhead cloud migration planning and readiness.",
      "Collaborated closely with upper management to drive reliability standards and automated incident post-mortem workflows.",
    ],
  },
  {
    id: "ubs",
    role: "Authorized Officer",
    company: "UBS",
    period: "Oct 2019 - Feb 2021",
    bullets: [
      "Collaborated with developers, analysts and project managers to expedite incident resolutions.",
      "Performed software application and disaster recovery testing to guarantee business readiness following fail-overs.",
      "Worked on different automation projects with Agile methodology, tools and technology like Azure DevOps, Docker, Kubernetes, GitLab, Git, JIRA, MQ, EMS etc.",
      "Maintained, debugged and optimized automation programs to resolve 47% of tickets by Automation.",
      "Good knowledge of programming language Python and scripting through bash and PowerShell.",
      "Analyzed and troubleshot integration issues related to system configuration, data, maps and workflows.",
      "Collaborated with developers and cloud engineers to onboard new real-time based application using Kafka and Elastic Search.",
    ],
  },
  {
    id: "infosys",
    role: "Technology Analyst",
    company: "Infosys Limited",
    period: "Oct 2013 - Oct 2019",
    bullets: [
      "Ran diagnostics and conducted maintenance for software, resulting in improved operations efficiency.",
      "Collaborated with Development and QA teams to successfully complete 100+ application releases.",
      "Managed new feature integration into current build with continuous integration software.",
      "Analyzed incident trends, developing call-to-action plans to improve IT service effectiveness and created scripts to resolve incidents quickly.",
      "Installed, configured and provided ongoing configuration management for a number of custom applications.",
      "Coordinated with Development and QA teams to ensure final production release meets requirements, helped development team resolve code conflicts and ensured support team was well aware of new changes.",
    ],
  },
];

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  place?: string;
  period?: string;
  /** Currently pursuing (no end date). */
  pursuing?: boolean;
}
export const EDUCATION: EducationItem[] = [
  { id: "jss", school: "JSS Academy of Technical Education", degree: "Bachelor of Technology: Computer Science", place: "Noida", period: "Jun 2013" },
];

/** Education + work merged into one path, oldest first. Experience section renders this. */
export interface TimelineItem {
  id: string;
  kind: "education" | "work";
  org: string;
  title: string;
  place?: string;
  period: string;
  pursuing?: boolean;
  bullets?: string[];
}
const edu = (id: string): EducationItem => EDUCATION.find((e) => e.id === id)!;
const job = (id: string): ExperienceItem => EXPERIENCE.find((e) => e.id === id)!;
const fromEdu = (e: EducationItem): TimelineItem => ({
  id: e.id,
  kind: "education",
  org: e.school,
  title: e.degree,
  place: e.place,
  period: e.pursuing ? "Currently pursuing" : (e.period ?? ""),
  pursuing: e.pursuing,
});
const fromJob = (e: ExperienceItem): TimelineItem => ({
  id: e.id,
  kind: "work",
  org: e.company,
  title: e.role,
  period: e.period,
  bullets: e.bullets,
});
export const TIMELINE: TimelineItem[] = [
  fromEdu(edu("jss")),
  fromJob(job("infosys")),
  fromJob(job("ubs")),
  fromJob(job("wellsfargo")),
  fromJob(job("socgen")),
];

/* ---------- Projects ---------- */
export interface ProjectTech {
  name: string;
  /** Logo key, only when a logo exists. */
  logo?: string;
}
export interface Project {
  id: string;
  number: string;
  title: string;
  date: string;
  kicker: string;
  /** First CV bullet, used as the main description. */
  description: string;
  /** Both CV bullets, verbatim. */
  bullets: string[];
  /** Short feature phrases built from CV words. */
  features: string[];
  tech: ProjectTech[];
  link?: { href: string; label: string };
  /** Which illustrative mini-UI to draw. */
  visual: "blog" | "voice" | "iot";
}
export const PROJECTS: Project[] = [
  {
    id: "agentic-ai",
    number: "01",
    title: "Autonomous SRE & Change Governance Agentic AI",
    date: "2023 - 2026",
    kicker: "Agentic AI & ServiceNow automation",
    description:
      "Architected autonomous Agentic AI solutions at Wells Fargo: a Major Incident Management agent providing real-time ServiceNow updates, executive summaries, 5-Why RCA, and historical pattern analysis, plus an automated Digital Change Review solution.",
    bullets: [
      "Engineered an autonomous Major Incident Management agent: auto-ingests ServiceNow telemetry, writes executive status communications, generates 5-Why root-cause trees, and predicts probable causes from historical incidents.",
      "Developed an Agentic AI solution auditing digital technology change records in ServiceNow to detect missing critical details and alert reviewers proactively.",
    ],
    features: [
      "Autonomous incident diagnosis",
      "ServiceNow live sync",
      "Executive comms generation",
      "Automated 5-Why RCA",
      "Historical incident pattern matching",
      "Change compliance auditing",
      "Proactive reviewer alerts",
      "Agentic workflow orchestration",
    ],
    tech: [
      { name: "Agentic AI", logo: "python" },
      { name: "ServiceNow", logo: "jira" },
      { name: "Python", logo: "python" },
      { name: "Splunk", logo: "grafana" },
    ],
    visual: "blog",
  },
  {
    id: "monitoring",
    number: "02",
    title: "Tribe Monitoring & Real-Time Alerting Engine",
    date: "2021 - 2026",
    kicker: "Observability solution",
    description:
      "Created multiple solutions by integrating events from different sources and generating real-time reports and alerts using AppDynamics, Splunk and Kibana at Wells Fargo.",
    bullets: [
      "Integrated events from multiple sources to generate real-time reports and alerts using AppDynamics, Splunk and Kibana.",
      "Worked as a tools support Engineer providing tribe-level monitoring solutions, enabling faster incident detection and resolution across the organization.",
    ],
    features: [
      "Multi-source event integration",
      "Real-time alerting",
      "AppDynamics dashboards",
      "Splunk log analysis",
      "Kibana visualizations",
      "CI/CD automation",
      "Agile delivery",
      "Cloud-readiness assessment",
    ],
    tech: [
      { name: "AppDynamics", logo: "dynatrace" },
      { name: "Splunk", logo: "grafana" },
      { name: "Kibana", logo: "kibana" },
      { name: "CI/CD", logo: "jenkins" },
    ],
    visual: "voice",
  },
  {
    id: "automation",
    number: "03",
    title: "Automation and Incident Resolution Platform",
    date: "2019 - 2021",
    kicker: "RPA and DevOps automation",
    description:
      "Maintained, debugged and optimized automation programs at UBS to resolve 47% of tickets by Automation using Azure DevOps, Docker, Kubernetes and GitLab.",
    bullets: [
      "Maintained, debugged and optimized automation programs to resolve 47% of tickets by Automation.",
      "Collaborated with developers and cloud engineers to onboard new real-time based applications using Kafka and Elastic Search.",
    ],
    features: [
      "47% ticket auto-resolution",
      "Azure DevOps pipelines",
      "Docker and Kubernetes",
      "Kafka real-time streaming",
      "Elastic Search onboarding",
      "Disaster recovery testing",
      "Python and PowerShell scripting",
      "Agile methodology",
    ],
    tech: [
      { name: "Azure DevOps", logo: "azure-devops" },
      { name: "Docker", logo: "docker" },
      { name: "Kubernetes", logo: "kubernetes" },
      { name: "Kafka" },
      { name: "Elastic Search", logo: "kibana" },
      { name: "Python", logo: "python" },
    ],
    visual: "iot",
  },
];

/* ---------- Certifications ---------- */
export interface Certification {
  id: string;
  index: string;
  title: string;
  date: string;
  url: string;
  /** Issuer, when known (derived from the title). */
  issuer?: string;
}
const CERT_RAW: Omit<Certification, "index">[] = [
  { id: "azdevops", title: "Microsoft Certified: Azure DevOps Engineer Expert", issuer: "Microsoft", date: "Feb-Sep 2021", url: "https://learn.microsoft.com/en-us/certifications/devops-engineer/" },
  { id: "azadmin", title: "Microsoft Certified: Azure Administrator Associate", issuer: "Microsoft", date: "Feb-Sep 2021", url: "https://learn.microsoft.com/en-us/certifications/azure-administrator/" },
  { id: "gcpace", title: "Google Cloud Associate Engineer", issuer: "Google Cloud", date: "Feb-Sep 2021", url: "https://cloud.google.com/certification/cloud-engineer" },
  { id: "azdata", title: "Microsoft Certified: Azure Data Fundamental", issuer: "Microsoft", date: "Feb-Sep 2021", url: "https://learn.microsoft.com/en-us/certifications/azure-data-fundamentals/" },
  { id: "azai", title: "Microsoft Certified: Azure AI Fundamental", issuer: "Microsoft", date: "Nov 2020", url: "https://learn.microsoft.com/en-us/certifications/azure-ai-fundamentals/" },
  { id: "azfund", title: "Microsoft Certified: Azure Fundamental", issuer: "Microsoft", date: "Oct 2020", url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/" },
  { id: "aarpa", title: "AA Certified Advanced RPA Professional", issuer: "Automation Anywhere", date: "Jun 2019", url: "https://www.automationanywhere.com/products/automation-ai/certifications" },
  { id: "splunkpu", title: "Splunk Power User Certification", issuer: "Splunk", date: "Jul 2018", url: "https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-power-user.html" },
  { id: "splunkuc", title: "Splunk User Certification", issuer: "Splunk", date: "Jun 2018", url: "https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-user.html" },
  { id: "itil", title: "ITIL Foundation Certification", issuer: "AXELOS", date: "Oct 2016", url: "https://www.axelos.com/certifications/itil-service-management/itil-4-foundation" },
];
export const CERTIFICATIONS: Certification[] = CERT_RAW.map((c, i) => ({ ...c, index: String(i + 1).padStart(2, "0") }));

/* ---------- Achievements ---------- */
export interface Achievement {
  id: string;
  /** "01" .. "07" */
  index: string;
  label: string;
  caption: string;
  detail: string;
  /** Logo key: lnrs, github-actions, srm, medal (concept), linux, jenkins, azure */
  logo: string;
  /** Soft glow behind the logo, rgba. */
  tint: string;
  number?: number;
  prefix?: string;
  suffix?: string;
  /** Small unit text beside the number, e.g. "CAD / month". */
  unit?: string;
}
const ACH_RAW: Omit<Achievement, "index">[] = [
  {
    id: "experience",
    label: "10+ Years Experience",
    caption: "Enterprise SRE, automation, and resilient infrastructure engineering",
    detail: "Societe Generale · Wells Fargo (AVP) · UBS · Infosys",
    logo: "lnrs",
    tint: "rgba(237,28,36,0.16)",
    number: 10,
    unit: "years",
  },
  {
    id: "agentic-ai",
    label: "Agentic AI in SRE",
    caption: "Autonomous ServiceNow Major Incident Management & Change Review agents",
    detail: "Automated 5-Why root-cause trees, executive communications & change gap notifications",
    logo: "github-actions",
    tint: "rgba(124,58,237,0.18)",
  },
  {
    id: "tickets",
    label: "Ticket Auto-Resolution",
    caption: "Reduction in support tickets through automation at UBS",
    detail: "Maintained, debugged and optimized automation programs",
    logo: "github-actions",
    tint: "rgba(33,114,229,0.16)",
    number: 47,
    suffix: "%",
  },
  {
    id: "releases",
    label: "Application Releases",
    caption: "Successful production releases delivered across teams",
    detail: "Collaborated with Development and QA teams across 100+ releases",
    logo: "jenkins",
    tint: "rgba(215,51,39,0.14)",
    number: 100,
    suffix: "+",
  },
  {
    id: "certs",
    label: "10 Certifications",
    caption: "Industry certifications spanning cloud, SRE and automation",
    detail: "Microsoft Azure, Google Cloud, Splunk, ITIL, Automation Anywhere RPA",
    logo: "azure",
    tint: "rgba(0,120,212,0.16)",
    number: 10,
    unit: "certs",
  },
  {
    id: "splunk",
    label: "Splunk Power User",
    caption: "Certified Splunk Power User with expertise in log analytics and alerting",
    detail: "Splunk User (2018) and Splunk Power User (2018) certified",
    logo: "srm",
    tint: "rgba(18,70,160,0.16)",
  },
  {
    id: "rpa",
    label: "RPA Professional",
    caption: "Advanced Robotic Process Automation by Automation Anywhere",
    detail: "AA Certified Advanced RPA Professional - Jun 2019",
    logo: "medal",
    tint: "rgba(13,13,13,0.08)",
  },
  {
    id: "uptime",
    label: "SRE Excellence",
    caption: "Site reliability engineering maintaining 24x7 mission-critical systems",
    detail: "Site Reliability Engineering - Excellent | Application Support - Excellent",
    logo: "linux",
    tint: "rgba(250,190,20,0.18)",
  },
];
export const ACHIEVEMENTS: Achievement[] = ACH_RAW.map((a, i) => ({ ...a, index: String(i + 1).padStart(2, "0") }));
