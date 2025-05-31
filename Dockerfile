FROM node:22-alpine

WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Copy Prisma schema    
COPY prisma ./prisma

# Run prisma generate
RUN npx prisma generate

# Run applcation
CMD ["npm", "run", "start"]

EXPOSE 3000