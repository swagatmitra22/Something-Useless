import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ArrowLeft,
  Sparkles,
  Code,
  Brain,
  Zap,
  Github,
  Linkedin,
  Mail,
  Star,
  Award,
  MapPin,
} from "lucide-react"

// Mock Gemini service for demo purposes
const mockGeminiService = {
  searchPortfolio: async (query: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (query.toLowerCase().includes("programming") || query.toLowerCase().includes("languages")) {
      return "I'm proficient in Python (Advanced), C/C++ (Advanced), SQL (Advanced), Java (Intermediate), and Kotlin (Basic). I've solved over 200 competitive programming problems and achieved top 9% in Amazon ML Challenge 2024 among 2438 teams."
    }

    if (query.toLowerCase().includes("easyedits") || query.toLowerCase().includes("video")) {
      return "easyEdits is my AI-powered video editing tool that enables prompt-based editing. I developed it using FastAPI, Vite, FFmpeg, OpenAI Whisper, Google Gemini, and scenedetect. It features version control-style editing, allowing users to track and revert changes seamlessly, with automated transcriptions and scene detection."
    }

    if (query.toLowerCase().includes("experience") || query.toLowerCase().includes("internship")) {
      return "I'm currently working as an Advanced Application Engineer Intern at Accenture India (May 2025 - Present) in Bengaluru. Previously, I was a Samsung PRISM Developer Intern at Samsung R&D Institute (June 2024 - May 2025), where I developed a plugin to detect energy smells in Kotlin Code for various IDEs."
    }

    if (query.toLowerCase().includes("vcheck") || query.toLowerCase().includes("id")) {
      return "VCHECK is my ID Card Identification System using Real Time Video with almost 99% accuracy. Built with Python, PyData, YOLOv8, EasyOCR, and Streamlit. I implemented text detection using EasyOCR and created a custom dataset for ID card and shorts detection."
    }

    return `Based on your query about "${query}", I can tell you that I'm Swagat Mitra, an AI/ML Engineer and Full Stack Developer currently pursuing BTech in Computer Science & Engineering with specialization in AI & ML at VIT Chennai (CGPA: 8.86/10). I have experience with various technologies including Python, C/C++, ReactJS, NodeJS, Machine Learning, and more. Feel free to ask me about my specific projects, skills, or experience!`
  },
}

