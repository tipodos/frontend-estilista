from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Estilista")

# 1. Configuración de CORS (Permite que el frontend se comunique con tu API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción aquí va el link real de la web, por ahora permitimos todo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta base de prueba
@app.get("/")
def ruta_principal():
    return {"mensaje": "¡El backend de la estilista está encendido y funcionando!"}

# 2. Ruta para que el Frontend liste los servicios
@app.get("/api/servicios")
def obtener_servicios():
    # Datos simulados temporalmente hasta que conectemos PostgreSQL
    return [
        {
            "id": 1, 
            "nombre": "Tinte Balayage", 
            "descripcion": "Técnica de iluminación degradada natural.",
            "precio": 180.00, 
            "url_imagen": "https://picsum.photos/400/300", 
            "estado": True
        },
        {
            "id": 2, 
            "nombre": "Corte y Cepillado", 
            "descripcion": "Corte de puntas y cepillado profesional.",
            "precio": 45.00, 
            "url_imagen": "https://picsum.photos/400/301", 
            "estado": True
        },
        {
            "id": 3, 
            "nombre": "Manicure Acrílica", 
            "descripcion": "Diseño de uñas acrílicas con acabado en gel.",
            "precio": 65.00, 
            "url_imagen": "https://picsum.photos/400/302", 
            "estado": True
        }
    ]