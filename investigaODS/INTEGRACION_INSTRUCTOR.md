# Integración Frontend-Backend - Opciones para Instructor

**Fecha:** 3 de Diciembre de 2025  
**Estado:** ✅ Completado

## Resumen

Se ha completado la integración completa entre el frontend y backend para las funcionalidades del rol **INSTRUCTOR**, permitiendo la gestión completa de cursos, módulos y lecciones.

---

## 🔧 Modificaciones en el Backend

### 1. **Entidad Course - Slug Opcional**

**Archivo:** `backend/src/courses/course.entity.ts`

- ✅ El campo `slug` ahora es **opcional y nullable**
- ✅ Se genera automáticamente desde el título si no se proporciona

**Cambio:**
```typescript
@Column({ unique: true, nullable: true })
slug?: string;
```

### 2. **Nuevos Endpoints de Courses**

**Archivo:** `backend/src/courses/courses.controller.ts`

#### a) `GET /courses/my-courses` 
- **Protegido:** Requiere JWT + Rol INSTRUCTOR/ADMIN
- **Función:** Obtiene todos los cursos del instructor autenticado
- **Respuesta:** Array de cursos con relaciones (owner, tags, modules)

#### b) `GET /courses/:id/stats`
- **Protegido:** Requiere JWT + ser dueño del curso
- **Función:** Obtiene estadísticas del curso
- **Respuesta:**
```typescript
{
  courseId: number,
  students: {
    total: number,
    active: number,
    completed: number
  },
  content: {
    modules: number,
    lessons: number
  },
  rating: number
}
```

### 3. **Gestión Completa de Módulos**

**Endpoints agregados:**

- `POST /courses/:id/modules` - Crear módulo
- `PATCH /courses/modules/:id` - Actualizar módulo (NUEVO)
- `DELETE /courses/modules/:id` - Eliminar módulo (NUEVO)

**DTOs creados:**
- `CreateModuleDto` (existía)
- `UpdateModuleDto` (nuevo)

### 4. **Gestión Completa de Lecciones**

**Endpoints agregados:**

- `POST /courses/modules/:id/lessons` - Crear lección
- `PATCH /courses/lessons/:id` - Actualizar lección (NUEVO)
- `DELETE /courses/lessons/:id` - Eliminar lección (NUEVO)

**DTOs creados:**
- `CreateLessonDto` (existía)
- `UpdateLessonDto` (nuevo)

### 5. **Módulo de Tags (Categorías)**

**Archivos creados:**
- `backend/src/tags/tags.controller.ts`
- `backend/src/tags/tags.service.ts`
- `backend/src/tags/tags.module.ts`

**Endpoint:**
- `GET /tags` - Obtiene todas las categorías (público)

**Integrado en:** `backend/src/app.module.ts`

### 6. **Servicios Actualizados**

**Archivo:** `backend/src/courses/courses.service.ts`

**Métodos agregados:**
- `findMyCourses(user: User)` - Obtiene cursos del instructor
- `getCourseStats(courseId, user)` - Obtiene estadísticas del curso
- `updateModule(moduleId, dto, user)` - Actualiza un módulo
- `removeModule(moduleId, user)` - Elimina un módulo
- `updateLesson(lessonId, dto, user)` - Actualiza una lección
- `removeLesson(lessonId, user)` - Elimina una lección
- `generateSlug(title)` - Genera slug desde el título

---

## 🎨 Modificaciones en el Frontend

### 1. **Tipos Actualizados**

**Archivo:** `frontend/src/types/index.ts`

**Cambios:**
- ✅ Campo `slug` ahora es opcional en `Course`
- ✅ Agregado campo `tags?: Tag[]` en `Course`
- ✅ Agregada interfaz `Tag` con `id` y `name`

### 2. **Servicio de API Actualizado**

**Archivo:** `frontend/src/services/api.service.ts`

**Métodos agregados:**

