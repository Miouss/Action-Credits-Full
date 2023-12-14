import { useEffect, useState } from "react";
import { QUOTA_REFRESH_ALERT_FADE_OUT_DELAY } from "../config";

export function useQuotaRefreshAlert(id: string) {
  const [hasRefreshedCredits, setHasRefreshedCredits] = useState<boolean>();

  useEffect(() => {
    if (!id) return;
    setHasRefreshedCredits(true);
    setTimeout(() => {
      setHasRefreshedCredits(false);
    }, QUOTA_REFRESH_ALERT_FADE_OUT_DELAY);
  }, [id]);

  return hasRefreshedCredits;
}
