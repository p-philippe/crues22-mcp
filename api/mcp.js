// MCP Streamable HTTP — lecture seule Crues 22
// POST/GET /api/mcp ou /mcp

const PROTOCOL = '2025-03-26';
const SITE = 'https://dawn-acorn-pilot-fleet.grok.me';
const UA = 'Mozilla/5.0 (compatible; Crues22-MCP/1.0; +https://dawn-acorn-pilot-fleet.grok.me)';

const VL = {
  '-1': 'N/A',
  0: 'Vert — pas de vigilance particulière',
  1: 'Jaune — débordements possibles',
  2: 'Orange — débordements importants',
  3: 'Rouge — crue majeure',
};

const APIC_NIV = { 1: 'précipitations intenses', 2: 'précipitations très intenses' };
const VF_NIV = { 1: 'risque de crue forte', 2: 'risque de crue très forte' };

const TRONCONS = {
  BT13: 'Léguer – Guindy – Jaudy',
  BT14: 'Trieux – Leff – Gouët',
  BT15: 'Rance – Frémur – Arguenon – Gouessant',
  BT2: 'Hyère',
  BT5: 'Blavet amont',
  BT7: 'Oust amont',
};

const ST = {
  J061161001: { n: "St-Jouan-de-l'Isle [Pont Rimbert]", c: 'Rance', s: { s1: 1.2, s2: 1.8, s3: 2.4 }, t: 'BT15', com: "Saint-Jouan-de-l'Isle" },
  J100452001: { n: 'Pleslin-Trigavou [Vieux Moulin]', c: 'Frémur', s: { s1: 0.7, s2: 1.1, s3: 1.5 }, t: 'BT15', com: 'Pleslin-Trigavou' },
  J110301001: { n: 'Jugon-les-Lacs [Bois Léard]', c: 'Arguenon', s: { s1: 1.0, s2: 1.5, s3: 2.0 }, t: 'BT15', com: 'Jugon-les-Lacs' },
  J110581001: { n: 'Plénée-Jugon [La Salle ès Pies]', c: 'Quiloury', s: { s1: 1.0, s2: 1.5, s3: 1.9 }, t: 'BT15', com: 'Plénée-Jugon' },
  J111401001: { n: 'Mégrit [Pont D 19]', c: 'Rosette', s: { s1: 0.8, s2: 1.2, s3: 1.55 }, t: 'BT15', com: 'Mégrit' },
  J131301001: { n: 'Andel [Le Quingueret]', c: 'Gouessant', s: { s1: 1.2, s2: 1.8, s3: 2.4 }, t: 'BT15', com: 'Andel' },
  J132401001: { n: 'Coëtmieux [La Rue]', c: 'Evron', s: { s1: 1.0, s2: 1.5, s3: 2.1 }, t: 'BT15', com: 'Coëtmieux' },
  J140531001: { n: 'Plédran [Magenta]', c: 'Urne', s: { s1: 0.7, s2: 1.0, s3: 1.4 }, t: 'BT14', com: 'Plédran' },
  J151301001: { n: 'St-Julien [La Saudraie]', c: 'Gouët', s: { s1: 0.9, s2: 1.3, s3: 1.8 }, t: 'BT14', com: 'Saint-Julien' },
  J161401002: { n: 'Binic [Saint Gilles]', c: 'Ic', s: { s1: 0.9, s2: 1.3, s3: 1.8 }, t: 'BT14', com: 'Binic-Étables-sur-Mer' },
  J171171001: { n: 'St-Péver [Pont Locminé]', c: 'Trieux', s: { s1: 0.9, s2: 1.3, s3: 1.8 }, t: 'BT14', com: 'Saint-Péver' },
  J172172001: { n: 'St-Clet [Chateaulin]', c: 'Trieux', s: { s1: 1.1, s2: 1.6, s3: 2.2 }, t: 'BT14', com: 'Saint-Clet' },
  J180301001: { n: 'Boqueho [Moulin Neuf]', c: 'Leff', s: { s1: 0.8, s2: 1.2, s3: 1.7 }, t: 'BT14', com: 'Boqueho' },
  J181301001: { n: 'Yvias [Rivoallan]', c: 'Leff', s: { s1: 1.0, s2: 1.5, s3: 2.1 }, t: 'BT14', com: 'Yvias' },
  J202301001: { n: 'Mantallot [Kerbrido]', c: 'Jaudy', s: { s1: 1.2, s2: 1.8, s3: 2.5 }, t: 'BT13', com: 'Mantallot' },
  J203401001: { n: 'Plouguiel [Kerallio]', c: 'Guindy', s: { s1: 0.6, s2: 0.9, s3: 1.15 }, t: 'BT13', com: 'Plouguiel' },
  J223301001: { n: 'Belle-Isle-en-Terre', c: 'Léguer', s: { s1: 1.0, s2: 1.5, s3: 2.1 }, t: 'BT13', com: 'Belle-Isle-en-Terre' },
  J223302001: { n: 'Pluzunet [Pont Coat Dunois]', c: 'Léguer', s: { s1: 1.1, s2: 1.7, s3: 2.3 }, t: 'BT13', com: 'Pluzunet' },
  J371301001: { n: 'Trébrivan [Le Nezert]', c: 'Hyère', s: { s1: 1.2, s2: 1.8, s3: 2.4 }, t: 'BT2', com: 'Trébrivan' },
  J520211001: { n: 'Kerien [Kerlouët]', c: 'Blavet', s: { s1: 0.4, s2: 0.6, s3: 0.75 }, t: 'BT5', com: 'Kerien' },
  J520521001: { n: 'Kerien [Moulin de Camel]', c: 'Moulin de l’Estolet', s: { s1: 0.6, s2: 0.9, s3: 1.1 }, t: 'BT5', com: 'Kerien' },
  J521212001: { n: 'Lanrivain [Pont D 87]', c: 'Blavet aval Kerné-Uhel', s: { s1: 0.8, s2: 1.2, s3: 1.6 }, t: 'BT5', com: 'Lanrivain' },
  J522401002: { n: 'Ste-Tréphine [Trozulon]', c: 'Sulon', s: { s1: 0.7, s2: 1.0, s3: 1.35 }, t: 'BT5', com: 'Sainte-Tréphine' },
  J540212001: { n: 'Plélauff [Bon-Repos]', c: 'Blavet', s: { s1: 1.65, s2: 1.9, s3: 2.1 }, t: 'BT5', com: 'Plélauff' },
  J800231002: { n: 'St-Martin-des-Prés', c: 'Oust', s: { s1: 0.7, s2: 1.0, s3: 1.4 }, t: 'BT7', com: 'Saint-Martin-des-Prés' },
  J802231003: { n: 'Hémonstoir [Pont D 69]', c: 'Oust', s: { s1: 1.2, s2: 1.8, s3: 2.3 }, t: 'BT7', com: 'Hémonstoir' },
  J813301001: { n: 'Plémet [St-Sauveur-le-Haut]', c: 'Lié', s: { s1: 1.2, s2: 1.8, s3: 2.3 }, t: 'BT7', com: 'Plémet' },
};

