/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, HelpCircle, PenTool, Trash2, Cpu } from 'lucide-react';
import './Sandbox.css';

// ── ACTIVATION FUNCTIONS & DERIVATIVES ──────────────────
const activations = {
  relu: {
    fn: (x) => Math.max(0, x),
    der: (x) => (x > 0 ? 1 : 0),
  },
  sigmoid: {
    fn: (x) => 1 / (1 + Math.exp(-x)),
    der: (x) => {
      const s = 1 / (1 + Math.exp(-x));
      return s * (1 - s);
    },
  },
  tanh: {
    fn: (x) => Math.tanh(x),
    der: (x) => 1 - Math.tanh(x) ** 2,
  },
};

// ── DIGIT TEMPLATE STRINGS (8x8 grids parsed at load time)
const TEMPLATE_STRINGS = {
  0: [
    "  ████  ",
    " ██  ██ ",
    "██    ██",
    "██    ██",
    "██    ██",
    "██    ██",
    " ██  ██ ",
    "  ████  "
  ],
  1: [
    "   ██   ",
    "  ███   ",
    "   ██   ",
    "   ██   ",
    "   ██   ",
    "   ██   ",
    "   ██   ",
    "  ████  "
  ],
  2: [
    " ██████ ",
    "██    ██",
    "     ██ ",
    "   ███  ",
    "  ██    ",
    " ██     ",
    "██      ",
    "████████"
  ],
  3: [
    " ██████ ",
    "██    ██",
    "     ██ ",
    "   ███  ",
    "     ██ ",
    "      ██",
    "██    ██",
    " ██████ "
  ],
  4: [
    "   ████ ",
    "  ██ ██ ",
    " ██  ██ ",
    "██   ██ ",
    "████████",
    "     ██ ",
    "     ██ ",
    "     ██ "
  ],
  5: [
    "████████",
    "██      ",
    "██████  ",
    "     ██ ",
    "      ██",
    "      ██",
    "██    ██",
    " ██████ "
  ],
  6: [
    "  ████  ",
    " ██     ",
    "██      ",
    "██████  ",
    "██    ██",
    "██    ██",
    "██    ██",
    " ██████ "
  ],
  7: [
    "████████",
    "██    ██",
    "     ██ ",
    "    ██  ",
    "   ██   ",
    "  ██    ",
    " ██     ",
    "██      "
  ],
  8: [
    " ██████ ",
    "██    ██",
    "██    ██",
    " ██████ ",
    "██    ██",
    "██    ██",
    "██    ██",
    " ██████ "
  ],
  9: [
    " ██████ ",
    "██    ██",
    "██    ██",
    " ███████",
    "      ██",
    "      ██",
    "     ██ ",
    "  ████  "
  ]
};

// Parse digit template strings to binary 8x8 matrices
const parsedTemplates = {};
Object.keys(TEMPLATE_STRINGS).forEach((digit) => {
  const rows = TEMPLATE_STRINGS[digit];
  const tGrid = Array(8).fill(0).map(() => Array(8).fill(0));
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      tGrid[y][x] = rows[y][x] === '█' ? 1.0 : 0.0;
    }
  }
  parsedTemplates[digit] = tGrid;
});

// ── DATASET GENERATORS ──────────────────────────────────
function generateCircleData(numPoints = 160, noise = 0.05) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const isInner = i < numPoints / 2;
    const r = isInner ? Math.random() * 0.7 : Math.random() * 0.6 + 1.2;
    const theta = Math.random() * 2 * Math.PI;
    const x1 = r * Math.cos(theta) + (Math.random() - 0.5) * noise;
    const x2 = r * Math.sin(theta) + (Math.random() - 0.5) * noise;
    points.push({ x: [x1, x2], y: [isInner ? 0 : 1] });
  }
  return points;
}

function generateXORData(numPoints = 160, noise = 0.05) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const x1 = (Math.random() * 2 - 1) * 2; // -2 to 2
    const x2 = (Math.random() * 2 - 1) * 2; // -2 to 2
    const pad = 0.15;
    const adjX1 = x1 + (x1 > 0 ? pad : -pad);
    const adjX2 = x2 + (x2 > 0 ? pad : -pad);
    const label = (x1 * x2 > 0) ? 0 : 1;
    points.push({
      x: [
        adjX1 + (Math.random() - 0.5) * noise,
        adjX2 + (Math.random() - 0.5) * noise
      ],
      y: [label]
    });
  }
  return points;
}

