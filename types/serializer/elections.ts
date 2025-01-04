export declare namespace ElectionsSerializer {
    type ElectionData = {
        data: ElectionList[]
    }

    type ElectionList = {
        id: string;
        name: string;
        start_date: string;
        end_date: string;
    }
}
