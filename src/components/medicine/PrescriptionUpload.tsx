
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, CheckCircle } from 'lucide-react';

interface PrescriptionUploadProps {
  prescriptionImage: File | null;
  setPrescriptionImage: (file: File | null) => void;
  onCaptureClick: () => void;
}

const PrescriptionUpload: React.FC<PrescriptionUploadProps> = ({
  prescriptionImage,
  setPrescriptionImage,
  onCaptureClick
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPrescriptionImage(file);
    }
  };

  return (
    <div>
      <label className="text-base font-medium">Upload Prescription</label>
      {prescriptionImage ? (
        <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Prescription captured: {prescriptionImage.name}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setPrescriptionImage(null)}
            >
              Remove
            </Button>
          </div>
          <p className="text-sm text-green-600 mt-2">
            ✅ Your prescription has been uploaded successfully
          </p>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Take a clear photo of your prescription</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={onCaptureClick}>
              <Camera className="w-4 h-4 mr-2" />
              Capture Prescription
            </Button>
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,.pdf"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default PrescriptionUpload;
