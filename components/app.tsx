// components/app.tsx
import { ToastProvider, ToastViewport} from "@/components/ui/toast"
import ApiCallComponent from '@/components/api-call-component';

const App = () => {
  return (
    <ToastProvider>
      <ToastViewport />
      <ApiCallComponent />
    </ToastProvider>
  );
};