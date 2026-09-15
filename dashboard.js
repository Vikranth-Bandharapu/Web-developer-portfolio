/* ==========================================================================
   STACKLY SAAS DASHBOARD & EMAIL CENTER CONTROLLER MODULE
   ========================================================================== */

// Demo Fictional Email Center Dataset (8 Messages)
const mockEmails = [
  {
    id: 1,
    sender: 'Elena Rostova (VP Product)',
    email: 'elena@enterprise-tech.io',
    subject: 'Q4 Micro-Services Architecture Review & Signoff',
    preview: 'Hi Team, the security audit for the new Kubernetes mesh deployment is complete...',
    date: '10:42 AM',
    unread: true,
    priority: 'high',
    body: `Hi Stackly Team,

The third-party security audit for our new Kubernetes micro-services architecture release is officially complete with 0 critical vulnerabilities.

We are ready to promote the core payment API cluster to production staging. Please review the updated deployment roadmap attached to the sprint board.

Best regards,
Elena Rostova`
  },
  {
    id: 2,
    sender: 'DevOps Lead System',
    email: 'alerts@stackly-cloud.internal',
    subject: '[CI/CD Alert] Pipeline Build #4092 Passed Successfully',
    preview: 'Automated integration tests for stackly-core-engine finished in 3m 14s...',
    date: '09:15 AM',
    unread: true,
    priority: 'normal',
    body: `Stackly Automated Build Pipeline Report

Branch: main
Commit: 8f9b1c2 (Refactor GraphQL query optimization)
Status: SUCCESS (142 unit tests passed, 0 failures)
Coverage: 94.8%

Artifacts deployed to Staging-US-East.`
  },
  {
    id: 3,
    sender: 'Marcus Vance (Client Partner)',
    email: 'marcus.vance@fintech-global.com',
    subject: 'Feedback on SaaS Analytics Dashboard Redesign',
    preview: 'The new executive charts look outstanding! Our leadership team loved the visual clarity...',
    date: 'Yesterday',
    unread: false,
    priority: 'high',
    body: `Hello Team,

I wanted to send a quick note of gratitude for the latest UI redesign update. The real-time metric counters and smooth Chart.js rendering received high praise during our executive board presentation this morning.

Could we schedule a short alignment call on Friday to discuss phase 2 features?

Cheers,
Marcus Vance`
  },
  {
    id: 4,
    sender: 'Sarah Lin (UX Director)',
    email: 'sarah.lin@designstudio.org',
    subject: 'Design Token Guidelines & Dark Mode Asset Export',
    preview: 'I have pushed the latest Figma design tokens for the glassmorphism component library...',
    date: 'Sep 06',
    unread: false,
    priority: 'normal',
    body: `Hi Everyone,

All updated design tokens (including dark Slate gradients, Indigo hover highlights, and WCAG contrast compliant colors) have been synchronized to the repository.

Please verify the CSS variable mapping in style.css during your code review.

Thanks!
Sarah`
  },
  {
    id: 5,
    sender: 'David Ross (Head of DevOps)',
    email: 'david.ross@stackly-cloud.io',
    subject: 'SOC-2 Type II Annual Security Certification Renewed',
    preview: 'Our external SOC-2 audit report is officially published with zero exceptions...',
    date: 'Sep 05',
    unread: false,
    priority: 'high',
    body: `Team,

Our SOC-2 Type II audit report for 2026 has been signed off by Ernst & Tech Compliance. Zero security exceptions were found across our AES-256 encrypted database vaults and multi-region Kubernetes cluster deployments.

The compliance badge has been updated on the main site.

Regards,
David Ross`
  },
  {
    id: 6,
    sender: 'Alexei Volkov (Chief Architect)',
    email: 'alexei@stackly-dev.io',
    subject: 'GraphQL Gateway Query Depth Protection Hotfix Applied',
    preview: 'Pushed hotfix v4.2.1 enforcing 8-level query depth limits to prevent malicious recursions...',
    date: 'Sep 04',
    unread: false,
    priority: 'normal',
    body: `Engineers,

We have deployed hotfix v4.2.1 to production API gateways. This patch enforces a maximum 8-level query depth limit and Redis token bucket rate limiting (10,000 req/min per tenant).

Latency benchmarks remain stable at 14ms average.

Alexei`
  },
  {
    id: 7,
    sender: 'Security System Bot',
    email: 'security-bot@stackly-internal.io',
    subject: '[Security Audit] Zero Vulnerabilities in Container Image Scan',
    preview: 'Nightly vulnerability scan on docker.stackly.io/core-engine:latest complete...',
    date: 'Sep 03',
    unread: false,
    priority: 'normal',
    body: `Stackly Container Vulnerability Monitor

Target Image: docker.stackly.io/core-engine:v4.2.0
Critical: 0
High: 0
Medium: 0
Low: 0

Status: PASSED CLEAN`
  },
  {
    id: 8,
    sender: 'Client Support Ops',
    email: 'support@stackly-client.io',
    subject: 'Sprint 4 Stakeholder Review & Live Demo Schedule',
    preview: 'Sprint 4 demo environment is staged and ready for executive review on Thursday...',
    date: 'Sep 02',
    unread: false,
    priority: 'high',
    body: `Hi Partners,

The Sprint 4 release candidate has been staged at staging.stackly-demo.io. We look forward to walking through the new automated email center, cluster health metrics, and customizable workspace settings during our call on Thursday.

Best,
Stackly Client Services`
  },
  {
    id: 9,
    sender: 'Cloudflare Edge Billing',
    email: 'billing@cloudflare-mesh.internal',
    subject: 'TLS 1.3 Auto-Renewal Completed for api.stackly.io',
    preview: 'Universal SSL certificate for api.stackly.io renewed automatically until Nov 2026...',
    date: 'Sep 01',
    unread: false,
    priority: 'normal',
    body: `Cloudflare Automated SSL & Domain Operations

Domain: api.stackly.io
Protocol: TLS 1.3 / HTTP/3
Status: RENEWED & ACTIVE
Valid Until: November 2026

Edge cache hit ratio across 285 PoPs: 98.4%.`
  },
  {
    id: 10,
    sender: 'Cyber-Audit Labs (Q3 PenTest)',
    email: 'reports@cyber-audit-lab.io',
    subject: 'Q3 Penetration Test & OWASP Top 10 Assessment',
    preview: 'Executive summary report: 0 Critical, 0 High, 2 Low findings resolved in staging...',
    date: 'Aug 30',
    unread: false,
    priority: 'high',
    body: `Dear Engineering Leadership,

Cyber-Audit Labs has completed the Q3 2026 penetration assessment of Stackly's API Gateways and OAuth2 authentication handlers.

Result Summary:
- OWASP Top 10 Compliance: PASSED
- CORS & CSP Policy Verification: ENFORCED
- Redis Rate Limit Resilience: VERIFIED

Attached: Full Audit Executive Briefing.`
  },
  {
    id: 11,
    sender: 'Alexei Volkov (Chief Architect)',
    email: 'alexei@stackly-dev.io',
    subject: 'Multi-Region PostgreSQL Sharding Architecture Whitepaper',
    preview: 'Team, here is the technical specification for PgBouncer connection pooling...',
    date: 'Aug 28',
    unread: false,
    priority: 'normal',
    body: `Engineering Team,

Please review the proposed database sharding specification for handling 50,000+ concurrent tenant connections.

Key Highlights:
- Active-Active replication between US-East and EU-Central.
- Sub-millisecond failover using Consul leader election.
- PgBouncer session pooling enforcing 2,000 max connection caps.

Feedback welcome during tomorrow's architecture review.`
  },
  {
    id: 12,
    sender: 'Stackly System Onboarding',
    email: 'onboarding@stackly-cloud.io',
    subject: 'Welcome to Stackly SaaS Engineering Workspace!',
    preview: 'Your developer environment is fully provisioned with SOC-2 compliance badges...',
    date: 'Aug 25',
    unread: false,
    priority: 'normal',
    body: `Welcome to Stackly Developer Platform!

Your workspace credentials are key to managing Kubernetes clusters, monitoring real-time telemetry, and deploying microservices.

Need assistance? Refer to our internal documentation or ping #devops-support.`
  }
];

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  initDashboardAuthCheck();
  initDashboardTabs();
  applyDashboardMode();
  initSidebarMobile();
  initCharts();
  initEmailCenter();
  initTaskFilters();
  window.scrollTo(0, 0);
});

