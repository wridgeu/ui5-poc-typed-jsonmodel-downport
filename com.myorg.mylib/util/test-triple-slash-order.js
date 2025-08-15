#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Simple test script to verify the triple slash directive order
 */

function testTripleSlashOrder() {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.d.ts');
    
    if (!fs.existsSync(indexPath)) {
        console.error('❌ index.d.ts file not found');
        return false;
    }

    try {
        const content = fs.readFileSync(indexPath, 'utf8');
        const lines = content.split('\n');
        
        // Find triple slash directives
        const tripleSlashLines = lines.filter(line => 
            line.trim().startsWith('/// <reference')
        );
        
        if (tripleSlashLines.length === 0) {
            console.log('ℹ️  No triple slash directives found');
            return true;
        }
        
        // Check if TypedJSONModelTypes.d.ts is first
        const firstRef = tripleSlashLines[0];
        if (firstRef.includes('TypedJSONModelTypes.d.ts')) {
            console.log('✅ TypedJSONModelTypes.d.ts is correctly positioned at the top');
            console.log('   Order of references:');
            tripleSlashLines.forEach((line, index) => {
                const match = line.match(/path="([^"]+)"/);
                const fileName = match ? match[1].split('/').pop() : 'unknown';
                console.log(`   ${index + 1}. ${fileName}`);
            });
            return true;
        } else {
            console.error('❌ TypedJSONModelTypes.d.ts is not at the top');
            console.log('   Current order:');
            tripleSlashLines.forEach((line, index) => {
                const match = line.match(/path="([^"]+)"/);
                const fileName = match ? match[1].split('/').pop() : 'unknown';
                console.log(`   ${index + 1}. ${fileName}`);
            });
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error testing triple slash order:', error);
        return false;
    }
}

// Run the test
const success = testTripleSlashOrder();
process.exit(success ? 0 : 1);
