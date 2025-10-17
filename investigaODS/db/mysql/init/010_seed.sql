-- Seed data for InvestigaODS database
-- This script populates the schema with realistic sample data that exercises
-- the main relationships across the platform. The statements are idempotent so
-- re-running the file will not duplicate rows when the database is reused.

USE investigaods;

-- -------------------------------------------------------------
-- Membership plans
-- -------------------------------------------------------------
INSERT INTO membership_plans (code, name, features, status, created_at, updated_at)
SELECT 'BASIC', 'Plan Básico', JSON_OBJECT('live', FALSE, 'challenges', FALSE), TRUE, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM membership_plans WHERE code = 'BASIC');

INSERT INTO membership_plans (code, name, features, status, created_at, updated_at)
SELECT 'PRO', 'Plan Profesional', JSON_OBJECT('live', TRUE, 'challenges', TRUE), TRUE, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM membership_plans WHERE code = 'PRO');

SET @plan_basic_id = (SELECT id FROM membership_plans WHERE code = 'BASIC');
SET @plan_pro_id = (SELECT id FROM membership_plans WHERE code = 'PRO');

-- -------------------------------------------------------------
-- Users: administrators, instructors and students
-- -------------------------------------------------------------
INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'admin.ana@example.com', '$2b$10$gZbJz1CEr7z3Gf0nwe3ZKON5I1lWop0R5Y4Oz0xsfuEsU9MuquA8m', 'Ana', 'Administrador', 'ADMIN', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin.ana@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'admin.jose@example.com', '$2b$10$gZbJz1CEr7z3Gf0nwe3ZKON5I1lWop0R5Y4Oz0xsfuEsU9MuquA8m', 'José', 'Supervisor', 'ADMIN', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin.jose@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'instructor.lucia@example.com', '$2b$10$IMhW7c9bB7u3q5eS9gXcU.1HcW35utlDJjhDo9oGHaN0POfd/9l8a', 'Lucía', 'Rojas', 'INSTRUCTOR', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'instructor.lucia@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'instructor.mateo@example.com', '$2b$10$IMhW7c9bB7u3q5eS9gXcU.1HcW35utlDJjhDo9oGHaN0POfd/9l8a', 'Mateo', 'Silva', 'INSTRUCTOR', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'instructor.mateo@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'instructor.valentina@example.com', '$2b$10$IMhW7c9bB7u3q5eS9gXcU.1HcW35utlDJjhDo9oGHaN0POfd/9l8a', 'Valentina', 'Torres', 'INSTRUCTOR', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'instructor.valentina@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'alumno.diego@example.com', '$2b$10$YtQniFlq2YteKZ1mK25kAu1n6GvE9vDGaJ8K7XlJxrXq8P7KfS9Ha', 'Diego', 'Cano', 'STUDENT', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'alumno.diego@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'alumna.emilia@example.com', '$2b$10$YtQniFlq2YteKZ1mK25kAu1n6GvE9vDGaJ8K7XlJxrXq8P7KfS9Ha', 'Emilia', 'Vega', 'STUDENT', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'alumna.emilia@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'alumno.javier@example.com', '$2b$10$YtQniFlq2YteKZ1mK25kAu1n6GvE9vDGaJ8K7XlJxrXq8P7KfS9Ha', 'Javier', 'Ortiz', 'STUDENT', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'alumno.javier@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'alumna.martina@example.com', '$2b$10$YtQniFlq2YteKZ1mK25kAu1n6GvE9vDGaJ8K7XlJxrXq8P7KfS9Ha', 'Martina', 'Paredes', 'STUDENT', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'alumna.martina@example.com');

INSERT INTO users (email, password_hash, first_name, last_name, role, created_at, updated_at)
SELECT 'alumno.santiago@example.com', '$2b$10$YtQniFlq2YteKZ1mK25kAu1n6GvE9vDGaJ8K7XlJxrXq8P7KfS9Ha', 'Santiago', 'Mejía', 'STUDENT', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'alumno.santiago@example.com');

SET @admin_ana_id = (SELECT id FROM users WHERE email = 'admin.ana@example.com');
SET @admin_jose_id = (SELECT id FROM users WHERE email = 'admin.jose@example.com');
SET @inst_lucia_id = (SELECT id FROM users WHERE email = 'instructor.lucia@example.com');
SET @inst_mateo_id = (SELECT id FROM users WHERE email = 'instructor.mateo@example.com');
SET @inst_valentina_id = (SELECT id FROM users WHERE email = 'instructor.valentina@example.com');
SET @student_diego_id = (SELECT id FROM users WHERE email = 'alumno.diego@example.com');
SET @student_emilia_id = (SELECT id FROM users WHERE email = 'alumna.emilia@example.com');
SET @student_javier_id = (SELECT id FROM users WHERE email = 'alumno.javier@example.com');
SET @student_martina_id = (SELECT id FROM users WHERE email = 'alumna.martina@example.com');
SET @student_santiago_id = (SELECT id FROM users WHERE email = 'alumno.santiago@example.com');

-- -------------------------------------------------------------
-- Subscriptions for instructors and students
-- -------------------------------------------------------------
INSERT INTO subscriptions (user_id, plan_id, start_at, end_at, status, created_at, updated_at)
SELECT @inst_lucia_id, @plan_pro_id, '2024-01-05', '2024-12-31', 'ACTIVE', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE user_id = @inst_lucia_id AND status = 'ACTIVE');

INSERT INTO subscriptions (user_id, plan_id, start_at, end_at, status, created_at, updated_at)
SELECT @inst_mateo_id, @plan_pro_id, '2024-02-01', '2024-12-31', 'ACTIVE', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE user_id = @inst_mateo_id AND status = 'ACTIVE');

INSERT INTO subscriptions (user_id, plan_id, start_at, end_at, status, created_at, updated_at)
SELECT @inst_valentina_id, @plan_pro_id, '2024-03-10', '2024-12-31', 'ACTIVE', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE user_id = @inst_valentina_id AND status = 'ACTIVE');

INSERT INTO subscriptions (user_id, plan_id, start_at, end_at, status, created_at, updated_at)
SELECT @student_diego_id, @plan_basic_id, '2024-01-15', NULL, 'ACTIVE', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE user_id = @student_diego_id AND status = 'ACTIVE');

INSERT INTO subscriptions (user_id, plan_id, start_at, end_at, status, created_at, updated_at)
SELECT @student_emilia_id, @plan_basic_id, '2024-01-15', NULL, 'ACTIVE', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE user_id = @student_emilia_id AND status = 'ACTIVE');

