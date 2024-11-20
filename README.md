# Documentação do Chatbot

## Equipe
- Guilherme Firmeza
- Gustavo Raia
- Gabriel Firmamento

## Visão Geral
Este chatbot oferece funcionalidades para consultar produtos, verificar pedidos e visualizar extratos de compras. Abaixo estão as instruções e detalhes para cada tipo de consulta.

### 1. Consulta de Produtos
Para consultar os produtos disponíveis, você precisa digitar o nome de um dos produtos listados abaixo. O chatbot responderá com os detalhes do produto, se disponível.

**Lista de Produtos Disponíveis:**

| Nome do Produto | _productId_ |
|----------------- |----------------- |
| Smart TV Crystal Samsung 50 | 7520fbf1-2e43-40f6-8c0e-da2f0e579fa5 |
| Notebook Acer Aspire 5 | d9b0fa89-a1d7-40f8-bbf9-b45575a25c06 |
| iPhone 14 Pro Max | 56771986-6a6a-49f6-899e-f352fceeee09 |
| Câmera GoPro HERO11 | 4682c86a-d0d9-48c2-9d00-9119c3c5d8a5 |
| Fone de Ouvido Bluetooth JBL Tune 750 | 6faf4ca1-e2eb-4b1b-b3a1-bb6e006c4495 |
| Jogo de Facas Zwilling Pro | bce65884-f4c6-491f-a6c2-68c0c5e5770f |
| Frigideira Tramontina | 0a2dc639-850e-43f7-8a0c-254767bd27c5 |
| Diário de um Banana | 0a2080fd-7bdc-4027-bef4-180873e21415 |
| O Alquimista| 673025e5-c7eb-47c8-9f60-342bb89570cc |
| 1984 | e49886be-afb1-470d-b849-efae69727fd2 |

### 2. Consulta de Pedidos
Para consultar um pedido, é necessário fornecer o ID do pedido. O chatbot retornará os detalhes correspondentes.

**Lista de IDs de Pedidos Disponíveis:**

| ID do Pedido |
|--------------|
| 46a0b15e-1b5d-471e-8266-132ef37608cb |
| b11bc5d7-544d-4693-9a64-25c60c91aed7 |
| 4455e76f-64e9-43f3-884a-ab51a2c7855c |
| ece9b7cb-95ed-4ebb-a520-177a257df960 |
| d50abb95-066c-4218-8967-9f78db2d5cb5 |

### 3. Extrato de Compras
Para acessar o extrato de compras, é necessário o ID do usuário. O chatbot fornecerá o histórico de compras do usuário especificado.

**Lista de IDs de Usuários Disponíveis:**

| ID do Usuário |
|---------------|
| 123.456.789-23 |
| 285.098.820-02 |
| 025.482.870-17 |
| 498.419.930-07 |
| 530.645.750-90 |

## Como Usar
- **Consulta de Produtos**: Digite o nome do produto que deseja consultar.
- **Consulta de Pedidos**: Forneça o ID do pedido para recuperar os detalhes do pedido.
- **Extrato de Compras**: Insira o ID do usuário para visualizar o extrato de compras.


------

# Bot Configuration
Demonstrate the core capabilities of the Microsoft Bot Framework

This bot has been created using [Bot Framework](https://dev.botframework.com), it shows how to create a simple bot that accepts input from the user and echoes it back.

## Prerequisites

- [Node.js](https://nodejs.org) version 10.14.1 or higher

    ```bash
    # determine node version
    node --version
    ```

## To run the bot

- Install modules

    ```bash
    npm install
    ```

- Start the bot

    ```bash
    npm start
    ```

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.9.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## Deploy the bot to Azure

To learn more about deploying a bot to Azure, see [Deploy your bot to Azure](https://aka.ms/azuredeployment) for a complete list of deployment instructions.


## Further reading

- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Dialogs](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0)
- [Gathering Input Using Prompts](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-prompts?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
- [Azure Portal](https://portal.azure.com)
- [Language Understanding using LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/)
- [Channels and Bot Connector Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [Restify](https://www.npmjs.com/package/restify)
- [dotenv](https://www.npmjs.com/package/dotenv)
