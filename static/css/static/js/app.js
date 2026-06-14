// app.js — Comparador Financiero del Perú
'use strict';

const INSTITUTIONS = [
  // BANCOS
  { id:1,  name:'BCP',          full_name:'Banco de Crédito del Perú',                type:'banco',          type_label:'Banco',          base_rates:{30:2.80,60:3.20,90:4.00,180:4.50,360:5.00}, min_amount:500,  url:'https://www.viabcp.com/ahorro/deposito-a-plazo',     logo_abbr:'BCP',   accent:'#4d9fff' },
  { id:2,  name:'BBVA',         full_name:'BBVA Continental',                          type:'banco',          type_label:'Banco',          base_rates:{30:2.50,60:3.00,90:3.80,180:4.20,360:4.80}, min_amount:1000, url:'https://www.bbva.pe/personas/productos/cuentas/cuentas-de-deposito-a-plazo.html', logo_abbr:'BBVA',  accent:'#4d9fff' },
  { id:3,  name:'Interbank',    full_name:'Interbank',                                 type:'banco',          type_label:'Banco',          base_rates:{30:3.50,60:4.00,90:5.00,180:5.50,360:6.50}, min_amount:500,  url:'https://interbank.pe/cuentas/deposito-plazo-fijo',    logo_abbr:'IBK',   accent:'#4d9fff' },
  { id:4,  name:'Scotiabank',   full_name:'Scotiabank Perú',                           type:'banco',          type_label:'Banco',          base_rates:{30:2.70,60:3.10,90:3.90,180:4.30,360:5.10}, min_amount:1000, url:'https://www.scotiabank.com.pe/Personas/Depositos/Plazo-Fijo', logo_abbr:'SCOT', accent:'#4d9fff' },
  { id:5,  name:'BanBif',       full_name:'Banco Interamericano de Finanzas',          type:'banco',          type_label:'Banco',          base_rates:{30:4.00,60:4.80,90:5.50,180:6.00,360:7.00}, min_amount:500,  url:'https://www.banbif.com.pe/personas/cuentas-de-ahorro/deposito-a-plazo', logo_abbr:'BIF', accent:'#4d9fff' },
  { id:6,  name:'Pichincha',    full_name:'Banco Pichincha',                           type:'banco',          type_label:'Banco',          base_rates:{30:3.80,60:4.50,90:5.20,180:5.80,360:6.80}, min_amount:1000, url:'https://www.pichincha.pe/ahorro/depositos-a-plazo',   logo_abbr:'PICH',  accent:'#4d9fff' },
  { id:7,  name:'Mibanco',      full_name:'Mibanco',                                   type:'banco',          type_label:'Banco',          base_rates:{30:4.50,60:5.00,90:5.80,180:6.50,360:7.50}, min_amount:300,  url:'https://www.mibanco.com.pe',                          logo_abbr:'MIB',   accent:'#4d9fff' },
  // CAJAS MUNICIPALES
  { id:8,  name:'Caja Huancayo',full_name:'CMAC Huancayo',                             type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:6.00,60:7.00,90:8.00,180:8.50,360:9.50}, min_amount:500,  url:'https://www.cajahuancayo.com.pe/tasas-de-interes',    logo_abbr:'CHY',   accent:'#00d68f' },
  { id:9,  name:'Caja Arequipa',full_name:'CMAC Arequipa',                             type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:5.50,60:6.50,90:7.50,180:8.00,360:9.00}, min_amount:500,  url:'https://www.cajaarequipa.pe/tasas-de-interes',        logo_abbr:'CAQ',   accent:'#00d68f' },
  { id:10, name:'Caja Cusco',   full_name:'CMAC Cusco',                                type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:6.00,60:7.00,90:8.00,180:8.50,360:9.50}, min_amount:500,  url:'https://www.cajacusco.com.pe',                        logo_abbr:'CCO',   accent:'#00d68f' },
  { id:11, name:'Caja Piura',   full_name:'CMAC Piura',                                type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:5.00,60:6.00,90:7.00,180:7.50,360:8.50}, min_amount:500,  url:'https://www.cmacpiura.pe',                            logo_abbr:'CPU',   accent:'#00d68f' },
  { id:12, name:'Caja Sullana', full_name:'CMAC Sullana',                              type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:5.50,60:6.50,90:7.50,180:8.00,360:9.00}, min_amount:500,  url:'https://www.cajasullana.pe',                          logo_abbr:'CSL',   accent:'#00d68f' },
  { id:13, name:'Caja Tacna',   full_name:'CMAC Tacna',                                type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:6.00,60:7.00,90:8.00,180:8.50,360:9.50}, min_amount:500,  url:'https://www.cajatacna.com.pe',                        logo_abbr:'CTA',   accent:'#00d68f' },
  { id:14, name:'Caja Trujillo',full_name:'CMAC Trujillo',                             type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:5.20,60:6.20,90:7.20,180:7.80,360:8.80}, min_amount:500,  url:'https://www.cajatrujillo.com.pe',                     logo_abbr:'CTJ',   accent:'#00d68f' },
  { id:15, name:'Caja Ica',     full_name:'CMAC Ica',                                  type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:5.00,60:6.00,90:7.00,180:7.50,360:8.50}, min_amount:500,  url:'https://www.cajaica.pe',                              logo_abbr:'CIA',   accent:'#00d68f' },
  { id:16, name:'Caja Del Santa',full_name:'CMAC Del Santa',                           type:'caja_municipal', type_label:'Caja Municipal', base_rates:{30:5.00,60:6.00,90:6.80,180:7.50,360:8.20}, min_amount:500,  url:'https://www.cajadelsanta.pe',                         logo_abbr:'CSA',   accent:'#00d68f' },
  // CAJAS RURALES
  { id:17, name:'Caja Raíz',    full_name:'CRAC Raíz',                                 type:'caja_rural',     type_label:'Caja Rural',     base_rates:{30:6.50,60:7.50,90:8.50,180:9.00,360:10.00},min_amount:500,  url:'https://www.cajaraiz.com.pe',                         logo_abbr:'CRZ',   accent:'#a78bfa' },
  { id:18, name:'Los Andes',    full_name:'CRAC Los Andes',                            type:'caja_rural',     type_label:'Caja Rural',     base_rates:{30:7.00,60:8.00,90:9.00,180:9.50,360:10.50},min_amount:500,  url:'https://www.cajalosandes.pe',                         logo_abbr:'CLA',   accent:'#a78bfa' },
  { id:19, name:'Prymera',      full_name:'CRAC Prymera',                              type:'caja_rural',     type_label:'Caja Rural',     base_rates:{30:6.20,60:7.20,90:8.20,180:8.80,360:9.80}, min_amount:500,  url:'https://www.prymera.com.pe',                          logo_abbr:'PRY',   accent:'#a78bfa' },
  { id:20, name:'Incasur',      full_name:'CRAC Incasur',                              type:'caja_rural',     type_label:'Caja Rural',     base_rates:{30:6.80,60:7.80,90:8.80,180:9.20,360:10.20},min_amount:500,  url:'https://www.incasur.com.pe',                          logo_abbr:'INC',   accent:'#a78bfa' },
  // COOPERATIVAS
  { id:21, name:'AELUCOOP',     full_name:'Cooperativa AELUCOOP',                      type:'cooperativa',    type_label:'Cooperativa',    base_rates:{30:7.00,60:8.00,90:9.00,180:9.50,360:10.50},min_amount:500,  url:'https://www.aelucoop.com.pe',                         logo_abbr:'AEL',   accent:'#f0a500' },
  { id:22, name:'Pacífico',     full_name:'Cooperativa Pacífico',                      type:'cooperativa',    type_label:'Cooperativa',    base_rates:{30:6.50,60:7.50,90:8.50,180:9.00,360:10.00},min_amount:500,  url:'https://www.coopac-pacifico.pe',                      logo_abbr:'PAC',   accent:'#f0a500' },
  { id:23, name:'León XIII',    full_name:'Cooperativa León XIII',                     type:'cooperativa',    type_label:'Cooperativa',    base_rates:{30:7.50,60:8.50,90:9.50,180:10.00,360:11.00},min_amount:500, url:'https://www.leonxiii.com.pe',                         logo_abbr:'LXIII', accent:'#f0a500' },
  { id:24, name:'ABACO',        full_name:'Cooperativa ABACO',                         type:'cooperativa',    type_label:'Cooperativa',    base_rates:{30:6.00,60:7.00,90:8.00,180:8.50,360:9.50}, min_amount:500,  url:'https://www.abaco.pe',                                logo_abbr:'ABA',   accent:'#f0a500' },
  { id:25, name:'San Cristóbal',full_name:'Cooperativa San Cristóbal de Huamanga',     type:'cooperativa',    type_label:'Cooperativa',    base_rates:{30:7.80,60:8.80,90:9.80,180:10.20,360:11.50},min_amount:500, url:'https://www.coopac-schr.pe',                          logo_abbr:'SCH',   accent:'#f0a500' },
];

