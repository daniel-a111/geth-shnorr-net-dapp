
# geth Schnorr Network and dApp

This repository shows examples on how to use [geth-schnorr](https://github.com/daniel-a111/geth-schnorr.git).

It includes setups of private network and dApp that is using Schnorr precompiled contract.

## Setup


First clone the forked repository into this repository's root folder:

```bash
git clone git clone https://github.com/daniel-a111/geth-schnorr.git
ls 
```

Then build the private network docker image:
```bash
docker build . -t geth-schnorr
```

Run & access docker
```bash
docker run -p 8545:8545 -it geth-schnorr
sh install.sh
```

Inside the docker start the network by running the sh command:

```bash
sh install.sh

```

For montior nodes use the following command:
```bash
tail -f node1/nohup.out
```


## dApp Demos

[go to dApp README.md](./dapp/README.md)

This dapp includes..

### Installation
Install dapp
```bash
npm i
```

### Running examples

#### Stage 1
In this stage we implement the StringStorage contract

its interface:
- k

```bash
cd dapp/scripts/stage1
```

deploy contract:
```bash
npx hardhat --network localhost run deploy.ts
```

exampled result:
```

StringsStorageStage1 deployed to 0xe2C64CF739EE6540D58771723597554879871E5A
```

Usages:

Add strings
```bash
npx hardhat --network localhost run add.ts
```
example result:
```


tx1 resulted events:
address: 
        0xe2C64CF739EE6540D58771723597554879871E5A:
event:
        StringsAdded:
                owner = 0x6D9F2a4D1c7863B1eFB39781af62219AE4759596
                v = Hello
                count = 1



tx2 resulted events:
address: 
        0xe2C64CF739EE6540D58771723597554879871E5A:
event:
        StringsAdded:
                owner = 0x6D9F2a4D1c7863B1eFB39781af62219AE4759596
                v = World,Geth,Schnorr
                count = 4
```


Read strings
```bash
npx hardhat --network localhost run read.ts
```
example result:
```

strings of 0x6D9F2a4D1c7863B1eFB39781af62219AE4759596
   1: Hello
   2: World
   3: Geth
   4: Schnorr
```

## Stage 2
adding schnorr precompiled

```bash
cd scripts/stage2
```

