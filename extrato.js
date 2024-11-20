const axios = require('axios').default;
const { CardFactory } = require('botbuilder');

class Extrato {
    constructor(context) {
        this.context = context;
    }

    async getUsuario(cpf) {
        const urlApi = 'https://jhanus-gzhqcpheekdahpc6.eastus-01.azurewebsites.net//usuario';
        try {
            const response = await axios.get(`${urlApi}?cpf=${cpf}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn(`CPF ${cpf} não encontrado.`);
                return null;
            }
            console.error('Erro ao buscar dados do usuário:', error.message);
            throw new Error('Erro ao processar a solicitação.');
        }
    }

    createExtratoCard(usuarioData) {
        const { nome, cartoes } = usuarioData;

        if (!cartoes || cartoes.length === 0) {
            return CardFactory.adaptiveCard({
                type: "AdaptiveCard",
                body: [
                    {
                        type: "TextBlock",
                        text: `Extrato de Compras`,
                        weight: "Bolder",
                        size: "Medium"
                    },
                    {
                        type: "TextBlock",
                        text: `Usuário: ${nome}`,
                        wrap: true
                    },
                    {
                        type: "TextBlock",
                        text: "Nenhum cartão encontrado para este usuário.",
                        wrap: true,
                        weight: "Lighter"
                    }
                ],
                actions: [
                    {
                        type: "Action.Submit",
                        title: "Continuar"
                    }
                ],
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.3"
            });
        }

        const cartao = cartoes[0];
        const transacoes = cartao.transacoes || [];

        const transactionItems = transacoes.map(transacao => ({
            type: "Container",
            items: [
                {
                    type: "TextBlock",
                    text: `Data: ${new Date(transacao.dataTransacao).toLocaleString()}`,
                    wrap: true,
                    weight: "Bolder"
                },
                {
                    type: "TextBlock",
                    text: `Comerciante: ${transacao.comerciante}`,
                    wrap: true,
                    spacing: "Small"
                },
                {
                    type: "TextBlock",
                    text: `Valor: R$ ${transacao.valor.toFixed(2)}`,
                    wrap: true,
                    spacing: "Small"
                }
            ],
            separator: true,
            spacing: "Medium"
        }));

        return CardFactory.adaptiveCard({
            type: "AdaptiveCard",
            body: [
                {
                    type: "TextBlock",
                    text: `**Extrato de Compras**`,
                    weight: "Bolder",
                    size: "Large"
                },
                {
                    type: "TextBlock",
                    text: `_Usuário:_ ${nome}`,
                    wrap: true,
                    spacing: "Small"
                },
                {
                    type: "TextBlock",
                    text: `_Total de Transações:_ ${transacoes.length}`,
                    wrap: true,
                    spacing: "Small"
                },
                {
                    type: "TextBlock",
                    text: `**Transações:**`,
                    weight: "Bolder",
                    spacing: "Medium",
                    size: "Medium"
                },
                ...transactionItems
            ],
            actions: [
                {
                    type: "Action.Submit",
                    title: "Continuar"
                }
            ],
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            version: "1.3"
        });
    }
}

module.exports.Extrato = Extrato;