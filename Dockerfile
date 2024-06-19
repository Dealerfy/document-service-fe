FROM node:lts as builder

WORKDIR /app

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL ${VITE_API_URL}

RUN npm install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

RUN npm run build
RUN npm i -g husky

RUN rm -rf node_modules && \
    NODE_ENV=production && \
    npm install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true

FROM steebchen/nginx-spa:stable

# adapt the `dist/` folder to the output directory your build tool uses (such as `dist/`, `build/` or `www/`).
COPY --from=builder /app/dist /app

EXPOSE 80

CMD ["nginx"]