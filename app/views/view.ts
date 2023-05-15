export abstract class View<T> {
    
    protected elemento: HTMLElement;
    protected erro: boolean;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    protected abstract template(model: T): string;

    public update(model: T, erro = false): void {
        this.erro = erro;
        const template = this.template(model);
        this.elemento.innerHTML = template;        
    }
}