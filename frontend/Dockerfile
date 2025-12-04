# Use a small nginx image
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy our frontend files into nginx html folder
COPY . /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80

# Default nginx command
CMD ["nginx", "-g", "daemon off;"]