```typescript
// Courses
coursesService.getMyCourses() // Obtiene cursos del instructor
coursesService.getStats(id)   // Obtiene estadísticas

// Módulos
coursesService.createModule(courseId, data)
coursesService.updateModule(moduleId, data)
coursesService.deleteModule(moduleId)

// Lecciones
coursesService.createLesson(moduleId, data)
coursesService.updateLesson(lessonId, data)
coursesService.deleteLesson(lessonId)

// Tags
tagsService.getAll() // Obtiene todas las categorías
```

### 3. **Página CourseCreate Actualizada**

**Archivo:** `frontend/src/pages/instructor/CourseCreate.tsx`

**Nuevas características:**

#### a) **Campo Visibilidad**
- Select con opciones:
  - `PUBLIC` → "Público"
  - `PRIVATE` → "Oculto"

#### b) **Campo Categorías (Tags)**
- Muestra tags existentes como botones seleccionables
- Permite agregar nuevas categorías
- Tags seleccionados se envían al backend
- Si el tag no existe, se crea automáticamente

#### c) **Campo Tier**
- Opciones actualizadas: `FREE`, `BASIC`, `PRO`

#### d) **Integración con Backend**
- Carga tags desde `GET /tags`
- Crea curso con `POST /courses`
- Manejo de estados: loading, error
- Redirección a lista de cursos tras éxito

**Estado del formulario:**
```typescript
{
  title: string,
  description: string,
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
  tierRequired: 'FREE' | 'BASIC' | 'PRO',
  visibility: 'PUBLIC' | 'PRIVATE',
  tags: string[]
}
```

### 4. **Página InstructorCourses Actualizada**

**Archivo:** `frontend/src/pages/instructor/InstructorCourses.tsx`

**Cambios principales:**

#### a) **Carga de Datos Reales**
- Obtiene cursos con `coursesService.getMyCourses()`
- Carga estadísticas de cada curso con `coursesService.getStats()`
- Estados: `isLoading`, `error`, `courses`

#### b) **Interfaz CourseWithStats**
```typescript
interface CourseWithStats extends Course {
  students?: number;
  rating?: number;
  modulesCount?: number;
  lessonsCount?: number;
}
```

#### c) **Filtros Actualizados**
- `ALL` - Todos los cursos
- `PUBLISHED` - Cursos con `visibility === 'PUBLIC'`
- `DRAFT` - Cursos con `visibility === 'PRIVATE'`

#### d) **Eliminación de Cursos**
- Integrada con `coursesService.delete(id)`
- Recarga la lista tras eliminación exitosa

#### e) **Estados UI**
- **Loading:** Muestra "⏳ Cargando cursos..."
- **Error:** Muestra mensaje de error con estilo rojo
- **Empty State:** Muestra mensaje cuando no hay cursos
- **Cursos:** Grid responsive con tarjetas de curso

---

## 📊 Mapeo de Datos

### Backend ↔ Frontend

| Backend | Frontend | Notas |
|---------|----------|-------|
| `visibility: 'PUBLIC'` | "Público" | Curso visible |
| `visibility: 'PRIVATE'` | "Oculto" | Curso no visible |
| `tags: Tag[]` | Categorías | Relación many-to-many |
| `tierRequired` | tier | FREE, BASIC, PRO |
| `slug` | slug (opcional) | Auto-generado si no se proporciona |

---

## 🔐 Seguridad y Permisos

### Endpoints Protegidos

Todos los endpoints de instructor requieren:
1. **JWT válido** (`@UseGuards(JwtAuthGuard)`)
2. **Rol apropiado** (`@Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)`)

### Validaciones de Ownership

Los servicios verifican que el instructor solo pueda:
- Ver/editar sus propios cursos
- Gestionar módulos de sus cursos
- Gestionar lecciones de sus cursos

**Método:** `assertCanManageCourse(course, user)`

---

## 🧪 Pruebas Recomendadas

### Backend
1. ✅ Crear curso sin slug (verificar generación automática)
2. ✅ Obtener "mis cursos" como instructor
3. ✅ Obtener estadísticas de un curso
4. ✅ CRUD completo de módulos
5. ✅ CRUD completo de lecciones
6. ✅ Obtener tags públicamente

