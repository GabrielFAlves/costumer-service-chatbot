const axios = require('axios').default;
const { CardFactory } = require('botbuilder');

class Pedido {
    urlApi = 'http://kudus-bgg5cke0e5bkgch4.centralus-01.azurewebsites.net/orders';

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
            `Pedido de Compras: ${response.productName}`,
            [],
            ["Continuar"],
            {
                subtitle: `Status: ${response.status}`,
                text: `ID do Produto: ${response.productId} \n\n\n\n ID do Usuário: ${response.accountId} \n\n\n\n Data do Pedido: ${response.dataOrder}`
            }
        );
    }
}

module.exports.Pedido = Pedido;
