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
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.3,  // Lower temperature for more consistent responses
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,  // Reduced to avoid timeout issues
    },
  });

  async searchPortfolio(query: string): Promise<string> {
    if (!API_KEY) {
      return "❌ API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.";
    }

    // Implement exponential backoff retry logic
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔍 API attempt ${attempt}/${maxRetries} for query:`, query.substring(0, 50) + '...');
        
        // Shorter, more focused context to avoid token limits
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
        
        // Check if response was blocked
        if (!response || !response.text) {
          throw new Error('Empty response from API');
        }
        
        const text = response.text();
        console.log(`✅ API success on attempt ${attempt}`);
        console.log('Response length:', text.length);
        
        return text;
        
      } catch (error: unknown) {
        console.error(`❌ API attempt ${attempt} failed:`, error);
        
        // Check for specific error types
        if (isAPIError(error)) {
          // Handle rate limiting (429)
          if (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.log(`⏳ Rate limited, waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          // Handle server errors (500, 503)
          if (error.message?.includes('500') || error.message?.includes('503') || error.message?.includes('INTERNAL')) {
            const delay = 2000 * attempt;
            console.log(`🔄 Server error, waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          
          // Handle quota/permission errors (don't retry)
          if (error.message?.includes('403') || error.message?.includes('PERMISSION_DENIED')) {
            console.error('❌ Permission denied - check API key');
            break;
          }
        }
        
        // If it's the last attempt, break
        if (attempt === maxRetries) {
          break;
        }
        
        // Default retry delay
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    // All retries failed - provide intelligent fallback based on query
    console.error('❌ All API attempts failed, providing fallback response');
    return this.getFallbackResponse(query);
  }

  private getFallbackResponse(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    // Education queries
    if (lowerQuery.includes('education') || lowerQuery.includes('cgpa') || lowerQuery.includes('university') || lowerQuery.includes('college')) {
      return `**Swagat's Education:**

🎓 **Vellore Institute of Technology, Chennai**
- **Degree:** BTech in Computer Science Engineering with specialization in AI & ML
- **CGPA:** 8.86/10
- **Duration:** September 2022 - Present
- **Location:** Chennai, India

Swagat is currently pursuing his undergraduate degree with a strong focus on artificial intelligence and machine learning technologies, maintaining an excellent academic record.`;
    }
    
    // Experience queries
    if (lowerQuery.includes('experience') || lowerQuery.includes('internship') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      return `**Swagat's Professional Experience:**

💼 **Current Position:**
**Accenture India** (May 2025 - Present)
- Role: Advanced Application Engineer Intern
- Location: Bengaluru, Karnataka

📱 **Previous Experience:**
**Samsung R&D Institute** (June 2024 - May 2025)
- Role: Samsung PRISM Developer Intern
- Location: Remote, Bengaluru, Karnataka
- Project: Developed a plugin for detecting energy smells in Kotlin code for several known IDEs

Swagat has gained valuable industry experience working with leading technology companies on innovative projects.`;
    }
    
    // Projects queries
    if (lowerQuery.includes('project') || lowerQuery.includes('easyedits') || lowerQuery.includes('vcheck') || lowerQuery.includes('sonoriq')) {
      return `**Swagat's Key Projects:**

🎬 **easyEdits - AI Powered Video Editing**
- Technologies: FastAPI, Vite, FFmpeg, OpenAI Whisper, Google Gemini, scenedetect
- Features: Prompt-based editing, version control-style editing, automated transcriptions

🔍 **VCHECK - ID Card Recognition System**
- Technologies: Python, YOLOv8, EasyOCR, Streamlit
- Achievement: 99% accuracy in real-time ID card identification

🎵 **SONORIQ - Music Community Platform**
- Technologies: ReactJS, ExpressJS, NodeJS, Firebase
- Impact: 50% improvement in content delivery speed, 40% increase in user engagement

🏗️ **CityBuilder - Simulation Game**
- Technologies: Unity, C#, Tile-Based Systems
- Features: Grid-based building, traffic simulation, XP progression

Each project demonstrates Swagat's expertise across AI/ML, computer vision, web development, and game development.`;
    }
    
    // Skills queries
    if (lowerQuery.includes('skill') || lowerQuery.includes('programming') || lowerQuery.includes('language') || lowerQuery.includes('technology')) {
      return `**Swagat's Technical Skills:**

💻 **Programming Languages:**
- **Advanced:** Python, C/C++, SQL
- **Intermediate:** Java
- **Basic:** Kotlin

🌐 **Web Technologies:**
HTML, CSS, Tailwind, JavaScript, ReactJS, NodeJS, ExpressJS, Firebase

🤖 **AI/ML Libraries:**
Pandas, NumPy, Matplotlib, Streamlit, Scikit-Learn, TensorFlow, FFmpeg

🛠️ **Developer Tools:**
Git, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse

🏆 **Competitive Programming:**
- Codeforces: Newbie Rating 1070
- LeetCode: 100+ problems solved
- Total: 200+ problems across platforms

Swagat combines strong programming fundamentals with cutting-edge AI/ML expertise.`;
    }
    
    // Achievements queries
    if (lowerQuery.includes('achievement') || lowerQuery.includes('award') || lowerQuery.includes('competition') || lowerQuery.includes('amazon')) {
      return `**Swagat's Achievements:**

🏆 **Amazon ML Challenge 2024**
- Achievement: Top 9% in Level 1 among 2438 teams
- Demonstrates strong machine learning and problem-solving skills

💻 **Competitive Programming**
- Total Problems Solved: 200+ across multiple platforms
- Codeforces: Newbie Rating 1070
- LeetCode: 100+ problems solved
- Other Platforms: CodeChef, HackerRank

These achievements showcase Swagat's dedication to continuous learning and excellence in computer science and artificial intelligence.`;
    }
    
    // Default response
    return `**About Swagat Mitra:**

Swagat is an AI/ML Engineer and Full Stack Developer currently pursuing BTech in Computer Science Engineering with AI & ML specialization at VIT Chennai (CGPA: 8.86/10).

**Current Status:**
- Advanced Application Engineer Intern at Accenture India (May 2025 - Present)
- Previously Samsung PRISM Developer Intern at Samsung R&D Institute

**Key Highlights:**
- Top 9% in Amazon ML Challenge 2024 among 2438 teams
- 200+ competitive programming problems solved
- Built innovative AI-powered applications including video editing tools and computer vision systems
- Strong expertise in Python, C/C++, ReactJS, and AI/ML technologies

**Contact:** swagatmitra2004@gmail.com | +91 7601836517

*Note: This information is provided from cached data due to temporary API limitations. Please try your question again for the most current response.*`;
  }
}

export const geminiService = new GeminiService();
