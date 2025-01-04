import type { SidebarMenuItems } from '~/types/layout/layout.type'

export const sidebarMenuItems: SidebarMenuItems[] = [
  {
    to: '/officer/dashboard',
    icon: 'i-heroicons-chart-pie-16-solid',
    label: 'Dashboard'
  },
  {
    to: '/officer/elections',
    icon: 'i-heroicons-chart-bar-16-solid',
    label: 'Data Pemilihan'
  },
  {
    to: '/officer/candidates',
    icon: 'i-heroicons-chart-bar-16-solid',
    label: 'Data Paslon'
  },
  {
    to: '/officer/voters',
    icon: 'i-heroicons-shopping-cart',
    label: 'Data Pemilih'
  },
  // { to: '/officer/tps', icon: 'i-heroicons-shopping-bag', label: 'Data TPS' },
  {
    to: '/officer/officers',
    icon: 'i-heroicons-presentation-chart-line-solid',
    label: 'Data Petugas'
  }
]
