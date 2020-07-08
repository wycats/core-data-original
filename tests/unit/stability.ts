import {
  TrackedCache,
  createCache,
  getValue,
} from "@glimmer/tracking/primitives/cache";

export class Stability<Args, T> {
  private count = 0;
  private cache: TrackedCache<T>;

  constructor(
    private assert: typeof QUnit.assert,
    callback: (args: Args) => T,
    private args: Args,
    private desc: string
  ) {
    this.cache = createCache(() => {
      this.count++;
      return callback(this.args);
    });
  }

  prime(): void {
    getValue(this.cache);
  }

  assertStable(): void {
    this.assert.step("[STEP] expect stable");
    let before = this.count;
    getValue(this.cache);
    let after = this.count;

    this.assert.equal(
      before,
      after,
      `expected stability (before=${before}, after=${after}): ${this.desc}`
    );
    this.assert.verifySteps(["[STEP] expect stable"]);
  }

  assertStale(args: Args): void {
    this.assert.step("[STEP] expect stale");
    this.args = args;
    let before = this.count;
    getValue(this.cache);
    let after = this.count;

    this.assert.notEqual(
      before,
      after,
      `expected stale (before=${before}, after=${after}): ${this.desc}`
    );
    this.assert.verifySteps(["[STEP] expect stale"]);

    // after updating the cache, it should be stable if we don't do anything else
    this.assertStable();
  }
}

export function stability<T, Args>(
  assert: typeof QUnit.assert,
  callback: (args: Args) => T,
  args: Args,
  desc: string
): Stability<Args, T> {
  let stability = new Stability(assert, callback, args, desc);
  stability.prime();
  return stability;
}
