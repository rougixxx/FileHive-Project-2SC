import Modal from "./modal";
import Button from "../button/button";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading:boolean
}
const ConfirmationModel = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title
}: UploadModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <div className="flex flex-col gap-4 justify-center items-center pt-4">
          <h2>{title}</h2>
          <div className="flex gap-4 items-center w-full pt-6">
            <button
              onClick={() => {
                onClose();
              }}
              className="h-[45px] w-[50%] text-sm text-blackText border-[2px] rounded-[5px] border-blackText px-6 py-2 hover:bg-blackText hover:text-white transition-all duration-500"
            >
              Cancel
            </button>
            <Button
              onClick={() => {
                onConfirm();
              }}
              className="w-[50%]"
              loading={isLoading}
              text="Yes"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationModel;
