import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { StudentRecord } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { 
  Search, Filter, Download, Eye, Clock, X, 
  User, CheckCircle2, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [programmeFilter, setProgrammeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const students = StorageService.getStudents();

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.studentRef.toLowerCase().includes(search.toLowerCase()) ||
      s.maskedApaar.toLowerCase().includes(search.toLowerCase());

    const matchesProg = programmeFilter === 'ALL' || s.programme.includes(programmeFilter);
    const matchesStatus = statusFilter === 'ALL' || s.identityStatus === statusFilter;

    return matchesSearch && matchesProg && matchesStatus;
  });

  const handleExportCSV = () => {
    let csv = 'StudentRef,FullName,MaskedAPAAR,Programme,Category,AdmissionDate,IdentityStatus,EnrolmentStatus\n';
    filteredStudents.forEach(s => {
      csv += `${s.studentRef},"${s.fullName}",${s.maskedApaar},"${s.programme}",${s.category},${s.admissionDate},${s.identityStatus},${s.enrolmentStatus}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'satya_apaar_students_export.csv';
    a.click();
    toast.success('Exported student records CSV');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#001e46' }}>
            Student Records & Academic Search
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            Verified student registry with privacy-preserving masked APAAR identifiers and TEIE timeline tracking.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={14} color="#155eef" />
          <span>Export Student Registry (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="gov-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Search Student</label>
            <div style={{ position: 'relative' }}>
              <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
              <input
                type="text"
                placeholder="Name, APAAR ID, or Enrolment ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '32px', fontSize: '12.5px' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Programme</label>
            <select
              value={programmeFilter}
              onChange={(e) => setProgrammeFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="ALL">All Programmes</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '12px' }}>Identity Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
              style={{ fontSize: '12.5px' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Flagged">Flagged</option>
              <option value="Exception">Exception</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Student Registry Table */}
      <div className="gov-card">
        <div className="gov-card-header">
          <h3 className="gov-card-title">
            <span>Enrolled Students Registry ({filteredStudents.length} records)</span>
          </h3>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>
            All APAAR identifiers pseudonymized & masked for student data privacy
          </span>
        </div>

        <div className="gov-table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Enrolment Ref</th>
                <th>Candidate Full Name</th>
                <th>Masked APAAR ID</th>
                <th>Sanctioned Programme</th>
                <th>Category</th>
                <th>Admission Date</th>
                <th>Identity Status</th>
                <th>Enrolment</th>
                <th style={{ width: '130px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td style={{ fontWeight: 600, color: '#001e46', fontFamily: 'monospace' }}>
                    {student.studentRef}
                  </td>
                  <td style={{ fontWeight: 600 }}>{student.fullName}</td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontSize: '12px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                      {student.maskedApaar}
                    </span>
                  </td>
                  <td style={{ fontSize: '12.5px' }}>{student.programme}</td>
                  <td><span className="badge badge-neutral">{student.category}</span></td>
                  <td style={{ fontSize: '12px' }}>{student.admissionDate}</td>
                  <td>
                    <StatusBadge status={student.identityStatus} />
                  </td>
                  <td>
                    <StatusBadge status={student.enrolmentStatus} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="btn btn-secondary btn-sm"
                        title="View Full Profile Drawer"
                      >
                        <Eye size={13} color="#155eef" />
                      </button>
                      <Link
                        to={`/institution/students/${student.id}/timeline`}
                        className="btn btn-secondary btn-sm"
                        title="View TEIE Enrolment Timeline"
                      >
                        <Clock size={13} color="#f59e0b" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Drawer */}
      {selectedStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '440px',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid #cbd5e1',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46' }}>Student Profile Docket</h3>
            <button onClick={() => setSelectedStudent(null)} style={{ cursor: 'pointer', color: '#64748b' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#eff6ff', color: '#155eef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={26} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#001e46' }}>{selectedStudent.fullName}</h4>
                <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>{selectedStudent.studentRef}</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Masked APAAR:</strong> <span style={{ fontFamily: 'monospace' }}>{selectedStudent.maskedApaar}</span></div>
              <div><strong>Date of Birth:</strong> {selectedStudent.dob} ({selectedStudent.gender})</div>
              <div><strong>Programme:</strong> {selectedStudent.programme}</div>
              <div><strong>Academic Year:</strong> {selectedStudent.academicYear}</div>
              <div><strong>Admission Category:</strong> {selectedStudent.category}</div>
              <div><strong>Institution:</strong> {selectedStudent.institutionName}</div>
              <div><strong>Identity Status:</strong> <StatusBadge status={selectedStudent.identityStatus} /></div>
              <div><strong>Enrolment Status:</strong> <StatusBadge status={selectedStudent.enrolmentStatus} /></div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to={`/institution/students/${selectedStudent.id}/timeline`}
                className="btn btn-primary"
                style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Clock size={15} />
                <span>Open TEIE Enrolment Timeline</span>
              </Link>
              <button
                onClick={() => setSelectedStudent(null)}
                className="btn btn-secondary"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

