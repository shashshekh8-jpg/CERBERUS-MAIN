import time, os, psutil, sys, threading, argparse
from watchdog.observers import Observer
from monitor import SentinelHandler
from brain import calculate_entropy
from synapse import report_to_hive

# Expanded Whitelist for Safety
WHITELIST = {'explorer.exe', 'svchost.exe', 'system', 'registry', 'winlogon.exe', 'csrss.exe', 'services.exe', 'lsass.exe'}

def is_admin():
    try:
        return os.getuid() == 0
    except AttributeError:
        import ctypes
        return ctypes.windll.shell32.IsUserAnAdmin() != 0

def kill_process_locking_file(path):
    """
    CRITICAL FIX: Runs in a separate thread. Includes Suicide Prevention.
    """
    target_path = os.path.normcase(os.path.abspath(path))
    my_pid = os.getpid()

    try:
        for proc in psutil.process_iter(['pid', 'name', 'open_files']):
            try:
                # 1. SUICIDE PREVENTION
                if proc.info['pid'] == my_pid: continue 

                # 2. Whitelist Check
                if proc.info['name'].lower() in WHITELIST: continue
                
                # 3. Handle Enumeration
                files = proc.info['open_files']
                if not files: continue

                for f in files:
                    if os.path.normcase(f.path) == target_path:
                        print(f"!!!GUILLOTINE: Killing {proc.info['name']} (PID: {proc.info['pid']})")
                        proc.kill()
                        return

            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                continue
    except Exception as e:
        print(f"Kill Thread Error: {e}")

def analyze(path, chunk, mode):
    score = calculate_entropy(chunk)
    
    if score > 7.8:
        print(f"!!! ENTROPY SPIKE: {score:.4f} | {path}")
        
        # 1. ACTIVE DEFENSE (Threaded to prevent blocking detection)
        if mode == 'ENFORCE':
            k_thread = threading.Thread(target=kill_process_locking_file, args=(path,))
            k_thread.start()
    
        else:
            print("!!! AUDIT MODE: Action Logged.")
        
        # 2. REPORTING (Threaded to prevent network lag)
        t = threading.Thread(target=report_to_hive, args=(path, score, chunk), daemon=True)
        t.start()

if __name__ == "__main__":
    # CRITICAL FIX: Runtime Argument Parsing
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', choices=['AUDIT', 'ENFORCE'], default='ENFORCE')
    parser.add_argument('--dir', default='./Documents')
    args = parser.parse_args()

    if not is_admin() and args.mode == 'ENFORCE':
        print("WARNING: Run as Admin for Active Defense to work.")
    
    if not os.path.exists(args.dir): os.makedirs(args.dir)

    observer = Observer()
    # Pass args to handler lambda
    handler = SentinelHandler(lambda p, c: analyze(p, c, args.mode))
    observer.schedule(handler, args.dir, recursive=True)
    observer.start()

    print(f"CERBERUS SENTINEL ONLINE [{args.mode}]")
    print(f"WATCHING: {os.path.abspath(args.dir)}")

    try:
        while True: 
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()