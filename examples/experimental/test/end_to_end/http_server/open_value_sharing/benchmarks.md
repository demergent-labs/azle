# Benchmarks for wallet

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add_to_whitelist | 1_548_677    | 1_209_470 | $0.0000016082 | $1.60             | <font color="red">+116_308</font> |
| 1   | wallet_receive   | 1_810_699    | 1_314_279 | $0.0000017476 | $1.74             | <font color="red">+79_083</font>  |
| 2   | wallet_receive   | 1_790_479    | 1_306_191 | $0.0000017368 | $1.73             | <font color="red">+64_880</font>  |
| 3   | wallet_receive   | 1_789_032    | 1_305_612 | $0.0000017360 | $1.73             | <font color="red">+63_809</font>  |
| 4   | wallet_receive   | 1_791_446    | 1_306_578 | $0.0000017373 | $1.73             | <font color="red">+67_088</font>  |
| 5   | wallet_receive   | 1_785_943    | 1_304_377 | $0.0000017344 | $1.73             | <font color="red">+61_881</font>  |
| 6   | wallet_receive   | 1_787_719    | 1_305_087 | $0.0000017353 | $1.73             | <font color="red">+64_205</font>  |
| 7   | wallet_receive   | 1_790_371    | 1_306_148 | $0.0000017367 | $1.73             | <font color="red">+65_281</font>  |
| 8   | wallet_receive   | 1_792_868    | 1_307_147 | $0.0000017381 | $1.73             | <font color="red">+68_285</font>  |
| 9   | wallet_receive   | 1_792_167    | 1_306_866 | $0.0000017377 | $1.73             | <font color="red">+68_448</font>  |
| 10  | wallet_receive   | 1_791_882    | 1_306_752 | $0.0000017375 | $1.73             | <font color="red">+66_693</font>  |
| 11  | wallet_receive   | 1_791_093    | 1_306_437 | $0.0000017371 | $1.73             | <font color="red">+67_374</font>  |
| 12  | wallet_receive   | 1_787_650    | 1_305_060 | $0.0000017353 | $1.73             | <font color="red">+64_037</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add_to_whitelist | 1_432_369    | 1_162_947 | $0.0000015463 | $1.54             |
| 1   | wallet_receive   | 1_731_616    | 1_282_646 | $0.0000017055 | $1.70             |
| 2   | wallet_receive   | 1_725_599    | 1_280_239 | $0.0000017023 | $1.70             |
| 3   | wallet_receive   | 1_725_223    | 1_280_089 | $0.0000017021 | $1.70             |
| 4   | wallet_receive   | 1_724_358    | 1_279_743 | $0.0000017016 | $1.70             |
| 5   | wallet_receive   | 1_724_062    | 1_279_624 | $0.0000017015 | $1.70             |
| 6   | wallet_receive   | 1_723_514    | 1_279_405 | $0.0000017012 | $1.70             |
| 7   | wallet_receive   | 1_725_090    | 1_280_036 | $0.0000017020 | $1.70             |
| 8   | wallet_receive   | 1_724_583    | 1_279_833 | $0.0000017018 | $1.70             |
| 9   | wallet_receive   | 1_723_719    | 1_279_487 | $0.0000017013 | $1.70             |
| 10  | wallet_receive   | 1_725_189    | 1_280_075 | $0.0000017021 | $1.70             |
| 11  | wallet_receive   | 1_723_719    | 1_279_487 | $0.0000017013 | $1.70             |
| 12  | wallet_receive   | 1_723_613    | 1_279_445 | $0.0000017012 | $1.70             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
