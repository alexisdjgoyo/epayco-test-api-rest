# Usa una imagen base de Node.js ligera
FROM node:22-alpine

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias. 
RUN npm install

# Copia el resto del código
COPY . .

# Comando de inicio: Construye la aplicación y luego la inicia
# 'start:dev' usa la configuración de desarrollo, usaré este por temas de ser una prueba
CMD ["npm", "run", "start:dev"]

# Expone el puerto por defecto de NestJS
EXPOSE 3000