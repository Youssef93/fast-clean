export interface ICleanerOptions {
  nullCleaner?: boolean
}

export function clean(object: any, options?:ICleanerOptions): any;