import { MetadataRoute } from "next";
import {
  getServices,
  getProjects,
  getArticles,
  getCareers,
} from "@/data/companyData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://arthakonstruksi.co.id";
  const now = new Date();

  const services = getServices();
  const projects = getProjects();
  const articles = getArticles();
  const careers = getCareers();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/certifications`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/news/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...articleRoutes];
}
