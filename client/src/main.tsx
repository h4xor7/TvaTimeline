console.log('main.tsx is loading...');

const root = document.getElementById("root");
console.log('Found root element:', root);

if (root) {
  root.innerHTML = `
    <div style="min-height: 100vh; background-color: #0a0a0a; color: #00ff88; padding: 20px; font-family: monospace;">
      <h1>🚀 TVA Portfolio System</h1>
      <p>✅ Basic setup is working!</p>
      <p>📅 ${new Date().toLocaleString()}</p>
    </div>
  `;
  console.log('Successfully rendered basic content');
} else {
  console.error('Could not find root element!');
}
