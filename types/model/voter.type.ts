import type { Session } from './session.type'

export type Voter = {
  id: string
  nik: string
  full_name: string
  birth_date: string
  address: string
  gender: 'Male' | 'Female'
  otp: string
  otp_status: boolean
}

export type VoterResponse = Voter & {
  session: Session
}

export type DeleteIds = {
  ids: []
}

export type FormState = {
  id: string
  election_session_id: string
  nik: string
  full_name: string
  birth_date: string
  address: string
  gender: string
}

export type FormUiState = {
  disabledInputs: {
    button: boolean
    election_session_id: boolean
    nik: boolean
    full_name: boolean
    birth_date: boolean
    address: boolean
    gender: boolean
  }
  error: string
  errors: {
    election_session_id: string
    nik: string
    full_name: string
    birth_date: string
    address: string
    gender: string
  }
}

export type FormVoteCandidateState = {
    otp: string
    candidatePairId: string
}
