import time
from watchdog.events import FileSystemEventHandler

class SentinelHandler(FileSystemEventHandler):
    def __init__(self, callback):
        self.callback = callback
        self.last_processed = {}
        self.DEBOUNCE_DELAY = 1.0 
        self.CLEANUP_INTERVAL = 60
        self.last_cleanup = time.time()

    def _cleanup_memory(self):
        """CRITICAL FIX: Remove stale entries to prevent memory leak."""
        now = time.time()
        if now - self.last_cleanup > self.CLEANUP_INTERVAL:
            cutoff = now - 300 
            self.last_processed = {k: v for k, v in self.last_processed.items() if v > cutoff}
            self.last_cleanup = now

    def _process_event(self, path):
        self._cleanup_memory()
        now = time.time()
        last = self.last_processed.get(path, 0)
        
        if now - last < self.DEBOUNCE_DELAY:
            return
        self.last_processed[path] = now
        self._safe_read(path)

    def on_modified(self, event):
        if not event.is_directory: self._process_event(event.src_path)
    def on_created(self, event):
        if not event.is_directory: self._process_event(event.src_path)
    def on_moved(self, event):
        if not event.is_directory: self._process_event(event.dest_path)

    def _safe_read(self, path):
        retries = 3
        while retries > 0:
            try:
                # We intentionally Read-Binary.
                with open(path, 'rb') as f:
                    chunk = f.read(4096)
                    self.callback(path, chunk)
                return
            except (OSError, PermissionError):
                time.sleep(0.05)
                retries -= 1