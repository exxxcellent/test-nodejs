FROM node:22-alpine

WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Run prisma generate
RUN npx prisma generate

# Copy application code
COPY . .

# Run applcation
CMD ["npm", "run", "start"]

EXPOSE 3000