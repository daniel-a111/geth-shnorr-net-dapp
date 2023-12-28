import fs from 'fs';
import { ethers } from "hardhat";
import { CONTRACT_ADDERSS_FILE_NAME, STAGE_1_NAME } from '../../consts';

async function main() {
  const [addr] = await ethers.getSigners();
  const storageAddress = fs.readFileSync(CONTRACT_ADDERSS_FILE_NAME, 'utf8');
  const StringsStorage = await ethers.getContractFactory(STAGE_1_NAME);
  const storage: any = StringsStorage.attach(storageAddress);

  const stored = await storage.get();
  console.log(`strings of ${addr.address}`);
  let i = 0;
  for (const str of stored) {
    console.log(`${(++i).toString().padStart(4, ' ')}: ${str}`);
  }
  if (stored.length === 0) {
    console.log('(empty)\n');
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