function App() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setHasSearched(true)

    try {
      const result = await mockGeminiService.searchPortfolio(searchQuery)
      setResponse(result)
    } catch {
      setResponse("I apologize, but I'm having trouble processing your request right now. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleNewSearch = () => {
    setHasSearched(false)
    setQuery("")
    setResponse("")
  }

  const suggestedQueries = [
    "What are your main programming languages and expertise?",
    "Tell me about the easyEdits AI video editing project",
    "What experience do you have with AI and machine learning?",
    "Show me your achievements in competitive programming",
    "What internships have you completed?",
    "Describe the VCHECK ID recognition system project",
  ]

  const skills = [
    { name: "Python", level: "Advanced", icon: "🐍", color: "#3776ab" },
    { name: "AI/ML", level: "Advanced", icon: "🤖", color: "#ff6b6b" },
    { name: "React", level: "Advanced", icon: "⚛️", color: "#61dafb" },
    { name: "Node.js", level: "Advanced", icon: "🟢", color: "#68a063" },
    { name: "C/C++", level: "Advanced", icon: "⚡", color: "#00599c" },
    { name: "SQL", level: "Advanced", icon: "🗄️", color: "#336791" },
  ]

  const achievements = [
    { icon: Award, text: "Top 9% in Amazon ML Challenge 2024", color: "#ffd700" },
    { icon: Star, text: "200+ Competitive Programming Problems", color: "#ff6b6b" },
    { icon: Code, text: "CGPA: 8.86/10 at VIT Chennai", color: "#4ecdc4" },
  ]

  return (
    <AppContainer>
      <BackgroundPattern />
      <MainContent>
        <AnimatePresence mode="wait">
          {!hasSearched ? (
            <motion.div
              key="search-home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Header>
                <ProfileSection>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <ProfileAvatar>
                      <AvatarText>SM</AvatarText>
                      <AvatarGlow />
                    </ProfileAvatar>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <ProfileName>Swagat Mitra</ProfileName>
                    <ProfileTitle>
                      <Brain size={20} />
                      AI/ML Engineer & Full Stack Developer
                    </ProfileTitle>
                    <ProfileLocation>
                      <MapPin size={16} />
                      VIT Chennai • Bengaluru
                    </ProfileLocation>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <ProfileSubtitle>
                      Ask me anything about my professional background, projects, and experience. Powered by AI to give
                      you detailed insights into my journey.
                    </ProfileSubtitle>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <ContactLinks>
                      <ContactLink href="#" aria-label="GitHub">
                        <Github size={20} />
                        <span>GitHub</span>
                      </ContactLink>
                      <ContactLink href="#" aria-label="LinkedIn">
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                      </ContactLink>
                      <ContactLink href="#" aria-label="Email">
                        <Mail size={20} />
                        <span>Email</span>
                      </ContactLink>
                    </ContactLinks>
                  </motion.div>
                </ProfileSection>

                <StatsSection>
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    >
                      <StatCard>
                        <achievement.icon size={24} style={{ color: achievement.color }} />
                        <StatText>{achievement.text}</StatText>
                      </StatCard>
                    </motion.div>
                  ))}
                </StatsSection>
              </Header>

              <SkillsSection>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <SectionTitle>
                    <Zap size={24} />
                    Core Expertise
                  </SectionTitle>
                  <SkillsGrid>
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                      >
                        <SkillCard>
                          <SkillIcon style={{ backgroundColor: `${skill.color}20` }}>{skill.icon}</SkillIcon>
                          <SkillName>{skill.name}</SkillName>
                          <SkillLevel>{skill.level}</SkillLevel>
                        </SkillCard>
                      </motion.div>
                    ))}
                  </SkillsGrid>
                </motion.div>
              </SkillsSection>

              <SearchSection>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <SearchHeader>
                    <Sparkles size={28} />
                    <SearchTitle>Ask AI About Me</SearchTitle>
                    <SearchSubtitle>Get instant answers about my projects, skills, and experience</SearchSubtitle>
                  </SearchHeader>

                  <SearchForm onSubmit={handleSubmit}>
                    <SearchInputContainer>
                      <SearchIcon>
                        <Search size={20} />
                      </SearchIcon>
                      <SearchInput
                        type="text"
                        placeholder="Ask me about my projects, skills, experience, or anything professional..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={loading}
                      />
                    </SearchInputContainer>
                    <SearchButton type="submit" disabled={loading || !query.trim()}>
                      {loading ? "Searching..." : "Search"}
                    </SearchButton>
                  </SearchForm>

                  <SuggestionsContainer>
                    <SuggestionsTitle>Try asking:</SuggestionsTitle>
                    <SuggestionsGrid>
                      {suggestedQueries.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                        >
                          <SuggestionButton
                            onClick={() => {
                              setQuery(suggestion)
                              handleSearch(suggestion)
                            }}
                          >
                            <SuggestionText>{suggestion}</SuggestionText>
                            <Search size={16} />
                          </SuggestionButton>
                        </motion.div>
                      ))}
                    </SuggestionsGrid>
                  </SuggestionsContainer>
                </motion.div>
              </SearchSection>
            </motion.div>
          ) : (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <ResultsHeader>
                <BackButton onClick={handleNewSearch}>
                  <ArrowLeft size={20} />
                  New Search
                </BackButton>
                <ResultsTitle>
                  <Brain size={24} />
                  Swagat Mitra - AI Portfolio
                </ResultsTitle>
              </ResultsHeader>

              <QueryDisplay>
                <QuerySection>
                  <QueryIcon>
                    <Search size={20} />
                  </QueryIcon>
                  <QueryContent>
                    <QueryLabel>Your Question</QueryLabel>
                    <QueryText>"{query}"</QueryText>
                  </QueryContent>
                </QuerySection>
              </QueryDisplay>

              <ResponseContainer>
                {loading ? (
                  <LoadingContainer>
                    <LoadingSpinner />
                    <LoadingText>Processing your query...</LoadingText>
                    <LoadingSubtext>AI is analyzing my portfolio data</LoadingSubtext>
                  </LoadingContainer>
                ) : (
                  <ResponseContent>
                    <ResponseHeader>
                      <ResponseIcon>
                        <Sparkles size={20} />
                      </ResponseIcon>
                      <ResponseLabelContainer>
                        <ResponseLabel>AI Response</ResponseLabel>
                        <ResponseSubLabel>Powered by Gemini AI</ResponseSubLabel>
                      </ResponseLabelContainer>
                    </ResponseHeader>
                    <ResponseText>{response}</ResponseText>
                  </ResponseContent>
                )}
              </ResponseContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>

      <Footer>
        <FooterContent>
          <FooterText>© 2025 Swagat Mitra • Built with React, TypeScript, Vite & Gemini AI</FooterText>
        </FooterContent>
      </Footer>
    </AppContainer>
  )
}

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e  50%, #0f3460 75%, #533483 100%);
  position: relative;
  overflow-x: hidden;
