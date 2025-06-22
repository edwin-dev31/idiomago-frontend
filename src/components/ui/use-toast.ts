import { useState, useEffect } from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  dismiss: () => void;
  [key: string]: any; // por si quieres extenderlo
};

type ToastInput = Omit<Partial<Toast>, "id" | "dismiss">;

let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

export function useToast() {
  const [state, setState] = useState<{ toasts: Toast[] }>({ toasts: [] });

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    state.toasts.forEach((toast) => {
      if (toast.duration === Infinity) return;

      const timeout = setTimeout(() => {
        toast.dismiss();
      }, toast.duration || 5000);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [state.toasts]);

  function toast(props: ToastInput) {
    const id = generateId();

    const update = (updateProps: Partial<Toast>) =>
      setState((state) => ({
        ...state,
        toasts: state.toasts.map((t) => (t.id === id ? { ...t, ...updateProps } : t)),
      }));

    const dismiss = () =>
      setState((state) => ({
        ...state,
        toasts: state.toasts.filter((t) => t.id !== id),
      }));

    setState((state) => ({
      ...state,
      toasts: [{ ...props, id, dismiss }, ...state.toasts].slice(0, TOAST_LIMIT),
    }));

    return { id, dismiss, update };
  }

  return {
    toast,
    toasts: state.toasts,
  };
}
