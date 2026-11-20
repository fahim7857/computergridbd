/* ==========================================================================
   ComputeGrid BD — Interactive Frontend Simulation (Vanilla ES6+)
   Frontend Demonstration Only — All Data & Telemetry Are Simulated
   ========================================================================== */

(() => {
  "use strict";

  const STORAGE_KEY = "computegrid_bd_demo_v1";

  const DEFAULT_GPUS = [
    {
      id: "gpu-4090-01",
      model: "NVIDIA RTX 4090",
      shortModel: "RTX 4090",
      vram: 24,
      status: "Online",
      availableForJobs: true,
      utilization: 78,
      temp: 64,
      uptimeHours: 142.5,
      offlineHours: 12.0,
      city: "Dhaka",
      machineLabel: "Gaming & AI Rig",
      category: "Flagship LLM & Diffusion",
      indicativePrice: 42,
      cudaCores: "16,384",
      tdp: "450W",
      driver: "560.94 (Demo)",
    },
    {
      id: "gpu-3090-02",
      model: "NVIDIA RTX 3090",
      shortModel: "RTX 3090",
      vram: 24,
      status: "Online",
      availableForJobs: true,
      utilization: 62,
      temp: 68,
      uptimeHours: 98.2,
      offlineHours: 15.5,
      city: "Chattogram",
      machineLabel: "Workstation Pro",
      category: "High-VRAM Inference",
      indicativePrice: 30,
      cudaCores: "10,496",
      tdp: "350W",
      driver: "555.85 (Demo)",
    },
    {
      id: "gpu-3060-03",
      model: "NVIDIA RTX 3060",
      shortModel: "RTX 3060",
      vram: 12,
      status: "Offline",
      availableForJobs: false,
      utilization: 0,
      temp: 34,
      uptimeHours: 64.0,
      offlineHours: 28.0,
      city: "Sylhet",
      machineLabel: "Home PC Node",
      category: "Lightweight Inference",
      indicativePrice: 16,
      cudaCores: "3,584",
      tdp: "170W",
      driver: "551.61 (Demo)",
    },
    {
      id: "gpu-4070-04",
      model: "NVIDIA RTX 4070",
      shortModel: "RTX 4070",
      vram: 12,
      status: "Online",
      availableForJobs: true,
      utilization: 54,
      temp: 59,
      uptimeHours: 112.8,
      offlineHours: 7.0,
      city: "Dhaka",
      machineLabel: "Creator Studio PC",
      category: "Fine-Tuning & Vision",
      indicativePrice: 22,
      cudaCores: "5,888",
      tdp: "200W",
      driver: "560.94 (Demo)",
    },
  ];

  const EXTRA_MARKETPLACE_LISTINGS = [
    {
      id: "mkt-4080-05",
      model: "NVIDIA RTX 4080",
      shortModel: "RTX 4080",
      vram: 16,
      status: "Online",
      city: "Dhaka",
      category: "Multimodal & Diffusion",
      indicativePrice: 34,
      cudaCores: "9,728",
      uptimeScore: "94.2% (Demo)",
    },
    {
      id: "mkt-3080-06",
      model: "NVIDIA RTX 3080 Ti",
      shortModel: "RTX 3080 Ti",
      vram: 12,
      status: "Offline",
      city: "Rajshahi",
      category: "Vision & Embeddings",
      indicativePrice: 24,
      cudaCores: "10,240",
      uptimeScore: "81.0% (Demo)",
    },
  ];

  const DEFAULT_TRANSACTIONS = [
    {
      ref: "TXN-BD-8401",
      period: "Nov 01 – Nov 07, 2026",
      hours: 112.0,
      method: "bKash Wallet (Demo)",
      status: "Settled (Demo)",
      amount: 1120,
    },
    {
      ref: "TXN-BD-8458",
      period: "Nov 08 – Nov 14, 2026",
      hours: 141.5,
      method: "Nagad Transfer (Demo)",
      status: "Settled (Demo)",
      amount: 1415,
    },
    {
      ref: "TXN-BD-8512",
      period: "Nov 15 – Current",
      hours: 164.0,
      method: "Local Bank EFT (Demo)",
      status: "Pending (Demo)",
      amount: 1640,
    },
  ];

  const PIPELINE_STAGES = [
    {
      title: "Stage 01: GPU Owners",
      desc: "Individual PC gamers, university labs, and creative workstations in Bangladesh opt in during idle hours without needing dedicated data-center hardware.",
    },
    {
      title: "Stage 02: GPU Agent",
      desc: "A lightweight background agent monitors local GPU VRAM, utilization, and thermal safety, sending periodic encrypted heartbeats to the platform.",
    },
    {
      title: "Stage 03: GPU Registry",
      desc: "The central registry tracks hardware capabilities, regional latency, and real-time online/offline status across all connected contributor nodes.",
    },
    {
      title: "Stage 04: Orchestration Engine",
      desc: "Matches incoming AI tasks to verified online GPUs and automatically reroutes workloads if an intermittent contributor machine goes offline.",
    },
    {
      title: "Stage 05: Compute API",
      desc: "Exposes a clean REST endpoint (such as POST /api/v1/compute/jobs) so developers never manage individual contributor IP addresses.",
    },
    {
      title: "Stage 06: AI Customers",
      desc: "Local startups, researchers, and independent developers run inference, fine-tuning, and batch jobs billed transparently in BDT.",
    },
  ];

  const ARCH_COMPONENTS = [
    {
      title: "01. GPU Contributor Agent",
      desc: "Runs safely in user space on Windows or Linux gaming PCs and workstations. Reads read-only GPU telemetry (model, VRAM, temperature, utilization), opens an outbound TLS connection, and executes workloads only inside isolated containers.",
    },
    {
      title: "02. Authentication Service",
      desc: "Issues scoped node credentials and developer API keys, validating every agent heartbeat and API call so unauthorized or spoofed nodes cannot enter the compute pool.",
    },
    {
      title: "03. GPU Registry",
      desc: "Maintains the authoritative inventory of GPU models, VRAM sizes, Bangladesh metro regions, thermal headroom, and live Online/Offline availability states.",
    },
    {
      title: "04. Uptime Verification Engine",
      desc: "Consumes periodic agent heartbeats and health probes. Any machine missing its heartbeat window is immediately marked Offline and excluded from verified uptime rewards.",
    },
    {
      title: "05. Resource Orchestration Engine",
      desc: "Schedules containerized inference and checkpointed training tasks onto healthy nodes, handling graceful eviction or re-dispatch when a personal PC shuts down.",
    },
    {
      title: "06. Compute API Gateway",
      desc: "Provides rate limiting, schema validation, usage metering, and unified REST routing for AI developer applications.",
    },
    {
      title: "07. AI Developer Applications",
      desc: "Web apps, LLM inference backends, Bangla NLP startups, and research pipelines consuming affordable distributed GPU compute on demand.",
    },
  ];

  const API_ENDPOINTS = {
    jobs: {
      title: "POST /api/v1/compute/jobs",
      desc: "Submit a containerized inference or batch workload to an eligible verified GPU node.",
      payload: `{
  "model": "example-llm",
  "gpu_requirement": "high-memory",
  "task_type": "inference"
}`,
    },
    nodes: {
      title: "GET /api/v1/nodes/available",
      desc: "Query aggregated VRAM capacity and online node pools currently passing heartbeat checks.",
      payload: `{
  "region": "BD-ALL",
  "min_vram_gb": 12,
  "verified_only": true
}`,
    },
    status: {
      title: "GET /api/v1/compute/jobs/{id}",
      desc: "Poll job lifecycle state, assigned region, and simulated execution latency.",
      payload: `{
  "job_id": "job_cgbd_demo_9042",
  "include_telemetry": true
}`,
    },
  };

  function getDefaultState() {
    return {
      gpus: JSON.parse(JSON.stringify(DEFAULT_GPUS)),
      transactions: JSON.parse(JSON.stringify(DEFAULT_TRANSACTIONS)),
      activeDashTab: "overview",
      gpuFilter: "all",
      gpuSearch: "",
      activeEndpoint: "jobs",
      pulseCount: 14,
      lastPulse: new Date().toLocaleTimeString(),
      preferences: {
        autoHeartbeat: true,
        defaultRegion: "Dhaka",
        thermalThreshold: 82,
        calcRate: 10,
        calcHours: 240,
        calcAvailability: 85,
      },
      events: [
        { time: "Just now", message: "Demo workspace initialized with 4 simulated Bangladesh GPU nodes." },
        { time: "1m ago", message: "NVIDIA RTX 3060 (Sylhet) marked Offline — excluded from availability." },
        { time: "3m ago", message: "Verified heartbeat batch recorded for 3 online GPUs." },
      ],
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultState();
      const parsed = JSON.parse(raw);
      const defaults = getDefaultState();
      return {
        ...defaults,
        ...parsed,
        preferences: { ...defaults.preferences, ...(parsed.preferences || {}) },
        gpus: Array.isArray(parsed.gpus) && parsed.gpus.length ? parsed.gpus : defaults.gpus,
        events: Array.isArray(parsed.events) && parsed.events.length ? parsed.events : defaults.events,
      };
    } catch {
      return getDefaultState();
    }
  }

  let state = loadState();
  const charts = {
    overview: null,
    uptime: null,
    earnings: null,
    api: null,
  };

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota issues in restricted browsers
    }
  }

  function addEvent(message) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    state.events.unshift({ time, message });
    if (state.events.length > 12) state.events.length = 12;
  }

  function showToast(message) {
    const region = document.getElementById("toastRegion");
    if (!region) return;
    const toast = document.createElement("div");
    toast.className = "toast-item";
    toast.textContent = message;
    region.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  function formatBDT(amount) {
    return "৳" + Math.round(amount).toLocaleString("en-US");
  }

  function computeMetrics() {
    const totalLocal = state.gpus.length;
    const onlineNodes = state.gpus.filter((g) => g.status === "Online");
    const readyNodes = onlineNodes.filter((g) => g.availableForJobs);
    const localOnlineCount = onlineNodes.length;
    const localOnlineVram = onlineNodes.reduce((sum, g) => sum + g.vram, 0);
    const localVerifiedHours = state.gpus.reduce((sum, g) => sum + g.uptimeHours, 0);
    const localOfflineHours = state.gpus.reduce((sum, g) => sum + g.offlineHours, 0);
    const availabilityPct = totalLocal > 0 ? (localOnlineCount / totalLocal) * 100 : 0;

    // Network-wide simulated figures scale directly with local simulated changes
    const baseCommunityTotal = 138;
    const baseCommunityOnline = 105;
    const baseCommunityVram = 1920;
    const baseCommunityHours = 18000;

    const rate = Number(state.preferences.calcRate) || 10;
    const totalEarnings = localVerifiedHours * rate;
    const todayEarnings = readyNodes.length * 6 * rate;
    const pendingEarnings = Math.round(totalEarnings * 0.15);

    return {
      totalLocal,
      localOnlineCount,
      readyCount: readyNodes.length,
      localOnlineVram,
      localVerifiedHours,
      localOfflineHours,
      availabilityPct,
      networkTotalGpus: baseCommunityTotal + totalLocal,
      networkOnlineGpus: baseCommunityOnline + localOnlineCount,
      networkAvailableVram: baseCommunityVram + localOnlineVram,
      networkVerifiedHours: baseCommunityHours + localVerifiedHours,
      totalEarnings,
      todayEarnings,
      pendingEarnings,
    };
  }

  /* ==========================================================================
     Renderers
     ========================================================================== */

  function renderHeroAndNetwork() {
    const m = computeMetrics();

    document.getElementById("heroTotalGpus").textContent = m.networkTotalGpus.toLocaleString("en-US");
    document.getElementById("heroTotalGpusHint").textContent = `Includes ${m.totalLocal} interactive local nodes`;
    document.getElementById("heroOnlineGpus").textContent = m.networkOnlineGpus.toLocaleString("en-US");
    document.getElementById("heroOnlineGpusHint").textContent = `${m.localOnlineCount} of ${m.totalLocal} local nodes active`;
    document.getElementById("heroAvailableVram").textContent = `${m.networkAvailableVram.toLocaleString("en-US")} GB`;
    document.getElementById("heroVerifiedHours").textContent = `${m.networkVerifiedHours.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} hrs`;

    document.getElementById("heroTopologyOnlineLabel").textContent = `${m.localOnlineCount} of ${m.totalLocal} local nodes online`;
    document.getElementById("topoActiveVram").textContent = `${m.localOnlineVram} GB Online`;

    // Update the first 4 topology nodes in the hero SVG to mirror live state
    for (let i = 0; i < 4; i++) {
      const gpu = state.gpus[i];
      const subEl = document.getElementById(`topo-sub-${i}`);
      const edgeEl = document.getElementById(`edge-node-${i + 1}`);
      const boxWrap = document.querySelector(`.topo-node[data-node-index="${i}"] .topo-box`);
      if (!gpu || !subEl || !edgeEl || !boxWrap) continue;

      const isOnline = gpu.status === "Online";
      subEl.textContent = `${gpu.city} · ${gpu.status}`;
      edgeEl.classList.toggle("topo-edge-offline", !isOnline);
      boxWrap.classList.toggle("topo-box-offline", !isOnline);
    }
  }

  function renderDashboardKpis() {
    const m = computeMetrics();

    document.getElementById("dashTotalGpus").textContent = m.totalLocal;
    document.getElementById("dashOnlineGpus").textContent = m.localOnlineCount;
    document.getElementById("dashOnlineVramHint").textContent = `${m.localOnlineVram} GB VRAM available`;
    document.getElementById("dashVerifiedUptime").textContent = `${m.localVerifiedHours.toFixed(1)} hrs`;
    document.getElementById("dashAvailabilityPctHint").textContent = `${m.availabilityPct.toFixed(1)}% fleet availability`;
    document.getElementById("dashEstimatedEarnings").textContent = formatBDT(m.totalEarnings);

    // Uptime Tab inside Dashboard
    document.getElementById("dashTabOnlineCount").textContent = `${m.localOnlineCount} / ${m.totalLocal}`;
    document.getElementById("dashTabVerifiedHours").textContent = `${m.localVerifiedHours.toFixed(1)} hrs`;
    document.getElementById("dashTabOfflineHours").textContent = `${m.localOfflineHours.toFixed(1)} hrs`;
    document.getElementById("dashTabAvailability").textContent = `${m.availabilityPct.toFixed(1)}%`;

    // Earnings Tab inside Dashboard
    document.getElementById("dashTabTotalEarn").textContent = formatBDT(m.totalEarnings);
    document.getElementById("dashTabTodayEarn").textContent = formatBDT(m.todayEarnings);
    document.getElementById("dashTabEarnHours").textContent = `${m.localVerifiedHours.toFixed(1)} hrs`;
    document.getElementById("dashTabPendingEarn").textContent = formatBDT(m.pendingEarnings);

    // Uptime Section 4 KPIs
    document.getElementById("uptimeOnlineDuration").textContent = `${m.localVerifiedHours.toFixed(1)} hrs`;
    document.getElementById("uptimeOfflineDuration").textContent = `${m.localOfflineHours.toFixed(1)} hrs`;
    document.getElementById("uptimeVerifiedHours").textContent = `${m.localVerifiedHours.toFixed(1)} hrs`;
    document.getElementById("uptimeAvailabilityPct").textContent = `${m.availabilityPct.toFixed(1)}%`;
    document.getElementById("uptimeFormulaHint").textContent =
      m.localOnlineCount === 0
        ? "All nodes offline — 0 GPUs eligible for uptime verification"
        : `${m.localOnlineCount} of ${m.totalLocal} machines actively passing health checks`;

    // Earnings Section 5 KPIs
    document.getElementById("earnTotalAmount").textContent = formatBDT(m.totalEarnings);
    document.getElementById("earnTodayAmount").textContent = formatBDT(m.todayEarnings);
    document.getElementById("earnVerifiedHours").textContent = `${m.localVerifiedHours.toFixed(1)} hrs`;
    document.getElementById("earnPendingAmount").textContent = formatBDT(m.pendingEarnings);

    // API Section 7 eligible node count
    document.getElementById("apiEligibleNodes").textContent = `${m.readyCount} Online`;
  }

  function renderGpuTables() {
    const overviewTbody = document.getElementById("overviewGpuTableBody");
    const myGpusTbody = document.getElementById("myGpusTableBody");
    if (!overviewTbody || !myGpusTbody) return;

    // Overview table (all local demo GPUs)
    overviewTbody.innerHTML = state.gpus
      .map((gpu) => {
        const isOnline = gpu.status === "Online";
        const statusCls = isOnline ? "status-online" : "status-offline";
        const toggleLabel = isOnline ? "Disconnect GPU" : "Connect GPU";
        const toggleBtnCls = isOnline ? "btn-table-disconnect" : "btn-table-connect";

        return `
          <tr>
            <td>
              <div class="gpu-model-cell">
                <span class="gpu-model-name">${escapeHtml(gpu.model)}</span>
                <span class="gpu-model-meta">${escapeHtml(gpu.city)} · ${escapeHtml(gpu.machineLabel)}</span>
              </div>
            </td>
            <td class="tabular-nums">${gpu.vram} GB</td>
            <td><span class="status-label ${statusCls}">${gpu.status.toUpperCase()}</span></td>
            <td class="tabular-nums">${isOnline ? gpu.utilization + "%" : "0%"}</td>
            <td class="tabular-nums">${gpu.temp}°C</td>
            <td class="tabular-nums">${gpu.uptimeHours.toFixed(1)}h</td>
            <td class="text-right">
              <div class="table-actions">
                <button type="button" class="btn-table ${toggleBtnCls}" data-action="toggle-conn" data-id="${gpu.id}">
                  ${toggleLabel}
                </button>
                <button type="button" class="btn-table" data-action="view-gpu" data-id="${gpu.id}">
                  View Details
                </button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");

    // Filtered My GPUs table
    const query = state.gpuSearch.trim().toLowerCase();
    const filtered = state.gpus.filter((gpu) => {
      const matchesFilter =
        state.gpuFilter === "all" ||
        (state.gpuFilter === "online" && gpu.status === "Online") ||
        (state.gpuFilter === "offline" && gpu.status === "Offline");
      const matchesSearch =
        !query ||
        gpu.model.toLowerCase().includes(query) ||
        gpu.city.toLowerCase().includes(query) ||
        gpu.machineLabel.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      myGpusTbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 28px; color: var(--text-muted);">
            No simulated GPUs match your current filter. Try clearing the search or clicking "Add Demo GPU".
          </td>
        </tr>
      `;
      return;
    }

    myGpusTbody.innerHTML = filtered
      .map((gpu) => {
        const isOnline = gpu.status === "Online";
        const statusCls = isOnline ? "status-online" : "status-offline";
        const availLabel = !isOnline ? "Unavailable" : gpu.availableForJobs ? "Accepting Jobs" : "Paused";
        const availCls = !isOnline ? "status-offline" : gpu.availableForJobs ? "status-online" : "status-paused";

        return `
          <tr>
            <td>
              <div class="gpu-model-cell">
                <span class="gpu-model-name">${escapeHtml(gpu.model)}</span>
                <span class="gpu-model-meta">${escapeHtml(gpu.city)} · ${escapeHtml(gpu.machineLabel)}</span>
              </div>
            </td>
            <td class="tabular-nums">${gpu.vram} GB</td>
            <td><span class="status-label ${statusCls}">${gpu.status.toUpperCase()}</span></td>
            <td><span class="status-label ${availCls}">${availLabel}</span></td>
            <td class="tabular-nums">${isOnline ? gpu.utilization + "%" : "0%"}</td>
            <td class="tabular-nums">${gpu.temp}°C</td>
            <td class="tabular-nums">${gpu.uptimeHours.toFixed(1)}h</td>
            <td class="text-right">
              <div class="table-actions">
                <button type="button" class="btn-table ${isOnline ? "btn-table-disconnect" : "btn-table-connect"}" data-action="toggle-conn" data-id="${gpu.id}">
                  ${isOnline ? "Disconnect" : "Connect"}
                </button>
                <button type="button" class="btn-table" data-action="toggle-avail" data-id="${gpu.id}">
                  Toggle Availability
                </button>
                <button type="button" class="btn-table" data-action="view-gpu" data-id="${gpu.id}">
                  Details
                </button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  function renderEventLog() {
    const list = document.getElementById("dashEventLog");
    if (!list) return;
    list.innerHTML = state.events
      .map(
        (ev) => `
      <li class="event-log-item">
        <span class="event-msg">${escapeHtml(ev.message)}</span>
        <span class="event-time tabular-nums">${escapeHtml(ev.time)}</span>
      </li>
    `
      )
      .join("");
  }

  function renderTransactions() {
    const tbody = document.getElementById("transactionsTableBody");
    if (!tbody) return;
    tbody.innerHTML = state.transactions
      .map(
        (t) => `
      <tr>
        <td class="mono-code">${escapeHtml(t.ref)}</td>
        <td>${escapeHtml(t.period)}</td>
        <td class="tabular-nums">${t.hours.toFixed(1)} hrs</td>
        <td>${escapeHtml(t.method)}</td>
        <td><span class="status-label ${t.status.includes("Settled") ? "status-online" : "status-paused"}">${escapeHtml(t.status)}</span></td>
        <td class="text-right tabular-nums">${formatBDT(t.amount)}</td>
      </tr>
    `
      )
      .join("");
  }

  function renderHeartbeatIndicators() {
    const m = computeMetrics();
    const hasOnline = m.localOnlineCount > 0;
    const isRunning = state.preferences.autoHeartbeat && hasOnline;

    const mainDot = document.getElementById("mainHeartbeatDot");
    const dashDot = document.getElementById("dashHeartbeatDot");
    const mainTitle = document.getElementById("mainHeartbeatTitle");
    const dashStatus = document.getElementById("dashHeartbeatStatusText");

    if (mainDot) mainDot.classList.toggle("paused", !isRunning);
    if (dashDot) dashDot.classList.toggle("paused", !isRunning);

    if (!hasOnline) {
      mainTitle.textContent = "No Online Nodes · Heartbeat Verification Paused";
      dashStatus.textContent = "All demo GPUs are disconnected. Offline machines are not counted as available.";
    } else if (!state.preferences.autoHeartbeat) {
      mainTitle.textContent = "Auto-Heartbeat Disabled in Settings · Manual Check Mode";
      dashStatus.textContent = "Auto-heartbeat paused in Settings. Use Send Manual Heartbeat to simulate checks.";
    } else {
      mainTitle.textContent = `Simulated Heartbeat Active · Verifying ${m.localOnlineCount} Online Node${m.localOnlineCount > 1 ? "s" : ""}`;
      dashStatus.textContent = `Simulated heartbeat verification active (${m.localOnlineCount} of ${m.totalLocal} nodes online).`;
    }

    document.getElementById("heartbeatLastPulse").textContent = state.lastPulse;
    document.getElementById("heartbeatPulseCount").textContent = state.pulseCount.toLocaleString("en-US");
    document.getElementById("heartbeatActiveNodes").textContent = `${m.localOnlineCount} / ${m.totalLocal}`;
    document.getElementById("dashTopbarHeartbeat").textContent = `Last simulated check: ${state.lastPulse}`;
  }

  function renderEarningsCalculator() {
    const rate = Number(state.preferences.calcRate);
    const hours = Number(state.preferences.calcHours);
    const avail = Number(state.preferences.calcAvailability);

    const verifiedHours = (hours * avail) / 100;
    const monthly = verifiedHours * rate;
    const yearly = monthly * 12;

    document.getElementById("calcRateRange").value = rate;
    document.getElementById("calcHoursRange").value = hours;
    document.getElementById("calcAvailRange").value = avail;

    document.getElementById("calcRateDisplay").textContent = `৳${rate} / hr`;
    document.getElementById("calcHoursDisplay").textContent = `${hours} hrs`;
    document.getElementById("calcAvailDisplay").textContent = `${avail}%`;

    document.getElementById("calcFormulaLine").textContent =
      `${hours} hrs × ${avail}% availability = ${verifiedHours.toFixed(1)} verified hrs × ৳${rate}/hr`;
    document.getElementById("calcMonthlyResult").textContent = formatBDT(monthly);
    document.getElementById("calcVerifiedHrsOut").textContent = `${verifiedHours.toFixed(1)} hrs`;
    document.getElementById("calcYearlyResult").textContent = formatBDT(yearly);

    updateEarningsChart(monthly);
  }

  function getMarketplaceListings() {
    // Merge local GPUs + extra marketplace listings so connecting/disconnecting GPUs reflects in marketplace too
    const combined = [
      ...state.gpus.map((g) => ({
        id: g.id,
        model: g.model,
        shortModel: g.shortModel,
        vram: g.vram,
        status: g.status,
        city: g.city,
        category: g.category,
        indicativePrice: g.indicativePrice,
        cudaCores: g.cudaCores,
        uptimeScore: g.status === "Online" ? "Active Demo Node" : "Offline Demo Node",
        isLocal: true,
      })),
      ...EXTRA_MARKETPLACE_LISTINGS.map((x) => ({ ...x, isLocal: false })),
    ];
    return combined;
  }

  function renderMarketplace() {
    const grid = document.getElementById("marketplaceGrid");
    if (!grid) return;

    const modelFilter = document.getElementById("filterModel").value;
    const vramFilter = Number(document.getElementById("filterVram").value);
    const availFilter = document.getElementById("filterAvailability").value;
    const maxPrice = Number(document.getElementById("filterMaxPrice").value);
    document.getElementById("filterMaxPriceVal").textContent = `Up to ৳${maxPrice}/hr`;

    const listings = getMarketplaceListings().filter((item) => {
      const matchModel = modelFilter === "all" || item.model.includes(modelFilter);
      const matchVram = item.vram >= vramFilter;
      const matchAvail = availFilter === "all" || item.status === availFilter;
      const matchPrice = item.indicativePrice <= maxPrice;
      return matchModel && matchVram && matchAvail && matchPrice;
    });

    if (listings.length === 0) {
      grid.innerHTML = `
        <div class="empty-state-card">
          <h3 class="panel-title">No Simulated GPUs Match Your Filters</h3>
          <p class="panel-subtitle" style="margin: 8px 0 16px;">
            Try expanding your VRAM or hourly price range to view available demo listings.
          </p>
          <button type="button" class="btn btn-secondary btn-sm" id="emptyResetMarketBtn">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("emptyResetMarketBtn");
      if (resetBtn) resetBtn.addEventListener("click", resetMarketplaceFilters);
      return;
    }

    grid.innerHTML = listings
      .map((item) => {
        const isOnline = item.status === "Online";
        return `
          <article class="market-card">
            <div>
              <div class="market-card-head">
                <div>
                  <h3 class="market-gpu-name">${escapeHtml(item.model)}</h3>
                  <p class="market-category">${escapeHtml(item.category)}</p>
                </div>
                <span class="status-label ${isOnline ? "status-online" : "status-offline"}">
                  ${isOnline ? "ONLINE (DEMO)" : "OFFLINE (DEMO)"}
                </span>
              </div>

              <div class="market-specs-grid" style="margin-top: 14px;">
                <div class="spec-cell">
                  <span>VRAM Capacity</span>
                  <strong>${item.vram} GB GDDR6X</strong>
                </div>
                <div class="spec-cell">
                  <span>Region</span>
                  <strong>${escapeHtml(item.city)}, BD</strong>
                </div>
                <div class="spec-cell">
                  <span>CUDA Cores</span>
                  <strong>${escapeHtml(item.cudaCores)}</strong>
                </div>
                <div class="spec-cell">
                  <span>Listing Type</span>
                  <strong>Simulated Node</strong>
                </div>
              </div>
            </div>

            <div class="market-card-footer">
              <div>
                <span class="market-price tabular-nums">৳${item.indicativePrice}</span>
                <span class="market-price-unit">/hr indicative</span>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" data-market-detail="${item.id}">
                View Details
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  /* ==========================================================================
     Charts (Chart.js via CDN with clean HTML5 Canvas Fallback)
     ========================================================================== */

  function renderAllCharts() {
    updateOverviewChart();
    updateUptimeChart();
    updateEarningsChart((state.preferences.calcHours * state.preferences.calcAvailability * state.preferences.calcRate) / 100);
    updateApiUsageChart();
  }

  function updateOverviewChart() {
    const canvas = document.getElementById("overviewAllocationChart");
    if (!canvas) return;
    const online = state.gpus.filter((g) => g.status === "Online");
    const offlineCount = state.gpus.length - online.length;
    const labels = online.map((g) => `${g.shortModel} (${g.vram}GB)`);
    const data = online.map((g) => g.vram);
    if (offlineCount > 0) {
      labels.push("Offline Capacity");
      data.push(state.gpus.filter((g) => g.status === "Offline").reduce((s, g) => s + g.vram, 0));
    }

    if (typeof Chart === "undefined") {
      drawFallbackBars(canvas, labels, data, "#38bdf8");
      return;
    }

    if (charts.overview) charts.overview.destroy();
    charts.overview = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ["#3b82f6", "#06b6d4", "#8b5cf6", "#10b981", "#334155"],
            borderColor: "#0d1323",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "66%",
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#cbd5e1", boxWidth: 12, font: { family: "Plus Jakarta Sans", size: 12 } },
          },
        },
      },
    });
  }

  function updateUptimeChart() {
    const canvas = document.getElementById("weeklyUptimeChart");
    if (!canvas) return;

    const m = computeMetrics();
    const factor = m.totalLocal > 0 ? m.localOnlineCount / m.totalLocal : 0;
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const baseVerified = [16.5, 18.2, 14.0, 19.5, 17.8, 21.0, 15.6];
    const verifiedSeries = baseVerified.map((v) => Number((v * (0.4 + 0.6 * factor)).toFixed(1)));
    const offlineSeries = verifiedSeries.map((v) => Number((24 - v).toFixed(1)));

    const avg = (verifiedSeries.reduce((a, b) => a + b, 0) / 7).toFixed(1);
    document.getElementById("weeklyUptimeSummary").textContent = `Avg ${avg} hrs/day verified`;

    if (typeof Chart === "undefined") {
      drawFallbackBars(canvas, days, verifiedSeries, "#10b981");
      return;
    }

    if (charts.uptime) charts.uptime.destroy();
    charts.uptime = new Chart(canvas, {
      type: "bar",
      data: {
        labels: days,
        datasets: [
          {
            label: "Verified Online Hours (Demo)",
            data: verifiedSeries,
            backgroundColor: "#06b6d4",
            borderRadius: 5,
          },
          {
            label: "Offline / Idle Hours (Excluded)",
            data: offlineSeries,
            backgroundColor: "rgba(148, 163, 184, 0.18)",
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: "#94a3b8" },
          },
          y: {
            stacked: true,
            max: 24,
            grid: { color: "rgba(148, 163, 184, 0.1)" },
            ticks: { color: "#94a3b8" },
          },
        },
        plugins: {
          legend: {
            labels: { color: "#cbd5e1", font: { family: "Plus Jakarta Sans", size: 12 } },
          },
        },
      },
    });
  }

  function updateEarningsChart(monthlyValue) {
    const canvas = document.getElementById("earningsProjectionChart");
    if (!canvas) return;

    const months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];
    const cumulative = months.map((_, idx) => Math.round(monthlyValue * (idx + 1)));

    if (typeof Chart === "undefined") {
      drawFallbackBars(canvas, months, cumulative, "#3b82f6");
      return;
    }

    if (charts.earnings) charts.earnings.destroy();
    charts.earnings = new Chart(canvas, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Cumulative Illustrative Earnings (৳)",
            data: cumulative,
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.14)",
            fill: true,
            tension: 0.32,
            pointRadius: 4,
            pointBackgroundColor: "#38bdf8",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
          y: { grid: { color: "rgba(148, 163, 184, 0.1)" }, ticks: { color: "#94a3b8" } },
        },
        plugins: {
          legend: { labels: { color: "#cbd5e1", font: { size: 12 } } },
        },
      },
    });
  }

  function updateApiUsageChart() {
    const canvas = document.getElementById("apiUsageChart");
    if (!canvas) return;
    const labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];
    const values = [1420, 1180, 2140, 3490, 3810, 2780];

    if (typeof Chart === "undefined") {
      drawFallbackBars(canvas, labels, values, "#3b82f6");
      return;
    }

    if (charts.api) charts.api.destroy();
    charts.api = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Simulated Requests",
            data: values,
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 11 } } },
          y: { grid: { color: "rgba(148, 163, 184, 0.1)" }, ticks: { color: "#94a3b8", font: { size: 11 } } },
        },
        plugins: { legend: { display: false } },
      },
    });
  }

  function drawFallbackBars(canvas, labels, values, color) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = (canvas.width = canvas.parentElement.clientWidth || 360);
    const h = (canvas.height = canvas.parentElement.clientHeight || 200);
    ctx.clearRect(0, 0, w, h);
    const max = Math.max(...values, 1);
    const barW = Math.max(18, (w - 40) / values.length - 12);
    values.forEach((v, idx) => {
      const barH = ((h - 48) * v) / max;
      const x = 24 + idx * (barW + 12);
      const y = h - 26 - barH;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barW, barH);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px sans-serif";
      ctx.fillText(String(labels[idx]).slice(0, 6), x, h - 8);
    });
  }

  /* ==========================================================================
     Actions & Mutations
     ========================================================================== */

  function toggleGpuConnection(gpuId) {
    const gpu = state.gpus.find((g) => g.id === gpuId);
    if (!gpu) return;

    if (gpu.status === "Online") {
      gpu.status = "Offline";
      gpu.availableForJobs = false;
      gpu.utilization = 0;
      gpu.temp = 35;
      gpu.offlineHours = Number((gpu.offlineHours + 0.5).toFixed(1));
      addEvent(`${gpu.model} (${gpu.city}) disconnected — status set to OFFLINE.`);
      showToast(`${gpu.model} disconnected. Network stats updated.`);
    } else {
      gpu.status = "Online";
      gpu.availableForJobs = true;
      gpu.utilization = Math.floor(45 + Math.random() * 35);
      gpu.temp = Math.floor(56 + Math.random() * 14);
      addEvent(`${gpu.model} (${gpu.city}) connected — reporting verified availability.`);
      showToast(`${gpu.model} connected and marked ONLINE.`);
    }

    saveState();
    refreshAllUI();
  }

  function toggleGpuAvailability(gpuId) {
    const gpu = state.gpus.find((g) => g.id === gpuId);
    if (!gpu) return;

    if (gpu.status !== "Online") {
      showToast(`Connect ${gpu.model} first before enabling job availability.`);
      return;
    }

    gpu.availableForJobs = !gpu.availableForJobs;
    gpu.utilization = gpu.availableForJobs ? Math.floor(48 + Math.random() * 32) : 8;
    addEvent(
      `${gpu.model} (${gpu.city}) job availability ${gpu.availableForJobs ? "enabled" : "paused"}.`
    );
    showToast(`${gpu.model}: ${gpu.availableForJobs ? "Accepting jobs" : "Paused for local use"}.`);
    saveState();
    refreshAllUI();
  }

  function openGpuDetailsModal(gpuId) {
    const listing = getMarketplaceListings().find((item) => item.id === gpuId);
    const localGpu = state.gpus.find((g) => g.id === gpuId);
    const item = localGpu || listing;
    if (!item) return;

    const isOnline = item.status === "Online";
    document.getElementById("detailsModalKicker").textContent = localGpu
      ? "Simulated Provider Device"
      : "Simulated Marketplace Listing";
    document.getElementById("detailsModalTitle").textContent = item.model;

    document.getElementById("detailsModalBody").innerHTML = `
      <div class="modal-specs-list">
        <div class="modal-spec-item">
          <span>Connection Status</span>
          <strong class="${isOnline ? "status-online" : "status-offline"}">${item.status.toUpperCase()} (DEMO)</strong>
        </div>
        <div class="modal-spec-item">
          <span>VRAM Capacity</span>
          <strong>${item.vram} GB</strong>
        </div>
        <div class="modal-spec-item">
          <span>Location</span>
          <strong>${escapeHtml(item.city)}, Bangladesh</strong>
        </div>
        <div class="modal-spec-item">
          <span>Indicative Hourly Rate</span>
          <strong>৳${item.indicativePrice}/hr (Illustrative)</strong>
        </div>
        <div class="modal-spec-item">
          <span>CUDA Cores</span>
          <strong>${escapeHtml(item.cudaCores)}</strong>
        </div>
        <div class="modal-spec-item">
          <span>${localGpu ? "Simulated Telemetry" : "Workload Fit"}</span>
          <strong>${localGpu ? `${item.temp}°C · ${isOnline ? item.utilization : 0}% util` : escapeHtml(item.category)}</strong>
        </div>
      </div>
      <p class="form-note">
        Notice: This is a simulated hardware profile for startup demonstration. No live GPU is being provisioned or billed.
      </p>
    `;

    const footer = document.getElementById("detailsModalFooter");
    if (localGpu) {
      footer.innerHTML = `
        <button type="button" class="btn btn-secondary" data-close-modal="detailsModal">Close</button>
        <button type="button" class="btn btn-primary" id="modalToggleConnBtn">
          ${isOnline ? "Disconnect GPU" : "Connect GPU"}
        </button>
      `;
      document.getElementById("modalToggleConnBtn").addEventListener("click", () => {
        toggleGpuConnection(localGpu.id);
        closeModal("detailsModal");
      });
    } else {
      footer.innerHTML = `
        <button type="button" class="btn btn-secondary" data-close-modal="detailsModal">Close</button>
        <button type="button" class="btn btn-primary" id="modalDryRunBtn">
          Simulate Job Dry-Run
        </button>
      `;
      document.getElementById("modalDryRunBtn").addEventListener("click", () => {
        showToast(`Simulated dry-run checked for ${item.model} (${item.city}). Not a real purchase.`);
        closeModal("detailsModal");
      });
    }

    openModal("detailsModal");
  }

  function runHeartbeatTick(isManual = false) {
    const onlineGpus = state.gpus.filter((g) => g.status === "Online");
    if (onlineGpus.length === 0) {
      renderHeartbeatIndicators();
      if (isManual) showToast("Manual heartbeat check: 0 online GPUs found.");
      return;
    }

    state.pulseCount += 1;
    state.lastPulse = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    onlineGpus.forEach((gpu) => {
      gpu.uptimeHours = Number((gpu.uptimeHours + 0.1).toFixed(1));
      if (gpu.availableForJobs) {
        const deltaUtil = Math.floor(Math.random() * 7) - 3;
        gpu.utilization = Math.min(96, Math.max(25, gpu.utilization + deltaUtil));
        gpu.temp = Math.min(state.preferences.thermalThreshold - 2, Math.max(52, gpu.temp + (Math.random() > 0.5 ? 1 : -1)));
      }
    });

    if (isManual) {
      addEvent(`Manual heartbeat verified ${onlineGpus.length} online node(s).`);
      showToast(`Simulated heartbeat verified ${onlineGpus.length} online GPU(s).`);
    }

    saveState();
    renderHeroAndNetwork();
    renderDashboardKpis();
    renderGpuTables();
    renderHeartbeatIndicators();
    renderEventLog();
  }

  function simulateSuddenDrop() {
    const online = state.gpus.filter((g) => g.status === "Online");
    if (online.length === 0) {
      showToast("All demo GPUs are already offline. Connect one to test a node drop.");
      return;
    }
    const target = online[online.length - 1];
    target.status = "Offline";
    target.availableForJobs = false;
    target.utilization = 0;
    target.temp = 35;
    target.offlineHours = Number((target.offlineHours + 1.0).toFixed(1));
    addEvent(`Missed heartbeat detected: ${target.model} (${target.city}) dropped to OFFLINE.`);
    showToast(`Node drop simulated: ${target.model} marked Offline.`);
    saveState();
    refreshAllUI();
  }

  function switchDashTab(tabName) {
    state.activeDashTab = tabName;
    saveState();

    document.querySelectorAll(".dash-nav-item").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.dashTab === tabName);
    });
    document.querySelectorAll(".dash-view").forEach((view) => {
      view.hidden = view.id !== `dashView-${tabName}`;
    });

    const labelMap = {
      overview: "Overview",
      "my-gpus": "My GPUs",
      uptime: "Uptime",
      earnings: "Earnings",
      transactions: "Transactions",
      settings: "Settings",
    };
    document.getElementById("dashBreadcrumb").textContent = `Provider Console / ${labelMap[tabName] || "Overview"}`;
  }

  function resetMarketplaceFilters() {
    document.getElementById("filterModel").value = "all";
    document.getElementById("filterVram").value = "0";
    document.getElementById("filterAvailability").value = "all";
    document.getElementById("filterMaxPrice").value = "60";
    renderMarketplace();
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = false;
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function refreshAllUI() {
    renderHeroAndNetwork();
    renderDashboardKpis();
    renderGpuTables();
    renderEventLog();
    renderTransactions();
    renderHeartbeatIndicators();
    renderEarningsCalculator();
    renderMarketplace();
    renderAllCharts();
  }

  /* ==========================================================================
     Event Bindings & Initialization
     ========================================================================== */

  function bindEvents() {
    // Mobile Menu Drawer
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileDrawer = document.getElementById("mobileDrawer");
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener("click", () => {
        const isOpen = !mobileDrawer.hidden;
        mobileDrawer.hidden = isOpen;
        mobileBtn.setAttribute("aria-expanded", String(!isOpen));
      });
      mobileDrawer.querySelectorAll("a, button").forEach((link) => {
        link.addEventListener("click", () => {
          mobileDrawer.hidden = true;
          mobileBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Header Get Started & Hero CTA -> Scroll to Dashboard + open Add GPU flow or focus console
    const jumpToProviderOnboarding = () => {
      document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
      switchDashTab("my-gpus");
      openModal("addGpuModal");
    };
    document.getElementById("navGetStartedBtn").addEventListener("click", jumpToProviderOnboarding);
    document.getElementById("mobileGetStartedBtn").addEventListener("click", jumpToProviderOnboarding);
    document.getElementById("heroBecomeProviderBtn").addEventListener("click", () => {
      document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
      switchDashTab("overview");
      showToast("Welcome to the simulated GPU Provider Dashboard.");
    });

    // Dashboard Sidebar Navigation
    document.querySelectorAll(".dash-nav-item").forEach((btn) => {
      btn.addEventListener("click", () => switchDashTab(btn.dataset.dashTab));
    });

    document.getElementById("overviewManageAllBtn").addEventListener("click", () => {
      switchDashTab("my-gpus");
    });

    // Connect All Demo GPUs
    document.getElementById("connectAllGpusBtn").addEventListener("click", () => {
      state.gpus.forEach((g) => {
        if (g.status !== "Online") {
          g.status = "Online";
          g.availableForJobs = true;
          g.utilization = Math.floor(45 + Math.random() * 35);
          g.temp = Math.floor(58 + Math.random() * 10);
        }
      });
      addEvent("All local demo GPUs connected and online.");
      showToast("All demo GPUs connected.");
      saveState();
      refreshAllUI();
    });

    // Add Demo GPU Modal
    document.getElementById("openAddGpuModalBtn").addEventListener("click", () => openModal("addGpuModal"));
    document.getElementById("addGpuForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const [model, vramStr] = document.getElementById("newGpuModel").value.split("|");
      const city = document.getElementById("newGpuCity").value;
      const machineLabel = document.getElementById("newGpuLabel").value.trim() || "Contributor Node";
      const vram = Number(vramStr);

      const newGpu = {
        id: `gpu-custom-${Date.now()}`,
        model,
        shortModel: model.replace("NVIDIA ", ""),
        vram,
        status: "Online",
        availableForJobs: true,
        utilization: 48,
        temp: 60,
        uptimeHours: 1.0,
        offlineHours: 0.0,
        city,
        machineLabel,
        category: vram >= 24 ? "High-VRAM Inference" : "Fine-Tuning & Vision",
        indicativePrice: vram >= 24 ? 36 : 20,
        cudaCores: vram >= 24 ? "10,496+" : "5,888+",
        tdp: "250W",
        driver: "560.94 (Demo)",
      };

      state.gpus.push(newGpu);
      addEvent(`Added & connected ${model} (${city}) to local simulated fleet.`);
      showToast(`${model} added and connected.`);
      e.target.reset();
      closeModal("addGpuModal");
      saveState();
      refreshAllUI();
    });

    // Table Action Delegation (Overview + My GPUs)
    document.addEventListener("click", (e) => {
      const actionBtn = e.target.closest("[data-action]");
      if (actionBtn) {
        const { action, id } = actionBtn.dataset;
        if (action === "toggle-conn") toggleGpuConnection(id);
        if (action === "toggle-avail") toggleGpuAvailability(id);
        if (action === "view-gpu") openGpuDetailsModal(id);
      }

      const marketBtn = e.target.closest("[data-market-detail]");
      if (marketBtn) {
        openGpuDetailsModal(marketBtn.dataset.marketDetail);
      }

      const closeBtn = e.target.closest("[data-close-modal]");
      if (closeBtn) {
        closeModal(closeBtn.dataset.closeModal);
      }
    });

    // Close modals on backdrop click or Escape key
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) backdrop.hidden = true;
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop").forEach((m) => (m.hidden = true));
      }
    });

    // My GPUs Search & Filter
    document.getElementById("gpuSearchInput").addEventListener("input", (e) => {
      state.gpuSearch = e.target.value;
      renderGpuTables();
    });
    document.querySelectorAll("[data-gpu-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.gpuFilter = btn.dataset.gpuFilter;
        document.querySelectorAll("[data-gpu-filter]").forEach((b) =>
          b.classList.toggle("active", b === btn)
        );
        renderGpuTables();
      });
    });

    // Settings
    const autoHbCheckbox = document.getElementById("settingAutoHeartbeat");
    const regionSelect = document.getElementById("settingRegionSelect");
    const thermalRange = document.getElementById("settingThermalLimit");
    const thermalVal = document.getElementById("settingThermalLimitVal");

    autoHbCheckbox.checked = state.preferences.autoHeartbeat;
    regionSelect.value = state.preferences.defaultRegion;
    thermalRange.value = state.preferences.thermalThreshold;
    thermalVal.textContent = `${state.preferences.thermalThreshold}°C`;
    document.getElementById("newGpuCity").value = state.preferences.defaultRegion;

    autoHbCheckbox.addEventListener("change", () => {
      state.preferences.autoHeartbeat = autoHbCheckbox.checked;
      saveState();
      renderHeartbeatIndicators();
      showToast(`Auto-heartbeat ${autoHbCheckbox.checked ? "enabled" : "paused"}.`);
    });
    regionSelect.addEventListener("change", () => {
      state.preferences.defaultRegion = regionSelect.value;
      document.getElementById("newGpuCity").value = regionSelect.value;
      saveState();
      showToast(`Default contributor region set to ${regionSelect.value}.`);
    });
    thermalRange.addEventListener("input", () => {
      state.preferences.thermalThreshold = Number(thermalRange.value);
      thermalVal.textContent = `${thermalRange.value}°C`;
      saveState();
    });

    document.getElementById("resetDemoStateBtn").addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      state = getDefaultState();
      autoHbCheckbox.checked = state.preferences.autoHeartbeat;
      regionSelect.value = state.preferences.defaultRegion;
      thermalRange.value = state.preferences.thermalThreshold;
      thermalVal.textContent = `${state.preferences.thermalThreshold}°C`;
      switchDashTab("overview");
      refreshAllUI();
      showToast("Demo state reset to initial defaults.");
    });

    // CSV Export
    document.getElementById("exportLedgerBtn").addEventListener("click", () => {
      const rows = [
        ["Reference ID", "Period", "Verified Hours", "Method", "Status", "Amount (BDT)"],
        ...state.transactions.map((t) => [t.ref, t.period, t.hours, t.method, t.status, t.amount]),
      ];
      const csv = rows.map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "computegrid-bd-demo-ledger.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast("Demo payout ledger CSV downloaded.");
    });

    // Uptime controls
    document.getElementById("manualHeartbeatBtn").addEventListener("click", () => runHeartbeatTick(true));
    document.getElementById("simulateDropBtn").addEventListener("click", simulateSuddenDrop);

    // Earnings Calculator sliders
    ["calcRateRange", "calcHoursRange", "calcAvailRange"].forEach((id) => {
      document.getElementById(id).addEventListener("input", () => {
        state.preferences.calcRate = Number(document.getElementById("calcRateRange").value);
        state.preferences.calcHours = Number(document.getElementById("calcHoursRange").value);
        state.preferences.calcAvailability = Number(document.getElementById("calcAvailRange").value);
        saveState();
        renderDashboardKpis();
        renderEarningsCalculator();
      });
    });

    // Marketplace Filters
    ["filterModel", "filterVram", "filterAvailability", "filterMaxPrice"].forEach((id) => {
      document.getElementById(id).addEventListener("input", renderMarketplace);
      document.getElementById(id).addEventListener("change", renderMarketplace);
    });
    document.getElementById("resetMarketplaceFiltersBtn").addEventListener("click", resetMarketplaceFilters);

    // Pipeline Stages (Section 2)
    document.querySelectorAll(".pipeline-node").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.stage);
        document.querySelectorAll(".pipeline-node").forEach((b) => {
          const active = b === btn;
          b.classList.toggle("active", active);
          b.setAttribute("aria-selected", String(active));
        });
        document.getElementById("pipelineStageActiveTitle").textContent = PIPELINE_STAGES[idx].title;
        document.getElementById("pipelineDetailText").textContent = PIPELINE_STAGES[idx].desc;
      });
    });

    // Architecture Inspector (Section 8)
    document.querySelectorAll(".arch-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.arch);
        document.querySelectorAll(".arch-card").forEach((b) => b.classList.toggle("active", b === btn));
        document.getElementById("archInspectorTitle").textContent = ARCH_COMPONENTS[idx].title;
        document.getElementById("archInspectorDesc").textContent = ARCH_COMPONENTS[idx].desc;
      });
    });

    // Developer API Console (Section 7)
    document.querySelectorAll(".endpoint-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.endpoint;
        state.activeEndpoint = key;
        document.querySelectorAll(".endpoint-item").forEach((b) => b.classList.toggle("active", b === btn));
        const ep = API_ENDPOINTS[key];
        document.getElementById("activeEndpointTitle").textContent = ep.title;
        document.getElementById("activeEndpointDesc").textContent = ep.desc;
        document.getElementById("apiExampleCode").textContent = ep.payload;
      });
    });

    document.getElementById("copyApiExampleBtn").addEventListener("click", async () => {
      const text = document.getElementById("apiExampleCode").textContent;
      try {
        await navigator.clipboard.writeText(text);
        showToast("API JSON example copied to clipboard.");
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        showToast("API JSON example copied to clipboard.");
      }
    });

    document.getElementById("simulateApiCallBtn").addEventListener("click", () => {
      const m = computeMetrics();
      const online = state.gpus.filter((g) => g.status === "Online" && g.availableForJobs);
      const selected = online[0];
      const reqEl = document.getElementById("apiReqCount");
      const currentReqs = Number(reqEl.textContent.replaceAll(",", "")) + 1;
      reqEl.textContent = currentReqs.toLocaleString("en-US");

      if (!selected) {
        document.getElementById("apiResponseStatusLabel").textContent = "HTTP 503 No Online GPUs (Mock)";
        document.getElementById("apiResponseCode").textContent = JSON.stringify(
          {
            error: "no_eligible_nodes_online",
            simulated: true,
            message: "Connect at least one GPU in the Provider Dashboard to simulate job dispatch.",
          },
          null,
          2
        );
        showToast("Simulated API returned 503: no online GPUs available.");
        return;
      }

      document.getElementById("apiResponseStatusLabel").textContent = "HTTP 202 Accepted (Mock)";
      document.getElementById("apiResponseCode").textContent = JSON.stringify(
        {
          job_id: `job_cgbd_demo_${Math.floor(1000 + Math.random() * 9000)}`,
          status: "dispatched_simulation",
          matched_node: {
            gpu_model: selected.model,
            vram_gb: selected.vram,
            region: `${selected.city}, BD`,
          },
          eligible_pool_size: m.readyCount,
          note: "Frontend simulation only — no real backend job executed.",
        },
        null,
        2
      );
      showToast(`Simulated job routed to ${selected.model} (${selected.city}).`);
    });

    document.getElementById("openApiDocsBtn").addEventListener("click", () => openModal("apiDocsModal"));

    // Active top nav highlight on scroll
    const navLinks = Array.from(document.querySelectorAll(".main-nav .nav-link"));
    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY + 120;
        const sections = [
          { id: "home", nav: "home" },
          { id: "how-it-works", nav: "how-it-works" },
          { id: "dashboard", nav: "dashboard" },
          { id: "marketplace", nav: "marketplace" },
          { id: "developers", nav: "developers" },
        ];
        let current = "home";
        sections.forEach((s) => {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= scrollY) current = s.nav;
        });
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.nav === current);
        });
      },
      { passive: true }
    );
  }

  function init() {
    switchDashTab(state.activeDashTab);
    bindEvents();
    refreshAllUI();

    // Simulated periodic heartbeat every 3.5 seconds
    setInterval(() => {
      if (state.preferences.autoHeartbeat) {
        runHeartbeatTick(false);
      }
    }, 3500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
