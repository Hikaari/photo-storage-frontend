# ---- build stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime stage ----
FROM nginx:alpine

# nginx слушает 80
EXPOSE 80

# если билд кладёт файлы в dist:
COPY --from=build /app/dist /usr/share/nginx/html

# если у тебя папка build, а не dist — вместо этого:
# COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
