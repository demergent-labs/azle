⚠️ **WARNING: Benchmark process failed for version 0.25.0**

# Benchmarks for server

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_401_932_534 | 6_561_363_013 | $0.0087244476 | $8_724.44         |
| 1   | http_request_update | 195_444_121   | 78_767_648    | $0.0001047350 | $104.73           |
| 2   | http_request_update | 195_383_145   | 78_743_258    | $0.0001047025 | $104.70           |
| 3   | http_request_update | 194_847_632   | 78_529_052    | $0.0001044177 | $104.41           |
| 4   | http_request_update | 191_177_333   | 77_060_933    | $0.0001024656 | $102.46           |
| 5   | http_request_update | 195_106_055   | 78_632_422    | $0.0001045552 | $104.55           |
| 6   | http_request_update | 191_546_132   | 77_208_452    | $0.0001026618 | $102.66           |
| 7   | http_request_update | 191_908_530   | 77_353_412    | $0.0001028545 | $102.85           |
| 8   | http_request_update | 191_820_725   | 77_318_290    | $0.0001028078 | $102.80           |
| 9   | http_request_update | 191_928_795   | 77_361_518    | $0.0001028653 | $102.86           |
| 10  | http_request_update | 191_969_043   | 77_377_617    | $0.0001028867 | $102.88           |
| 11  | http_request_update | 191_994_341   | 77_387_736    | $0.0001029002 | $102.90           |
| 12  | http_request_update | 191_862_380   | 77_334_952    | $0.0001028300 | $102.82           |
| 13  | http_request_update | 224_652_526   | 90_451_010    | $0.0001202700 | $120.26           |
| 14  | http_request_update | 196_796_947   | 79_308_778    | $0.0001054545 | $105.45           |
| 15  | http_request_update | 197_257_710   | 79_493_084    | $0.0001056996 | $105.69           |
| 16  | http_request_update | 193_617_499   | 78_036_999    | $0.0001037635 | $103.76           |
| 17  | http_request_update | 192_455_737   | 77_572_294    | $0.0001031456 | $103.14           |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
