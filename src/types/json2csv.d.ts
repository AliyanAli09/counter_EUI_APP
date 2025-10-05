// src/types/json2csv.d.ts
declare module "json2csv" {
  // Generic T defaults to an object with string keys and unknown values
  export class Parser<T = Record<string, unknown>> {
    constructor(opts?: Record<string, unknown>);
    parse(data: T[]): string;
  }
}
