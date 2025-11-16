# Blockchain-Based Attendance Management System - Architecture

## Overview
A hierarchical blockchain architecture with a main chain linked to 5 specialized sub-chains for managing departments, classes, students, and attendance records. All chains use SHA-256 hashing with Proof of Work (PoW).

## Core Blockchain Components

### 1. Block.js
**Features:**
- SHA-256 hashing via Node.js crypto module
- Proof of Work (PoW) with configurable difficulty
- Mining algorithm: increments nonce until hash starts with required zeros (e.g., '0000' for difficulty 2)
- Block structure: index, timestamp, data, previousHash, hash, nonce

**Methods:**
- `calculateHash()` - Computes SHA-256 hash of block data
- `mineBlock(difficulty)` - Mines block by finding valid hash
- `toJSON()` - Serializes block for transmission/storage

### 2. Chain.js
**Features:**
- Manages linked blocks in a blockchain
- Genesis block creation with optional parent chain hash linkage
- Chain validation with tamper detection
- Difficulty set to 2 (blocks start with '00')

**Methods:**
- `createGenesisBlock()` - Creates first block, optionally linking to parent chain
- `getLatestBlock()` - Returns last block in chain
- `addBlock(data)` - Creates and mines new block
- `isChainValid()` - Validates entire chain integrity
- `getChainData()` - Returns serialized chain
- `getBlockByIndex(index)` - Retrieves specific block
- `getChainLength()` - Returns total block count

### 3. Manager Classes

#### DepartmentManager
Manages department records on a dedicated blockchain.
- Genesis block linked to main chain's last hash
- Records department creation and updates
- Validates chain integrity

#### ClassManager
Manages class records on a dedicated blockchain.
- Genesis block linked to main chain's last hash
- Records class creation and updates
- Validates chain integrity

#### StudentManager
Manages student records on a dedicated blockchain.
- Genesis block linked to main chain's last hash
- Records student creation and updates
- Validates chain integrity

#### AttendanceManager
Manages attendance records on a dedicated blockchain.
- Genesis block linked to main chain's last hash
- Records individual attendance entries
- Supports bulk attendance recording
- Validates chain integrity

### 4. BlockchainService
**Central coordinator for all blockchain operations.**

**Initialization:**
- Creates main chain with genesis block
- Initializes 4 manager instances (Department, Class, Student, Attendance)
- Each manager's genesis block links to main chain's last hash

**Key Methods:**
- `addAttendanceBlock(attendanceData)` - Records single attendance
- `addBulkAttendanceBlock(records)` - Records multiple attendance entries
- `addDepartmentBlock(data)` - Records department
- `addClassBlock(data)` - Records class
- `addStudentBlock(data)` - Records student
- `validateChain()` - Validates all 5 chains
- `getBlockByIndex(chainType, index)` - Retrieves specific block
- `getAllChainStats()` - Returns comprehensive stats for all chains

## Chain Hierarchy

```
Main Chain (Genesis)
    ├── Department Chain (genesis linked to main)
    ├── Class Chain (genesis linked to main)
    ├── Student Chain (genesis linked to main)
    └── Attendance Chain (genesis linked to main)
```

## Data Structure

### Block Data Examples

**Department Block:**
```javascript
{
  type: 'department',
  action: 'create',
  department: { name, code, head },
  timestamp: ISO8601
}
```

**Class Block:**
```javascript
{
  type: 'class',
  action: 'create',
  class: { name, department_id, semester },
  timestamp: ISO8601
}
```

**Attendance Block:**
```javascript
{
  type: 'attendance',
  action: 'record',
  attendance: { student_id, class_id, date, status },
  timestamp: ISO8601
}
```

## Security Features

1. **Immutability:** Any tampering with block data changes hash and breaks chain
2. **Proof of Work:** Mining prevents rapid block creation
3. **Chain Linking:** Child chains reference parent chain hash
4. **Validation:** Full chain integrity checks detect tampering
5. **Transparency:** All operations recorded immutably

## Performance Characteristics

- **Block Mining Time:** ~0.5-1s per block (difficulty 2)
- **Chain Validation:** O(n) where n = number of blocks
- **Hash Computation:** SHA-256 via native Node.js crypto
- **Memory:** In-memory storage suitable for moderate attendance records

## Usage Example

```javascript
import { blockchainService } from './services/blockchainService.js';

// Record a new department
blockchainService.addDepartmentBlock({
  name: 'Computer Science',
  code: 'CS',
  head: 'Dr. Smith'
});

// Record attendance
blockchainService.addAttendanceBlock({
  student_id: 'STU001',
  class_id: 'CLASS001',
  date: '2024-01-15',
  status: 'present'
});

// Get all chain stats
const stats = blockchainService.getAllChainStats();

// Validate all chains
const validation = blockchainService.validateChain();
```

## Integration with Database

BlockchainService provides immutable audit trail. Supabase stores:
- Department/Class/Student master data
- Attendance records
- Blockchain hashes for verification
