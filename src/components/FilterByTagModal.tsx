import TagList from "./TagList";
import Modal from "./Modal";

export default function FilterByTagModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <TagList />

      <button type="button" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
}
