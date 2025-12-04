# Integración Frontend-Backend - Perfil Estudiante

**Fecha:** 3 de Diciembre de 2025  
**Estado:** 📋 Planificación

---

## 📊 Análisis de Situación Actual

### ✅ Integraciones Completadas
- Login y registro de usuarios
- Gestión de cursos (instructor)
- Gestión de módulos y lecciones (instructor)
- Gestión de estudiantes por curso (instructor)
- Sistema de tags/categorías
- Planes y suscripciones

### 🎯 Pendiente: Integración de Perfil Estudiante

Actualmente los dashboards de estudiante (`DashboardBasic.tsx` y `DashboardPro.tsx`) están usando **datos mock** (`MOCK_COURSES_BASIC`). Necesitamos conectarlos con el backend real.

---

## 🔌 Endpoints Backend Disponibles para Estudiantes

### 1. **Enrollments (Inscripciones)**
| Endpoint | Método | Descripción | Estado API |
|----------|---------|-------------|------------|
| `POST /courses/:id/enroll` | POST | Inscribirse a un curso | ✅ |
| `GET /me/enrollments` | GET | Obtener mis inscripciones | ✅ |

**Entidad Enrollment:**
```typescript
{
  id: number;
  userId: number;
  courseId: number;
  cohortId?: number;
  status: 'ACTIVE' | 'COMPLETED' | 'DROPPED';
  createdAt: string;
  course?: Course; // Relación poblada
}
```

### 2. **Progress (Progreso)**
| Endpoint | Método | Descripción | Estado API |
|----------|---------|-------------|------------|
| `GET /progress/me/courses/:courseId` | GET | Obtener progreso de un curso | ✅ |
| `POST /progress/lessons/:lessonId/progress` | POST | Actualizar progreso de lección | ✅ |

**Respuesta de progreso:**
```typescript
{
  courseId: number;
  totalLessons: number;
  completedLessons: number;
  progressPct: number;
  lessons: Array<{
    lessonId: number;
    completed: boolean;
    progressPct: number;
    lastViewedAt?: string;
  }>;
}
```

### 3. **Quizzes (Cuestionarios)**
| Endpoint | Método | Descripción | Estado API |
|----------|---------|-------------|------------|
| `GET /quizzes/:id` | GET | Obtener cuestionario | ✅ |

### 4. **Attempts (Intentos de Quiz)**
| Endpoint | Método | Descripción | Estado API |
|----------|---------|-------------|------------|
| `POST /quizzes/:id/attempts` | POST | Iniciar intento | ✅ |
| `POST /attempts/:id/answers` | POST | Responder pregunta | ✅ |
| `POST /attempts/:id/submit` | POST | Enviar intento | ✅ |
| `GET /attempts/:id/result` | GET | Obtener resultado | ✅ |

### 5. **Certificates (Certificados)**
| Endpoint | Método | Descripción | Estado API |
|----------|---------|-------------|------------|
| `GET /me/certificates` | GET | Obtener mis certificados | ✅ |
| `GET /certificates/verify?serial=XXX` | GET | Verificar certificado | ✅ |

### 6. **Challenges (Desafíos) - Solo PRO**
| Endpoint | Método | Descripción | Estado API |
|----------|---------|-------------|------------|
| `POST /challenges/:id/submissions` | POST | Enviar desafío | ✅ |
| `GET /me/points` | GET | Obtener mis puntos | ✅ |

### 7. **Live Classes (Clases en Vivo) - Solo PRO**
| Endpoint | Método | Descripción | Estado API |
|----------|---------|-------------|------------|
| `GET /courses/:courseId/live-classes` | GET | Obtener clases en vivo | ✅ |

---

## 🎨 Frontend - Estado Actual

### Servicios API Implementados

**✅ Ya implementados en `api.service.ts`:**
- `enrollmentsService.enroll(courseId)` 
- `enrollmentsService.getMyEnrollments()`
- `progressService.getCourseProgress(courseId)`
- `progressService.updateLessonProgress(lessonId, data)`

