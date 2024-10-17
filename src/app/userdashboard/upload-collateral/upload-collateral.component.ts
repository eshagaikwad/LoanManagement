import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/user/file-upload.service';
import { ActivatedRoute } from '@angular/router';
import { Collateral } from '../../model/Collateral.model';

@Component({
  selector: 'app-upload-collateral',
  templateUrl: './upload-collateral.component.html',
  styleUrl: './upload-collateral.component.css'
})
export class UploadCollateralComponent implements OnInit {

  collateralForm!: FormGroup;
  selectedFile: File | null = null;
  documentUrl: string | null = null;
  loanApplicationId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private collateralService: FileUploadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loanApplicationId = params['loanApplicationId']; // Get the loanApplicationId from route parameters
    });
    this.initForm();
  }

  // Initialize the form
  initForm(): void {
    this.collateralForm = this.formBuilder.group({
      documentType: ['', [Validators.required]], // Must select a document type
      fileName: ['', Validators.required] // This must be filled out
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
        this.selectedFile = fileInput.files[0];
        this.documentUrl = URL.createObjectURL(this.selectedFile);
        this.collateralForm.patchValue({
            fileName: this.selectedFile.name 
           // Set the file name in the form control
        });
        console.log('File selected:', this.selectedFile);
    }
}

  

  isImage(url: string | null | undefined): boolean {
    if (!url) return false;
    return url.startsWith('data:image/');
  }

  // Convert file to Base64
  private convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Submit collateral
  async submitCollateral(): Promise<void> {
    if (this.collateralForm.valid) {
      const CollateralData = { ...this.collateralForm.value };
  
      // Assuming loanApplicationId is already fetched in ngOnInit
      if (this.loanApplicationId) {
        CollateralData.loanApplicationId = Number(this.loanApplicationId); // Convert to number if needed
      }
  
      // File handling and submission logic...
      if (this.selectedFile) {
        try {
          const base64File = await this.convertFileToBase64(this.selectedFile);
          CollateralData.base64FileContent = base64File;
          CollateralData.fileName = this.selectedFile.name;
        } catch (error) {
          console.error("Error converting file to base64:", error);
          return;
        }
      }
  
      console.log('Collateral Data:', CollateralData);
      this.collateralService.postCollateral(CollateralData).subscribe(
        (response) => {
          console.log('Collateral created successfully:', response);
          this.collateralForm.reset();
          this.selectedFile = null;
          this.documentUrl = null;
        },
        (error) => {
          console.error('Error creating collateral:', error);
        }
      );
    }
  }

}  


  // async submitCollateral(): Promise<void> {


  //   console.log('Form Status:', this.collateralForm.status);  // Debug log
  //   console.log('Selected File:', this.selectedFile); 
  //   if (this.collateralForm.valid && this.selectedFile) {
  //     console.log('Form Status:', this.collateralForm.status);  // Debug log
  //     console.log('Selected File:', this.selectedFile); 
  //     const collateralData: Collateral = {
  //       collateralDocumentId: 0, // Default value, should be set by the backend
  //       documentType: this.collateralForm.get('documentType')?.value, // Get document type
  //       base64FileContent: '', // Placeholder for base64 content
  //       fileName: this.selectedFile.name, // File name from the selected file
  //       loanApplicationId: this.loanApplicationId // Get loan application ID from URL
  //     };

  //     try {
       

  //       const base64File = await this.convertFileToBase64(this.selectedFile);
  //       collateralData.base64FileContent = base64File ;
  //       collateralData.fileName=this.selectedFile.name;
  //        collateralData.collateralDocumentId=2;
  //        collateralData.loanApplicationId=1;
  //       console.log('Collateral Data:', collateralData);

  //       // Call service to submit the collateral
  //       this.collateralService.postCollateral(collateralData).subscribe(
  //         (response) => {
  //           console.log('Collateral created successfully:', response);
  //           this.collateralForm.reset();
  //           this.selectedFile = null;
  //           this.documentUrl = null;
  //         },
  //         (error) => {
  //           console.error('Error creating collateral:', error);
  //         }
  //       );
  //     } catch (error) {
  //       console.error('Error converting file to base64:', error);
  //     }
  //   }
  // }


