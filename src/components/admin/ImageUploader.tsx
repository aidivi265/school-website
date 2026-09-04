'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ImageUploader({
  bucket = 'school-assets',
  value,
  onChange,
  label = 'Upload Image',
  recommendedSize = 'Recommended: 800x600px (.jpg, .png, .webp)',
}: {
  bucket?: string;
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  recommendedSize?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      if (supabase) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
        onChange(urlData.publicUrl);
      } else {
        // Local preview fallback
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            onChange(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err: unknown) {
      // If upload fails, fallback to local FileReader preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </label>

      {value ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-44 flex items-center justify-center">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-slate-900 text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-amber-50 shadow-md transition-colors"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-rose-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-rose-700 shadow-md transition-colors"
            >
              Remove
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
            {uploading ? 'Uploading image...' : 'Click to browse or drag & drop image'}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">{recommendedSize}</p>
        </div>
      )}

      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
