import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorAcomodacao from "../impressores/impressorAcomodacao";
import ImpressaorCliente from "../impressores/impressorCliente";
import Hospedagem from "../modelos/hospedagem";

export default class CadastroHospedagem extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica

        if (armazem.Clientes.length === 0) {
            console.log('Nenhum cliente cadastrado. Cadastre um cliente antes de registrar uma hospedagem.')
            this.entrada.pausar()
            return
        }

        if (armazem.Acomodacoes.length === 0) {
            console.log('Nenhuma acomodação disponível.')
            this.entrada.pausar()
            return
        }

        let titulares = armazem.Clientes.filter(c => c.Titular == undefined)

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado. Cadastre um titular antes de registrar uma hospedagem.')
            this.entrada.pausar()
            return
        }

        console.clear()
        console.log('=== Registrar Hospedagem (Check-in) ===')
        console.log('\nTitulares cadastrados:')
        titulares.forEach((cliente, indice) => {
            let deps = cliente.Dependentes.length
            let impressor = new ImpressaorCliente(cliente)
            console.log(`[${indice + 1}] ${impressor.imprimir()}`)
            if (deps > 0) {
                console.log(`   (${deps} dependente(s) serão incluídos automaticamente)`)
            }
        })

        let opcaoCliente = this.entrada.receberNumero('Informe o número do titular:')
        let clienteSelecionado = titulares[opcaoCliente - 1]

        if (!clienteSelecionado) {
            console.log('Cliente não encontrado.')
            this.entrada.pausar()
            return
        }

        console.log('\nAcomodações disponíveis:')
        armazem.Acomodacoes.forEach((acomodacao, indice) => {
            let impressor = new ImpressorAcomodacao(acomodacao)
            console.log(`[${indice + 1}] ${impressor.imprimir()}`)
        })

        let opcaoAcomodacao = this.entrada.receberNumero('Informe o número da acomodação:')
        let acomodacaoSelecionada = armazem.Acomodacoes[opcaoAcomodacao - 1]

        if (!acomodacaoSelecionada) {
            console.log('Acomodação não encontrada.')
            this.entrada.pausar()
            return
        }

        let hospedagem = new Hospedagem(clienteSelecionado, acomodacaoSelecionada)
        armazem.Hospedagens.push(hospedagem)

        console.log(`\nCheck-in realizado com sucesso!`)
        console.log(`Hóspede: ${clienteSelecionado.Nome} — Acomodação: ${acomodacaoSelecionada.NomeAcomadacao}`)
        this.entrada.pausar()
    }
}
