// src/components/OrderActions.tsx
import { FC } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

interface OrderActionsProps {
  onPlaceOrder: () => void;
  onClearForm: () => void;
  onCancel: () => void;
}

export const OrderActions: FC<OrderActionsProps> = ({ onPlaceOrder, onClearForm, onCancel }) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        onClick={onPlaceOrder}
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
      >
        Place Order
      </Button>

      <Button
        onClick={() => {
          onClearForm();
          toast.info("Form cleared!");
        }}
        size="lg"
        variant="outline"
        className="px-6 py-2"
      >
        Clear Form
      </Button>

      <Button
        onClick={onCancel}
        size="lg"
        variant="destructive"
        className="px-6 py-2"
      >
        Cancel / Exit
      </Button>
    </div>
  );
};
