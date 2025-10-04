// ============================================
// Data-to-Music Graph Visualizer Application
// Enhanced with Note Tracking & Live Data Integration
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

        // Live data integration
        this.liveDataConfig = {
            apiProvider: null,
            apiKey: null,
            stockSymbol: null,
            updateInterval: 300000, // 5 minutes default
            isConnected: false,
            lastUpdate: null,
            refreshInterval: null
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
            this.updateVisualization(); // Refresh to show new note ranges
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

        // Error modal
        document.getElementById('closeErrorBtn').addEventListener('click', () => this.hideError());
    }

    // ============================================
    // LIVE STOCK API INTEGRATION SECTION
    // ============================================
    // Replace this section with your preferred stock API

    // TODO: Add your API key here
    // const STOCK_API_KEY = "YOUR_API_KEY_HERE";

    // TODO: Configure your preferred stock API endpoint
    // Popular options:
    // - Alpha Vantage: https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}
    // - IEX Cloud: https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=${token}
    // - Polygon: https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${date}/${date}?apikey=${apiKey}

    async fetchLiveStockData(symbol, apiKey, provider) {
        // TODO: Implement your API call here
        // Example structure:
        /*
        try {
            let url;
            switch(provider) {
                case 'alphaVantage':
                    url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;
                    break;
                case 'iexCloud':
                    url = `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?token=${apiKey}`;
                    break;
                case 'polygon':
                    const today = new Date().toISOString().split('T')[0];
                    url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/minute/${today}/${today}?apikey=${apiKey}`;
                    break;
                default:
                    throw new Error('Unsupported API provider');
            }
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            // TODO: Transform API response to our data format
            // Expected format: array of numbers [price1, price2, price3...]
            const transformedData = this.transformApiData(data, provider);
            
            return {
                name: `${symbol} Live Data`,
                description: `Real-time ${symbol} stock prices`,
                data: transformedData,
                timestamp: new Date()
            };
        } catch (error) {
            console.error('Stock API Error:', error);
            throw error;
        }
        */

        // SIMULATION: For demonstration purposes, return simulated live data
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

    // TODO: Add your data transformation logic
    transformApiData(apiResponse, provider) {
        // Convert your API's response format to simple number array
        // Return: [number, number, number...]
        
        /*
        switch(provider) {
            case 'alphaVantage':
                const timeSeries = apiResponse['Time Series (1min)'];
                return Object.values(timeSeries)
                    .map(entry => parseFloat(entry['4. close']))
                    .reverse(); // Most recent first
                    
            case 'iexCloud':
                return apiResponse.map(entry => entry.close);
                
            case 'polygon':
                return apiResponse.results.map(entry => entry.c); // close price
                
            default:
                throw new Error('Unknown API provider for data transformation');
        }
        */
    }

    generateSimulatedLiveData(symbol) {
        // Generate realistic stock-like data for simulation
        const basePrice = 100 + Math.random() * 200;
        const dataPoints = 60; // 1 hour of minute data
        const data = [];
        let currentPrice = basePrice;
        
        for (let i = 0; i < dataPoints; i++) {
            // Add some realistic price movement
            const change = (Math.random() - 0.5) * 2; // -1 to +1
            const trend = Math.sin(i / 10) * 0.5; // Slight trending
            currentPrice += change + trend;
            currentPrice = Math.max(0.01, currentPrice); // Prevent negative prices
            data.push(currentPrice);
        }
        
        return data;
    }

    async toggleLiveDataConnection() {
        const connectBtn = document.getElementById('connectLiveBtn');
        const connectIcon = document.getElementById('connectIcon');
        const connectText = document.getElementById('connectText');
        const apiStatus = document.getElementById('apiStatus');

        if (!this.liveDataConfig.isConnected) {
            // Attempt to connect
            const provider = document.getElementById('apiProvider').value;
            const apiKey = document.getElementById('apiKey').value;
            const symbol = document.getElementById('stockSymbol').value.toUpperCase();

            if (!provider || !symbol) {
                this.showError('Please select an API provider and enter a stock symbol');
                return;
            }

            // Note: API key validation would be done in real implementation
            if (!apiKey && provider !== '') {
                console.warn('No API key provided - using simulation mode');
            }

            try {
                this.updateApiStatus('connecting', 'Connecting...');
                connectBtn.disabled = true;

                // Fetch initial data
                const result = await this.fetchLiveStockData(symbol, apiKey, provider);
                
                // Update application state
                this.currentData = result.data;
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

                // Update UI
                this.updateVisualization();
                this.updateDatasetInfo();
                this.updateDataStatistics();
                this.resetPlayback();

                // Clear active sample dataset buttons
                document.querySelectorAll('.dataset-btn').forEach(btn => btn.classList.remove('active'));

                // Start auto-refresh
                this.startLiveDataRefresh();

                // Update button state
                connectIcon.textContent = '🔌';
                connectText.textContent = 'Disconnect';
                this.updateApiStatus('connected', 'Connected');
                this.updateDataFreshness();

            } catch (error) {
                this.updateApiStatus('error', 'Connection Failed');
                this.showError(`Failed to connect to live data: ${error.message}`);
            } finally {
                connectBtn.disabled = false;
            }

        } else {
            // Disconnect
            this.stopLiveDataRefresh();
            this.liveDataConfig.isConnected = false;
            connectIcon.textContent = '🔗';
            connectText.textContent = 'Connect Live Data';
            this.updateApiStatus('disconnected', 'Disconnected');
        }
    }

    startLiveDataRefresh() {
        const interval = parseInt(document.getElementById('updateInterval').value);
        this.liveDataConfig.refreshInterval = setInterval(() => {
            this.refreshLiveData();
        }, interval);
    }

    stopLiveDataRefresh() {
        if (this.liveDataConfig.refreshInterval) {
            clearInterval(this.liveDataConfig.refreshInterval);
            this.liveDataConfig.refreshInterval = null;
        }
    }

    async refreshLiveData() {
        if (!this.liveDataConfig.isConnected) return;

        try {
            const result = await this.fetchLiveStockData(
                this.liveDataConfig.stockSymbol,
                this.liveDataConfig.apiKey,
                this.liveDataConfig.apiProvider
            );

            // Smooth data transition - don't interrupt playback
            const wasPlaying = this.isPlaying;
            if (wasPlaying) {
                this.stopPlayback();
            }

            this.currentData = result.data;
            this.liveDataConfig.lastUpdate = result.timestamp;
            
            this.updateVisualization();
            this.updateDataStatistics();
            this.updateDataFreshness();

            if (wasPlaying) {
                setTimeout(() => this.startPlayback(), 100);
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
    // D3 VISUALIZATION WITH NOTE TRACKING
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

        // Create scales
        this.xScale = d3.scaleLinear().range([0, width]);
        this.yScale = d3.scaleLinear().range([height, 0]);

        // Create axes
        this.xAxis = this.chartGroup.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0,${height})`);

        this.yAxis = this.chartGroup.append('g')
            .attr('class', 'axis');

        // Create line generator
        this.line = d3.line()
            .x((d, i) => this.xScale(i))
            .y(d => this.yScale(d))
            .curve(d3.curveMonotoneX);

        // Create path for the line
        this.path = this.chartGroup.append('path')
            .attr('class', 'graph-line');

        // Create note range lines
        this.noteRangeGroup = this.chartGroup.append('g').attr('class', 'note-ranges');

        // Create playhead line
        this.playheadLine = this.chartGroup.append('line')
            .attr('class', 'playhead-line')
            .attr('y1', 0)
            .attr('y2', height)
            .style('display', 'none');

        // Create note tracker circle (FIXED: Ensure it's visible and properly styled)
        this.noteTracker = this.chartGroup.append('circle')
            .attr('class', 'note-tracker')
            .attr('r', 10)
            .style('fill', '#ff6b35')
            .style('stroke', '#ff8c42')
            .style('stroke-width', '3px')
            .style('opacity', '0.9')
            .style('display', 'none');

        // Create note tracker text
        this.noteTrackerText = this.chartGroup.append('text')
            .attr('class', 'note-tracker-text')
            .attr('dy', -15)
            .style('font-family', 'monospace')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .style('fill', '#333')
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .style('display', 'none');

        // Create tooltip
        this.tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip');

        // Add grid lines
        this.xGrid = this.chartGroup.append('g')
            .attr('class', 'grid');

        this.yGrid = this.chartGroup.append('g')
            .attr('class', 'grid');

        // Store dimensions for later use
        this.chartWidth = width;
        this.chartHeight = height;
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

        // Stop live data if connected
        if (this.liveDataConfig.isConnected) {
            this.stopLiveDataRefresh();
            this.liveDataConfig.isConnected = false;
            document.getElementById('connectIcon').textContent = '🔗';
            document.getElementById('connectText').textContent = 'Connect Live Data';
            this.updateApiStatus('disconnected', 'Disconnected');
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
            
            // Update active button
            document.querySelectorAll('.dataset-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-dataset="${key}"]`).classList.add('active');
            
            this.hideLoading();
        }, 500);
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Stop live data if connected
        if (this.liveDataConfig.isConnected) {
            this.stopLiveDataRefresh();
            this.liveDataConfig.isConnected = false;
            document.getElementById('connectIcon').textContent = '🔗';
            document.getElementById('connectText').textContent = 'Connect Live Data';
            this.updateApiStatus('disconnected', 'Disconnected');
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
            
            // Clear active sample dataset buttons
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
                // Assume the last column contains the values we want
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

        // Update scales
        this.xScale.domain([0, visibleData.length - 1]);
        this.yScale.domain([0, 1]);

        // Update axes with enhanced note labels
        this.xAxis.call(d3.axisBottom(this.xScale).tickFormat(d => Math.floor(d)));
        this.yAxis.call(d3.axisLeft(this.yScale).tickFormat(d => this.getNoteForValue(d)));

        // Add octave labels when zoomed
        this.addOctaveLabels();

        // Add note range lines
        this.addNoteRangeLines();

        // Update grid
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

        // Update line path
        this.path
            .datum(visibleData)
            .attr('d', this.line);

        // Add interactive dots
        const dots = this.chartGroup.selectAll('.graph-dot')
            .data(visibleData);

        dots.enter()
            .append('circle')
            .attr('class', 'graph-dot')
            .attr('r', 4)
            .merge(dots)
            .attr('cx', (d, i) => this.xScale(i))
            .attr('cy', d => this.yScale(d))
            .on('mouseover', (event, d, i) => this.showTooltip(event, d, i))
            .on('mouseout', () => this.hideTooltip());

        dots.exit().remove();

        // Update graph title
        document.getElementById('graphTitle').textContent = this.currentDataset.name;
    }

    addOctaveLabels() {
        // Remove existing octave labels
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
        // Remove existing note range lines
        this.noteRangeGroup.selectAll('.note-range-line').remove();

        const scale = this.musicalScales[this.settings.scale];
        const octaveRange = Math.max(1, Math.ceil(this.zoomLevel / 2));
        const totalNotes = scale.intervals.length * octaveRange;

        // Add subtle horizontal lines for each note
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
        
        const start = Math.floor(this.currentPosition);
        const windowSize = Math.floor(data.length / this.zoomLevel);
        const end = Math.min(start + windowSize, data.length);
        
        return data.slice(start, end);
    }

    getNoteForValue(normalizedValue) {
        const scale = this.musicalScales[this.settings.scale];
        const octaveRange = Math.max(1, Math.ceil(this.zoomLevel / 2));
        const noteIndex = Math.floor(normalizedValue * scale.intervals.length * octaveRange) % scale.intervals.length;
        return scale.notes[noteIndex];
    }

    showTooltip(event, value, index) {
        const originalValue = this.currentData[Math.floor(this.currentPosition) + index];
        const note = this.getNoteForValue(value);
        const fullNote = this.valueToNote(value);
        
        this.tooltip
            .html(`
                <strong>Index:</strong> ${Math.floor(this.currentPosition) + index}<br>
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
    // ENHANCED PLAYBACK WITH NOTE TRACKING
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
            
            // Show all playback visual elements
            this.playheadLine.style('display', 'block');
            this.noteTracker.style('display', 'block');
            this.noteTrackerText.style('display', 'block');

            const bpm = this.settings.tempo;
            const intervalMs = (60 / bpm) * 250; // Quarter note timing

            this.playbackInterval = setInterval(() => {
                this.playCurrentNote();
                this.updateNoteTracker();
                this.updatePlayhead();
                this.currentPosition++;

                if (this.currentPosition >= this.currentData.length) {
                    this.stopPlayback();
                    this.resetPlayback();
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
        
        // Hide all playback visual elements
        this.playheadLine.style('display', 'none');
        this.noteTracker.style('display', 'none');
        this.noteTrackerText.style('display', 'none');
        
        // Clear current note display
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
            
            // Update current note display
            document.getElementById('currentNote').textContent = note;
        } catch (error) {
            console.error('Note play failed:', error);
        }
    }

    updateNoteTracker() {
        if (!this.currentData || this.currentData.length === 0) return;

        const normalizedData = this.normalizeData(this.currentData);
        const visibleData = this.getZoomedData(normalizedData);
        
        // Calculate position within the current view
        const globalPosition = this.currentPosition;
        const zoomedStart = this.zoomLevel === 1 ? 0 : Math.floor(globalPosition);
        const relativePosition = this.zoomLevel === 1 ? globalPosition : Math.max(0, globalPosition - zoomedStart);
        
        if (relativePosition < visibleData.length && globalPosition < normalizedData.length) {
            const x = this.xScale(relativePosition);
            const y = this.yScale(visibleData[Math.floor(relativePosition)]);
            const currentNote = this.valueToNote(normalizedData[globalPosition]);
            
            // Update note tracker circle position with smooth animation
            this.noteTracker
                .transition()
                .duration(50)
                .attr('cx', x)
                .attr('cy', y);
            
            // Update note tracker text
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
        } else {
            playIcon.textContent = '▶️';
            playText.textContent = 'Play';
            playBtn.classList.remove('playing');
        }
    }

    updatePlayhead() {
        if (!this.currentData || this.currentData.length === 0) return;

        const globalPosition = this.currentPosition;
        const zoomedStart = this.zoomLevel === 1 ? 0 : Math.floor(globalPosition);
        const relativePosition = this.zoomLevel === 1 ? globalPosition : Math.max(0, globalPosition - zoomedStart);
        
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
            infoEl.innerHTML = `
                <div><strong>Name:</strong> ${this.currentDataset.name}</div>
                <div><strong>Description:</strong> ${this.currentDataset.description}</div>
                <div><strong>Source:</strong> ${this.currentDataset.source}</div>
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