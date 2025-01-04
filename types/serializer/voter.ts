import type { Session } from '../model/session.type'

export declare namespace VotersSerializer {
    type VoterData = {
        data: VoterList[]
    }

    type VoterList = {
        id: string
        election_session_id: string
        nik: string
        full_name: string
        birth_date: string
        address: string
        gender: string
        election_session: Session
    }
}
