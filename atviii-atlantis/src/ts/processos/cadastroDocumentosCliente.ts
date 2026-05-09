import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import MenuTipoDocumento from "../menus/menuTipoDocumento";
import Cliente from "../modelos/cliente";
import CadastroDocumento from "./cadastroDocumento";

export default class CadastroDocumentosCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuTipoDocumento()
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de documentos...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastroDocumento(this.cliente, TipoDocumento.CPF)
                    this.processo.processar()
                    break
                case 2:
                    this.processo = new CadastroDocumento(this.cliente, TipoDocumento.RG)
                    this.processo.processar()
                    break
                case 3:
                    this.processo = new CadastroDocumento(this.cliente, TipoDocumento.Passaporte)
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}