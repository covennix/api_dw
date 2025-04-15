const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8086;

// uscar dados CEP
app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    try {
        const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        const { street, neighborhood, city, state, service } = response.data;

        res.send(`O CEP ${cep} pertence à rua ${street}, no bairro ${neighborhood}, cidade de ${city} - ${state}. Fonte: ${service}.`);
    } catch (error) {
        res.status(404).send(`Erro ao buscar informações do CEP ${cep}. Verifique se ele está correto.`);
    }
});

// Listar municípios
app.get('/municipios/:uf', async (req, res) => {
    const { uf } = req.params;

    try {
        const response = await axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`);
        const nomes = response.data.map(m => m.nome);

        res.send(`Municípios de ${uf}: ${nomes.join(', ')}.`);
    } catch (error) {
        res.status(404).send(`Erro ao buscar municípios para o estado ${uf}.`);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
