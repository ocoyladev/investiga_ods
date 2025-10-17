-- Create database and switch context
CREATE DATABASE IF NOT EXISTS investigaods CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE investigaods;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  avatar_url VARCHAR(1024) NULL,
  role ENUM('ADMIN','INSTRUCTOR','STUDENT') NOT NULL DEFAULT 'STUDENT',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Membership Plans
CREATE TABLE IF NOT EXISTS membership_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code ENUM('BASIC','PRO') NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  features JSON NULL,
  status TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan_id INT NOT NULL,
  start_at DATETIME NOT NULL,
  end_at DATETIME NULL,
  status ENUM('ACTIVE','CANCELLED','EXPIRED') NOT NULL DEFAULT 'ACTIVE',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sub_user(user_id),
  INDEX idx_sub_plan(plan_id),
  CONSTRAINT fk_sub_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_sub_plan FOREIGN KEY (plan_id) REFERENCES membership_plans(id)
) ENGINE=InnoDB;

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  summary VARCHAR(1000) NULL,
  description TEXT NULL,
  thumbnail_url VARCHAR(1024) NULL,
  level VARCHAR(255) NULL,
  language VARCHAR(64) NULL,
  visibility ENUM('PUBLIC','PRIVATE') NOT NULL DEFAULT 'PUBLIC',
  modality ENUM('SELF_PACED','GUIDED') NOT NULL DEFAULT 'SELF_PACED',
  tier_required ENUM('FREE','BASIC','PRO') NOT NULL DEFAULT 'FREE',
  has_certificate TINYINT(1) NOT NULL DEFAULT 0,
  supports_live TINYINT(1) NOT NULL DEFAULT 0,
  supports_challenges TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_courses_owner(owner_id),
  CONSTRAINT fk_courses_owner FOREIGN KEY (owner_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- Course Modules
CREATE TABLE IF NOT EXISTS course_modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  `index` INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary VARCHAR(1000) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_course_modules_course(course_id),
  CONSTRAINT fk_course_modules_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT NOT NULL,
  `index` INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NULL,
  video_url VARCHAR(1024) NULL,
  duration_min INT NULL,
  resources JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_lessons_module(module_id),
  CONSTRAINT fk_lessons_module FOREIGN KEY (module_id) REFERENCES course_modules(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Course <-> Tags join table
CREATE TABLE IF NOT EXISTS course_tags (
  courses_id INT NOT NULL,
  tags_id INT NOT NULL,
  PRIMARY KEY (courses_id, tags_id),
  INDEX idx_ct_course(courses_id),
  INDEX idx_ct_tag(tags_id),
  CONSTRAINT fk_ct_course FOREIGN KEY (courses_id) REFERENCES courses(id) ON DELETE CASCADE,
  CONSTRAINT fk_ct_tag FOREIGN KEY (tags_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Cohorts
CREATE TABLE IF NOT EXISTS cohorts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  start_at DATETIME NULL,
  end_at DATETIME NULL,
  capacity INT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cohorts_course(course_id),
  CONSTRAINT fk_cohorts_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  cohort_id INT NULL,
  status ENUM('ACTIVE','COMPLETED','DROPPED') NOT NULL DEFAULT 'ACTIVE',
  enrolled_at DATETIME NOT NULL,
  INDEX idx_enr_user(user_id),
  INDEX idx_enr_course(course_id),
  INDEX idx_enr_cohort(cohort_id),
  CONSTRAINT fk_enr_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_enr_course FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT fk_enr_cohort FOREIGN KEY (cohort_id) REFERENCES cohorts(id)
) ENGINE=InnoDB;

-- Lesson Progress
CREATE TABLE IF NOT EXISTS lesson_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  completed TINYINT(1) NOT NULL DEFAULT 0,
  progress_pct INT NOT NULL DEFAULT 0,
  last_viewed_at DATETIME NULL,
  INDEX idx_lp_user(user_id),
  INDEX idx_lp_lesson(lesson_id),
  CONSTRAINT fk_lp_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_lp_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id)
) ENGINE=InnoDB;

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NULL,
  lesson_id INT NULL,
  title VARCHAR(255) NOT NULL,
  type ENUM('QUIZ','EXAM') NOT NULL DEFAULT 'QUIZ',
  pass_score INT NULL,
  attempt_limit INT NULL,
  time_limit_sec INT NULL,
  weight INT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_quiz_course(course_id),
  INDEX idx_quiz_lesson(lesson_id),
  CONSTRAINT fk_quiz_course FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT fk_quiz_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id)
) ENGINE=InnoDB;