**❌ Faltan implementar:**
- `attemptsService` (completo)
- `certificatesService` (completo)
- `challengesService` (completo)
- `liveClassesService` (completo)
- `quizzesService.getById(id)`

### Páginas que usan Mock Data

1. **DashboardBasic.tsx**
   - Usa `MOCK_COURSES_BASIC`
   - Muestra cursos en progreso
   - Muestra sección PRO

2. **DashboardPro.tsx**
   - Usa `MOCK_COURSES_BASIC`
   - Muestra cursos en progreso
   - Muestra cursos PRO disponibles

3. **MyCourses.tsx**
   - Usa `MOCK_ENROLLED_COURSES`
   - Muestra cursos inscritos
   - Muestra favoritos

4. **CourseDetail.tsx**
   - Probablemente usa mock data
   - Necesita integrar con progreso real

5. **CourseLessonPage.tsx**
   - Página de lección individual
   - Necesita actualizar progreso

---

## 🚀 Plan de Integración Estudiante

### **Fase 1: Servicios API Faltantes** 🔧

#### 1.1 Implementar servicios faltantes en `api.service.ts`

```typescript
// ATTEMPTS SERVICE
export const attemptsService = {
  async startAttempt(quizId: number): Promise<any> {
    const response = await api.post(`/quizzes/${quizId}/attempts`);
    return response.data;
  },

  async addAnswer(attemptId: number, data: any): Promise<any> {
    const response = await api.post(`/attempts/${attemptId}/answers`, data);
    return response.data;
  },

  async submitAttempt(attemptId: number): Promise<any> {
    const response = await api.post(`/attempts/${attemptId}/submit`);
    return response.data;
  },

  async getResult(attemptId: number): Promise<any> {
    const response = await api.get(`/attempts/${attemptId}/result`);
    return response.data;
  },
};

// CERTIFICATES SERVICE
export const certificatesService = {
  async getMyCertificates(): Promise<any[]> {
    const response = await api.get('/me/certificates');
    return response.data;
  },

  async verify(serial: string): Promise<any> {
    const response = await api.get('/certificates/verify', { 
      params: { serial } 
    });
    return response.data;
  },
};

// CHALLENGES SERVICE (PRO)
export const challengesService = {
  async submit(challengeId: number, data: any): Promise<any> {
    const response = await api.post(`/challenges/${challengeId}/submissions`, data);
    return response.data;
  },

  async getMyPoints(): Promise<any> {
    const response = await api.get('/me/points');
    return response.data;
  },
};

// LIVE CLASSES SERVICE (PRO)
export const liveClassesService = {
  async getForCourse(courseId: number): Promise<any[]> {
    const response = await api.get(`/courses/${courseId}/live-classes`);
    return response.data;
  },
};

// QUIZZES SERVICE (complemento)
export const quizzesService = {
  async getById(id: number): Promise<any> {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },
};
```

---

### **Fase 2: Hooks Personalizados** 🪝

#### 2.1 Crear `useEnrollments.ts` (mejorado)

```typescript
import { useState, useEffect } from 'react';
import { enrollmentsService } from '../services/api.service';
import type { Enrollment } from '../types';

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadEnrollments = async () => {
    try {
      setIsLoading(true);
      const data = await enrollmentsService.getMyEnrollments();
      setEnrollments(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const enrollInCourse = async (courseId: number) => {
    const result = await enrollmentsService.enroll(courseId);
    await loadEnrollments(); // Recargar
    return result;
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  return { 
    enrollments, 
    isLoading, 
    error, 
    reload: loadEnrollments,
    enroll: enrollInCourse 
  };
};
```

#### 2.2 Crear `useProgress.ts`

```typescript
import { useState, useEffect } from 'react';
import { progressService } from '../services/api.service';

export const useProgress = (courseId: number | null) => {
  const [progress, setProgress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProgress = async () => {
    if (!courseId) return;
    
    try {
      setIsLoading(true);
      const data = await progressService.getCourseProgress(courseId);
      setProgress(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLessonProgress = async (
    lessonId: number, 
    progressPct: number, 
    completed: boolean
  ) => {
    await progressService.updateLessonProgress(lessonId, { 
      progressPct, 
      completed 
    });
    await loadProgress(); // Recargar
  };

  useEffect(() => {
    loadProgress();
  }, [courseId]);

  return { 
    progress, 
    isLoading, 
    error, 
    reload: loadProgress,
    updateLesson: updateLessonProgress 
  };
};
```

