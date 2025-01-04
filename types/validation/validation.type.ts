import { z, ZodType } from 'zod'

export type Schema<T extends ZodType> = z.infer<T>