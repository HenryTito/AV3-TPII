import Acomodacao from "./acomodacao";
import Cliente from "./cliente";

export default class Hospedagem {
    private titular: Cliente
    private dependentes: Cliente[]
    private acomodacao: Acomodacao
    private dataEntrada: Date

    constructor(titular: Cliente, acomodacao: Acomodacao) {
        this.titular = titular
        this.dependentes = [...titular.Dependentes]
        this.acomodacao = acomodacao
        this.dataEntrada = new Date()
    }

    public get Cliente() { return this.titular }
    public get Titular() { return this.titular }
    public get Dependentes() { return this.dependentes }
    public get Acomodacao() { return this.acomodacao }
    public get DataEntrada() { return this.dataEntrada }
}
