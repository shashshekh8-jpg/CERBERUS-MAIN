import psutil
import os

class KernelGuillotine:
    def __init__(self):
        self.active = True

    def find_and_terminate(self, file_path):
        """
        Scans the system for any process currently holding a handle 
        on the high-entropy file and kills it.
        """
        print(f"[!] GUILLOTINE::Searching for process locking {file_path}...")
        
        target_pid = None
        process_name = "Unknown"
        
        # We iterate through all running processes
        for proc in psutil.process_iter(['pid', 'name', 'open_files']):
            try:
                # Check if this process has the suspicious file open
                # proc.info['open_files'] requires high-level privileges (Run as Admin/Sudo)
                files = proc.info.get('open_files')
                if files:
                    for o_file in files:
                        if os.path.abspath(file_path) == os.path.abspath(o_file.path):
                            target_pid = proc.info['pid']
                            process_name = proc.info['name']
                            break
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

        if target_pid:
            print(f"[!!!] GUILLOTINE::MALICIOUS_PROCESS_FOUND: {process_name} (PID: {target_pid})")
            try:
                p = psutil.Process(target_pid)
                # The 'Guillotine' drop: Terminating the attacker
                p.terminate() 
                print(f"[+] GUILLOTINE::PROCESS_TERMINATED. Threat neutralized.")
                return target_pid, process_name
            except Exception as e:
                print(f"[!] GUILLOTINE::EXECUTION_FAILED: {e}")
        else:
            print("[?] GUILLOTINE::No active handle found. Process may have detached.")
        return None, None
