import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastroDocumentosCliente from "./cadastroDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class EdicaoClienteTitular extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica

        console.clear()
        console.log('=== Editar Cliente ===')
        console.log('1 - Editar Titular')
        console.log('2 - Editar Dependente')

        let tipo = this.entrada.receberNumero('Qual tipo de cliente deseja editar?')
        let cliente: Cliente | undefined

        if (tipo === 1) {
            let titulares = armazem.Clientes.filter(c => c.Titular == undefined)
            if (titulares.length === 0) {
                console.log('Nenhum titular cadastrado.')
                this.entrada.pausar()
                return
            }
            titulares.forEach((c, i) => console.log(`[${i + 1}] ${c.Nome} (${c.NomeSocial})`))
            let opcao = this.entrada.receberNumero('Informe o número do titular:')
            cliente = titulares[opcao - 1]
        } else if (tipo === 2) {
            let titulares = armazem.Clientes.filter(c => c.Titular == undefined && c.Dependentes.length > 0)
            if (titulares.length === 0) {
                console.log('Nenhum titular possui dependentes.')
                this.entrada.pausar()
                return
            }
            titulares.forEach((c, i) => console.log(`[${i + 1}] ${c.Nome} (${c.Dependentes.length} dependente(s))`))
            let opcaoTitular = this.entrada.receberNumero('Informe o número do titular:')
            let titular = titulares[opcaoTitular - 1]
            if (!titular) {
                console.log('Titular não encontrado.')
                this.entrada.pausar()
                return
            }
            titular.Dependentes.forEach((dep, i) => console.log(`[${i + 1}] ${dep.Nome} (${dep.NomeSocial})`))
            let opcaoDep = this.entrada.receberNumero('Informe o número do dependente:')
            cliente = titular.Dependentes[opcaoDep - 1]
        } else {
            console.log('Opção não entendida.')
            this.entrada.pausar()
            return
        }

        if (!cliente) {
            console.log('Cliente não encontrado.')
            this.entrada.pausar()
            return
        }

        this.execucao = true
        while (this.execucao) {
            console.clear()
            console.log(`=== Editando: ${cliente.Nome} ===`)
            console.log('1 - Nome')
            console.log('2 - Nome Social')
            console.log('3 - Data de Nascimento')
            console.log('4 - Endereço')
            console.log('5 - Documentos')
            console.log('0 - Voltar')

            let campo = this.entrada.receberNumero('O que deseja alterar?')
            switch (campo) {
                case 1:
                    cliente.Nome = this.entrada.receberTexto('Novo nome:')
                    if (tipo === 1 && cliente.Nome === 'Saul Goodman') {
                        console.log('better call saul')
                    }
                    console.log('Nome atualizado com sucesso!')
                    this.entrada.pausar()
                    break
                case 2:
                    cliente.NomeSocial = this.entrada.receberTexto('Novo nome social:')
                    console.log('Nome social atualizado com sucesso!')
                    this.entrada.pausar()
                    break
                case 3:
                    cliente.DataNascimento = this.entrada.receberData('Nova data de nascimento')
                    console.log('Data de nascimento atualizada com sucesso!')
                    this.entrada.pausar()
                    break
                case 4:
                    this.processo = new CadastroEnderecoTitular(cliente)
                    this.processo.processar()
                    console.log('Endereço atualizado com sucesso!')
                    this.entrada.pausar()
                    break
                case 5:
                    this.processo = new CadastroDocumentosCliente(cliente)
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida.')
                    this.entrada.pausar()
            }
        }
    }
}
