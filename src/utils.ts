export function convertTemperature(value: number, fromScale: 'C' | 'F'): number {
  if (fromScale === 'C') {
    return (value * 9/5) + 32;
  } else {
    return (value - 32) * 5/9;
  }
}
