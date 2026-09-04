export type MigrationEntityType =
  | 'faculty'
  | 'notices'
  | 'events'
  | 'gallery_albums'
  | 'gallery_images'
  | 'achievements'
  | 'documents'
  | 'faqs'
  | 'pages'
  | 'settings';

export type DuplicateAction = 'skip' | 'update' | 'import_as_new';

export interface ValidationError {
  row: number;
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationWarning {
  row: number;
  field: string;
  message: string;
  value?: unknown;
}

export interface ParsedRowResult {
  rowNumber: number;
  data: Record<string, any>;
  isValid: boolean;
  isDuplicate: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  duplicateMatch?: {
    id: string;
    description: string;
  };
}

export interface PreviewSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  rows: ParsedRowResult[];
  detectedHeaders: string[];
}

export interface ImportResult {
  batchId: string;
  type: MigrationEntityType;
  sourceFile: string;
  total: number;
  imported: number;
  updated: number;
  skipped: number;
  failed: number;
  errors: ValidationError[];
}

export interface MigrationBatch {
  id: string;
  school_id: string;
  type: MigrationEntityType;
  source_file: string;
  records_count: number;
  imported_count: number;
  updated_count: number;
  skipped_count: number;
  failed_count: number;
  errors?: ValidationError[];
  status: 'completed' | 'processing' | 'failed' | 'rolled_back';
  created_by?: string;
  created_at: string;
}

export interface MediaMigrationRecord {
  id: string;
  school_id?: string;
  old_url: string;
  new_url?: string;
  file_name: string;
  file_type?: string;
  file_size?: string;
  bucket: string;
  status: 'pending' | 'uploaded' | 'failed' | 'skipped';
  error_message?: string;
  created_at: string;
}
