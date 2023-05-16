import { EDiasDaSemana } from "../enums/dia-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoesView.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private intputQuantidade: HTMLInputElement;
    private intputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.inputData = document.querySelector('#data') as HTMLInputElement;
        this.intputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.intputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = this.criaNegociacao();
        
        if (!this.verificaDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas',true);
            return;
        }

        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }

    private criaNegociacao(): Negociacao {
        const regex = /-/g;

        const date = new Date(this.inputData.value.replace(regex, ','));
        const quantidade = parseInt(this.intputQuantidade.value);
        const valor = parseFloat(this.intputValor.value)

        return new Negociacao(date, quantidade, valor);
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.intputQuantidade.value = '';
        this.intputValor.value = '';

        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }

    private verificaDiaUtil(data: Date): boolean {
        return data.getDay() > EDiasDaSemana.Domingo && data.getDay() < EDiasDaSemana.Sabado;
    }
}