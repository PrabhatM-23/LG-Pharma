import { Product, Testimonial, BlogPost, JobPosition } from './types';

export const COMPANY_INFO = {
  name: "Lakshmi Ganga (L.G) Pharma",
  tagline: "Pure Herbs. Proven Care.",
  description: "A trusted herbal pharmaceutical company offering natural, safe, and effective healthcare products inspired by Ayurveda and traditional herbal science.",
  founded: "November 2008",
  founder: "Mr. Dhananjai Kumar Rathak",
  upiId: "7317303996@ptsbi",
  email: "careers@lgpharma.com", // Placeholder based on request
  address: "Varanasi, Uttar Pradesh, India", // Assumed based on Ganga reference
  phone: "+91-9876543210"
};

export const PRODUCTS: Product[] = [
  {
    id: 'trace-1',
    name: 'TRACE - Herbal Anti-Mosquito Ultra Refill',
    category: 'Repellents',
    price: 149,
    description: "TRACE is a natural product designed to repel mosquitoes and other biting insects. Made from plant-based ingredients such as essential oils and botanical extracts.",
    image: 'https://picsum.photos/400/400?random=1',
    benefits: [
      'Herbal & Natural Formula',
      'Safer for Health (Children & Pets friendly)',
      'Effective Mosquito Protection (Dengue, Malaria, etc.)',
      'Eco-Friendly',
      'Pleasant Natural Aroma'
    ],
    ingredients: [
      'Lemon Eucalyptus Oil (PMD)',
      'Basil Oil (Linalool and Eugenol)',
      'Turmeric Oil (Turmerone)',
      'Neem Oil (Azadirachtin)',
      'Turpentine Oil',
      'Dhatura Alva Oil'
    ],
    isNew: true
  },
  {
    id: 'gasodrill',
    name: 'Gasodrill Syrup',
    category: 'Syrups',
    price: 120,
    description: "Natural herbal syrup for digestion and gastric relief.",
    image: 'https://picsum.photos/400/400?random=2',
    benefits: ['Relieves acidity', 'Improves digestion', 'No side effects'],
    ingredients: ['Ginger', 'Ajwain', 'Tulsi']
  },
  {
    id: 'jai-gange-oil',
    name: 'Jai Gange Hair Oil',
    category: 'Oils',
    price: 199,
    description: "Herbal hair oil to prevent hair fall and promote growth.",
    image: 'https://picsum.photos/400/400?random=3',
    benefits: ['Reduces hair fall', 'Strengthens roots', 'Cooling effect'],
    ingredients: ['Bhringraj', 'Amla', 'Coconut Oil']
  },
  {
    id: 'cough-syrup',
    name: 'Herbal Cough Syrup',
    category: 'Syrups',
    price: 95,
    description: "Soothing relief for dry and wet cough.",
    image: 'https://picsum.photos/400/400?random=4',
    benefits: ['Non-drowsy', 'Throat soothing', 'Immunity booster']
  },
  {
    id: 'pain-oil',
    name: 'Orthofix Pain Relief Oil',
    category: 'Oils',
    price: 249,
    description: "Deep penetrating oil for joint and muscle pain.",
    image: 'https://picsum.photos/400/400?random=5',
    benefits: ['Instant relief', 'Reduces inflammation', 'Increases mobility']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "LG Pharma products are effective, safe, and based on authentic herbal formulations.",
    author: "Dr. Sharma",
    role: "Registered Medical Practitioner"
  },
  {
    id: 2,
    text: "Gasodrill syrup helped my digestion naturally without side effects.",
    author: "Amit Verma",
    role: "Customer"
  },
  {
    id: 3,
    text: "Jai Gange hair oil improved my hair fall significantly.",
    author: "Priya Singh",
    role: "Customer"
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Natural Remedies for Cough & Cold",
    excerpt: "Discover how traditional herbs can soothe your throat instantly.",
    date: "Oct 12, 2023",
    category: "Herbal Remedies",
    image: "https://picsum.photos/600/400?random=10"
  },
  {
    id: 2,
    title: "5 Lifestyle Tips for Better Digestion",
    excerpt: "Small changes in your daily routine can lead to a healthier gut.",
    date: "Sep 28, 2023",
    category: "Lifestyle",
    image: "https://picsum.photos/600/400?random=11"
  }
];

export const JOBS: JobPosition[] = [
  { id: 1, title: "Medical Representative", type: "Full Time", location: "Lucknow" },
  { id: 2, title: "QC & Production Staff", type: "Full Time", location: "Varanasi" },
  { id: 3, title: "Sales & Marketing Executive", type: "Full Time", location: "Delhi NCR" }
];
