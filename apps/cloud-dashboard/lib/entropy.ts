export function calculateShannonEntropy(buffer: Uint8Array): number {
  const freqs = new Array(256).fill(0);
  buffer.forEach(b => freqs[b]++);
  
  return freqs.reduce((acc, f) => {
    if (f === 0) return acc;
    const p = f / buffer.length;
    return acc - p * Math.log2(p);
  }, 0);
}