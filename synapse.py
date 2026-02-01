import datetime

class SynapseLocal:
    def __init__(self):
        self.log_file = "cerberus_incidents.log"

    def trigger_alert(self, file_path, score):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        alert_msg = f"[{timestamp}] CRITICAL: High Entropy ({score:.4f}) in {file_path}"
        
        print("\n" + "="*50)
        print("!!! CERBERUS MITIGATION PROTOCOL ACTIVATED !!!")
        print(alert_msg)
        print("ACTION: PROCESS_FLAGGED_FOR_GUILLOTINE")
        print("="*50 + "\n")

        with open(self.log_file, "a") as f:
            f.write(alert_msg + "\n")
