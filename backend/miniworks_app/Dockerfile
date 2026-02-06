# Simple Nginx-based Dockerfile that serves pre-built Flutter web app
FROM ghcr.io/cirruslabs/flutter:3.24.0 AS builder

# Copy pre-built web app to nginx
COPY build/web /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
