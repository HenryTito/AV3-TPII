import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";

export default class ListagemDependentes extends Processo {
    private impressor!: Impressor

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let titulares = armazem.Clientes.filter(c => c.Titular == undefined)

        console.clear()
        console.log('=== Dependentes por Titular ===')

        if (titulares.length === 0) {
            console.log('Nenhum cliente titular cadastrado.')
            this.entrada.pausar()
            return
        }

        titulares.forEach((titular, indice) => {
            console.log(`[${indice + 1}] ${titular.Nome} (${titular.NomeSocial})`)
        })

        let opcao = this.entrada.receberNumero('Informe o número do titular:')
        let titular = titulares[opcao - 1]

        if (!titular) {
            console.log('Titular não encontrado.')
            this.entrada.pausar()
            return
        }

        console.clear()
        console.log(`=== Dependentes de ${titular.Nome} ===`)
        console.log(`-------------------------------`)

        if (titular.Dependentes.length === 0) {
            console.log('Este titular não possui dependentes cadastrados.')
            this.entrada.pausar()
            return
        }

        titular.Dependentes.forEach(dependente => {
            this.impressor = new ImpressaorCliente(dependente)
            console.log(this.impressor.imprimir())
            console.log(`-------------------------------`)
        })
        this.entrada.pausar()
    }
}
