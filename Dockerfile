FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 사용할 포트 번호
CMD ["node", "app.js"]
