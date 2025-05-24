import { geminiService } from './geminiService';
import { projects } from '../data/projects';
import { experiences } from '../data/experience';
import { achievements } from '../data/achievements';

export interface SearchResult {
  type: 'project' | 'experience' | 'achievement' | 'skill' | 'general';
  title: string;
  content: string;
  relevance: number;
  metadata?: any;
}

export class SearchService {
  private static instance: SearchService;

  static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  async performSearch(query: string): Promise<string> {
    // Enhanced search with context awareness
    const context = this.buildSearchContext(query);
    return await geminiService.searchPortfolio(`${context}\n\nQuery: ${query}`);
  }

  private buildSearchContext(query: string): string {
    const lowerQuery = query.toLowerCase();
    let context = "Focus on providing detailed, professional responses. ";

    if (lowerQuery.includes('project')) {
      context += "Emphasize project details, technologies used, and achievements. ";
    }
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology')) {
      context += "Highlight technical skills, proficiency levels, and relevant experience. ";
    }
    if (lowerQuery.includes('experience') || lowerQuery.includes('work')) {
      context += "Focus on work experience, responsibilities, and professional growth. ";
    }
    if (lowerQuery.includes('education') || lowerQuery.includes('university')) {
      context += "Emphasize educational background, CGPA, and academic achievements. ";
    }

    return context;
  }

  getQuickResults(query: string): SearchResult[] {
    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search projects
    projects.forEach(project => {
      if (project.name.toLowerCase().includes(lowerQuery) || 
          project.description.toLowerCase().includes(lowerQuery) ||
          project.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))) {
        results.push({
          type: 'project',
          title: project.name,
          content: project.description,
          relevance: this.calculateRelevance(query, project.name + ' ' + project.description),
          metadata: project
        });
      }
    });

    // Search experiences
    experiences.forEach(exp => {
      if (exp.company.toLowerCase().includes(lowerQuery) || 
          exp.role.toLowerCase().includes(lowerQuery) ||
          exp.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'experience',
          title: `${exp.role} at ${exp.company}`,
          content: exp.description,
          relevance: this.calculateRelevance(query, exp.company + ' ' + exp.role + ' ' + exp.description),
          metadata: exp
        });
      }
    });

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  private calculateRelevance(query: string, content: string): number {
    const queryWords = query.toLowerCase().split(' ');
    const contentWords = content.toLowerCase().split(' ');
    let matches = 0;

    queryWords.forEach(word => {
      if (contentWords.some(contentWord => contentWord.includes(word))) {
        matches++;
      }
    });

    return matches / queryWords.length;
  }
}

export const searchService = SearchService.getInstance();
