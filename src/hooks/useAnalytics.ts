// src/hooks/useAnalytics.ts
export const useAnalytics = () => {
  const trackSearch = (query: string, responseTime: number) => {
    // Track popular queries, response times, etc.
    console.log(`Search: ${query}, Response Time: ${responseTime}ms`);
  };

  return { trackSearch };
};
