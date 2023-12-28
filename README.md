
# geth Schnorr Network and dApp

This repository shows examples on how to use [geth-schnorr](https://github.com/daniel-a111/geth-schnorr.git).

It includes setups of private network and dApp that is using Schnorr precompiled contract. This network's default configuration (by genesis) setting up a POA (Proof of Authority) with 3 nodes, one in which is the minner.

## Setup


First clone the forked repository into this repository's root folder:

```bash
git clone https://github.com/daniel-a111/geth-schnorr.git
ls 
```

Then build the private network docker image:
```bash
docker build . -t geth-schnorr
```

Run & access docker
```bash
docker run -p 8545:8545 -it geth-schnorr
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
