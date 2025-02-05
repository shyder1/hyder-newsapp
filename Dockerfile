# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

ARG REACT_APP_GUARDIAN_API_KEY
ARG REACT_APP_NEWS_API_KEY
ARG REACT_APP_NYT_API_KEY

ENV REACT_APP_GUARDIAN_API_KEY=$REACT_APP_GUARDIAN_API_KEY
ENV REACT_APP_NEWS_API_KEY=$REACT_APP_NEWS_API_KEY
ENV REACT_APP_NYT_API_KEY=$REACT_APP_NYT_API_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration (if you have custom config)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]