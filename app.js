const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8086;

// Rota 1 - Dog API APENAs testeS

app.get('/dog/:breed', async (req, res) => {
    const { breed } = req.params;

    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`);
        const dog = response.data[0];

        if (!dog) {
            return res.status(404).send(`Não encontramos nenhuma raça chamada "${breed}".`);
        }

        res.send(`A raça ${dog.name} é conhecida por: ${dog.temperament}. Peso médio: ${dog.weight.metric} kg.`);
    } catch (error) {
        res.status(500).send('Erro ao buscar informações da raça.');
    }
});

// Rota 2 - Open Meteo API

app.get('/weather/:lat/:lon', async (req, res) => {
    const { lat, lon } = req.params;

    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: lat,
                longitude: lon,
                current_weather: true
            }
        });

        const weather = response.data.current_weather;
        res.send(`Agora, na coordenada (${lat}, ${lon}), a temperatura é de ${weather.temperature}°C e o clima está ${weather.weathercode === 0 ? 'limpo' : 'variado'}.`);
    } catch (error) {
        res.status(500).send('Erro ao buscar informações climáticas.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
