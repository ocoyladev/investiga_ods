# Integración Frontend-Backend - InvestigaODS

## ✅ Cambios Completados

### 1. Tipos actualizados (`src/types/index.ts`)
- ✅ IDs cambiados de `string` a `number` para coincidir con backend
- ✅ Propiedades de User sincronizadas con la entidad User del backend
- ✅ Course, Module, Lesson actualizados con estructura del backend
- ✅ Enrollment actualizado con campos correctos

### 2. Servicios de API (`src/services/api.service.ts`)
- ✅ **authService**: Endpoints corregidos
  - `POST /auth/login` ✅
  - `POST /auth/register` ✅
  - `POST /auth/logout` ✅
  - `GET /users/me` (perfil) ✅
  - `POST /auth/refresh` ✅

- ✅ **coursesService**: Endpoints completos
  - `GET /courses` con filtros ✅
  - `GET /courses/:id` ✅
  - `GET /courses/:id/outline` ✅
  - `POST /courses` (instructores) ✅
  - `PATCH /courses/:id` ✅
  - `DELETE /courses/:id` ✅

- ✅ **enrollmentsService**: 
  - `POST /courses/:courseId/enroll` ✅
  - `GET /me/enrollments` ✅
  - `GET /courses/:courseId/students` ✅

- ✅ **progressService**:
  - `GET /progress/me/courses/:courseId` ✅
  - `POST /progress/lessons/:lessonId/progress` ✅

- ✅ **usersService**:
  - `PATCH /users/me` ✅

- ✅ **plansService**:
  - `GET /plans` ✅
  - `GET /me/subscription` ✅
  - `POST /subscriptions/upgrade` ✅

### 3. Hooks personalizados creados
- ✅ `useApiError.ts` - Manejo centralizado de errores HTTP
- ✅ `useCourses.ts` - Hook para gestión de cursos
- ✅ `useEnrollments.ts` - Hook para inscripciones

### 4. AuthContext actualizado
- ✅ Integración con API real del backend
- ✅ Manejo de tokens JWT (access + refresh en cookies)
- ✅ Validación de sesión al cargar
- ✅ Modo mock configurable con `USE_MOCK = false`

### 5. Login actualizado
- ✅ Redirección basada en roles del backend
- ✅ Manejo de errores mejorado

### 6. Página de prueba
- ✅ `ApiTest.tsx` - Interfaz para probar endpoints

## 🔗 Endpoints del Backend Mapeados

### Auth
| Endpoint | Método | Servicio | Estado |
|----------|---------|----------|---------|
| `/api/auth/login` | POST | `authService.login()` | ✅ |
| `/api/auth/register` | POST | `authService.register()` | ✅ |
| `/api/auth/logout` | POST | `authService.logout()` | ✅ |
| `/api/auth/refresh` | POST | `authService.refresh()` | ✅ |
| `/api/users/me` | GET | `authService.getProfile()` | ✅ |

### Courses
| Endpoint | Método | Servicio | Estado |
|----------|---------|----------|---------|
| `/api/courses` | GET | `coursesService.getAll()` | ✅ |
| `/api/courses/:id` | GET | `coursesService.getById()` | ✅ |
| `/api/courses/:id/outline` | GET | `coursesService.getOutline()` | ✅ |
| `/api/courses` | POST | `coursesService.create()` | ✅ |
| `/api/courses/:id` | PATCH | `coursesService.update()` | ✅ |
| `/api/courses/:id` | DELETE | `coursesService.delete()` | ✅ |

### Enrollments
| Endpoint | Método | Servicio | Estado |
|----------|---------|----------|---------|
| `/api/courses/:id/enroll` | POST | `enrollmentsService.enroll()` | ✅ |
| `/api/me/enrollments` | GET | `enrollmentsService.getMyEnrollments()` | ✅ |
| `/api/courses/:id/students` | GET | `enrollmentsService.getStudents()` | ✅ |

### Progress
| Endpoint | Método | Servicio | Estado |
|----------|---------|----------|---------|
| `/api/progress/me/courses/:id` | GET | `progressService.getCourseProgress()` | ✅ |
| `/api/progress/lessons/:id/progress` | POST | `progressService.updateLessonProgress()` | ✅ |

## 🧪 Pruebas

### 1. Probar la conexión básica

Accede a: **http://localhost:5173/api-test**

Esta página te permite:
- Ver información del entorno
- Verificar el token de acceso
- Ejecutar pruebas de endpoints individuales
- Ver respuestas del backend en tiempo real

### 2. Probar autenticación

1. **Registrar usuario nuevo:**
```bash
# Desde el navegador o con curl
POST http://localhost:3000/api/auth/register
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}
```

2. **Login:**
- Ve a http://localhost:5173/login
- Usa credenciales mock o las que creaste

3. **Verificar perfil:**
```bash
# Debe estar autenticado
GET http://localhost:3000/api/users/me
Authorization: Bearer {token}
```

### 3. Probar cursos

```typescript
import { coursesService } from './services/api.service';

// Obtener todos los cursos
const courses = await coursesService.getAll();

// Filtrar cursos gratuitos
const freeCourses = await coursesService.getAll({ tierRequired: 'FREE' });

// Obtener curso específico
const course = await coursesService.getById(1);

// Obtener estructura completa
const outline = await coursesService.getOutline(1);
```

## 🚀 Próximos Pasos

1. **Crear usuarios de prueba en el backend:**
```bash
# Ejecutar seed en el backend
docker-compose exec backend npm run seed
```

2. **Actualizar páginas para usar hooks:**
```typescript
// En lugar de datos mock:
const { courses, isLoading, error } = useCourses();

// Para enrollments:
const { enrollments, enroll } = useEnrollments();
```

3. **Implementar componentes con API real:**
- `Courses.tsx` - Listar cursos reales
- `CourseDetail.tsx` - Mostrar detalle con API
- `MyCourses.tsx` - Usar `useEnrollments()`
- `Explore.tsx` - Filtros con `useCourses()`

4. **Agregar más servicios según necesidad:**
- Quizzes
- Certificates
- Live Classes
- Challenges

## 🔧 Configuración

### Variables de entorno

Crea `.env` en frontend:
```env
VITE_API_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### Activar/Desactivar Mock

En `src/context/AuthContext.tsx`:
```typescript
const USE_MOCK = false; // true = mock, false = API real
```

## 📝 Notas

- El refresh token se maneja automáticamente con cookies HTTP-only
- El access token se guarda en localStorage
- Los interceptores de axios manejan la renovación automática
- CORS está configurado en el backend con `credentials: true`
