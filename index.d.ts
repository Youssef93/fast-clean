export interface ICleanerOptions {
  nullCleaner?: boolean
  emptyArraysCleaner?: boolean
  emptyObjectsCleaner?: boolean
  emptyStringsCleaner?: boolean
  nanCleaner?: boolean
  cleanInPlace?: boolean
}

export function clean<T = any>(object: any, options?:ICleanerOptions): T;