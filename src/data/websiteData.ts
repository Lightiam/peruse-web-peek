
import { WebsiteCardProps } from '../components/WebsiteCard';

export interface WebsiteDetailsData extends WebsiteCardProps {
  creatorName: string;
  creatorEmail: string;
  creatorPhone?: string;
  additionalImages?: string[];
  longDescription: string;
  technologies?: string[];
  creationDate: string;
}

export const websiteData: WebsiteDetailsData[] = [
  {
    title: "Crypto Dashboard",
    description: "Modern cryptocurrency tracking dashboard with real-time prices and portfolio management.",
    longDescription: "A comprehensive cryptocurrency dashboard that offers real-time price tracking, portfolio management, and market analysis. Users can track their investments, set alerts for price changes, and view detailed charts and analytics. The platform features a user-friendly interface with dark mode support and responsive design for all devices.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    websiteUrl: "https://example.com/crypto-dashboard",
    category: "Dashboard",
    creatorName: "Alex Johnson",
    creatorEmail: "alex@example.com",
    creatorPhone: "+1 (555) 123-4567",
    additionalImages: [
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742"
    ],
    technologies: ["React", "TypeScript", "Chart.js", "TailwindCSS"],
    creationDate: "2023-09-15"
  },
  {
    title: "Developer Portfolio",
    description: "Clean and minimal portfolio website showcasing developer projects and skills.",
    longDescription: "A sleek, minimalist portfolio designed for developers to showcase their work and skills effectively. The portfolio features smooth transitions, a projects gallery, skills section, and contact form. It's built with accessibility and performance in mind, ensuring a great user experience across all devices and platforms.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    websiteUrl: "https://example.com/developer-portfolio",
    category: "Portfolio",
    creatorName: "Sam Williams",
    creatorEmail: "sam@example.com",
    additionalImages: [
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
    ],
    technologies: ["Vue.js", "GSAP", "Firebase", "Sass"],
    creationDate: "2023-11-22"
  },
  {
    title: "Online Education Platform",
    description: "Learn coding, design, and business with interactive courses and expert instructors.",
    longDescription: "A comprehensive online learning platform offering courses in programming, design, and business. Features include interactive lessons, coding challenges, project assessments, and live sessions with instructors. Students can track their progress, earn certificates, and join a community of learners for support and networking opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    websiteUrl: "https://example.com/education-platform",
    category: "SaaS",
    creatorName: "Emily Chen",
    creatorEmail: "emily@example.com",
    creatorPhone: "+1 (555) 987-6543",
    additionalImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    creationDate: "2023-07-03"
  },
  {
    title: "Project Management Tool",
    description: "Organize tasks, track progress, and collaborate with your team in real-time.",
    longDescription: "A robust project management solution designed for teams of all sizes. The platform offers features such as task assignment, progress tracking, file sharing, and real-time collaboration. With customizable workflows, time tracking, and reporting tools, teams can streamline their processes and boost productivity. Integrates seamlessly with popular tools like Slack, GitHub, and Google Workspace.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    websiteUrl: "https://example.com/project-management",
    category: "SaaS",
    creatorName: "Michael Rodriguez",
    creatorEmail: "michael@example.com",
    creatorPhone: "+1 (555) 555-1212",
    additionalImages: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1486718448742-163732cd1544",
      "https://images.unsplash.com/photo-1439337153520-7082a56a81f4"
    ],
    technologies: ["Angular", "Express", "PostgreSQL", "Socket.io"],
    creationDate: "2023-05-18"
  },
  {
    title: "Agency Landing Page",
    description: "Creative agency offering web design, development, and digital marketing services.",
    longDescription: "A stylish landing page for a full-service digital agency specializing in web design, development, and digital marketing. The page showcases the agency's services, portfolio of past work, client testimonials, and team members. With bold typography, creative animations, and a strong call-to-action, the landing page effectively converts visitors into leads.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    websiteUrl: "https://example.com/agency",
    category: "Landing Page",
    creatorName: "Sarah Thompson",
    creatorEmail: "sarah@example.com",
    additionalImages: [
      "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a",
      "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
      "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb"
    ],
    technologies: ["Svelte", "TailwindCSS", "Framer Motion", "Netlify"],
    creationDate: "2023-10-07"
  },
  {
    title: "E-Commerce Furniture Shop",
    description: "Modern furniture store with curated collections for home and office spaces.",
    longDescription: "A sleek e-commerce platform specialized in modern furniture for homes and offices. The store features high-quality product photography, detailed descriptions, and an intuitive shopping experience. Customers can browse by room type, style, or collection, and visualize products in their space using AR technology. The platform includes secure payment processing, order tracking, and customer reviews.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    websiteUrl: "https://example.com/furniture-shop",
    category: "E-commerce",
    creatorName: "David Wilson",
    creatorEmail: "david@example.com",
    creatorPhone: "+1 (555) 789-0123",
    additionalImages: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      "https://images.unsplash.com/photo-1551038247-3d9af20df552",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840"
    ],
    technologies: ["Next.js", "Stripe", "Sanity CMS", "Vercel"],
    creationDate: "2023-08-29"
  },
  {
    title: "Tech Blog",
    description: "Latest news and insights on technology, programming, and digital innovation.",
    longDescription: "A modern tech blog covering the latest developments in technology, programming languages, and digital innovation. The blog features well-researched articles, tutorials, interviews with industry experts, and opinion pieces. With categories for different tech domains and a powerful search function, readers can easily find content relevant to their interests. The site also offers newsletter subscriptions and commenting functionality.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    websiteUrl: "https://example.com/tech-blog",
    category: "Blog",
    creatorName: "Jessica Kim",
    creatorEmail: "jessica@example.com",
    additionalImages: [
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764",
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
      "https://images.unsplash.com/photo-1466442929976-97f336a657be"
    ],
    technologies: ["Gatsby", "Markdown", "GraphQL", "Algolia"],
    creationDate: "2023-04-12"
  },
  {
    title: "Business Consulting",
    description: "Strategic consulting services for businesses looking to scale and optimize operations.",
    longDescription: "A professional website for a business consulting firm specializing in helping companies scale efficiently and optimize their operations. The site outlines the firm's methodology, areas of expertise, and success stories from past clients. Featuring a clean, corporate design with clear calls-to-action, the website effectively communicates the value proposition to potential clients and includes a booking system for consultations.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    websiteUrl: "https://example.com/business-consulting",
    category: "Business",
    creatorName: "Robert Taylor",
    creatorEmail: "robert@example.com",
    creatorPhone: "+1 (555) 456-7890",
    additionalImages: [
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    ],
    technologies: ["WordPress", "Elementor", "HubSpot", "Google Analytics"],
    creationDate: "2023-12-05"
  }
];
