import type { TableColumns } from '~/types/model/table.type'
import type { VoterResponse } from '~/types/model/voter.type'

export const tableColumns: TableColumns[] = [
  {
    key: 'no',
    label: 'No',
    sortable: true
  },
  {
    key: 'session_name',
    label: 'Nama Sesi Pemilihan'
  },
  {
    key: 'nik',
    label: 'NIK'
  },
  {
    key: 'full_name',
    label: 'Nama Pemilih',
    sortable: true,
    direction: 'asc' as const
  },
  {
    key: 'birth_date',
    label: 'Tanggal Lahir',
    sortable: true
  },
  {
    key: 'otp',
    label: 'OTP'
  },
  {
    key: 'otp_status',
    label: 'OTP Status'
  },
  {
    key: 'action',
    label: 'Aksi'
  }
]

export const voters: VoterResponse[] = [
  {
    id: 'ef9e0952-1b0c-424f-92d3-574876683f0e',
    nik: '3217271001566867',
    full_name: 'Vero Mandala',
    birthdate: '1981-10-09',
    address: 'Jl. Pegangsaan Timur No. 56, Jakarta',
    gender: 'male',
    otp: '87401235',
    otp_status: false,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: '027f8fd8-11b7-49fe-801b-22a80dca2e4d',
    nik: '3217428418712278',
    full_name: 'Tgk. Balidin Bungsu',
    birthdate: '1978-04-17',
    address: 'Jl. Panglima Polim No. 10, Jakarta',
    gender: 'male',
    otp: '31720548',
    otp_status: false,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: '78fe123c-5962-4e3d-b053-3e3d65f32683',
    nik: '3217077240916465',
    full_name: 'Lina Permata Sari',
    birthdate: '1992-07-24',
    address: 'Jl. Kebon Kacang No. 32, Jakarta',
    gender: 'female',
    otp: '89037512',
    otp_status: true,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: '50bfbdd2-74af-47fd-98ed-dfacc2d22b56',
    nik: '3217292960994473',
    full_name: 'Dani Wijaya',
    birthdate: '1985-09-29',
    address: 'Jl. Setiabudi Barat No. 15, Jakarta',
    gender: 'male',
    otp: '12674039',
    otp_status: true,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'bd222671-73db-4f58-ad49-7dc80836d5fb',
    nik: '3217176829922001',
    full_name: 'Siti Rahmawati',
    birthdate: '1976-12-31',
    address: 'Jl. Merdeka Timur No. 12, Jakarta',
    gender: 'female',
    otp: '23579810',
    otp_status: false,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: '5f0de73b-f83e-43e1-b098-11ce9209b982',
    nik: '3217880569362825',
    full_name: 'Agus Pramono',
    birthdate: '1988-05-06',
    address: 'Jl. Thamrin No. 43, Jakarta',
    gender: 'male',
    otp: '97035126',
    otp_status: false,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'e2a4e767-d14e-43fb-b63c-ba54cf11764b',
    nik: '3217915652698483',
    full_name: 'Rudi Hartono',
    birthdate: '1987-10-15',
    address: 'Jl. Kemang Timur No. 7, Jakarta',
    gender: 'male',
    otp: '58207439',
    otp_status: false,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'a7b60d3e-f6bd-4ce3-8111-c013f96ddad9',
    nik: '3217518794589893',
    full_name: 'Lala Kurnia',
    birthdate: '1980-05-22',
    address: 'Jl. Tebet Barat No. 19, Jakarta',
    gender: 'female',
    otp: '40789315',
    otp_status: true,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: '11d141a0-6846-4f03-a1c1-338b9efcb6ee',
    nik: '3217299724547809',
    full_name: 'Rizki Ramadhan',
    birthdate: '1990-12-01',
    address: 'Jl. Palem No. 3, Jakarta',
    gender: 'male',
    otp: '73840216',
    otp_status: false,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'a675e9a2-97c7-4644-aafe-d1cebb4e4634',
    nik: '3217636856413377',
    full_name: 'Desi Ayu',
    birthdate: '1975-06-23',
    address: 'Jl. Menteng No. 7, Jakarta',
    gender: 'female',
    otp: '18593724',
    otp_status: true,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: '171a6e01-5ab9-407c-aceb-85df87f0fd9b',
    nik: '3217580034811243',
    full_name: 'Adi Pratama',
    birthdate: '1978-05-14',
    address: 'Jl. Pramuka No. 13, Jakarta',
    gender: 'male',
    otp: '70984325',
    otp_status: true,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: '2e59c5cb-f1a5-458a-8639-b093077856b3',
    nik: '3217359036540658',
    full_name: 'Santi Wulandari',
    birthdate: '1992-05-03',
    address: 'Jl. Raya Bogor No. 11, Jakarta',
    gender: 'female',
    otp: '95317482',
    otp_status: false,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
  {
    id: 'e4e0186f-a0e6-4336-9f97-a972931f851b',
    nik: '3217079939960166',
    full_name: 'Dedi Susanto',
    birthdate: '1987-09-20',
    address: 'Jl. Margonda No. 6, Depok',
    gender: 'male',
    otp: '62147830',
    otp_status: true,
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start_date: '2024-02-10 07:00:00',
      end_date: '2024-02-10 13:00:00'
    }
  },
]