/* 1. AUTH SESSION CHECK & USER PROFILE DISPLAY */
function initDashboardAuthCheck() {
  const sessionData = localStorage.getItem('stackly_user_session');
  const user = sessionData ? JSON.parse(sessionData) : { name: 'DEVELOPER DEMO', role: 'Developer' };

  const nameEl = document.getElementById('dash-user-name');
  const roleEl = document.getElementById('dash-user-role');

  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = user.role.toUpperCase();

  const logoutBtn = document.getElementById('dash-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('stackly_user_session');
      showToast('Logged out successfully.', 'info');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }
}

/* 2. DUAL DASHBOARD MODE SWITCHER (CLIENT vs ADMIN OPS) */
function applyDashboardMode() {
  const urlParams = new URLSearchParams(window.location.search);
  let mode = urlParams.get('mode');

  const sessionData = localStorage.getItem('stackly_user_session');
  const user = sessionData ? JSON.parse(sessionData) : null;

  if (!mode) {
    if (user && user.role === 'Admin') mode = 'admin';
    else mode = 'client';
  }

  const bannerContainer = document.getElementById('dash-mode-banner-container');
  const avatarEl = document.getElementById('dash-user-avatar');
  const nameEl = document.getElementById('dash-user-name');
  const roleEl = document.getElementById('dash-user-role');

  const btnClient = document.getElementById('mode-btn-client');
  const btnAdmin = document.getElementById('mode-btn-admin');

  if (mode === 'admin' || mode === '2') {
    // DASHBOARD 2: SYSADMIN & CLOUD OPERATIONS CONSOLE
    document.title = 'Dashboard 2: SysAdmin Operations Console — Stackly';

    if (btnAdmin) {
      btnAdmin.classList.remove('btn-secondary');
      btnAdmin.classList.add('btn-cyan', 'shimmer-btn');
    }

    if (bannerContainer) {
      bannerContainer.innerHTML = `
        <div style="background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(139, 92, 246, 0.2)); border: 1px solid rgba(79, 70, 229, 0.4); border-radius: 14px; padding: 16px 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 42px; height: 42px; background: rgba(79, 70, 229, 0.3); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #818cf8; flex-shrink: 0;"><i class="fa-solid fa-server"></i></div>
            <div>
              <div class="dash-mode-banner-title" style="font-weight: 800; font-size: 1.1rem; color: #ffffff; letter-spacing: 0.02em;">DASHBOARD 2 — SYSADMIN & CLOUD OPERATIONS CONSOLE</div>
              <div style="font-size: 0.85rem; color: #a5b4fc;">Live Kubernetes Pods Telemetry, PostgreSQL Shard Sync & Security Audits</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge-tag badge-indigo" style="font-size: 0.85rem; padding: 6px 12px;"><i class="fa-solid fa-microchip"></i> Admin Operations Mode</span>
          </div>
        </div>
      `;
    }

    if (avatarEl) {
      avatarEl.textContent = 'AV';
      avatarEl.style.background = 'linear-gradient(135deg, #4f46e5, #8b5cf6)';
    }
    if (nameEl) nameEl.textContent = user && user.role === 'Admin' ? user.name : 'Alexei Volkov (Chief Architect)';
    if (roleEl) {
      roleEl.textContent = 'SYSADMIN / DEVOPS';
      roleEl.style.color = '#818cf8';
    }

    // Activate Cluster Metrics (#tab-analytics) for Dashboard 2
    const adminTabLink = document.querySelector('[data-tab="analytics"]');
    if (adminTabLink) adminTabLink.click();

  } else {
    // DASHBOARD 1: CLIENT EXECUTIVE PORTAL
    document.title = 'Dashboard 1: Client Executive Workspace — Stackly';

    if (btnClient) {
      btnClient.classList.remove('btn-secondary');
      btnClient.classList.add('btn-cyan', 'shimmer-btn');
    }

    if (bannerContainer) {
      bannerContainer.innerHTML = `
        <div style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15)); border: 1px solid rgba(6, 182, 212, 0.35); border-radius: 14px; padding: 16px 24px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 42px; height: 42px; background: rgba(6, 182, 212, 0.25); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #38bdf8; flex-shrink: 0;"><i class="fa-solid fa-chart-pie"></i></div>
            <div>
              <div class="dash-mode-banner-title" style="font-weight: 800; font-size: 1.1rem; color: #ffffff; letter-spacing: 0.02em;">DASHBOARD 1 — CLIENT EXECUTIVE PROJECT PORTAL</div>
              <div style="font-size: 0.85rem; color: #7dd3fc;">Sprint 4 Deliverables Progress, Financial ARR Telemetry & Communications Hub</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge-tag badge-cyan" style="font-size: 0.85rem; padding: 6px 12px;"><i class="fa-solid fa-user-shield"></i> Client Executive Mode</span>
          </div>
        </div>
      `;
    }

    if (avatarEl) {
      avatarEl.textContent = 'MV';
      avatarEl.style.background = 'linear-gradient(135deg, #06b6d4, #3b82f6)';
    }
    if (nameEl) nameEl.textContent = user && user.role === 'Client' ? user.name : 'Marcus Vance (Client Partner)';
    if (roleEl) {
      roleEl.textContent = 'CLIENT EXECUTIVE';
      roleEl.style.color = '#38bdf8';
    }

    // Activate Overview (#tab-overview) for Dashboard 1
    const clientTabLink = document.querySelector('[data-tab="overview"]');
    if (clientTabLink) clientTabLink.click();
  }
}

