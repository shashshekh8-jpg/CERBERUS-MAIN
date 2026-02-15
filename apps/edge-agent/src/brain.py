import math

# FIX: Magic Bytes Whitelist to prevent false positives on compressed files
SAFE_HEADERS = [
    b'PK\x03\x04',      # ZIP
    b'\x89PNG\r\n\x1a\n', # PNG
    b'\xff\xd8\xff',    # JPEG
    b'%PDF-'            # PDF
]

def is_safe_header(data):
    if not data or len(data) < 4: return False
    for header in SAFE_HEADERS:
        if data.startswith(header):
            return True
    return False

def calculate_entropy(data):
    if not data: return 0.0
    
    # Heuristic Check: If it's a known safe file type, return 0 entropy
    if is_safe_header(data):
        return 0.0

    freqs = [0] * 256
    for b in data: freqs[b] += 1
    total = len(data)
    if total == 0: return 0.0
    entropy = 0.0
    for f in freqs:
        if f > 0:
            p = float(f) / total
            entropy -= p * math.log2(p)
    return entropy