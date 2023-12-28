import fs from 'fs';
import { ethers } from "hardhat";
import { CONTRACT_ADDERSS_FILE_NAME, STAGE_2_NAME } from '../../consts';
import { printLog, toSchnorrMessage } from '../../utils';
import { SchnorrMessage } from '../../types';

async function main() {
  const storageAddress = fs.readFileSync(CONTRACT_ADDERSS_FILE_NAME, 'utf8');
  const StringsStorage = await ethers.getContractFactory(STAGE_2_NAME);
  const storage: any = StringsStorage.attach(storageAddress);

  const sigMap = {
    'Hello': 'd5c6735ef4d5054c48c2b5a7731ab13a72ea7f2e4d670f56b1c337676709096f9c843c17ec15f15df4d74932a532409cd442def8af6ce2e83dec983091a2e537',
    'World': '8e62ff54304985db784928b2d448ffc5eeed3fef793a5c3e65a65e9ed3a12e6bededbadb533ab0ca9c88a3b1bcf41cc8edc6d2f6444cd0bbd9c2a068fe051232',
    'Geth': 'c431aa5ae1b8ab48f62ab92aefb27cf563fcb7cdb7395a87e22f5567efbb13c2ea8085032ea47deeaef4a21dcbf135b5ef059475aede361e748ac9e40a4df4a2',
    'Schnorr': '6ef95a08d7660ad7b0a23af3a5a268ed37a8e55eaa5db0bdeb56f3708ac090bf952726f989002fe84567ec438f4e69666aa4b0d5cc7c68f288cd07909960c9c0'
  }

  const schnorrMessage: SchnorrMessage = toSchnorrMessage('Hello', sigMap['Hello']);

  const tx1 = await storage.add(schnorrMessage);
  const receipt1 = await tx1.wait();
  console.log('tx1 resulted events:')
  for (const log of receipt1.logs) {
    printLog(log);
  }

  const schnorrMessages: SchnorrMessage[] = [
    toSchnorrMessage('World', sigMap['World']),
    toSchnorrMessage('Geth', sigMap['Geth']),
    toSchnorrMessage('Schnorr', sigMap['Schnorr']),
  ]
  console.log('\ntx2 resulted events:')
  const tx2 = await storage.addMany(schnorrMessages);
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

