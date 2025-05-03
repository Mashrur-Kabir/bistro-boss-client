import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { HeadProvider } from "react-head";
import { router } from './Routes/Routes';
import AuthProvider from './Providers/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HeadProvider>
          <RouterProvider router={router} />
        </HeadProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)

