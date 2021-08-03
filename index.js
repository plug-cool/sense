/**
 * sense
 * Released under MIT license
*/
const ethers = require('ethers');
const utilities = require('./utilities');

/* 
	ENS TEXT RECORD QUERY CONSTANTS
	THESE ARE SEPARATE FROM SOCIAL MEDIA LINKS
	BECAUSE LOOP IN getEnsTextRecord() BREAKS
	WITH SOCIAL MEDIA ENS RECORDS.
*/
const ENS_TEXT_RECORD_QUERY = {
	description: 'description',
	avatar: 'avatar',
	url: 'url',
	email: 'email',
	name: 'name',
	location: 'location',
	notice: 'notice',
	keywords: 'keywords'
}
/* 
	SOCIAL MEDIA ENS TEXT RECORD QUERY CONSTANTS
	EACH OF THESE IS USED ONE AT A TIME
*/
const ENS_TWITTER_URL = 'com.twitter';
const ENS_GITHUB_URL = 'com.github';
const ENS_TELEGRAM_URL = 'org.telegram';
const ENS_LINKEDIN_URL = 'com.linkedin';
const ENS_DISCORD_URL = 'com.discord';
const ENS_REDDIT_URL = 'com.reddit';


const setProvider = (data) => {
/**
 * Returns a provider object
 * @param  {type}   {Object}       data       params to choose provider (apiType, network, apiKey)
 * @return {type}   {String/Bool}  provider   Returns the provider object for further calls
*/
	let { apiType, network, apiKey } = data;
	// make sure inputs are lowercase
	apiType = apiType.toLowerCase();
	network = network.toLowerCase();

	switch (apiType) {
		case 'infura':
			return new ethers.providers.InfuraProvider(network, {
				projectId: apiKey
			});
		case 'etherscan':
			return new ethers.providers.EtherscanProvider(network, {
				projectId: apiKey
			});
		case 'alchemy':
			return new ethers.providers.AlchemyProvider(network, {
				projectId: apiKey
			});
		case 'cloudflare':
			return new ethers.providers.CloudflareProvider(network, {
				projectId: apiKey
			});			
		default:
			return false;
	}
}

const lookupENSFromAddress = async (address, provider) => {
/**
 * Returns an ENS name if address is a Registrant
 * @param  {type}   {String}       address    The verified wallet address to attach to Twitter account
 * @param  {type}   {Object}       provider   The provider object instantiated by setProvider
 * @return {type}   {String/Bool}  ensName    Returns the ENS Name if address is a registrant
 */	
  const name = await provider.lookupAddress(address);
  console.log("🚀 ~ file: index.js ~ line 77 ~ lookupENSFromAddress ~ name", name)
	return await provider.lookupAddress(address);
}


const getEthRegistrantFromENS = async (ensName, provider) => {
/**
 * Returns the Eth Registrant address from an ENS name
 * @param  {type}   {String}       ensName    The verified wallet address to attach to Twitter account
 * @param  {type}   {Object}       provider   The provider object instantiated by setProvider
 * @return {type}   {String/Bool}  address    Returns the address tied to the ENS name
 */
	return await provider.resolveName(ensName);
}

const getENSTextRecord = async (ensName, provider) => {
/**
 * Returns ENS data if applicable
 * @param  {type}   {String}       ensName                The ENS name to get text record for i.e vitalik.eth
 * @param  {type}   {Object}       provider               The provider object instantiated by setProvider
 * @return {type}   {Object/Bool}  ensTextRecord/false    Returns an ensTextRecord object if present, false if not
*/

	const resolver = await provider.getResolver(ensName);

	let ensTextRecord = {};

	if (resolver) {
		for (const [key, value] of Object.entries(ENS_TEXT_RECORD_QUERY)) {
			const result = await resolver.getText(ENS_TEXT_RECORD_QUERY[value]);
			if (result) {
				const item = { [key] : result }
				ensTextRecord = Object.assign(ensTextRecord, item);
			} else {
				console.log('⚠️ ENS RECORD NOT FOUND');
			}
		}
	}

	const twitter = await resolver.getText(ENS_TWITTER_URL);
	const github = await resolver.getText(ENS_GITHUB_URL);
	const telegram = await resolver.getText(ENS_TELEGRAM_URL);
	const linkedIn = await resolver.getText(ENS_LINKEDIN_URL);
	const discord = await resolver.getText(ENS_DISCORD_URL);
	const reddit = await resolver.getText(ENS_REDDIT_URL);

	const ensTextRecordUrls = { twitter, github, telegram, linkedIn, discord, reddit };
	for (const [key, value] of Object.entries(ensTextRecordUrls)) {
		if (value !== null) {
			const item = { [key]: value };
			ensTextRecord = Object.assign(ensTextRecord, item);
		}
	}
	if (!utilities.isEmpty(ensTextRecord)) {
		return ensTextRecord;
	} 
	return false;
}

module.exports.setProvider = setProvider;
module.exports.lookupENSFromAddress = lookupENSFromAddress;
module.exports.getEthRegistrantFromENS = getEthRegistrantFromENS;
module.exports.getENSTextRecord = getENSTextRecord;