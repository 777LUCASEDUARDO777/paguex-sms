# Integração Pague X + SMSDev

## Como rodar local

1. `npm install`
2. Crie `.env` com:
   SMSDEV_TOKEN=seu_token_aqui
3. `node server.js`

Webhook: POST http://localhost:3000/webhook/sms

## Deploy no Railway

Importe este repo pelo Railway → defina a variável `SMSDEV_TOKEN` → Deploy.

Use a URL gerada como webhook no Pague X.

