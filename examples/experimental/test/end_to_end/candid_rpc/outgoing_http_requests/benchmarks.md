# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------------- |
| 0   | xkcd        | 178_405_454  | 71_952_181 | $0.0000956727 | $95.67            | <font color="red">+153_396_288</font> |
| 1   | xkcdRaw     | 2_210_439    | 1_474_175  | $0.0000019602 | $1.96             | <font color="red">+11_386</font>      |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | xkcd        | 25_009_166   | 10_593_666 | $0.0000140861 | $14.08            |
| 1   | xkcdRaw     | 2_199_053    | 1_469_621  | $0.0000019541 | $1.95             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
