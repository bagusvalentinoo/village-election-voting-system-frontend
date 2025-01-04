export declare namespace ElectionSessionSerializer {
    type CandidatePair = {
        id: string
        first_candidate_name: string
        second_candidate_name: string
        description: string
        image_url: string
        number: number
        total_vote: number
        created_at: string
        updated_at: string
    }

    type ElectionSessionData = {
        id: string
        name: string
        start_date: string
        end_date: string
        candidate_pairs: CandidatePair[]
        created_at: string
        updated_at: string
    }

    type ElectionSessionPagination = {
        current_page: number
        data: ElectionSessionData[]
        first_page_url: string
        from: number
        next_page_url: string | null
        path: string
        per_page: string | number
        prev_page_url: string | null
        to: number
    }
}
