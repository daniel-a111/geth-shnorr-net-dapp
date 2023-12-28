

export function printLog(log: any) {
    console.log(`address: \n\t${log.address}:\nevent:\n\t${log?.fragment?.name || 'unkown'}:`);
    for (let i = 0; i < log?.fragment?.inputs?.length || 0; i++) {
        const input = log.fragment.inputs[i];
        console.log(`\t\t${input.name} = ${log.args[i]}`)
    }
    console.log('\n');
}
export interface SchnorrPublicKey {
    first_32: Buffer;
    last_1: Buffer;
}


export interface SchnorrMessage {
    message: string;
    sig: SchnorrSignature;
}

export interface SchnorrSignature {
    b: Buffer[];
}
