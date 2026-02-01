import os
import math
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from synapse import SynapseLocal

# Shannon Entropy Threshold for Encryption Detection
THRESHOLD = 7.5

class EntropyHandler(FileSystemEventHandler):
    def __init__(self):
        self.synapse = SynapseLocal()

    def on_modified(self, event):
        if not event.is_directory:
            self.analyze_file(event.src_path)

    def analyze_file(self, file_path):
        try:
            with open(file_path, 'rb') as f:
                data = f.read()
                if not data:
                    return

                entropy = self.calculate_shannon_entropy(data)
                
                if entropy > THRESHOLD:
                    print(f"\n[!] ANOMALY DETECTED: {file_path}")
                    print(f"[!] SHANNON SCORE: {entropy:.4f}")
                    self.synapse.trigger_alert(file_path, entropy)
                else:
                    print(f"[*] Scanning {os.path.basename(file_path)}: {entropy:.2f} bits/byte", end='\r')
        except Exception:
            pass

    def calculate_shannon_entropy(self, data):
        """
        Calculates Shannon Entropy: H(X) = -sum(P(xi) * log2(P(xi)))
        """
        if not data:
            return 0
        entropy = 0
        for x in range(256):
            p_x = float(data.count(x)) / len(data)
            if p_x > 0:
                entropy += - p_x * math.log(p_x, 2)
        return entropy

if __name__ == "__main__":
    path = "./vault"
    event_handler = EntropyHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=False)
    print("--- CERBERUS CORE ENGINE v1.0 ---")
    print("Status: KERNEL_WATCH_ACTIVE")
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
