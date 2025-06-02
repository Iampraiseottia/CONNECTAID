
// const verificationCodes = new Map();

// export { verificationCodes }; 


// lib/verificationStorage.js
import fs from 'fs';
import path from 'path';

const STORAGE_FILE = path.join(process.cwd(), 'temp', 'verification-codes.json');

// Ensure temp directory exists
const tempDir = path.dirname(STORAGE_FILE);
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

class VerificationStorage {
  constructor() {
    this.memoryStorage = new Map();
    this.loadFromFile();
  }

  loadFromFile() {
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const data = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
        const now = Date.now();
        
        // Load non-expired codes
        Object.entries(data).forEach(([email, codeData]) => {
          if (codeData.expiresAt > now) {
            this.memoryStorage.set(email, codeData);
          }
        });
        
        console.log(`📁 Loaded ${this.memoryStorage.size} verification codes from file`);
      }
    } catch (error) {
      console.error('Error loading verification codes from file:', error);
    }
  }

  saveToFile() {
    try {
      const data = Object.fromEntries(this.memoryStorage);
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
      console.log('💾 Verification codes saved to file');
    } catch (error) {
      console.error('Error saving verification codes to file:', error);
    }
  }

  set(email, codeData) {
    this.memoryStorage.set(email, codeData);
    this.saveToFile();
    console.log(`🔑 Stored verification code for ${email}, expires at ${new Date(codeData.expiresAt).toISOString()}`);
  }

  get(email) {
    const data = this.memoryStorage.get(email);
    
    if (data) {
      // Check if expired
      if (Date.now() > data.expiresAt) {
        this.delete(email);
        return null;
      }
    }
    
    console.log(`🔍 Retrieved verification code for ${email}:`, data ? 'found' : 'not found');
    return data;
  }

  delete(email) {
    const deleted = this.memoryStorage.delete(email);
    if (deleted) {
      this.saveToFile();
      console.log(`🗑️ Deleted verification code for ${email}`);
    }
    return deleted;
  }

  // Clean up expired codes
  cleanup() {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [email, data] of this.memoryStorage.entries()) {
      if (now > data.expiresAt) {
        this.memoryStorage.delete(email);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      this.saveToFile();
      console.log(`🧹 Cleaned up ${cleaned} expired verification codes`);
    }
  }
}

// Create singleton instance
export const verificationCodes = new VerificationStorage();

// Clean up expired codes every 5 minutes
setInterval(() => {
  verificationCodes.cleanup();
}, 5 * 60 * 1000);