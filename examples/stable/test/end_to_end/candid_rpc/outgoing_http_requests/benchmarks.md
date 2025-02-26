# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | xkcd        | 25_171_036   | 10_658_414 | $0.0000141722 | $14.17            | <font color="green">-109_698</font> |
| 1   | xkcdRaw     | 1_192_421    | 1_066_968  | $0.0000014187 | $1.41             | <font color="green">-8_452</font>   |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | xkcd        | 25_280_734   | 10_702_293 | $0.0000142305 | $14.23            |
| 1   | xkcdRaw     | 1_200_873    | 1_070_349  | $0.0000014232 | $1.42             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
