import { Edit3, Copy, Trash2, Download, Calendar, Layout } from "lucide-react";

function ResumeCard({ id, name, lastUpdated, template, onEdit, onDuplicate, onDelete, onDownload }) {
  return (
    <div className="dashboard-resume-card">
      {/* Thumbnail Preview Area */}
      <div className="card-thumbnail-area" onClick={() => onEdit(id)}>
        <div className="thumbnail-mock-sheet">
          <div className="mock-sheet-header">
            <div className="mock-sheet-dot"></div>
            <div className="mock-sheet-line"></div>
          </div>
          <div className="mock-sheet-body">
            <div className="mock-sheet-row">
              <div className="mock-sheet-col-left"></div>
              <div className="mock-sheet-col-right"></div>
            </div>
          </div>
        </div>
        <div className="thumbnail-overlay">
          <button className="thumbnail-edit-btn">
            <Edit3 size={16} />
            <span>Edit Resume</span>
          </button>
        </div>
      </div>

      {/* Info & Metadata */}
      <div className="card-info-area">
        <h3 className="resume-card-name" onClick={() => onEdit(id)}>{name}</h3>
        
        <div className="resume-card-metadata">
          <span className="metadata-item">
            <Calendar size={12} />
            <span>Updated: {lastUpdated}</span>
          </span>
          <span className="metadata-item">
            <Layout size={12} />
            <span>Template: {template}</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="resume-card-actions">
          <button className="action-icon-btn edit" onClick={() => onEdit(id)} title="Edit Resume">
            <Edit3 size={15} />
            <span>Edit</span>
          </button>
          <button className="action-icon-btn duplicate" onClick={() => onDuplicate(id)} title="Duplicate Resume">
            <Copy size={15} />
          </button>
          <button className="action-icon-btn download" onClick={() => onDownload(id)} title="Download PDF">
            <Download size={15} />
          </button>
          <button className="action-icon-btn delete" onClick={() => onDelete(id)} title="Delete Resume">
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeCard;
