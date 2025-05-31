import { Client } from "@notionhq/client";

// Initialize Notion client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database IDs from your Notion workspace
export const DATABASE_IDS = {
  PROJECTS: "204803d3-0664-819e-9c55-cf0063021a36",
  CERTIFICATIONS: "204803d3-0664-8119-bfcf-df8f7dced14e",
  TOOLS: "204803d3-0664-8175-9810-c8c05369fcbc",
  CONTACT_SUBMISSIONS: "204803d3-0664-81f0-9ac4-c18a16278400",
};

// Type definitions for our data
export interface NotionProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl?: string;
  figmaUrl?: string;
  type: "uiux" | "business" | "development" | "testing";
  featured: boolean;
}

export interface NotionCertification {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  skills: string[];
  verifyUrl: string;
  status: "Active" | "Expired" | "In Progress";
}

export interface NotionTool {
  id: string;
  title: string;
  description: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Design" | "Languages";
  items: string[];
  icon: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface NotionContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: "job" | "freelance" | "feedback" | "others";
  bestTimeToContact: "officeHours" | "afterOfficeHours" | "weekends";
  heardAbout: "search" | "social" | "friend" | "conference" | "other";
  message: string;
  status: "New" | "In Progress" | "Responded" | "Closed";
  submittedDate: string;
}

// Helper function to convert Notion rich text to plain text
export function getPlainText(richText: any[]): string {
  return richText.map((text) => text.plain_text).join("");
}

// Helper function to convert Notion multi-select to string array
export function getMultiSelect(multiSelect: any[]): string[] {
  return multiSelect.map((item) => item.name);
}

// Helper function to get select value
export function getSelect(select: any): string {
  return select?.name || "";
}

// Helper function to get URL
export function getUrl(url: any): string {
  return url || "";
}

// Helper function to get date
export function getDate(date: any): string {
  return date?.start || "";
}

// Helper function to get checkbox value
export function getCheckbox(checkbox: boolean): boolean {
  return checkbox || false;
} 