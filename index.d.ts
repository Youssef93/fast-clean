export interface ICleanerOptions {
  nullCleaner?: boolean
  emptyArraysCleaner?: boolean
  emptyObjectsCleaner?: boolean
  emptyStringsCleaner?: boolean
  nanCleaner?: boolean
}

export function clean(object: any, options?:ICleanerOptions): any;