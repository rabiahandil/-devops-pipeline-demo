/**
 * DevOps Pipeline Demo
 * Test Dosyası
 * 
 * Bu dosya uygulamanın temel endpoint'lerini test eder.
 */

const request = require('supertest');
const app = require('../src/index');

describe('API Endpoint Testleri', () => {
    
    // Ana sayfa testi
    test('GET / should return success message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe("DevOps Pipeline Demo çalışıyor");
    });

    // Health check testi
    test('GET /healthz should return healthy status', async () => {
        const res = await request(app).get('/healthz');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe("healthy");
    });

    // Ready check testi
    test('GET /readyz should return ready status', async () => {
        const res = await request(app).get('/readyz');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe("ready");
    });
});
