from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def getData(request):
    productos = [
        {
            "nombre": "Nike Air Max Plus Tn",
            "descripcion": "Zapatillas urbanas.",
            "precio": 189990,
            "stock": 497,
            "categoria": "Zapatillas",
            "genero": "Hombre",
            "color": "Blanco",
            "ventas": 3
        },
        {
            "nombre": "Nike Court Legacy Lift",
            "descripcion": "Zapatillas clásicas con un toque de estilo urbano.",
            "precio": 92990,
            "stock": 289,
            "categoria": "Zapatillas",
            "genero": "Mujer",
            "color": "Blanco",
            "ventas": 1
        },
        {
            "nombre": "Nike Air Force 1 '07",
            "descripcion": "Zapatillas icónicas con diseño robusto y elegante.",
            "precio": 119990,
            "stock": 100,
            "categoria": "Zapatillas",
            "genero": "Hombre",
            "color": "Negro",
            "ventas": 0
        },
        {
            "nombre": "Nike Miler",
            "descripcion": "Polera de Running Dri-Fit/UV para Hombre",
            "precio": 33990,
            "stock": 100,
            "categoria": "Ropa",
            "genero": "Hombre",
            "color": "Negro",
            "ventas": 0
        },
        {
            "nombre": "Liverpool alternativo",
            "descripcion": "Polera de fútbol Nike Dri-FIT Replica para hombre",
            "precio": 79990,
            "stock": 70,
            "categoria": "Ropa",
            "genero": "Hombre",
            "color": "Blanco",
            "ventas": 0
        }
    ]

    usuarios = [
        {
            "rut": "17345678-9",
            "nombre": "Juan",
            "apellido": "Pérez",
            "correo": "juan.perez@example.com",
            "telefono": "+56912345678"
        },
        {
            "rut": "18765432-1",
            "nombre": "María",
            "apellido": "González",
            "correo": "maria.gonzalez@example.com",
            "telefono": "+56987654321"
        },
        {
            "rut": "15223344-5",
            "nombre": "Carlos",
            "apellido": "Soto",
            "correo": "carlos.soto@example.com",
            "telefono": "+56911223344"
        },
        {
            "rut": "21667788-6",
            "nombre": "Ana",
            "apellido": "López",
            "correo": "ana.lopez@example.com",
            "telefono": "+56955667788"
        }
    ]

    data = {
        "productos": productos,
        "usuarios": usuarios
    }

    return Response(data)
