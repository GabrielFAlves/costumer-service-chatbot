const axios = require('axios').default;
const { CardFactory } = require('botbuilder');

class Extrato {

    urlApi = 'http://kudus-bgg5cke0e5bkgch4.centralus-01.azurewebsites.net/purchases';

    constructor(context) {
        this.context = context;
    }

    async getExtrato(accountId) {
        const headers = {
            'ocp-apim-subscription-key': '8ef0a7b573104f31bbdc17d838c76a2a'
        };
        return await axios.get(`${this.urlApi}?accountId=${accountId}`, { headers: headers });
    }

    createExtratoCard(response) {
        return CardFactory.thumbnailCard(
            `Extrato de Compras`,
            [{url: "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"}],
            ["Continuar"],
            {
                subtitle: `Total Gasto: ${response.totalSpent} R$ \n\n\n\n\n\n\n Última Compra: ${response.lastPurchase}`,
                text: `ID Usuário: ${response.accountId}`
            }
        );
    }
}

module.exports.Extrato = Extrato;