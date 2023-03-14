FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /bookit

COPY package.json package-lock.json* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /bookit
COPY --from=deps /bookit/node_modules ./node_modules
COPY . .

RUN yarn build

FROM base AS runner
WORKDIR /bookit

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /bookit/public ./public

COPY --from=builder --chown=nextjs:nodejs /bookit/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /bookit/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

FROM nginx:1.16.0

COPY --from=build /bookit/.next /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d 

EXPOSE 80 

CMD ["nginx","-g","daemon off;"]


# WORKDIR /bookit

# COPY . .

# COPY --from=deps /bookit/node_modules ./node_modules

# RUN npm run build

# FROM node:alpine AS runner

# ENV NODE_ENV  production

# COPY --from=builder /bookit/public ./public
# COPY --from=builder /bookit/.next ./.next
# COPY --from=builder /bookit/node_modules ./node_modules
# COPY --from=builder /bookit/package.json ./package.jso

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# RUN chown -R nextjs:nodejs /bookit/.next
# RUN next.js

# EXPOSE 3000

# CMD [ "npm", "start" ]
