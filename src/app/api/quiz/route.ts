import { NextResponse } from 'next/server';
import {LEVEL, shuffleArray} from '@/lib/utils';

// ADD SHUFFLE LOGIC IN THE BACKEND FOR QUESTIONS AND ANSWERS


const quiz = [
  // Easy Questions
  {
    id: 1,
    question: "What is omnichain messaging?",
    answers: [
      "Off-chain logging",
      "Cross-chain message protocol",
      "Single-chain transactions",
      "Node communication"
    ],
    correct: 1,
    difficulty: LEVEL.EASY
  },
  {
    id: 2,
    question: "Which function sends a message?",
    answers: [
      "_lzSend(...)",
      "postMessage(...)",
      "lzReceive(...)",
      "sendMessage(...)"
    ],
    correct: 0,
    difficulty: LEVEL.EASY
  },
  {
    id: 3,
    question: "Which function receives a message?",
    answers: [
      "handleMessage(...)",
      "lzSend(...)",
      "getMessage(...)",
      "lzReceive(...)"
    ],
    correct: 3,
    difficulty: LEVEL.EASY
  },
  {
    id: 4,
    question: "What is the Endpoint?",
    answers: [
      "Token vault",
      "Oracle",
      "Consensus node",
      "Message entry/exit"
    ],
    correct: 3,
    difficulty: LEVEL.EASY
  },

  // Intermediate Questions
  {
    id: 5,
    question: "What defines a channel?",
    answers: [
      "User roles",
      "Src/dest addr + endpoints",
      "Token and gas info",
      "Block and payload"
    ],
    correct: 1,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 6,
    question: "How is order kept?",
    answers: [
      "Oracle sorting",
      "Relayer sorting",
      "Off-chain batches",
      "Per-channel nonce"
    ],
    correct: 3,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 7,
    question: "What do DVNs do?",
    answers: [
      "Batch txs",
      "Deploy contracts",
      "Send funds",
      "Attest messages"
    ],
    correct: 3,
    difficulty: LEVEL.INTERMEDIATE
  },
  {
    id: 8,
    question: "Message vs Packet vs Payload?",
    answers: [
      "Header vs data vs sig",
      "Full vs header vs data",
      "All same",
      "Data vs proof vs header"
    ],
    correct: 1,
    difficulty: LEVEL.INTERMEDIATE
  },

  // Hard Questions
  {
    id: 9,
    question: "Dispatch to execution?",
    answers: [
      "Mint → burn → unlock",
      "Send → attest → commit → receive",
      "Stake → sign → exec",
      "Deploy → prove → consume"
    ],
    correct: 1,
    difficulty: LEVEL.HARD
  },
  {
    id: 10,
    question: "VM-agnostic means?",
    answers: [
      "No VM",
      "Custom VM",
      "Only EVM",
      "Any VM supported"
    ],
    correct: 3,
    difficulty: LEVEL.HARD
  },
  {
    id: 11,
    question: "X of Y of N means?",
    answers: [
      "Msgs per block",
      "Retry logic",
      "Gas config",
      "Attest threshold"
    ],
    correct: 3,
    difficulty: LEVEL.HARD
  },
  {
    id: 12,
    question: "What is a composed message?",
    answers: [
      "NFT-only",
      "Multi-call message",
      "ZK-based",
      "Simple payload"
    ],
    correct: 1,
    difficulty: LEVEL.HARD
  }
];






export async function GET() {
  return NextResponse.json(shuffleArray(quiz));
}
