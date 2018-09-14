export interface SignatureDAL
{
    lookupSignatureParams(...args: any[]): Promise<any>;
}
