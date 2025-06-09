import { NextResponse } from 'next/server';
import {LEVEL} from '@/lib/utils';


const quiz = [
  // Easy Questions
  {
    id: 1,
    question: "What is cross-chain communication?",
    answers: [
      "Data transfer between blockchains",
      "Transactions within one chain",
      "Node-to-node messaging",
      "Off-chain data storage"
    ],
    correct: 0,
    difficulty: LEVEL.EASY
  },
  {
    id: 2,
    question: "Which function sends LayerZero messages?",
    answers: [
      "lzReceive(...)",
      "lzSend(...)",
      "sendMessage(...)",
      "postMessage(...)"
    ],
    correct: 1,
    difficulty: LEVEL.EASY
  },
  {
    id: 3,
    question: "Which function receives messages?",
    answers: [
      "lzReceive(...)",
      "lzSend(...)",
      "getMessage(...)",
      "handleMessage(...)"
    ],
    correct: 0,
    difficulty: LEVEL.EASY
  },
  {
    id: 4,
    question: "What is an Endpoint?",
    answers: [
      "A cross-chain connector",
      "A consensus node",
      "A token vault",
      "An oracle"
    ],
    correct: 0,
    difficulty: LEVEL.EASY
  },

  // Intermediate Questions
  {
    id: 5,
    question: "Name the four parts of a messaging channel.",
    answers: [
      "Source chain, dest chain, source addr, dest addr",
      "Token, amount, fee, gas",
      "Block, tx, nonce, payload",
      "User, oracle, relayer, validator"
    ],
    correct: 0,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 6,
    question: "How does LayerZero ensure message order?",
    answers: [
      "Using nonces per channel",
      "Batching off-chain",
      "Oracles reorder messages",
      "Relayers sort before delivery"
    ],
    correct: 0,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 7,
    question: "What do DVNs do on message arrival?",
    answers: [
      "Verify and attest proofs",
      "Batch transactions",
      "Provide liquidity",
      "Deploy contracts"
    ],
    correct: 0,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 8,
    question: "Define Message, Packet, and Payload.",
    answers: [
      "Message groups packets; Packet adds headers; Payload is data",
      "Message is data; Packet is proof; Payload is header",
      "Message is header; Packet is data; Payload is signature",
      "All identical concepts"
    ],
    correct: 0,
    difficulty: LEVEL.INTERMEDIATE
  },

  // Hard Questions
  {
    id: 9,
    question: "List the four steps from dispatch to execution.",
    answers: [
      "lzSend → oracle report → proof fetch → lzReceive",
      "Stake → sign → aggregate → execute",
      "Deploy → verify → prove → consume",
      "Mint → relay → burn → unlock"
    ],
    correct: 0,
    difficulty: LEVEL.HARD
  },
  {
    id: 10,
    question: "What does VM-agnostic mean?",
    answers: [
      "Supports multiple VMs",
      "Runs only on EVM",
      "Requires custom VM",
      "Needs no VM"
    ],
    correct: 0,
    difficulty: LEVEL.HARD
  },
  {
    id: 11,
    question: "Explain X of Y of N in DVNs.",
    answers: [
      "X validators from Y of N must agree",
      "X messages in Y blocks of N chains",
      "Gas limit set by X of Y of N",
      "Timeouts after X of Y of N attempts"
    ],
    correct: 0,
    difficulty: LEVEL.HARD
  },
  {
    id: 12,
    question: "What is a Composed Message?",
    answers: [
      "Multiple payloads in one message",
      "NFT-only transfer",
      "zk-proof message",
      "Standard single payload"
    ],
    correct: 0,
    difficulty: LEVEL.HARD
  }
];



const _quiz = [
  {
    id: 1,
    question: "What is LayerZero primarily designed for?",
    answers: [
      "Hosting non‑fungible tokens",
      "Omnichain interoperability between blockchains",
      "Layer‑2 scaling only",
      "On‑chain gaming"
    ],
    correct: 1,
    difficulty: LEVEL.EASY
  },
  {
    id: 2,
    question: "Which of the following is an immutable contract deployed on each chain to serve as entry and exit points?",
    answers: [
      "Message Library",
      "Endpoint",
      "Oracle",
      "Relayer"
    ],
    correct: 1,
    difficulty: LEVEL.EASY
  },
  {
    id: 3,
    question: "LayerZero V2 replaced oracles and relayers with which two components?",
    answers: [
      "Oracles and Executors",
      "DVNs (Decentralized Verifier Networks) and Executors",
      "Oracles and DVNs",
      "Relayers and Executors"
    ],
    correct: 1,
    difficulty: LEVEL.EASY
  },
  
];

const rand = [
{
    id: 4,
    question: "What does 'X of Y of N' refer to in LayerZero’s security model?",
    answers: [
      "Message sequencing across endpoints",
      "Gas fee estimation across chains",
      "DVN quorum configuration",
      "Versioning of Message Libraries"
    ],
    correct: 2,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 5,
    question: "Which token standards does LayerZero introduce for omnichain assets?",
    answers: [
      "OFT for fungible, ONFT for non‑fungible",
      "ERC‑20 and ERC‑721",
      "GMP‑Token",
      "xTokens"
    ],
    correct: 0,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 6,
    question: "How does LayerZero ensure message delivery occurs exactly once per channel?",
    answers: [
      "Merkle proof verification",
      "Nonce tracking per channel",
      "Timestamp comparison",
      "Oracle confirmations"
    ],
    correct: 1,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 7,
    question: "What core principle ensures LayerZero endpoints cannot be modified after deployment?",
    answers: [
      "Permissionlessness",
      "Censorship resistance",
      "Immutability",
      "Modularity"
    ],
    correct: 2,
    difficulty: LEVEL.EASY
  },
  {
    id: 8,
    question: "LayerZeroScan is used for:",
    answers: [
      "Hosting LayerZero’s smart contracts",
      "Exploring omnichain messages and transactions",
      "Issuing OFTs and ONFTs",
      "Managing DVN configurations"
    ],
    correct: 1,
    difficulty: LEVEL.EASY
  },
  {
    id: 9,
    question: "What analogy is used to describe LayerZero’s role in blockchain communication?",
    answers: [
      "LayerZero is like HTTP for the internet",
      "LayerZero is like TCP/IP for blockchains",
      "LayerZero is like SMTP for blockchains",
      "LayerZero is like SSH for blockchain bridges"
    ],
    correct: 1,
    difficulty: LEVEL.HARD
  },
  {
    id: 10,
    question: "Which of the following is NOT a feature of LayerZero V2?",
    answers: [
      "Immutable endpoints",
      "Universal message libs",
      "Centralized relayer system",
      "Application‑owned security stacks"
    ],
    correct: 2,
    difficulty: LEVEL.HARD
  }
]
export async function GET() {
  return NextResponse.json(quiz);
}