### Frontend
1. ✅ Crear curso con categorías existentes
2. ✅ Crear curso con nueva categoría
3. ✅ Ver lista de cursos del instructor
4. ✅ Filtrar por publicados/borradores
5. ✅ Eliminar un curso
6. ✅ Verificar estados de carga y error

---

## 📝 Endpoints Resumen

### Cursos
```
GET    /courses              # Públicos (con filtros)
GET    /courses/my-courses   # Mis cursos (instructor) 🆕
GET    /courses/:id          # Detalle del curso
GET    /courses/:id/stats    # Estadísticas 🆕
GET    /courses/:id/outline  # Estructura completa
POST   /courses              # Crear curso
PATCH  /courses/:id          # Actualizar curso
DELETE /courses/:id          # Eliminar curso
```

### Módulos
```
POST   /courses/:id/modules     # Crear módulo
PATCH  /courses/modules/:id     # Actualizar módulo 🆕
DELETE /courses/modules/:id     # Eliminar módulo 🆕
```

### Lecciones
```
POST   /courses/modules/:id/lessons  # Crear lección
PATCH  /courses/lessons/:id          # Actualizar lección 🆕
DELETE /courses/lessons/:id          # Eliminar lección 🆕
```

### Tags
```
GET    /tags                 # Listar categorías 🆕
```

---

## ✅ Checklist de Integración

- [x] Slug opcional en backend
- [x] Endpoint GET /courses/my-courses
- [x] Endpoint GET /courses/:id/stats
- [x] PATCH/DELETE para módulos
- [x] PATCH/DELETE para lecciones
- [x] Módulo de tags con endpoint GET
- [x] Frontend: Campo categorías en CourseCreate
- [x] Frontend: Campo visibilidad en CourseCreate
- [x] Frontend: Integración con backend en CourseCreate
- [x] Frontend: Carga de datos reales en InstructorCourses
- [x] Frontend: Eliminación de cursos
- [x] Frontend: Estados de carga y error
- [x] Tipos actualizados en frontend
- [x] Servicios API actualizados
- [x] Sin errores de compilación

---

## 🚀 Próximos Pasos Sugeridos

1. **CourseBuilder:** Integrar edición de cursos, módulos y lecciones
2. **CourseStudents:** Integrar lista de estudiantes inscritos
3. **Subida de Archivos:** Implementar upload de imágenes (thumbnails)
4. **Validaciones:** Agregar validaciones más robustas en formularios
5. **Preview:** Permitir al instructor ver cómo se ve el curso para estudiantes
6. **Analytics:** Dashboard con gráficas de progreso de estudiantes

---

## 📄 Archivos Modificados

### Backend (12 archivos)
- `src/courses/course.entity.ts`
- `src/courses/courses.controller.ts`
- `src/courses/courses.service.ts`
- `src/courses/courses.module.ts`
- `src/courses/dto/create-course.dto.ts`
- `src/courses/dto/update-module.dto.ts` (nuevo)
- `src/courses/dto/update-lesson.dto.ts` (nuevo)
- `src/tags/tags.controller.ts` (nuevo)
- `src/tags/tags.service.ts` (nuevo)
- `src/tags/tags.module.ts` (nuevo)
- `src/app.module.ts`

### Frontend (4 archivos)
- `src/pages/instructor/CourseCreate.tsx`
- `src/pages/instructor/InstructorCourses.tsx`
- `src/services/api.service.ts`
- `src/types/index.ts`

---

## 🎯 Resultado Final

✅ **La integración frontend-backend para opciones de instructor está completa y funcional.**

Los instructores ahora pueden:
- Crear cursos con categorías y visibilidad
- Ver todos sus cursos con estadísticas reales
- Filtrar cursos por estado de publicación
- Eliminar cursos
- Gestionar módulos y lecciones (endpoints disponibles)

Todos los cambios están compilando sin errores y listos para pruebas.
