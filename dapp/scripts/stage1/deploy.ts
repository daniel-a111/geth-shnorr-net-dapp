import fs from 'fs';
import { ethers } from "hardhat";
import { CONTRACT_ADDERSS_FILE_NAME, STAGE_1_NAME } from '../../consts';

async function main() {
  const storage: any = await ethers.deployContract(STAGE_1_NAME, []);
  fs.writeFileSync(CONTRACT_ADDERSS_FILE_NAME, storage.target);
  console.log(`${STAGE_1_NAME} deployed to ${storage.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
