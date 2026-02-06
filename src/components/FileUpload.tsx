import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";

interface FileUploadProps {
  onFileContent: (text: string) => void;
}

const FileUpload = ({ onFileContent }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      onFileContent(e.target?.result as string);
    };
    reader.readAsText(file);
  }, [onFileContent]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setFileName(null);
    onFileContent("");
  };

  return (
    <motion.div
      className={`glass-card-hover p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragging ? "border-primary shadow-[0_0_40px_hsl(var(--glow-primary))]" : ""
      } ${fileName ? "border-primary/30" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={handleChange}
        className="hidden"
        id="resume-upload"
      />
      
      {fileName ? (
        <div className="flex items-center justify-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div className="text-left">
            <p className="text-foreground font-medium">{fileName}</p>
            <p className="text-sm text-muted-foreground">Resume uploaded</p>
          </div>
          <button onClick={clearFile} className="ml-4 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <label htmlFor="resume-upload" className="cursor-pointer block">
          <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-foreground font-display font-semibold text-lg mb-1">
            Drop your resume here
          </p>
          <p className="text-sm text-muted-foreground">
            or click to browse — supports .txt, .pdf, .doc
          </p>
        </label>
      )}
    </motion.div>
  );
};

export default FileUpload;
