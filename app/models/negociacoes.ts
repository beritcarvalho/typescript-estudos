import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    //outra forma de declarar array Array<Negociacao> = [];
    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao)
    }

    //é possivel indicar se a lista retorna é somente leitura declarando array readonly ReadonlyArray<Negociacao>
    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }
}