export class Cpf {

    public value: string = "";

    constructor(value: string)
    {
        if(!this.validateCpf(value)) throw Error("Invalid cpf!");
        this.value = value;
    }

    private validateCpf (rawCpf: string) {

        if (this.isCpfLengthValid(rawCpf)){ // fix validation

            const cpf = this.getPlainCpf(rawCpf);

            if (!this.isCpfFirstDigitRepeatable(cpf)) {
                const partialCpf = cpf.substring(0, 9);

                const firstDigiteCalculated = this.calculateVerifiedDigit(partialCpf, 10);
                const secondDigiteCalculated = this.calculateVerifiedDigit(partialCpf + firstDigiteCalculated, 11);
                const digitesVerifiedResult = "" + firstDigiteCalculated + "" + secondDigiteCalculated;
                
                const digiteVerifiedOriginal = cpf.substring(cpf.length-2, cpf.length);  

                return digiteVerifiedOriginal === digitesVerifiedResult;

            } else return false

        }else return false;

    }

    private isCpfLengthValid(cpf: string): boolean {
        return cpf.length >= 11 && cpf.length <= 14;
    }

   private getPlainCpf(cpf: string): string {
        const cpfPlain = cpf.replace(/\D/g,"");
        return cpfPlain;
    }

    private isCpfFirstDigitRepeatable (cpf: string ) {
        return cpf.split("").every((c: any) => c === cpf[0]);
    }

    private calculateVerifiedDigit(digits: string, startCounter: number){
        let total = 0;
        for(let digit of digits){
            const digiteParsed = parseInt(digit);
            total = total + (digiteParsed * startCounter);
            startCounter--;
        }
        const restValue = total % 11;
        const verifiedDigit = (restValue < 2) ? 0 : (11 - restValue);
        return verifiedDigit;
    }

    
}