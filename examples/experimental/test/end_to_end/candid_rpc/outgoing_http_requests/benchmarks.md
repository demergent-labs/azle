# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | xkcd        | 178_365_529  | 71_936_211 | $0.0000956514 | $95.65            | <font color="red">+918_230</font> |
| 1   | xkcdRaw     | 2_169_775    | 1_457_910  | $0.0000019385 | $1.93             | <font color="red">+2_049</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | xkcd        | 177_447_299  | 71_568_919 | $0.0000951630 | $95.16            |
| 1   | xkcdRaw     | 2_167_726    | 1_457_090  | $0.0000019374 | $1.93             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
