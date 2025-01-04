export type FormLoginOfficerState = {
  username: string
  password: string
}

export type FormLoginOfficerUiState = {
  showPassword: boolean
  disabledInputs: {
    button: boolean
    username: boolean
    password: boolean
  }
  error: string
  errors: {
    username: string
    password: string
  }
}

export type FormLoginVoterState = {
  token: string
}

export type FormLoginVoterUiState = {
  disabledInputs: {
    button: boolean
    token: boolean
  }
  error: string
  errors: {
    token: string
  }
}
