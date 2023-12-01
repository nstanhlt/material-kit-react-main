export interface ViewNote {
    id: string;
    noiDung?: string;
    thoiGianTao?: string;
    nguoiTao?: number;
    thoiGianSua?: string;
}

export interface ViewNotePagedResultTotalDto {
    items?: ViewNote[];
    count: number;
}
