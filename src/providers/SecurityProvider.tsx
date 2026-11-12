import React, { createContext, useContext, useEffect, useState } from 'react';
import { SecureShield, type SecurityAuditReport } from '@secureshield/web';

interface SecurityContextType {
  isShieldActive: boolean;
  trustScore: number;
  report: SecurityAuditReport | null;
  shield: any;
}

const SecurityContext = createContext<SecurityContextType>({
  isShieldActive: false,
  trustScore: 100,
  report: null,
  shield: null
});

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [trustScore, setTrustScore] = useState(100);
  const [report, setReport] = useState<SecurityAuditReport | null>(null);
  const [shield, setShield] = useState<any>(null);

  useEffect(() => {
    async function boot() {
      try {
        const instance = await SecureShield.init({
          tenantId: 'TEN-KOTAKBANK-6241',
          appId: 'ast_web_473606',
          serverUrl: 'https://secureshield-api.testuat.com/api/v1/telemetry/ingest', // or 'https://secureshield.testuat.com'
          headerKey: 'enc:v1:57519259612c75991a426920:999c7351fa0291f8b999a209dd80b028:32f3f1f1227f33b29f688c705096d8e996df',
          encryptionKey: '/Oam5OybfrXH7cM0jgDrHXTXtqeXp5xI8Vvb3ODo/bw=',
          initializationKey: 'init_sec_604090d3ddead3e4d7ea99d0143a837826f21da56d39a3d7',
          environment: 'production',
          enableRuntimeIntegrityWatchdog: true
        });


        setShield(instance);
        const evalReport = await instance.evaluateSecurityState();
        setReport(evalReport);
        setTrustScore(evalReport.trustScore ?? 100);
        setIsShieldActive(true);
      } catch (err) {
        console.error('[SecureShield] Boot failure:', err);
      }
    }
    boot();
  }, []);

  return (
    <SecurityContext.Provider value={{ isShieldActive, trustScore, report, shield }}>
      {children}
    </SecurityContext.Provider>
  );
}

export const useSecurity = () => useContext(SecurityContext);

