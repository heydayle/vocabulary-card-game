declare module 'uuid' {
  export interface V4Options {
    random?: readonly number[];
    rng?: () => readonly number[];
  }

  export function v4(options?: V4Options): string;
}
