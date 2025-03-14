⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | xkcd        | 25_227_994   | 10_681_197 | $0.0000142025 | $14.20            | <font color="red">+55_944</font> |
| 1   | xkcdRaw     | 1_237_528    | 1_085_011  | $0.0000014427 | $1.44             | <font color="red">+44_809</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | xkcd        | 25_172_050   | 10_658_820 | $0.0000141727 | $14.17            |
| 1   | xkcdRaw     | 1_192_719    | 1_067_087  | $0.0000014189 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
