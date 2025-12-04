# Integración del Asistente de IA - Green Dream

## Descripción
Se ha integrado el servicio de asistente de IA (RAG - Retrieval Augmented Generation) con el sistema principal de InvestigaODS. El asistente está disponible para estudiantes a través del botón flotante 🤖 que aparece en varias páginas del perfil de estudiante.

## Arquitectura

### Backend de IA (`ia/`)
- **Framework**: Flask + Gunicorn
- **Puerto**: 5001
- **Endpoints principales**:
  - `POST /api/chat` - Envía un mensaje al asistente
  - `GET /api/health` - Verifica el estado del servicio

### Frontend
- **Servicio**: `chat.service.ts` - Maneja la comunicación con la API de IA
- **Componente**: `HelpButton.tsx` - Botón flotante con chat integrado

## Configuración

### 1. Variables de Entorno

#### IA Service (`ia/config/.env`)
```env
AZURE_AI_ENDPOINT="https://tu-proyecto.services.ai.azure.com"
AZURE_AI_KEY="tu-api-key-aqui"
```

#### Frontend (`frontend/.env`)
```env
VITE_IA_API_URL=http://localhost:5001
```

### 2. Docker Compose
El servicio de IA ya está integrado en el `docker-compose.yml` principal:

```yaml
ia:
  build:
    context: ./ia
    dockerfile: Dockerfile
  container_name: investigaods_ia
  env_file:
    - ./ia/config/.env
  ports:
    - "5001:5001"
  restart: unless-stopped
```

## Uso

### Iniciar el Servicio

**Opción 1: Todos los servicios**
```powershell
docker-compose up -d
```

**Opción 2: Solo el servicio de IA**
```powershell
docker-compose up -d ia
```

### Verificar el Estado
```powershell
# Ver logs del servicio
docker-compose logs -f ia

# Verificar health endpoint
curl http://localhost:5001/api/health
```

### Probar el Chat
```powershell
# Enviar un mensaje al asistente
curl -X POST http://localhost:5001/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message": "¿Qué es InvestigaODS?"}'
```

## Funcionalidades

### En el Frontend (Perfil de Estudiante)

1. **Botón Flotante**: El botón 🤖 aparece en la esquina inferior derecha
2. **Opciones Rápidas**: Al hacer clic, se muestran 3 opciones predefinidas:
   - Dudas sobre el contenido de un curso
   - Recomendación de cursos
   - Problemas técnicos

3. **Chat Completo**: Se puede abrir un chat completo con el asistente
4. **Historial**: Se mantiene el historial de mensajes durante la sesión

### Páginas Disponibles
El botón flotante está disponible en:
- Dashboard (Basic y Pro)
- Perfil de usuario
- Mis cursos
- Explorar cursos
- Detalle de curso
- Editar perfil

## API del Chat

### POST `/api/chat`

**Request:**
```json
{
  "message": "¿Qué cursos sobre ODS tengo disponibles?"
}
```

**Response (Éxito):**
```json
{
  "success": true,
  "response": "Tenemos varios cursos sobre los ODS...",
  "source": "Green Dream RAG Assistant"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error al procesar la consulta",
  "response": "",
  "source": "Error"
}
```

### GET `/api/health`

**Response:**
```json
{
  "status": "healthy",
  "service": "Green Dream Chat API",
  "version": "1.0.0",
  "assistant_initialized": true
}
```

## Troubleshooting

### El servicio de IA no inicia
1. Verificar las credenciales de Azure AI en `ia/config/.env`
2. Ver los logs: `docker-compose logs ia`
3. Verificar que el puerto 5001 esté disponible

### El frontend no se conecta con el servicio
1. Verificar la variable `VITE_IA_API_URL` en `frontend/.env`
2. Reiniciar el servicio frontend: `docker-compose restart frontend`
3. Verificar CORS en el servicio de IA

### El asistente responde con errores
1. Verificar que `assistant_initialized` sea `true` en `/api/health`
2. Revisar los logs del contenedor de IA
3. Verificar la conectividad con Azure AI Foundry

## Desarrollo Local

### Sin Docker
```powershell
# IA Service
cd ia
pip install -r requirements.txt
python src/api_complete.py

# Frontend (agregar variable de entorno)
cd frontend
npm run dev
```

### Hot Reload
Los volúmenes están configurados para permitir hot reload en desarrollo:
- `./ia:/app` - Código Python
- `./frontend:/app` - Código React

## Próximas Mejoras
- [ ] Persistencia del historial de chat
- [ ] Soporte para streaming de respuestas
- [ ] Análisis de sentimiento
- [ ] Recomendaciones personalizadas basadas en el perfil
- [ ] Integración con el sistema de notificaciones
- [ ] Métricas y analytics del uso del chat

## Recursos
- Base de conocimiento: `ia/knowledge_base/`
- Documentación Azure AI: https://learn.microsoft.com/azure/ai-services/
- Flask CORS: https://flask-cors.readthedocs.io/
