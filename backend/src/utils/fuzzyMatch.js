export function normalize(str) {
  return str
    .toLowerCase()
    .replace(/['".,]/g, '')  
    .replace(/[-_]/g, ' ')    
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = 0; i <= a.length; i++) dp[i][0] = i
  for (let j = 0; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j])
    }
  }
  return dp[a.length][b.length]
}

function similarity(a, b) {
  const distance = levenshtein(a, b)
  const maxLen = Math.max(a.length, b.length)
  return maxLen === 0 ? 1 : 1 - distance / maxLen
}

/**
 * Finds the best-matching item from `items` for the user's typed text.
 * @param {string} input - what the user typed, e.g. "coxs bazar"
 * @param {Array} items - candidate objects
 * @param {(item) => string} getLabel - how to read the comparable text off an item
 * @param {number} threshold - minimum similarity (0-1) to accept a fuzzy match
 */
export function findBestMatch(input, items, getLabel, threshold = 0.6) {
  const target = normalize(input)
  if (!target) return null

  // 1) fast path: exact or substring match (handles "cox" -> "Cox's Bazar")
  const substringMatch = items.find((item) => {
    const label = normalize(getLabel(item))
    return label === target || label.includes(target) || target.includes(label)
  })
  if (substringMatch) return substringMatch

  // 2) fallback: typo-tolerant fuzzy match (handles "koxs bazr" -> "Cox's Bazar")
  let best = null
  let bestScore = 0
  for (const item of items) {
    const score = similarity(target, normalize(getLabel(item)))
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }
  return bestScore >= threshold ? best : null
}
