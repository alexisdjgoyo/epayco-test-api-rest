# API REST para Billetera Virtual ePayco

Esta es una API REST que actúa como un puente entre un cliente y un servicio SOAP para gestionar una billetera virtual. El proyecto está construido con NestJS y se ejecuta en un contenedor de Docker.

## Pre-requisitos

Asegúrate de tener instaladas las siguientes herramientas en tu sistema:

*   [Git](https://git-scm.com/downloads)
*   [Docker](https://www.docker.com/products/docker-desktop)

`docker-compose` viene incluido con las instalaciones de Docker Desktop para Windows y macOS. Si usas Linux, asegúrate de instalarlo por separado.

## Instalación y Ejecución

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local.

### 1. Puesta en Marcha del Servicio SOAP (¡Importante!)

Antes de continuar, es **indispensable** que pongas en marcha el servicio SOAP del cual depende esta API REST. Para ello, clona y sigue las instrucciones del siguiente repositorio:

```bash
git clone https://github.com/alexisdjgoyo/epayco-test-api-soap.git
```

### 2. Clonar este Repositorio

Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio en tu máquina local:

```bash
git clone https://github.com/alexisdjgoyo/epayco-test-api-rest.git
cd epayco-test-api-rest
```

### 2. Ejecutar con Docker Compose

Una vez dentro del directorio del proyecto, utiliza Docker Compose para construir la imagen y levantar el contenedor del servicio.

```bash
docker-compose up -d --build
```

El servicio REST comenzará a ejecutarse en segundo plano.

> **Nota:** La primera vez que ejecutes este comando, el proceso puede tardar varios minutos, ya que Docker necesita descargar la imagen de Node.js y construir la imagen del proyecto.

### 3. Pruebas (Testing)

Para ejecutar las pruebas unitarias y de integración, asegúrate de que el contenedor esté en funcionamiento y luego ejecuta el siguiente comando:

```bash
# Ejecutar todas las pruebas una vez
docker-compose exec gateway npm run test
```

### 4. Verificar el Funcionamiento

Una vez que los contenedores estén en funcionamiento, el servicio estará disponible en `http://localhost:3000`.

Puedes acceder a la documentación interactiva de la API (Swagger) en la siguiente URL:

**http://localhost:3000/api**

### 5. Colección de Postman

Dentro de la carpeta `docs` del repositorio, encontrarás una colección de Postman (`epayco-rest-postman-collection.json`) que puedes importar para probar los diferentes endpoints de la API de forma sencilla.

---

### ⚠️ ¡Advertencia Importante!

Asegúrate de que el puerto **3000** no esté siendo utilizado por otro proceso en tu máquina antes de ejecutar el comando `docker-compose up`. Si el puerto está ocupado, el contenedor no podrá iniciarse correctamente.