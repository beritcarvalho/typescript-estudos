import { View } from "./view.js";

export class MensagemView extends View<string>{

    protected template(model: string): string {
        if (!this.erro) {
            return `
                <p class="alert alert-success" role="alert">${model}</p>
            `;
        }
        else {
            return `
                <p class="alert alert-danger" role="alert">${model}</p>
            `
        }
    }
}