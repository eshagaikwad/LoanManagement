import{LoanScheme} from '../model/loan-scheme.model'
export interface AdminAnalytics{
    analyticsId: number,
    applicationsCount: number,
    approvedLoansCount: number,
    rejectedLoansCount: number,
    totalLoanAmount: number,
    totalRepaymentCollected: number,
    reportDate: Date,
    loanScheme: LoanScheme;
}