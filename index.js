const path = require('path');

module.exports = (results) => {
  const rules = results.reduce((memo, { filePath, messages }) => {
    messages.forEach(({ ruleId }) => {
      // eslint-disable-next-line no-param-reassign
      memo[ruleId] = memo[ruleId] || [];
      memo[ruleId].push(path.relative('.', filePath));
    });
    return memo;
  }, {});
  const sortedRuleIds = Object.keys(rules).sort();

  const overrides = sortedRuleIds.map((ruleId) => ({
    rules: { [ruleId]: 'warn' },
    files: [...new Set(rules[ruleId])].sort(),
  }));

  return `module.exports = ${JSON.stringify({ overrides }, null, 2)}`;
};