#### 2.3 Crear `useCertificates.ts`

```typescript
import { useState, useEffect } from 'react';
import { certificatesService } from '../services/api.service';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCertificates = async () => {
    try {
      setIsLoading(true);
      const data = await certificatesService.getMyCertificates();
      setCertificates(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  return { certificates, isLoading, error, reload: loadCertificates };
};
```

---

### **Fase 3: Actualizar Dashboards** 📊

#### 3.1 Actualizar `DashboardBasic.tsx`

**Cambios:**
1. Importar hook de enrollments
2. Reemplazar `MOCK_COURSES_BASIC` con datos reales
3. Cargar progreso para cada curso
4. Manejar estados de carga y error

**Implementación:**
```typescript
import { useEnrollments } from '../hooks/useEnrollments';

export const DashboardBasic: React.FC = () => {
  const { user } = useAuth();
  const { enrollments, isLoading } = useEnrollments();

  // Filtrar cursos activos con progreso
  const activeCourses = enrollments
    .filter(e => e.status === 'ACTIVE')
    .map(e => ({
      ...e.course,
      enrollmentId: e.id,
    }));

  if (isLoading) {
    return <div>Cargando cursos...</div>;
  }

  return (
    // ... resto del componente
    <section>
      <h3>Tus cursos iniciados</h3>
      {activeCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  );
};
```

#### 3.2 Actualizar `DashboardPro.tsx`

Similar a DashboardBasic, pero además:
- Mostrar cursos PRO exclusivos
- Mostrar desafíos disponibles
- Mostrar próximas clases en vivo

#### 3.3 Actualizar `MyCourses.tsx`

**Cambios:**
1. Reemplazar `MOCK_ENROLLED_COURSES` con enrollments reales
2. Implementar favoritos (puede ser local o backend si existe)
3. Mostrar progreso real de cada curso

---

### **Fase 4: Integración de Lecciones** 📚

#### 4.1 Actualizar `CourseLessonPage.tsx`

**Funcionalidades a integrar:**
- Cargar lección desde backend
- Actualizar progreso al completar lección
- Marcar lección como vista
- Mostrar quiz si existe
- Navegación entre lecciones

**Flujo:**
```typescript
const handleCompleteLesson = async () => {
  await updateLessonProgress(lessonId, 100, true);
  // Navegar a siguiente lección
};

const handleProgressUpdate = async (percent: number) => {
  await updateLessonProgress(lessonId, percent, false);
};
```

---

### **Fase 5: Integración de Quizzes** 📝

#### 5.1 Crear componente `QuizAttempt.tsx`

**Funcionalidades:**
- Iniciar intento de quiz
- Mostrar preguntas
- Guardar respuestas
- Enviar quiz
- Mostrar resultado

**Flujo:**
```typescript
const startQuiz = async (quizId: number) => {
  const attempt = await attemptsService.startAttempt(quizId);
  setAttemptId(attempt.id);
};

const submitAnswer = async (questionId: number, answer: any) => {
  await attemptsService.addAnswer(attemptId, { questionId, answer });
};

const finishQuiz = async () => {
  await attemptsService.submitAttempt(attemptId);
  const result = await attemptsService.getResult(attemptId);
  setResult(result);
};
```

---

### **Fase 6: Features PRO** ⭐

#### 6.1 Integrar Certificados

- Crear página `Certificates.tsx` (si no existe)
- Mostrar certificados obtenidos
- Botón de descarga/visualización
- Verificador de certificados

#### 6.2 Integrar Desafíos (PRO)

- Listar desafíos disponibles
- Enviar soluciones
- Ver puntos acumulados
- Ranking (si existe en backend)

#### 6.3 Integrar Clases en Vivo (PRO)

