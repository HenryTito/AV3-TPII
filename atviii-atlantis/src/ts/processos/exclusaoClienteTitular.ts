import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExclusaoClienteTitular extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica

        console.clear()
        console.log('=== Excluir Cliente ===')
        console.log('1 - Excluir Titular (e todos os seus dependentes)')
        console.log('2 - Excluir Dependente')

        let tipo = this.entrada.receberNumero('Qual tipo de cliente deseja excluir?')

        if (tipo === 1) {
            let titulares = armazem.Clientes.filter(c => c.Titular == undefined)
            if (titulares.length === 0) {
                console.log('Nenhum cliente titular cadastrado.')
                this.entrada.pausar()
                return
            }
            titulares.forEach((c, i) => console.log(`[${i + 1}] ${c.Nome} (${c.NomeSocial}) - ${c.Dependentes.length} dependente(s)`))

            let opcao = this.entrada.receberNumero('Informe o número do titular a excluir:')
            let titular = titulares[opcao - 1]
            if (!titular) {
                console.log('Titular não encontrado.')
                this.entrada.pausar()
                return
            }

            // Remove dependentes do armazem
            titular.Dependentes.forEach(dep => {
                let idx = armazem.Clientes.indexOf(dep)
                if (idx !== -1) armazem.Clientes.splice(idx, 1)
            })
            // Remove titular
            let idxTitular = armazem.Clientes.indexOf(titular)
            armazem.Clientes.splice(idxTitular, 1)

            console.log(`Titular ${titular.Nome} e seus ${titular.Dependentes.length} dependente(s) excluídos com sucesso.`)

        } else if (tipo === 2) {
            let titulares = armazem.Clientes.filter(c => c.Titular == undefined && c.Dependentes.length > 0)
            if (titulares.length === 0) {
                console.log('Nenhum titular possui dependentes cadastrados.')
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
            let opcaoDep = this.entrada.receberNumero('Informe o número do dependente a excluir:')
            let dependente = titular.Dependentes[opcaoDep - 1]
            if (!dependente) {
                console.log('Dependente não encontrado.')
                this.entrada.pausar()
                return
            }

            // Remove de titular.Dependentes
            let idxDep = titular.Dependentes.indexOf(dependente)
            titular.Dependentes.splice(idxDep, 1)
            // Remove do armazem
            let idxArmazem = armazem.Clientes.indexOf(dependente)
            if (idxArmazem !== -1) armazem.Clientes.splice(idxArmazem, 1)

            console.log(`Dependente ${dependente.Nome} excluído com sucesso.`)
        } else {
            console.log('Opção não entendida.')
        }
        this.entrada.pausar()
    }
}
