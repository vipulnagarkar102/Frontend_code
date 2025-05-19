import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook to refresh the router on component mount.
 */
const useRefreshRouterEffect = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);
};

export default useRefreshRouterEffect;
