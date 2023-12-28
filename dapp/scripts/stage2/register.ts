import fs from 'fs';
import { ethers } from "hardhat";
import { CONTRACT_ADDERSS_FILE_NAME, STAGE_2_NAME } from '../../consts';
import { printLog, toSchnorrPublicKey } from '../../utils';

async function main() {
    const storageAddress = fs.readFileSync(CONTRACT_ADDERSS_FILE_NAME, 'utf8');
    const StringsStorage = await ethers.getContractFactory(STAGE_2_NAME);
    const storage: any = StringsStorage.attach(storageAddress);
    const pk = toSchnorrPublicKey('02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659')
    const tx = await storage.register(pk);
    const receipt = await tx.wait();
    console.log('registration tx resulted events:')
    for (const log of receipt.logs) {
      printLog(log);
    }

    // console.log('\ntx2 resulted events:')
    // const tx2 = await storage.addMany(['World', 'Geth', 'Schnorr']);
    // const receipt2 = await tx2.wait();
    // for (const log of receipt2.logs) {
    //   printLog(log);
    // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

