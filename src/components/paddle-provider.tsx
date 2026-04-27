'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';

const PaddleContext = createContext<Paddle | undefined>(undefined);

export function PaddleProvider({ children }: { children: React.ReactNode }) {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      try {
        const paddleInstance = await initializePaddle({
          environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as 'sandbox' | 'production') || 'sandbox',
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_token',
        });
        setPaddle(paddleInstance);
      } catch (err) {
        console.error('Failed to initialize Paddle:', err);
      }
    };
    init();
  }, []);

  return <PaddleContext.Provider value={paddle}>{children}</PaddleContext.Provider>;
}

export function usePaddle() {
  return useContext(PaddleContext);
}
