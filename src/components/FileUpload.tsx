import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

interface FileUploadProps {
  onFileContent: (text: string) => void;
}

const FileUpload = ({ onFileContent }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const extractPdfText = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pages: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      pages.push(content.items.map((item: any) => item.str).join(" "));
    }
    return pages.join("\n\n");
  };

  const handleFile = useCallback(async (file: File) => {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    setFileName(file.name);

    if (isPdf) {
      setIsParsing(true);
      try {
        const text = await extractPdfText(file);
        if (!text.trim()) {
          toast.error("Could not extract text from this PDF. It may be image-based. Try pasting your resume text instead.");
          setFileName(null);
          setIsParsing(false);
          return;
        }
        onFileContent(text);
      } catch (err) {
        console.error("PDF parse error:", err);
        toast.error("Failed to parse PDF. Try a different file or paste your resume text.");
        setFileName(null);
      } finally {
        setIsParsing(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => onFileContent(e.target?.result as string);
      reader.readAsText(file);
    }
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
      
      {isParsing ? (
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <div className="text-left">
            <p className="text-foreground font-medium">Parsing PDF...</p>
            <p className="text-sm text-muted-foreground">Extracting resume content</p>
          </div>
        </div>
      ) : fileName ? (
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
