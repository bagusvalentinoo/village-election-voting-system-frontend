import { z, ZodType } from 'zod'

export const CREATE_UPDATE: ZodType = z.object({
    election_session_id: z
    .string({
      required_error: 'Oops, nama sesi pemilihan tidak boleh kosong'
    })
    .min(1, {
      message: 'Oops, nama sesi pemilihan tidak boleh kosong'
    }),
  nik: z
    .string({
      required_error: 'Oops, NIK tidak boleh kosong'
    })
    .length(16, {
      message: 'Oops, NIK harus 16 karakter'
    })
    .regex(/^[0-9]+$/, {
      message: 'Oops, NIK hanya boleh berisi angka'
    }),
    full_name: z
    .string({
      required_error: 'Oops, nama tidak boleh kosong'
    })
    .min(1, {
      message: 'Oops, nama tidak boleh kosong'
    }),
  birth_date: z.coerce
    .date({
      required_error: 'Oops, tanggal lahir tidak boleh kosong'
    })
    .refine(
      (value) => {
        const today = new Date()
        const birthdate = new Date(value)
        let age = today.getFullYear() - birthdate.getFullYear()
        const month = today.getMonth() - birthdate.getMonth()

        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate()))
          age--

        return age >= 17
      }, {
        message: 'Oops, minimal usia 17 tahun'
      }),
  address: z
    .string({
      required_error: 'Oops, alamat tidak boleh kosong'
    })
    .min(1, {
      message: 'Oops, alamat tidak boleh kosong'
    }),
  gender: z.enum(['male', 'female'], {
    required_error: 'Oops, Jenis kelamin tidak boleh kosong',
    invalid_type_error: 'Oops, Jenis kelamin tidak valid'
  })
})
