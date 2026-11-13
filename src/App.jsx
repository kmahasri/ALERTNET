
import { useState } from "react";

const incidents = [
  { id: "INC-2041", title: "Severe Flooding", place: "Riverside Colony", level: "Critical", time: "Just now", icon: "⚠" },
  { id: "INC-2040", title: "People Stranded", place: "Lakeview Street", level: "Urgent", time: "4 min ago", icon: "!" },
  { id: "INC-2039", title: "Road Blockage", place: "Hilltop Road", level: "Informational", time: "12 min ago", icon: "◉" },
  { id: "INC-2038", title: "Medical Emergency", place: "Old Market", level: "Critical", time: "18 min ago", icon: "+" },
];

const nav = [
  ["⌂", "Command Centre"],
  ["♧", "Live Incidents"],
  ["♙", "Response Teams"],
  ["▱", "Resources"],
  ["⌖", "Evacuation"],
  ["♧", "Broadcasts"],
  ["▥", "Analytics"],
  ["▤", "Reports"],
  ["⚙", "Settings"],
];

const teams = [
  { name: "Rescue Unit Alpha", type: "Water rescue", status: "Available", people: 6 },
  { name: "Medical Team 02", type: "Emergency medical", status: "On field", people: 4 },
  { name: "Rescue Unit Bravo", type: "Evacuation", status: "Available", people: 8 },
  { name: "Relief Team 01", type: "Food & supplies", status: "On field", people: 5 },
];

