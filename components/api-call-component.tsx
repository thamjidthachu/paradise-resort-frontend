// components/api-call-component.tsx
import useApiResponseHandler from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast'

const ApiCallComponent = () => {
  const { handleApiResponse } = useApiResponseHandler();
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/endpoint');
      const data = await response.json();
      handleApiResponse(data);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while making the API call.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Make API Call</button>
    </div>
  );
};

export default ApiCallComponent;
