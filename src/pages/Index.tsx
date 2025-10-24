import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Download, RotateCcw, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

import Header from '@/components/Header';
import DocumentCard from '@/components/DocumentCard';
import FormField from '@/components/FormField';
import DocumentPreview from '@/components/DocumentPreview';
import SuccessMessage from '@/components/SuccessMessage';
import { templates } from '@/data/documentTemplates';
import { generateDocument, downloadDocument } from '@/lib/documentGenerator';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const Index = () => {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  const currentDocument = templates.find(doc => doc.id === selectedDocument);

  const generateSchema = () => {
    const schema: Record<string, any> = {};
    currentDocument?.fields.forEach(field => {
      if (field.type === 'number') {
        schema[field.id] = z.string().min(1, `${field.label} is required`);
      } else {
        schema[field.id] = z.string().min(1, `${field.label} is required`);
      }
    });
    return z.object(schema);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    resolver: zodResolver(generateSchema()),
  });

  const watchedValues = watch();

  useEffect(() => {
    setFormData(watchedValues);
  }, [watchedValues]);

  const onSubmit = async (data: any) => {
    setIsGenerating(true);
    try {
      const doc = generateDocument(selectedDocument, data);
      
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccessMessage('Document generated successfully ✅');
      setIsGenerating(false);
      toast.success('Legal document generated successfully!');
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error('Failed to generate document. Please try again.');
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format: 'docx' | 'pdf') => {
    if (!currentDocument) return;
    
    setIsDownloading(true);
    try {
      const doc = generateDocument(selectedDocument, formData);
      const filename = `${currentDocument.title.replace(/\s+/g, '-')}`;
      await downloadDocument(doc, filename, format);
      setIsDownloading(false);
      toast.success(`Document downloaded as ${format.toUpperCase()}!`);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Failed to download document. Please try again.');
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    setSelectedDocument('');
    setFormData({});
    reset();
    toast.info('Form has been reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            LegalForms AI Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create professional legal documents in minutes. No legal knowledge required.
          </p>
        </div>

        {!selectedDocument ? (
          <div id="documents" className="grid md:grid-cols-3 gap-6 mb-12">
            {templates.map((doc) => (
              <DocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                description={doc.description}
                icon={doc.icon}
                category={doc.category}
                isSelected={false}
                onClick={() => setSelectedDocument(doc.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentDocument?.title}
                </h2>
                <button
                  onClick={handleReset}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {currentDocument?.fields.map((field) => (
                  <FormField
                    key={field.id}
                    id={field.id as any}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    register={register}
                    error={errors[field.id as keyof typeof errors]?.message as string}
                  />
                ))}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-400 transition-colors flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Generate Document
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div>
              <DocumentPreview
                documentType={selectedDocument}
                data={formData}
                isGenerating={isGenerating}
              />
              
              {Object.keys(formData).length > 0 && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleDownload('docx')}
                    disabled={isDownloading}
                    className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 disabled:bg-gray-400 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download DOCX
                  </button>
                  <button
                    onClick={() => handleDownload('pdf')}
                    disabled={isDownloading}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 disabled:bg-gray-400 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div id="about" className="mt-16 p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About LegalForms AI</h2>
          <p className="text-gray-600 mb-4">
            Our AI-powered document generator helps you create professional legal documents without needing any legal expertise. Simply fill in the forms, and we'll generate perfectly formatted documents ready for download.
          </p>
          <p className="text-gray-600">
            Documents created: Rental Agreements, Power of Attorney, Complaint Letters, and more coming soon!
          </p>
        </div>
      </main>

      <MadeWithApplaa />
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
    </div>
  );
};

export default Index;