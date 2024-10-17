// // loan-application.model.ts
export interface LoanApplicationGet {
    loanApplicationId: number;
    applicationDate?: Date; // Optional
    loanAmount: number;
    loanStatus?: string; // Optional
    repaymentStartDate?: Date; // Optional
    userAddress: string;

    documentFileName1?: string; // Optional
    documentUrl1?: string; // Optional
    documentType1?: string;

    documentFileName2?: string; // Optional
    documentUrl2?: string; // Optional
    documentType2?: string;
    
    // Optional
    dateUploaded?: Date; // Optional
    documentVerificationStatus?: string; // Optional
    npaStatus?: string; // Optional
    nomineeName: string;
    nomineePhone?: string; // Optional
    bankAccountNo: string;
    bankName: string;
    ifscCode: string;
    userId: number; // Foreign Key
    loanOfficerId: number; // Foreign Key
    loanSchemeId: number; // Foreign Key
  }
  



