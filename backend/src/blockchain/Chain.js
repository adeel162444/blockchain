import { Block } from './Block.js';

export class Chain {
  constructor(parentChainLastHash = '') {
    this.chain = [];
    this.difficulty = 2;
    this.parentChainLastHash = parentChainLastHash;
  }

  createGenesisBlock() {
    const genesisBlock = new Block(0, new Date().toISOString(), {
      type: 'genesis',
      linkedParentHash: this.parentChainLastHash
    }, this.parentChainLastHash);

    genesisBlock.mineBlock(this.difficulty);
    this.chain.push(genesisBlock);
    return genesisBlock;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const newBlock = new Block(
      this.chain.length,
      new Date().toISOString(),
      data,
      this.getLatestBlock().hash
    );

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`Block ${i} has been tampered with`);
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log(`Block ${i} has an invalid previous hash`);
        return false;
      }
    }

    return true;
  }

  getChainData() {
    return this.chain.map(block => block.toJSON());
  }

  getBlockByIndex(index) {
    return this.chain[index];
  }

  getChainLength() {
    return this.chain.length;
  }
}
