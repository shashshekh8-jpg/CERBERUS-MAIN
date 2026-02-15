import os, time
print("INITIATING RANSOMWARE SIMULATION...")
target = "./Documents/vault.db"

# Sleep allows Sentinel to detect lock before we close file
with open(target, "wb") as f:
    f.write(os.urandom(4096))
    time.sleep(2) 

print(f"ENCRYPTED: {target}")