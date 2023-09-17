FROM node:16.15.0

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run prisma:migrate:deploy
RUN npm run prisma:generate
RUN npm run build

CMD ["npm", "run", "start"]