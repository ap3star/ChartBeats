// ============================================
// Data-to-Music Graph Visualizer Application
// Enhanced with Continuous Live Data & Note Tracking
// ============================================

class DataMusicVisualizer {
    constructor() {
        // Application data from JSON
        this.sampleDatasets = {
            stockPrices: {
                name: "Stock Price Simulation",
                description: "Simulated stock price movements over 100 time periods",
                data: [100, 102.5, 101.8, 105.2, 103.7, 108.1, 106.5, 111.3, 109.8, 114.2, 112.1, 115.8, 113.4, 118.7, 116.2, 121.5, 119.3, 124.1, 122.8, 127.4, 125.6, 130.2, 128.9, 133.5, 131.7, 136.8, 134.2, 139.1, 137.5, 142.3, 140.8, 145.6, 143.2, 148.9, 146.7, 151.4, 149.8, 154.2, 152.6, 157.8, 155.1, 160.5, 158.9, 163.7, 161.4, 166.8, 164.5, 169.2, 167.6, 172.1, 170.3, 175.7, 173.8, 178.4, 176.9, 181.6, 179.2, 184.5, 182.7, 187.9, 185.4, 190.8, 188.6, 193.2, 191.7, 196.5, 194.1, 199.8, 197.3, 202.6, 200.9, 205.4, 203.8, 208.1, 206.5, 211.7, 209.2, 214.8, 212.4, 217.6, 215.9, 220.5, 218.7, 223.8, 221.2, 226.9, 224.5, 229.7, 227.8, 232.4, 230.6, 235.9, 233.1, 238.5, 236.8, 241.2, 239.4, 244.7, 242.1, 247.8]
            },
            temperature: {
                name: "Daily Temperature",
                description: "Temperature variations throughout a 24-hour period",
                data: [58, 57, 56, 55, 54, 53, 54, 56, 59, 62, 66, 70, 74, 77, 80, 82, 84, 85, 84, 82, 79, 75, 71, 67, 64, 61, 59]
            },
            sineWave: {
                name: "Sine Wave",
                description: "Mathematical sine wave pattern",
                data: [0, 0.31, 0.59, 0.81, 0.95, 1.00, 0.95, 0.81, 0.59, 0.31, 0.00, -0.31, -0.59, -0.81, -0.95, -1.00, -0.95, -0.81, -0.59, -0.31, 0.00, 0.31, 0.59, 0.81, 0.95, 1.00, 0.95, 0.81, 0.59, 0.31, 0.00, -0.31, -0.59, -0.81, -0.95, -1.00, -0.95, -0.81, -0.59, -0.31]
            },
            randomWalk: {
                name: "Random Walk",
                description: "Brownian motion-style random data",
                data: [50, 51.2, 49.8, 52.1, 50.7, 53.4, 51.9, 54.8, 53.2, 56.1, 54.5, 57.3, 55.8, 58.9, 57.2, 60.1, 58.7, 61.4, 59.8, 62.7, 61.1, 63.9, 62.4, 65.2, 63.7, 66.8, 65.1, 68.3, 66.6, 69.7, 68.2, 71.1, 69.5, 72.8, 71.2, 74.3, 72.7, 75.9, 74.4, 77.2, 75.6, 78.8, 77.1, 80.4, 78.9, 81.7, 80.2, 83.1, 81.6, 84.5]
            },
            heartbeat: {
                name: "Heartbeat Pattern",
                description: "Simulated ECG-style rhythmic pattern",
                data: [0.1, 0.1, 0.2, 0.8, 0.1, -0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8, 0.1, -0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8, 0.1, -0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8, 0.1, -0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8, 0.1, -0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8, 0.1]
            }
        };

        this.musicalScales = {
            chromatic: { name: "Chromatic", notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
            major: { name: "Major Scale", notes: ["C", "D", "E", "F", "G", "A", "B"], intervals: [0, 2, 4, 5, 7, 9, 11] },
            pentatonic: { name: "Pentatonic", notes: ["C", "D", "E", "G", "A"], intervals: [0, 2, 4, 7, 9] },
            minor: { name: "Minor Scale", notes: ["C", "D", "Eb", "F", "G", "Ab", "Bb"], intervals: [0, 2, 3, 5, 7, 8, 10] }
        };

        this.instruments = {
            piano: { name: "Piano", type: "synth", oscillator: { type: "sine" }, envelope: { attack: 0.01, decay: 0.3, sustain: 0.3, release: 1 } },
            synth: { name: "Synth Lead", type: "synth", oscillator: { type: "sawtooth" }, envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.8 } },
            square: { name: "Square Wave", type: "synth", oscillator: { type: "square" }, envelope: { attack: 0.05, decay: 0.1, sustain: 0.7, release: 0.4 } },
            sawtooth: { name: "Sawtooth", type: "synth", oscillator: { type: "sawtooth" }, envelope: { attack: 0.02, decay: 0.1, sustain: 0.8, release: 0.6 } }
        };

        // Application state
        this.currentData = null;
        this.currentDataset = null;
        this.isPlaying = false;
        this.currentPosition = 0;
        this.zoomLevel = 1;
        this.playbackInterval = null;
        this.synth = null;

        // ENHANCED: Live data state management
        this.isLiveMode = false;
        this.liveDataBuffer = [];
        this.maxBufferSize = 150;
        this.lastUpdateTime = null;
        this.liveUpdateInterval = null;
        this.updateFrequency = 60000; // 1 minute default
        this.continuousLiveUpdates = null;

        // Live data integration
        this.liveDataConfig = {
            apiProvider: null,
            apiKey: null,
            stockSymbol: null,
            updateInterval: 60000, // 1 minute default
            isConnected: false,
            lastUpdate: null,
            refreshInterval: null,
            basePrice: 100 // For simulation
        };

        // Settings
        this.settings = {
            tempo: 120,
            instrument: 'piano',
            scale: 'major',
            baseOctave: 4,
            noteLength: '8n'
        };

        // D3 visualization properties
        this.svg = null;
        this.xScale = null;
        this.yScale = null;
        this.line = null;
        this.playheadLine = null;
        this.tooltip = null;
        this.noteTracker = null;
        this.noteTrackerText = null;
        this.noteRangeLines = null;
        this.octaveLabels = null;

        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.setupAudio();
        this.setupD3Visualization();
        this.updateUI();
    }