INSERT INTO subscriptions (user_id, plan_id, start_at, end_at, status, created_at, updated_at)
SELECT @student_javier_id, @plan_basic_id, '2024-01-15', NULL, 'ACTIVE', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE user_id = @student_javier_id AND status = 'ACTIVE');

INSERT INTO subscriptions (user_id, plan_id, start_at, end_at, status, created_at, updated_at)
SELECT @student_martina_id, @plan_basic_id, '2024-01-15', NULL, 'ACTIVE', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE user_id = @student_martina_id AND status = 'ACTIVE');

INSERT INTO subscriptions (user_id, plan_id, start_at, end_at, status, created_at, updated_at)
SELECT @student_santiago_id, @plan_basic_id, '2024-01-15', NULL, 'ACTIVE', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM subscriptions WHERE user_id = @student_santiago_id AND status = 'ACTIVE');

-- -------------------------------------------------------------
-- Course catalog
-- -------------------------------------------------------------
INSERT INTO courses (owner_id, title, slug, summary, description, thumbnail_url, level, language, visibility, modality, tier_required, has_certificate, supports_live, supports_challenges, created_at, updated_at)
SELECT @inst_lucia_id, 'Introducción a los ODS', 'intro-ods', 'Conoce los Objetivos de Desarrollo Sostenible.', 'Curso introductorio para comprender los fundamentos de los ODS.', 'https://example.com/thumbs/intro-ods.jpg', 'Básico', 'es', 'PUBLIC', 'SELF_PACED', 'FREE', TRUE, TRUE, TRUE, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'intro-ods');

INSERT INTO courses (owner_id, title, slug, summary, description, thumbnail_url, level, language, visibility, modality, tier_required, has_certificate, supports_live, supports_challenges, created_at, updated_at)
SELECT @inst_lucia_id, 'Gestión de Proyectos Sostenibles', 'gestion-proyectos-sostenibles', 'Planifica y ejecuta proyectos alineados a los ODS.', 'Curso avanzado para gestionar proyectos con enfoque sostenible.', 'https://example.com/thumbs/gestion-proyectos.jpg', 'Avanzado', 'es', 'PUBLIC', 'GUIDED', 'PRO', TRUE, TRUE, TRUE, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'gestion-proyectos-sostenibles');

INSERT INTO courses (owner_id, title, slug, summary, description, thumbnail_url, level, language, visibility, modality, tier_required, has_certificate, supports_live, supports_challenges, created_at, updated_at)
SELECT @inst_mateo_id, 'Educación Ambiental para Docentes', 'educacion-ambiental-docentes', 'Recursos para integrar la educación ambiental.', 'Estrategias pedagógicas para incorporar los ODS en el aula.', 'https://example.com/thumbs/educacion-ambiental.jpg', 'Intermedio', 'es', 'PUBLIC', 'SELF_PACED', 'FREE', TRUE, TRUE, TRUE, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'educacion-ambiental-docentes');

INSERT INTO courses (owner_id, title, slug, summary, description, thumbnail_url, level, language, visibility, modality, tier_required, has_certificate, supports_live, supports_challenges, created_at, updated_at)
SELECT @inst_mateo_id, 'Finanzas Verdes y Responsables', 'finanzas-verdes', 'Aprende a financiar iniciativas sostenibles.', 'Analiza instrumentos financieros que impulsan proyectos verdes.', 'https://example.com/thumbs/finanzas-verdes.jpg', 'Avanzado', 'es', 'PUBLIC', 'GUIDED', 'PRO', TRUE, TRUE, TRUE, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'finanzas-verdes');

INSERT INTO courses (owner_id, title, slug, summary, description, thumbnail_url, level, language, visibility, modality, tier_required, has_certificate, supports_live, supports_challenges, created_at, updated_at)
SELECT @inst_valentina_id, 'Innovación Social', 'innovacion-social', 'Casos prácticos de innovación para los ODS.', 'Herramientas para crear soluciones sociales sostenibles.', 'https://example.com/thumbs/innovacion-social.jpg', 'Intermedio', 'es', 'PUBLIC', 'SELF_PACED', 'FREE', TRUE, TRUE, TRUE, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'innovacion-social');

INSERT INTO courses (owner_id, title, slug, summary, description, thumbnail_url, level, language, visibility, modality, tier_required, has_certificate, supports_live, supports_challenges, created_at, updated_at)
SELECT @inst_valentina_id, 'Economía Circular Aplicada', 'economia-circular', 'Diseña modelos de negocio circulares.', 'Profundiza en estrategias para reducir, reutilizar y reciclar.', 'https://example.com/thumbs/economia-circular.jpg', 'Avanzado', 'es', 'PUBLIC', 'GUIDED', 'PRO', TRUE, TRUE, TRUE, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'economia-circular');

SET @course_intro_ods = (SELECT id FROM courses WHERE slug = 'intro-ods');
SET @course_gestion = (SELECT id FROM courses WHERE slug = 'gestion-proyectos-sostenibles');
SET @course_educacion = (SELECT id FROM courses WHERE slug = 'educacion-ambiental-docentes');
SET @course_finanzas = (SELECT id FROM courses WHERE slug = 'finanzas-verdes');
SET @course_innovacion = (SELECT id FROM courses WHERE slug = 'innovacion-social');
SET @course_economia = (SELECT id FROM courses WHERE slug = 'economia-circular');

-- -------------------------------------------------------------
-- Tags and course associations
-- -------------------------------------------------------------
INSERT INTO tags (name)
SELECT 'ODS'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'ODS');

INSERT INTO tags (name)
SELECT 'Sostenibilidad'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Sostenibilidad');

INSERT INTO tags (name)
SELECT 'Innovación'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Innovación');

INSERT INTO tags (name)
SELECT 'Educación'
WHERE NOT EXISTS (SELECT 1 FROM tags WHERE name = 'Educación');

SET @tag_ods = (SELECT id FROM tags WHERE name = 'ODS');
SET @tag_sostenibilidad = (SELECT id FROM tags WHERE name = 'Sostenibilidad');
SET @tag_innovacion = (SELECT id FROM tags WHERE name = 'Innovación');
SET @tag_educacion = (SELECT id FROM tags WHERE name = 'Educación');

INSERT INTO course_tags (course_id, tag_id)
SELECT @course_intro_ods, @tag_ods
WHERE NOT EXISTS (SELECT 1 FROM course_tags WHERE course_id = @course_intro_ods AND tag_id = @tag_ods);

INSERT INTO course_tags (course_id, tag_id)
SELECT @course_intro_ods, @tag_educacion
WHERE NOT EXISTS (SELECT 1 FROM course_tags WHERE course_id = @course_intro_ods AND tag_id = @tag_educacion);

