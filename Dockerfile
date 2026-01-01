FROM node:18-alpine

# Install yt-dlp binary & ffmpeg (wajib buat merge video+audio)
RUN apk add --no-cache python3 py3-pip ffmpeg && \
    pip3 install --no-cache-dir yt-dlp && \
    apk del py3-pip

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
