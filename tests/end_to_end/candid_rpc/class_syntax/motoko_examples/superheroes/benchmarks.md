# Benchmarks for superheroes

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | create      | 3_661_880    | 2_054_752 | $0.0000027321 | $2.73             | <font color="red">+76_637</font>  |
| 1   | create      | 4_719_416    | 2_477_766 | $0.0000032946 | $3.29             | <font color="red">+143_628</font> |
| 2   | update      | 5_072_618    | 2_619_047 | $0.0000034825 | $3.48             | <font color="red">+186_433</font> |
| 3   | update      | 3_561_556    | 2_014_622 | $0.0000026788 | $2.67             | <font color="red">+102_863</font> |
| 4   | deleteHero  | 1_221_645    | 1_078_658 | $0.0000014343 | $1.43             | <font color="red">+33_317</font>  |
| 5   | deleteHero  | 1_206_832    | 1_072_732 | $0.0000014264 | $1.42             | <font color="red">+28_757</font>  |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 3_585_243    | 2_024_097 | $0.0000026914 | $2.69             |
| 1   | create      | 4_575_788    | 2_420_315 | $0.0000032182 | $3.21             |
| 2   | update      | 4_886_185    | 2_544_474 | $0.0000033833 | $3.38             |
| 3   | update      | 3_458_693    | 1_973_477 | $0.0000026241 | $2.62             |
| 4   | deleteHero  | 1_188_328    | 1_065_331 | $0.0000014165 | $1.41             |
| 5   | deleteHero  | 1_178_075    | 1_061_230 | $0.0000014111 | $1.41             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
