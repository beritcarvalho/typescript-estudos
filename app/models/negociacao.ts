export class Negociacao {
    private _data;
    private _quantidade;
    private _valor;

    constructor(data, quantidade, valor){
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    }

    get data(){
        return this._data;
    }

    get valor(){
        return this.valor;
    }

    get quantidade(){
        return this._quantidade;
    }

    get volume(){
        return this._quantidade * this._valor;
    }
}