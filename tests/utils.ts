import QUnit from "qunit";

// QUnit.config.autostart = true;
QUnit.config.urlConfig.push({
  id: "logging",
  value: ["all", "info", "warning"],
  label: "Enable logging",
});
QUnit.config.urlConfig.push({
  id: "stacktraces",
  label: "Show stack traces",
  tooltip: "Show a full stack trace for each log",
});
QUnit.dump.maxDepth = 25;

export type QUnitAssert = typeof QUnit.assert;

export function module(
  name: string
): <T extends { new (): object }>(target: T) => T {
  QUnit.module(name);

  return (c) => c;
}

export function test(target: object, name: string): void {
  QUnit.test(name, (assert) => {
    let constructor = target.constructor as {
      new (): {
        assert: typeof QUnit.assert;
      };
    };
    let instance = new constructor();
    instance.assert = assert;
    return (instance as { assert: QUnitAssert } & Dict<Function>)[name](assert);
  });
}

export function todo(target: object, name: string): void {
  QUnit.todo(name, (assert) => {
    let constructor = target.constructor as {
      new (): {
        assert: QUnitAssert;
      };
    };
    let instance = new constructor();
    instance.assert = assert;
    return (instance as { assert: QUnitAssert } & Dict<Function>)[name](assert);
  });
}

interface Dict<T = unknown> {
  [key: string]: T;
}

declare module "qunit" {
  interface Config {
    logging: "all" | "info" | "warning" | undefined;
    stacktraces: boolean;
  }
}
