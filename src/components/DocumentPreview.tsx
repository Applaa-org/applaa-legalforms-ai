import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface DocumentPreviewProps {
  documentType?: string;
  data?: Record<string, any>;
  isGenerating?: boolean;
}

export default function DocumentPreview({ documentType, data, isGenerating }: DocumentPreviewProps) {
  const getPreviewContent = () => {
    if (!documentType || !data) return null;

    switch (documentType) {
      case 'rental-agreement':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">RENTAL AGREEMENT</h2>
            <p className="text-sm"><strong>This Agreement entered on:</strong> {data.startDate || '________'}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm"><strong>Landlord:</strong></p>
                <p className="text-sm">{data.landlordName || '________'}</p>
              </div>
              <div>
                <p className="text-sm"><strong>Tenant:</strong></p>
                <p className="text-sm">{data.tenantName || '________'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm"><strong>Property Address:</strong></p>
              <p className="text-sm">{data.propertyAddress || '________'}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm"><strong>Monthly Rent:</strong></p>
                <p className="text-sm">${data.monthlyRent || '________'}</p>
              </div>
              <div>
                <p className="text-sm"><strong>Lease Term:</strong></p>
                <p className="text-sm">{data.leaseTerm || '________'} months</p>
              </div>
              <div>
                <p className="text-sm"><strong>Security Deposit:</strong></p>
                <p className="text-sm">${data.securityDeposit || '________'}</p>
              </div>
            </div>
          </div>
        );
      case 'power-of-attorney':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">POWER OF ATTORNEY</h2>
            <p className="text-sm">I, <strong>{data.principalName || '________'}</strong>, hereby appoint <strong>{data.agentName || '________'}</strong> as my attorney-in-fact.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm"><strong>Effective Date:</strong></p>
                <p className="text-sm">{data.effectiveDate || '________'}</p>
              </div>
              {data.expirationDate && (
                <div>
                  <p className="text-sm"><strong>Expiration Date:</strong></p>
                  <p className="text-sm">{data.expirationDate}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm"><strong>Powers Granted:</strong></p>
              <p className="text-sm">{data.powers || '________'}</p>
            </div>
          </div>
        );
      case 'complaint-letter':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">FORMAL COMPLAINT LETTER</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm"><strong>From:</strong></p>
                <p className="text-sm">{data.senderName || '________'}</p>
                <p className="text-sm">{data.senderAddress || '________'}</p>
              </div>
              <div>
                <p className="text-sm"><strong>To:</strong></p>
                <p className="text-sm">{data.recipientName || '________'}</p>
                <p className="text-sm">{data.recipientAddress || '________'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm"><strong>Subject:</strong> {data.subject || '________'}</p>
            </div>
            <div>
              <p className="text-sm"><strong>Complaint Details:</strong></p>
              <p className="text-sm">{data.complaintDetails || '________'}</p>
            </div>
            <div>
              <p className="text-sm"><strong>Desired Resolution:</strong></p>
              <p className="text-sm">{data.desiredResolution || '________'}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
      style={{ minHeight: '600px' }}
    >
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">Live Preview</h3>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
        {isGenerating ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Generating document...</span>
          </div>
        ) : documentType ? (
          <div className="space-y-4 text-gray-800">
            {getPreviewContent()}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-500">Select a document type to see live preview</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}