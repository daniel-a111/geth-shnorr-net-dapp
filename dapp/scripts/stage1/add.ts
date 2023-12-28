import fs from 'fs';
import { ethers } from "hardhat";
import { CONTRACT_ADDERSS_FILE_NAME, STAGE_1_NAME } from '../../consts';
import { printLog } from '../../utils';

async function main() {
    const storageAddress = fs.readFileSync(CONTRACT_ADDERSS_FILE_NAME, 'utf8');
    const StringsStorage = await ethers.getContractFactory(STAGE_1_NAME);
    const storage: any = StringsStorage.attach(storageAddress);
    const tx1 = await storage.add('Hello');
    const receipt1 = await tx1.wait();
    console.log('tx1 resulted events:')
    for (const log of receipt1.logs) {
      printLog(log);
    }

    console.log('\ntx2 resulted events:')
    const tx2 = await storage.addMany(['World', 'Geth', 'Schnorr']);
    const receipt2 = await tx2.wait();
    for (const log of receipt2.logs) {
      printLog(log);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

