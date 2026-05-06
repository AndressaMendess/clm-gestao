import { X } from "lucide-react";

import { cn } from "@/src/lib/utils";
import {
  modalContainerBodyStyles,
  modalContainerCloseStyles,
  modalContainerCopyStyles,
  modalContainerFooterStyles,
  modalContainerHeaderStyles,
  modalContainerOverlayStyles,
  modalContainerStyles
} from "./modal-container.styles";
import type { ModalContainerProps } from "./modal-container.types";

export type { ModalContainerProps } from "./modal-container.types";

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
    <div className={cn(modalContainerOverlayStyles(), overlayClassName)} role="presentation" onClick={onClose}>
      <div
        className={cn(modalContainerStyles(), className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={cn(modalContainerHeaderStyles(), headerClassName)}>
          <div className={cn(modalContainerCopyStyles(), copyClassName)}>
            <h2 id={titleId}>{title}</h2>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>

          <button className={cn(modalContainerCloseStyles(), closeButtonClassName)} type="button" aria-label={closeLabel} onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>

        <div className={cn(modalContainerBodyStyles(), bodyClassName)}>{children}</div>

        {footer ? <footer className={cn(modalContainerFooterStyles(), footerClassName)}>{footer}</footer> : null}
      </div>
    </div>
  );
}
