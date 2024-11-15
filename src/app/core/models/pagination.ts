export type Pagination<T> = {
    limit: number;
    page: number;
    sort: string;
    totalRows: number;
    totalPages: number;
    rows: T[];
};
