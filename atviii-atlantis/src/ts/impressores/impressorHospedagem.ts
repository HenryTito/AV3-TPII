import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem

    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem
    }

    imprimir(): string {
        let dataEntrada = this.hospedagem.DataEntrada.toLocaleDateString('pt-BR')
        let descricao = `Titular: ${this.hospedagem.Titular.Nome} (${this.hospedagem.Titular.NomeSocial})\n`
            + `-- Acomodação: ${this.hospedagem.Acomodacao.NomeAcomadacao.toString()}\n`
            + `-- Data de entrada: ${dataEntrada}\n`
        if (this.hospedagem.Dependentes.length > 0) {
            descricao += `-- Dependentes:\n`
            this.hospedagem.Dependentes.forEach(dep => {
                descricao += `   * ${dep.Nome} (${dep.NomeSocial})\n`
            })
        }
        return descricao
    }
}
