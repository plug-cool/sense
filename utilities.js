const isEmpty = (data) => {
  /**
	 * Checks whether a Javascript item is empty or not
	 * @param {type}   {Any}   data         The Javascript item to check
	 * @return {type}  {Bool}  true/false   The item is empty or not
	 */
  if (typeof data === 'object') {
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
      return true;
    }
    if (!data) {
      return true;
    }
    return false;
  }
  if (typeof data === 'string') {
    if (!data.trim()) {
      return true;
    }
    return false;
  }
  if (typeof data === 'undefined') {
    return true;
  }
  return false;
};

module.exports.isEmpty = isEmpty;