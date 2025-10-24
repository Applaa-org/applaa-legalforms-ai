export interface DocumentField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'textarea';
  placeholder?: string;
  required?: boolean;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  fields: DocumentField[];
}

export const templates: DocumentTemplate[] = [
  {
    id: 'rental-agreement',
    title: 'Rental Agreement',
    description: 'Create a legally binding rental contract',
    icon: '🏠',
    category: 'Real Estate',
    fields: [
      { id: 'landlordName', label: 'Landlord Name', type: 'text', required: true },
      { id: 'tenantName', label: 'Tenant Name', type: 'text', required: true },
      { id: 'propertyAddress', label: 'Property Address', type: 'text', required: true },
      { id: 'monthlyRent', label: 'Monthly Rent ($)', type: 'number', required: true },
      { id: 'leaseTerm', label: 'Lease Term (months)', type: 'number', required: true },
      { id: 'startDate', label: 'Start Date', type: 'date', required: true },
      { id: 'securityDeposit', label: 'Security Deposit ($)', type: 'number', required: true },
    ]
  },
  {
    id: 'power-of-attorney',
    title: 'Power of Attorney',
    description: 'Authorize someone to act on your behalf',
    icon: '⚖️',
    category: 'Legal Authority',
    fields: [
      { id: 'principalName', label: 'Your Name', type: 'text', required: true },
      { id: 'agentName', label: 'Agent Name', type: 'text', required: true },
      { id: 'agentAddress', label: 'Agent Address', type: 'text', required: true },
      { id: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { id: 'expirationDate', label: 'Expiration Date', type: 'date', required: false },
      { id: 'powers', label: 'Powers Granted', type: 'textarea', required: true, placeholder: 'Describe the specific powers you are granting' },
    ]
  },
  {
    id: 'complaint-letter',
    title: 'Complaint Letter',
    description: 'Formal complaint letter for grievances',
    icon: '📝',
    category: 'Communication',
    fields: [
      { id: 'senderName', label: 'Your Name', type: 'text', required: true },
      { id: 'senderAddress', label: 'Your Address', type: 'text', required: true },
      { id: 'recipientName', label: 'Recipient Name', type: 'text', required: true },
      { id: 'recipientAddress', label: 'Recipient Address', type: 'text', required: true },
      { id: 'subject', label: 'Subject', type: 'text', required: true },
      { id: 'complaintDetails', label: 'Details of Complaint', type: 'textarea', required: true, placeholder: 'Describe your complaint in detail' },
      { id: 'desiredResolution', label: 'Desired Resolution', type: 'textarea', required: true, placeholder: 'What would you like to happen?' },
    ]
  }
];