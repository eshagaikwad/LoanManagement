export interface LoanApplication {
    LoanApplicationId: number;
    LoanAmount: number;
    UserAddress: string;
    // NPAStatus: string;
    NomineeName: string;
    NomineePhone: string;
    BankAccountNo: string;
    BankName: string;
    IFSCCode: string;
    UserId: number;
    LoanOfficerId: number;
    LoanSchemeId: number;


    Base64FileContent1: string; 
    FileName1: string; 
    DocumentType1: string;

    
    Base64FileContent2: string; 
    FileName2: string; 
    DocumentType2: string;
  }
  