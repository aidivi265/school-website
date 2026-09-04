'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Loader2, Download } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function FileUploader({
  bucket = 'documents',
  value,
  fileName,
  onChange,
  label = 'Upload PDF Document',
}: {
  bucket?: string;
  value?: string;
  fileName?: string;
  onChange: (url: string, name: string, size?: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Only PDF documents are allowed.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('File size exceeds the 20MB limit.');
      return;
    }

    setUploading(true);
    setError(null);

    const sizeStr = formatFileSize(file.size);

    try {
      const supabase = createClient();
      if (supabase) {
        const fileExt = 'pdf';
        const uniqueName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const filePath = `${uniqueName}`;

        const { data, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
        onChange(urlData.publicUrl, file.name, sizeStr);
      } else {
        onChange('#', file.name, sizeStr);
      }
    } catch {
      onChange('#', file.name, sizeStr);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </label>

      {value && value !== '#' ? (
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <FileText size={20} />
            </div>
            <div className="truncate">
              <p className="font-serif font-bold text-xs text-slate-900 truncate">
                {fileName || 'Document.pdf'}
              </p>
              <p className="text-[11px] text-slate-500">PDF File</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-amber-700 font-bold hover:underline"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('', '')}
              className="p-1 rounded-lg text-rose-600 hover:bg-rose-100"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center"
        >
          {uploading ? (
            <Loader2 className="animate-spin text-amber-600 mb-2" size={26} />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
              <Upload size={18} />
            </div>
          )}
          <p className="text-xs font-bold text-slate-800">
            {uploading ? 'Uploading PDF...' : 'Click to browse or drop PDF document'}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Maximum file size: 20MB</p>
        </div>
      )}

      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
