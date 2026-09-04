import type { Metadata } from 'next';
import styles from './builder-academy.module.css';
import BuilderAcademyRegistrationForm from '@/components/BuilderAcademyRegistrationForm';
import { getWhatsAppLink } from '@/config/contact';
import {
  FaRocket,
  FaCalendarAlt,
  FaCalendarWeek,
  FaClock,
  FaLaptopCode,
  FaChild,
  FaGraduationCap,
  FaMoneyBillWave,
  FaTools,
  FaRobot,
  FaCode,
  FaUsers,
  FaChalkboardTeacher,
  FaFolderOpen,
  FaChartLine,
  FaTrophy,
  FaCheckCircle,
  FaPalette,
  FaAward,
  FaMicrophone,
  FaCertificate,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Codiva Builders | Builder Academy — Termly Tech Program for Kids & Teens',
  description:
    'Our flagship 12-week school-term technology program where children aged 6–17 master coding, web development, Python, and AI through exciting hands-on projects. Flexible weekday and Saturday plans.',
  openGraph: {
    title: 'Codiva Builders | Builder Academy (Termly Program)',
    description:
      '12-Week School Term Technology Program for Ages 6–17. Starter, Builder, and Pro Builder Tiers.',
  },
};

export default function BuilderAcademyPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* HEADER / NAVIGATION */}
      <header className={styles.header}>
        <a href="/builder-academy" className={styles.logoArea}>
          <span className={styles.brandCodiva}>Codiva</span>
          <span className={styles.brandBuilders}>Builders</span>
          <span className={styles.subsidiaryBadge}>by Veleon Academy</span>
        </a>
        <nav className={styles.navLinks}>
          <a href="#why-us" className={styles.navLink}>Why Us</a>
          <a href="#tracks" className={styles.navLink}>Learning Tracks</a>
          <a href="#schedule" className={styles.navLink}>Schedule</a>
          <a href="#gains" className={styles.navLink}>Outcomes</a>
          <a href="#register" className={`${styles.navLink} ${styles.navCta}`}>
            Enroll Your Child
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroPill}>
              <FaRocket style={{ color: '#FF6B00' }} />
              Termly Cohort Enrollment Now Open!
            </div>
            <h1 className={styles.heroTitle}>
              Builder <span className={styles.heroTitleGradient}>Academy</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Our flagship 12-week school-term technology program where children aged 6–17 learn coding, web development, Python, and AI through structured, exciting, and project-based learning.
            </p>
            <div className={styles.heroButtons}>
              <a href="#register" className="btn btn-orange" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', fontWeight: 700 }}>
                Enroll Your Child Now
              </a>
              <a href="#tracks" className="btn btn-secondary" style={{ padding: '0.9rem 1.75rem', fontSize: '1rem', fontWeight: 600 }}>
                Explore Age Tracks ↓
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div
              style={{
                background: 'linear-gradient(135deg, #0A66C2 0%, #084d94 100%)',
                borderRadius: '24px',
                padding: '1.25rem',
                color: 'white',
                boxShadow: '0 20px 40px rgba(10, 102, 194, 0.25)',
                width: '100%',
                maxWidth: '460px',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
                <FaRocket /> 12-Week Term Program
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
                3 Flexible Schedule Tiers
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle style={{ color: '#4ade80' }} /> <strong>Starter:</strong> Saturday Only (₦35,000)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle style={{ color: '#fbbf24' }} /> <strong>Builder:</strong> Tue + Thu After School (₦55,000)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle style={{ color: '#c084fc' }} /> <strong>Pro Builder:</strong> Weekdays + Sat (₦85,000)
                </li>
              </ul>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Tuition starts at:</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24' }}>₦35,000 / term</div>
                </div>
                <a href="#register" className="btn btn-orange" style={{ padding: '0.55rem 1.1rem', fontSize: '0.875rem', fontWeight: 700 }}>
                  Enroll Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS SECTION */}
      <section className={styles.highlightsSection}>
        <div className={styles.highlightsGrid}>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon} style={{ color: '#0A66C2' }}><FaCalendarAlt /></div>
            <div className={styles.highlightLabel}>12 Weeks</div>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon} style={{ color: '#8b5cf6' }}><FaCalendarWeek /></div>
            <div className={styles.highlightLabel}>Flexible Schedules</div>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon} style={{ color: '#f59e0b' }}><FaClock /></div>
            <div className={styles.highlightLabel}>After School & Sat</div>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon} style={{ color: '#10b981' }}><FaLaptopCode /></div>
            <div className={styles.highlightLabel}>3 Plan Tiers</div>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon} style={{ color: '#ec4899' }}><FaChild /></div>
            <div className={styles.highlightLabel}>Ages 6–17</div>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon} style={{ color: '#0284c7' }}><FaGraduationCap /></div>
            <div className={styles.highlightLabel}>Demo Day & Cert</div>
          </div>
          <div className={styles.highlightCard} style={{ borderColor: '#FF6B00', background: '#fff7ed' }}>
            <div className={styles.highlightIcon} style={{ color: '#FF6B00' }}><FaMoneyBillWave /></div>
            <div className={styles.highlightLabel} style={{ color: '#FF6B00', fontSize: '1.05rem' }}>From ₦35,000</div>
          </div>
        </div>
      </section>

      {/* ABOUT SUBSIDIARY CALLOUT SECTION */}
      <div style={{ padding: '0 1.5rem', marginTop: '4rem' }}>
        <section className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>Empowering the Next Generation of Builders</h2>
            <p className={styles.aboutText}>
              <span className={styles.aboutHighlight}>Codiva Builders</span> is the dedicated kids and teens subsidiary of <span className={styles.aboutHighlight}>Veleon Academy</span>. Backed by Veleon Academy’s world-class tech education framework, we combine high-caliber technical mentorship with fun, practical, project-based learning tailored specifically for young minds during regular school terms.
            </p>
          </div>
        </section>
      </div>

      {/* WHY CHOOSE CODIVA BUILDERS SECTION */}
      <section className={styles.section} id="why-us">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Parents Choose Codiva Builders</h2>
          <p className={styles.sectionSubtitle}>
            We provide a world-class academy environment where kids transition from passive screen consumers into creative digital innovators.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {[
            { icon: <FaTools />, title: 'Project-Based Learning', desc: 'Children learn by doing, creating real applications, animations, and websites.', color: '#0A66C2' },
            { icon: <FaRobot />, title: 'AI & Future Skills', desc: 'Introduction to age-appropriate AI tools, logic, and futuristic problem solving.', color: '#8b5cf6' },
            { icon: <FaCode />, title: 'Coding & Digital Creativity', desc: 'Hands-on practice with Scratch, HTML/CSS, Python, and digital design.', color: '#FF6B00' },
            { icon: <FaUsers />, title: 'Small Interactive Classes', desc: 'Low student-to-teacher ratio ensuring every child receives personalized guidance.', color: '#10b981' },
            { icon: <FaChalkboardTeacher />, title: 'Experienced Instructors', desc: 'Vetted Veleon Academy tech mentors who excel at teaching and inspiring kids.', color: '#ec4899' },
            { icon: <FaFolderOpen />, title: 'Student Portfolio', desc: 'Every graduate builds a verified portfolio of completed digital projects.', color: '#0284c7' },
            { icon: <FaChartLine />, title: 'Parent Progress Updates', desc: 'Regular feedback on your child’s weekly milestones and technical growth.', color: '#f59e0b' },
            { icon: <FaTrophy />, title: 'End-of-Term Demo Day', desc: 'A celebrated presentation event where students present their projects to parents.', color: '#10b981' },
          ].map((item, index) => (
            <div key={index} className={styles.whyCard}>
              <div className={styles.cardIconBox} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNING TRACKS SECTION */}
      <section className={styles.section} id="tracks">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Learning Tracks</h2>
          <p className={styles.sectionSubtitle}>
            Curriculum tailored specifically for every age bracket to ensure optimal engagement, comprehension, and skill acquisition.
          </p>
        </div>

        <div className={styles.tracksGrid}>
          {/* Junior Builders */}
          <div className={styles.trackCard}>
            <div className={styles.trackHeader}>
              <span className={styles.trackAgeBadge}>Ages 6–8</span>
              <h3 className={styles.trackTitle}>Junior Builders</h3>
              <div className={styles.trackTheme}>Theme: Imagine & Create</div>
            </div>
            <div className={styles.trackListTitle}>Students Explore:</div>
            <ul className={styles.trackList}>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Scratch Visual Coding & Logic</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Digital Art & Canva Graphic Design</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Interactive Storytelling & Animations</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Creative Game Mechanics</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Safe Child-Friendly AI Exploration</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Presentation & Speaking Skills</li>
            </ul>
            <a href="#register" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              Register Junior Track
            </a>
          </div>

          {/* Intermediate Builders */}
          <div className={styles.trackCard}>
            <div className={styles.trackHeader}>
              <span className={styles.trackAgeBadge} style={{ background: '#eff6ff', color: '#0A66C2' }}>Ages 9–12</span>
              <h3 className={styles.trackTitle}>Intermediate Builders</h3>
              <div className={styles.trackTheme}>Theme: Design & Build</div>
            </div>
            <div className={styles.trackListTitle}>Students Explore:</div>
            <ul className={styles.trackList}>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Advanced Scratch 3.0 Programming</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> HTML5 & CSS3 Web Development</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Modern Generative AI Tools & Prompting</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Graphic Branding & Layout Design</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Building Live Web Pages</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Presentation & Demo Day Pitching</li>
            </ul>
            <a href="#register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Register Intermediate Track
            </a>
          </div>

          {/* Senior Builders */}
          <div className={styles.trackCard}>
            <div className={styles.trackHeader}>
              <span className={styles.trackAgeBadge} style={{ background: '#f0fdf4', color: '#10b981' }}>Ages 13–17</span>
              <h3 className={styles.trackTitle}>Senior Builders</h3>
              <div className={styles.trackTheme}>Theme: Build & Innovate</div>
            </div>
            <div className={styles.trackListTitle}>Students Explore:</div>
            <ul className={styles.trackList}>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Modern HTML, CSS & JavaScript</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Python Programming Fundamentals</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> AI Prompt Engineering & Productivity</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> UI/UX Design & Product Thinking</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Building Portfolios & Web Applications</li>
              <li className={styles.trackItem}><span className={styles.trackItemIcon}><FaCheckCircle /></span> Tech Career & Entrepreneurship Skills</li>
            </ul>
            <a href="#register" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              Register Senior Track
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAM SCHEDULE SECTION */}
      <section className={styles.section} id="schedule">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Program Schedule & Format</h2>
          <p className={styles.sectionSubtitle}>
            12 weeks of structured learning tailored to fit comfortably alongside your child&apos;s regular school schedule.
          </p>
        </div>

        <div className={styles.scheduleGrid}>
          <div className={styles.scheduleCard}>
            <div className={styles.scheduleIcon}><FaCalendarAlt /></div>
            <h3 className={styles.scheduleTitle}>Duration</h3>
            <p className={styles.scheduleValue}>12 Weeks</p>
            <p className={styles.scheduleSub}>Aligned with the school term calendar.</p>
          </div>

          <div className={styles.scheduleCard}>
            <div className={styles.scheduleIcon}><FaClock /></div>
            <h3 className={styles.scheduleTitle}>Class Timings</h3>
            <p className={styles.scheduleValue}>Weekdays & Sat</p>
            <p className={styles.scheduleSub}>Weekdays (5:00–6:30 PM) / Sat (10 AM–12 PM).</p>
          </div>

          <div className={styles.scheduleCard}>
            <div className={styles.scheduleIcon}><FaUsers /></div>
            <h3 className={styles.scheduleTitle}>Format</h3>
            <p className={styles.scheduleValue}>Online & Physical</p>
            <p className={styles.scheduleSub}>Interactive live virtual campus or physical hub.</p>
          </div>

          <div className={styles.scheduleCard}>
            <div className={styles.scheduleIcon}><FaTrophy /></div>
            <h3 className={styles.scheduleTitle}>Demo Day</h3>
            <p className={styles.scheduleValue}>Week 12</p>
            <p className={styles.scheduleSub}>Live presentation day with parents and guests.</p>
          </div>
        </div>
      </section>

      {/* OUTCOMES / WHAT STUDENTS GAIN SECTION */}
      <section className={styles.section} id="gains">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Your Child Gains</h2>
          <p className={styles.sectionSubtitle}>
            Transformative benefits that prepare your child for future academic and career excellence.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {[
            { icon: <FaRocket />, title: 'Practical Project Portfolio', desc: 'Real games, web pages, and animations your child built and can proudly share.', color: '#FF6B00' },
            { icon: <FaPalette />, title: 'Creative Confidence', desc: 'The courage to solve real problems and turn ideas into digital products.', color: '#ec4899' },
            { icon: <FaLaptopCode />, title: 'In-Demand Tech Skills', desc: 'Solid foundation in modern coding languages, design tools, and algorithms.', color: '#0A66C2' },
            { icon: <FaRobot />, title: 'AI Literacy', desc: 'Understanding how modern AI works safely, effectively, and productively.', color: '#8b5cf6' },
            { icon: <FaAward />, title: 'Teamwork & Collaboration', desc: 'Peer pair-programming exercises that teach teamwork and constructive feedback.', color: '#f59e0b' },
            { icon: <FaMicrophone />, title: 'Public Speaking & Pitching', desc: 'Practice presenting digital creations clearly and confidently to an audience.', color: '#10b981' },
            { icon: <FaFolderOpen />, title: 'Verified Certification', desc: 'An official certificate of completion from Codiva Builders by Veleon Academy.', color: '#0284c7' },
            { icon: <FaCertificate />, title: 'Ongoing Mentorship', desc: 'Continued guidance and advanced pathway opportunities in tech.', color: '#10b981' },
          ].map((item, index) => (
            <div key={index} className={styles.whyCard}>
              <div className={styles.cardIconBox} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTRATION FORM SECTION */}
      <section className={styles.registrationSection} id="register">
        <BuilderAcademyRegistrationForm />
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerBrandTitle}>Codiva Builders</div>
            <div className={styles.footerTagline}>Build. Create. Innovate.</div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', maxWidth: '360px' }}>
              The kids & teens tech subsidiary of <strong>Veleon Academy</strong>. Empowering young innovators with coding, design, and AI skills.
            </p>
          </div>

          <div>
            <div className={styles.footerColTitle}>Quick Links</div>
            <ul className={styles.footerList}>
              <li><a href="#why-us">Why Choose Us</a></li>
              <li><a href="#tracks">Learning Tracks</a></li>
              <li><a href="#schedule">Program Schedule</a></li>
              <li><a href="#register">Enroll Your Child</a></li>
            </ul>
          </div>

          <div>
            <div className={styles.footerColTitle}>Contact Admissions</div>
            <ul className={styles.footerList}>
              <li><FaWhatsapp style={{ color: '#25D366', marginRight: '0.4rem' }} /> WhatsApp: +234 8105281572</li>
              <li><FaEnvelope style={{ color: '#0A66C2', marginRight: '0.4rem' }} /> Email: codivabuilders@gmail.com</li>
              <li><FaInstagram style={{ color: '#ec4899', marginRight: '0.4rem' }} /> Instagram: @codivabuilders</li>
              <li><FaFacebook style={{ color: '#1877F2', marginRight: '0.4rem' }} /> Facebook: Codiva Builders</li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          © 2026 Codiva Builders (Subsidiary of Veleon Academy). All rights reserved.
        </div>
      </footer>

      {/* STICKY MOBILE CTA BAR */}
      <div className={styles.mobileStickyBar}>
        <div className={styles.mobileStickyText}>
          Builder Academy • <span className={styles.mobileStickyPrice}>From ₦35,000</span>
        </div>
        <a href="#register" className="btn btn-orange" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: 700 }}>
          Enroll Now
        </a>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={getWhatsAppLink()}
        className="whatsapp-float"
        aria-label="Chat with Codiva Builders on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
