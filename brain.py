import os
import math
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from synapse import CerberusSynapse
from guillotine import KernelGuillotine

THRESHOLD = 7.8

class CerberusProtector(FileSystemEventHandler):
    def __init__(self):
        self.synapse = CerberusSynapse()
        self.guillotine = KernelGuillotine()
        print("[*] Cerberus v2.5 Active Defense Initialized.")

    def calculate_entropy(self, data):
        if not data: return 0
        entropy = 0
        for x in range(256):
            p_x = float(data.count(x)) / len(data)
            if p_x > 0:
                entropy += - p_x * math.log(p_x, 2)
        return entropy

    def on_modified(self, event):
        if event.is_directory: return
        
        try:
            with open(event.src_path, 'rb') as f:
                data = f.read()
                entropy = self.calculate_entropy(data)
                
                if entropy > THRESHOLD:
                    print(f"\n[!] ALERT: CRITICAL_ENTROPY_ANOMALY [{entropy:.4f}]")
                    
                    # 1. TRIGGER LOCAL MITIGATION (The Kill)
                    pid, proc_name = self.guillotine.find_and_terminate(event.src_path)
                    
                    # 2. DISPATCH FORENSICS TO CLOUD
                    self.synapse.emit_alert(
                        file_path=event.src_path,
                        entropy=entropy,
                        hex_dump=data[:64].hex(),
                        mitigated=True if pid else False
                    )
        except Exception:
            pass

if __name__ == "__main__":
    path = "./vault"
    event_handler = CerberusProtector()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=False)
    
    print("--- CERBERUS v2.5: KERNEL_GUILLOTINE_ACTIVE ---")
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
