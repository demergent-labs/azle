# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 1_114_442_443 | 846_366_977 | $0.0011253888 | $1_125.38         | <font color="red">+4_378_801</font> |
| 1   | ethGetBalance       | 28_710_357    | 12_074_142  | $0.0000160546 | $16.05            | <font color="red">+83_042</font>    |
| 2   | ethGetBalance       | 28_659_608    | 12_053_843  | $0.0000160276 | $16.02            | <font color="red">+100_976</font>   |
| 3   | ethGetBalance       | 28_664_086    | 12_055_634  | $0.0000160300 | $16.03            | <font color="red">+107_149</font>   |
| 4   | ethGetBlockByNumber | 27_435_678    | 11_564_271  | $0.0000153767 | $15.37            | <font color="red">+85_858</font>    |
| 5   | ethGetBlockByNumber | 27_434_363    | 11_563_745  | $0.0000153760 | $15.37            | <font color="red">+51_782</font>    |
| 6   | ethGetBlockByNumber | 27_425_298    | 11_560_119  | $0.0000153711 | $15.37            | <font color="red">+84_965</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_110_063_642 | 844_615_456 | $0.0011230598 | $1_123.05         |
| 1   | ethGetBalance       | 28_627_315    | 12_040_926  | $0.0000160105 | $16.01            |
| 2   | ethGetBalance       | 28_558_632    | 12_013_452  | $0.0000159739 | $15.97            |
| 3   | ethGetBalance       | 28_556_937    | 12_012_774  | $0.0000159730 | $15.97            |
| 4   | ethGetBlockByNumber | 27_349_820    | 11_529_928  | $0.0000153310 | $15.33            |
| 5   | ethGetBlockByNumber | 27_382_581    | 11_543_032  | $0.0000153484 | $15.34            |
| 6   | ethGetBlockByNumber | 27_340_333    | 11_526_133  | $0.0000153260 | $15.32            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
