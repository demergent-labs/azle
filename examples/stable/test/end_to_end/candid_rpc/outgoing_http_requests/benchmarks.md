# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | xkcd        | 23_691_774   | 10_066_709 | $0.0000133854 | $13.38            | <font color="green">-22_240</font> |
| 1   | xkcdRaw     | 1_402_390    | 1_150_956  | $0.0000015304 | $1.53             | <font color="green">-12_543</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | xkcd        | 23_714_014   | 10_075_605 | $0.0000133972 | $13.39            |
| 1   | xkcdRaw     | 1_414_933    | 1_155_973  | $0.0000015371 | $1.53             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
