import { domInjector } from "../decorators/dom-injectors.js";
import { EDiasDaSemana } from "../enums/dia-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoesView.js";

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;

    @domInjector('#quantidade')
    private intputQuantidade: HTMLInputElement;

    @domInjector('#valor')
    private intputValor: HTMLInputElement;

    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesServices = new NegociacoesService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.intputQuantidade.value, this.intputValor.value);

        if (!this.verificaDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas', true);
            return;
        }

        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();
    }

    public importaDatos(): void {
        this.negociacoesServices.obterNegociacoesDoDia()
            .then(listaNegociacaoRetornoApi => {
                return listaNegociacaoRetornoApi.filter(itemListaApi => {
                    return !this.negociacoes.lista()
                        .some(itemListaNegociacao => itemListaNegociacao.VerificarItemRepetido(itemListaApi));
                })
            })
            .then(listaFiltrada => {
                listaFiltrada.forEach(negociacao => this.negociacoes.adiciona(negociacao))
                this.negociacoesView.update(this.negociacoes)
            }
            );
        this.atualizaView();
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