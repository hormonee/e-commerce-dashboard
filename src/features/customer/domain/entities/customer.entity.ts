export type CustomerGrade = 'VIP' | 'Gold' | 'Silver' | 'Bronze' | 'Normal';

export interface Customer {
    id: string;
    name: string;
    email: string;
    grade: CustomerGrade;
    ltv: number; // Cumulative spending
    aov: number; // Average order value
    orderCount: number;
    lastVisitDate: string; // ISO String
}

export interface CohortData {
    month: string;
    size: number;
    retention: number[]; // M1, M2, M3, M4, M5 percentages
}

export interface RfmSegment {
    name: string;
    percentage: number;
}

export interface AtRiskVip {
    id: string;
    name: string;
    grade: CustomerGrade;
    daysSinceLastVisit: number;
    avatarUrl?: string;
}

export interface CustomerStats {
    cohortData: CohortData[];
    rfmSegments: RfmSegment[];
    atRiskVips: AtRiskVip[];
}

export interface CustomerListResult {
    customers: Customer[];
    totalCount: number;
}