const state = {
  period: '360',
  filter: 'all',
  amount: 5000,
  autoUpdate: true,
  currentRates: {},
  prevRates: {},
  countdown: 30,
  countdownTimer: null,
  reference_rate: 6.50,
};

const $ = id => document.getElementById(id);

function gaussRand(mean = 0, std = 0.06) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function initRates() {
  INSTITUTIONS.forEach(inst => {
    state.currentRates[inst.id] = {};
    state.prevRates[inst.id] = {};
    for (const p in inst.base_rates) {
      state.currentRates[inst.id][p] = inst.base_rates[p];
      state.prevRates[inst.id][p] = inst.base_rates[p];
    }
  });
}

function updateRates() {
  INSTITUTIONS.forEach(inst => {
    state.prevRates[inst.id] = { ...state.currentRates[inst.id] };
    for (const p in inst.base_rates) {
      const base = inst.base_rates[p];
      const fluct = Math.max(-0.18, Math.min(0.18, gaussRand(0, 0.07)));
      state.currentRates[inst.id][p] = Math.round((base + fluct) * 100) / 100;
    }
  });
}

function calcEarning(amount, days, teaPct) {
  const tea = teaPct / 100;
  const earning = amount * (Math.pow(1 + tea, days / 365) - 1);
  return { earning: Math.round(earning * 100) / 100, total: Math.round((amount + earning) * 100) / 100, net: Math.round(earning * 0.95 * 100) / 100 };
}

