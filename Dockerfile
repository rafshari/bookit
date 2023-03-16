FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]



# # Base on offical Node.js Alpine image
# FROM node:18-alpine 

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json before other files
# # Utilise Docker cache to save re-installing dependencies if unchanged
# COPY ./package*.json ./

# # Install dependencies
# RUN npm install --production

# # Copy all files
# COPY ./ ./

# # Build app
# RUN npm run build

# # Expose the listening port
# EXPOSE 3000

# # Run container as non-root (unprivileged) user
# # The node user is provided in the Node.js Alpine base image
# USER node

# # Run npm start script when container starts
# CMD [ "npm", "start" ]













# FROM node:18-alpine as build
# WORKDIR /app
# COPY package.json /app/package.json
# RUN npm install --only=prod
# COPY . .
# RUN npm run build
# # Creating nginx image and copy build folder from above
# # FROM nginx:1.16.0-alpine
# FROM nginx:stable-alpine
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /app/out /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
# FROM node:18-alpine AS base

# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /bookit

# COPY package.json package-lock.json* ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# FROM base AS builder
# WORKDIR /bookit
# COPY --from=deps /bookit/node_modules ./node_modules
# COPY . .

# RUN npm run build

# FROM base AS runner
# WORKDIR /bookit

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /bookit/public ./public

# COPY --from=builder --chown=nextjs:nodejs /bookit/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /bookit/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# CMD ["node", "server.js"]

# FROM nginx:1.22.1-alpine 

# RUN mkdir /usr/share/nginx/buffer

# COPY --from=build /bookit/.next /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx/nginx.conf /etc/nginx/conf.d 

# EXPOSE 80 

# CMD ["nginx","-g","daemon off;"]


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
