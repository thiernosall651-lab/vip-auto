import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type AppointmentPrefill = {
  service?: string;
  brand?: string;
  model?: string;
};

type AppointmentContextValue = {
  isOpen: boolean;
  prefill: AppointmentPrefill;
  openAppointment: (prefill?: AppointmentPrefill) => void;
  closeAppointment: () => void;
};

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

export function AppointmentProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<AppointmentPrefill>({});

  const openAppointment = useCallback((next?: AppointmentPrefill) => {
    setPrefill(next ?? {});
    setIsOpen(true);
  }, []);

  const closeAppointment = useCallback(() => setIsOpen(false), []);

  const value = useMemo<AppointmentContextValue>(
    () => ({ isOpen, prefill, openAppointment, closeAppointment }),
    [closeAppointment, isOpen, openAppointment, prefill],
  );

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export function useAppointment(): AppointmentContextValue {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used inside AppointmentProvider");
  }
  return context;
}
