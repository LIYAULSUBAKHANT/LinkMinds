import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { StorageService } from '../../services/storageService';
import { 
  UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, 
  ArrowRight, Download, RefreshCw, Check, ArrowLeft 
} from 'lucide-react';
import toast from 'react-hot-toast';

interface MappingItem {
  sourceColumn: string;
  targetField: string;
  confidence: number;
  isConfirmed: boolean;
  sampleValue?: string;
}

export const DataUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<MappingItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [programme, setProgramme] = useState('B.Tech Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('2026-2027');

  // SATYA-APAAR Target Canonical Schema
  const TARGET_FIELDS = [
    { key: 'student_ref', label: 'Student Enrolment ID (student_ref) *', required: true },
    { key: 'student_name', label: 'Candidate Full Name (student_name) *', required: true },
    { key: 'dob', label: 'Date of Birth (dob) *', required: true },
    { key: 'gender', label: 'Gender (gender) *', required: true },
    { key: 'apaar_id', label: 'APAAR ID (apaar_id) *', required: true },
    { key: 'programme', label: 'Sanctioned Programme (programme) *', required: true },
    { key: 'category', label: 'Admission Category (category) *', required: true },
    { key: 'admission_date', label: 'Date of Admission (admission_date)', required: false },
    { key: 'study_mode', label: 'Mode of Study (study_mode)', required: false },
  ];

  const handleDownloadSample = () => {
    const csvContent = "student_ref,student_name,dob,gender,apaar_id,programme,category,admission_date\nSTU-2026-0001,Aarav Patel,2005-04-12,M,9842-4910-8491,B.Tech Computer Science,General,2026-07-15\nSTU-2026-0002,Priya Sundararajan,2005-09-23,F,8492-3829-1934,B.Tech Computer Science,OBC-NCL,2026-07-18\nSTU-2026-0003,Rohan Mehra,2004-11-05,M,7192-5819-4910,B.Tech Information Technology,General,2026-08-01";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'satya_apaar_sample_admission_batch.csv';
    a.click();
    toast.success('Downloaded sample CSV template');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (ext !== 'csv' && ext !== 'xlsx' && ext !== 'xls') {
      toast.error('Invalid file format. Please upload a .csv or .xlsx document.');
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      toast.error('File size exceeds 15MB limit.');
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);

    if (ext === 'csv') {
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          handleParsedResults(results.data, results.meta.fields || []);
        },
        error: (err) => {
          toast.error(`CSV Parsing error: ${err.message}`);
          setIsProcessing(false);
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data: any[] = XLSX.utils.sheet_to_json(ws);
          const cols = data.length > 0 ? Object.keys(data[0]) : [];
          handleParsedResults(data, cols);
        } catch (err: any) {
          toast.error(`Excel parsing error: ${err.message}`);
          setIsProcessing(false);
        }
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleParsedResults = (data: any[], detectedHeaders: string[]) => {
    setParsedData(data);
    setHeaders(detectedHeaders);

    // Compute automatic column matching suggestions with confidence scores
    const autoMappings: MappingItem[] = detectedHeaders.map(col => {
      const colClean = col.toLowerCase().replace(/[^a-z0-9]/g, '');
      let bestTarget = '';
      let confidence = 40;

      if (colClean.includes('ref') || colClean.includes('id') || colClean.includes('enrol')) {
        bestTarget = 'student_ref';
        confidence = 94;
      } else if (colClean.includes('name') || colClean.includes('student')) {
        bestTarget = 'student_name';
        confidence = 98;
      } else if (colClean.includes('dob') || colClean.includes('birth')) {
        bestTarget = 'dob';
        confidence = 95;
      } else if (colClean.includes('gender') || colClean.includes('sex')) {
        bestTarget = 'gender';
        confidence = 96;
      } else if (colClean.includes('apaar') || colClean.includes('aadhaar')) {
        bestTarget = 'apaar_id';
        confidence = 99;
      } else if (colClean.includes('prog') || colClean.includes('branch') || colClean.includes('course')) {
        bestTarget = 'programme';
        confidence = 92;
      } else if (colClean.includes('cat') || colClean.includes('caste') || colClean.includes('quota')) {
        bestTarget = 'category';
        confidence = 90;
      } else if (colClean.includes('date') || colClean.includes('admit')) {
        bestTarget = 'admission_date';
        confidence = 88;
      }

      return {
        sourceColumn: col,
        targetField: bestTarget,
        confidence,
        isConfirmed: confidence >= 90,
        sampleValue: data.length > 0 ? String(data[0][col] || '') : '',
      };
    });

    setMapping(autoMappings);
    setIsProcessing(false);
    toast.success(`Successfully parsed ${data.length} records from ${detectedHeaders.length} columns!`);
  };

  const handleMappingChange = (index: number, newTarget: string) => {
    setMapping(prev => prev.map((m, i) => {
      if (i === index) {
        return { ...m, targetField: newTarget, isConfirmed: true, confidence: 100 };
      }
      return m;
    }));
  };

  const handleProceedToPreflight = () => {
    // Verify all required targets are mapped
    const mappedTargets = mapping.map(m => m.targetField);
    const missing = TARGET_FIELDS.filter(f => f.required && !mappedTargets.includes(f.key));

    if (missing.length > 0) {
      toast.error(`Please map required field: ${missing[0].label}`);
      return;
    }

    // Persist new submission batch into demo storage
    const newBatchId = `BATCH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    StorageService.addSubmission({
      id: 'sub-' + Date.now(),
      batchNumber: newBatchId,
      institutionId: 'inst-1',
      institutionName: 'Bannari Amman Institute of Technology',
      programme,
      academicYear,
      submissionDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      totalRecords: parsedData.length || 500,
      validRecords: (parsedData.length || 500) - 28,
      errorCount: 18,
      warningCount: 10,
      status: 'Preflight Validated',
      version: 'v1.0',
      uploadedBy: 'Prof. K. Venkatesh',
    });

    toast.success('Batch registered! Opening Preflight Validation Results...');
    navigate('/institution/submissions/validation');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
          Data Upload & Mapping
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Upload institutional admission batches in CSV/Excel formats and configure canonical field mappings.
        </p>
      </div>

      {/* Stepper Wizard Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border-light)',
        borderRadius: '8px',
        padding: '14px 20px',
        marginBottom: '24px',
        fontSize: '13px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#155eef', fontWeight: 700 }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#155eef', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</span>
          <span>Upload File</span>
        </div>
        <span style={{ color: '#cbd5e1' }}>&gt;</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: file ? '#155eef' : '#94a3b8', fontWeight: file ? 700 : 500 }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: file ? '#155eef' : '#e2e8f0', color: file ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</span>
          <span>Column Mapping</span>
        </div>
        <span style={{ color: '#cbd5e1' }}>&gt;</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e2e8f0', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>3</span>
          <span>Preflight Validation</span>
        </div>
      </div>

      {/* Scope Settings */}
      <div className="gov-card" style={{ marginBottom: '24px' }}>
        <h3 className="gov-card-title" style={{ marginBottom: '14px' }}>
          <span>Submission Target Scope</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Programme / Branch *</label>
            <select
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
              className="form-control"
            >
              <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
              <option value="B.Tech Information Technology">B.Tech Information Technology</option>
              <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication</option>
              <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
            </select>
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Academic Intake Year *</label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="form-control"
            >
              <option value="2026-2027">2026–2027 (Current)</option>
              <option value="2025-2026">2025–2026 (Historical Resubmission)</option>
            </select>
          </div>
        </div>
      </div>

      {/* File Upload Zone */}
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            backgroundColor: '#ffffff',
            border: '2px dashed #93c5fd',
            borderRadius: '10px',
            padding: '48px 24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            marginBottom: '24px',
          }}
          onClick={() => document.getElementById('file-upload-input')?.click()}
        >
          <input
            id="file-upload-input"
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#eff6ff',
            color: '#155eef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
          }}>
            <UploadCloud size={30} />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46', marginBottom: '6px' }}>
            Drag and Drop your Admission Dataset here
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
            Supports CSV, XLSX, and XLS formats up to 15MB.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button type="button" className="btn btn-primary btn-sm">
              <span>Browse Files on Computer</span>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleDownloadSample(); }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Download size={13} color="#155eef" />
              <span>Download Sample CSV Template</span>
            </button>
          </div>
        </div>
      ) : (
        /* Parsed File Overview & Column Mapping */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* File Card Header */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border-light)',
            borderRadius: '8px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: '#eff6ff', color: '#155eef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileSpreadsheet size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#001e46', fontSize: '14px' }}>{file.name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {(file.size / 1024).toFixed(1)} KB • {parsedData.length} records parsed • {headers.length} columns detected
                </div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setParsedData([]); }}
              className="btn btn-secondary btn-sm"
            >
              Replace File
            </button>
          </div>

          {/* Column Mapping Table */}
          <div className="gov-card">
            <div className="gov-card-header">
              <div>
                <h3 className="gov-card-title">
                  <span>Column Header Mapping</span>
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Review and verify mapped fields. Confidence scores above 90% are automatically confirmed.
                </p>
              </div>
            </div>

            <div className="gov-table-container">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Source File Header</th>
                    <th>Sample Value (Row 1)</th>
                    <th>SATYA-APAAR Target Field</th>
                    <th>Match Confidence</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mapping.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: '#001e46' }}>{item.sourceColumn}</td>
                      <td style={{ color: '#64748b', fontSize: '12px', fontFamily: 'monospace' }}>
                        {item.sampleValue || '<empty>'}
                      </td>
                      <td>
                        <select
                          value={item.targetField}
                          onChange={(e) => handleMappingChange(idx, e.target.value)}
                          className="form-control"
                          style={{ padding: '4px 8px', fontSize: '12.5px' }}
                        >
                          <option value="">-- Ignore Column --</option>
                          {TARGET_FIELDS.map(f => (
                            <option key={f.key} value={f.key}>{f.label}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{
                            width: '60px',
                            height: '6px',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${item.confidence}%`,
                              height: '100%',
                              backgroundColor: item.confidence >= 90 ? '#16a34a' : item.confidence >= 70 ? '#f59e0b' : '#dc2626'
                            }} />
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#475467' }}>
                            {item.confidence}%
                          </span>
                        </div>
                      </td>
                      <td>
                        {item.targetField ? (
                          <span className="badge badge-success">Mapped</span>
                        ) : (
                          <span className="badge badge-neutral">Ignored</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => setFile(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToPreflight}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Proceed to Preflight Validation</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

