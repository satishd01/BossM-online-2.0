import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Modal({
  isOpen,
  closeForm,
  modalTitle,
  ModalDescription,
  children,
  onSubmit,
  className = "",
}: // className = "lg:w-[99vw] lg:max-w-[90vw] xl:max-w-[60vw] lg:max-h-[90vh] overflow-auto !top-[28%]  xl:top-[calc(100%_-_45vh)] z-[9999] ",
{
  isOpen: boolean;
  closeForm: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle?: string;
  ModalDescription?: string;
  children: React.ReactNode;
  className?: string;
  onSubmit?: any;
}) {
  return (
    isOpen && (
      <Dialog defaultOpen={true} onOpenChange={closeForm}>
        <DialogContent className={className}>
          <DialogHeader className="text-primary text-[24px] font-semibold mb-4 border-b border-slate-300">
            <DialogTitle className="text-primary text-[18px] font-semibold  border-slate-300">
              {modalTitle || ""}
            </DialogTitle>
            <DialogDescription>{ModalDescription || ""}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
        {onSubmit && (
          <DialogFooter>
            <Button type="submit" onSubmit={onSubmit}>
              Confirm
            </Button>
          </DialogFooter>
        )}
      </Dialog>
    )
  );
}