function generateGaussianData(numPoints = 160, noise = 0.05) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const isClass0 = i < numPoints / 2;
    const meanX = isClass0 ? -1.0 : 1.0;
    const meanY = isClass0 ? -1.0 : 1.0;
    const x1 = meanX + (Math.random() - 0.5) * 0.9 + (Math.random() - 0.5) * noise;
    const x2 = meanY + (Math.random() - 0.5) * 0.9 + (Math.random() - 0.5) * noise;
    points.push({ x: [x1, x2], y: [isClass0 ? 0 : 1] });
  }
  return points;
}

function generateSpiralData(numPoints = 160, noise = 0.05) {
  const points = [];
  const half = numPoints / 2;
  // Spiral 1
  for (let i = 0; i < half; i++) {
    const r = (i / half) * 1.8;
    const theta = (i / half) * 2.2 * Math.PI * 1.25;
    const x1 = r * Math.sin(theta) + (Math.random() - 0.5) * noise;
    const x2 = r * Math.cos(theta) + (Math.random() - 0.5) * noise;
    points.push({ x: [x1, x2], y: [0] });
  }
  // Spiral 2
  for (let i = 0; i < half; i++) {
    const r = (i / half) * 1.8;
    const theta = (i / half) * 2.2 * Math.PI * 1.25 + Math.PI;
    const x1 = r * Math.sin(theta) + (Math.random() - 0.5) * noise;
    const x2 = r * Math.cos(theta) + (Math.random() - 0.5) * noise;
    points.push({ x: [x1, x2], y: [1] });
  }
  return points;
}

// ── NEURAL NETWORK MATRICES CONSTRUCTOR ──────────────────
function initNetwork(layerSizes) {
  const weights = [];
  const biases = [];
  for (let i = 1; i < layerSizes.length; i++) {
    const rows = layerSizes[i];
    const cols = layerSizes[i - 1];
    const w = [];
    const b = [];
    // Glorot/Xavier Initialization
    const limit = Math.sqrt(6 / (rows + cols));
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push(Math.random() * 2 * limit - limit);
      }
      w.push(row);
      b.push(0.0);
    }
    weights.push(w);
    biases.push(b);
  }
  return { weights, biases };
}

// Forward Propagation
function forward(network, x, activationName) {
  const act = activations[activationName] || activations.relu;
  const layersA = [x];
  const layersZ = [];
  
  let currentA = x;
  for (let i = 0; i < network.weights.length; i++) {
    const W = network.weights[i];
    const B = network.biases[i];
    const nextZ = [];
    const nextA = [];
    const isOutput = i === network.weights.length - 1;
    
    for (let r = 0; r < W.length; r++) {
      let sum = B[r];
      for (let c = 0; c < W[r].length; c++) {
        sum += W[r][c] * currentA[c];
      }
      nextZ.push(sum);
      if (isOutput) {
        nextA.push(1 / (1 + Math.exp(-sum))); // Sigmoid output for classification
      } else {
        nextA.push(act.fn(sum));
      }
    }
    layersZ.push(nextZ);
    layersA.push(nextA);
    currentA = nextA;
  }
  return { layersA, layersZ };
}

// Backpropagation & gradient descent step
function trainStep(network, batchData, activationName, lr) {
  const numLayers = network.weights.length;
  const accDWeights = network.weights.map((W) => W.map((row) => row.map(() => 0)));
  const accDBiases = network.biases.map((B) => B.map(() => 0));
  
  let totalLoss = 0;
  
  for (const sample of batchData) {
    const { x, y } = sample;
    const { layersA, layersZ } = forward(network, x, activationName);
    const outputA = layersA[layersA.length - 1];
    
    // Binary Cross Entropy Loss
    const eps = 1e-15;
    const loss = - (y[0] * Math.log(outputA[0] + eps) + (1 - y[0]) * Math.log(1 - outputA[0] + eps));
    totalLoss += loss;
    
    // Output Layer Delta: dE/dz = a_L - y
    const delta = [outputA[0] - y[0]];
    let currentDelta = delta;
    
    for (let i = numLayers - 1; i >= 0; i--) {
      const W = network.weights[i];
      const prevA = layersA[i];
      
      for (let r = 0; r < W.length; r++) {
        accDBiases[i][r] += currentDelta[r];
        for (let c = 0; c < W[r].length; c++) {
          accDWeights[i][r][c] += currentDelta[r] * prevA[c];
        }
      }
      
      if (i > 0) {
        const nextDelta = [];
        const prevZ = layersZ[i - 1];
        const act = activations[activationName] || activations.relu;
        
        for (let c = 0; c < W[0].length; c++) {
          let errorSum = 0;
          for (let r = 0; r < W.length; r++) {
            errorSum += W[r][c] * currentDelta[r];
          }
          nextDelta.push(errorSum * act.der(prevZ[c]));
        }
        currentDelta = nextDelta;
      }
    }
  }
  
  // Apply updates (SGD)
  const m = batchData.length;
  for (let i = 0; i < numLayers; i++) {
    for (let r = 0; r < network.weights[i].length; r++) {
      network.biases[i][r] -= lr * (accDBiases[i][r] / m);
      for (let c = 0; c < network.weights[i][r].length; c++) {
        network.weights[i][r][c] -= lr * (accDWeights[i][r][c] / m);
      }
    }
  }
  
  return totalLoss / m;
}