INSERT INTO course_tags (course_id, tag_id)
SELECT @course_gestion, @tag_sostenibilidad
WHERE NOT EXISTS (SELECT 1 FROM course_tags WHERE course_id = @course_gestion AND tag_id = @tag_sostenibilidad);

INSERT INTO course_tags (course_id, tag_id)
SELECT @course_gestion, @tag_innovacion
WHERE NOT EXISTS (SELECT 1 FROM course_tags WHERE course_id = @course_gestion AND tag_id = @tag_innovacion);

INSERT INTO course_tags (course_id, tag_id)
SELECT @course_educacion, @tag_educacion
WHERE NOT EXISTS (SELECT 1 FROM course_tags WHERE course_id = @course_educacion AND tag_id = @tag_educacion);

INSERT INTO course_tags (course_id, tag_id)
SELECT @course_finanzas, @tag_sostenibilidad
WHERE NOT EXISTS (SELECT 1 FROM course_tags WHERE course_id = @course_finanzas AND tag_id = @tag_sostenibilidad);

INSERT INTO course_tags (course_id, tag_id)
SELECT @course_innovacion, @tag_innovacion
WHERE NOT EXISTS (SELECT 1 FROM course_tags WHERE course_id = @course_innovacion AND tag_id = @tag_innovacion);

INSERT INTO course_tags (course_id, tag_id)
SELECT @course_economia, @tag_sostenibilidad
WHERE NOT EXISTS (SELECT 1 FROM course_tags WHERE course_id = @course_economia AND tag_id = @tag_sostenibilidad);

-- -------------------------------------------------------------
-- Course modules and lessons (part 1)
-- -------------------------------------------------------------
SET @now = NOW();

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_intro_ods, 1, 'Fundamentos de los ODS', 'Visión general de los 17 objetivos.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_intro_ods AND index = 1);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_intro_ods, 2, 'Acción Local', 'Aplicaciones prácticas en comunidades.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_intro_ods AND index = 2);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_gestion, 1, 'Diseño de Proyectos', 'Estructura tu propuesta sostenible.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_gestion AND index = 1);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_gestion, 2, 'Monitoreo y Evaluación', 'Define indicadores y métricas.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_gestion AND index = 2);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_educacion, 1, 'Sensibilización Ambiental', 'Dinámicas para el aula.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_educacion AND index = 1);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_educacion, 2, 'Diseño Curricular', 'Integración transversal de los ODS.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_educacion AND index = 2);
INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_finanzas, 1, 'Instrumentos Financieros', 'Bonos verdes y préstamos sostenibles.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_finanzas AND index = 1);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_finanzas, 2, 'Evaluación de Impacto', 'Métricas ambientales y sociales.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_finanzas AND index = 2);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_innovacion, 1, 'Retos Sociales', 'Identificación de problemas prioritarios.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_innovacion AND index = 1);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_innovacion, 2, 'Prototipado', 'Validación rápida de soluciones.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_innovacion AND index = 2);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_economia, 1, 'Principios Circulares', 'Repensar el ciclo de vida.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_economia AND index = 1);

INSERT INTO course_modules (course_id, index, title, summary, created_at, updated_at)
SELECT @course_economia, 2, 'Implementación Empresarial', 'Casos de estudio latinoamericanos.', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM course_modules WHERE course_id = @course_economia AND index = 2);

SET @mod_intro_1 = (SELECT id FROM course_modules WHERE course_id = @course_intro_ods AND index = 1);
SET @mod_intro_2 = (SELECT id FROM course_modules WHERE course_id = @course_intro_ods AND index = 2);
SET @mod_gestion_1 = (SELECT id FROM course_modules WHERE course_id = @course_gestion AND index = 1);
SET @mod_gestion_2 = (SELECT id FROM course_modules WHERE course_id = @course_gestion AND index = 2);
SET @mod_educacion_1 = (SELECT id FROM course_modules WHERE course_id = @course_educacion AND index = 1);
SET @mod_educacion_2 = (SELECT id FROM course_modules WHERE course_id = @course_educacion AND index = 2);
SET @mod_finanzas_1 = (SELECT id FROM course_modules WHERE course_id = @course_finanzas AND index = 1);
SET @mod_finanzas_2 = (SELECT id FROM course_modules WHERE course_id = @course_finanzas AND index = 2);
SET @mod_innovacion_1 = (SELECT id FROM course_modules WHERE course_id = @course_innovacion AND index = 1);
SET @mod_innovacion_2 = (SELECT id FROM course_modules WHERE course_id = @course_innovacion AND index = 2);
SET @mod_economia_1 = (SELECT id FROM course_modules WHERE course_id = @course_economia AND index = 1);
SET @mod_economia_2 = (SELECT id FROM course_modules WHERE course_id = @course_economia AND index = 2);

