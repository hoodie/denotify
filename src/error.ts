export interface DenotifyError {
  msg: string;
}

export type ResultRaw<T, E = DenotifyError> = {
  Ok?: T;
  Err?: E;
};

export type ResultMatchers<T, E> = {
  [P in keyof Required<ResultRaw<T, E>>]: (
    x: ResultRaw<T, E>[P],
  ) => void;
};

export class Result<T = undefined, E = DenotifyError> {
  constructor(private content: ResultRaw<T, E>) {
  }

  public raw(): ResultRaw<T, E> {
    return this.content;
  }

  public match(
    matchers: ResultMatchers<T, E>,
  ) {
    if (this.content.hasOwnProperty("Err")) {
      matchers.Err(this.content.Err!);
    } else {
      matchers.Ok(this.content.Ok!);
    }
  }
}
