import requests, binascii, os, time, sys, threading

LAST_ALERT = 0
LOCK = threading.Lock()

def report_to_hive(path, score, chunk):
    global LAST_ALERT
    
    # Thread-Safe Rate Limiting
    with LOCK:
        if time.time() - LAST_ALERT < 0.5: return
        LAST_ALERT = time.time()

    url = "https://project-cerberus.vercel.app/api/incident"
    try:
        hex_data = binascii.hexlify(chunk[:64]).decode('utf-8')
    except:
        hex_data = "0000"

    payload = {
        "machineId": "SENTINEL-NODE-01",
        "fileName": os.path.basename(path),
        "entropyScore": score,
        "hexDump": hex_data,
        "status": "ENFORCE",
        "timestamp": int(time.time() * 1000)
    }
    
    secret = os.getenv("CERBERUS_SECRET")
    headers = {"x-agent-secret": secret} if secret else {}
    
    try:
        requests.post(url, json=payload, headers=headers, timeout=5)
    except Exception as e:
        print(f"Synapse Network Error: {e}")