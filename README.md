# MiniCore

Sistema web para el cálculo y reporte de costos de envíos por repartidor. Permite registrar repartidores, zonas de entrega (con su tarifa por kg) y envíos, para luego generar un reporte filtrado por rango de fechas que muestra, por cada repartidor, la cantidad de envíos realizados, el total de kilogramos transportados, las zonas atendidas, las tarifas aplicadas y el costo total generado.

El proyecto está dividido en dos partes:

- **Backend**: API REST construida con Django y Django REST Framework, encargada de la lógica de negocio y el cálculo de costos.
- **Frontend**: Interfaz construida con React y Vite, que permite seleccionar un rango de fechas y visualizar el reporte de costos en una tabla.

## ¿Para qué sirve?

Este MiniCore está pensado para pequeñas operaciones logísticas o de delivery que necesitan tener visibilidad de cuánto le cuesta a la empresa cada repartidor en un periodo determinado, en función del peso transportado y la tarifa de la zona donde se realizó cada entrega. Con esto se puede:

- Centralizar el registro de repartidores, zonas y envíos.
- Calcular automáticamente el costo de cada envío (`peso_kg x tarifa_por_kg`).
- Consultar un reporte agregado por repartidor en un rango de fechas específico, sin necesidad de hacer el cálculo manualmente.

## Tecnologías utilizadas

**Backend**
- Python / Django 6
- Django REST Framework
- django-cors-headers
- Gunicorn + Whitenoise (para producción)
- PostgreSQL (vía `dj-database-url` / `psycopg2-binary`)

**Frontend**
- React 19
- Vite
- Axios

## Estructura del proyecto
```bash
MiniCore/
├── backend/
│   ├── config/          # Configuración del proyecto Django (settings, urls, wsgi, asgi)
│   ├── core/             # App principal: modelos, vistas, admin y migraciones
│   ├── manage.py
│   ├── requirements.txt
│   └── build.sh          # Script de build usado para el despliegue en Render
└── frontend/
├── src/
│   ├── App.jsx        # Vista principal: formulario de fechas + tabla de reporte
│   ├── api.js          # Cliente Axios para consumir la API
│   └── ...
├── index.html
└── package.json
```
## Modelo de datos

- **Repartidor**: nombre y correo del repartidor.
- **Zona**: nombre de la zona y tarifa por kg aplicada en esa zona.
- **Envío**: relaciona un repartidor y una zona, e incluye el peso (kg) y la fecha del envío.

## Endpoint principal
```script
GET /api/reporte-costos/?fecha_inicio=YYYY-MM-DD&fecha_fin=YYYY-MM-DD
```
Devuelve un arreglo JSON con, por cada repartidor que tuvo envíos en el rango indicado:

```json
[
  {
    "repartidor": "Nombre del repartidor",
    "cantidad_envios": 5,
    "total_kg": 120.50,
    "zonas": "Norte, Sur",
    "tarifas": "$1.20, $1.50",
    "costo_total": 165.75
  }
]
```

## Requisitos previos

- Python 3.11+
- Node.js 18+ y npm
- PostgreSQL (o usar SQLite localmente, ajustando la configuración de base de datos si se desea evitar Postgres en local)

## Instalación y ejecución en local

### 1. Clonar el repositorio

https://github.com/DavidPuga04/MiniCore.git


### 2. Backend (Django)

```bash
cd backend

# Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate      # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Variables de entorno necesarias
# SECRET_KEY=una-clave-secreta
# DATABASE_URL=postgres://usuario:password@host:puerto/nombre_db

# Aplicar migraciones
python manage.py migrate

# (Opcional) Crear un superusuario para acceder al panel de administración
python manage.py createsuperuser

# Levantar el servidor de desarrollo
python manage.py runserver
```

El backend quedará disponible en `http://127.0.0.1:8000/` y el endpoint del reporte en `http://127.0.0.1:8000/api/reporte-costos/`.

> El panel de administración de Django (`/admin/`) permite registrar repartidores, zonas y envíos de forma manual mientras no exista un formulario de carga en el frontend.

### 3. Frontend (React + Vite)

```bash
cd frontend

# Instalar dependencias
npm install

# Variable de entorno necesaria (crear un archivo .env en /frontend)
# VITE_API_URL=http://127.0.0.1:8000/api

# Levantar el servidor de desarrollo
npm run dev
```

El frontend quedará disponible en `http://127.0.0.1:5173/` (o el puerto que indique Vite en consola).

### 4. Uso

1. Abrir el frontend en el navegador.
2. Seleccionar una fecha de inicio y una fecha de fin.
3. Presionar el botón **Consultar**.
4. Revisar la tabla con el reporte de costos por repartidor para ese rango de fechas.

## Despliegue

El proyecto se encuentra desplegado en **Render**:

🔗 Link del deploy: https://minicore-front-z1bv.onrender.com/

## Video explicativo

📺 Video explicativo en YouTube: https://youtu.be/K_B2u7evs74

## Documentación Oficial:

Django: https://docs.djangoproject.com/en/6.0/

React: https://es.react.dev/learn

## Referencias
Video de referencia 1: https://youtu.be/KILuIyf91aA?si=U_OXROaruO-smoBx 

Video de referencia 2: https://youtu.be/Yle4DdmQsFY?si=UIsd-D83OWIAkocL

## Autor

*David Puga*
/ **Contacto:** david.puga@udla.edu.ec
