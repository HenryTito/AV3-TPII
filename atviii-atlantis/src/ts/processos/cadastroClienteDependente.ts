import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastroDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let titulares = armazem.Clientes.filter(c => c.Titular == undefined)

        console.clear()
        console.log('=== Cadastrar Dependente ===')

        if (titulares.length === 0) {
            console.log('Nenhum cliente titular cadastrado. Cadastre um titular primeiro.')
            this.entrada.pausar()
            return
        }

        console.log('Selecione o titular ao qual o dependente será vinculado:')
        titulares.forEach((cliente, indice) => {
            console.log(`[${indice + 1}] ${cliente.Nome} (${cliente.NomeSocial})`)
        })

        let opcao = this.entrada.receberNumero('Informe o número do titular:')
        let titular = titulares[opcao - 1]

        if (!titular) {
            console.log('Titular não encontrado.')
            this.entrada.pausar()
            return
        }

        console.log(`\nCadastrando dependente de: ${titular.Nome}`)
        let nome = this.entrada.receberTexto('Qual o nome do dependente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do dependente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')

        let dependente = new Cliente(nome, nomeSocial, dataNascimento)
        dependente.Titular = titular

        this.processo = new CadastroEnderecoTitular(dependente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(dependente)
        this.processo.processar()

        titular.Dependentes.push(dependente)
        armazem.Clientes.push(dependente)

        console.log(`Dependente ${nome} vinculado a ${titular.Nome} com sucesso!`)
        this.entrada.pausar()
    }
}
