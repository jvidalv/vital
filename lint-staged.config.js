// One glob, so the tasks run in order and never edit the same file at once.
// oxlint and oxfmt skip file types they don't handle.
export default {
  "*": [
    "oxlint --fix --no-error-on-unmatched-pattern",
    "oxfmt --no-error-on-unmatched-pattern",
    () => "tsc -b",
  ],
};
