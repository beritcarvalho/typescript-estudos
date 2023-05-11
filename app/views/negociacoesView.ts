import { Negociacoes } from "../models/negociacoes.js";

export class NegociacoesView {

    private elemento: HTMLElement;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    template(negociacoes: Negociacoes): string {
        return `
        <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
            </tr>
        </thead>
        <tbody>
            ${negociacoes.lista().map(negociacao => {
                return `
                    <tr>
                        <td>${new Intl.DateTimeFormat().format(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>            
                    </tr>                
                `
            }).join('')}
        </tbody>
    </table>
        `;
    }

    update(negociacoes: Negociacoes): void {
        this.elemento.innerHTML = this.template(negociacoes);
    }
}
