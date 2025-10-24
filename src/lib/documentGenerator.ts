// Simple document generator without external dependencies
export const generateDocument = (type: string, data: Record<string, any>) => {
  return {
    type,
    data,
    createdAt: new Date().toISOString()
  };
};

export const downloadDocument = async (doc: any, filename: string, format: 'docx' | 'pdf') => {
  // Create a simple text-based document for now
  const content = generateSimpleContent(doc);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

const generateSimpleContent = (doc: any) => {
  const { type, data } = doc;
  let content = `${type.replace(/-/g, ' ').toUpperCase()}\n\n`;
  
  Object.entries(data).forEach(([key, value]) => {
    content += `${key}: ${value}\n`;
  });
  
  return content;
};