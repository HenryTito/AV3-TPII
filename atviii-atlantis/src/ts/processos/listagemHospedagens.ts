import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorHospedagem from "../impressores/impressorHospedagem";
import Impressor from "../interfaces/impressor";

export default class ListagemHospedagens extends Processo {
    private impressor!: Impressor

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        console.clear()
        console.log('=== Hóspedes Atuais ===')
        console.log(`-------------------------------`)

        if (armazem.Hospedagens.length === 0) {
            console.log('Nenhuma hospedagem registrada no momento.')
            this.entrada.pausar()
            return
        }

        armazem.Hospedagens.forEach(hospedagem => {
            this.impressor = new ImpressorHospedagem(hospedagem)
            console.log(this.impressor.imprimir())
            console.log(`-------------------------------`)
        })
        this.entrada.pausar()
    }
}
