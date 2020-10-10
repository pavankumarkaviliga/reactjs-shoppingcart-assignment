export default class Util {
    public static formatNumberToUSD(n : number) : string{
        return new window.Intl.NumberFormat("en-US", {
            style : "currency",
            currency : "USD"
        }).format(n);
    }

    public static generateInvoiceNumber(noOfDigits:number): number {
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

        if (noOfDigits > max) {
            return Util.generateInvoiceNumber(max) + Util.generateInvoiceNumber(noOfDigits - max);
        }

        max = Math.pow(10,  noOfDigits + add);
        var min = max / 10; // Math.pow(10, n) basically
        var number = Math.floor(Math.random() * (max - min + 1)) + min;

        return parseInt(("" + number).substring(add)); 
    }
}