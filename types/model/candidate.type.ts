import type { Session } from './session.type'
import type { getPaginationResponse } from "~/types/model/pagination.type";

export type Candidate = {
  id: string
  chairperson_name: string
  deputy_name: string
  serial_number: number
  description: string
  photo_url?: string
}

export type CandidateResponse = Candidate & {
  session: Session
}

export type FormState = {
  session_id: string
  chairperson_name: string
  deputy_name: string
  serial_number: string
  description: string
  photo: File | string
}

export type FormUiState = {
  disabledInputs: {
    button: boolean
    session_id: boolean
    chairperson_name: boolean
    deputy_name: boolean
    serial_number: boolean
    description: boolean
    photo: boolean
  }
  error: string
  errors: {
    session_id: string
    chairperson_name: string
    deputy_name: string
    serial_number: string
    description: string
    photo: string
  }
}

export type DetailState = {
  session_name: string
  chairperson_name: string
  deputy_name: string
  serial_number: string
  description: string
  photo_url: string
}

export type VoteCandidateState = {
  candidate_id: string
}

export type VoteCandidateUiState = {
  disabledInputs: {
    button: boolean
    candidate_id: boolean
  }
  error: string
}