-- -------------------------------------------------------------
-- Lessons (two per module)
-- -------------------------------------------------------------
INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_intro_1, 1, 'Historia de los ODS', 'Lección sobre el origen de los ODS.', 'https://videos.example.com/ods1', 15, JSON_ARRAY('Guía PDF', 'Infografía'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_intro_1 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_intro_1, 2, 'Estructura de los Objetivos', 'Descripción de las metas asociadas.', 'https://videos.example.com/ods2', 18, JSON_ARRAY('Mapa conceptual'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_intro_1 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_intro_2, 1, 'Plan de Acción Local', 'Cómo priorizar acciones en territorio.', 'https://videos.example.com/ods3', 20, JSON_ARRAY('Plantilla Excel'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_intro_2 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_intro_2, 2, 'Medición de Impacto', 'Indicadores claves de seguimiento.', 'https://videos.example.com/ods4', 22, JSON_ARRAY('Checklist de indicadores'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_intro_2 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_gestion_1, 1, 'Marco Lógico', 'Construcción de matriz de resultados.', 'https://videos.example.com/proyectos1', 16, JSON_ARRAY('Plantilla marco lógico'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_gestion_1 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_gestion_1, 2, 'Identificación de Actores', 'Mapeo de stakeholders clave.', 'https://videos.example.com/proyectos2', 18, JSON_ARRAY('Formato de entrevistas'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_gestion_1 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_gestion_2, 1, 'Indicadores SMART', 'Definición de métricas medibles.', 'https://videos.example.com/proyectos3', 19, JSON_ARRAY('Ejemplos SMART'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_gestion_2 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_gestion_2, 2, 'Reportes de Avance', 'Buenas prácticas de monitoreo.', 'https://videos.example.com/proyectos4', 21, JSON_ARRAY('Plantilla de reporte'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_gestion_2 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_educacion_1, 1, 'Sensibilización estudiantil', 'Actividades lúdicas de introducción.', 'https://videos.example.com/educacion1', 14, JSON_ARRAY('Juego de cartas'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_educacion_1 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_educacion_1, 2, 'Comunicación con familias', 'Impulsa compromisos en casa.', 'https://videos.example.com/educacion2', 17, JSON_ARRAY('Carta modelo'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_educacion_1 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_educacion_2, 1, 'Integración curricular', 'Planifica unidades temáticas.', 'https://videos.example.com/educacion3', 19, JSON_ARRAY('Plantilla de unidad'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_educacion_2 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_educacion_2, 2, 'Evaluación formativa', 'Instrumentos de evaluación continua.', 'https://videos.example.com/educacion4', 20, JSON_ARRAY('Rúbrica ejemplo'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_educacion_2 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_finanzas_1, 1, 'Bonos verdes', 'Casos de financiamiento ambiental.', 'https://videos.example.com/finanzas1', 18, JSON_ARRAY('Informe BID'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_finanzas_1 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_finanzas_1, 2, 'Banca ética', 'Principios de inversión responsable.', 'https://videos.example.com/finanzas2', 22, JSON_ARRAY('Lista de bancos éticos'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_finanzas_1 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_finanzas_2, 1, 'Indicadores ESG', 'Medición de desempeño ambiental.', 'https://videos.example.com/finanzas3', 20, JSON_ARRAY('Checklist ESG'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_finanzas_2 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_finanzas_2, 2, 'Reporte integrado', 'Integración de información financiera.', 'https://videos.example.com/finanzas4', 24, JSON_ARRAY('Modelo de reporte'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_finanzas_2 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_innovacion_1, 1, 'Mapeo de retos', 'Identifica desafíos sociales prioritarios.', 'https://videos.example.com/innovacion1', 16, JSON_ARRAY('Guía de mapeo'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_innovacion_1 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_innovacion_1, 2, 'Co-creación', 'Técnicas participativas.', 'https://videos.example.com/innovacion2', 18, JSON_ARRAY('Plantilla canvas'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_innovacion_1 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_innovacion_2, 1, 'Prototipado rápido', 'Itera soluciones con usuarios.', 'https://videos.example.com/innovacion3', 19, JSON_ARRAY('Herramientas prototipo'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_innovacion_2 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_innovacion_2, 2, 'Escalamiento', 'Modelos para crecer sostenidamente.', 'https://videos.example.com/innovacion4', 21, JSON_ARRAY('Caso de estudio'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_innovacion_2 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_economia_1, 1, 'Principios circulares', 'Economía circular en la práctica.', 'https://videos.example.com/economia1', 17, JSON_ARRAY('Guía práctica'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_economia_1 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_economia_1, 2, 'Diseño de productos', 'Materiales y rediseño.', 'https://videos.example.com/economia2', 19, JSON_ARRAY('Plantilla de ciclo de vida'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_economia_1 AND `index` = 2);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_economia_2, 1, 'Modelos de negocio circulares', 'Casos exitosos en la región.', 'https://videos.example.com/economia3', 20, JSON_ARRAY('Casos destacados'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_economia_2 AND `index` = 1);

INSERT INTO lessons (module_id, `index`, title, content, video_url, duration_min, resources, created_at, updated_at)
SELECT @mod_economia_2, 2, 'Medición y KPIs', 'Indicadores para evaluar resultados.', 'https://videos.example.com/economia4', 23, JSON_ARRAY('Dashboard ejemplo'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM lessons WHERE module_id = @mod_economia_2 AND `index` = 2);

SET @lesson_intro_historia = (SELECT id FROM lessons WHERE module_id = @mod_intro_1 AND `index` = 1);
SET @lesson_intro_estructura = (SELECT id FROM lessons WHERE module_id = @mod_intro_1 AND `index` = 2);
SET @lesson_gestion_marco = (SELECT id FROM lessons WHERE module_id = @mod_gestion_1 AND `index` = 1);
SET @lesson_educacion_sensibilizacion = (SELECT id FROM lessons WHERE module_id = @mod_educacion_1 AND `index` = 1);
SET @lesson_finanzas_bonos = (SELECT id FROM lessons WHERE module_id = @mod_finanzas_1 AND `index` = 1);
SET @lesson_innovacion_mapeo = (SELECT id FROM lessons WHERE module_id = @mod_innovacion_1 AND `index` = 1);
SET @lesson_economia_principios = (SELECT id FROM lessons WHERE module_id = @mod_economia_1 AND `index` = 1);
-- -------------------------------------------------------------
-- Quizzes, questions and options
-- -------------------------------------------------------------
INSERT INTO quizzes (course_id, lesson_id, title, type, pass_score, attempt_limit, time_limit_sec, weight, created_at, updated_at)
SELECT @course_intro_ods, @lesson_intro_historia, 'Quiz Intro ODS', 'QUIZ', 70, 3, 600, 20, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM quizzes WHERE title = 'Quiz Intro ODS');

INSERT INTO quizzes (course_id, lesson_id, title, type, pass_score, attempt_limit, time_limit_sec, weight, created_at, updated_at)
SELECT @course_gestion, @lesson_gestion_marco, 'Quiz Gestión Sostenible', 'QUIZ', 75, 3, 900, 25, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM quizzes WHERE title = 'Quiz Gestión Sostenible');

INSERT INTO quizzes (course_id, lesson_id, title, type, pass_score, attempt_limit, time_limit_sec, weight, created_at, updated_at)
SELECT @course_educacion, @lesson_educacion_sensibilizacion, 'Quiz Educación Ambiental', 'QUIZ', 60, 5, 600, 15, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM quizzes WHERE title = 'Quiz Educación Ambiental');

INSERT INTO quizzes (course_id, lesson_id, title, type, pass_score, attempt_limit, time_limit_sec, weight, created_at, updated_at)
SELECT @course_finanzas, @lesson_finanzas_bonos, 'Quiz Finanzas Verdes', 'QUIZ', 80, 2, 1200, 30, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM quizzes WHERE title = 'Quiz Finanzas Verdes');

INSERT INTO quizzes (course_id, lesson_id, title, type, pass_score, attempt_limit, time_limit_sec, weight, created_at, updated_at)
SELECT @course_innovacion, @lesson_innovacion_mapeo, 'Quiz Innovación Social', 'QUIZ', 65, 4, 700, 20, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM quizzes WHERE title = 'Quiz Innovación Social');

INSERT INTO quizzes (course_id, lesson_id, title, type, pass_score, attempt_limit, time_limit_sec, weight, created_at, updated_at)
SELECT @course_economia, @lesson_economia_principios, 'Quiz Economía Circular', 'QUIZ', 70, 3, 800, 25, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM quizzes WHERE title = 'Quiz Economía Circular');

SET @quiz_intro = (SELECT id FROM quizzes WHERE title = 'Quiz Intro ODS');
SET @quiz_gestion = (SELECT id FROM quizzes WHERE title = 'Quiz Gestión Sostenible');
SET @quiz_educacion = (SELECT id FROM quizzes WHERE title = 'Quiz Educación Ambiental');
SET @quiz_finanzas = (SELECT id FROM quizzes WHERE title = 'Quiz Finanzas Verdes');
SET @quiz_innovacion = (SELECT id FROM quizzes WHERE title = 'Quiz Innovación Social');
SET @quiz_economia = (SELECT id FROM quizzes WHERE title = 'Quiz Economía Circular');

INSERT INTO questions (quiz_id, type, prompt, points, metadata, created_at, updated_at)
SELECT @quiz_intro, 'MCQ', '¿Cuántos Objetivos de Desarrollo Sostenible existen?', 10, NULL, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE quiz_id = @quiz_intro AND prompt LIKE '¿Cuántos Objetivos%');

INSERT INTO questions (quiz_id, type, prompt, points, metadata, created_at, updated_at)
SELECT @quiz_intro, 'TRUE_FALSE', 'Los ODS fueron aprobados en 2015.', 10, NULL, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE quiz_id = @quiz_intro AND prompt LIKE 'Los ODS fueron aprobados%');

INSERT INTO questions (quiz_id, type, prompt, points, metadata, created_at, updated_at)
SELECT @quiz_gestion, 'MCQ', '¿Qué componente NO pertenece al marco lógico?', 10, NULL, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE quiz_id = @quiz_gestion AND prompt LIKE '¿Qué componente NO%');

INSERT INTO questions (quiz_id, type, prompt, points, metadata, created_at, updated_at)
SELECT @quiz_gestion, 'OPEN', 'Describe un indicador SMART relevante para tu proyecto.', 15, NULL, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE quiz_id = @quiz_gestion AND prompt LIKE 'Describe un indicador%');

INSERT INTO questions (quiz_id, type, prompt, points, metadata, created_at, updated_at)
SELECT @quiz_educacion, 'MCQ', 'Selecciona una actividad de sensibilización efectiva.', 10, NULL, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE quiz_id = @quiz_educacion AND prompt LIKE 'Selecciona una actividad%');

INSERT INTO questions (quiz_id, type, prompt, points, metadata, created_at, updated_at)
SELECT @quiz_finanzas, 'MCQ', '¿Qué instrumento financia proyectos sostenibles?', 10, NULL, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE quiz_id = @quiz_finanzas AND prompt LIKE '¿Qué instrumento%');

INSERT INTO questions (quiz_id, type, prompt, points, metadata, created_at, updated_at)
SELECT @quiz_innovacion, 'MCQ', 'Una herramienta útil para co-crear soluciones es:', 10, NULL, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE quiz_id = @quiz_innovacion AND prompt LIKE 'Una herramienta útil%');

INSERT INTO questions (quiz_id, type, prompt, points, metadata, created_at, updated_at)
SELECT @quiz_economia, 'MCQ', 'La economía circular busca principalmente:', 10, NULL, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM questions WHERE quiz_id = @quiz_economia AND prompt LIKE 'La economía circular busca%');

SET @question_intro_ods = (SELECT id FROM questions WHERE quiz_id = @quiz_intro AND prompt LIKE '¿Cuántos Objetivos%');
SET @question_intro_year = (SELECT id FROM questions WHERE quiz_id = @quiz_intro AND prompt LIKE 'Los ODS fueron aprobados%');
SET @question_gestion_marco = (SELECT id FROM questions WHERE quiz_id = @quiz_gestion AND prompt LIKE '¿Qué componente NO%');
SET @question_gestion_open = (SELECT id FROM questions WHERE quiz_id = @quiz_gestion AND type = 'OPEN' LIMIT 1);
SET @question_educacion = (SELECT id FROM questions WHERE quiz_id = @quiz_educacion AND prompt LIKE 'Selecciona una actividad%');
SET @question_finanzas = (SELECT id FROM questions WHERE quiz_id = @quiz_finanzas AND prompt LIKE '¿Qué instrumento%');
SET @question_innovacion = (SELECT id FROM questions WHERE quiz_id = @quiz_innovacion AND prompt LIKE 'Una herramienta útil%');
SET @question_economia = (SELECT id FROM questions WHERE quiz_id = @quiz_economia AND prompt LIKE 'La economía circular busca%');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_intro_ods, '17 objetivos', TRUE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_intro_ods AND text = '17 objetivos');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_intro_ods, '12 objetivos', FALSE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_intro_ods AND text = '12 objetivos');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_intro_year, 'Verdadero', TRUE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_intro_year AND text = 'Verdadero');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_intro_year, 'Falso', FALSE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_intro_year AND text = 'Falso');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_gestion_marco, 'Presupuesto detallado', FALSE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_gestion_marco AND text = 'Presupuesto detallado');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_gestion_marco, 'Supuestos críticos', FALSE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_gestion_marco AND text = 'Supuestos críticos');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_gestion_marco, 'Lista de chequeo administrativa', TRUE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_gestion_marco AND text = 'Lista de chequeo administrativa');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_educacion, 'Jornada de limpieza comunitaria', TRUE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_educacion AND text = 'Jornada de limpieza comunitaria');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_educacion, 'Clase magistral sin participación', FALSE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_educacion AND text = 'Clase magistral sin participación');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_finanzas, 'Bonos verdes', TRUE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_finanzas AND text = 'Bonos verdes');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_finanzas, 'Créditos de alto interés', FALSE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_finanzas AND text = 'Créditos de alto interés');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_innovacion, 'Taller de design thinking', TRUE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_innovacion AND text = 'Taller de design thinking');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_innovacion, 'Monólogo unidireccional', FALSE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_innovacion AND text = 'Monólogo unidireccional');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_economia, 'Maximizar la reutilización de recursos', TRUE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_economia AND text = 'Maximizar la reutilización de recursos');

