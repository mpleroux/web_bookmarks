import TagList from "./TagList";

export default function FilterByTagModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <TagList />

      <button type="button" onClick={onClose}>
        Close
      </button>
    </>
  );
}
