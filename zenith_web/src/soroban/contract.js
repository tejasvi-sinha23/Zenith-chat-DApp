import { Contract, SorobanRpc, Networks, Address } from "@stellar/stellar-sdk";

export const contractId = "CAJPPJHRVND42MAMFYKNX7HVML7OTLWE7KVKHAFNOGZVF4S7GOYNO3XE";
export const rpcUrl = "https://soroban-testnet.stellar.org";

export const server = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
export const networkPassphrase = Networks.TESTNET;

export const getContract = () => new Contract(contractId);
