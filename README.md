


# [CryptoLogos](https://github.com/dorianbayart/CryptoLogos)



## What is CryptoLogos ?

When you work with Web3 and blockchain's explorers, the only way to precisely identify a token is by its contract address.

I created CryptoLogos because I couldn't find any useful library of logos easily and programmatically reachable by contract addresses.

With CryptoLogos, you can grab logos of many crypto tokens directly from their explorer, and then use them easily with their contract addresses !



## Where are the logos ?

### Example
_**Problem**_:

I need to display the DAI logo of the polygon blockchain and I know the contract address is: [0x8f3cf7ad23cd3cadbd9735aff958023239c6a063](https://polygonscan.com/token/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063)

_**Solution**_:

I build the URL with the chain name and the contract address: raw.githubusercontent.com/dorianbayart/CryptoLogos/main/dist/[*chain*]/[*contract address*].png

_**Result**_:

![DAI Logo](https://raw.githubusercontent.com/dorianbayart/CryptoLogos/main/dist/polygon/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063.png)



## How to run commands ?

```
npm install
```

```
npm run start:chain
```
where *chain* can be one of those parameters:
* ethereum
* polygon
* bsc
* fantom
* all



## Supported blockchains

* [x] [Ethereum](https://github.com/dorianbayart/CryptoLogos/tree/main/CryptoLogos/ethereum)
* [x] [Polygon](https://github.com/dorianbayart/CryptoLogos/tree/main/CryptoLogos/polygon)
* [x] [Binance Smart Chain](https://github.com/dorianbayart/CryptoLogos/tree/main/CryptoLogos/bsc)
* [x] [Fantom](https://github.com/dorianbayart/CryptoLogos/tree/main/CryptoLogos/fantom)



## Why do I have errors ?

A lot of errors are due to the anti-DDOS of Cloudflare, wich prevents bots to send many requests.

You can run the same command again to resume, already downloaded logos will be bypassed.
