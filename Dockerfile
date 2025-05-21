# Build phase
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve with static server
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80