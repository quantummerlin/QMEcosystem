#!/usr/bin/env python3
"""
Batch translate all remaining English reading files to Spanish.
Processes them sequentially, skipping already-translated ones.
"""
import os, sys, time

# Add ESP dir to path so we can import translate_v4
esp_dir = r'c:\Users\WIPED\QMEcosystem\amomentintime\esp'
sys.path.insert(0, esp_dir)
os.chdir(esp_dir)

from translate_v4 import process_file, get_translator, file_is_spanish, START, TOTAL_CALLS

START[0] = time.time()
parent_dir = os.path.dirname(esp_dir)

# Remaining files that need translation (sorted by size)
remaining_files = [
    'deep-numerology-readings.js',
    'deep-transformative-planet-readings.js',
    'house-readings.js',
    'readings.js',
    'readings-extended.js',
    'calculations.js',
]

print(f"Files to translate: {len(remaining_files)}", flush=True)
print(f"Source: {parent_dir}", flush=True)
print(f"Output: {esp_dir}", flush=True)
print(flush=True)

# Test API
print("Testing API...", flush=True)
try:
    test = get_translator().translate("Hello world")
    print(f"  OK: '{test}'", flush=True)
except Exception as e:
    print(f"  FAILED: {e}", flush=True)
    sys.exit(1)

done = []
total_strings = 0

for i, fname in enumerate(remaining_files, 1):
    src = os.path.join(parent_dir, fname)
    tgt = os.path.join(esp_dir, fname)

    if not os.path.exists(src):
        print(f"\n[{i}/{len(remaining_files)}] SKIP: {fname} not found", flush=True)
        continue

    if os.path.exists(tgt) and file_is_spanish(tgt):
        print(f"\n[{i}/{len(remaining_files)}] SKIP (already Spanish): {fname}", flush=True)
        continue

    print(f"\n[{i}/{len(remaining_files)}]", end='', flush=True)
    try:
        n = process_file(src, tgt)
        total_strings += n
        done.append(fname)
        print(f"\n  >> Cumulative: {len(done)} files, {total_strings} strings, {TOTAL_CALLS[0]} API calls", flush=True)
    except KeyboardInterrupt:
        print(f"\n\nINTERRUPTED during {fname}!", flush=True)
        break
    except Exception as e:
        print(f"\n  ERROR: {fname}: {e}", flush=True)
        import traceback
        traceback.print_exc()

elapsed = time.time() - START[0]
print(f"\n{'='*60}", flush=True)
print(f"BATCH COMPLETE! {len(done)}/{len(remaining_files)} files", flush=True)
print(f"Strings: {total_strings} | API calls: {TOTAL_CALLS[0]} | Time: {elapsed:.0f}s ({elapsed/60:.1f}min)", flush=True)
print(f"{'='*60}", flush=True)
