const colorInput = document.getElementById('color-input');

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16)
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function updateValues() {
  const hex = colorInput.value;
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  document.getElementById('hex-value').value = hex.toUpperCase();
  document.getElementById('rgb-value').value = `rgb(${r}, ${g}, ${b})`;
  document.getElementById('hsl-value').value = `hsl(${h}, ${s}%, ${l}%)`;
}

colorInput.addEventListener('input', updateValues);

document.getElementById('copy-hex').addEventListener('click', async () => {
  const val = document.getElementById('hex-value').value;
  try {
    await navigator.clipboard.writeText(val);
  } catch {
    document.getElementById('hex-value').select();
    document.execCommand('copy');
  }
  const btn = document.getElementById('copy-hex');
  const orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => { btn.textContent = orig; }, 1500);
});

updateValues();
