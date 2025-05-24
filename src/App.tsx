"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { geminiService } from "./services/geminiService"
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
  ExternalLink,
  Download,
} from "lucide-react"

function App() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setHasSearched(true)

    try {
      const result = await geminiService.searchPortfolio(searchQuery)
      setResponse(result)
    } catch (error) {
      console.error("Search error:", error)
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
    { name: "Python", level: "Advanced", icon: "🐍", color: "#3776ab", percentage: 95 },
    { name: "AI/ML", level: "Advanced", icon: "🤖", color: "#ff6b6b", percentage: 90 },
    { name: "React", level: "Advanced", icon: "⚛️", color: "#61dafb", percentage: 88 },
    { name: "Node.js", level: "Advanced", icon: "🟢", color: "#68a063", percentage: 85 },
    { name: "C/C++", level: "Advanced", icon: "⚡", color: "#00599c", percentage: 82 },
    { name: "SQL", level: "Advanced", icon: "🗄️", color: "#336791", percentage: 80 },
  ]

  const achievements = [
    { icon: Award, text: "Top 9% in Amazon ML Challenge 2024", color: "#ffd700", metric: "2438 teams" },
    { icon: Star, text: "200+ Competitive Programming Problems", color: "#ff6b6b", metric: "Multiple platforms" },
    { icon: Code, text: "CGPA: 8.86/10 at VIT Chennai", color: "#4ecdc4", metric: "AI/ML Specialization" },
  ]

  const projects = [
    {
      name: "easyEdits",
      description: "AI-powered video editing with prompt-based controls",
      tech: ["FastAPI", "Vite", "FFmpeg", "OpenAI Whisper"],
      color: "#667eea",
    },
    {
      name: "VCHECK",
      description: "Real-time ID recognition with 99% accuracy",
      tech: ["Python", "YOLOv8", "EasyOCR", "Streamlit"],
      color: "#764ba2",
    },
    {
      name: "SONORIQ",
      description: "Music community platform with social features",
      tech: ["React", "Node.js", "Firebase", "Spotify API"],
      color: "#f093fb",
    },
  ]

  return (
    <AppContainer>
      <ParticleBackground />
      <FloatingElements />
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
                      <StatusIndicator />
                    </ProfileAvatar>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <ProfileName>
                      Swagat Mitra
                      <VerifiedBadge>
                        <Star size={16} fill="currentColor" />
                      </VerifiedBadge>
                    </ProfileName>
                    <ProfileTitle>
                      <Brain size={20} />
                      AI/ML Engineer & Full Stack Developer
                    </ProfileTitle>
                    <ProfileLocation>
                      <MapPin size={16} />
                      VIT Chennai • Available for opportunities
                      <StatusDot />
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
                      <ContactLink href="https://github.com/swagatmitra22" aria-label="GitHub">
                        <Github size={20} />
                        <span>GitHub</span>
                        <ExternalLink size={14} />
                      </ContactLink>
                      <ContactLink href="https://linkedin.com/in/swagat-mitra" aria-label="LinkedIn">
                        <Linkedin size={20} />
                        <span>LinkedIn</span>
                        <ExternalLink size={14} />
                      </ContactLink>
                      <ContactLink href="mailto:swagatmitra2004@gmail.com" aria-label="Email">
                        <Mail size={20} />
                        <span>Email</span>
                      </ContactLink>
                      <ContactLink href="#" aria-label="Download Resume">
                        <Download size={20} />
                        <span>Resume</span>
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
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <StatCard>
                        <StatIcon style={{ color: achievement.color }}>
                          <achievement.icon size={24} />
                        </StatIcon>
                        <StatContent>
                          <StatText>{achievement.text}</StatText>
                          <StatMetric>{achievement.metric}</StatMetric>
                        </StatContent>
                        <StatGlow style={{ background: `${achievement.color}20` }} />
                      </StatCard>
                    </motion.div>
                  ))}
                </StatsSection>
              </Header>

              <ProjectsPreview>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <SectionTitle>
                    <Code size={24} />
                    Featured Projects
                  </SectionTitle>
                  <ProjectsGrid>
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.name}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                        whileHover={{ y: -8 }}
                      >
                        <ProjectCard>
                          <ProjectHeader
                            style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)` }}
                          >
                            <ProjectName>{project.name}</ProjectName>
                            <ProjectIcon style={{ color: project.color }}>
                              <Code size={20} />
                            </ProjectIcon>
                          </ProjectHeader>
                          <ProjectDescription>{project.description}</ProjectDescription>
                          <TechStack>
                            {project.tech.map((tech, techIndex) => (
                              <TechBadge key={techIndex}>{tech}</TechBadge>
                            ))}
                          </TechStack>
                        </ProjectCard>
                      </motion.div>
                    ))}
                  </ProjectsGrid>
                </motion.div>
              </ProjectsPreview>

              <SkillsSection>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
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
                        transition={{ delay: 1.1 + index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <SkillCard>
                          <SkillHeader>
                            <SkillIcon style={{ backgroundColor: `${skill.color}20` }}>{skill.icon}</SkillIcon>
                            <SkillInfo>
                              <SkillName>{skill.name}</SkillName>
                              <SkillLevel>{skill.level}</SkillLevel>
                            </SkillInfo>
                          </SkillHeader>
                          <SkillProgress>
                            <SkillBar>
                              <SkillFill
                                style={{
                                  width: `${skill.percentage}%`,
                                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                                }}
                                as={motion.div}
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.percentage}%` }}
                                transition={{ delay: 1.2 + index * 0.1, duration: 1 }}
                              />
                            </SkillBar>
                            <SkillPercentage>{skill.percentage}%</SkillPercentage>
                          </SkillProgress>
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
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <SearchHeader>
                    <SearchIconLarge>
                      <Sparkles size={32} />
                    </SearchIconLarge>
                    <SearchTitle>Ask AI About Me</SearchTitle>
                    <SearchSubtitle>
                      Get instant, intelligent answers about my projects, skills, and experience
                    </SearchSubtitle>
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
                      <SearchInputGlow />
                    </SearchInputContainer>
                    <SearchButton
                      type="submit"
                      disabled={loading || !query.trim()}
                      as={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search size={20} />
                          Search
                        </>
                      )}
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
                          transition={{ delay: 1.3 + index * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <SuggestionButton
                            onClick={() => {
                              setQuery(suggestion)
                              handleSearch(suggestion)
                            }}
                          >
                            <SuggestionText>{suggestion}</SuggestionText>
                            <SuggestionIcon>
                              <Search size={16} />
                            </SuggestionIcon>
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
                <BackButton
                  onClick={handleNewSearch}
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                    <LoadingSpinnerLarge />
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

// Enhanced Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
  position: relative;
  overflow-x: hidden;
`

const ParticleBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(102, 126, 234, 0.3) 0%, transparent 50%);
  opacity: 0.6;
  animation: float 20s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
  }
`

const FloatingElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(255, 119, 198, 0.1));
    animation: float 15s ease-in-out infinite;
  }
  
  &::before {
    top: 10%;
    left: 10%;
    animation-delay: -5s;
  }
  
  &::after {
    bottom: 10%;
    right: 10%;
    animation-delay: -10s;
  }
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
  width: 140px;
  height: 140px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`

const AvatarText = styled.span`
  font-size: 3rem;
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
  filter: blur(12px);
  z-index: 1;
  animation: pulse 3s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
