import { MouseEvent, useEffect } from 'react';
import CardForm from './CardForm';
import { useUIStore } from '../../stores/useUIStore';

export const CreateModal = () => {
  const closeCreateModal = useUIStore((state) => state.closeCreateModal);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCreateModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeCreateModal]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeCreateModal();
    }
  };

  return (
    <div className="modal-overlay" role="presentation" onClick={handleOverlayClick}>
      <div className="glass-panel modal-panel" role="dialog" aria-modal="true" aria-label="Create a new vocabulary card">
        <div className="modal-header">
          <h2 className="modal-title">Add a new word</h2>
          <button className="icon-button" type="button" onClick={closeCreateModal} aria-label="Close create card form">
            ✕
          </button>
        </div>
        <CardForm
          className="card-form"
          title={null}
          submitLabel="Save word"
          onComplete={closeCreateModal}
          showSuccessMessage={false}
          autoFocus
        />
      </div>
    </div>
  );
};

export default CreateModal;
