import { polygonAmoy } from "viem/chains";

export const counterAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "_initialCount", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newCount",
        type: "uint256",
      },
    ],
    name: "CountChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "decrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const counterAddresses: Record<number, `0x${string}`> = {
  [polygonAmoy.id]:
    "0xb6D81EC888e553444712beED7aEF54Dc0Cdd4F28" as `0x${string}`,
} as const;

export function getCounterAddress(
  chainId: number | undefined,
): `0x${string}` | undefined {
  if (!chainId) return undefined;
  return counterAddresses[chainId];
}