const PRINCIPALES = ['J151301001', 'J131301001', 'J540212001', 'J202301001', 'J802231003'];

const TOOLS = [
  { name: 'get_summary', description: 'Synthèse 22 : vigilance Vigicrues, stations clés, APIC et Vigicrues Flash. À appeler en premier.', inputSchema: { type: 'object', properties: {} } },
  { name: 'list_stations', description: '27 stations hydrométriques du 22 (code, nom, cours d’eau, seuils, tronçon).', inputSchema: { type: 'object', properties: { cours_eau: { type: 'string' } } } },
  { name: 'get_station', description: 'Fiche d’une station 22.', inputSchema: { type: 'object', properties: { code: { type: 'string' } }, required: ['code'] } },
  { name: 'get_observations', description: 'Hydrogramme court Hub’Eau (hauteur m, tendance, seuil).', inputSchema: { type: 'object', properties: { code: { type: 'string' }, heures: { type: 'integer' } }, required: ['code'] } },
  { name: 'get_vigilance', description: 'Niveaux officiels Vigicrues des tronçons BT13 BT14 BT15 BT2 BT5 BT7.', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_apic_22', description: 'APIC communes 22 (JSON public carte). Source Météo-France.', inputSchema: { type: 'object', properties: { commune: { type: 'string' } } } },
  { name: 'get_vigicrues_flash_22', description: 'Vigicrues Flash communes 22 (JSON public carte). Source Vigicrues/DGPR.', inputSchema: { type: 'object', properties: { commune: { type: 'string' } } } },
];

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, MCP-Protocol-Version, Accept, Mcp-Session-Id',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
  };
}
function ok(id, result) { return { jsonrpc: '2.0', id: id ?? null, result }; }
function fail(id, code, message) { return { jsonrpc: '2.0', id: id ?? null, error: { code, message } }; }
function text(obj) { return { content: [{ type: 'text', text: JSON.stringify(obj, null, 2) }] }; }
function authorized(req) {
  const token = process.env.MCP_TOKEN;
  if (!token) return true;
  const h = req.headers;
  const auth = typeof h.get === 'function' ? h.get('authorization') : h.authorization;
  return (auth || '') === `Bearer ${token}`;
}
function officialLevel(raw) {
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  if (n >= 1 && n <= 4) return n - 1;
  if (n >= 0 && n <= 3) return n;
  return null;
}
async function fetchJson(url, ms = 10000) {
  const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, redirect: 'follow', signal: AbortSignal.timeout(ms) });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return r.json();
}
function seuilAtteint(h, st) {
  if (h == null || !st) return null;
  if (h >= st.s.s3) return 's3';
  if (h >= st.s.s2) return 's2';
  if (h >= st.s.s1) return 's1';
  return 'sous_s1';
}
function tendance(points) {
  if (!points || points.length < 2) return { label: 'insuffisant', delta_m: null };
  const a = points[points.length - 1].hauteur_m;
  const b = points[0].hauteur_m;
  if (a == null || b == null) return { label: 'insuffisant', delta_m: null };
  const delta = +(b - a).toFixed(3);
  const label = delta > 0.02 ? 'hausse' : delta < -0.02 ? 'baisse' : 'stable';
  return { label, delta_m: delta };
}
async function loadObs(code, heures = 6) {
  const h = Math.min(Math.max(Number(heures) || 6, 1), 48);
  const size = Math.min(h * 12 + 6, 200);
  const data = await fetchJson(`https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr?code_entite=${encodeURIComponent(code)}&grandeur_hydro=H&size=${size}&sort=desc`);
  const cutoff = Date.now() - h * 3600 * 1000;
  const rows = (data.data || []).map((d) => ({
    date: d.date_obs,
    hauteur_m: d.resultat_obs != null ? Number(d.resultat_obs) / 1000 : null,
  })).filter((d) => d.date && new Date(d.date).getTime() >= cutoff);
  const chrono = [...rows].reverse();
  const st = ST[code];
  const last = rows[0]?.hauteur_m ?? null;
  return {
    code, nom: st?.n, cours_eau: st?.c, commune: st?.com, troncon: st?.t, seuils_m: st?.s,
    derniere: rows[0] || null, tendance: tendance(chrono), seuil_atteint: seuilAtteint(last, st),
    nb_points: chrono.length,
    points: chrono.length > 40 ? chrono.filter((_, i) => i % Math.ceil(chrono.length / 40) === 0 || i === chrono.length - 1) : chrono,
    source: "Hub'Eau hydrométrie temps réel (PHyC / SCV)",
    unite: 'hauteur en mètres (Hub’Eau fournit des mm)',
  };
}
async function loadVigilance() {
  const geo = await fetchJson('https://www.vigicrues.gouv.fr/services/1/InfoVigiCru.geojson/');
  const wanted = new Set(Object.keys(TRONCONS));
  const byTroncon = {};
  for (const f of geo.features || []) {
    const p = f.properties || {};
    const troncon = p.CdEntCru || p.CdEntVigiCru || p.acroentcru;
    const level = officialLevel(p.NivInfViCr || p.NivSituVigiCruEnt);
    if (troncon && wanted.has(troncon) && level != null) {
      byTroncon[troncon] = {
        troncon,
        label: p.lbentcru || p.NomEntVigiCru || TRONCONS[troncon],
        level,
        libelle: VL[level] || String(level),
        updated: p.dhmentcru || p.dhcentcru || p.DtHrInfoVigiCru || '',
      };
    }
  }
  const stations = Object.entries(ST).map(([code, st]) => ({
    code, nom: st.n, cours_eau: st.c, troncon: st.t, vigilance: byTroncon[st.t] || null,
  }));
  return {
    source: 'Vigicrues / SCHAPI — InfoVigiCru.geojson',
    site: SITE,
    statut: Object.keys(byTroncon).length ? 'officiel' : 'troncons_absents',
    troncons: byTroncon,
    stations,
  };
}
let _communes22 = null;
async function communes22() {
  if (_communes22) return _communes22;
  const list = await fetchJson('https://geo.api.gouv.fr/departements/22/communes?fields=nom,code&format=json');
  const byCode = {}; const byName = {};
  for (const c of list) { byCode[c.code] = c.nom; byName[norm(c.nom)] = c.code; }
  _communes22 = { byCode, byName };
  return _communes22;
}
function norm(s) {
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}
function niveauOf(v) {
  if (v == null) return null;
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && /^\d+$/.test(v)) return Number(v);
  if (typeof v === 'object') {
    const n = v.niv ?? v.niveau ?? v.level ?? v.n ?? v.alert ?? v.alerte;
    if (n != null) return Number(n);
  }
  return null;
}
function collectDept22(bucket, names) {
  const out = [];
  if (!bucket || typeof bucket !== 'object') return out;
  const push = (code, raw) => {
    if (!/^22\d{3}$/.test(code)) return;
    const niv = niveauOf(raw);
    out.push({ code_insee: code, nom: names.byCode[code] || null, niveau: Number.isFinite(niv) ? niv : raw, detail: raw && typeof raw === 'object' ? raw : undefined });
  };
  if (bucket['22'] && typeof bucket['22'] === 'object' && !Array.isArray(bucket['22'])) {
    for (const [k, v] of Object.entries(bucket['22'])) push(k, v);
  }
  for (const [k, v] of Object.entries(bucket)) {
    if (k === '22') continue;
    push(String(k), v);
  }
  return out;
}
async function loadCarte(mode) {
  const names = await communes22();
  const reseaux = await fetchJson(`https://apic-vigicruesflash.fr/static/carto/${mode}/fr/${mode}_fr_reseaux.json`);
  const slots = reseaux.reseaux || [];
  if (!slots.length) throw new Error(`Aucun créneau ${mode}`);
  const latest = slots[0];
  const payload = await fetchJson(`https://apic-vigicruesflash.fr/static/carto/${mode}/fr/${mode}_fr_${latest.date}.json`);
  const communes = [...collectDept22(payload.grains, names), ...collectDept22(payload.deps, names)];
  const seen = new Set(); const uniq = [];
  for (const c of communes) { if (seen.has(c.code_insee)) continue; seen.add(c.code_insee); uniq.push(c); }
  uniq.sort((a, b) => String(b.niveau).localeCompare(String(a.niveau)) || (a.nom || '').localeCompare(b.nom || ''));
  return {
    mode, echeance: latest.date, echeance_libelle: latest.date_str,
    national: { n_indetermine: Number(latest.n_i || 0), n_niveau_1: Number(latest.n_1 || 0), n_niveau_2: Number(latest.n_2 || 0) },
    new_alerts: payload.new_alerts || null, communes_22: uniq, count_22: uniq.length,
    source_json: `https://apic-vigicruesflash.fr/static/carto/${mode}/fr/${mode}_fr_${latest.date}.json`,
  };
}
function filterCommune(list, q, names) {
  if (!q) return list;
  const raw = String(q).trim();
  if (/^22\d{3}$/.test(raw)) return list.filter((c) => c.code_insee === raw);
  const code = names.byName[norm(raw)];
  if (code) return list.filter((c) => c.code_insee === code);
  const nq = norm(raw);
  return list.filter((c) => norm(c.nom).includes(nq));
}
async function loadApic(commune) {
  const names = await communes22();
  const data = await loadCarte('apic');
  const filtered = filterCommune(data.communes_22, commune, names);
  return { service: 'APIC', lecture: 'seule', source: 'Météo-France — carte publique APIC-Vigicrues Flash', niveaux: APIC_NIV, ...data, communes_22: filtered, count_22: filtered.length, filtre: commune || null };
}
async function loadVf(commune) {
  const names = await communes22();
  const data = await loadCarte('vf');
  const filtered = filterCommune(data.communes_22, commune, names);
  return { service: 'Vigicrues Flash', lecture: 'seule', source: 'Vigicrues / DGPR — carte publique APIC-Vigicrues Flash', niveaux: VF_NIV, rappel: 'VF ne couvre pas les cours d’eau déjà suivis par la vigilance crues réglementaire.', ...data, communes_22: filtered, count_22: filtered.length, filtre: commune || null };
}
function listStations(cours) {
  const q = (cours || '').toLowerCase();
  return Object.entries(ST).filter(([, st]) => !q || st.c.toLowerCase().includes(q) || st.n.toLowerCase().includes(q) || (st.com || '').toLowerCase().includes(q)).map(([code, st]) => ({
    code, nom: st.n, cours_eau: st.c, commune: st.com, seuils_m: st.s, troncon: st.t, troncon_libelle: TRONCONS[st.t],
  }));
}
async function callTool(name, args = {}) {
  if (name === 'list_stations') return text({ count: listStations(args.cours_eau).length, stations: listStations(args.cours_eau), site: SITE });
  if (name === 'get_station') {
    const code = String(args.code || '').toUpperCase();
    const st = ST[code];
    if (!st) return text({ error: 'Station hors catalogue Crues 22', code });
    return text({ code, nom: st.n, cours_eau: st.c, commune: st.com, seuils_m: st.s, troncon: st.t, troncon_libelle: TRONCONS[st.t], url_site: SITE });
  }
  if (name === 'get_vigilance') return text(await loadVigilance());
  if (name === 'get_observations') {
    const code = String(args.code || '').toUpperCase();
    if (!ST[code]) return text({ error: 'Station hors catalogue Crues 22', code });
    return text(await loadObs(code, args.heures));
  }
  if (name === 'get_apic_22') return text(await loadApic(args.commune));
  if (name === 'get_vigicrues_flash_22') return text(await loadVf(args.commune));
  if (name === 'get_summary') {
    let vigi = { statut: 'indisponible', troncons: {}, error: null };
    try { vigi = await loadVigilance(); } catch (e) { vigi.error = e.message; }
    const levels = Object.values(vigi.troncons || {}).map((t) => t.level);
    const max = levels.length ? Math.max(...levels) : -1;
    const obs = [];
    for (const code of PRINCIPALES) {
      try {
        const o = await loadObs(code, 3);
        obs.push({ code: o.code, nom: o.nom, cours_eau: o.cours_eau, derniere: o.derniere, tendance: o.tendance, seuil_atteint: o.seuil_atteint });
      } catch (e) { obs.push({ code, error: e.message }); }
    }
    let apic, vf;
    try { const a = await loadApic(); apic = { echeance_libelle: a.echeance_libelle, count_22: a.count_22, national: a.national, communes: a.communes_22 }; } catch (e) { apic = { error: e.message }; }
    try { const v = await loadVf(); vf = { echeance_libelle: v.echeance_libelle, count_22: v.count_22, national: v.national, communes: v.communes_22 }; } catch (e) { vf = { error: e.message }; }
    return text({
      site: SITE, lecture: 'seule',
      vigilance_max: { level: max, libelle: VL[max] || 'N/A', statut: vigi.statut || (vigi.error ? 'erreur' : 'officiel') },
      troncons: vigi.troncons, vigicrues_erreur: vigi.error || null,
      stations_principales: obs, apic_22: apic, vigicrues_flash_22: vf,
      sources: ['Vigicrues', "Hub'Eau", 'APIC Météo-France', 'Vigicrues Flash'],
    });
  }
  throw new Error(`Outil inconnu: ${name}`);
}
async function handleOne(msg) {
  if (!msg || msg.jsonrpc !== '2.0' || !msg.method) return fail(msg?.id, -32600, 'Requête JSON-RPC invalide');
  const { id, method, params } = msg;
  if (id === undefined) return null;
  if (method === 'initialize') {
    const asked = params?.protocolVersion || PROTOCOL;
    return ok(id, {
      protocolVersion: asked.startsWith('2025-') ? asked : PROTOCOL,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: 'crues22-mcp', version: '1.0.0', title: 'Crues 22 — lecture seule' },
      instructions: 'Données hydrologiques Côtes-d’Armor, lecture seule. Commencer par get_summary. Ne jamais inventer un niveau de vigilance.',
    });
  }
  if (method === 'ping' || method === 'notifications/initialized') return ok(id, {});
  if (method === 'tools/list') return ok(id, { tools: TOOLS });
  if (method === 'tools/call') {
    try { return ok(id, await callTool(params?.name, params?.arguments || {})); }
    catch (e) { return ok(id, { content: [{ type: 'text', text: e.message }], isError: true }); }
  }
  if (method === 'resources/list') return ok(id, { resources: [] });
  if (method === 'prompts/list') return ok(id, { prompts: [] });
  return fail(id, -32601, `Méthode inconnue: ${method}`);
}
async function handleRpc(body) {
  if (Array.isArray(body)) {
    const out = [];
    for (const msg of body) out.push(await handleOne(msg));
    return out.filter(Boolean);
  }
  return handleOne(body);
}
function info() {
  return {
    name: 'crues22-mcp', title: 'Crues 22 — MCP lecture seule', protocol: PROTOCOL,
    transport: 'streamable-http', lecture: 'seule', site: SITE,
    tools: TOOLS.map((t) => t.name), auth: process.env.MCP_TOKEN ? 'bearer' : 'none',
  };
}
async function readBody(req) {
  if (!req) return {};
  if (typeof req.json === 'function') return await req.json().catch(() => ({}));
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body || '{}'); } catch { return {}; }
  }
  if (req.body && typeof req.body === 'object') return req.body;
  return {};
}
function sendNode(res, status, body, headers) {
  const h = headers || corsHeaders();
  for (const [k, v] of Object.entries(h)) res.setHeader(k, v);
  if (body == null || body === '') return res.status(status).end();
  if (typeof body === 'string') return res.status(status).send(body);
  return res.status(status).json(body);
}
export default async function handler(req, res) {
  const method = (req.method || 'GET').toUpperCase();
  if (method === 'OPTIONS') {
    if (res && typeof res.status === 'function') return sendNode(res, 204, '', corsHeaders());
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  if (!authorized(req)) {
    if (res && typeof res.status === 'function') return sendNode(res, 401, { error: 'Unauthorized' });
    return Response.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders() });
  }
  if (method === 'GET') {
    if (res && typeof res.status === 'function') return sendNode(res, 200, info());
    return Response.json(info(), { headers: corsHeaders() });
  }
  if (method !== 'POST') {
    if (res && typeof res.status === 'function') return sendNode(res, 405, { error: 'Method not allowed' });
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: corsHeaders() });
  }
  try {
    const body = await readBody(req);
    const out = await handleRpc(body);
    if (out == null) {
      if (res && typeof res.status === 'function') return sendNode(res, 202, '');
      return new Response(null, { status: 202, headers: corsHeaders() });
    }
    if (res && typeof res.status === 'function') return sendNode(res, 200, out);
    return Response.json(out, { headers: corsHeaders() });
  } catch (e) {
    if (res && typeof res.status === 'function') return sendNode(res, 200, fail(null, -32603, e.message));
    return Response.json(fail(null, -32603, e.message), { headers: corsHeaders() });
  }
}
export { handler as GET, handler as POST, handler as OPTIONS };
