# Benchmarks for management_canister

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | executeCreateCanister     | 165_000_459  | 66_590_183 | $0.0000885430 | $88.54            | <font color="red">+24_650</font>    |
| 1   | executeUpdateSettings     | 166_452_800  | 67_171_120 | $0.0000893154 | $89.31            | <font color="red">+84_903</font>    |
| 2   | getCanisterStatus         | 153_562_229  | 62_014_891 | $0.0000824593 | $82.45            | <font color="red">+12_661</font>    |
| 3   | executeInstallCode        | 178_781_595  | 72_102_638 | $0.0000958727 | $95.87            | <font color="red">+95_781</font>    |
| 4   | executeUninstallCode      | 154_018_405  | 62_197_362 | $0.0000827020 | $82.70            | <font color="green">-65_301</font>  |
| 5   | getCanisterStatus         | 153_452_206  | 61_970_882 | $0.0000824008 | $82.40            | <font color="green">-105_046</font> |
| 6   | executeUploadChunk        | 168_014_508  | 67_795_803 | $0.0000901460 | $90.14            | <font color="green">-32_408</font>  |
| 7   | getStoredChunks           | 152_790_468  | 61_706_187 | $0.0000820489 | $82.04            | <font color="red">+313_690</font>   |
| 8   | getStoredChunks           | 152_677_864  | 61_661_145 | $0.0000819890 | $81.98            | <font color="red">+20_576</font>    |
| 9   | executeInstallChunkedCode | 170_500_872  | 68_790_348 | $0.0000914685 | $91.46            | <font color="red">+62_414</font>    |
| 10  | executeUninstallCode      | 153_961_284  | 62_174_513 | $0.0000826716 | $82.67            | <font color="green">-4_143</font>   |
| 11  | executeClearChunkStore    | 152_863_138  | 61_735_255 | $0.0000820875 | $82.08            | <font color="green">-82_915</font>  |
| 12  | getStoredChunks           | 152_616_112  | 61_636_444 | $0.0000819561 | $81.95            | <font color="red">+87_592</font>    |
| 13  | getCanisterStatus         | 153_522_059  | 61_998_823 | $0.0000824380 | $82.43            | <font color="red">+70_128</font>    |
| 14  | executeDepositCycles      | 152_455_967  | 61_572_386 | $0.0000818710 | $81.87            | <font color="green">-22_938</font>  |
| 15  | getCanisterStatus         | 153_522_081  | 61_998_832 | $0.0000824380 | $82.43            | <font color="red">+134_420</font>   |
| 16  | executeUninstallCode      | 154_052_719  | 62_211_087 | $0.0000827202 | $82.72            | <font color="red">+78_304</font>    |
| 17  | getCanisterStatus         | 153_434_023  | 61_963_609 | $0.0000823912 | $82.39            | <font color="green">-57_835</font>  |
| 18  | executeStopCanister       | 152_588_272  | 61_625_308 | $0.0000819413 | $81.94            | <font color="red">+55_662</font>    |
| 19  | getCanisterStatus         | 153_485_067  | 61_984_026 | $0.0000824183 | $82.41            | <font color="red">+10_005</font>    |
| 20  | getCanisterStatus         | 153_643_603  | 62_047_441 | $0.0000825026 | $82.50            | <font color="red">+177_573</font>   |
| 21  | executeStartCanister      | 152_776_879  | 61_700_751 | $0.0000820416 | $82.04            | <font color="red">+101_768</font>   |
| 22  | getCanisterStatus         | 153_480_888  | 61_982_355 | $0.0000824161 | $82.41            | <font color="green">-82_534</font>  |
| 23  | getCanisterStatus         | 153_479_873  | 61_981_949 | $0.0000824155 | $82.41            | <font color="red">+85_839</font>    |
| 24  | getCanisterInfo           | 156_871_093  | 63_338_437 | $0.0000842192 | $84.21            | <font color="red">+176_139</font>   |
| 25  | executeStopCanister       | 152_620_881  | 61_638_352 | $0.0000819587 | $81.95            | <font color="red">+3_951</font>     |
| 26  | executeDeleteCanister     | 152_752_312  | 61_690_924 | $0.0000820286 | $82.02            | <font color="red">+175_111</font>   |
| 27  | getRawRand                | 150_474_366  | 60_779_746 | $0.0000808170 | $80.81            | <font color="green">-81_379</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 164_975_809  | 66_580_323 | $0.0000885299 | $88.52            |
| 1   | executeUpdateSettings     | 166_367_897  | 67_137_158 | $0.0000892703 | $89.27            |
| 2   | getCanisterStatus         | 153_549_568  | 62_009_827 | $0.0000824526 | $82.45            |
| 3   | executeInstallCode        | 178_685_814  | 72_064_325 | $0.0000958218 | $95.82            |
| 4   | executeUninstallCode      | 154_083_706  | 62_223_482 | $0.0000827367 | $82.73            |
| 5   | getCanisterStatus         | 153_557_252  | 62_012_900 | $0.0000824567 | $82.45            |
| 6   | executeUploadChunk        | 168_046_916  | 67_808_766 | $0.0000901633 | $90.16            |
| 7   | getStoredChunks           | 152_476_778  | 61_580_711 | $0.0000818820 | $81.88            |
| 8   | getStoredChunks           | 152_657_288  | 61_652_915 | $0.0000819780 | $81.97            |
| 9   | executeInstallChunkedCode | 170_438_458  | 68_765_383 | $0.0000914353 | $91.43            |
| 10  | executeUninstallCode      | 153_965_427  | 62_176_170 | $0.0000826738 | $82.67            |
| 11  | executeClearChunkStore    | 152_946_053  | 61_768_421 | $0.0000821316 | $82.13            |
| 12  | getStoredChunks           | 152_528_520  | 61_601_408 | $0.0000819095 | $81.90            |
| 13  | getCanisterStatus         | 153_451_931  | 61_970_772 | $0.0000824007 | $82.40            |
| 14  | executeDepositCycles      | 152_478_905  | 61_581_562 | $0.0000818832 | $81.88            |
| 15  | getCanisterStatus         | 153_387_661  | 61_945_064 | $0.0000823665 | $82.36            |
| 16  | executeUninstallCode      | 153_974_415  | 62_179_766 | $0.0000826786 | $82.67            |
| 17  | getCanisterStatus         | 153_491_858  | 61_986_743 | $0.0000824219 | $82.42            |
| 18  | executeStopCanister       | 152_532_610  | 61_603_044 | $0.0000819117 | $81.91            |
| 19  | getCanisterStatus         | 153_475_062  | 61_980_024 | $0.0000824130 | $82.41            |
| 20  | getCanisterStatus         | 153_466_030  | 61_976_412 | $0.0000824082 | $82.40            |
| 21  | executeStartCanister      | 152_675_111  | 61_660_044 | $0.0000819875 | $81.98            |
| 22  | getCanisterStatus         | 153_563_422  | 62_015_368 | $0.0000824600 | $82.45            |
| 23  | getCanisterStatus         | 153_394_034  | 61_947_613 | $0.0000823699 | $82.36            |
| 24  | getCanisterInfo           | 156_694_954  | 63_267_981 | $0.0000841255 | $84.12            |
| 25  | executeStopCanister       | 152_616_930  | 61_636_772 | $0.0000819566 | $81.95            |
| 26  | executeDeleteCanister     | 152_577_201  | 61_620_880 | $0.0000819354 | $81.93            |
| 27  | getRawRand                | 150_555_745  | 60_812_298 | $0.0000808603 | $80.86            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
