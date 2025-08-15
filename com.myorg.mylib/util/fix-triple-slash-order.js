#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to reorder triple slash directives in the generated index.d.ts file
 * This ensures that TypedJSONModelTypes.d.ts comes before other type definitions
 * to maintain proper dependency order.
 */

function fixTripleSlashOrder() {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.d.ts');
    
    if (!fs.existsSync(indexPath)) {
        console.error('❌ index.d.ts file not found at:', indexPath);
        return false;
    }

    try {
        // Read the file content
        const content = fs.readFileSync(indexPath, 'utf8');
        
        // Split content into lines
        const lines = content.split('\n');
        
        // Find the start of triple slash directives
        let tripleSlashStartIndex = -1;
        let tripleSlashEndIndex = -1;
        const tripleSlashLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('/// <reference')) {
                if (tripleSlashStartIndex === -1) {
                    tripleSlashStartIndex = i;
                }
                tripleSlashLines.push({ index: i, line: lines[i] });
            } else if (tripleSlashStartIndex !== -1 && !line.startsWith('/// <reference')) {
                tripleSlashEndIndex = i;
                break;
            }
        }
        
        if (tripleSlashEndIndex === -1) {
            tripleSlashEndIndex = lines.length;
        }
        
        if (tripleSlashStartIndex === -1) {
            console.log('ℹ️  No triple slash directives found in index.d.ts');
            return true;
        }
        
        // Separate TypedJSONModelTypes from other references
        const typedJSONModelTypesRef = tripleSlashLines.find(ref => 
            ref.line.includes('TypedJSONModelTypes.d.ts')
        );
        
        const otherRefs = tripleSlashLines.filter(ref => 
            !ref.line.includes('TypedJSONModelTypes.d.ts')
        );
        
        if (!typedJSONModelTypesRef) {
            console.log('ℹ️  TypedJSONModelTypes.d.ts reference not found');
            return true;
        }
        
        // Check if reordering is needed
        if (tripleSlashLines[0] === typedJSONModelTypesRef) {
            console.log('ℹ️  TypedJSONModelTypes.d.ts is already at the top - no reordering needed');
            return true;
        }
        
        // Create new content with reordered references
        const beforeTripleSlash = lines.slice(0, tripleSlashStartIndex);
        const afterTripleSlash = lines.slice(tripleSlashEndIndex);
        
        const newTripleSlashLines = [
            typedJSONModelTypesRef.line,
            ...otherRefs.map(ref => ref.line)
        ];
        
        const newContent = [
            ...beforeTripleSlash,
            ...newTripleSlashLines,
            ...afterTripleSlash
        ].join('\n');
        
        // Write the modified content back
        fs.writeFileSync(indexPath, newContent, 'utf8');
        
        console.log('✅ Successfully reordered triple slash directives in index.d.ts');
        console.log('   TypedJSONModelTypes.d.ts is now at the top of the references');
        return true;
        
    } catch (error) {
        console.error('❌ Error fixing triple slash order:', error);
        return false;
    }
}

// Run the fix
const success = fixTripleSlashOrder();
process.exit(success ? 0 : 1);
