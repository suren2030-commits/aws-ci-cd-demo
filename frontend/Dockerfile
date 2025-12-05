# ---------- Stage 1: Build Angular app ----------
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build -- --configuration=production

# ---------- Stage 2: Nginx to serve static files ----------
FROM nginx:1.25-alpine

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Angular 17+/CLI 21 output path: dist/<project-name>/browser
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