INSERT INTO options (question_id, text, is_correct)
SELECT @question_economia, 'Incrementar la extracción de materias primas', FALSE
WHERE NOT EXISTS (SELECT 1 FROM options WHERE question_id = @question_economia AND text = 'Incrementar la extracción de materias primas');
-- -------------------------------------------------------------
-- Cohorts and enrollments
-- -------------------------------------------------------------
INSERT INTO cohorts (course_id, name, start_at, end_at, capacity, created_at, updated_at)
SELECT @course_intro_ods, 'Cohorte Enero', '2024-01-08 09:00:00', '2024-03-31 18:00:00', 50, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM cohorts WHERE course_id = @course_intro_ods AND name = 'Cohorte Enero');

INSERT INTO cohorts (course_id, name, start_at, end_at, capacity, created_at, updated_at)
SELECT @course_gestion, 'Cohorte Febrero', '2024-02-05 09:00:00', '2024-05-30 18:00:00', 40, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM cohorts WHERE course_id = @course_gestion AND name = 'Cohorte Febrero');

INSERT INTO cohorts (course_id, name, start_at, end_at, capacity, created_at, updated_at)
SELECT @course_educacion, 'Cohorte Marzo', '2024-03-04 09:00:00', '2024-04-30 18:00:00', 60, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM cohorts WHERE course_id = @course_educacion AND name = 'Cohorte Marzo');

