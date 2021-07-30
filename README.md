# sense (eth)
## ENS Data, Simple

sense is a simple Javascript library that aims to make it easier to get data about ENS (ethereum) names like vitalik.eth.

It is used internally at <https://plug.cool> when dealing with ENS names.

It is meant for use on front-end projects. We use it with React.

## Dependencies
- ethers.js

## Installation
Go to your project directory and run:
```
npm install @plug.cool/sense
// or if using yarn:
yarn add @plug.cool/sense
```
## Usage
### Import
```
import sense from '@plug.cool/sense';
```
### setProvider({apiType: STRING, network: STRING, apiKey: STRING})
```
// sense currently supports Infura, Etherscan, Alchemy, and Cloudflare providers

// setting an Infura provider
/* 
first, create a provider object with the provider inputs you want to use. These are currently not optional. Not providing each input is untested as currently written
*/
const providerObj = {
    apiType: 'infura',
    network: 'homestead',
    apiKey: 'your-infura-api-key'
}

// now make the following call:
const provider = sense.setProvider(providerObj)

// you can use provider to make further calls like you would in ethers
```

### async getENSTextRecord(ensName: STRING, provider: object)
```
// first, set the provider
const provider = sense.setProvider(providerObj);

// then, provide the name you want to query and provider object
const ensTextRecord = await sense.getENSTextRecord('vitalik.eth', provider);
console.log(ensTextRecord);

/* 
NOTE: this call returns an object with key-value pairs of any data present in the ENS Text Record. If there is no data, it returns false.
*/
```

That's it for now. We will be adding more functions on an as-needed basis. Feel free to open a PR and expand, or fork it.