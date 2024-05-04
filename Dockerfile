FROM node:22-alpine3.15 AS builder

ENV NODE_ENV build

WORKDIR /app

COPY . /app
COPY . .
RUN npm ci \
    && npm run build \
    && npm prune --production


FROM node:22-alpine3.15

ENV NODE_ENV production

USER node
# Set working directory
WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/

CMD [ "node","dist/main" ]
