import promptSync from "prompt-sync";

const prompt = promptSync()

export default class Entrada {
    public receberNumero(mensagem: string): number {
        let valor = prompt(`${mensagem} `)
        let numero = new Number(valor)
        return numero.valueOf()
    }
    public receberTexto(mensagem: string): string {
        let texto = prompt(`${mensagem} `)
        return texto
    }
    public receberData(mensagem: string): Date {
        let texto = prompt(`${mensagem}, no padrão dd/MM/yyyy: `)
        let partes = texto.split('/')
        let ano = new Number(partes[2])
        let mes = new Number(partes[1])
        let dia = new Number(partes[0])
        let data = new Date(ano.valueOf(), mes.valueOf() - 1, dia.valueOf())
        return data
    }
    public pausar(): void {
        prompt('Pressione Enter para continuar...')
    }
}