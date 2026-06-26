const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Nosso banco de dados temporário na memória RAM
let dadosDaPulseira = {};

// 1. Rota POST: O Flutter (Celular) envia os dados para cá
app.post('/api/rastreio', (req, res) => {
    dadosDaPulseira = req.body;
    console.log("Dados recebidos do app:", dadosDaPulseira);
    res.status(200).send({ mensagem: 'Recebido com sucesso' });
});

// 2. Rota GET: O site (JavaScript) lê os dados daqui a cada 3 segundos
app.get('/api/rastreio', (req, res) => {
    res.status(200).json(dadosDaPulseira);
});

// 3. Rota Principal: Entrega o seu index.html quando alguém acessar o link do Render
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// O Render injeta a porta automaticamente, ou usamos a 3000 localmente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});