INSERT INTO cohorts (course_id, name, start_at, end_at, capacity, created_at, updated_at)
SELECT @course_finanzas, 'Cohorte Abril', '2024-04-01 09:00:00', '2024-07-15 18:00:00', 35, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM cohorts WHERE course_id = @course_finanzas AND name = 'Cohorte Abril');

INSERT INTO cohorts (course_id, name, start_at, end_at, capacity, created_at, updated_at)
SELECT @course_innovacion, 'Cohorte Mayo', '2024-05-06 09:00:00', '2024-07-31 18:00:00', 45, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM cohorts WHERE course_id = @course_innovacion AND name = 'Cohorte Mayo');

INSERT INTO cohorts (course_id, name, start_at, end_at, capacity, created_at, updated_at)
SELECT @course_economia, 'Cohorte Junio', '2024-06-03 09:00:00', '2024-09-15 18:00:00', 30, @now, @now
WHERE NOT EXISTS (SELECT 1 FROM cohorts WHERE course_id = @course_economia AND name = 'Cohorte Junio');

SET @cohort_intro = (SELECT id FROM cohorts WHERE course_id = @course_intro_ods AND name = 'Cohorte Enero');
SET @cohort_gestion = (SELECT id FROM cohorts WHERE course_id = @course_gestion AND name = 'Cohorte Febrero');
SET @cohort_educacion = (SELECT id FROM cohorts WHERE course_id = @course_educacion AND name = 'Cohorte Marzo');
SET @cohort_finanzas = (SELECT id FROM cohorts WHERE course_id = @course_finanzas AND name = 'Cohorte Abril');
SET @cohort_innovacion = (SELECT id FROM cohorts WHERE course_id = @course_innovacion AND name = 'Cohorte Mayo');
SET @cohort_economia = (SELECT id FROM cohorts WHERE course_id = @course_economia AND name = 'Cohorte Junio');

-- Enroll students in every course
INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_diego_id, @course_intro_ods, @cohort_intro, 'ACTIVE', '2024-01-09 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_diego_id AND course_id = @course_intro_ods);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_emilia_id, @course_intro_ods, @cohort_intro, 'ACTIVE', '2024-01-09 10:05:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_emilia_id AND course_id = @course_intro_ods);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_javier_id, @course_intro_ods, @cohort_intro, 'ACTIVE', '2024-01-09 10:10:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_javier_id AND course_id = @course_intro_ods);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_martina_id, @course_intro_ods, @cohort_intro, 'ACTIVE', '2024-01-09 10:15:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_martina_id AND course_id = @course_intro_ods);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_santiago_id, @course_intro_ods, @cohort_intro, 'ACTIVE', '2024-01-09 10:20:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_santiago_id AND course_id = @course_intro_ods);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_diego_id, @course_gestion, @cohort_gestion, 'ACTIVE', '2024-02-06 09:30:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_diego_id AND course_id = @course_gestion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_emilia_id, @course_gestion, @cohort_gestion, 'ACTIVE', '2024-02-06 09:35:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_emilia_id AND course_id = @course_gestion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_javier_id, @course_gestion, @cohort_gestion, 'ACTIVE', '2024-02-06 09:40:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_javier_id AND course_id = @course_gestion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_martina_id, @course_gestion, @cohort_gestion, 'ACTIVE', '2024-02-06 09:45:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_martina_id AND course_id = @course_gestion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_santiago_id, @course_gestion, @cohort_gestion, 'ACTIVE', '2024-02-06 09:50:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_santiago_id AND course_id = @course_gestion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_diego_id, @course_educacion, @cohort_educacion, 'ACTIVE', '2024-03-05 11:00:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_diego_id AND course_id = @course_educacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_emilia_id, @course_educacion, @cohort_educacion, 'ACTIVE', '2024-03-05 11:05:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_emilia_id AND course_id = @course_educacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_javier_id, @course_educacion, @cohort_educacion, 'ACTIVE', '2024-03-05 11:10:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_javier_id AND course_id = @course_educacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_martina_id, @course_educacion, @cohort_educacion, 'ACTIVE', '2024-03-05 11:15:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_martina_id AND course_id = @course_educacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_santiago_id, @course_educacion, @cohort_educacion, 'ACTIVE', '2024-03-05 11:20:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_santiago_id AND course_id = @course_educacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_diego_id, @course_finanzas, @cohort_finanzas, 'ACTIVE', '2024-04-02 12:00:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_diego_id AND course_id = @course_finanzas);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_emilia_id, @course_finanzas, @cohort_finanzas, 'ACTIVE', '2024-04-02 12:05:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_emilia_id AND course_id = @course_finanzas);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_javier_id, @course_finanzas, @cohort_finanzas, 'ACTIVE', '2024-04-02 12:10:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_javier_id AND course_id = @course_finanzas);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_martina_id, @course_finanzas, @cohort_finanzas, 'ACTIVE', '2024-04-02 12:15:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_martina_id AND course_id = @course_finanzas);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_santiago_id, @course_finanzas, @cohort_finanzas, 'ACTIVE', '2024-04-02 12:20:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_santiago_id AND course_id = @course_finanzas);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_diego_id, @course_innovacion, @cohort_innovacion, 'ACTIVE', '2024-05-07 09:30:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_diego_id AND course_id = @course_innovacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_emilia_id, @course_innovacion, @cohort_innovacion, 'ACTIVE', '2024-05-07 09:35:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_emilia_id AND course_id = @course_innovacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_javier_id, @course_innovacion, @cohort_innovacion, 'ACTIVE', '2024-05-07 09:40:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_javier_id AND course_id = @course_innovacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_martina_id, @course_innovacion, @cohort_innovacion, 'ACTIVE', '2024-05-07 09:45:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_martina_id AND course_id = @course_innovacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_santiago_id, @course_innovacion, @cohort_innovacion, 'ACTIVE', '2024-05-07 09:50:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_santiago_id AND course_id = @course_innovacion);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_diego_id, @course_economia, @cohort_economia, 'ACTIVE', '2024-06-04 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_diego_id AND course_id = @course_economia);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_emilia_id, @course_economia, @cohort_economia, 'ACTIVE', '2024-06-04 10:05:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_emilia_id AND course_id = @course_economia);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_javier_id, @course_economia, @cohort_economia, 'ACTIVE', '2024-06-04 10:10:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_javier_id AND course_id = @course_economia);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_martina_id, @course_economia, @cohort_economia, 'ACTIVE', '2024-06-04 10:15:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_martina_id AND course_id = @course_economia);

