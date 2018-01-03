module.exports = results => {
  const rules = results.reduce((memo, { filePath, messages }) => {
    messages.forEach(({ ruleId }) => {
      // eslint-disable-next-line no-param-reassign
      memo[ruleId] = memo[ruleId] || [];
      memo[ruleId].push(filePath.replace(`${__dirname}/`, ""));
    });
    return memo;
  }, {});
  const sortedRuleIds = Object.keys(rules).sort();

  const overrides = sortedRuleIds.map(ruleId => ({
    rules: { [ruleId]: "off" },
    files: [...new Set(rules[ruleId])].sort()
  }));

  return `module.exports = ${JSON.stringify({ overrides }, null, 2)}`;
};
