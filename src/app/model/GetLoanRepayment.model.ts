export interface LoanRepayment{ 
     
    loanRepaymentId: number, 
    totalLoanAmount: number, 
    emiAmount: number, 
    principalAmount: number, 
    interestAmount: number, 
    principalPaid: number, 
    dueDate: Date, 
    noOfInstallments: number, 
    lastPaid: Date, 
    isNPA: boolean, 
    paymentStatus: string, 
    loanApplicationId: number,

    repaymentHistory:RepaymentHistory[]
   
}

interface RepaymentHistory {
    paymentHistoryId: number;
    amountPaid: number;
    paymentDate: string;
    loanRepaymentId: number;
  }