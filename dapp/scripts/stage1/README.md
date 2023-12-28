
# Stage 1 Scripts
## Running examples - Stage 1

#### Stage 1
In this stage we implement the ```StringsStorage``` contract.

From repository root folder checkout to stage1 scripts folder:

```bash
cd dapp/scripts/stage1
```

First deploy the contract:
```bash
npx hardhat --network localhost run deploy.ts
```

exampled result:
```

StringsStorageStage1 deployed to 0xe2C64CF739EE6540D58771723597554879871E5A
```

In this example a new contract deployed with the address ```0xe2C64CF739EE6540D58771723597554879871E5A```


Now when the contract is exist we can add strings to it for the Hardhat signer.

Add strings:
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

Now let's monitor and see the signer's strings.

Read strings:
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
