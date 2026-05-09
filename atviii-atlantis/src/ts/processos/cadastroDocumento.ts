import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroDocumento extends Processo {
    private cliente: Cliente
    private tipo: TipoDocumento

    constructor(cliente: Cliente, tipo: TipoDocumento) {
        super()
        this.cliente = cliente
        this.tipo = tipo
    }

    processar(): void {
        let numero = this.entrada.receberTexto('Qual o número do documento?')
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let documento = new Documento(numero, this.tipo, dataExpedicao)
        this.cliente.Documentos.push(documento)
    }
}
