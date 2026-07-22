export function defer(fn: () => void) {
  return {
    [Symbol.dispose]: fn,
  };
}
