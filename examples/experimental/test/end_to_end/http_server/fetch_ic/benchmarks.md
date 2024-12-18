# Benchmarks for backend

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_263_515_401 | 6_505_996_160 | $0.0086508279 | $8_650.82         |
| 1   | http_request_update | 56_149_831    | 23_049_932    | $0.0000306488 | $30.64            |
| 2   | http_request_update | 49_555_571    | 20_412_228    | $0.0000271415 | $27.14            |
| 3   | http_request_update | 49_933_375    | 20_563_350    | $0.0000273425 | $27.34            |
| 4   | http_request_update | 49_638_480    | 20_445_392    | $0.0000271856 | $27.18            |
| 5   | http_request_update | 49_815_398    | 20_516_159    | $0.0000272797 | $27.27            |
| 6   | http_request_update | 47_579_382    | 19_621_752    | $0.0000260905 | $26.09            |
| 7   | http_request_update | 38_002_962    | 15_791_184    | $0.0000209971 | $20.99            |

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
