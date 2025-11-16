import { Chain } from './Chain.js';

export class ClassManager {
  constructor(parentChainLastHash = '') {
    this.classChain = new Chain(parentChainLastHash);
    this.classChain.createGenesisBlock();
  }

  recordClass(classData) {
    const blockData = {
      type: 'class',
      action: 'create',
      class: classData,
      timestamp: new Date().toISOString()
    };

    return this.classChain.addBlock(blockData);
  }

  updateClass(classId, classData) {
    const blockData = {
      type: 'class',
      action: 'update',
      classId,
      class: classData,
      timestamp: new Date().toISOString()
    };

    return this.classChain.addBlock(blockData);
  }

  getClassChain() {
    return this.classChain.getChainData();
  }

  validateClassChain() {
    return this.classChain.isChainValid();
  }

  getChainStats() {
    return {
      chainType: 'Class',
      totalBlocks: this.classChain.getChainLength(),
      isValid: this.classChain.isChainValid(),
      lastBlockHash: this.classChain.getLatestBlock().hash,
      difficulty: this.classChain.difficulty
    };
  }
}
