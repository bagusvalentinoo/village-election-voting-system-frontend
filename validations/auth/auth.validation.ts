import { z, ZodType } from 'zod'

export const LOGIN_OFFICER: ZodType = z.object({
  username: z
    .string({
      required_error: 'Oops, username tidak boleh kosong'
    })
    .min(3, {
      message: 'Oops, username minimal 3 karakter'
    }),
  password: z
    .string({
      required_error: 'Oops, password tidak boleh kosong'
    })
    .min(8, {
      message: 'Oops, password minimal 8 karakter'
    })
})

export const LOGIN_VOTER: ZodType = z.object({
  token: z
    .string({
      required_error: 'Oops, token tidak boleh kosong'
    })
    .length(12, {
      message: 'Oops, token harus 12 karakter'
    })
})
