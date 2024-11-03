# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Construye el proyecto de NestJS
RUN npm run build

# Expone el puerto que usa tu aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
