# Benchmarks for backend

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_263_515_401 | 6_505_996_160 | $0.0086508279 | $8_650.82         |
| 1   | http_request_update | 56_119_079    | 23_037_631    | $0.0000306324 | $30.63            |
| 2   | http_request_update | 49_557_424    | 20_412_969    | $0.0000271425 | $27.14            |
| 3   | http_request_update | 49_907_603    | 20_553_041    | $0.0000273288 | $27.32            |
| 4   | http_request_update | 49_615_243    | 20_436_097    | $0.0000271733 | $27.17            |
| 5   | http_request_update | 49_805_308    | 20_512_123    | $0.0000272744 | $27.27            |
| 6   | http_request_update | 47_566_239    | 19_616_495    | $0.0000260835 | $26.08            |
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
