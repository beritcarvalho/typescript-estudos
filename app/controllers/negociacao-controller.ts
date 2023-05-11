import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesView } from "../views/negociacoesView.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private intputQuantidade: HTMLInputElement;
    private intputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');

    constructor() {
        this.inputData = document.querySelector('#data');
        this.intputQuantidade = document.querySelector('#quantidade');
        this.intputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }

    adiciona(): void {
        const negociacao = this.criaNegociacao();
        this.negociacoes.adiciona(negociacao);
        this.negociacoesView.update(this.negociacoes);       
        console.log(this.negociacoes.lista());       

        this.limparFormulario();
    }

    criaNegociacao(): Negociacao {
        const regex = /-/g;

        const date = new Date(this.inputData.value.replace(regex, ','));
        const quantidade = parseInt(this.intputQuantidade.value);
        const valor = parseFloat(this.intputValor.value)

        return new Negociacao(date, quantidade, valor);
    }

    limparFormulario(): void {
        this.inputData.value = '';
        this.intputQuantidade.value = '';
        this.intputValor.value = '';

        this.inputData.focus();
    }
}