- Mostrar calendario de clases
- Enlace a sala virtual
- Notificaciones de próximas clases

---

## 📝 Checklist de Implementación

### Backend (Ya disponible ✅)
- [x] Endpoints de enrollments
- [x] Endpoints de progress
- [x] Endpoints de attempts
- [x] Endpoints de certificates
- [x] Endpoints de challenges
- [x] Endpoints de live classes
- [x] Endpoints de quizzes

### Frontend (Por implementar 🚧)

**Servicios API:**
- [ ] `attemptsService` completo
- [ ] `certificatesService` completo
- [ ] `challengesService` completo
- [ ] `liveClassesService` completo
- [ ] `quizzesService.getById()`

**Hooks:**
- [ ] `useEnrollments` (mejorado)
- [ ] `useProgress`
- [ ] `useCertificates`
- [ ] `useAttempts` (opcional)

**Páginas:**
- [ ] Actualizar `DashboardBasic.tsx`
- [ ] Actualizar `DashboardPro.tsx`
- [ ] Actualizar `MyCourses.tsx`
- [ ] Actualizar `CourseDetail.tsx`
- [ ] Actualizar `CourseLessonPage.tsx`
- [ ] Crear/actualizar `Certificates.tsx`
- [ ] Crear componente `QuizAttempt.tsx`
- [ ] Integrar Challenges (PRO)
- [ ] Integrar Live Classes (PRO)

**Tipos:**
- [ ] Verificar tipos de Enrollment
- [ ] Verificar tipos de Progress
- [ ] Agregar tipos de Attempt
- [ ] Agregar tipos de Certificate
- [ ] Agregar tipos de Challenge
- [ ] Agregar tipos de LiveClass

---

## 🎯 Orden de Implementación Recomendado

1. **Fase 1: Servicios API** (30 min)
   - Implementar todos los servicios faltantes
   - Probar en `/api-test`

2. **Fase 2: Hook de Enrollments** (20 min)
   - Crear `useEnrollments`
   - Probar carga de inscripciones

3. **Fase 3: Dashboard Básico** (45 min)
   - Actualizar `DashboardBasic.tsx`
   - Mostrar cursos reales
   - Manejar estados de carga

4. **Fase 4: Progress & Lessons** (1 hora)
   - Crear `useProgress`
   - Actualizar `CourseLessonPage.tsx`
   - Implementar actualización de progreso

5. **Fase 5: Dashboard PRO** (30 min)
   - Actualizar `DashboardPro.tsx`
   - Agregar features PRO

6. **Fase 6: Quizzes** (1 hora)
   - Implementar sistema de intentos
   - Crear componente de quiz

7. **Fase 7: Certificados** (30 min)
   - Crear `useCertificates`
   - Actualizar página de certificados

8. **Fase 8: Features PRO** (1 hora)
   - Desafíos
   - Clases en vivo

**Tiempo total estimado: 5-6 horas**

---

## 🔍 Notas Importantes

### Autenticación
- Todos los endpoints de estudiante requieren `@UseGuards(JwtAuthGuard)`
- El token JWT se envía automáticamente por el interceptor de axios

### Planes
- Algunos endpoints requieren plan PRO (`@RequirePlan(MembershipPlanCode.PRO)`)
- Verificar plan del usuario antes de mostrar features PRO

### Manejo de Errores
- Usar el hook `useApiError` existente
- Mostrar mensajes amigables al usuario
- Manejar casos de cursos no encontrados, permisos, etc.

### Optimización
- Implementar cache de enrollments
- Lazy loading de progreso (solo cuando se necesite)
- Paginación si hay muchos cursos

---

## 📚 Recursos

- **Backend Controllers:** `backend/src/*/` 
- **Servicios API:** `frontend/src/services/api.service.ts`
- **Tipos:** `frontend/src/types/index.ts`
- **Hooks:** `frontend/src/hooks/`
- **Documentación de integración:** 
  - `INTEGRACION_COMPLETA.md`
  - `INTEGRACION_INSTRUCTOR.md`

---

**¿Por dónde empezar?** 👉 Fase 1: Implementar servicios API faltantes
