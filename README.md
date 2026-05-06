# LUMINA FEST Weather API

API intermediária desenvolvida em Node.js, TypeScript e Express para consultar e tratar dados de previsão climática do evento LUMINA FEST.

A API consome dados da Open-Meteo, processa as informações meteorológicas e retorna uma resposta estruturada e pronta para consumo por aplicações externas.

---

## Objetivo

Fornecer uma previsão climática resumida para os dias do evento LUMINA FEST, considerando a cidade fictícia Aurora.

A previsão utiliza como referência meteorológica as coordenadas de São Paulo/SP.

---

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- CORS
- Dotenv
- Open-Meteo API

---

## Dados do evento

- Evento: LUMINA FEST
- Cidade exibida: Aurora
- Cidade de referência climática: São Paulo/SP
- Datas analisadas:
  - 14 de maio de 2026
  - 15 de maio de 2026
  - 16 de maio de 2026
- Período analisado:
  - 17h à 01h

---

## Endpoints

### Health Check

Verifica se a API está em execução.

```http
GET /health
```

Exemplo de resposta:

```json
{
  "success": true,
  "message": "API LUMINA FEST running!"
}
```

---

### Previsão climática do evento

Retorna a previsão climática tratada para os dias do LUMINA FEST.

```http
GET /weather/lumina-fest
```

Esse endpoint não recebe body nem query params, pois os dados do evento são fixos na aplicação.

Exemplo de resposta:

```json
{
  "success": true,
  "event": "LUMINA FEST",
  "city": "Aurora",
  "weatherReferenceCity": "São Paulo, SP",
  "period": "17h à 01h",
  "source": "Open-Meteo",
  "generatedAt": "2026-05-06T18:00:00.000Z",
  "days": [
    {
      "date": "2026-05-14",
      "displayDate": "14 de maio",
      "period": "17h à 01h",
      "condition": "parcialmente nublado",
      "temperatureMin": 18,
      "temperatureMax": 24,
      "apparentTemperatureMin": 17,
      "apparentTemperatureMax": 25,
      "rainProbability": 45
    }
  ],
  "answer": "Aqui está a previsão para os 3 dias do LUMINA FEST..."
}
```

---

## Como rodar o projeto localmente

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
```

### 2. Acessar a pasta do projeto

```bash
cd lumina-fest-weather-api
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Criar o arquivo de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
```

### 5. Rodar em modo desenvolvimento

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3000
```

---

## Scripts disponíveis

### Desenvolvimento

```bash
npm run dev
```

Executa a aplicação em modo desenvolvimento.

### Build

```bash
npm run build
```

Compila o projeto TypeScript para JavaScript.

### Produção

```bash
npm start
```

Executa a versão compilada da aplicação.

---

## Estrutura do projeto

```txt
src/
├── clients/
│   └── openMeteo.client.ts
├── config/
│   └── event.config.ts
├── controllers/
│   └── weather.controller.ts
├── middlewares/
│   └── errorHandler.ts
├── routes/
│   ├── health.routes.ts
│   └── weather.routes.ts
├── services/
│   └── weather.service.ts
├── types/
│   └── weather.types.ts
├── utils/
│   ├── date.ts
│   └── weatherCode.ts
├── app.ts
└── server.ts
```

---

## Decisões técnicas

### API intermediária

A API foi estruturada como uma camada intermediária entre a aplicação consumidora e a API externa de clima.

Essa abordagem permite:

- centralizar regras de negócio;
- padronizar a resposta;
- isolar a aplicação consumidora da estrutura da API externa;
- tratar os dados meteorológicos antes de retorná-los;
- facilitar manutenção e evolução do projeto.

### Uso de GET

O endpoint principal utiliza o método `GET`, pois a operação apenas consulta dados e não cria ou altera recursos.

```http
GET /weather/lumina-fest
```

### Tratamento dos dados climáticos

A API consulta dados horários da Open-Meteo e processa as informações para gerar um resumo por dia.

Para cada dia do evento, são retornados:

- condição climática;
- temperatura mínima;
- temperatura máxima;
- sensação térmica mínima;
- sensação térmica máxima;
- chance de chuva.

---

## Fonte dos dados

Os dados climáticos são obtidos por meio da Open-Meteo API.

Coordenadas utilizadas como referência:

- Latitude: -23.5505
- Longitude: -46.6333
- Timezone: America/Sao_Paulo

---

## Autor

Desenvolvido por Matheus Sodré.