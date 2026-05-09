import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorHospedagem from "../impressores/impressorHospedagem";

export default class CheckoutHospedagem extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica
        console.clear()
        console.log('=== Check-out de Hóspede ===')
        console.log(`-------------------------------`)

        if (armazem.Hospedagens.length === 0) {
            console.log('Nenhuma hospedagem registrada no momento.')
            this.entrada.pausar()
            return
        }

        console.log('\nHóspedes atuais:')
        armazem.Hospedagens.forEach((hospedagem, indice) => {
            let impressor = new ImpressorHospedagem(hospedagem)
            console.log(`[${indice + 1}] ${impressor.imprimir()}`)
            console.log(`-------------------------------`)
        })

        let opcao = this.entrada.receberNumero('Informe o número da hospedagem para realizar o check-out:')
        let indice = opcao - 1

        if (indice < 0 || indice >= armazem.Hospedagens.length) {
            console.log('Hospedagem não encontrada.')
            this.entrada.pausar()
            return
        }

        let hospedagem = armazem.Hospedagens[indice]
        armazem.Hospedagens.splice(indice, 1)

        console.log(`\nCheck-out realizado com sucesso!`)
        console.log(`Hóspede ${hospedagem.Cliente.Nome} dispensado(a) da acomodação: ${hospedagem.Acomodacao.NomeAcomadacao}`)
        this.entrada.pausar()
    }
}
