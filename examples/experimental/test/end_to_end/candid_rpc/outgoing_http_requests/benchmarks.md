# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | xkcd        | 178_270_310  | 71_898_124 | $0.0000956008 | $95.60            | <font color="green">-85_529</font> |
| 1   | xkcdRaw     | 2_214_318    | 1_475_727  | $0.0000019622 | $1.96             | <font color="red">+46_977</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | xkcd        | 178_355_839  | 71_932_335 | $0.0000956463 | $95.64            |
| 1   | xkcdRaw     | 2_167_341    | 1_456_936  | $0.0000019372 | $1.93             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