    setupEventListeners() {
        // Playback controls
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlayback());
        
        // Audio controls
        document.getElementById('tempoSlider').addEventListener('input', (e) => {
            this.settings.tempo = parseInt(e.target.value);
            document.getElementById('tempoValue').textContent = this.settings.tempo;
            this.updatePlaybackSpeed();
        });
        
        document.getElementById('instrumentSelect').addEventListener('change', (e) => {
            this.settings.instrument = e.target.value;
            this.setupSynth();
        });
        
        document.getElementById('scaleSelect').addEventListener('change', (e) => {
            this.settings.scale = e.target.value;
            this.updateVisualization();
        });

        // Zoom controls
        document.getElementById('zoomInBtn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOutBtn').addEventListener('click', () => this.zoomOut());
        document.getElementById('resetZoomBtn').addEventListener('click', () => this.resetZoom());

        // Dataset selection
        document.querySelectorAll('.dataset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const datasetKey = e.target.dataset.dataset;
                this.loadSampleDataset(datasetKey);
            });
        });

        // File upload
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileUpload(e));

        // Live data controls
        document.getElementById('connectLiveBtn').addEventListener('click', () => this.toggleLiveDataConnection());
        document.getElementById('refreshDataBtn').addEventListener('click', () => this.manualRefreshLiveData());
        document.getElementById('liveModeBtn').addEventListener('click', () => this.toggleLiveMode());

        // Error modal
        document.getElementById('closeErrorBtn').addEventListener('click', () => this.hideError());
    }

    // ============================================
    // ENHANCED LIVE DATA WITH CONTINUOUS UPDATES
    // ============================================

    setLiveDataMode(enabled) {
        this.isLiveMode = enabled;
        const liveModeBtn = document.getElementById('liveModeBtn');
        const liveModeText = document.getElementById('liveModeText');
        const liveIndicator = liveModeBtn.querySelector('.live-indicator');
        const visualizationSection = document.querySelector('.visualization-section');
        const visualizationArea = document.querySelector('.visualization-area');
        const graphTitle = document.getElementById('graphTitle');
        const liveGraphInfo = document.getElementById('liveGraphInfo');
        const liveStatusDisplay = document.getElementById('liveStatusDisplay');

        if (enabled) {
            liveModeText.textContent = 'Live Mode: ON';
            liveIndicator.classList.add('active');
            liveModeBtn.classList.add('btn--success');
            visualizationSection.classList.add('live-mode');
            visualizationArea.classList.add('live-mode');
            graphTitle.classList.add('live');
            liveGraphInfo.style.display = 'block';
            liveStatusDisplay.style.display = 'block';
            this.startContinuousUpdates();
            this.enableContinuousPlayback();
            // Disable sample dataset buttons in live mode
            document.querySelectorAll('.dataset-btn').forEach(btn => btn.disabled = true);
        } else {
            liveModeText.textContent = 'Live Mode: OFF';
            liveIndicator.classList.remove('active');
            liveModeBtn.classList.remove('btn--success');
            visualizationSection.classList.remove('live-mode');
            visualizationArea.classList.remove('live-mode');
            graphTitle.classList.remove('live');
            liveGraphInfo.style.display = 'none';
            liveStatusDisplay.style.display = 'none';
            this.stopContinuousUpdates();
            this.disableContinuousPlayback();
            // Re-enable sample dataset buttons
            document.querySelectorAll('.dataset-btn').forEach(btn => btn.disabled = false);
        }

        this.updateLiveVisualizationStyles();
    }

    toggleLiveMode() {
        if (!this.liveDataConfig.isConnected) {
            this.showError('Please connect to live data first');
            return;
        }
        this.setLiveDataMode(!this.isLiveMode);
    }

    async startContinuousUpdates() {
        if (!this.isLiveMode || !this.liveDataConfig.isConnected) return;

        const updateLoop = async () => {
            try {
                if (!this.isLiveMode || !this.liveDataConfig.isConnected) return;

                const newDataPoint = await this.fetchLatestDataPoint();
                this.addToLiveBuffer(newDataPoint);
                this.updateGraphWithNewData();
                this.updateAudioPlayback();
                
                // Schedule next update
                this.continuousLiveUpdates = setTimeout(updateLoop, this.updateFrequency);
            } catch (error) {
                console.error('Continuous update failed:', error);
                // Continue trying in case of temporary errors
                this.continuousLiveUpdates = setTimeout(updateLoop, this.updateFrequency);
            }
        };

        // Start the loop
        updateLoop();
    }

    stopContinuousUpdates() {
        if (this.continuousLiveUpdates) {
            clearTimeout(this.continuousLiveUpdates);
            this.continuousLiveUpdates = null;
        }
    }

    async fetchLatestDataPoint() {
        // Simulate fetching a single new data point
        const variation = (Math.random() - 0.5) * this.liveDataConfig.basePrice * 0.02;
        this.liveDataConfig.basePrice = Math.max(1, this.liveDataConfig.basePrice + variation);
        return this.liveDataConfig.basePrice;
    }

    addToLiveBuffer(newDataPoint) {
        this.liveDataBuffer.push(newDataPoint);
        if (this.liveDataBuffer.length > this.maxBufferSize) {
            this.liveDataBuffer.shift(); // Remove oldest
        }
        
        // Update buffer size display
        document.getElementById('bufferSize').textContent = this.liveDataBuffer.length;
    }

    updateGraphWithNewData() {
        if (!this.isLiveMode) return;
        
        // Update current data with the live buffer
        this.currentData = [...this.liveDataBuffer];
        
        // Smooth visualization update without interrupting playback
        this.updateVisualization();
        this.updateDataStatistics();
        this.updateDataFreshness();
    }

    updateAudioPlayback() {
        if (!this.isLiveMode || !this.isPlaying) return;
        
        // In live mode, keep playback position near the end of available data
        const bufferPosition = this.liveDataBuffer.length - 5; // Play 5 points behind the newest
        if (bufferPosition > 0 && this.currentPosition < bufferPosition) {
            this.currentPosition = Math.max(0, bufferPosition);
        }
    }

    enableContinuousPlayback() {
        // Mark that we're in continuous playback mode
        // The main playback loop will handle never stopping
    }

    disableContinuousPlayback() {
        // Return to normal playback behavior
    }

    async fetchLiveStockData(symbol, apiKey, provider) {
        // Simulated live stock data for demonstration
        return new Promise((resolve) => {
            setTimeout(() => {
                const simulatedData = this.generateSimulatedLiveData(symbol);
                resolve({
                    name: `${symbol} Live Data (Simulated)`,
                    description: `Simulated real-time ${symbol} stock prices`,
                    data: simulatedData,
                    timestamp: new Date()
                });
            }, 1000);
        });
    }

    generateSimulatedLiveData(symbol) {
        const basePrice = 100 + Math.random() * 200;
        this.liveDataConfig.basePrice = basePrice; // Store for continuous updates
        const dataPoints = 60; // 1 hour of minute data
        const data = [];
        let currentPrice = basePrice;
        
        for (let i = 0; i < dataPoints; i++) {
            const change = (Math.random() - 0.5) * 2;
            const trend = Math.sin(i / 10) * 0.5;
            currentPrice += change + trend;
            currentPrice = Math.max(0.01, currentPrice);
            data.push(currentPrice);
        }
        
        return data;
    }

    async toggleLiveDataConnection() {
        const connectBtn = document.getElementById('connectLiveBtn');
        const connectIcon = document.getElementById('connectIcon');
        const connectText = document.getElementById('connectText');

        if (!this.liveDataConfig.isConnected) {
            const provider = document.getElementById('apiProvider').value;
            const apiKey = document.getElementById('apiKey').value;
            const symbol = document.getElementById('stockSymbol').value.toUpperCase();

            if (!provider || !symbol) {
                this.showError('Please select an API provider and enter a stock symbol');
                return;
            }

            try {
                this.updateApiStatus('connecting', 'Connecting...');
                connectBtn.disabled = true;

                const result = await this.fetchLiveStockData(symbol, apiKey, provider);
                
                // Initialize live buffer with fetched data
                this.liveDataBuffer = [...result.data];
                this.currentData = [...result.data];
                this.currentDataset = {
                    name: result.name,
                    description: result.description,
                    source: 'live'
                };

                this.liveDataConfig.isConnected = true;
                this.liveDataConfig.apiProvider = provider;
                this.liveDataConfig.apiKey = apiKey;
                this.liveDataConfig.stockSymbol = symbol;
                this.liveDataConfig.lastUpdate = result.timestamp;
                this.updateFrequency = parseInt(document.getElementById('updateInterval').value);

                this.updateVisualization();
                this.updateDatasetInfo();
                this.updateDataStatistics();
                this.resetPlayback();

                document.querySelectorAll('.dataset-btn').forEach(btn => btn.classList.remove('active'));
                document.getElementById('liveModeBtn').disabled = false;

                this.startLiveDataRefresh();
                connectIcon.textContent = '🔌';
                connectText.textContent = 'Disconnect';
                this.updateApiStatus('connected', 'Connected');
                this.updateDataFreshness();

                // Automatically enable live mode
                this.setLiveDataMode(true);

            } catch (error) {
                this.updateApiStatus('error', 'Connection Failed');
                this.showError(`Failed to connect to live data: ${error.message}`);
            } finally {
                connectBtn.disabled = false;
            }

        } else {
            // Disconnect
            this.setLiveDataMode(false);
            this.stopLiveDataRefresh();
            this.liveDataConfig.isConnected = false;
            this.liveDataBuffer = [];
            connectIcon.textContent = '🔗';
            connectText.textContent = 'Connect Live Data';
            this.updateApiStatus('disconnected', 'Disconnected');
            document.getElementById('liveModeBtn').disabled = true;
        }
    }

    startLiveDataRefresh() {
        const interval = parseInt(document.getElementById('updateInterval').value);
        this.updateFrequency = interval;
        
        this.liveDataConfig.refreshInterval = setInterval(() => {
            if (!this.isLiveMode) {
                this.refreshLiveData();
            }
            // If in live mode, continuous updates handle the refresh
        }, interval);
    }

    stopLiveDataRefresh() {
        if (this.liveDataConfig.refreshInterval) {
            clearInterval(this.liveDataConfig.refreshInterval);
            this.liveDataConfig.refreshInterval = null;
        }
        this.stopContinuousUpdates();
    }

    async refreshLiveData() {
        if (!this.liveDataConfig.isConnected) return;

        try {
            if (this.isLiveMode) {
                // In live mode, just add a new data point
                const newPoint = await this.fetchLatestDataPoint();
                this.addToLiveBuffer(newPoint);
                this.updateGraphWithNewData();
            } else {
                // In normal mode, refresh entire dataset
                const result = await this.fetchLiveStockData(
                    this.liveDataConfig.stockSymbol,
                    this.liveDataConfig.apiKey,
                    this.liveDataConfig.apiProvider
                );

                const wasPlaying = this.isPlaying;
                if (wasPlaying) this.stopPlayback();

                this.currentData = result.data;
                this.liveDataConfig.lastUpdate = result.timestamp;
                
                this.updateVisualization();
                this.updateDataStatistics();
                this.updateDataFreshness();

                if (wasPlaying) {
                    setTimeout(() => this.startPlayback(), 100);
                }
            }

        } catch (error) {
            console.error('Live data refresh failed:', error);
            this.updateApiStatus('error', 'Refresh Failed');
        }
    }

    async manualRefreshLiveData() {
        if (!this.liveDataConfig.isConnected) {
            this.showError('No live data connection active');
            return;
        }

        const refreshBtn = document.getElementById('refreshDataBtn');
        refreshBtn.disabled = true;
        refreshBtn.textContent = '🔄 Refreshing...';

        try {
            await this.refreshLiveData();
        } finally {
            refreshBtn.disabled = false;
            refreshBtn.textContent = '🔄 Manual Refresh';
        }
    }

    updateApiStatus(status, text) {
        const statusIndicator = document.getElementById('apiStatus');
        const statusDot = statusIndicator.querySelector('.status-dot');
        const statusText = statusIndicator.querySelector('.status-text');

        statusDot.className = `status-dot ${status}`;
        statusText.textContent = text;
    }

    updateDataFreshness() {
        const freshnessEl = document.getElementById('dataFreshness');
        if (this.liveDataConfig.lastUpdate) {
            const timeStr = this.liveDataConfig.lastUpdate.toLocaleTimeString();
            freshnessEl.textContent = `Last update: ${timeStr}`;
        } else {
            freshnessEl.textContent = 'Last update: Never';
        }
    }

    // ============================================
    // AUDIO SETUP AND SYNTHESIS
    // ============================================

    async setupAudio() {
        try {
            this.setupSynth();
        } catch (error) {
            console.error('Audio setup failed:', error);
        }
    }

    setupSynth() {
        if (this.synth) {
            this.synth.dispose();
        }

        const instrumentConfig = this.instruments[this.settings.instrument];
        this.synth = new Tone.Synth({
            oscillator: instrumentConfig.oscillator,
            envelope: instrumentConfig.envelope
        }).toDestination();
    }

    // ============================================
    // D3 VISUALIZATION WITH LIVE DATA SUPPORT
    // ============================================

    setupD3Visualization() {
        const container = document.getElementById('visualization');
        container.innerHTML = '';

        const margin = { top: 30, right: 30, bottom: 50, left: 70 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        this.svg = d3.select('#visualization')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        this.chartGroup = this.svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        this.xScale = d3.scaleLinear().range([0, width]);
        this.yScale = d3.scaleLinear().range([height, 0]);

        this.xAxis = this.chartGroup.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0,${height})`);

        this.yAxis = this.chartGroup.append('g')
            .attr('class', 'axis');

        this.line = d3.line()
            .x((d, i) => this.xScale(i))
            .y(d => this.yScale(d))
            .curve(d3.curveMonotoneX);

        this.path = this.chartGroup.append('path')
            .attr('class', 'graph-line');

        this.noteRangeGroup = this.chartGroup.append('g').attr('class', 'note-ranges');

        this.playheadLine = this.chartGroup.append('line')
            .attr('class', 'playhead-line')
            .attr('y1', 0)
            .attr('y2', height)
            .style('display', 'none');

        this.noteTracker = this.chartGroup.append('circle')
            .attr('class', 'note-tracker')
            .attr('r', 10)
            .style('display', 'none');

        this.noteTrackerText = this.chartGroup.append('text')
            .attr('class', 'note-tracker-text')
            .attr('dy', -15)
            .style('display', 'none');

        this.tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip');

        this.xGrid = this.chartGroup.append('g').attr('class', 'grid');
        this.yGrid = this.chartGroup.append('g').attr('class', 'grid');

        this.chartWidth = width;
        this.chartHeight = height;
    }

    updateLiveVisualizationStyles() {
        if (!this.path) return;

        if (this.isLiveMode) {
            this.path.classed('live-data', true);
            this.playheadLine.classed('live-mode', true);
            this.noteTracker.classed('live-mode', true);
        } else {
            this.path.classed('live-data', false);
            this.playheadLine.classed('live-mode', false);
            this.noteTracker.classed('live-mode', false);
        }
    }

    normalizeData(data) {
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min;
        
        if (range === 0) return data.map(() => 0.5);
        
        return data.map(value => (value - min) / range);
    }

    loadSampleDataset(key) {
        const dataset = this.sampleDatasets[key];
        if (!dataset) return;

        // Disable live mode when loading static data
        if (this.isLiveMode) {
            this.setLiveDataMode(false);
        }

        if (this.liveDataConfig.isConnected) {
            this.stopLiveDataRefresh();
            this.liveDataConfig.isConnected = false;
            document.getElementById('connectIcon').textContent = '🔗';
            document.getElementById('connectText').textContent = 'Connect Live Data';
            this.updateApiStatus('disconnected', 'Disconnected');
            document.getElementById('liveModeBtn').disabled = true;
        }

        this.showLoading();
        
        setTimeout(() => {
            this.currentData = [...dataset.data];
            this.currentDataset = {
                name: dataset.name,
                description: dataset.description,
                source: 'sample'
            };
            
            this.updateVisualization();
            this.updateDatasetInfo();
            this.updateDataStatistics();
            this.resetPlayback();
            
            document.querySelectorAll('.dataset-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-dataset="${key}"]`).classList.add('active');
            
            this.hideLoading();
        }, 500);
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Disable live mode when loading file data
        if (this.isLiveMode) {
            this.setLiveDataMode(false);
        }

        if (this.liveDataConfig.isConnected) {
            this.stopLiveDataRefresh();
            this.liveDataConfig.isConnected = false;
            document.getElementById('connectIcon').textContent = '🔗';
            document.getElementById('connectText').textContent = 'Connect Live Data';
            this.updateApiStatus('disconnected', 'Disconnected');
            document.getElementById('liveModeBtn').disabled = true;
        }

        this.showLoading();
        const statusEl = document.getElementById('uploadStatus');
        statusEl.textContent = 'Processing file...';
        statusEl.className = 'processing';

        try {
            const text = await this.readFileAsText(file);
            let data;

            if (file.name.endsWith('.csv')) {
                data = this.parseCSV(text);
            } else if (file.name.endsWith('.json')) {
                data = this.parseJSON(text);
            } else {
                throw new Error('Unsupported file format. Please use CSV or JSON.');
            }

            this.currentData = data;
            this.currentDataset = {
                name: file.name,
                description: `Uploaded ${file.type || 'file'}`,
                source: 'upload'
            };

            this.updateVisualization();
            this.updateDatasetInfo();
            this.updateDataStatistics();
            this.resetPlayback();

            statusEl.textContent = 'File loaded successfully!';
            statusEl.className = 'upload-success';
            
            document.querySelectorAll('.dataset-btn').forEach(btn => btn.classList.remove('active'));

        } catch (error) {
            statusEl.textContent = `Error: ${error.message}`;
            statusEl.className = 'upload-error';
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    parseCSV(text) {
        const lines = text.trim().split('\n');
        const data = [];
        
        for (let i = 0; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === 1) {
                const num = parseFloat(values[0]);
                if (!isNaN(num)) data.push(num);
            } else {
                const num = parseFloat(values[values.length - 1]);
                if (!isNaN(num)) data.push(num);
            }
        }
        
        if (data.length === 0) {
            throw new Error('No valid numeric data found in CSV file');
        }
        
        return data;
    }

    parseJSON(text) {
        const json = JSON.parse(text);
        let data;

        if (Array.isArray(json)) {
            data = json.filter(item => typeof item === 'number');
        } else if (json.data && Array.isArray(json.data)) {
            data = json.data.filter(item => typeof item === 'number');
        } else if (json.values && Array.isArray(json.values)) {
            data = json.values.filter(item => typeof item === 'number');
        } else {
            throw new Error('Invalid JSON format. Expected array of numbers or object with data/values array.');
        }

        if (data.length === 0) {
            throw new Error('No valid numeric data found in JSON file');
        }

        return data;
    }

    updateVisualization() {
        if (!this.currentData || this.currentData.length === 0) return;

        const normalizedData = this.normalizeData(this.currentData);
        const visibleData = this.getZoomedData(normalizedData);

        this.xScale.domain([0, visibleData.length - 1]);
        this.yScale.domain([0, 1]);

        this.xAxis.call(d3.axisBottom(this.xScale).tickFormat(d => Math.floor(d)));
        this.yAxis.call(d3.axisLeft(this.yScale).tickFormat(d => this.getNoteForValue(d)));

        this.addOctaveLabels();
        this.addNoteRangeLines();

        this.xGrid.call(d3.axisBottom(this.xScale)
            .tickSize(-this.chartHeight)
            .tickFormat('')
        ).attr('transform', `translate(0,${this.chartHeight})`);

        this.yGrid.call(d3.axisLeft(this.yScale)
            .tickSize(-this.chartWidth)
            .tickFormat('')
        );

        this.xGrid.selectAll('line').attr('class', 'grid-line');
        this.yGrid.selectAll('line').attr('class', 'grid-line');

        this.path
            .datum(visibleData)
            .attr('d', this.line);

        // Update dots with fading for older data in live mode
        const dots = this.chartGroup.selectAll('.graph-dot')
            .data(visibleData);

        dots.enter()
            .append('circle')
            .attr('class', 'graph-dot')
            .attr('r', 4)
            .merge(dots)
            .attr('cx', (d, i) => this.xScale(i))
            .attr('cy', d => this.yScale(d))
            .classed('live-data', this.isLiveMode)
            .classed('fading', (d, i) => this.isLiveMode && i < visibleData.length * 0.7)
            .on('mouseover', (event, d, i) => this.showTooltip(event, d, i))
            .on('mouseout', () => this.hideTooltip());

        dots.exit().remove();

        this.updateLiveVisualizationStyles();
        document.getElementById('graphTitle').textContent = this.currentDataset.name;
    }

    addOctaveLabels() {
        this.chartGroup.selectAll('.octave-label').remove();

        if (this.zoomLevel > 1) {
            const scale = this.musicalScales[this.settings.scale];
            const octaveRange = Math.max(1, Math.ceil(this.zoomLevel / 2));
            const baseOctave = this.settings.baseOctave;

            for (let octave = 0; octave < octaveRange; octave++) {
                const y = this.yScale(octave / octaveRange);
                this.chartGroup.append('text')
                    .attr('class', 'octave-label')
                    .attr('x', -10)
                    .attr('y', y + 4)
                    .text(`${scale.notes[0]}${baseOctave + octave}`);
            }
        }
    }

    addNoteRangeLines() {
        this.noteRangeGroup.selectAll('.note-range-line').remove();

        const scale = this.musicalScales[this.settings.scale];
        const octaveRange = Math.max(1, Math.ceil(this.zoomLevel / 2));
        const totalNotes = scale.intervals.length * octaveRange;

        for (let i = 0; i <= totalNotes; i++) {
            const y = this.yScale(i / totalNotes);
            this.noteRangeGroup.append('line')
                .attr('class', 'note-range-line')
                .attr('x1', 0)
                .attr('x2', this.chartWidth)
                .attr('y1', y)
                .attr('y2', y);
        }
    }

    getZoomedData(data) {
        if (this.zoomLevel === 1) return data;
        
        if (this.isLiveMode) {
            // In live mode, always show the most recent data
            const windowSize = Math.floor(data.length / this.zoomLevel);
            const start = Math.max(0, data.length - windowSize);
            return data.slice(start);
        } else {
            // In static mode, show zoomed data around current position
            const start = Math.floor(this.currentPosition);
            const windowSize = Math.floor(data.length / this.zoomLevel);
            const end = Math.min(start + windowSize, data.length);
            return data.slice(start, end);
        }
    }

    getNoteForValue(normalizedValue) {
        const scale = this.musicalScales[this.settings.scale];
        const octaveRange = Math.max(1, Math.ceil(this.zoomLevel / 2));
        const noteIndex = Math.floor(normalizedValue * scale.intervals.length * octaveRange) % scale.intervals.length;
        return scale.notes[noteIndex];
    }

    showTooltip(event, value, index) {
        const actualIndex = this.isLiveMode && this.zoomLevel > 1 ? 
            Math.max(0, this.currentData.length - this.getZoomedData(this.normalizeData(this.currentData)).length) + index :
            Math.floor(this.currentPosition) + index;
        
        const originalValue = this.currentData[actualIndex];
        const fullNote = this.valueToNote(value);
        
        this.tooltip
            .html(`
                <strong>Index:</strong> ${actualIndex}<br>
                <strong>Value:</strong> ${originalValue?.toFixed(2)}<br>
                <strong>Note:</strong> ${fullNote}
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .classed('visible', true);
    }

    hideTooltip() {
        this.tooltip.classed('visible', false);
    }

    // ============================================
    // ENHANCED PLAYBACK WITH CONTINUOUS LIVE MODE
    // ============================================

    async togglePlayback() {
        if (!this.currentData || this.currentData.length === 0) {
            this.showError('Please load a dataset first');
            return;
        }

        if (!this.isPlaying) {
            await this.startPlayback();
        } else {
            this.stopPlayback();
        }
    }

    async startPlayback() {
        try {
            if (Tone.context.state !== 'running') {
                await Tone.start();
            }

            this.isPlaying = true;
            this.updatePlayButton();
            
            this.playheadLine.style('display', 'block');
            this.noteTracker.style('display', 'block');
            this.noteTrackerText.style('display', 'block');

            const bpm = this.settings.tempo;
            const intervalMs = (60 / bpm) * 250;

            this.playbackInterval = setInterval(() => {
                this.playCurrentNote();
                this.updateNoteTracker();
                this.updatePlayhead();
                this.currentPosition++;

                // ENHANCED: Continuous playback for live mode
                if (this.isLiveMode) {
                    // In live mode, never stop - loop back to keep playing
                    if (this.currentPosition >= this.currentData.length) {
                        this.currentPosition = Math.max(0, this.currentData.length - 10);
                    }
                } else {
                    // Static mode: stop at end
                    if (this.currentPosition >= this.currentData.length) {
                        this.stopPlayback();
                        this.resetPlayback();
                    }
                }
            }, intervalMs);

        } catch (error) {
            console.error('Playback failed:', error);
            this.showError('Audio playback failed. Please check your browser settings.');
            this.stopPlayback();
        }
    }

    stopPlayback() {
        this.isPlaying = false;
        this.updatePlayButton();
        
        this.playheadLine.style('display', 'none');
        this.noteTracker.style('display', 'none');
        this.noteTrackerText.style('display', 'none');
        
        document.getElementById('currentNote').textContent = '-';
        
        if (this.playbackInterval) {
            clearInterval(this.playbackInterval);
            this.playbackInterval = null;
        }
    }

    resetPlayback() {
        this.currentPosition = 0;
        this.updatePositionIndicator();
        this.updatePlayhead();
        this.updateNoteTracker();
    }

    playCurrentNote() {
        if (!this.synth || !this.currentData) return;

        const normalizedData = this.normalizeData(this.currentData);
        const value = normalizedData[this.currentPosition];
        const note = this.valueToNote(value);

        try {
            this.synth.triggerAttackRelease(note, this.settings.noteLength);
            document.getElementById('currentNote').textContent = note;
        } catch (error) {
            console.error('Note play failed:', error);
        }
    }

    updateNoteTracker() {
        if (!this.currentData || this.currentData.length === 0) return;

        const normalizedData = this.normalizeData(this.currentData);
        const visibleData = this.getZoomedData(normalizedData);
        
        let relativePosition;
        
        if (this.isLiveMode && this.zoomLevel > 1) {
            // In live mode with zoom, track relative to the visible window
            const windowStart = Math.max(0, this.currentData.length - visibleData.length);
            relativePosition = this.currentPosition - windowStart;
        } else if (this.zoomLevel === 1) {
            relativePosition = this.currentPosition;
        } else {
            const zoomedStart = Math.floor(this.currentPosition);
            relativePosition = Math.max(0, this.currentPosition - zoomedStart);
        }
        
        if (relativePosition >= 0 && relativePosition < visibleData.length && this.currentPosition < normalizedData.length) {
            const x = this.xScale(relativePosition);
            const y = this.yScale(visibleData[Math.floor(relativePosition)]);
            const currentNote = this.valueToNote(normalizedData[this.currentPosition]);
            
            this.noteTracker
                .transition()
                .duration(50)
                .attr('cx', x)
                .attr('cy', y);
            
            this.noteTrackerText
                .transition()
                .duration(50)
                .attr('x', x)
                .attr('y', y)
                .text(currentNote);
        }
    }

    valueToNote(normalizedValue) {
        const scale = this.musicalScales[this.settings.scale];
        const octaveRange = Math.max(1, Math.ceil(this.zoomLevel / 2));
        const baseOctave = this.settings.baseOctave;
        
        const totalNotes = scale.intervals.length * octaveRange;
        const noteIndex = Math.floor(normalizedValue * totalNotes);
        
        const scaleIndex = noteIndex % scale.intervals.length;
        const octave = baseOctave + Math.floor(noteIndex / scale.intervals.length);
        
        return scale.notes[scaleIndex] + octave;
    }

    updatePlayButton() {
        const playBtn = document.getElementById('playBtn');
        const playIcon = document.getElementById('playIcon');
        const playText = document.getElementById('playText');
        
        if (this.isPlaying) {
            playIcon.textContent = '⏸️';
            playText.textContent = 'Pause';
            playBtn.classList.add('playing');
            if (this.isLiveMode) {
                playBtn.classList.add('live-playing');
            }
        } else {
            playIcon.textContent = '▶️';
            playText.textContent = 'Play';
            playBtn.classList.remove('playing', 'live-playing');
        }
    }

    updatePlayhead() {
        if (!this.currentData || this.currentData.length === 0) return;

        const normalizedData = this.normalizeData(this.currentData);
        const visibleData = this.getZoomedData(normalizedData);
        
        let relativePosition;
        
        if (this.isLiveMode && this.zoomLevel > 1) {
            const windowStart = Math.max(0, this.currentData.length - visibleData.length);
            relativePosition = this.currentPosition - windowStart;
        } else if (this.zoomLevel === 1) {
            relativePosition = this.currentPosition;
        } else {
            const zoomedStart = Math.floor(this.currentPosition);
            relativePosition = Math.max(0, this.currentPosition - zoomedStart);
        }
        
        const x = this.xScale(relativePosition);
        this.playheadLine.attr('x1', x).attr('x2', x);
        this.updatePositionIndicator();
    }

    updatePositionIndicator() {
        document.getElementById('currentPosition').textContent = this.currentPosition;
        document.getElementById('totalLength').textContent = this.currentData ? this.currentData.length : 0;
    }

    updatePlaybackSpeed() {
        if (this.isPlaying) {
            this.stopPlayback();
            setTimeout(() => this.startPlayback(), 100);
        }
    }

    // ============================================
    // ZOOM AND UI CONTROLS
    // ============================================

    zoomIn() {
        if (this.zoomLevel < 8) {
            this.zoomLevel *= 2;
            this.updateZoomInfo();
            if (this.currentData) {
                this.updateVisualization();
            }
        }
    }

    zoomOut() {
        if (this.zoomLevel > 1) {
            this.zoomLevel /= 2;
            this.updateZoomInfo();
            if (this.currentData) {
                this.updateVisualization();
            }
        }
    }

    resetZoom() {
        this.zoomLevel = 1;
        this.updateZoomInfo();
        if (this.currentData) {
            this.updateVisualization();
        }
    }

    updateZoomInfo() {
        document.getElementById('zoomLevel').textContent = this.zoomLevel + 'x';
        const octaves = Math.max(1, Math.ceil(this.zoomLevel / 2));
        document.getElementById('noteRange').textContent = octaves === 1 ? '1 octave' : `${octaves} octaves`;
    }

    updateDatasetInfo() {
        const infoEl = document.getElementById('datasetInfo');
        if (this.currentDataset) {
            const sourceText = this.isLiveMode ? 'live (continuous)' : this.currentDataset.source;
            infoEl.innerHTML = `
                <div><strong>Name:</strong> ${this.currentDataset.name}</div>
                <div><strong>Description:</strong> ${this.currentDataset.description}</div>
                <div><strong>Source:</strong> ${sourceText}</div>
                ${this.isLiveMode ? `<div><strong>Buffer Size:</strong> ${this.liveDataBuffer.length} points</div>` : ''}
            `;
        } else {
            infoEl.innerHTML = '<span class="no-data">No dataset loaded</span>';
        }
    }

    updateDataStatistics() {
        if (!this.currentData) {
            document.getElementById('statCount').textContent = '-';
            document.getElementById('statMin').textContent = '-';
            document.getElementById('statMax').textContent = '-';
            document.getElementById('statMean').textContent = '-';
            return;
        }

        const count = this.currentData.length;
        const min = Math.min(...this.currentData);
        const max = Math.max(...this.currentData);
        const mean = this.currentData.reduce((a, b) => a + b, 0) / count;

        document.getElementById('statCount').textContent = count;
        document.getElementById('statMin').textContent = min.toFixed(2);
        document.getElementById('statMax').textContent = max.toFixed(2);
        document.getElementById('statMean').textContent = mean.toFixed(2);
    }

    updateUI() {
        this.updateZoomInfo();
        this.updatePositionIndicator();
        this.updateDatasetInfo();
        this.updateDataStatistics();
        this.updateApiStatus('disconnected', 'Disconnected');
        this.updateDataFreshness();
        document.getElementById('liveModeBtn').disabled = true;
    }

    // ============================================
    // UTILITY METHODS
    // ============================================

    showLoading() {
        document.getElementById('loadingOverlay').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }

    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorModal').classList.remove('hidden');
    }

    hideError() {
        document.getElementById('errorModal').classList.add('hidden');
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DataMusicVisualizer();
});