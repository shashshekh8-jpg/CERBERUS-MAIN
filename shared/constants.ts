export const ENTROPY_THRESHOLD = 7.8;
// The "Red Line" (AES-256 Signature)
export const SAMPLE_SIZE = 4096;
// 4KB Sample for O(1) speed

export const CHANNELS = {
  CRITICAL: 'critical-alert',         
  EVENT: 'threat-detected'
};

export const COLORS = {
  VOID: '#050505',      
  VITALITY: '#00FF41',  
  INFECTION: '#FF003C', 
  SHOCKWAVE: '#FFFFFF'  // Added for the "Vaccine" animation
};