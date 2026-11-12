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
          appId: 'ast_web_756083',
          serverUrl: 'https://secureshield-api.testuat.com/api/v1/telemetry/ingest',
          headerKey: 'enc:v1:57519259612c75991a426920:999c7351fa0291f8b999a209dd80b028:32f3f1f1227f33b29f688c705096d8e996df',
          encryptionKey: '/Oam5OybfrXH7cM0jgDrHXTXtqeXp5xI8Vvb3ODo/bw=',
          initializationKey: 'init_sec_80f6a18c19249bff6a15e2eeb6b61d82d2eb73a3b5d9cdb7',
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

