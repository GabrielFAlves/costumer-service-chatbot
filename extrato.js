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
        // Construir uma string com todas as transações
        console.log(response);
        const transactions = response.extractList.map(extract => 
            `- **Data**: ${extract.date}\n  **Descrição**: ${extract.description}\n  **Valor**: ${extract.amount} R$\n  **Saldo**: ${extract.balance} R$`
        ).join('\n\n');

        return CardFactory.thumbnailCard(
            "Extrato de Compras",
            [{ url: "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" }],
            ["Continuar"],
            {
                subtitle: `Total Gasto: ${response.totalSpent} R$\nÚltima Compra: ${response.lastPurchase}`,
                text: `ID Usuário: ${response.accountId}\n\n**Transações:**\n\n${transactions}`
            }
        );
    }
}

module.exports.Extrato = Extrato;
