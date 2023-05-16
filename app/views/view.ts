export abstract class View<T> {
    
    protected elemento: HTMLElement;
    protected erro: boolean;
    private escapar: boolean;

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor)
        if (elemento){
            this.elemento = <HTMLElement>elemento;
        }
        else {
            throw Error ('Elemento não encontrado')
        }        
    }

    protected abstract template(model: T): string;

    public update(model: T, erro = false): void {
        this.erro = erro;
        const template = this.template(model);
        this.elemento.innerHTML = template;        
    }
}