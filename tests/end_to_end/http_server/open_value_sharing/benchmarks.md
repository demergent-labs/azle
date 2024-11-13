# Benchmarks for wallet

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add_to_whitelist | 1_419_827    | 1_157_930 | $0.0000015397 | $1.53             |
| 1   | wallet_receive   | 1_713_004    | 1_275_201 | $0.0000016956 | $1.69             |
| 2   | wallet_receive   | 1_717_042    | 1_276_816 | $0.0000016977 | $1.69             |
| 3   | wallet_receive   | 1_723_326    | 1_279_330 | $0.0000017011 | $1.70             |
| 4   | wallet_receive   | 1_724_189    | 1_279_675 | $0.0000017015 | $1.70             |
| 5   | wallet_receive   | 1_726_210    | 1_280_484 | $0.0000017026 | $1.70             |
| 6   | wallet_receive   | 1_725_792    | 1_280_316 | $0.0000017024 | $1.70             |
| 7   | wallet_receive   | 1_724_906    | 1_279_962 | $0.0000017019 | $1.70             |
| 8   | wallet_receive   | 1_729_261    | 1_281_704 | $0.0000017042 | $1.70             |
| 9   | wallet_receive   | 1_726_722    | 1_280_688 | $0.0000017029 | $1.70             |
| 10  | wallet_receive   | 1_727_569    | 1_281_027 | $0.0000017033 | $1.70             |
| 11  | wallet_receive   | 1_724_949    | 1_279_979 | $0.0000017019 | $1.70             |
| 12  | wallet_receive   | 1_723_396    | 1_279_358 | $0.0000017011 | $1.70             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
