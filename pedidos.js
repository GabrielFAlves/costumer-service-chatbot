const axios = require('axios').default;
const { CardFactory } = require('botbuilder');

class Pedido {
    urlApi = 'http://localhost:8080/orders';

    constructor(context) {
        this.context = context;
    }

    async getPedido(orderId) {
        const headers = {
            'ocp-apim-subscription-key': '8ef0a7b573104f31bbdc17d838c76a2a'
        };
        return await axios.get(`${this.urlApi}?orderId=${orderId}`, { headers: headers });
    }

    createPedidoCard(response) {
        return CardFactory.thumbnailCard(
            `Pedido de Compras: ${response.orderId}`,
            [],
            [],
            {
                subtitle: `Status: ${response.status}`,
                text: `ID do Produto: ${response.productId}\nID do Usuário: ${response.accountId}\nData do Pedido: ${response.dataOrder}`
            }
        );
    }
}

module.exports.Pedido = Pedido;
