FROM node:20-alpine

# Install Python, ffmpeg, & yt-dlp dengan bypass PEP 668
RUN apk update && \
    apk add --no-cache python3 ffmpeg && \
    python3 -m ensurepip && \
    python3 -m pip install --no-cache-dir --break-system-packages yt-dlp && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
