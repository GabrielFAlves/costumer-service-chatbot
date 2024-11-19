const axios = require('axios').default;
const { CardFactory } = require('botbuilder');

class Produto {

    urlApi = 'http://kudus-bgg5cke0e5bkgch4.centralus-01.azurewebsites.net/products';

    // Requests
    async getProduto(productName) {
        const headers = {
            'ocp-apim-subscription-key': '8ef0a7b573104f31bbdc17d838c76a2a'
        };
        return await axios.get(`${this.urlApi}?productName=${productName}`, { headers: headers });
    }

    async validateTransaction(productId, accountId, cardNumber) {
        const url = 'https://kudus-bgg5cke0e5bkgch4.centralus-01.azurewebsites.net/checkout';
        const body = {
            productId: productId,
            accountId: accountId,
            numeroCartao: cardNumber
        };
    
        const headers = {
            'Content-Type': 'application/json',
        };
    
        try {
            const response = await axios.post(url, body, { headers: headers });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            const responseError = error.response?.data || error.message;
            console.error('Erro ao processar o checkout.');
    
            return {
                success: false,
                message: responseError.errors?.[0]?.message || 'Transação Não Autorizada.',
                data: responseError
            };
        }
    }    
    
    // Responses
    createProductCard(response) {
        return CardFactory.thumbnailCard(
            response.productName,
            [{ url: response.urlFoto }],
            [],
            {
                subtitle: `Preço do produto: ${response.price}`,
                text: response.productDescription
            }
        );
    }

    createOrderCard(response) {
        return CardFactory.thumbnailCard(
            response.status,
            [],
            ["Continuar"],
            {
                subtitle: `Código do Pedido: ${response.orderId}`,
                text:  `Horário da Compra: ${response.dataCompra}`
            }
        );
    }

}

module.exports.Produto = Produto;