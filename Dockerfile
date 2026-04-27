# --- Stage 1: Build ---
# Uygulamanın bağımlılıklarını yüklediğimiz aşama
FROM node:20-alpine AS builder

WORKDIR /app

# Sadece package dosyalarını kopyalayarak cache avantajı sağlıyoruz
COPY package*.json ./

# Sadece production bağımlılıklarını değil, testler için tüm bağımlılıkları yüklüyoruz
RUN npm install

# Kaynak kodları kopyala
COPY . .

# --- Stage 2: Production ---
# Uygulamanın çalıştığı güvenli ve küçük boyuttaki son aşama
FROM node:20-alpine

WORKDIR /app

# Sadece gerekli production bağımlılıklarını builder aşamasından alıyoruz
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Sadece gerekli kaynak kodları kopyalıyoruz
COPY --from=builder /app/src ./src

# Ortam değişkenleri
ENV NODE_ENV=production
ENV PORT=3000

# Güvenlik için uygulamayı root olmayan bir kullanıcıyla çalıştırıyoruz
USER node

# Uygulama portunu dışarı aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "src/index.js"]
