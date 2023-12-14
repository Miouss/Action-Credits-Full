import { useState, useEffect } from "react";
import { RequestFactory } from "../api/requests";

export function useRefreshInterval() {
  const [refreshInterval, setRefreshInterval] = useState({
    execution: 0,
    credits: 0,
  });

  useEffect(() => {
    async function fetchRefreshInterval() {
      const response = await RequestFactory().config.get();
      const data = await response.json();

      setRefreshInterval(data);
    }

    fetchRefreshInterval();
  }, []);

  return refreshInterval;
}
