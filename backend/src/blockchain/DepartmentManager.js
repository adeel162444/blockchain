import { Chain } from './Chain.js';

export class DepartmentManager {
  constructor(parentChainLastHash = '') {
    this.departmentChain = new Chain(parentChainLastHash);
    this.departmentChain.createGenesisBlock();
  }

  recordDepartment(departmentData) {
    const blockData = {
      type: 'department',
      action: 'create',
      department: departmentData,
      timestamp: new Date().toISOString()
    };

    return this.departmentChain.addBlock(blockData);
  }

  updateDepartment(departmentId, departmentData) {
    const blockData = {
      type: 'department',
      action: 'update',
      departmentId,
      department: departmentData,
      timestamp: new Date().toISOString()
    };

    return this.departmentChain.addBlock(blockData);
  }

  getDepartmentChain() {
    return this.departmentChain.getChainData();
  }

  validateDepartmentChain() {
    return this.departmentChain.isChainValid();
  }

  getChainStats() {
    return {
      chainType: 'Department',
      totalBlocks: this.departmentChain.getChainLength(),
      isValid: this.departmentChain.isChainValid(),
      lastBlockHash: this.departmentChain.getLatestBlock().hash,
      difficulty: this.departmentChain.difficulty
    };
  }
}
