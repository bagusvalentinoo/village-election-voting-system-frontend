import type { TableColumns } from '~/types/model/table.type'
import type { CandidateResponse } from '~/types/model/candidate.type'

export const tableColumns: TableColumns[] = [
  {
    key: 'serial_number',
    label: 'Nomor Urut',
    sortable: true
  },
  {
    key: 'session_name',
    label: 'Nama Sesi Pemilihan',
    sortable: true
  },
  {
    key: 'chairperson_name',
    label: 'Nama Ketua',
    sortable: true
  },
  {
    key: 'deputy_name',
    label: 'Nama Wakil',
    sortable: true
  },
  {
    key: 'action',
    label: 'Aksi'
  }
]

export const candidates: CandidateResponse[] = [
  {
    id: '1',
    chairperson_name: 'Zamaludin Suhendar , S.Pt.',
    deputy_name: 'Drs. H. M. Dedi Mulyadi',
    serial_number: 1,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolorum voluptas mollitia repellendus praesentium dolorem ducimus. Recusandae quisquam tempora, nisi eligendi quis ipsam, soluta dolores aliquam suscipit possimus illum doloribus. \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Odio tenetur culpa, impedit eveniet labore fuga! Explicabo vel culpa voluptate architecto magni dolores minus nam cupiditate debitis possimus cum ea odio laboriosam veritatis, quae, voluptas quibusdam a facilis quisquam magnam blanditiis.',
    photo_url: '/images/illustration/default_candidate.png',
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '2',
    chairperson_name: 'Hj. Komarudin Mumtaz, S.T.',
    deputy_name: 'Ahmad Zaini, S.Pd.',
    serial_number: 2,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolorum voluptas mollitia repellendus praesentium dolorem ducimus. Recusandae quisquam tempora, nisi eligendi quis ipsam, soluta dolores aliquam suscipit possimus illum doloribus. \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Odio tenetur culpa, impedit eveniet labore fuga! Explicabo vel culpa voluptate architecto magni dolores minus nam cupiditate debitis possimus cum ea odio laboriosam veritatis, quae, voluptas quibusdam a facilis quisquam magnam blanditiis.',
    photo_url: '/images/illustration/default_candidate.png',
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  },
  {
    id: '3',
    chairperson_name: 'Nanang Kosim, S.H.',
    deputy_name: 'Drs. Budiman, M.Si.',
    serial_number: 3,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolorum voluptas mollitia repellendus praesentium dolorem ducimus. Recusandae quisquam tempora, nisi eligendi quis ipsam, soluta dolores aliquam suscipit possimus illum doloribus. \n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Odio tenetur culpa, impedit eveniet labore fuga! Explicabo vel culpa voluptate architecto magni dolores minus nam cupiditate debitis possimus cum ea odio laboriosam veritatis, quae, voluptas quibusdam a facilis quisquam magnam blanditiis.',
    photo_url: '/images/illustration/default_candidate.png',
    session: {
      id: '3',
      name: 'Pemilihan tahun 2024',
      start: '2024-02-10 07:00:00',
      end: '2024-02-10 13:00:00'
    }
  }
]
