// ******************************************************** Result Container, wait promising resolve
export class Result {
    public number: number;
    public result: number;
    public loading: boolean;
    constructor( n: number, result: number, loading: boolean ) {
        this.number = n;
        this.result = result;
        this.loading = loading;
    }
}