INSERT INTO enrollments (user_id, course_id, cohort_id, status, enrolled_at)
SELECT @student_santiago_id, @course_economia, @cohort_economia, 'ACTIVE', '2024-06-04 10:20:00'
WHERE NOT EXISTS (SELECT 1 FROM enrollments WHERE user_id = @student_santiago_id AND course_id = @course_economia);
-- -------------------------------------------------------------
-- Lesson progress samples
-- -------------------------------------------------------------
INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_diego_id, @lesson_intro_historia, TRUE, 100, '2024-01-10 15:00:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_diego_id AND lesson_id = @lesson_intro_historia);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_emilia_id, @lesson_intro_historia, TRUE, 95, '2024-01-10 15:05:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_emilia_id AND lesson_id = @lesson_intro_historia);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_javier_id, @lesson_intro_historia, FALSE, 60, '2024-01-10 15:10:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_javier_id AND lesson_id = @lesson_intro_historia);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_martina_id, @lesson_intro_historia, TRUE, 100, '2024-01-10 15:15:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_martina_id AND lesson_id = @lesson_intro_historia);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_santiago_id, @lesson_intro_historia, TRUE, 85, '2024-01-10 15:20:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_santiago_id AND lesson_id = @lesson_intro_historia);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_diego_id, @lesson_gestion_marco, TRUE, 100, '2024-02-07 11:00:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_diego_id AND lesson_id = @lesson_gestion_marco);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_emilia_id, @lesson_gestion_marco, TRUE, 90, '2024-02-07 11:05:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_emilia_id AND lesson_id = @lesson_gestion_marco);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_javier_id, @lesson_gestion_marco, FALSE, 55, '2024-02-07 11:10:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_javier_id AND lesson_id = @lesson_gestion_marco);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_martina_id, @lesson_gestion_marco, TRUE, 100, '2024-02-07 11:15:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_martina_id AND lesson_id = @lesson_gestion_marco);

INSERT INTO lesson_progress (user_id, lesson_id, completed, progress_pct, last_viewed_at)
SELECT @student_santiago_id, @lesson_gestion_marco, TRUE, 80, '2024-02-07 11:20:00'
WHERE NOT EXISTS (SELECT 1 FROM lesson_progress WHERE user_id = @student_santiago_id AND lesson_id = @lesson_gestion_marco);

-- -------------------------------------------------------------
-- Attempts and answers
-- -------------------------------------------------------------
INSERT INTO attempts (quiz_id, user_id, started_at, submitted_at, score, status, created_at, updated_at)
SELECT @quiz_intro, @student_diego_id, '2024-01-12 14:00:00', '2024-01-12 14:10:00', 18, 'GRADED', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM attempts WHERE quiz_id = @quiz_intro AND user_id = @student_diego_id);

INSERT INTO attempts (quiz_id, user_id, started_at, submitted_at, score, status, created_at, updated_at)
SELECT @quiz_intro, @student_emilia_id, '2024-01-12 14:30:00', '2024-01-12 14:40:00', 20, 'GRADED', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM attempts WHERE quiz_id = @quiz_intro AND user_id = @student_emilia_id);

INSERT INTO attempts (quiz_id, user_id, started_at, submitted_at, score, status, created_at, updated_at)
SELECT @quiz_gestion, @student_diego_id, '2024-02-10 16:00:00', '2024-02-10 16:20:00', 20, 'GRADED', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM attempts WHERE quiz_id = @quiz_gestion AND user_id = @student_diego_id);

SET @attempt_diego_intro = (SELECT id FROM attempts WHERE quiz_id = @quiz_intro AND user_id = @student_diego_id);
SET @attempt_emilia_intro = (SELECT id FROM attempts WHERE quiz_id = @quiz_intro AND user_id = @student_emilia_id);
SET @attempt_diego_gestion = (SELECT id FROM attempts WHERE quiz_id = @quiz_gestion AND user_id = @student_diego_id);

INSERT INTO answers (attempt_id, question_id, option_id, open_text, is_correct, awarded_points)
SELECT @attempt_diego_intro, @question_intro_ods, (SELECT id FROM options WHERE question_id = @question_intro_ods AND is_correct = TRUE LIMIT 1), NULL, TRUE, 10
WHERE NOT EXISTS (SELECT 1 FROM answers WHERE attempt_id = @attempt_diego_intro AND question_id = @question_intro_ods);

INSERT INTO answers (attempt_id, question_id, option_id, open_text, is_correct, awarded_points)
SELECT @attempt_diego_intro, @question_intro_year, (SELECT id FROM options WHERE question_id = @question_intro_year AND is_correct = TRUE LIMIT 1), NULL, TRUE, 8
WHERE NOT EXISTS (SELECT 1 FROM answers WHERE attempt_id = @attempt_diego_intro AND question_id = @question_intro_year);

INSERT INTO answers (attempt_id, question_id, option_id, open_text, is_correct, awarded_points)
SELECT @attempt_emilia_intro, @question_intro_ods, (SELECT id FROM options WHERE question_id = @question_intro_ods AND is_correct = TRUE LIMIT 1), NULL, TRUE, 10
WHERE NOT EXISTS (SELECT 1 FROM answers WHERE attempt_id = @attempt_emilia_intro AND question_id = @question_intro_ods);

INSERT INTO answers (attempt_id, question_id, option_id, open_text, is_correct, awarded_points)
SELECT @attempt_emilia_intro, @question_intro_year, (SELECT id FROM options WHERE question_id = @question_intro_year AND is_correct = TRUE LIMIT 1), NULL, TRUE, 10
WHERE NOT EXISTS (SELECT 1 FROM answers WHERE attempt_id = @attempt_emilia_intro AND question_id = @question_intro_year);