-- Questions
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  type ENUM('MCQ','TRUE_FALSE','OPEN') NOT NULL DEFAULT 'MCQ',
  prompt TEXT NOT NULL,
  points INT NOT NULL DEFAULT 1,
  metadata JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_questions_quiz(quiz_id),
  CONSTRAINT fk_questions_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Options
CREATE TABLE IF NOT EXISTS options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  text TEXT NOT NULL,
  is_correct TINYINT(1) NOT NULL DEFAULT 0,
  explanation TEXT NULL,
  INDEX idx_options_question(question_id),
  CONSTRAINT fk_options_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Attempts
CREATE TABLE IF NOT EXISTS attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  user_id INT NOT NULL,
  started_at DATETIME NOT NULL,
  submitted_at DATETIME NULL,
  score INT NOT NULL DEFAULT 0,
  status ENUM('IN_PROGRESS','SUBMITTED','GRADED') NOT NULL DEFAULT 'IN_PROGRESS',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_attempts_quiz(quiz_id),
  INDEX idx_attempts_user(user_id),
  CONSTRAINT fk_attempts_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
  CONSTRAINT fk_attempts_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- Answers
CREATE TABLE IF NOT EXISTS answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  attempt_id INT NOT NULL,
  question_id INT NOT NULL,
  option_id INT NULL,
  open_text TEXT NULL,
  is_correct TINYINT(1) NULL,
  awarded_points INT NULL,
  INDEX idx_answers_attempt(attempt_id),
  INDEX idx_answers_question(question_id),
  INDEX idx_answers_option(option_id),
  CONSTRAINT fk_answers_attempt FOREIGN KEY (attempt_id) REFERENCES attempts(id) ON DELETE CASCADE,
  CONSTRAINT fk_answers_question FOREIGN KEY (question_id) REFERENCES questions(id),
  CONSTRAINT fk_answers_option FOREIGN KEY (option_id) REFERENCES options(id)
) ENGINE=InnoDB;

-- Certificates
CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  cohort_id INT NULL,
  serial VARCHAR(255) NOT NULL UNIQUE,
  pdf_url VARCHAR(1024) NULL,
  hash_sha256 VARCHAR(255) NULL,
  issued_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cert_user(user_id),
  INDEX idx_cert_course(course_id),
  INDEX idx_cert_cohort(cohort_id),
  CONSTRAINT fk_cert_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_cert_course FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT fk_cert_cohort FOREIGN KEY (cohort_id) REFERENCES cohorts(id)
) ENGINE=InnoDB;

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  action VARCHAR(255) NOT NULL,
  metadata JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_audit_user(user_id),
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- Live Classes
CREATE TABLE IF NOT EXISTS live_classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NULL,
  cohort_id INT NULL,
  title VARCHAR(255) NOT NULL,
  start_at DATETIME NOT NULL,
  end_at DATETIME NULL,
  meeting_url VARCHAR(1024) NULL,
  recording_url VARCHAR(1024) NULL,
  capacity INT NULL,
  timezone VARCHAR(64) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_live_course(course_id),
  INDEX idx_live_cohort(cohort_id),
  CONSTRAINT fk_live_course FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT fk_live_cohort FOREIGN KEY (cohort_id) REFERENCES cohorts(id)
) ENGINE=InnoDB;

-- Challenges
CREATE TABLE IF NOT EXISTS challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NULL,
  lesson_id INT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  points INT NOT NULL DEFAULT 0,
  rules JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_chal_course(course_id),
  INDEX idx_chal_lesson(lesson_id),
  CONSTRAINT fk_chal_course FOREIGN KEY (course_id) REFERENCES courses(id),
  CONSTRAINT fk_chal_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id)
) ENGINE=InnoDB;

-- Challenge Submissions
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id INT NOT NULL,
  user_id INT NOT NULL,
  artifact_url VARCHAR(1024) NULL,
  score INT NOT NULL DEFAULT 0,
  status ENUM('SUBMITTED','REVIEWING','APPROVED','REJECTED') NOT NULL DEFAULT 'SUBMITTED',
  INDEX idx_cs_challenge(challenge_id),
  INDEX idx_cs_user(user_id),
  CONSTRAINT fk_cs_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id),
  CONSTRAINT fk_cs_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- User Points
CREATE TABLE IF NOT EXISTS user_points (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NULL,
  points INT NOT NULL DEFAULT 0,
  INDEX idx_up_user(user_id),
  INDEX idx_up_course(course_id),
  CONSTRAINT fk_up_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_up_course FOREIGN KEY (course_id) REFERENCES courses(id)
) ENGINE=InnoDB;

