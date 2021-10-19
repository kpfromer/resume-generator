export const nonnull = <T>(value: T | null): value is T => !!value;

export const emptyArray = <TArg, TArray>(
  arg: TArg | null | undefined,
  func: (arg: TArg) => TArray[],
): TArray[] => (arg ? func(arg) : []);
