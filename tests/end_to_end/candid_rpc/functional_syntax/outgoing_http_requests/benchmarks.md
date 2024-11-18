# Benchmarks for outgoing_http_requests

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | xkcd        | 168_063_301  | 67_815_320 | $0.0000901720 | $90.17            | <font color="red">+32_307</font>  |
| 1   | xkcdRaw     | 2_124_270    | 1_439_708  | $0.0000019143 | $1.91             | <font color="green">-8_242</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | xkcd        | 168_030_994  | 67_802_397 | $0.0000901548 | $90.15            |
| 1   | xkcdRaw     | 2_132_512    | 1_443_004  | $0.0000019187 | $1.91             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