/* 3. DASHBOARD SIDEBAR TAB NAVIGATION */
function initDashboardTabs() {
  const navLinks = document.querySelectorAll('.dash-nav-link');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');

  if (navLinks.length === 0) return;

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute('data-tab');

      navLinks.forEach(n => n.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      link.classList.add('active');

      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) { targetPane.classList.add('active'); }
      window.scrollTo(0, 0);

      // Close sidebar and dismiss backdrop on mobile after tab click
      const sidebar = document.querySelector('.dash-sidebar');
      const backdrop = document.querySelector('.dash-sidebar-backdrop');
      if (sidebar && window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

/* 3. SIDEBAR TOGGLE ON DESKTOP & MOBILE WITH BACKDROP OVERLAY */
function initSidebarMobile() {
  const sidebar = document.querySelector('.dash-sidebar');
  const main = document.querySelector('.dash-main');
  if (!sidebar) return;

  // Create backdrop element dynamically if it doesn't exist
  let backdrop = document.querySelector('.dash-sidebar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'dash-sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  const closeSidebar = () => {
    if (window.innerWidth > 1024) {
      sidebar.classList.add('collapsed');
      if (main) main.classList.add('sidebar-collapsed');
    } else {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const closeBtn = document.querySelector('.dash-sidebar-close');
  if (closeBtn) {
    closeBtn.removeEventListener('click', closeSidebar);
    closeBtn.addEventListener('click', closeSidebar);
  }

  if (backdrop) {
    backdrop.removeEventListener('click', closeSidebar);
    backdrop.addEventListener('click', closeSidebar);
  }

  // Close sidebar on mobile when selecting any navigation link
  document.querySelectorAll('.dash-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (window.innerWidth <= 1024 && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    }
  });
}

/* 4. CHART.JS INITIALIZATION */
function initCharts() {
  const revenueCanvas = document.getElementById('chart-revenue');
  const velocityCanvas = document.getElementById('chart-velocity');

  if (typeof Chart === 'undefined') return;

  if (revenueCanvas) {
    new Chart(revenueCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Platform Revenue ($k)',
          data: [42, 58, 65, 82, 94, 112, 130, 154],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.15)',
          fill: true,
          tension: 0.4,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { size: 10 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { size: 10 } } }
        }
      }
    });
  }

  if (velocityCanvas) {
    new Chart(velocityCanvas, {
      type: 'bar',
      data: {
        labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5'],
        datasets: [{
          label: 'Story Points Completed',
          data: [48, 62, 55, 78, 84],
          backgroundColor: '#06b6d4',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af', font: { size: 10 } } }
        }
      }
    });
  }
}

