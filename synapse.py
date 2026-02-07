import requests
import json
import time
import os

class CerberusSynapse:
    def __init__(self):
        self.api_url = "https://cerberus-rust.vercel.app/api/incident"
        self.secret = "CERBERUS_LOCAL_AGENT_SECRET_2026"

    def emit_alert(self, file_path, entropy, hex_dump, mitigated=False):
        payload = {
            "machineId": "EDGE_NODE_BOM1",
            "fileName": os.path.basename(file_path),
            "entropyScore": entropy,
            "hexDump": hex_dump,
            "status": "MITIGATED" if mitigated else "DETECTED",
            "timestamp": int(time.time() * 1000)
        }
        
        headers = {
            "Content-Type": "application/json",
            "x-agent-secret": self.secret
        }

        try:
            requests.post(self.api_url, json=payload, headers=headers)
            print("[+] Uplink: Mitigation data synced to Cloud.")
        except Exception:
            pass
