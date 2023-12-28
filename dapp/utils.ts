import { SchnorrMessage, SchnorrPublicKey } from "./types";


export function printLog(log: any) {
    console.log(`address: \n\t${log.address}:\nevent:\n\t${log?.fragment?.name || 'unkown'}:`);
    for (let i = 0; i < log?.fragment?.inputs?.length || 0; i++) {
        const input = log.fragment.inputs[i];
        console.log(`\t\t${input.name} = ${log.args[i]}`)
    }
    console.log('\n');
}


const SIG_LENGTH_BYTES = 64;
const BYTE_HEX_SIZE = 2;
export const toSchnorrMessage = (message: string, sig: string): SchnorrMessage => {
    if (sig.length !== SIG_LENGTH_BYTES * BYTE_HEX_SIZE) throw new Error('invalid signature length');
    return {
        message,
        sig: {
            b: [
                Buffer.from(sig.substring(0, SIG_LENGTH_BYTES), 'hex'),
                Buffer.from(sig.substring(SIG_LENGTH_BYTES), 'hex'),
            ]
        }
    }
}

export const toSchnorrPublicKey = (pk: string): SchnorrPublicKey => {
    return {
        first_32: Buffer.from('02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA6', 'hex'),
        last_1: Buffer.from('59', 'hex')
      }
  
}