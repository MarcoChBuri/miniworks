# MiniWorks - Instrucciones de Ejecución

## Servicios en Docker (Backend)

Los siguientes servicios corren en Docker Compose:

1. **MongoDB** - Base de datos (puerto 27018)
2. **MiniWorks API** - Backend Node.js (puerto 3000)
3. **Validador Universidad** - Servicio Python (puerto 9000)
4. **Kong Gateway** - API Gateway (puerto 8000)

### Iniciar servicios backend:
```bash
cd /home/emilio/Plataformas/miniworks/gateway
docker compose up -d
```

### Ver estado:
```bash
docker compose ps
```

### Ver logs:
```bash
docker compose logs -f
```

## Flutter App (Frontend)

La aplicación Flutter se ejecuta **por separado** usando Docker:

### Opción 1: Ejecutar con Docker (Recomendado)
```bash
cd /home/emilio/Plataformas/miniworks/miniworks_app

# Ejecutar en modo web
docker run --rm -it \
  -v $(pwd):/app \
  -w /app \
  -p 8080:8080 \
  --network gateway_kong-net \
  ghcr.io/cirruslabs/flutter:3.19.0 \
  flutter run -d web-server --web-port 8080 --web-hostname 0.0.0.0
```

Luego abre: **http://localhost:8080**

### Opción 2: Si tienes Flutter instalado localmente
```bash
cd /home/emilio/Plataformas/miniworks/miniworks_app
flutter run -d chrome
```

## Configuración Importante

La app Flutter está configurada para conectarse al backend en:
- **Base URL**: `http://localhost:8000/api` (a través de Kong Gateway)

Si ejecutas la app en Docker, asegúrate de que pueda acceder a la red de Docker.

## Detener todo

```bash
# Detener servicios backend
cd /home/emilio/Plataformas/miniworks/gateway
docker compose down

# La app Flutter se detiene con Ctrl+C
```

## Arquitectura

```
┌─────────────────┐
│  Flutter App    │ (Puerto 8080)
│  (Separado)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Kong Gateway   │ (Puerto 8000)
└────────┬────────┘
         │
    ┌────┴────┬──────────────┐
    ↓         ↓              ↓
┌────────┐ ┌──────┐  ┌──────────────┐
│MiniWorks│ │Mongo │  │  Validador   │
│  API   │ │  DB  │  │ Universidad  │
└────────┘ └──────┘  └──────────────┘
```
