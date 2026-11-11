'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './StudentProjectsShowcase.module.css';
import { getWhatsAppLink } from '@/config/contact';
import {
  FaGamepad,
  FaPlay,
  FaCode,
  FaChalkboardTeacher,
  FaTimes,
  FaSearchPlus,
  FaCheckCircle,
  FaRocket,
  FaArrowRight,
  FaWhatsapp,
  FaUsers,
  FaLaptopCode,
  FaTrophy,
} from 'react-icons/fa';

export interface StudentProject {
  id: string;
  title: string;
  category: 'game' | 'story' | 'classroom';
  categoryLabel: string;
  ageBadge: string;
  authorBadge: string;
  image: string;
  summary: string;
  skills: string[];
  codeBreakdown: string[];
  track: string;
  isLiveSession?: boolean;
}

const projectsData: StudentProject[] = [
  {
    id: 'project-3',
    title: 'Scratch Cat Rock Dodger Arcade',
    category: 'game',
    categoryLabel: 'Playable Arcade Game',
    ageBadge: 'Ages 9–12',
    authorBadge: 'Codiva Intermediate Builder',
    image: '/project3.png',
    track: 'Game Dev & Clone Physics',
    summary:
      'A fast-paced dodge game built in Scratch. The student implemented random coordinate cloning so rocks continuously drop from the sky, a dynamic score counter (Score: 16), and instant collision detection that triggers game over.',
    skills: ['Object Cloning', 'Score Variables', 'Collision Detection', 'Random Coordinates'],
    codeBreakdown: [
      'Cloning Mechanics: "create clone of myself" and "when I start as a clone" to generate infinite falling obstacles.',
      'Random Spawn: "go to x: pick random -222 to 222, y: 189" ensuring obstacles never fall in the exact same spot twice.',
      'Falling Physics & Speed: "repeat until y position < -156: change y by -10" creates realistic gravity acceleration.',
      'Game Logic: "if touching Sprite1 then say Game Over and stop all" handles accurate game-ending collisions.',
      'Score System: "change Score by 1" dynamically rewards dodging success and deletes off-screen clones cleanly.',
    ],
  },
  {
    id: 'project-1',
    title: 'City Adventure & Jumping Mechanics',
    category: 'game',
    categoryLabel: 'Interactive Game & Animation',
    ageBadge: 'Ages 6–9',
    authorBadge: 'Junior Builders (Group 2)',
    image: '/project1.png',
    track: 'Scratch Visual Coding & Animation',
    summary:
      'A multi-sprite interactive city adventure featuring custom characters (Avery, Devin, Wizard, Ball, Gift). The young builders programmed responsive spacebar jumping physics and continuous walking animations.',
    skills: ['Keyboard Controls', 'Y-Axis Physics', 'Costume Looping', 'Multi-Sprite Staging'],
    codeBreakdown: [
      'Jump Physics: "when space key pressed" triggers smooth vertical ascent ("change y by 10") followed by timed descent.',
      'Walking Animation Loop: "forever: next costume, wait 0.3 seconds" cycles character sprites smoothly.',
      'Scene Coordination: Stage orchestration coordinating 5 distinct sprites including obstacle interaction.',
      'Coordinate Logic: Precise coordinate placement (x: -135, y: -94) to position players in the city world.',
    ],
  },
  {
    id: 'project-2',
    title: 'Safari Night Wildlife Story',
    category: 'story',
    categoryLabel: 'Animated Storytelling',
    ageBadge: 'Ages 6–10',
    authorBadge: 'Group 6 Collaborative Team',
    image: '/project2.png',
    track: 'Creative Storytelling & Direction',
    summary:
      'An engaging wildlife narrative created collaboratively by young students. Features synchronized animations of a walking brown bear, tracking lion, and explorer Avery navigating a moonlit forest.',
    skills: ['Sprite Synchronization', 'Backdrop Sequencing', 'Costume Switching', 'Team Collaboration'],
    codeBreakdown: [
      'Multi-Character Choreography: Synchronizing sprite motion rates so animals follow the main character naturally.',
      'Backdrop Styling: Transitioning moods with atmospheric night-sky lighting and themed stage art.',
      'Sprite Size & Layering: Organizing visual depth so the bear, lion, and character maintain spatial perspective.',
      'Event Triggers: Structuring clean green-flag start triggers to reset the scene predictably.',
    ],
  },
  {
    id: 'project-4',
    title: 'Live Interactive Virtual Campus in Action',
    category: 'classroom',
    categoryLabel: 'Live Online Coaching',
    ageBadge: 'Ages 6–17',
    authorBadge: 'Real-Time Class (Jitsi Meet)',
    image: '/project4.png',
    track: 'Live Mentorship & 1-on-1 Guidance',
    isLiveSession: true,
    summary:
      'A glimpse inside an active online lesson at meet.jit.si/CodivaBuilders. A student creates an Apple Drop catching game while sharing their screen, receiving direct, real-time code reviews and encouragement from our mentor.',
    skills: ['Live Teacher Guidance', 'Hands-On Screen Sharing', 'Real-Time Bug Fixing', 'Active Participation'],
    codeBreakdown: [
      'Active Student Coding: Not passive video watching — students share screens and build line-by-line.',
      'Direct Instructor Support: Mentors identify syntax or logic bugs immediately and guide kids to fix them.',
      'Collaborative Atmosphere: Small classes ensure every student receives personalized attention and speaking time.',
      'Confidence First: Children celebrate every successful run, fostering strong self-belief in STEM.',
    ],
  },
];