`

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
  opacity: 0.4;
`

const MainContent = styled.main`
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`

const ProfileSection = styled.div`
  margin-bottom: 3rem;
`

const ProfileAvatar = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`

const AvatarText = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  z-index: 2;
`

const AvatarGlow = styled.div`
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  opacity: 0.7;
  filter: blur(8px);
  z-index: 1;
`

const ProfileName = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const ProfileTitle = styled.h2`
  font-size: 1.5rem;
  color: #a5b4fc;
  margin-bottom: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const ProfileLocation = styled.div`
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const ProfileSubtitle = styled.p`
  font-size: 1.2rem;
  color: #cbd5e1;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.7;
`

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
`

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
  }
`

const StatText = styled.p`
  color: white;
  font-weight: 600;
  margin-top: 0.5rem;
`

const SkillsSection = styled.section`
  margin-bottom: 4rem;
`

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`

const SkillCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
  }
`

const SkillIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
`

const SkillName = styled.div`
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const SkillLevel = styled.div`
  color: #94a3b8;
  font-size: 0.9rem;
`

const SearchSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
`

const SearchHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  svg {
    color: #fbbf24;
    margin-bottom: 1rem;
  }
`

const SearchTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
`

const SearchSubtitle = styled.p`
  font-size: 1.1rem;
  color: #cbd5e1;
`

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const SearchIcon = styled.div`
  padding: 0 1.5rem;
  color: #64748b;
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 1.25rem 1.5rem 1.25rem 0;
  font-size: 1rem;
  background: transparent;
  color: #1e293b;

  &::placeholder {
    color: #64748b;
  }

  &:disabled {
    opacity: 0.6;
  }
`

const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const SuggestionsContainer = styled.div`
  text-align: center;
`

const SuggestionsTitle = styled.h3`
  color: white;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.2rem;
`

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`

const SuggestionButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
`

const SuggestionText = styled.span`
  font-size: 0.95rem;
  line-height: 1.4;
`

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`

const ResultsTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const QueryDisplay = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const QuerySection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const QueryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`

const QueryContent = styled.div`
  flex: 1;
`

const QueryLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const QueryText = styled.div`
  font-size: 1.1rem;
  color: white;
  font-style: italic;
  line-height: 1.5;
`

const ResponseContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2rem;
`

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const LoadingText = styled.p`
  color: #475569;
  font-size: 1.1rem;
  font-weight: 600;
`

const LoadingSubtext = styled.p`
  color: #64748b;
  font-size: 0.9rem;
`

const ResponseContent = styled.div``

const ResponseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const ResponseIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const ResponseLabelContainer = styled.div``

const ResponseLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const ResponseSubLabel = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
`

const ResponseText = styled.div`
  color: #1f2937;
  line-height: 1.8;
  font-size: 1.05rem;
  white-space: pre-wrap;
`

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 10;
`

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  text-align: center;
`

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

export default App
