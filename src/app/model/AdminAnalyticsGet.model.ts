export interface AdminAnalytics {
    analyticsId: number;
    applicationsCount: number;
    approvedLoansCount: number;
    rejectedLoansCount: number;
    totalLoanAmount: number;
    totalRepaymentCollected: number;
    reportDate: Date;
    loanSchemeId: number;
  }