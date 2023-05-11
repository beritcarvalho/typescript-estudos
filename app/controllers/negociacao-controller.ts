import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private intputQuantidade: HTMLInputElement;
    private intputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();

    constructor() {
        this.inputData = document.querySelector('#data');
        this.intputQuantidade = document.querySelector('#quantidade');
        this.intputValor = document.querySelector('#valor');
    }

    adiciona(): void {
        const negociacao = this.criaNegociacao();
        this.negociacoes.adiciona(negociacao)
       
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