function App() {
  const [page, setPage] = useState("Command Centre");
  const [incidentList, setIncidentList] = useState(incidents);
  const [showSOS, setShowSOS] = useState(false);
  const [sent, setSent] = useState(false);
  const [filter, setFilter] = useState("All");
  const [assigned, setAssigned] = useState({});
  const [broadcast, setBroadcast] = useState(false);
  const [alertText, setAlertText] = useState("Heavy rainfall warning. Move to higher ground and follow evacuation instructions.");
  const [zone, setZone] = useState("Riverside Zone");

  const filtered = incidentList.filter(i => filter === "All" || i.level === filter);

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');
        *{box-sizing:border-box} body{margin:0;background:#f5f2ec;color:#202c2b;font-family:'DM Sans',sans-serif}
        button,input,textarea,select{font:inherit} button{cursor:pointer}
        .app{min-height:100vh;display:flex;background:#f5f2ec}
        .sidebar{width:245px;min-height:100vh;background:#073d40;color:#f5f3ed;padding:25px 15px 20px;display:flex;flex-direction:column;flex-shrink:0;position:relative;overflow:hidden}
        .brand{display:flex;align-items:center;gap:10px;padding:0 9px 35px}
        .brandmark{font-size:35px;color:#ed8066;transform:rotate(-12deg)}
        .brandname{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;letter-spacing:.3px}
        .brandtag{font-size:10px;letter-spacing:1px;color:#c5d7d2;margin-top:1px}
        .navlabel{font-size:10px;letter-spacing:2px;color:#9bb9b2;padding:8px 12px 13px}
        .nav{display:flex;flex-direction:column;gap:5px;z-index:1}
        .nav button{border:0;background:transparent;color:#e5efeb;text-align:left;padding:12px 13px;border-radius:13px;display:flex;align-items:center;gap:13px;font-size:13px;transition:.2s}
        .nav button:hover{background:#ffffff17}.nav button.active{background:#277f82;color:white;box-shadow:inset 3px 0 #f18a70}
        .navicon{font-size:19px;width:22px;text-align:center}
        .navcount{margin-left:auto;background:#e65c50;border-radius:20px;padding:2px 8px;font-size:10px}
        .sidebottom{margin-top:auto;z-index:1}.sidebottom button{width:100%;background:transparent;border:0;color:#e5efeb;text-align:left;padding:12px;border-radius:12px}
        .sidebottom button:hover{background:#ffffff17}
        .sideart{position:absolute;bottom:0;left:0;width:100%;height:170px;opacity:.28;pointer-events:none}
        .main{flex:1;min-width:0;padding:27px 30px 35px;max-width:1800px;margin:auto}
        .topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:23px}
        .eyebrow{font-size:10px;color:#66827c;letter-spacing:2px;font-weight:700;text-transform:uppercase;margin-bottom:5px}
        h1{font-family:'Playfair Display',serif;font-size:34px;margin:0;color:#152b2b;letter-spacing:-.8px}
        .subtitle{font-size:12px;color:#74817d;margin-top:5px}
        .topactions{display:flex;align-items:center;gap:12px}
        .search{background:#fff;border:1px solid #e6e0d7;border-radius:30px;padding:11px 16px;width:240px;color:#687873;font-size:12px}
        .iconbtn{width:39px;height:39px;border-radius:50%;border:1px solid #e6e0d7;background:#fff;color:#24413f;font-size:17px}
        .avatar{width:38px;height:38px;border-radius:50%;background:#dce9e4;color:#17494a;display:grid;place-items:center;font-weight:700}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
        .stat{border-radius:15px;padding:16px 17px;display:flex;align-items:center;gap:13px;min-height:84px;border:1px solid #ffffff}
        .stat:nth-child(1){background:#f9e2de}.stat:nth-child(2){background:#f9edda}.stat:nth-child(3){background:#deedf0}.stat:nth-child(4){background:#e8eddf}
        .staticon{font-size:25px}.statnum{font-size:25px;font-weight:800;letter-spacing:-1px;color:#1b302e}.statlabel{font-size:11px;color:#4f625e;margin-top:2px}.statnote{font-size:10px;margin-left:auto;color:#65756e}
        .contentgrid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(285px,.9fr);gap:16px}
        .panel{background:#fffdfa;border:1px solid #e9e3da;border-radius:17px;box-shadow:0 4px 14px #283a3010;overflow:hidden}
        .panelhead{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #eee9e1}
        .paneltitle{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#203331}
        .muted{font-size:11px;color:#84908a}
        .map{height:365px;position:relative;overflow:hidden;background:#164b4b}
        .map:before{content:"";position:absolute;inset:0;background-image:linear-gradient(30deg,transparent 48%,#a8c7b51a 49%,#a8c7b51a 50%,transparent 51%),linear-gradient(120deg,transparent 48%,#a8c7b51a 49%,#a8c7b51a 50%,transparent 51%);background-size:55px 55px}
        .map:after{content:"";position:absolute;inset:-30%;background:repeating-radial-gradient(ellipse at 52% 50%,transparent 0 35px,#a8d0c31c 36px 37px,transparent 38px 62px);transform:rotate(-15deg)}
        .river{position:absolute;left:-10%;top:43%;width:125%;height:90px;background:#72b7bd;opacity:.65;transform:rotate(-15deg);border-top:3px solid #b8e0d7;border-bottom:3px solid #b8e0d7;border-radius:50%;z-index:1}
        .road{position:absolute;height:2px;background:#d9bd8b;opacity:.8;z-index:2;transform-origin:left}
        .road.one{width:85%;top:30%;left:5%;transform:rotate(19deg)}.road.two{width:80%;top:74%;left:12%;transform:rotate(-25deg)}.road.three{width:75%;top:15%;left:30%;transform:rotate(72deg)}
        .hotspot{position:absolute;left:52%;top:48%;width:125px;height:125px;border-radius:50%;background:#e35c5050;border:1px solid #ff9d8266;transform:translate(-50%,-50%);z-index:3;display:grid;place-items:center;box-shadow:0 0 0 18px #e35c5020,0 0 0 38px #e35c5010}
        .hotspot span{background:#d9443c;border:3px solid #ffd5c6;color:white;width:53px;height:53px;border-radius:50%;display:grid;place-items:center;font-size:25px;box-shadow:0 4px 18px #1117}
        .pin{position:absolute;z-index:4;width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:grid;place-items:center;color:#fff;border:2px solid #fff;box-shadow:0 2px 7px #0005;font-size:12px}
        .pin b{transform:rotate(45deg)}.p1{left:22%;top:30%;background:#e9a53e}.p2{left:76%;top:24%;background:#76a85e}.p3{left:78%;top:72%;background:#e9a53e}.p4{left:30%;top:72%;background:#76a85e}
        .maplegend{position:absolute;bottom:14px;left:14px;z-index:5;background:#fffefaee;padding:11px 13px;border-radius:10px;font-size:10px;box-shadow:0 3px 12px #0002}
        .legendrow{display:flex;align-items:center;gap:8px;margin-top:6px;color:#485b56}.dot{width:8px;height:8px;border-radius:50%}
        .maptools{position:absolute;right:14px;top:14px;z-index:5;display:flex;flex-direction:column;gap:5px}.maptools button{background:#fff;border:0;border-radius:7px;width:32px;height:32px;font-size:17px;color:#24413f}
        .mapcaption{position:absolute;top:14px;left:14px;z-index:5;background:#e36d5a;color:white;border-radius:30px;padding:7px 12px;font-size:10px;font-weight:700;letter-spacing:.5px}
        .rightcol{display:flex;flex-direction:column;gap:15px}
        .incident{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #eee9e2}
        .incident:last-child{border:0}.incidenticon{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;font-weight:800;font-size:17px}
        .criticalbg{background:#f9e2de;color:#d84c42}.urgentbg{background:#faefd9;color:#d99b2d}.infobg{background:#dfedf0;color:#34899a}
        .incidentinfo{flex:1;min-width:0}.incidenttitle{font-size:12px;font-weight:700;color:#273b37}.incidentplace{font-size:10px;color:#84908a;margin-top:3px}
        .pill{font-size:9px;font-weight:700;padding:5px 8px;border-radius:20px;white-space:nowrap}.critical{background:#f9dfdc;color:#bd423a}.urgent{background:#f9edda;color:#a96f16}.informational{background:#deedf0;color:#347f8d}
        .time{font-size:9px;color:#87918c;white-space:nowrap}
        .weather{padding:15px 17px}.weatherline{display:flex;align-items:center;justify-content:space-between;margin-top:12px}.weatherbig{font-size:23px}.weatherlabel{font-size:11px;font-weight:700}.weatherdetail{font-size:10px;color:#83908a;margin-top:3px}
        .bottomgrid{display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:15px;margin-top:16px}
        .chartbox{padding:16px}.chart{height:105px;display:flex;align-items:end;gap:8px;padding:12px 3px 0;border-bottom:1px solid #ddd}
        .bar{flex:1;background:linear-gradient(#e77c68,#f2c4b8);border-radius:5px 5px 0 0;min-width:9px}
        .chartlabels{display:flex;justify-content:space-between;font-size:9px;color:#87918a;margin-top:7px}
        .severityrow{display:flex;align-items:center;gap:8px;margin:12px 0;font-size:11px;color:#5c6c65}.severityrow strong{margin-left:auto;color:#263b37}
        .teamstat{display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid #eee9e2;font-size:11px}.teamstat:last-child{border:0}
        .available{color:#578b5a;font-weight:700}.onfield{color:#c18b36;font-weight:700}
        .pagepanel{margin-top:8px;padding:22px}.pagepanel h2{font-family:'Playfair Display',serif;margin:0 0 8px;font-size:24px}.pagepanel p{color:#7b8982;font-size:12px}
        .action{background:#0b5555;color:white;border:0;padding:10px 15px;border-radius:9px;font-size:11px;font-weight:700}.action:hover{background:#167171}
        .secondary{background:#f0eee8;color:#42534d;border:1px solid #e5e0d6;padding:9px 13px;border-radius:9px;font-size:11px}
        .table{width:100%;border-collapse:collapse;margin-top:18px}.table th{text-align:left;color:#87918a;font-size:10px;font-weight:600;padding:12px;border-bottom:1px solid #e9e4dc}.table td{padding:14px 12px;border-bottom:1px solid #f0ece6;font-size:11px}
        .field{width:100%;border:1px solid #e4dfd6;border-radius:9px;padding:11px;background:#fffdfa;color:#33443e;font-size:12px;margin:7px 0 14px}
        .modalback{position:fixed;inset:0;background:#102d2dcc;z-index:20;display:grid;place-items:center;padding:20px}.modal{width:min(480px,100%);background:#fffdfa;border-radius:17px;padding:25px;box-shadow:0 20px 60px #0004}.modal h2{font-family:'Playfair Display',serif;margin:0 0 8px}.modal label{font-size:11px;font-weight:700;color:#53635c}
        .success{background:#e5f0e5;padding:12px;border-radius:9px;color:#47764c;font-size:12px;margin-top:12px}
        @media(max-width:1050px){.sidebar{width:205px}.main{padding:20px}.stats{grid-template-columns:repeat(2,1fr)}.contentgrid{grid-template-columns:1fr}.bottomgrid{grid-template-columns:1fr 1fr}}
        @media(max-width:700px){.sidebar{width:68px;padding:18px 8px}.brand{padding:0 5px 28px}.brandname,.brandtag,.navlabel,.navtext,.navcount,.sidebottom span{display:none}.brandmark{font-size:27px}.nav button{justify-content:center;padding:13px 5px}.navicon{font-size:20px}.main{padding:16px}.topbar{align-items:flex-start}.search{display:none}h1{font-size:27px}.stats{gap:8px}.stat{padding:11px;min-height:72px}.statnum{font-size:20px}.bottomgrid{grid-template-columns:1fr}.map{height:300px}}
        .panel h2,
.panel h3 {
  color: #17413f !important;
  opacity: 1 !important;
  -webkit-text-fill-color: #17413f !important;
  text-shadow: none !important;
}
      `}</style>

      <aside className="sidebar">
        <div className="brand">
          <div className="brandmark">≋</div>
          <div><div className="brandname">ALERTNET</div><div className="brandtag">DISASTER RESPONSE PLATFORM</div></div>
        </div>
        <div className="navlabel">OPERATIONS</div>
        <nav className="nav">
          {nav.map(([icon, label]) => (
            <button key={label} className={page === label ? "active" : ""} onClick={() => setPage(label)}>
              <span className="navicon">{icon}</span><span className="navtext">{label}</span>
              {label === "Live Incidents" && <span className="navcount">12</span>}
            </button>
          ))}
        </nav>
        <div className="sidebottom">
          <button onClick={() => setPage("Settings")}>⚙ <span>Settings</span></button>
          <div style={{fontSize:10,color:"#9bb9b2",padding:"10px 12px"}}>● SYSTEM OPERATIONAL</div>
        </div>
        <svg className="sideart" viewBox="0 0 245 170" preserveAspectRatio="none">
          {[0,1,2,3,4].map(n=><path key={n} d={`M-20 ${70+n*18} Q 65 ${20+n*18} 120 ${80+n*18} T 270 ${65+n*18}`} fill="none" stroke="#70c0bd" strokeWidth="1.2"/>)}
        </svg>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="eyebrow">SATURN RESPONSE NETWORK / LIVE OPERATIONS</div>
            <h1>{page}</h1>
            <div className="subtitle">Real-time disaster monitoring, risk assessment and response coordination</div>
          </div>
          <div className="topactions">
            <input className="search" placeholder="⌕  Search incidents, locations..." />
            <button className="iconbtn" title="Notifications">♧</button>
            <div className="avatar">S</div>
          </div>
        </header>

        {page === "Command Centre" && <>
          <section className="stats">
            <div className="stat"><span className="staticon" style={{color:"#d94d43"}}>⚠</span><div><div className="statnum">124</div><div className="statlabel">Active Incidents</div></div><span className="statnote">↑ 18%</span></div>
            <div className="stat"><span className="staticon" style={{color:"#d99a35"}}>♙</span><div><div className="statnum">36</div><div className="statlabel">Response Teams</div></div><span className="statnote">On field</span></div>
            <div className="stat"><span className="staticon" style={{color:"#328da1"}}>♧</span><div><div className="statnum">18,742</div><div className="statlabel">People Reached</div></div><span className="statnote">3 channels</span></div>
            <div className="stat"><span className="staticon" style={{color:"#6b9849"}}>✓</span><div><div className="statnum">210</div><div className="statlabel">Resolved</div></div><span className="statnote">↑ 12%</span></div>
          </section>

          <section className="contentgrid">
            <div className="panel">
              <div className="panelhead"><span className="paneltitle">◉ &nbsp; Live Incident Map</span><span className="muted">Flood risk · Demo map</span></div>
              <div className="map">
                <div className="river"></div><div className="road one"></div><div className="road two"></div><div className="road three"></div>
                <div className="mapcaption">● LIVE INCIDENT OVERVIEW</div>
                <div className="hotspot"><span>⚠</span></div>
                <div className="pin p1"><b>!</b></div><div className="pin p2"><b>⌂</b></div><div className="pin p3"><b>!</b></div><div className="pin p4"><b>+</b></div>
                <div className="maptools"><button>＋</button><button>－</button><button>⌖</button></div>
                <div className="maplegend"><b>INCIDENT SEVERITY</b>
                  <div className="legendrow"><i className="dot" style={{background:"#d94d43"}}/> Critical</div>
                  <div className="legendrow"><i className="dot" style={{background:"#e4a53d"}}/> Urgent</div>
                  <div className="legendrow"><i className="dot" style={{background:"#3998aa"}}/> Informational</div>
                </div>
              </div>
            </div>

            <div className="rightcol">
              <div className="panel">
                <div className="panelhead"><span className="paneltitle">Recent Incidents</span><button className="secondary" onClick={() => setPage("Live Incidents")}>View all →</button></div>
                {incidents.slice(0,3).map(i=><div className="incident" key={i.id}>
                  <div className={`incidenticon ${i.level==="Critical"?"criticalbg":i.level==="Urgent"?"urgentbg":"infobg"}`}>{i.icon}</div>
                  <div className="incidentinfo"><div className="incidenttitle">{i.title}</div><div className="incidentplace">{i.place}</div></div>
                  <span className={`pill ${i.level.toLowerCase()}`}>{i.level}</span>
                  <span className="time">{i.time}</span>
                </div>)}
              </div>
              <div className="panel weather">
                <div className="paneltitle">☁ Weather & Risk Update</div>
                <div className="weatherline"><div><div className="weatherbig">🌧</div><div className="weatherlabel">Heavy Rain</div><div className="weatherdetail">78 mm · last 3 hrs</div></div><div><div className="weatherlabel">Flood Risk</div><div className="pill critical" style={{display:"inline-block",marginTop:8}}>HIGH</div></div><div><div className="weatherlabel">Wind</div><div className="weatherdetail">24 km/h</div></div></div>
              </div>
            </div>
          </section>

          <section className="bottomgrid">
            <div className="panel chartbox"><div className="paneltitle">Incident Trend <span className="muted">(Last 24 hours)</span></div>
              <div className="chart">{[20,34,29,42,75,57,68,46,83,63,78,91].map((h,i)=><div className="bar" key={i} style={{height:h+"%"}}/>)}</div>
              <div className="chartlabels"><span>12 AM</span><span>4 AM</span><span>8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span></div>
            </div>
            <div className="panel chartbox"><div className="paneltitle">Incident Severity</div>
              <div style={{display:"flex",alignItems:"center",gap:16,marginTop:14}}>
                <div style={{width:95,height:95,borderRadius:"50%",background:"conic-gradient(#d94d43 0 10%,#e4a53d 10% 33%,#3998aa 33% 100%)",display:"grid",placeItems:"center"}}><div style={{background:"#fffdfa",width:68,height:68,borderRadius:"50%",display:"grid",placeItems:"center",fontWeight:800,fontSize:19}}>124</div></div>
                <div style={{flex:1}}><div className="severityrow"><i className="dot" style={{background:"#d94d43"}}/>Critical<strong>12</strong></div><div className="severityrow"><i className="dot" style={{background:"#e4a53d"}}/>Urgent<strong>28</strong></div><div className="severityrow"><i className="dot" style={{background:"#3998aa"}}/>Informational<strong>84</strong></div></div>
              </div>
            </div>
            <div className="panel chartbox"><div className="paneltitle">Resource Readiness</div>
              <div className="teamstat"><span>🚑 Ambulances</span><strong>8</strong></div><div className="teamstat"><span>♧ Rescue Units</span><strong>12</strong></div><div className="teamstat"><span>◈ Drones</span><strong>4</strong></div><div className="teamstat"><span>Availability</span><strong className="available">● Operational</strong></div>
            </div>
          </section>
          <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:17}}>
            <button className="secondary" onClick={() => setPage("Live Incidents")}>Review incidents</button>
            <button className="action" onClick={() => {setSent(false);setShowSOS(true)}}>＋ Create test SOS</button>
          </div>
        </>}

        {page === "Live Incidents" && <div className="panel pagepanel">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div><h2>Incident Register</h2><p>Review incoming citizen reports and their triage status.</p></div>
            <button className="action" onClick={() => {setSent(false);setShowSOS(true)}}>＋ Submit test SOS</button>
          </div>
          <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>{["All","Critical","Urgent","Informational"].map(f=><button key={f} className={filter===f?"action":"secondary"} onClick={()=>setFilter(f)}>{f}</button>)}</div>
          <table className="table"><thead><tr><th>INCIDENT</th><th>LOCATION</th><th>SEVERITY</th><th>REPORTED</th><th>STATUS</th></tr></thead><tbody>{filtered.map(i=><tr key={i.id}><td><b>{i.id}</b><br/>{i.title}</td><td>{i.place}</td><td><span className={`pill ${i.level.toLowerCase()}`}>{i.level}</span></td><td>{i.time}</td><td><span className="available">● Received</span></td></tr>)}</tbody></table>
        </div>}

{page === "Response Teams" && (
  <div className="panel pagenpanel">
    <h2>Rescue Team Coordination</h2>
    <p>Monitor team availability and assign teams to active incidents.</p>

    <table className="table">
      <thead>
        <tr>
          <th>TEAM</th>
          <th>SPECIALITY</th>
          <th>PERSONNEL</th>
          <th>STATUS</th>
          <th>ASSIGNMENT</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t, i) => (
          <tr key={t.name}>
            <td><b>{t.name}</b></td>
            <td>{t.type}</td>
            <td>{t.people}</td>
            <td>
              <span className={t.status === "Available" ? "available" : "busy"}>
                ● {t.status}
              </span>
            </td>
            <td>
              <button
                className="secondary"
                onClick={() =>
                  setAssigned(prev => ({
                    ...prev,
                    [i]: !prev[i]
                  }))
                }
              >
                {assigned[i] ? "Release team" : "Assign team"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {Object.values(assigned).some(Boolean) && (
      <div className="success">
        Demo assignment updated successfully.
      </div>
    )}
  </div>
)}
        {page === "Broadcasts" && <div className="panel pagepanel">
          <h2>Zone Alert Broadcast</h2><p>Prepare a public safety warning for multiple communication channels.</p>
          <label>Target zone</label><select className="field" value={zone} onChange={e=>setZone(e.target.value)}><option>Riverside Zone</option><option>Lakeview Zone</option><option>Hilltop Zone</option><option>All Flood-Affected Zones</option></select>
          <label>Alert message</label><textarea className="field" rows="4" value={alertText} onChange={e=>setAlertText(e.target.value)}/>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18}}>{["SMS","APP NOTIFICATION","EMAIL"].map(x=><span className="pill informational" key={x}>{x} · READY</span>)}</div>
          <button className="action" onClick={()=>setBroadcast(true)}>Send test broadcast →</button>
          {broadcast&&<div className="success">Demo broadcast queued for {zone} across SMS, app and email channels. (Simulated delivery)</div>}
        </div>}

        {page === "Resources" && <div className="panel pagepanel"><h2>Emergency Resources</h2><p>Overview of available relief and response resources.</p>{[["Ambulances","8 available"],["Rescue boats","6 available"],["Relief kits","420 units"],["Medical kits","180 units"],["Temporary shelters","5 locations"]].map(x=><div className="teamstat" key={x[0]}><span>{x[0]}</span><strong className="available">{x[1]}</strong></div>)}</div>}


{page === "Evacuation" && (
  <div className="panel pagepanel">
    <h2>Evacuation Coordination</h2>
    <p>Monitor evacuation zones, shelter capacity and citizen movement.</p>

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,margin:"20px 0"}}>
      <div className="teamstat"><span>People to evacuate</span><strong>263</strong></div>
      <div className="teamstat"><span>People evacuated</span><strong>149</strong></div>
      <div className="teamstat"><span>Remaining</span><strong>114</strong></div>
    </div>

    {[
      {zone:"Riverside Colony",shelter:"Community Hall",people:124,capacity:180,evacuated:76},
      {zone:"Lakeview Street",shelter:"Government School",people:86,capacity:120,evacuated:42},
      {zone:"Hilltop Road",shelter:"Relief Centre",people:53,capacity:100,evacuated:31}
    ].map((s) => (
      <div className="teamstat" key={s.zone} style={{display:"block",marginBottom:14,padding:16}}>
        <strong>{s.zone}</strong>
        <p style={{margin:"8px 0"}}>Destination: {s.shelter}</p>
        <div style={{display:"flex",justifyContent:"space-between",gap:8,flexWrap:"wrap",fontSize:13}}>
          <span>{s.evacuated} of {s.people} evacuated</span>
          <span>{s.capacity - s.people} shelter spaces available</span>
        </div>
        <div style={{height:9,background:"#e7e3da",borderRadius:10,marginTop:10,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${s.evacuated / s.people * 100}%`,background:"#287f70",borderRadius:10}}></div>
        </div>
        <small style={{color:"#52736b"}}>{Math.round(s.evacuated / s.people * 100)}% evacuation progress</small>
      </div>
    ))}

    <p style={{fontSize:11,color:"#888"}}>Demonstration data — simulated evacuation and shelter figures.</p>
  </div>
)}

{page === "Analytics" && <div className="panel pagepanel">
  <h2>Disaster Response Intelligence</h2>
  <p>Operational overview · SATURN RESPONSE NETWORK · DEMO DATA</p>

  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14,marginTop:24}}>
    {[
      ["12","Active incidents","Across monitored zones"],
      ["5","Critical incidents","Priority response required"],
      ["7","Teams available","Ready for deployment"],
      ["1.4s","SOS acknowledgement","Illustrative demo metric"]
    ].map(([n,l,d])=><div key={l} style={{background:"#f1eee7",padding:20,borderRadius:12,border:"1px solid #e4ded3"}}>
      <div style={{fontSize:30,fontWeight:800,color:"#0b5555"}}>{n}</div>
      <strong>{l}</strong>
      <div style={{fontSize:12,color:"#71817b",marginTop:6}}>{d}</div>
    </div>)}
  </div>

  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:18,marginTop:24}}>
    <div style={{padding:20,border:"1px solid #e8e1d7",borderRadius:12}}>
      <h3>Incident severity</h3>
      {[["Critical",5,"#df6958"],["Urgent",4,"#d4a34e"],["Informational",3,"#5d9eaa"]].map(([name,n,color])=><div key={name} style={{margin:"18px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:7}}><span>{name}</span><strong>{n}</strong></div>
        <div style={{height:10,background:"#e9e5dc",borderRadius:10,overflow:"hidden"}}><div style={{width:(n/12*100)+"%",height:"100%",background:color,borderRadius:10}} /></div>
      </div>)}
    </div>

    <div style={{padding:20,border:"1px solid #e8e1d7",borderRadius:12}}>
      <h3>Zone-wise SOS activity</h3>
      {[["Riverside Colony",6],["Lakeview Street",4],["Hilltop Road",2]].map(([name,n])=><div key={name} style={{margin:"18px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:7}}><span>{name}</span><strong>{n} reports</strong></div>
        <div style={{height:10,background:"#e9e5dc",borderRadius:10,overflow:"hidden"}}><div style={{width:(n/6*100)+"%",height:"100%",background:"#287f70",borderRadius:10}} /></div>
      </div>)}
    </div>
  </div>

  
<div style={{background:"#fffdfa",border:"1px solid #e8e1d7",borderRadius:14,padding:22,marginBottom:20}}>
  <h3 style={{textAlign:"center",color:"#123f40",marginTop:0}}>SOS Reports Over Time</h3>
  <p style={{textAlign:"center",color:"#87918c",fontSize:13}}>Incoming emergency reports · Demo data</p>
  <svg viewBox="0 0 600 240" width="100%" role="img" aria-label="Illustrative SOS trend chart">
    {[40,85,130,175].map(y=><line key={y} x1="55" y1={y} x2="570" y2={y} stroke="#e8e1d7" strokeDasharray="4 5"/>)}
    <polyline points="55,155 150,125 245,145 340,75 435,95 530,35" fill="none" stroke="#287f70" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    {[[55,155],[150,125],[245,145],[340,75],[435,95],[530,35]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill="#e76550" stroke="#fffdfa" strokeWidth="2"/>)}
    {["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM"].map((t,i)=><text key={t} x={55+i*95} y="210" fontSize="12" textAnchor="middle" fill="#687875">{t}</text>)}
  </svg>
  <p style={{fontSize:12,color:"#87918c",textAlign:"center"}}>Illustrative trend — not live measurements.</p>
</div>

  <div style={{marginTop:22,padding:20,border:"1px solid #e8e1d7",borderRadius:12}}>
    <h3>Response pipeline</h3>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:12,textAlign:"center"}}>
      {[["12","Reports received"],["8","Teams assigned"],["4","Incidents resolved"]].map(([n,l])=><div key={l} style={{background:"#edf2ec",padding:18,borderRadius:10}}>
        <strong style={{fontSize:27,color:"#0b5555"}}>{n}</strong>
        <div style={{fontSize:13,marginTop:5}}>{l}</div>
      </div>)}
    </div>
  </div>

  <div style={{marginTop:18,padding:15,background:"#f8eee2",borderRadius:10,color:"#775b35",fontSize:13}}>
    Demo environment: all figures above are illustrative and are not verified live operational measurements.
  </div>
</div>}



{page === "Reports" && <div className="panel pagepanel"><h2>Operational Reports</h2><p>Disaster response performance and field activity summary.</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,margin:"24px 0"}}>{[["124","Total SOS reports"],["12","Critical incidents"],["18,742","People reached"],["210","Incidents resolved"]].map(([n,l])=><div key={l} style={{background:"#f1eee7",padding:22,borderRadius:12,border:"1px solid #e5ded2"}}><strong style={{fontSize:30,color:"#075555"}}>{n}</strong><div style={{marginTop:7,color:"#52645f"}}>{l}</div></div>)}</div><div style={{border:"1px solid #e8e1d7",borderRadius:12,padding:22,marginTop:20}}><h3>Incident response breakdown</h3>{[["Critical incidents",12,15],["Urgent incidents",48,60],["Informational reports",64,80]].map(([name,count,width])=><div key={name} style={{margin:"20px 0"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:9}}><span>{name}</span><strong>{count}</strong></div><div style={{height:10,background:"#e9e5dc",borderRadius:20}}><div style={{width:width+"%",height:"100%",background:"#287f70",borderRadius:20}}/></div></div>)}</div><div style={{border:"1px solid #e8e1d7",borderRadius:12,padding:22,marginTop:20}}><h3>Zone-wise response activity</h3>{[["Riverside Colony",6],["Lakeview Street",4],["Hilltop Road",2]].map(([zone,count])=><div key={zone} style={{display:"flex",justifyContent:"space-between",padding:"16px 0",borderBottom:"1px solid #eee8df"}}><span>{zone}</span><strong>{count} reports</strong></div>)}</div><div style={{background:"#edf2ec",padding:18,borderRadius:10,marginTop:20,color:"#426b59"}}>DEMO DATA · Figures are illustrative and not verified live operational measurements.</div></div>}
{page === "Settings" && <div className="panel pagepanel">
  <h2>System Configuration</h2>
  <p>Monitor platform services, integrations and operational safeguards.</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginTop:22}}>
    {[["RabbitMQ Message Broker","Event queue and message delivery","DEMO MODE"],["Redis Shared Cache","Shared state and assignment locks","DEMO MODE"],["AI Triage Engine","SOS classification and incident grouping","KEYWORD FALLBACK"],["Notification Channels","SMS, app notifications and email","SIMULATED"]].map(([name,desc,status])=><div key={name} style={{border:"1px solid #e7dfd4",borderRadius:12,padding:20,background:"#fffdf9"}}><div style={{fontWeight:700,color:"#173c38"}}>{name}</div><p style={{fontSize:13,color:"#71817b",lineHeight:1.6}}>{desc}</p><span className="pill informational">{status}</span></div>)}
  </div>
  <div style={{border:"1px solid #e7dfd4",borderRadius:12,padding:22,marginTop:22}}>
    <h3>Operational safeguards</h3>
    {[["SOS acknowledgement","Unique report IDs and acknowledgement flow"],["Duplicate protection","Idempotency checks for repeated submissions"],["Incident assignment","Assignment state and conflict prevention"],["Network resilience","Offline submission concept and retry handling"],["AI oversight","Human review and manual severity override"]].map(([name,desc])=><div key={name} style={{padding:"14px 0",borderBottom:"1px solid #eee8df"}}><strong>{name}</strong><p style={{margin:"5px 0 0",fontSize:13,color:"#71817b"}}>{desc}</p></div>)}
  </div>
  <div style={{background:"#f7eee0",padding:18,borderRadius:10,marginTop:20,color:"#795b31",lineHeight:1.7}}>
    <strong>DEMO ENVIRONMENT</strong><br/>
    RabbitMQ, Redis and notification integrations are not confirmed as connected. Connect and test the backend services before treating these indicators as live.
  </div>
</div>}      </main>

      {showSOS && <div className="modalback" onClick={()=>setShowSOS(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="eyebrow">CITIZEN REPORT / TEST MODE</div><h2>Submit an SOS</h2><p className="muted">Create a sample emergency report for the command centre demo.</p>
        {!sent ? <>
          <label>Your location</label><input className="field" placeholder="e.g. Riverside Colony"/>
          <label>What happened?</label><textarea className="field" rows="3" placeholder="Describe the emergency..."/>
          <label>Immediate need</label><select className="field"><option>Rescue assistance</option><option>Medical help</option><option>Food and water</option><option>Evacuation</option></select>
          
<button
  className="action"
  onClick={() => {
    const newIncident = {
      id: "INC-" + (2042 + incidentList.length - 4),
      title: "Citizen SOS Report",
      place: "Riverside Colony",
      level: "Critical",
      time: "Just now",
      icon: "!"
    };

    setIncidentList(prev => [newIncident, ...prev]);
    setSent(true);
  }}
>
  Send SOS report
</button>

        </> : <><div className="success">✓ SOS received in demo mode. Reference: SOS-DEMO-2042. Status: Received.</div><button className="action" style={{marginTop:15}} onClick={()=>{setShowSOS(false);setPage("Live Incidents")}}>View incident register</button></>}
      </div></div>}
    </div>
  );
}

export default App;
