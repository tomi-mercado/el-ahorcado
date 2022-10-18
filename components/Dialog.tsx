import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  Stack,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface DialogButton extends ButtonProps {
  label: string;
  isLeastDestructive?: boolean;
}

interface DialogProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  buttons?: DialogButton[];
}

const validateButtons = (buttons: DialogButton[] | undefined) => {
  const hasButtons = !!buttons?.length;

  if (hasButtons) {
    const leastDestructiveButtons = buttons.filter(
      (button) => button.isLeastDestructive
    );

    if (leastDestructiveButtons?.length !== 1) {
      throw new Error(
        "Dialog should have exactly one button with isLeastDestructive prop"
      );
    }
  }
};

const Dialog: React.FC<DialogProps> = ({
  title,
  description,
  isOpen,
  onClose,
  buttons,
}) => {
  const cancelRef = useRef(null);

  validateButtons(buttons);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size="xl"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {title && (
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
          )}

          {description && <AlertDialogBody>{description}</AlertDialogBody>}

          {buttons && (
            <AlertDialogFooter>
              <Stack direction="row" spacing={4} alignItems="center">
                {buttons.map((button) => (
                  <Button
                    key={button.label}
                    ref={button.isLeastDestructive ? cancelRef : undefined}
                    onClick={button.onClick}
                    {...button}
                  >
                    {button.label}
                  </Button>
                ))}
              </Stack>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Dialog;
