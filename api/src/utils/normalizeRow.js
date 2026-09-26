// Oracle returns column names in UPPERCASE; normalize rows to lowercase keys for consistent API responses.
function normalizeRow(row) {
  if (!row) return row;
  const normalized = {};
  for (const [key, value] of Object.entries(row)) {
    normalized[key.toLowerCase()] = value;
  }
  return normalized;
}

function normalizeRows(rows) {
  return rows.map(normalizeRow);
}

module.exports = { normalizeRow, normalizeRows };
