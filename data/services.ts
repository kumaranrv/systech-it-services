import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Cpu,
  HardDrive,
  Laptop,
  ShieldCheck,
  ShoppingCart,
  Timer,
  Wallet,
  Wrench,
} from "lucide-react";

export type ServiceCategory =
  | "software"
  | "hardware"
  | "security"
  | "consulting";

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  idealFor: string;
  category: ServiceCategory;
  icon: LucideIcon;
}

export interface WhyItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: ServiceItem[] = [
  {
    id: "svc-os-installation",
    slug: "os-installation",
    title: "OS Installation & Setup",
    description:
      "Fresh Windows and Linux installs with driver and update setup.",
    fullDescription:
      "We perform clean operating system installation, partition setup, driver installation, and post-install optimization so your device runs smoothly from day one.",
    features: [
      "Windows and Linux installation",
      "Device driver and firmware setup",
      "Essential software installation",
      "Performance tuning and cleanup",
    ],
    idealFor:
      "New systems, slow systems, and OS corruption recovery scenarios.",
    category: "software",
    icon: Laptop,
  },
  {
    id: "svc-general-service",
    slug: "general-service",
    title: "General PC/Laptop Service",
    description: "Routine diagnostics, maintenance, and issue resolution.",
    fullDescription:
      "Our general service covers hardware diagnostics, software troubleshooting, thermal cleaning, and preventive maintenance to keep your systems healthy.",
    features: [
      "Complete system diagnosis",
      "Internal and external cleaning",
      "Thermal checks and fan servicing",
      "Common software issue fixes",
    ],
    idealFor: "Home users and small teams needing reliable day-to-day systems.",
    category: "hardware",
    icon: Wrench,
  },
  {
    id: "svc-system-upgrades",
    slug: "system-upgrades",
    title: "System Upgrades",
    description: "RAM, SSD, and performance upgrades for older systems.",
    fullDescription:
      "Upgrade key components such as RAM and SSD to significantly improve boot times, multitasking performance, and overall system responsiveness.",
    features: [
      "RAM compatibility and upgrade",
      "SSD installation and OS migration",
      "Performance benchmarking",
      "Post-upgrade validation",
    ],
    idealFor: "Aging devices that need a cost-effective speed boost.",
    category: "hardware",
    icon: HardDrive,
  },
  {
    id: "svc-buying-consultation",
    slug: "buying-consultation",
    title: "Buying Consultation",
    description: "Unbiased device recommendations based on your workload.",
    fullDescription:
      "We help you choose the right laptops, desktops, and accessories based on your use case, budget, and long-term maintenance considerations.",
    features: [
      "Use-case based recommendations",
      "Budget optimization",
      "Brand and model comparison",
      "Upgrade path planning",
    ],
    idealFor: "Students, professionals, and businesses planning new purchases.",
    category: "consulting",
    icon: ShoppingCart,
  },
  {
    id: "svc-cctv-installation",
    slug: "cctv-installation",
    title: "CCTV Installation",
    description: "Security camera planning, setup, and configuration.",
    fullDescription:
      "End-to-end CCTV services including site assessment, camera placement planning, installation, and mobile monitoring setup for dependable security coverage.",
    features: [
      "Site survey and planning",
      "Camera and DVR/NVR installation",
      "Remote view configuration",
      "Basic user training and handover",
    ],
    idealFor:
      "Homes, shops, and offices requiring practical surveillance coverage.",
    category: "security",
    icon: Camera,
  },
];

export const whyItems: WhyItem[] = [
  {
    title: "Experienced Team",
    description:
      "Hands-on experts with deep troubleshooting and setup experience.",
    icon: Cpu,
  },
  {
    title: "Quick Turnaround",
    description: "Fast diagnosis and practical fixes to reduce downtime.",
    icon: Timer,
  },
  {
    title: "Affordable Pricing",
    description:
      "Transparent and budget-friendly service without hidden charges.",
    icon: Wallet,
  },
  {
    title: "Reliable Security Setup",
    description: "CCTV and endpoint setup aligned with modern safety needs.",
    icon: ShieldCheck,
  },
];