`

const StatusIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: #10b981;
  border-radius: 50%;
  border: 3px solid white;
  z-index: 3;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const VerifiedBadge = styled.div`
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #1a1a2e;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
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

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
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
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }
`

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`

const StatIcon = styled.div`
  flex-shrink: 0;
`

const StatContent = styled.div`
  flex: 1;
`

const StatText = styled.p`
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`

const StatMetric = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

const StatGlow = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  border-radius: 20px;
  transition: opacity 0.3s ease;
`

const ProjectsPreview = styled.section`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }
`

const ProjectHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const ProjectName = styled.h4`
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
`

const ProjectIcon = styled.div`
  padding: 0.5rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
`

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  line-height: 1.6;
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;
`

const TechBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`

const SkillsSection = styled.section`
  margin-bottom: 4rem;
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`

const SkillCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
  }
`

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`

const SkillInfo = styled.div`
  flex: 1;
`

const SkillName = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`

const SkillLevel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

const SkillProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SkillBar = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
`

const SkillFill = styled.div`
  height: 100%;
  border-radius: 10px;
  transition: width 1s ease;
`

const SkillPercentage = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  min-width: 40px;
`

const SearchSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
`

const SearchHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const SearchIconLarge = styled.div`
  color: #fbbf24;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
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
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
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

const SearchInputGlow = styled.div`
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;

  ${SearchInputContainer}:focus-within & {
    opacity: 0.3;
  }
`

const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.25rem 2rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

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

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
  border-radius: 16px;
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
  flex: 1;
`

const SuggestionIcon = styled.div`
  opacity: 0.7;
  transition: opacity 0.3s ease;

  ${SuggestionButton}:hover & {
    opacity: 1;
  }
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
  border-radius: 20px;
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
  border-radius: 20px;
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

const LoadingSpinnerLarge = styled.div`
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