interface Props {
  onEnrollClick?: () => void;
  sectionId?: string;
  theme?: 'white' | 'alt';
}

export default function StudentProjectsShowcase({
  onEnrollClick,
  sectionId = 'student-projects',
  theme = 'white',
}: Props) {
  const [filter, setFilter] = useState<'all' | 'game' | 'story' | 'classroom'>('all');
  const [activeModalProject, setActiveModalProject] = useState<StudentProject | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section
      id={sectionId}
      className={theme === 'alt' ? styles.showcaseSectionAlt : styles.showcaseSection}
    >
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.proofBadge}>
            <FaTrophy style={{ color: '#FF6B00' }} /> Real Proof of Learning
          </div>
          <h2 className={styles.title}>
            See What Our <span className={styles.titleGradient}>Young Builders</span> Create
          </h2>
          <p className={styles.subtitle}>
            Real code. Real games. Real results. At Codiva Builders, children don&apos;t just watch tutorials —
            they build actual playable games, creative animations, and interactive apps from week one.
          </p>
        </div>

        {/* Trust Metrics Bar */}
        <div className={styles.trustBar}>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon} style={{ background: '#fff7ed', color: '#FF6B00' }}>
              <FaGamepad />
            </div>
            <div className={styles.trustText}>
              <span className={styles.trustNumber}>100+ Games Built</span>
              <span className={styles.trustLabel}>By students aged 6–17</span>
            </div>
          </div>

          <div className={styles.trustItem}>
            <div className={styles.trustIcon} style={{ background: '#eff6ff', color: '#0A66C2' }}>
              <FaCode />
            </div>
            <div className={styles.trustText}>
              <span className={styles.trustNumber}>100% Student Coded</span>
              <span className={styles.trustLabel}>Real logic & variables</span>
            </div>
          </div>

          <div className={styles.trustItem}>
            <div className={styles.trustIcon} style={{ background: '#ecfdf5', color: '#10b981' }}>
              <FaChalkboardTeacher />
            </div>
            <div className={styles.trustText}>
              <span className={styles.trustNumber}>Live Interactive Campus</span>
              <span className={styles.trustLabel}>Small groups & 1-on-1</span>
            </div>
          </div>

          <div className={styles.trustItem}>
            <div className={styles.trustIcon} style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
              <FaLaptopCode />
            </div>
            <div className={styles.trustText}>
              <span className={styles.trustNumber}>Zero Experience Needed</span>
              <span className={styles.trustLabel}>Beginners start smoothly</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterRow}>
          <button
            onClick={() => setFilter('all')}
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
          >
            All Work ({projectsData.length})
          </button>
          <button
            onClick={() => setFilter('game')}
            className={`${styles.filterBtn} ${filter === 'game' ? styles.filterBtnActive : ''}`}
          >
            <FaGamepad /> Playable Games
          </button>
          <button
            onClick={() => setFilter('story')}
            className={`${styles.filterBtn} ${filter === 'story' ? styles.filterBtnActive : ''}`}
          >
            <FaPlay /> Story & Animations
          </button>
          <button
            onClick={() => setFilter('classroom')}
            className={`${styles.filterBtn} ${filter === 'classroom' ? styles.filterBtnActive : ''}`}
          >
            <FaChalkboardTeacher /> Live Classroom Sessions
          </button>
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.card}>
              {/* Image Preview with Hover Overlay */}
              <div
                className={styles.imageWrapper}
                onClick={() => setActiveModalProject(project)}
                title="Click to zoom and inspect code"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={340}
                  className={styles.projectImage}
                  priority
                />

                {project.isLiveSession ? (
                  <div className={styles.liveBadge}>
                    <span className={styles.liveDot} /> Live Class In Session
                  </div>
                ) : (
                  <div className={styles.verifiedBadge}>
                    <FaCheckCircle /> Verified Student Code
                  </div>
                )}

                <div className={styles.imageOverlay}>
                  <div className={styles.zoomPill}>
                    <FaSearchPlus /> Click to Inspect Code & Stage
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <div className={styles.metaRow}>
                  <span className={styles.ageTag}>{project.ageBadge}</span>
                  <span className={styles.cohortTag}>{project.authorBadge}</span>
                </div>

                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.summary}</p>

                {/* Skills Learned */}
                <div className={styles.skillsSection}>
                  <div className={styles.skillsTitle}>Concepts Mastered:</div>
                  <div className={styles.skillPills}>
                    {project.skills.map((skill, si) => (
                      <span key={si} className={styles.skillPill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className={styles.cardFooter}>
                  <button
                    className={styles.viewCodeBtn}
                    onClick={() => setActiveModalProject(project)}
                  >
                    Inspect Code Breakdown <FaArrowRight />
                  </button>
                  <span className={styles.trackPill}>{project.track}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Conversion Banner for Parents */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h3 className={styles.ctaHeading}>
              Imagine what your child will build in their first 4 weeks!
            </h3>
            <p className={styles.ctaParagraph}>
              Give your child the skills, creative confidence, and mentorship to turn gaming time into
              productive building time. No prior computer experience required.
            </p>
          </div>
          <div className={styles.ctaActions}>
            {onEnrollClick ? (
              <button onClick={onEnrollClick} className={styles.enrollBtn}>
                <FaRocket /> Enroll Your Child
              </button>
            ) : (
              <Link href="/builder-academy#register" className={styles.enrollBtn}>
                <FaRocket /> Enroll Your Child
              </Link>
            )}
            <a
              href={getWhatsAppLink("Hello! I saw the student projects on your website and would love to enroll my child.")}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for Code Inspection */}
      {activeModalProject && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseBtn}
              onClick={() => setActiveModalProject(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            {/* High-Res Image Area */}
            <div className={styles.modalImageArea}>
              <Image
                src={activeModalProject.image}
                alt={activeModalProject.title}
                width={1200}
                height={680}
                className={styles.modalImage}
              />
            </div>

            {/* Details & Code Breakdown */}
            <div className={styles.modalBody}>
              <div className={styles.modalHeaderRow}>
                <div>
                  <h3 className={styles.modalTitle}>{activeModalProject.title}</h3>
                  <div style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.2rem' }}>
                    {activeModalProject.authorBadge} • {activeModalProject.track}
                  </div>
                </div>
                <div className={styles.modalMeta}>
                  <span className={`${styles.modalTag} ${styles.modalTagAccent}`}>
                    {activeModalProject.ageBadge}
                  </span>
                  <span className={styles.modalTag}>
                    {activeModalProject.categoryLabel}
                  </span>
                </div>
              </div>

              <p className={styles.modalDesc}>{activeModalProject.summary}</p>

              {/* Code & Logic Analysis */}
              <div className={styles.modalLogicBox}>
                <div className={styles.modalLogicTitle}>
                  <FaCode style={{ color: '#FF6B00' }} />
                  What the Student Learned & Implemented in This Code:
                </div>
                <ul className={styles.modalLogicList}>
                  {activeModalProject.codeBreakdown.map((item, index) => (
                    <li key={index} style={{ marginBottom: '0.4rem' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className={styles.modalActions}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {activeModalProject.skills.map((s, idx) => (
                    <span key={idx} className={styles.skillPill}>
                      ✓ {s}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {onEnrollClick ? (
                    <button
                      onClick={() => {
                        setActiveModalProject(null);
                        onEnrollClick();
                      }}
                      className={styles.enrollBtn}
                    >
                      Enroll in This Track
                    </button>
                  ) : (
                    <Link
                      href="/builder-academy#register"
                      onClick={() => setActiveModalProject(null)}
                      className={styles.enrollBtn}
                    >
                      Enroll in This Track
                    </Link>
                  )}
                  <a
                    href={getWhatsAppLink(
                      `Hello Codiva Builders, I loved the "${activeModalProject.title}" project done by a student and want to register my child.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                  >
                    <FaWhatsapp /> Ask Us About This Course
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

