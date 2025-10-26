# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código
COPY . .

# Exponer puerto de Express
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
