# ---- build stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime stage ----
FROM nginx:alpine

# Удалим дефолтный конфиг, чтобы не мешался
RUN rm /etc/nginx/conf.d/default.conf

# Кладём наш SPA-конфиг
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Кладём собранный фронт
COPY --from=build /app/dist /usr/share/nginx/html
# если у тебя build вместо dist:
# COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

