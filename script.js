const canvas = document.getElementById('displayCanvas');
const ctx = canvas.getContext('2d');

let textBuffer = "";

function renderCanvas() {
  // Clear the canvas on every update
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Styling text inside canvas
  ctx.font = '28px monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.textBaseline = 'top';

  if (textBuffer.length === 0) {
    ctx.fillStyle = '#64748b';
    ctx.fillText("Type anything to see it appear here...", 30, 40);
    return;
  }

  // Handle multi-line wrapping
  const maxWidth = canvas.width - 60;
  const lineHeight = 36;
  let startX = 30;
  let startY = 40;
  let currentLine = '';

  for (let i = 0; i < textBuffer.length; i++) {
    const char = textBuffer[i];

    if (char === '\n') {
      ctx.fillText(currentLine, startX, startY);
      currentLine = '';
      startY += lineHeight;
      continue;
    }

    const testLine = currentLine + char;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(currentLine, startX, startY);
      currentLine = char;
      startY += lineHeight;
    } else {
      currentLine = testLine;
    }
  }

  ctx.fillText(currentLine, startX, startY);
}

// Initial draw showing placeholder
renderCanvas();

// Keyboard event listener (keybinding)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    textBuffer = textBuffer.slice(0, -1);
  } else if (e.key === 'Enter') {
    textBuffer += '\n';
  } else if (e.key.length === 1) {
    // Only capture readable characters (ignores Shift, Alt, Ctrl, etc.)
    textBuffer += e.key;
  }

  renderCanvas();
});