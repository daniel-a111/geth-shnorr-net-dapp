import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      accounts: ['82512f092782b3022ec82a0e7d92307f9a5fba36343eaf3b8676322f402b7290', '781f30b385f6b19047abb62e5c307e15d24a88daf769a189534af28fbda2dc01']
    }
  }
};

export default config;
