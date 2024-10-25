# Benchmarks for management_canister

## Current benchmarks Azle version: 0.24.2-rc.70

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 14_173_283   | 6_259_313  | $0.0000083228 | $8.32             |
| 1   | executeUpdateSettings     | 15_403_197   | 6_751_278  | $0.0000089770 | $8.97             |
| 2   | getCanisterStatus         | 3_563_596    | 2_015_438  | $0.0000026799 | $2.67             |
| 3   | executeInstallCode        | 29_081_885   | 12_222_754 | $0.0000162522 | $16.25            |
| 4   | executeUninstallCode      | 4_173_989    | 2_259_595  | $0.0000030045 | $3.00             |
| 5   | getCanisterStatus         | 3_556_367    | 2_012_546  | $0.0000026760 | $2.67             |
| 6   | executeUploadChunk        | 18_383_792   | 7_943_516  | $0.0000105623 | $10.56            |
| 7   | getStoredChunks           | 2_889_990    | 1_745_996  | $0.0000023216 | $2.32             |
| 8   | getStoredChunks           | 2_885_366    | 1_744_146  | $0.0000023191 | $2.31             |
| 9   | executeInstallChunkedCode | 19_832_398   | 8_522_959  | $0.0000113327 | $11.33            |
| 10  | executeUninstallCode      | 4_173_200    | 2_259_280  | $0.0000030041 | $3.00             |
| 11  | executeClearChunkStore    | 2_886_340    | 1_744_536  | $0.0000023197 | $2.31             |
| 12  | getStoredChunks           | 2_885_140    | 1_744_056  | $0.0000023190 | $2.31             |
| 13  | getCanisterStatus         | 3_556_998    | 2_012_799  | $0.0000026764 | $2.67             |
| 14  | executeDepositCycles      | 2_901_265    | 1_750_506  | $0.0000023276 | $2.32             |
| 15  | getCanisterStatus         | 3_556_998    | 2_012_799  | $0.0000026764 | $2.67             |
| 16  | executeUninstallCode      | 4_171_055    | 2_258_422  | $0.0000030030 | $3.00             |
| 17  | getCanisterStatus         | 3_551_985    | 2_010_794  | $0.0000026737 | $2.67             |
| 18  | executeStopCanister       | 2_892_949    | 1_747_179  | $0.0000023232 | $2.32             |
| 19  | getCanisterStatus         | 3_560_842    | 2_014_336  | $0.0000026784 | $2.67             |
| 20  | getCanisterStatus         | 3_558_363    | 2_013_345  | $0.0000026771 | $2.67             |
| 21  | executeStartCanister      | 2_896_066    | 1_748_426  | $0.0000023248 | $2.32             |
| 22  | getCanisterStatus         | 3_561_371    | 2_014_548  | $0.0000026787 | $2.67             |
| 23  | getCanisterStatus         | 3_558_122    | 2_013_248  | $0.0000026770 | $2.67             |
| 24  | getCanisterInfo           | 6_308_537    | 3_113_414  | $0.0000041398 | $4.13             |
| 25  | executeStopCanister       | 2_888_609    | 1_745_443  | $0.0000023209 | $2.32             |
| 26  | executeDeleteCanister     | 2_896_386    | 1_748_554  | $0.0000023250 | $2.32             |
| 27  | getRawRand                | 1_305_123    | 1_112_049  | $0.0000014787 | $1.47             |

## Baseline benchmarks Azle version: 0.24.2-rc.70

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
