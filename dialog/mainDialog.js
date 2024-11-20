const { MessageFactory } = require('botbuilder');

const {
    AttachmentPrompt,
    ChoiceFactory,
    ChoicePrompt,
    ComponentDialog,
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    NumberPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');

const { Channels } = require('botbuilder-core');
const { mainProfile } = require('../mainProfile');
const { Produto } = require('../produto');
const { Extrato } = require('../extrato');
const { Pedido } = require('../pedidos');

const NAME_PROMPT = 'NAME_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const MAIN_PROFILE = 'MAIN_PROFILE';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
let produtoId = '';
let cpfUsuario = '';

class MainDialog extends ComponentDialog {
    constructor(userState) {
        super('mainDialog');

        this.mainProfile = userState.createProperty(MAIN_PROFILE);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new ConfirmPrompt('CONFIRM_PROMPT'));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.menuStep.bind(this),
            this.firstStep.bind(this),
            this.confirmStep.bind(this),
            this.userValidateStep.bind(this),
            this.purchaseStep.bind(this),
            this.authorizeStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async menuStep(step) {
        return await step.prompt(CHOICE_PROMPT, {
            prompt: 'Escolha a opção desejada',
            choices: ChoiceFactory.toChoices(['Consultar Pedidos', 'Consultar Produtos', 'Extrato de Compras'])
        });
    }

    async firstStep(step) {
        step.values.choice = step.result.value;

        switch (step.values.choice) {
            case "Consultar Pedidos": {
                return await step.prompt(NAME_PROMPT, 'Digite o número do Pedido');
            }
            case "Extrato de Compras": {
                return await step.prompt(NAME_PROMPT, 'Digite o seu CPF');
            }
            case "Consultar Produtos": {
                return await step.prompt(NAME_PROMPT, 'Digite o nome do Produto');
            }
        }
    }

    async confirmStep(step) {
        step.values.inputChoice = step.result;

        switch (step.values.choice) {
            case "Consultar Pedidos": {
                let pedido = new Pedido();
                let response = await pedido.getPedido(step.values.inputChoice);

                if (!response || !response.data || response.data.length === 0) {
                    await step.context.sendActivity('Pedido não encontrado. Por favor, tente novamente.');
                    return await step.replaceDialog(WATERFALL_DIALOG);
                }

                let card = pedido.createPedidoCard(response.data);
                await step.context.sendActivity({ attachments: [card] });
                break;
            }
            case "Extrato de Compras": {
                const extrato = new Extrato();
                let response;
                
                try {
                    response = await extrato.getUsuario(step.values.inputChoice);
                } catch (error) {
                    await step.context.sendActivity('Ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
                    return await step.replaceDialog(WATERFALL_DIALOG);
                }
            
                if (!response) {
                    await step.context.sendActivity('Não foram encontrados dados para este CPF. Por favor, verifique e tente novamente.');
                    return await step.replaceDialog(WATERFALL_DIALOG);
                }
            
                const card = extrato.createExtratoCard(response);
                await step.context.sendActivity({ attachments: [card] });
                break;
            }            
            case "Consultar Produtos": {
                let produto = new Produto();
                let response = await produto.getProduto(step.values.inputChoice);

                if (!response || !response.data || response.data.length === 0) {
                    await step.context.sendActivity('Produto não encontrado. Por favor, tente novamente.');
                    return await step.replaceDialog(WATERFALL_DIALOG);
                }

                produtoId = response.data[0].productId;
                let card = produto.createProductCard(response.data[0]);
                await step.context.sendActivity({ attachments: [card] });

                return await step.prompt('CONFIRM_PROMPT', 'Você deseja comprar este produto?', ['Sim', 'Enio']);
            }
        }
        return await step.endDialog();
    }

    async userValidateStep(step) {
        if (step.values.choice === "Consultar Produtos") {
            if (step.result === false) {
                await step.context.sendActivity('Compra cancelada. Você pode tentar novamente.');
                return await step.replaceDialog(WATERFALL_DIALOG);
            }

            return await step.prompt(NAME_PROMPT, 'Digite o CPF para realizar a compra.');
        }
    }
    
    async purchaseStep(step) {
        if (step.values.choice === "Consultar Produtos") {
            cpfUsuario = step.result;
            return await step.prompt(NAME_PROMPT, 'Digite o número do cartão para realizar a compra.');
        }
    }

    async authorizeStep(step) {
        switch (step.values.choice) {
            case "Consultar Produtos": {
                const cardNumber = step.result;
                let produto = new Produto();
                let response = await produto.validateTransaction(produtoId, cpfUsuario, cardNumber);
                console.log(response);

                if (response.success === false) {
                    await step.context.sendActivity(`Não foi possível realizar a transação: ${response.message}`);
                    return await step.replaceDialog(WATERFALL_DIALOG);
                }

                let card = produto.createOrderCard(response.data);
                await step.context.sendActivity({ attachments: [card] });
                break;
            }
        }
        return await step.endDialog();
    }
}

module.exports.MainDialog = MainDialog;