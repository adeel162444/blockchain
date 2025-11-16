import { Chain } from './Chain.js';

export class StudentManager {
  constructor(parentChainLastHash = '') {
    this.studentChain = new Chain(parentChainLastHash);
    this.studentChain.createGenesisBlock();
  }

  recordStudent(studentData) {
    const blockData = {
      type: 'student',
      action: 'create',
      student: studentData,
      timestamp: new Date().toISOString()
    };

    return this.studentChain.addBlock(blockData);
  }

  updateStudent(studentId, studentData) {
    const blockData = {
      type: 'student',
      action: 'update',
      studentId,
      student: studentData,
      timestamp: new Date().toISOString()
    };

    return this.studentChain.addBlock(blockData);
  }

  getStudentChain() {
    return this.studentChain.getChainData();
  }

  validateStudentChain() {
    return this.studentChain.isChainValid();
  }

  getChainStats() {
    return {
      chainType: 'Student',
      totalBlocks: this.studentChain.getChainLength(),
      isValid: this.studentChain.isChainValid(),
      lastBlockHash: this.studentChain.getLatestBlock().hash,
      difficulty: this.studentChain.difficulty
    };
  }
}
