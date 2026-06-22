import { AlertTriangle, X } from "lucide-react";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glassmorphic" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>
        
        <div className="modal-content">
          <div className="modal-icon-wrapper">
            <AlertTriangle size={24} className="warning-icon" />
          </div>
          
          <h2 className="modal-title">Delete Resume?</h2>
          <p className="modal-message">
            Are you sure you want to delete this resume? This action cannot be undone.
          </p>
          
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="modal-btn delete" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
