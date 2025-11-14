import "../Styles/PolicyModal.css";

const PolicyModal = ({ content, onClose }) => {
  return (
    <div className="policy-modal-overlay" onClick={onClose}>
      <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
        <button className="policy-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="policy-modal-title">{content.title}</h2>
        <div
          className="policy-modal-text"
          dangerouslySetInnerHTML={{
            __html: content.text.replace(/\n/g, "<br/>"),
          }}
        />
      </div>
    </div>
  );
};

export default PolicyModal;
