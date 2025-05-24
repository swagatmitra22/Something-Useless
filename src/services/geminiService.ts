import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

interface APIError extends Error {
  status?: number;
  statusText?: string;
  code?: string;
}

function isAPIError(error: unknown): error is APIError {
  return error instanceof Error;
}

export class GeminiService {
  private model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash", // ✅ Updated model name
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,
    },
  });

  async searchPortfolio(query: string): Promise<string> {
    if (!API_KEY) {
      return "❌ API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.";
    }

    const maxRetries = 3;
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔍 API attempt ${attempt}/${maxRetries} for query:`, query.substring(0, 50) + '...');
        
        const context = `You are Swagat Mitra's AI portfolio assistant. Answer based on this information:

**SWAGAT MITRA**
- Phone: +91 7601836517
- Email: swagatmitra2004@gmail.com
- Education: BTech Computer Science Engineering with AI & ML at VIT Chennai, CGPA: 8.86/10 (Sept 2022 - Present)

**EXPERIENCE:**
- Accenture India (May 2025 - Present): Advanced Application Engineer Intern, Bengaluru
- Samsung R&D Institute (June 2024 - May 2025): Samsung PRISM Developer Intern, developed plugin for detecting energy smells in Kotlin code

**PROJECTS:**
1. easyEdits - AI video editing (FastAPI, Vite, FFmpeg, OpenAI Whisper, Google Gemini)
2. VCHECK - ID recognition with 99% accuracy (Python, YOLOv8, EasyOCR, Streamlit)
3. SONORIQ - Music community platform (ReactJS, NodeJS, Firebase, 50% faster delivery)
4. CityBuilder - Unity simulation game (C#, tile-based systems)

**SKILLS:**
- Languages: Python, C/C++, SQL (Advanced), Java (Intermediate), Kotlin (Basic)
- Web: ReactJS, NodeJS, ExpressJS, Firebase, HTML, CSS, JavaScript
- AI/ML: TensorFlow, Scikit-Learn, Pandas, NumPy
- Tools: Git, VS Code, PyCharm, IntelliJ

**ACHIEVEMENTS:**
- Amazon ML Challenge 2024: Top 9% among 2438 teams
- Competitive Programming: 200+ problems solved, Codeforces rating 1070, LeetCode 100+ problems

Query: ${query}

Respond professionally about Swagat's background.`;

        const result = await this.model.generateContent(context);
        const response = await result.response;
        
        if (!response || !response.text) {
          throw new Error('Empty response from API');
        }
        
        const text = response.text();
        console.log(`✅ API success on attempt ${attempt}`);
        
        return text;
        
      } catch (error: unknown) {
        lastError = error;
        console.error(`❌ API attempt ${attempt} failed:`, error);
        
        if (isAPIError(error)) {
          if (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`⏳ Rate limited, waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          if (error.message?.includes('403') || error.message?.includes('PERMISSION_DENIED')) {
            console.error('❌ Permission denied - check API key');
            break;
          }
        }
        
        if (attempt === maxRetries) {
          break;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    console.error('❌ All API attempts failed, providing fallback response');
    return this.getFallbackResponse(query);
  }

  private getFallbackResponse(query: string): string {
    // Your existing fallback logic...
    return `**About Swagat Mitra:**

Swagat is an AI/ML Engineer and Full Stack Developer currently pursuing BTech in Computer Science Engineering with AI & ML specialization at VIT Chennai (CGPA: 8.86/10).

**Current Status:**
- Advanced Application Engineer Intern at Accenture India (May 2025 - Present)
- Previously Samsung PRISM Developer Intern at Samsung R&D Institute

**Contact:** swagatmitra2004@gmail.com | +91 7601836517

*Note: This information is provided from cached data due to temporary API limitations.*`;
  }
}

export const geminiService = new GeminiService();
