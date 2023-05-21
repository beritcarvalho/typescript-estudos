export abstract class View<T> {

    protected elemento: HTMLElement;
    protected erro: boolean;
    //private escapar: boolean;

    constructor(seletor: string, /*escapar: boolean = false*/) {
        //this.escapar = escapar;
        const elemento = document.querySelector(seletor)
        if (elemento) {
            this.elemento = <HTMLElement>elemento;
        }
        else {
            throw Error('Elemento não encontrado')
        }
    }

    protected abstract template(model: T): string;

    public update(model: T, erro: boolean = false): void {
        this.erro = erro;
        let template = this.template(model);

        /*if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }*/

        this.elemento.innerHTML = template;
    }
}