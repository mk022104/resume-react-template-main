import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { portfolioData as defaultPortfolioData } from '../data/portfolioData';

const PortfolioContext = createContext(defaultPortfolioData);

const deepMerge = (base, override) => {
  if (!override || typeof override !== 'object' || Array.isArray(override)) return override;
  return Object.keys(override).reduce((result, key) => {
    const baseValue = base?.[key];
    const overrideValue = override[key];
    result[key] = baseValue && typeof baseValue === 'object' && !Array.isArray(baseValue)
      ? deepMerge(baseValue, overrideValue)
      : overrideValue;
    return result;
  }, { ...base });
};

export const PortfolioProvider = ({ children, dataUrl }) => {
  const [data, setData] = useState(defaultPortfolioData);

  useEffect(() => {
    if (!dataUrl) return undefined;

    const controller = new AbortController();
    fetch(dataUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load portfolio data (${response.status})`);
        return response.json();
      })
      .then((remoteData) => setData((current) => deepMerge(current, remoteData)))
      .catch((error) => {
        if (error.name !== 'AbortError') console.error(error);
      });

    return () => controller.abort();
  }, [dataUrl]);

  const value = useMemo(() => ({ ...data, updateData: setData }), [data]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolioData = () => useContext(PortfolioContext);
