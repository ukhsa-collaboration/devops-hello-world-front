# Because NEXT_PUBLIC values get baked in at build time, we set any that need to be accessed 
# to placeholder values so that the replace-variables.sh script can replace the placeholder value with
# the real value as the container starts up. 
ARG NEXT_PUBLIC_API_BASE_URL=PLACEHOLDER_NEXT_PUBLIC_API_BASE_URL

FROM node:slim AS base

WORKDIR /app

COPY ./start /app/start

RUN chmod +x /app/start/docker-entrypoint.sh

FROM base AS dev

WORKDIR /app

COPY . .

RUN chmod +x /app/start/docker-entrypoint.sh /app/start/replace-variables.sh 

RUN npm ci

ENTRYPOINT ["sh", "-c"]

CMD ["/app/start/docker-entrypoint.sh"]

FROM dev AS build

RUN npm run build

FROM node:slim AS production

COPY ./start /app/start
RUN chmod +x /app/start/docker-entrypoint.sh /app/start/replace-variables.sh 
# hadolint ignore=SC3009
RUN mkdir -p public/assets/{styles,images,fonts}

WORKDIR /app

COPY --from=build /app/.next .next
COPY --from=dev /app/node_modules node_modules
COPY --from=dev /app/package.json package.json
COPY --from=dev /app/package-lock.json package-lock.json
COPY --from=dev /app/next.config.ts .
COPY --from=dev /app/scripts scripts
COPY --from=build /app/public public

EXPOSE 3000

ENTRYPOINT ["sh", "-c"]
CMD ["/app/start/docker-entrypoint.sh"]
