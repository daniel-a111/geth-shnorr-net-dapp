import fs from 'fs';
import { ethers } from "hardhat";
import { CONTRACT_ADDERSS_FILE_NAME, STAGE_2_NAME } from '../../consts';

async function main() {
  const storage: any = await ethers.deployContract(STAGE_2_NAME, []);
  fs.writeFileSync(CONTRACT_ADDERSS_FILE_NAME, storage.target);
  console.log(`${STAGE_2_NAME} deployed to ${storage.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
