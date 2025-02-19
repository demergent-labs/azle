# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | xkcd        | 179_243_370  | 72_287_348 | $0.0000961183 | $96.11            | <font color="red">+7_685</font>  |
| 1   | xkcdRaw     | 2_171_608    | 1_458_643  | $0.0000019395 | $1.93             | <font color="red">+46_072</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | xkcd        | 179_235_685  | 72_284_274 | $0.0000961142 | $96.11            |
| 1   | xkcdRaw     | 2_125_536    | 1_440_214  | $0.0000019150 | $1.91             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
