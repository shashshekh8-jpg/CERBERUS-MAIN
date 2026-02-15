#!/bin/bash
# Note: On Windows, use `pyinstaller --onefile --hidden-import=psutil src/main.py`
pip install watchdog requests pyinstaller psutil
pyinstaller --onefile --name cerberus_sentinel src/main.py
echo "BINARY READY: ./dist/cerberus_sentinel"