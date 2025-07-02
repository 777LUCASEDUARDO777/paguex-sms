require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/webhook/sms', async (req, res) => {
  try {
    const data = req.body.data;
    if (!data || data.status !== 'pending') {
      return res.status(200).send('Ignorado: status não é pending.');
    }

    const nome = data.customer?.name || 'cliente';
    const telefone = '+55' + data.customer?.phone;
    const valor = (data.amount / 100).toFixed(2);
    const link = data.secureUrl;

    const mensagem = `⚠️ Oi ${nome}, sua compra de R$${valor} está pendente.
Finalize aqui: ${link}
🔒 Compra protegida e assegurada pelo banco recebedor.`;

    const smsRes = await axios.get('https://api.smsdev.com.br/v1/send', {
      params: { key: process.env.SMSDEV_TOKEN, type: 9, number: telefone, msg: mensagem }
    });

    console.log('✅ SMS enviado:', smsRes.data);
    return res.status(200).send('SMS enviado.');
  } catch (err) {
    console.error('❌ Erro no webhook:', err.message);
    return res.status(500).send('Erro interno.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 rodando na porta ${PORT}`));
