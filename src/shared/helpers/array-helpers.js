export const getLabelByKey = (value, array, valueKey, labelKey) => ((array || []).find(item => item[valueKey] === value) || {})[labelKey] || value;

export const transformKeyToLabel = (value, params) => {
  const {
    array = [], labelKey = 'label', valueKey = 'value', isCsv = false,
  } = params;
  if (isCsv) {
    if (value) {
      return value.map(valueItem => getLabelByKey(valueItem, array, valueKey, labelKey)).join(', ');
    }
    return [];
  }
  return getLabelByKey(value, array, valueKey, labelKey);
};
