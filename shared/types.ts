export interface IncidentPayload {
  machineId: string;
  fileName: string;
  entropyScore: number;
  hexDump: string; 
  timestamp: number;
  status: 'AUDIT' | 'ENFORCE';
}