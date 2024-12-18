import { Coinbase, Wallet, readContract } from "@coinbase/coinbase-sdk";

const USER_KEYS_ADDRESS = "0x20e8CF6a32F4848AfBeE6d198975228653f520Da";
const USER_KEYS_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_publicKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "_seed",
        type: "string",
      },
      {
        internalType: "string",
        name: "_walletId",
        type: "string",
      },
    ],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_publicKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "_seed",
        type: "string",
      },
      {
        internalType: "string",
        name: "_walletId",
        type: "string",
      },
    ],
    name: "updateUserProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "UserRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getRegistrationTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserProfile",
    outputs: [
      {
        internalType: "uint256",
        name: "registrationTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "publicKey",
        type: "string",
      },
      {
        internalType: "string",
        name: "seed",
        type: "string",
      },
      {
        internalType: "string",
        name: "walletId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "hasUserProfile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const USER_MANAGEMENT_ADDRESS = "0x0428219Aa10E4A2DdA14Abb3AdE4Fc1d82539131"; 
const USER_MANAGEMENT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "acceptFriendRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "blockUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "FriendRequestAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "FriendRequestRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "FriendRequestSent",
    type: "event",
  },
  {
    inputs: [],
    name: "registerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "rejectFriendRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "sendFriendRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "unblockUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user2",
        type: "address",
      },
    ],
    name: "Unfriended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "UserRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "getBlockedUsers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingFriendRequests",
    outputs: [
      {
        internalType: "address[]",
        name: "senders",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "timestamps",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserFriends",
    outputs: [
      {
        internalType: "address[]",
        name: "friendAddresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "friendshipTimestamps",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserProfile",
    outputs: [
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "registrationTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUsersList",
    outputs: [
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "registrationTimes",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user1",
        type: "address",
      },
      {
        internalType: "address",
        name: "_user2",
        type: "address",
      },
    ],
    name: "isFriends",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

let coinbase = Coinbase.configureFromJson({
  filePath: "cdp_api_key.json",
});

// Create a Wallet
let wallet = await Wallet.create();
console.log(`Wallet successfully created: `, wallet.toString());

// Wallets are not persisted by default. Refer to the Wallets concept for more information.

// Wallets come with a single default Address, accessible via getDefaultAddress:
let address = await wallet.getDefaultAddress();
console.log(`Default address for the wallet: `, address.toString());
console.log(`Default address for the wallet: `, address.id);

let seed = await wallet.export();
console.log(`Default seed for the wallet: `, seed.seed);

let faucetTransaction = await wallet.faucet();

// Wait for the faucet transaction to land on-chain.
await faucetTransaction.wait();

console.log(`Faucet transaction: ${faucetTransaction}`);

const transferArgs = {
  _publicKey: "0xmyEthereumAddress",
  _seed: "0xmyEthereumAddress",
  _walletId: "0xmyEthereumAddress",
};

const contractInvocation = await wallet.invokeContract({
  contractAddress: USER_KEYS_ADDRESS,
  method: "registerUser",
  args: transferArgs,
  abi: USER_KEYS_ABI,
});

// Wait for the contract invocation transaction to land on-chain.
const tx = await contractInvocation.wait();

console.log("tx", tx.getTransactionHash());

const getArgs = { _user: address.id };

// balance is automatically of type bigint
const balance = await readContract({
  networkId: "base-sepolia",
  abi: USER_KEYS_ABI,
  contractAddress: USER_KEYS_ADDRESS,
  method: "getUserProfile",
  args: getArgs,
});

console.log(balance);


