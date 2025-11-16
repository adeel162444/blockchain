import crypto from 'crypto';

export class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
    this.nonce = 0;
  }

  calculateHash() {
    const blockData = JSON.stringify({
      index: this.index,
      timestamp: this.timestamp,
      data: this.data,
      previousHash: this.previousHash,
      nonce: this.nonce
    });

    return crypto
      .createHash('sha256')
      .update(blockData)
      .digest('hex');
  }

  mineBlock(difficulty) {
    const target = '0'.repeat(difficulty);

    while (!this.hash.startsWith(target)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }

  toJSON() {
    return {
      index: this.index,
      timestamp: this.timestamp,
      data: this.data,
      previousHash: this.previousHash,
      hash: this.hash,
      nonce: this.nonce
    };
  }
}