const fmt = {
  money: n => 'S/ ' + n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  rate:  n => n.toFixed(2),
};

const PERIOD_DAYS = { '30':30, '60':60, '90':90, '180':180, '360':360 };
const PERIOD_LABELS = { '30':'30 días', '60':'60 días', '90':'90 días', '180':'6 meses', '360':'1 año' };

function startClock() {
  function tick() {
    const now = new Date();
    $('currentTime').textContent = now.toLocaleTimeString('es-PE', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
    $('currentDate').textContent = now.toLocaleDateString('es-PE', { weekday:'short', day:'numeric', month:'long' });
  }
  tick(); setInterval(tick, 1000);
}

function startCountdown() {
  clearInterval(state.countdownTimer);
  state.countdown = 30;
  $('countdownNum').textContent = '30';
  $('updateBar').style.width = '0%';

  state.countdownTimer = setInterval(() => {
    state.countdown--;
    $('countdownNum').textContent = state.countdown;
    $('updateBar').style.width = ((30 - state.countdown) / 30 * 100) + '%';
    if (state.countdown <= 0) {
      clearInterval(state.countdownTimer);
      if (state.autoUpdate) refresh();
    }
  }, 1000);
}

function getData() {
  const p = state.period;
  const days = PERIOD_DAYS[p];
  return INSTITUTIONS
    .filter(inst => state.filter === 'all' || inst.type === state.filter)
    .map(inst => {
      const rate     = state.currentRates[inst.id][p];
      const prevRate = state.prevRates[inst.id][p];
      const change   = Math.round((rate - prevRate) * 1000) / 1000;
      const trend    = change > 0.05 ? 'up' : change < -0.05 ? 'down' : 'stable';
      const calc     = calcEarning(state.amount, days, rate);
      return { ...inst, rate, prevRate, change, trend, ...calc };
    })
    .sort((a, b) => b.rate - a.rate)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

function renderAll() {
  const rows = getData();
  renderStats(rows);
  renderTable(rows);
  renderBestCards();
  $('lastUpdate').textContent = 'Act: ' + new Date().toLocaleTimeString('es-PE', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  $('loadingOverlay').style.display = 'none';
  $('tableSection').style.display = 'block';
  $('refRate').textContent = state.reference_rate.toFixed(2) + '%';
  $('periodLabel').textContent = PERIOD_LABELS[state.period];
}

function renderStats(rows) {
  $('statsInstitutions').textContent = rows.length;
  $('statsMaxRate').textContent     = (rows.length ? Math.max(...rows.map(r=>r.rate)) : 0).toFixed(2) + '%';
  $('statsMaxEarning').textContent  = rows.length ? fmt.money(Math.max(...rows.map(r=>r.earning))) : '—';
  $('statsMinAmount').textContent   = rows.length ? fmt.money(Math.min(...rows.map(r=>r.min_amount))) : '—';
}

function renderTable(rows) {
  if (!rows.length) {
    $('tableBody').innerHTML = <tr><td colspan="7" style="text-align:center;padding:48px;color:var(--text-muted)">Sin resultados para este filtro</td></tr>;
    return;
  }

  const trendIcon  = t => t==='up'?'🔺':t==='down'?'🔻':'➖';
  const trendColor = t => t==='up'?'#00d68f':t==='down'?'#ff4d6d':'#8b8fa8';
  const rankCls    = r => r===1?'r1':r===2?'r2':r===3?'r3':'';
  const rowCls     = r => r===1?'top-1':r===2?'top-2':r===3?'top-3':'';

  $('tableBody').innerHTML = rows.map(r => `
    <tr class="${rowCls(r.rank)} fade-in" onclick="window.open('${r.url}','_blank','noopener')" title="Ver tarifario en ${r.full_name}">
      <td><div class="rank-badge ${rankCls(r.rank)}">${r.rank}</div></td>
      <td>
        <div class="inst-info">
          <div class="inst-logo" style="background:${r.accent}22;border:1px solid ${r.accent}66;color:${r.accent}">${r.logo_abbr}</div>
          <div>
            <div class="inst-name">${r.full_name}</div>
            <span class="inst-type-badge badge-${r.type}">${r.type_label}</span>
          </div>
        </div>
      </td>
      <td>
        <div class="rate-cell">
          <div class="rate-pill">
            <div class="rate-val">${fmt.rate(r.rate)}</div>
            <div class="rate-pct">% TEA</div>
          </div>
          <span style="color:${trendColor(r.trend)};font-size:13px">${trendIcon(r.trend)}</span>
        </div>
      </td>
      <td>
        <div class="amount-cell">
          <div class="amt-val">${fmt.money(state.amount)}</div>
          <div class="amt-min">Mín: ${fmt.money(r.min_amount)}</div>
        </div>
      </td>
      <td>
        <div class="earning-cell">
          <div class="earn-val">+${fmt.money(r.earning)}</div>
          <div class="earn-total">Total: ${fmt.money(r.total)}</div>
        </div>
      </td>
      <td>
        <div class="net-cell positive">+${fmt.money(r.net)}</div>
        <div style="font-size:10px;color:var(--text-muted)">(c/IR est.)</div>
      </td>
      <td>
        <div style="font-size:11px;color:var(--text-secondary)">${PERIOD_LABELS[state.period]}</div>
        ${r.change !== 0 ? <div style="font-size:10px;color:${trendColor(r.trend)}">${r.change>0?'+':''}${r.change.toFixed(3)}%</div> : ''}
      </td>
    </tr>`).join('');
}

function renderBestCards() {
  const p = state.period;
  const types = ['banco','caja_municipal','caja_rural','cooperativa'];
  const labels = { banco:'🏦 Mejor Banco', caja_municipal:'🏛️ Mejor CMAC', caja_rural:'🌾 Mejor CRAC', cooperativa:'🤝 Mejor COOPAC' };

  const html = types.map(type => {
    const best = INSTITUTIONS
      .filter(i => i.type === type)
      .map(i => ({ ...i, rate: state.currentRates[i.id][p] }))
      .sort((a,b) => b.rate - a.rate)[0];
    if (!best) return '';
    return `<div class="best-card" onclick="window.open('${best.url}','_blank','noopener')">
      <div class="bc-type">${labels[type]}</div>
      <div class="bc-name">${best.full_name}</div>
      <div class="bc-rate">${fmt.rate(best.rate)}<span> % TEA</span></div>
    </div>`;
  }).join('');
  $('bestCards').innerHTML = html;
}

function refresh() {
  updateRates();
  renderAll();
  startCountdown();
}

function setPeriod(period) {
  state.period = period;
  document.querySelectorAll('.period-tab').forEach(t => t.classList.toggle('active', t.dataset.period === period));
  renderAll();
}

function setFilter(filter) {
  state.filter = filter;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.filter === filter));
  renderAll();
}

function onAmountChange() {
  const v = parseFloat($('amountInput').value);
  if (!isNaN(v) && v > 0) { state.amount = v; renderAll(); }
}

document.addEventListener('DOMContentLoaded', () => {
  initRates();
  startClock();

  document.querySelectorAll('.period-tab').forEach(t => t.addEventListener('click', () => setPeriod(t.dataset.period)));
  document.querySelectorAll('.filter-tab').forEach(t => t.addEventListener('click', () => setFilter(t.dataset.filter)));

  $('amountInput').addEventListener('input', onAmountChange);
  $('autoToggle').addEventListener('change', e => {
    state.autoUpdate = e.target.checked;
    if (state.autoUpdate) refresh();
  });
  $('refreshBtn').addEventListener('click', () => refresh());

  renderAll();
  startCountdown();
});
