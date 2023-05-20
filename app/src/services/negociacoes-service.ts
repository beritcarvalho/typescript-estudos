import { NegociacaoDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {
    public obterNegociacoesDoDia(): Promise<Array<Negociacao>> {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dadosApi: Array<NegociacaoDoDia>) => {
                return dadosApi.map(dadoApi => {
                    return new Negociacao(new Date(), dadoApi.vezes, dadoApi.montante)
                })
            });
    }
}