INSERT INTO answers (attempt_id, question_id, option_id, open_text, is_correct, awarded_points)
SELECT @attempt_diego_gestion, @question_gestion_marco, (SELECT id FROM options WHERE question_id = @question_gestion_marco AND is_correct = TRUE LIMIT 1), NULL, TRUE, 10
WHERE NOT EXISTS (SELECT 1 FROM answers WHERE attempt_id = @attempt_diego_gestion AND question_id = @question_gestion_marco);

INSERT INTO answers (attempt_id, question_id, option_id, open_text, is_correct, awarded_points)
SELECT @attempt_diego_gestion, @question_gestion_open, NULL, 'Indicador SMART: Aumentar en 20% la participación comunitaria en 6 meses.', TRUE, 10
WHERE NOT EXISTS (SELECT 1 FROM answers WHERE attempt_id = @attempt_diego_gestion AND question_id = @question_gestion_open);
-- -------------------------------------------------------------
-- Certificates
-- -------------------------------------------------------------
INSERT INTO certificates (user_id, course_id, cohort_id, serial, pdf_url, hash_sha256, issued_at, created_at, updated_at)
SELECT @student_emilia_id, @course_intro_ods, @cohort_intro, 'CERT-ODS-0001', 'https://example.com/certificates/CERT-ODS-0001.pdf', 'hashcertods0001', '2024-03-31 12:00:00', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM certificates WHERE serial = 'CERT-ODS-0001');

INSERT INTO certificates (user_id, course_id, cohort_id, serial, pdf_url, hash_sha256, issued_at, created_at, updated_at)
SELECT @student_diego_id, @course_gestion, @cohort_gestion, 'CERT-GESTION-0001', 'https://example.com/certificates/CERT-GESTION-0001.pdf', 'hashcertgestion0001', '2024-05-30 12:00:00', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM certificates WHERE serial = 'CERT-GESTION-0001');

-- -------------------------------------------------------------
-- Audit logs
-- -------------------------------------------------------------
INSERT INTO audit_logs (user_id, action, metadata, created_at, updated_at)
SELECT @admin_ana_id, 'USER_CREATED', JSON_OBJECT('targetEmail', 'instructor.lucia@example.com'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM audit_logs WHERE action = 'USER_CREATED' AND JSON_EXTRACT(metadata, '$.targetEmail') = 'instructor.lucia@example.com');

INSERT INTO audit_logs (user_id, action, metadata, created_at, updated_at)
SELECT @admin_jose_id, 'COURSE_APPROVED', JSON_OBJECT('courseSlug', 'intro-ods'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM audit_logs WHERE action = 'COURSE_APPROVED' AND JSON_EXTRACT(metadata, '$.courseSlug') = 'intro-ods');

-- -------------------------------------------------------------
-- Live classes per cohort
-- -------------------------------------------------------------
INSERT INTO live_classes (course_id, cohort_id, title, start_at, end_at, meeting_url, recording_url, capacity, timezone, created_at, updated_at)
SELECT @course_intro_ods, @cohort_intro, 'Sesión en vivo: Introducción a los ODS', '2024-01-15 17:00:00', '2024-01-15 18:30:00', 'https://meet.example.com/ods', 'https://recordings.example.com/ods', 80, 'America/Lima', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM live_classes WHERE course_id = @course_intro_ods AND cohort_id = @cohort_intro);

INSERT INTO live_classes (course_id, cohort_id, title, start_at, end_at, meeting_url, recording_url, capacity, timezone, created_at, updated_at)
SELECT @course_gestion, @cohort_gestion, 'Sesión en vivo: Gestión de proyectos', '2024-02-12 17:00:00', '2024-02-12 18:30:00', 'https://meet.example.com/gestion', 'https://recordings.example.com/gestion', 60, 'America/Lima', @now, @now
WHERE NOT EXISTS (SELECT 1 FROM live_classes WHERE course_id = @course_gestion AND cohort_id = @cohort_gestion);

-- -------------------------------------------------------------
-- Challenges and submissions
-- -------------------------------------------------------------
INSERT INTO challenges (course_id, lesson_id, title, description, points, rules, created_at, updated_at)
SELECT @course_innovacion, @lesson_innovacion_mapeo, 'Desafío de innovación comunitaria', 'Propón una solución innovadora a un reto social local.', 100, JSON_OBJECT('deliverable', 'Pitch de 5 minutos'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM challenges WHERE course_id = @course_innovacion AND title = 'Desafío de innovación comunitaria');

INSERT INTO challenges (course_id, lesson_id, title, description, points, rules, created_at, updated_at)
SELECT @course_economia, @lesson_economia_principios, 'Reto de circularidad', 'Diseña un plan de economía circular para una empresa ficticia.', 120, JSON_OBJECT('deliverable', 'Documento ejecutivo'), @now, @now
WHERE NOT EXISTS (SELECT 1 FROM challenges WHERE course_id = @course_economia AND title = 'Reto de circularidad');

SET @challenge_innovacion = (SELECT id FROM challenges WHERE course_id = @course_innovacion AND title = 'Desafío de innovación comunitaria');
SET @challenge_economia = (SELECT id FROM challenges WHERE course_id = @course_economia AND title = 'Reto de circularidad');

INSERT INTO challenge_submissions (challenge_id, user_id, artifact_url, score, status)
SELECT @challenge_innovacion, @student_emilia_id, 'https://example.com/submissions/emilia-desafio.pdf', 95, 'APPROVED'
WHERE NOT EXISTS (SELECT 1 FROM challenge_submissions WHERE challenge_id = @challenge_innovacion AND user_id = @student_emilia_id);

INSERT INTO challenge_submissions (challenge_id, user_id, artifact_url, score, status)
SELECT @challenge_economia, @student_diego_id, 'https://example.com/submissions/diego-economia.pdf', 88, 'REVIEWING'
WHERE NOT EXISTS (SELECT 1 FROM challenge_submissions WHERE challenge_id = @challenge_economia AND user_id = @student_diego_id);

-- -------------------------------------------------------------
-- User points summary
-- -------------------------------------------------------------
INSERT INTO user_points (user_id, course_id, points)
SELECT @student_emilia_id, @course_innovacion, 150
WHERE NOT EXISTS (SELECT 1 FROM user_points WHERE user_id = @student_emilia_id AND course_id = @course_innovacion);

INSERT INTO user_points (user_id, course_id, points)
SELECT @student_diego_id, @course_economia, 120
WHERE NOT EXISTS (SELECT 1 FROM user_points WHERE user_id = @student_diego_id AND course_id = @course_economia);
