import type { ReactNode } from "react";

export type ModalContainerProps = {
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

