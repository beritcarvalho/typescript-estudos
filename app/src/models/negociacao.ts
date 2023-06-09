import { Modelo } from "../interfaces/Modelo.js";
import { Comparavel } from "../interfaces/comparavel.js";
import { Imprimivel } from "../utils/imprimivel.js";

export class Negociacao implements Modelo<Negociacao> {

    /* Se o construtor da classe, for informado as propriedades como parametro,
    não há necessidade, de desclar as mesmas propriedades. na escopo da classe*/

    /* Caso a propriedade for somente leitura, é possivel tornar as propriedades publicas,
    para elas aparecerem quando o objeto for instanciado e o somente leitura impede a atribuição de valro
    e dispensa a criação de métodos acessadores.*/
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number){};

    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        const regex = /-/g;

        const date = new Date(dataString.replace(regex, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString)

        return new Negociacao(date, quantidade, valor);
    }

    public paraTexto(): string {
        return `Data: ${this.data},\nQuantidade: ${this.quantidade},\nValor: ${this.valor}`;
    }

    public VerificarItemRepetido(negociacao: Negociacao): boolean{
        return this.data.getDate() === negociacao.data.getDate()
        && this.data.getMonth() === negociacao.data.getMonth()
        && this.data.getFullYear() === negociacao.data.getFullYear();
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }
}