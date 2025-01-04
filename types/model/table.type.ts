export type TableColumns = {
  key: string
  label?: string
  sortable?: boolean
  direction?: 'asc' | 'desc'
  class?: string
}

export type TableProps = {
  data: any[]
  columns: TableColumns[]
}