// ── COMPONENT DEFINITION ────────────────────────────────
export default function Sandbox() {
  // ── NEURAL NETWORK PLAYGROUND STATES ──────────────────
  const [datasetType, setDatasetType] = useState('circle');
  const [noise, setNoise] = useState(0.05);
  const [activation, setActivation] = useState('relu');
  const [learningRate, setLearningRate] = useState(0.1);
  const [hiddenLayers, setHiddenLayers] = useState([4, 4]); // default 2 hidden layers
  
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(null);
  const [lossHistory, setLossHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  
  const [networkState, setNetworkState] = useState(null);
  const [dataset, setDataset] = useState([]);
  
  const networkRef = useRef(null);
  const canvasRef = useRef(null);

  // Boundary Draw Function
  const drawBoundary = useCallback((canvas, net) => {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Performance optimization: render 4x4 coordinate chunks to save CPU cycles
    const gridRes = 4;
    for (let px = 0; px < w; px += gridRes) {
      for (let py = 0; py < h; py += gridRes) {
        const x1 = -2.5 + 5.0 * (px / w);
        const x2 = 2.5 - 5.0 * (py / h);
        
        const { layersA } = forward(net, [x1, x2], activation);
        const p = layersA[layersA.length - 1][0];
        
        // Blend colors between:
        // Class 0: Electric Cyan (#00E5FF)
        // Wisconsin Red (#C5050C)
        const r = Math.round(0 + p * (197 - 0));
        const g = Math.round(229 + p * (5 - 229));
        const b = Math.round(255 + p * (12 - 255));
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(px, py, gridRes, gridRes);
      }
    }
    
    // Draw scatter points
    dataset.forEach((pt) => {
      const [x1, x2] = pt.x;
      const label = pt.y[0];
      
      const px = ((x1 + 2.5) / 5.0) * w;
      const py = ((2.5 - x2) / 5.0) * h;
      
      ctx.beginPath();
      ctx.arc(px, py, 5.5, 0, 2 * Math.PI);
      ctx.fillStyle = label === 1 ? '#C5050C' : '#00E5FF';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.fill();
      ctx.stroke();
    });
  }, [dataset, activation]);
  
  // Initialize dataset
  useEffect(() => {
    let data;
    if (datasetType === 'circle') data = generateCircleData(160, noise);
    else if (datasetType === 'xor') data = generateXORData(160, noise);
    else if (datasetType === 'gaussian') data = generateGaussianData(160, noise);
    else data = generateSpiralData(160, noise);
    
    setDataset(data);
    setEpoch(0);
    setLoss(null);
    setLossHistory([]);
    setIsRunning(false);
  }, [datasetType, noise]);
  
  // Initialize network matrices when layers count changes
  useEffect(() => {
    const sizes = [2, ...hiddenLayers, 1];
    const net = initNetwork(sizes);
    networkRef.current = net;
    setNetworkState(JSON.parse(JSON.stringify(net)));
    setEpoch(0);
    setLoss(null);
    setLossHistory([]);
    setIsRunning(false);
  }, [hiddenLayers]);
  
  // Force boundary canvas repaint when networkState or dataset updates
  useEffect(() => {
    if (networkState && canvasRef.current) {
      drawBoundary(canvasRef.current, networkState);
    }
  }, [networkState, drawBoundary]);
  
  // Training loop execution
  useEffect(() => {
    if (!isRunning) return;
    
    let animId;
    const loop = () => {
      const net = networkRef.current;
      if (!net) return;
      
      let currentLoss = 0;
      // Run 6 epochs per frame for smooth real-time visual velocity
      for (let e = 0; e < 6; e++) {
        const shuffled = [...dataset].sort(() => Math.random() - 0.5);
        const batchSize = 16;
        for (let i = 0; i < shuffled.length; i += batchSize) {
          const batch = shuffled.slice(i, i + batchSize);
          currentLoss = trainStep(net, batch, activation, learningRate);
        }
      }
      
      setNetworkState({
        weights: net.weights.map((w) => w.map((r) => [...r])),
        biases: net.biases.map((b) => [...b]),
      });
      setEpoch((prev) => prev + 6);
      setLoss(currentLoss);
      setLossHistory((prev) => {
        const next = [...prev, currentLoss];
        if (next.length > 120) next.shift();
        return next;
      });
      
      animId = requestAnimationFrame(loop);
    };
    
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, dataset, activation, learningRate]);
  
  // Handlers for NN hidden layers designer
  const addLayer = () => {
    if (hiddenLayers.length < 3) {
      setHiddenLayers([...hiddenLayers, 4]);
    }
  };
  
  const removeLayer = () => {
    if (hiddenLayers.length > 0) {
      setHiddenLayers(hiddenLayers.slice(0, -1));
    }
  };
  
  const updateNeuronCount = (index, delta) => {
    const copy = [...hiddenLayers];
    copy[index] = Math.max(1, Math.min(8, copy[index] + delta));
    setHiddenLayers(copy);
  };
  
  const handleReset = () => {
    const sizes = [2, ...hiddenLayers, 1];
    const net = initNetwork(sizes);
    networkRef.current = net;
    setNetworkState(JSON.parse(JSON.stringify(net)));
    setEpoch(0);
    setLoss(null);
    setLossHistory([]);
    setIsRunning(false);
  };
  
  const handleStep = () => {
    const net = networkRef.current;
    if (!net) return;
    
    let currentLoss = 0;
    const shuffled = [...dataset].sort(() => Math.random() - 0.5);
    const batchSize = 16;
    for (let i = 0; i < shuffled.length; i += batchSize) {
      const batch = shuffled.slice(i, i + batchSize);
      currentLoss = trainStep(net, batch, activation, learningRate);
    }
    
    setNetworkState({
      weights: net.weights.map((w) => w.map((r) => [...r])),
      biases: net.biases.map((b) => [...b]),
    });
    setEpoch((prev) => prev + 1);
    setLoss(currentLoss);
    setLossHistory((prev) => {
      const next = [...prev, currentLoss];
      if (next.length > 120) next.shift();
      return next;
    });
  };
  
  // ── DIGIT RECOGNITION CANVAS STATES ────────────────────
  const digitCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [predictions, setPredictions] = useState(Array(10).fill(0));
  const [featureGrid, setFeatureGrid] = useState(Array(8).fill(0).map(() => Array(8).fill(0)));
  const [metrics, setMetrics] = useState({
    aspectRatio: 0,
    cx: 0.5,
    cy: 0.5,
    density: 0,
  });
  
  // Draw stroke operations
  const startDrawing = (e) => {
    const canvas = digitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Retrieve coordinates based on touch or mouse event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    setIsDrawing(true);
    e.preventDefault();
  };
  
  const drawStroke = (e) => {
    if (!isDrawing) return;
    const canvas = digitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Analyze digit in real-time
    analyzeDrawing();
    e.preventDefault();
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const clearDigitCanvas = () => {
    const canvas = digitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setPredictions(Array(10).fill(0));
    setFeatureGrid(Array(8).fill(0).map(() => Array(8).fill(0)));
    setMetrics({
      aspectRatio: 0,
      cx: 0.5,
      cy: 0.5,
      density: 0,
    });
  };
  
  // Analyze drawings inside canvas
  const analyzeDrawing = () => {
    const canvas = digitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    
    let minX = w, maxX = 0, minY = h, maxY = 0;
    let hasPixels = false;
    
    // Scan alpha channel to locate bounding box
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const red = data[idx];       // white on black, so r=g=b=alpha
        if (red > 20) {
          hasPixels = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    if (!hasPixels) return;
    
    // Add dynamic padding to the bounding box
    const padding = 12;
    minX = Math.max(0, minX - padding);
    maxX = Math.min(w - 1, maxX + padding);
    minY = Math.max(0, minY - padding);
    maxY = Math.min(h - 1, maxY + padding);
    
    const bw = maxX - minX + 1;
    const bh = maxY - minY + 1;
    const aspectRatio = bw / bh;
    
    // Project and downsample bounding box to 8x8 density grid
    const grid = Array(8).fill(0).map(() => Array(8).fill(0));
    
    for (let gy = 0; gy < 8; gy++) {
      for (let gx = 0; gx < 8; gx++) {
        const xStart = Math.floor(minX + (gx / 8) * bw);
        const xEnd = Math.ceil(minX + ((gx + 1) / 8) * bw);
        const yStart = Math.floor(minY + (gy / 8) * bh);
        const yEnd = Math.ceil(minY + ((gy + 1) / 8) * bh);
        
        let sum = 0;
        let count = 0;
        
        for (let y = yStart; y < yEnd; y++) {
          for (let x = xStart; x < xEnd; x++) {
            if (x >= 0 && x < w && y >= 0 && y < h) {
              const idx = (y * w + x) * 4;
              sum += data[idx]; // Red channel brightness
              count++;
            }
          }
        }
        grid[gy][gx] = count > 0 ? (sum / count) / 255 : 0;
      }
    }
    
    setFeatureGrid(grid);
    
    // Calculate centroid values
    let sumX = 0, sumY = 0, totalDensity = 0;
    for (let gy = 0; gy < 8; gy++) {
      for (let gx = 0; gx < 8; gx++) {
        const val = grid[gy][gx];
        sumX += gx * val;
        sumY += gy * val;
        totalDensity += val;
      }
    }
    
    const cx = totalDensity > 0 ? (sumX / totalDensity) / 7 : 0.5;
    const cy = totalDensity > 0 ? (sumY / totalDensity) / 7 : 0.5;
    const density = totalDensity / 64;
    
    setMetrics({
      aspectRatio,
      cx,
      cy,
      density,
    });
    
    // Compute digit scores
    const probs = evaluateDigitHeuristics({ grid, cx, cy, bw, bh, density });
    setPredictions(probs);
  };
  
  // Mathematical Heuristics Classifier
  const evaluateDigitHeuristics = (features) => {
    const { grid, cy, bw, bh } = features;
    const scores = Array(10).fill(0);
    
    // Step 1: Compute Cosine Similarity with standard 8x8 templates
    for (let d = 0; d < 10; d++) {
      const t = parsedTemplates[d];
      let dotProduct = 0;
      let normG = 0;
      let normT = 0;
      
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          dotProduct += grid[y][x] * t[y][x];
          normG += grid[y][x] * grid[y][x];
          normT += t[y][x] * t[y][x];
        }
      }
      
      let cosSim = 0;
      if (normG > 0 && normT > 0) {
        cosSim = dotProduct / (Math.sqrt(normG) * Math.sqrt(normT));
      }
      scores[d] = cosSim;
    }
    
    // Step 2: Apply topological / aspect-ratio tweaks
    const aspectRatio = bw / bh;
    
    // Digit 1 is vertical and thin
    if (aspectRatio < 0.45) {
      scores[1] += 0.4;
      // Penalize wide digits
      scores[0] -= 0.35;
      scores[8] -= 0.35;
      scores[2] -= 0.25;
      scores[3] -= 0.25;
      scores[5] -= 0.25;
      scores[6] -= 0.25;
      scores[9] -= 0.25;
    } else {
      scores[1] -= 0.3;
    }
    
    // Top-heavy features (like 7 and 9)
    if (cy < 0.43) {
      scores[7] += 0.18;
      scores[9] += 0.12;
      scores[6] -= 0.2;
    }
    
    // Bottom-heavy features (like 6)
    if (cy > 0.57) {
      scores[6] += 0.2;
      scores[2] += 0.1;
      scores[7] -= 0.25;
      scores[9] -= 0.15;
    }
    
    // Outer loop hole check (Center emptiness for 0)
    let centerDensity = 0;
    for (let y = 2; y <= 5; y++) {
      for (let x = 2; x <= 5; x++) {
        centerDensity += grid[y][x];
      }
    }
    centerDensity /= 16;
    
    if (centerDensity < 0.15 && aspectRatio > 0.5) {
      scores[0] += 0.25;
      scores[8] -= 0.25;
      scores[4] -= 0.2;
    }
    
    // Left vs Right pixel symmetry
    let leftWeight = 0;
    let rightWeight = 0;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 4; x++) leftWeight += grid[y][x];
      for (let x = 4; x < 8; x++) rightWeight += grid[y][x];
    }
    
    const lrRatio = leftWeight / (rightWeight + 1e-5);
    if (lrRatio > 1.65) {
      scores[5] += 0.1;
      scores[6] += 0.1;
      scores[3] -= 0.2;
    } else if (lrRatio < 0.6) {
      scores[3] += 0.1;
      scores[9] += 0.1;
      scores[7] += 0.08;
      scores[5] -= 0.2;
    }
    
    // Softmax scaling to shape raw similarities into distinct confidence scores
    const tempScale = 8.5;
    const expScores = scores.map((s) => Math.exp(Math.max(-5, Math.min(5, s * tempScale))));
    const sumExp = expScores.reduce((a, b) => a + b, 0);
    const probs = expScores.map((val) => val / sumExp);
    
    return probs;
  };
  
  // Format prediction probabilities
  const sortedPredictions = predictions
    .map((prob, digit) => ({ digit, prob }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 3);
  
  // ── SVG NN LAYERS CALCULATOR ────────────────────────────
  const renderNNArchitecture = () => {
    if (!networkState) return null;
    
    const svgW = 340;
    const svgH = 200;
    const pad = 25;
    const neuronRadius = 9;
    const layers = [2, ...hiddenLayers, 1];
    
    const xPositions = layers.map((_, i) => pad + i * (svgW - 2 * pad) / (layers.length - 1));
    
    const nodeY = (nLayer, nodeIdx) => {
      const spacing = 22;
      return svgH / 2 + (nodeIdx - (nLayer - 1) / 2) * spacing;
    };
    
    const lines = [];
    const circles = [];
    
    // Add weights lines
    for (let l = 0; l < networkState.weights.length; l++) {
      const W = networkState.weights[l];
      const x1 = xPositions[l];
      const x2 = xPositions[l + 1];
      const n1 = layers[l];
      const n2 = layers[l + 1];
      
      for (let c = 0; c < n1; c++) {
        const y1 = nodeY(n1, c);
        for (let r = 0; r < n2; r++) {
          const y2 = nodeY(n2, r);
          const weight = W[r][c];
          
          // Color based on weight sign, stroke-width based on magnitude
          const strokeColor = weight > 0 ? '#00E5FF' : '#C5050C';
          const strokeWidth = Math.max(0.4, Math.min(3.5, Math.abs(weight) * 1.5));
          const opacity = Math.min(0.9, 0.12 + Math.abs(weight) * 0.35);
          
          lines.push(
            <line
              key={`line-${l}-${c}-${r}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeOpacity={opacity}
            />
          );
        }
      }
    }
    
    // Add neurons circles
    for (let l = 0; l < layers.length; l++) {
      const n = layers[l];
      const x = xPositions[l];
      
      for (let j = 0; j < n; j++) {
        const y = nodeY(n, j);
        const isInput = l === 0;
        const isOutput = l === layers.length - 1;
        
        // Coloring neurons based on bias values
        let strokeColor = 'var(--atmos-hairline)';
        if (!isInput) {
          const bias = networkState.biases[l - 1][j];
          strokeColor = bias > 0 ? '#00E5FF' : '#C5050C';
        }
        
        let label = '';
        if (isInput) label = j === 0 ? 'X₁' : 'X₂';
        if (isOutput) label = 'Y';
        
        circles.push(
          <g key={`node-${l}-${j}`} className="nn-node-g">
            <circle
              cx={x}
              cy={y}
              r={neuronRadius}
              fill="var(--atmos-paper-deep)"
              stroke={strokeColor}
              strokeWidth="2"
            />
            {label && (
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="8px"
                fontWeight="700"
                fill="var(--atmos-ink)"
              >
                {label}
              </text>
            )}
          </g>
        );
      }
    }
    
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${svgW} ${svgH}`} className="nn-svg">
        {lines}
        {circles}
      </svg>
    );
  };
  
  return (
    <main className="atmos-root atmos-sandbox">
      <div className="atmos-shell">
        
        {/* Header Section */}
        <section className="atmos-sandbox-header">
          <span className="sandbox-label" aria-hidden="true">Interactive Labs</span>
          <h1 className="sandbox-title">AI Sandbox</h1>
          <p className="sandbox-subtitle">
            Explore neural foundations and mathematical algorithms running fully in your browser with zero server latency.
          </p>
        </section>
        
        {/* Dashboard Grid */}
        <div className="sandbox-grid">
          
          {/* Column 1: Neural Network Playground */}
          <article className="sandbox-card">
            <div className="card-title-wrap">
              <Cpu className="card-icon" size={24} />
              <div>
                <h2 className="card-heading">Neural Network Playground</h2>
                <p className="card-desc">Visualize decision boundary evolution and loss metrics live.</p>
              </div>
            </div>
            
            {/* NN Controls */}
            <div className="nn-controls-row">
              <div className="nn-control-group">
                <label htmlFor="nn-dataset">Dataset</label>
                <select
                  id="nn-dataset"
                  className="nn-select"
                  value={datasetType}
                  onChange={(e) => setDatasetType(e.target.value)}
                >
                  <option value="circle">Circle / Ring</option>
                  <option value="xor">XOR / Quadrants</option>
                  <option value="gaussian">Gaussian Clusters</option>
                  <option value="spiral">Interlinked Spirals</option>
                </select>
              </div>
              
              <div className="nn-control-group">
                <label htmlFor="nn-noise">Noise ({noise})</label>
                <input
                  id="nn-noise"
                  type="range"
                  min="0.0"
                  max="0.25"
                  step="0.05"
                  className="nn-input"
                  value={noise}
                  onChange={(e) => setNoise(parseFloat(e.target.value))}
                />
              </div>
              
              <div className="nn-control-group">
                <label htmlFor="nn-activation">Activation</label>
                <select
                  id="nn-activation"
                  className="nn-select"
                  value={activation}
                  onChange={(e) => setActivation(e.target.value)}
                >
                  <option value="relu">ReLU</option>
                  <option value="sigmoid">Sigmoid</option>
                  <option value="tanh">Tanh</option>
                </select>
              </div>
              
              <div className="nn-control-group">
                <label htmlFor="nn-lr">Learning Rate</label>
                <select
                  id="nn-lr"
                  className="nn-select"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                >
                  <option value={0.01}>0.01</option>
                  <option value={0.03}>0.03</option>
                  <option value={0.1}>0.1</option>
                  <option value={0.3}>0.3</option>
                </select>
              </div>
            </div>
            
            {/* Hidden Layers Config */}
            <div className="nn-layers-designer">
              <div className="nn-layers-header">
                <h4>Hidden Layers Configuration</h4>
                <div className="layer-actions">
                  <button
                    type="button"
                    className="layer-btn"
                    onClick={removeLayer}
                    disabled={hiddenLayers.length === 0 || isRunning}
                  >
                    - Remove Layer
                  </button>
                  <button
                    type="button"
                    className="layer-btn"
                    onClick={addLayer}
                    disabled={hiddenLayers.length >= 3 || isRunning}
                  >
                    + Add Layer
                  </button>
                </div>
              </div>
              
              <div className="nn-layers-list">
                <div className="nn-layer-pill">
                  <span className="nn-layer-name">Input (2 nodes)</span>
                </div>
                {hiddenLayers.map((count, index) => (
                  <React.Fragment key={`layer-config-${index}`}>
                    <span className="nn-layer-arrow" aria-hidden="true">→</span>
                    <div className="nn-layer-pill">
                      <span className="nn-layer-name">Hidden {index + 1}</span>
                      <div className="nn-neuron-counter">
                        <button
                          type="button"
                          className="counter-btn"
                          onClick={() => updateNeuronCount(index, -1)}
                          disabled={count <= 1 || isRunning}
                          aria-label="Decrease neurons"
                        >
                          -
                        </button>
                        <span className="neuron-count">{count}</span>
                        <button
                          type="button"
                          className="counter-btn"
                          onClick={() => updateNeuronCount(index, 1)}
                          disabled={count >= 8 || isRunning}
                          aria-label="Increase neurons"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <span className="nn-layer-arrow" aria-hidden="true">→</span>
                <div className="nn-layer-pill">
                  <span className="nn-layer-name">Output (1 node)</span>
                </div>
              </div>
            </div>
            
            {/* Visuals Split */}
            <div className="nn-visuals-split">
              
              {/* Left boundary canvas */}
              <div className="nn-panel-left">
                <div className="boundary-canvas-container">
                  <canvas
                    ref={canvasRef}
                    className="boundary-canvas"
                    width={260}
                    height={260}
                    aria-label="Decision boundary grid canvas scatter"
                  />
                </div>
                
                <div className="nn-train-buttons">
                  {isRunning ? (
                    <button
                      type="button"
                      className="nn-btn nn-btn-pause"
                      onClick={() => setIsRunning(false)}
                    >
                      <Pause size={16} /> Pause
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="nn-btn nn-btn-train"
                      onClick={() => setIsRunning(true)}
                    >
                      <Play size={16} /> Train
                    </button>
                  )}
                  
                  <button
                    type="button"
                    className="nn-btn nn-btn-step"
                    onClick={handleStep}
                    disabled={isRunning}
                    title="Train for 1 epoch"
                  >
                    Step
                  </button>
                  
                  <button
                    type="button"
                    className="nn-btn nn-btn-reset"
                    onClick={handleReset}
                    title="Re-initialize weights"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
                
                <div className="nn-status-banner">
                  <div className="status-stat">
                    <span>Epoch</span>
                    <span>{epoch}</span>
                  </div>
                  <div className="status-stat">
                    <span>Training Loss</span>
                    <span>{loss !== null ? loss.toFixed(4) : '—'}</span>
                  </div>
                </div>
              </div>
              
              {/* Right visualizer SVG & Chart */}
              <div className="nn-panel-right">
                <div className="nn-architecture-svg-wrap">
                  {renderNNArchitecture()}
                </div>
                
                <div className="loss-chart-card">
                  <div className="chart-header">
                    <h5 className="chart-title">Loss History Curve</h5>
                    {lossHistory.length > 0 && (
                      <span className="chart-value">{lossHistory[lossHistory.length - 1].toFixed(5)}</span>
                    )}
                  </div>
                  <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end' }}>
                    {lossHistory.length > 1 ? (
                      <svg width="100%" height="80" viewBox="0 0 250 80" className="loss-svg" preserveAspectRatio="none">
                        <path
                          d={lossHistory.map((l, i) => {
                            const x = (i / (lossHistory.length - 1)) * 250;
                            const maxL = Math.max(...lossHistory, 0.4);
                            const minL = Math.min(...lossHistory, 0);
                            const range = maxL - minL || 1;
                            const y = 70 - ((l - minL) / range) * 60;
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          fill="none"
                          stroke="var(--atmos-accent)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <div style={{ color: 'var(--atmos-ink-mute)', fontSize: '11px', margin: 'auto' }}>
                        Click Train to begin plotting loss.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
          </article>
          
          {/* Column 2: Digit Recognition Canvas */}
          <article className="sandbox-card">
            <div className="card-title-wrap">
              <PenTool className="card-icon" size={24} />
              <div>
                <h2 className="card-heading">Digit Recognition Canvas</h2>
                <p className="card-desc">Draw a digit (0-9) to run heuristic template matches.</p>
              </div>
            </div>
            
            <div className="digit-layout">
              {/* Canvas Board */}
              <div className="digit-canvas-row">
                <div className="canvas-container">
                  <canvas
                    ref={digitCanvasRef}
                    className="digit-canvas"
                    width={280}
                    height={280}
                    onMouseDown={startDrawing}
                    onMouseMove={drawStroke}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={drawStroke}
                    onTouchEnd={stopDrawing}
                    aria-label="Digit drawing board"
                  />
                </div>
                
                <div className="canvas-controls">
                  <button
                    type="button"
                    className="canvas-btn canvas-btn-clear"
                    onClick={clearDigitCanvas}
                  >
                    <Trash2 size={15} /> Clear Canvas
                  </button>
                </div>
              </div>
              
              {/* Predictor Outcomes */}
              <div className="digit-predictions-row">
                <h3 className="predictions-header">Top 3 Heuristic Matches</h3>
                
                <div className="prob-bars-list">
                  {sortedPredictions.map((pred, i) => (
                    <div key={`pred-${pred.digit}`} className="prob-item">
                      <div className="prob-digit">{pred.digit}</div>
                      <div className="prob-track-wrap">
                        <div className="prob-track">
                          <div
                            className={`prob-fill ${i === 0 ? 'prob-fill-primary' : 'prob-fill-secondary'}`}
                            style={{ width: `${pred.prob * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="prob-value">{(pred.prob * 100).toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
                
                {/* 8x8 Feature Grid visualizer */}
                <h4 className="feature-grid-title">Downsampled 8x8 Feature Grid</h4>
                <div className="feature-grid-visualizer">
                  <div className="feature-grid-8x8" aria-label="8 by 8 downsampled grid visualization">
                    {featureGrid.map((row, y) =>
                      row.map((val, x) => (
                        <div
                          key={`cell-${y}-${x}`}
                          className="grid-cell"
                          style={{
                            background: `rgba(255, 255, 255, ${val})`
                          }}
                        />
                      ))
                    )}
                  </div>
                  
                  <div className="feature-grid-metrics">
                    <div className="metric-row">
                      <span>Aspect W/H:</span>
                      <span className="metric-val">{metrics.aspectRatio.toFixed(2)}</span>
                    </div>
                    <div className="metric-row">
                      <span>Centroid X:</span>
                      <span className="metric-val">{metrics.cx.toFixed(2)}</span>
                    </div>
                    <div className="metric-row">
                      <span>Centroid Y:</span>
                      <span className="metric-val">{metrics.cy.toFixed(2)}</span>
                    </div>
                    <div className="metric-row">
                      <span>Density Avg:</span>
                      <span className="metric-val">{(metrics.density * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="digit-explanation">
                  <HelpCircle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  Calculates <strong>Cosine Similarity</strong> on the downsampled 8x8 grid against human-drawn templates, adjusted dynamically by aspect ratio, centroid, and center pixel density heuristics.
                </div>
              </div>
            </div>
          </article>
          
        </div>
      </div>
    </main>
  );
}
