import { X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/src/lib/utils";

type ModalContainerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  titleId: string;
  children: ReactNode;
  footer?: ReactNode;
  overlayClassName?: string;
  className?: string;
  headerClassName?: string;
  copyClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  closeButtonClassName?: string;
  closeLabel?: string;
};

export function ModalContainer({
  isOpen,
  onClose,
  title,
  subtitle,
  titleId,
  children,
  footer,
  overlayClassName,
  className,
  headerClassName,
  copyClassName,
  bodyClassName,
  footerClassName,
  closeButtonClassName,
  closeLabel = "Fechar modal"
}: ModalContainerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn("modal-container-overlay", overlayClassName)} role="presentation" onClick={onClose}>
      <div
        className={cn("modal-container", className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={cn("modal-container__header", headerClassName)}>
          <div className={cn("modal-container__copy", copyClassName)}>
            <h2 id={titleId}>{title}</h2>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>

          <button className={cn("modal-container__close", closeButtonClassName)} type="button" aria-label={closeLabel} onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>

        <div className={cn("modal-container__body", bodyClassName)}>{children}</div>

        {footer ? <footer className={cn("modal-container__footer", footerClassName)}>{footer}</footer> : null}
      </div>
    </div>
  );
}
