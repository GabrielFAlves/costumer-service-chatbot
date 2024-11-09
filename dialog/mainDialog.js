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

const NAME_PROMPT = 'NAME_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const MAIN_PROFILE = 'MAIN_PROFILE';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class MainDialog extends ComponentDialog {
    constructor(userState) {
        super('mainDialog');

        this.mainProfile = userState.createProperty(MAIN_PROFILE);

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));

        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.menuStep.bind(this),
            this.productNameStep.bind(this),
            this.confirmStep.bind(this)
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

        switch(step.values.choice) {
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
                let card = pedido.createPedidoCard(response.data[0]);
                await step.context.sendActivity({ attachments: [card] });
                break;
            }
            case "Extrato de Compras": {
                let extrato = new Extrato();
                let response = await extrato.getExtrato(step.values.inputChoice);
                let card = extrato.createExtratoCard(response.data);
                await step.context.sendActivity({ attachments: [card] });
                break;
            }
            case "Consultar Produtos": {
                let produto = new Produto();
                let response = await produto.getProduto(step.values.inputChoice);
                let card = produto.createProductCard(response.data[0]);
                await step.context.sendActivity({ attachments: [card] });
                break;
            }
        }
        return await step.endDialog();
    }
}

module.exports.MainDialog = MainDialog;