
# Stage 2 Scripts
## Running examples - Stage 2

#### Stage 2
In this stage we implement the ```StringsStorageSchnorrVerify``` contract.

From repository root folder checkout to stage1 scripts folder:

```bash
cd dapp/scripts/stage2
```

First deploy the contract:
```bash
npx hardhat --network localhost run deploy.ts
```

exampled result:
```

StringsStorageStage1 deployed to 0x53Fa63225a4B8999B2c3AdcD2d5c86Bc148763b4
```


In this example a new contract deployed with the address ```0x53Fa63225a4B8999B2c3AdcD2d5c86Bc148763b4```

Next, before the signer will be able to add strings it must has registration for providing his Schnorr public key:

Register:
```bash
npx hardhat --network localhost run register.ts
```

example result:
```
registration tx resulted events:
address: 
        0x53Fa63225a4B8999B2c3AdcD2d5c86Bc148763b4:
event:
        AccountRegistered:
                owner = 0x6D9F2a4D1c7863B1eFB39781af62219AE4759596
                pk = 0x02dff1d77f2a671c5f36183726db2341be58feae1da2deced843240f7b502ba6,0x59
```

example result:
```

Now when the contract is exist and the signer is registered we can finally add strings with their signatures.

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

## Suggested Improve
For gas optimization we can use Schnorr bulk verify in order to make it more compact for verify many strings with the same public key 