# DevOps Pipeline Demo 🚀

Bu proje, modern bir web uygulamasının **Konteynerleştirme (Docker)** ve **CI/CD (GitHub Actions)** süreçlerini uçtan uca simüle etmek amacıyla hazırlanmış bir eğitim çalışmasıdır.

---

## 📖 Temel Kavramlar

### DevOps Nedir?
DevOps; yazılım geliştirme (**Dev**) ve sistem operasyonları (**Ops**) ekipleri arasındaki iletişimi, iş birliğini ve entegrasyonu vurgulayan bir kültür ve uygulamalar bütünüdür. Amacı, daha hızlı ve kaliteli yazılım teslimatı sağlamaktır.

### Docker Nedir?
Docker, uygulamaları bağımlılıklarıyla birlikte izole edilmiş birimler (**Konteynerler**) halinde paketlemeyi sağlayan bir platformdur. "Benim makinemde çalışıyordu" sorununu ortadan kaldırır.

### CI/CD Nedir?
- **CI (Continuous Integration):** Kod değişikliklerinin sık sık ana branch'e entegre edilmesi ve otomatik olarak test edilmesidir.
- **CD (Continuous Deployment/Delivery):** Testten geçen kodun otomatik olarak üretim ortamına (Production) dağıtılması sürecidir.

---

## 📊 Önemli Prensipler ve Metrikler

### DORA Metrikleri
Yazılım teslimat performansını ölçmek için kullanılan 4 ana metrik:
1. **Deployment Frequency:** Ne kadar sık deploy çıkıyoruz?
2. **Lead Time for Changes:** Kodun yazılmasıyla yayına çıkması arasındaki süre.
3. **Change Failure Rate:** Yayına çıkan değişikliklerin yüzde kaçı hata alıyor?
4. **Time to Restore Service:** Bir hata oluştuğunda sistemi geri yükleme süresi.

### 12-Factor App Prensipleri (Bu Projede Kullanılanlar)
- **III. Config:** Ayarlar ortam değişkenlerinde (ENV) tutulur.
- **IV. Backing Services:** Veritabanı (Postgres) bağlı bir kaynak olarak ele alınır.
- **VI. Processes:** Uygulama stateless (durumsuz) olarak çalışır.
- **X. Dev/Prod Parity:** Yerel ortam ile üretim ortamı olabildiğince benzer tutulur (Docker Compose).

---

## 🛠️ Kurulum ve Çalıştırma

### 1. Yerel Geliştirme Ortamı
Bağımlılıkları yükleyin:
```bash
npm install
```

Uygulamayı geliştirme modunda başlatın:
```bash
npm run dev
```

### 2. Testler
Unit testleri çalıştırmak için:
```bash
npm test
```

### 3. Docker ile Çalıştırma
Tek başına imajı build edin:
```bash
docker build -t devops-pipeline-demo .
```

Konteyner olarak çalıştırın:
```bash
docker run -p 3000:3000 --env-file .env.example devops-pipeline-demo
```

### 4. Docker Compose (Full Stack)
API ve Veritabanını aynı anda başlatmak için:
```bash
docker compose up --build
```

---

## 🔗 CI/CD Pipeline Yapısı (GitHub Actions)

`.github/workflows/ci-cd.yml` dosyası şu adımları izler:
1. **Checkout:** Kodu GitHub sunucusuna çeker.
2. **Setup:** Node.js ortamını hazırlar.
3. **Install:** Bağımlılıkları yükler.
4. **Test:** Otomatik testleri (Jest) çalıştırır. Eğer testler başarısız olursa süreç durur.
5. **Build:** Docker imajını oluşturur.
6. **Security Scan:** **Trivy** aracı ile imaj içindeki güvenlik zafiyetlerini tarar.
7. **Deploy:** (Simüle) Eğer tüm adımlar başarılıysa yayına gönderir.

---

## 🏥 Sağlık Kontrolleri (Health Checks)
- **Liveness (/healthz):** Uygulamanın yaşadığını kontrol eder. Konteyner donarsa orchestrator (K8s/Docker) container'ı yeniden başlatır.
- **Readiness (/readyz):** Uygulamanın trafik almaya hazır olup olmadığını (DB bağlantısı vb.) kontrol eder.

---

## 🛡️ Production Hardening Checklist
- [x] Multi-stage build (İmaj boyutunu küçültme).
- [x] Root olmayan kullanıcı (**node user**) ile çalıştırma (Güvenlik).
- [x] Hassas verilerin (Secrets) ENV üzerinden yönetilmesi.
- [x] Güvenlik taraması (Trivy) entegrasyonu.
- [ ] HTTPS/SSL sertifikası.
- [ ] Merkezi loglama sistemi (ELK/Graylog).
- [ ] Resource Limits (CPU/RAM sınırlaması).

---

**DevOps Pipeline Demo** - Rabia tarafından hazırlandı.
