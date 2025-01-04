import { z, ZodType } from 'zod'

export const CREATE_UPDATE: ZodType = z.object({
  session_id: z
    .string({
      required_error: 'Oops, nama sesi pemilihan tidak boleh kosong'
    })
    .min(1, {
      message: 'Oops, nama sesi pemilihan tidak boleh kosong'
    }),
  chairperson_name: z
    .string({
      required_error: 'Oops, nama ketua paslon tidak boleh kosong'
    })
    .min(1, {
      message: 'Oops, nama ketua paslon tidak boleh kosong'
    }),
  deputy_name: z
    .string({
      required_error: 'Oops, nama wakil ketua paslon tidak boleh kosong'
    })
    .min(1, {
      message: 'Oops, nama wakil ketua paslon tidak boleh kosong'
    }),
  serial_number: z
    .string({
      required_error: 'Oops, nomor urut paslon tidak boleh kosong'
    })
    .min(1, {
      message: 'Oops, nomor urut paslon tidak boleh kosong'
    }),
  description: z
    .string({
      required_error: 'Oops, deskripsi paslon tidak boleh kosong'
    })
    .min(1, {
      message: 'Oops, deskripsi paslon tidak boleh kosong'
    }),
  photo: z
    .instanceof(File, {
      message: 'Oops, file foto tidak boleh kosong'
    })
    .refine((file) => file.size <= 1048576, {
      message: 'Oops, ukuran file tidak boleh lebih dari 1MB'
    })
    .refine(
      (file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
      { message: 'Oops, hanya mendukung file PNG, JPG, dan JPEG' }
    )
})
