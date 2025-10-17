export async function* debouncedYield<T>(
  promises: Promise<T>[],
  delay: number
) {
  console.info(`debouncedYield: Initialized with ${promises.length} promises`);

  let results: T[] = [];
  let lastYieldTime = Date.now() + delay; // Delays first yield by 2 * delay

  // Process promises as they complete
  for (const promise of promises) {
    const result = await promise;
    if (result) {
      results.push(result);

      // Debounce yields
      const now = Date.now();
      const shouldYield = now - lastYieldTime >= delay;
      if (shouldYield) {
        console.info(`debouncedYield: Yielding ${results.length} items`);
        const toYield = results;
        results = [];
        lastYieldTime = now;
        yield toYield;
      }
    }
  }

  // Yield any trailing items
  if (results.length > 0) {
    // Wait to give the last yield a chance to complete
    await new Promise((resolve) => setTimeout(resolve, delay));

    console.info(`debouncedYield: Yielding ${results.length} items (final)`);
    yield results;
  } else {
    console.info("debouncedYield: No trailing items to yield");
  }
  // Wait before exiting to let any yields complete
  await new Promise((resolve) => setTimeout(resolve, delay * 4));
}
