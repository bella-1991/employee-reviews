import React, { createContext, useState, useContext, useEffect } from 'react';
import styles from './toast.module.scss'

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ setToast }}>
      {children}
      {toast && (
        <div className={styles.toast}>
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);