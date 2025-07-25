⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name     | Instructions | Cycles    | USD           | USD/Million Calls | Change                                |
| --- | --------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------------- |
| 0   | addRandomBytes  | 1_141_581    | 1_046_632 | $0.0000013917 | $1.39             | <font color="green">-65_406</font>    |
| 1   | addRandomBytes  | 1_064_007    | 1_015_602 | $0.0000013504 | $1.35             | <font color="green">-74_439</font>    |
| 2   | addRandomBytes  | 1_065_548    | 1_016_219 | $0.0000013512 | $1.35             | <font color="green">-74_263</font>    |
| 3   | addRandomBytes  | 1_068_380    | 1_017_352 | $0.0000013527 | $1.35             | <font color="green">-72_261</font>    |
| 4   | onLowWasmMemory | 101_838      | 630_735   | $0.0000008387 | $0.83             | <font color="green">-1_039_094</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | --------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | addRandomBytes  | 1_206_987    | 1_072_794 | $0.0000014265 | $1.42             |
| 1   | addRandomBytes  | 1_138_446    | 1_045_378 | $0.0000013900 | $1.39             |
| 2   | addRandomBytes  | 1_139_811    | 1_045_924 | $0.0000013907 | $1.39             |
| 3   | addRandomBytes  | 1_140_641    | 1_046_256 | $0.0000013912 | $1.39             |
| 4   | addRandomBytes  | 1_140_932    | 1_046_372 | $0.0000013913 | $1.39             |
| 5   | addRandomBytes  | 1_137_561    | 1_045_024 | $0.0000013895 | $1.38             |
| 6   | addRandomBytes  | 1_140_374    | 1_046_149 | $0.0000013910 | $1.39             |
| 7   | addRandomBytes  | 1_137_659    | 1_045_063 | $0.0000013896 | $1.38             |
| 8   | addRandomBytes  | 1_138_193    | 1_045_277 | $0.0000013899 | $1.38             |
| 9   | addRandomBytes  | 1_137_162    | 1_044_864 | $0.0000013893 | $1.38             |
| 10  | onLowWasmMemory | 99_500       | 629_800   | $0.0000008374 | $0.83             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
