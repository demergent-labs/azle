# Benchmarks for management_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 15_919_990   | 6_957_996  | $0.0000092518 | $9.25             |
| 1   | executeUpdateSettings     | 17_233_649   | 7_483_459  | $0.0000099505 | $9.95             |
| 2   | getCanisterStatus         | 3_743_081    | 2_087_232  | $0.0000027753 | $2.77             |
| 3   | executeInstallCode        | 29_128_713   | 12_241_485 | $0.0000162771 | $16.27            |
| 4   | executeUninstallCode      | 4_396_545    | 2_348_618  | $0.0000031229 | $3.12             |
| 5   | getCanisterStatus         | 3_739_591    | 2_085_836  | $0.0000027735 | $2.77             |
| 6   | executeUploadChunk        | 17_920_468   | 7_758_187  | $0.0000103158 | $10.31            |
| 7   | getStoredChunks           | 3_051_589    | 1_810_635  | $0.0000024075 | $2.40             |
| 8   | getStoredChunks           | 3_051_935    | 1_810_774  | $0.0000024077 | $2.40             |
| 9   | executeInstallChunkedCode | 20_709_887   | 8_873_954  | $0.0000117994 | $11.79            |
| 10  | executeUninstallCode      | 4_400_443    | 2_350_177  | $0.0000031250 | $3.12             |
| 11  | executeClearChunkStore    | 3_046_093    | 1_808_437  | $0.0000024046 | $2.40             |
| 12  | getStoredChunks           | 3_048_748    | 1_809_499  | $0.0000024060 | $2.40             |
| 13  | getCanisterStatus         | 3_737_640    | 2_085_056  | $0.0000027724 | $2.77             |
| 14  | executeDepositCycles      | 3_053_621    | 1_811_448  | $0.0000024086 | $2.40             |
| 15  | getCanisterStatus         | 3_741_524    | 2_086_609  | $0.0000027745 | $2.77             |
| 16  | executeUninstallCode      | 4_392_927    | 2_347_170  | $0.0000031210 | $3.12             |
| 17  | getCanisterStatus         | 3_740_580    | 2_086_232  | $0.0000027740 | $2.77             |
| 18  | executeStopCanister       | 3_059_205    | 1_813_682  | $0.0000024116 | $2.41             |
| 19  | getCanisterStatus         | 3_757_563    | 2_093_025  | $0.0000027830 | $2.78             |
| 20  | getCanisterStatus         | 3_753_456    | 2_091_382  | $0.0000027808 | $2.78             |
| 21  | executeStartCanister      | 3_061_595    | 1_814_638  | $0.0000024129 | $2.41             |
| 22  | getCanisterStatus         | 3_749_070    | 2_089_628  | $0.0000027785 | $2.77             |
| 23  | getCanisterStatus         | 3_741_697    | 2_086_678  | $0.0000027746 | $2.77             |
| 24  | getCanisterInfo           | 6_627_485    | 3_240_994  | $0.0000043095 | $4.30             |
| 25  | executeStopCanister       | 3_044_036    | 1_807_614  | $0.0000024035 | $2.40             |
| 26  | executeDeleteCanister     | 3_045_295    | 1_808_118  | $0.0000024042 | $2.40             |
| 27  | getRawRand                | 905_355      | 952_142    | $0.0000012660 | $1.26             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
