import fs from 'fs';
import path from 'path';

const routesDir = path.join(process.cwd(), 'src/routes');

fs.readdirSync(routesDir).forEach(file => {
  if (file.endsWith('.routes.js')) {
    const filePath = path.join(routesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Split content by route blocks
    const chunks = content.split('/**');
    
    for (let i = 1; i < chunks.length; i++) {
      let chunk = chunks[i];
      
      // If the route below this comment block has 'authenticate', it needs security
      const routeCallMatch = chunk.match(/router\.(get|post|put|delete|patch)\([^\)]+\)/);
      if (routeCallMatch && routeCallMatch[0].includes('authenticate')) {
        
        // Check if it already has security
        if (!chunk.includes('security:')) {
          // Insert security block before responses
          chunk = chunk.replace(/(\s+\*\s+responses:)/, '\n *     security:\n *       - bearerAuth: []$1');
          chunks[i] = chunk;
        }
      }
    }
    
    fs.writeFileSync(filePath, chunks.join('/**'));
    console.log(`Processed ${file}`);
  }
});