/* 5. INTERACTIVE EMAIL CENTER */
let activeEmails = [...mockEmails];
let currentFilter = 'all';

function initEmailCenter() {
  const emailListEl = document.getElementById('email-list-container');
  const searchInput = document.getElementById('email-search-input');
  const filterBtns = document.querySelectorAll('.email-filter-btn');

  if (!emailListEl) return;

  function renderEmailList() {
    emailListEl.innerHTML = '';

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    const filtered = activeEmails.filter(email => {
      const matchesSearch = email.subject.toLowerCase().includes(searchTerm) ||
                            email.sender.toLowerCase().includes(searchTerm) ||
                            email.preview.toLowerCase().includes(searchTerm);

      if (!matchesSearch) return false;

      if (currentFilter === 'unread') return email.unread;
      if (currentFilter === 'high') return email.priority === 'high';
      return true;
    });

    if (filtered.length === 0) {
      emailListEl.innerHTML = `<li style="padding: 24px; text-align: center; color: #9ca3af;">No messages match your filter.</li>`;
      return;
    }

    filtered.forEach(email => {
      const li = document.createElement('li');
      li.className = `email-item ${email.unread ? 'unread' : ''}`;
      li.innerHTML = `
        <div class="email-sender">
          <span>${email.sender}</span>
          <span style="font-size: 0.75rem; opacity: 0.7;">${email.date}</span>
        </div>
        <div class="email-subject">${email.subject}</div>
        <div class="email-preview-snippet">${email.preview}</div>
      `;

      li.addEventListener('click', () => {
        document.querySelectorAll('.email-item').forEach(item => item.classList.remove('active'));
        li.classList.add('active');
        email.unread = false;
        li.classList.remove('unread');
        renderEmailDetail(email);
      });

      emailListEl.appendChild(li);
    });

    // Automatically render first email if available
    if (filtered.length > 0) {
      renderEmailDetail(filtered[0]);
    }
  }

  function renderEmailDetail(email) {
    const detailPane = document.getElementById('email-detail-container');
    if (!detailPane) return;

    detailPane.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 16px; margin-bottom: 20px;">
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary btn-sm" onclick="window.location.href='404.html'"><i class="fa-solid fa-reply"></i> Reply</button>
          <button class="btn btn-secondary btn-sm" onclick="window.location.href='404.html'"><i class="fa-solid fa-share"></i> Forward</button>
          <button class="btn btn-secondary btn-sm" onclick="window.location.href='404.html'"><i class="fa-regular fa-star"></i></button>
          <button class="btn btn-secondary btn-sm" onclick="window.location.href='404.html'"><i class="fa-solid fa-box-archive"></i></button>
        </div>
        <div style="font-size: 0.8rem; color: #9ca3af;">
          <i class="fa-solid fa-shield-halved" style="color: #34d399; margin-right: 4px;"></i> Encrypted AES-256
        </div>
      </div>

      <div class="email-detail-header">
        <div class="email-detail-title">${email.subject}</div>
        <div class="email-meta">
          <span>From: <strong>${email.sender}</strong> &lt;<a href="mailto:${email.email}" style="color: var(--accent-cyan);">${email.email}</a>&gt;</span>
          <span>${email.date}</span>
        </div>
      </div>

      <div class="email-body-text">
        ${email.body.replace(/\n/g, '<br>')}
      </div>

      <!-- Attachment section if high priority or audit email -->
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06);">
        <div style="font-size: 0.85rem; font-weight: 600; color: #9ca3af; margin-bottom: 10px;">Attachments (2 Files)</div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <div class="attachment-pill" onclick="window.location.href='404.html'">
            <i class="fa-regular fa-file-pdf" style="color: #f43f5e;"></i> SOC2_Compliance_Audit_2026.pdf (1.8 MB)
          </div>
          <div class="attachment-pill" onclick="window.location.href='404.html'">
            <i class="fa-regular fa-file-image" style="color: #38bdf8;"></i> Architecture_Roadmap_v4.2.webp (840 KB)
          </div>
        </div>
      </div>

      <!-- Quick Reply Text Area -->
      <div style="margin-top: 32px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px;">
        <div style="font-size: 0.9rem; font-weight: 600; color: #fff; margin-bottom: 10px;">Quick Reply to ${email.sender}</div>
        <textarea id="email-reply-text" style="width: 100%; height: 90px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; padding: 10px; font-size: 0.9rem; font-family: inherit; resize: vertical; margin-bottom: 12px;">Hi ${email.sender},

Thank you for the detailed update regarding "${email.subject}". We have reviewed the roadmap specifications and approved the release candidate deployment for staging.

Best regards,
Stackly Engineering Operations</textarea>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem; color: #6b7280;">Markdown supported</span>
          <button class="btn btn-cyan btn-sm shimmer-btn" onclick="window.location.href='404.html'"><i class="fa-solid fa-paper-plane"></i> Send Reply</button>
        </div>
      </div>
    `;
  }

  if (searchInput) searchInput.addEventListener('input', renderEmailList);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderEmailList();
    });
  });

  renderEmailList();
}

function sendQuickReply(senderName) {
  window.location.href = '404.html';
}

/* 6. TASKS TABLE FILTER & CATEGORY FILTER */
function initTaskFilters() {
  const searchInput = document.getElementById('task-search-input');
  const taskRows = document.querySelectorAll('.task-table-row');
  const catBtns = document.querySelectorAll('.task-category-btn');

  if (taskRows.length === 0) return;

  let activeCategory = 'all';

  function applyTaskFilters() {
    const searchVal = searchInput ? searchInput.value.toLowerCase() : '';

    taskRows.forEach(row => {
      const textMatches = row.textContent.toLowerCase().includes(searchVal);
      const rowCat = row.getAttribute('data-category');
      const catMatches = (activeCategory === 'all') || (rowCat === activeCategory);

      if (textMatches && catMatches) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', applyTaskFilters);

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      applyTaskFilters();
    });
  });
}

/* 7. DYNAMIC TASK CREATOR HANDLER */
function handleAddNewTask() {
  window.location.href = '404.html';
}




/* GLOBAL BULLETPROOF MOBILE SIDEBAR TOGGLE */
function toggleMobileDashSidebar(e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  const sidebar = document.querySelector('.dash-sidebar');
  const main = document.querySelector('.dash-main');
  let backdrop = document.querySelector('.dash-sidebar-backdrop');
  
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'dash-sidebar-backdrop';
    document.body.appendChild(backdrop);
  }
  backdrop.onclick = () => {
    if (sidebar) sidebar.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (sidebar) {
    if (window.innerWidth > 1024) {
      if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        if (main) main.classList.remove('sidebar-collapsed');
      } else {
        sidebar.classList.add('collapsed');
        if (main) main.classList.add('sidebar-collapsed');
      }
    } else {
      const isOpen = sidebar.classList.contains('open');
      if (isOpen) {
        sidebar.classList.remove('open');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        sidebar.classList.add('open');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  }
}
window.toggleMobileDashSidebar = toggleMobileDashSidebar;
