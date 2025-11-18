// CONFIG
const maintenanceMode = false; // Set true to enable maintenance page
const serverIP = 'StoicheionCraftSMP.aternos.me';
const serverPort = '61266';
const blogPosts = [
  {
    id: 1,
    title: 'StoicheionCraft SMP ┤ StoicheionCraft SMP S3 launch',
    description: 'Exciting news! StoicheionCraft SMP S3 is now live. Join the adventure, explore, and survive with friends!',
    content: `
<p style="margin-bottom: 20px;">We are thrilled to officially announce the launch of S3. Explore new worlds, build epic structures, and enjoy the crossplay experience on Bedrock and Java editions. This season comes packed with new features, events, and community activities designed for everyone. After months of preparation, testing, and improvements, S3 is finally live! This season brings exciting new features, enhanced gameplay mechanics, and full crossplay support, allowing players from both Bedrock and Java editions to join the fun together seamlessly. No matter what platform you’re on, you can now explore, build, and survive alongside your friends without any limitations.</p>

<p style="margin-bottom: 20px;">Here’s a detailed look at what’s new in S3:</p>

<ul style="margin-bottom: 20px;">
  <li style="margin-bottom: 10px;">Create Teams: Form your own teams with friends or other players to collaborate on building projects, surviving tough challenges, and conquering server events together.</li>
  <li style="margin-bottom: 10px;">Land Claim: Protect your builds and creations from unwanted interference. With Land Claim, your hard work is safe, giving you peace of mind while you focus on expanding your world.</li>
  <li style="margin-bottom: 10px;">TPA (Teleport Requests): Traveling to your teammates has never been this simple. Send teleport requests and instantly join your friends wherever they are, making exploration, collaboration, and adventure smoother than ever.</li>
</ul>

<p style="margin-bottom: 20px;">We encourage all players, old and new, to jump in, explore the world of S3, and take full advantage of all the features available. Don’t forget to join our Discord server for real-time updates, event announcements, and community discussions. Your feedback is invaluable, and we’re constantly working to make your S3 experience even better.</p>
`,
    date: '2025-11-16',
    image: 'Assets/Images/Blog/StoicheionCraft SMP - Blog.png?width=600&height=400'
  }
];

// CUSTOM NOTICE
let customNoticeText = '';

// HELPERS
const el = (q, ctx=document)=>ctx.querySelector(q);
const els = (q, ctx=document)=>Array.from(ctx.querySelectorAll(q));
const toast = el('#toast');

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
}

function showToast(msg='Copied'){ 
  toast.textContent=msg; 
  toast.classList.add('show'); 
  clearTimeout(window._toastTimer); 
  window._toastTimer=setTimeout(()=>toast.classList.remove('show'),2400); 
}

function copyServer(){ 
  navigator.clipboard.writeText(`${serverIP}:${serverPort}`).then(()=>showToast('IP copied')).catch(()=>showToast('Failed')); 
}

function joinMinecraft(){ 
  window.location.href=`minecraft://?server=${serverIP}:${serverPort}`; 
  setTimeout(()=>showToast('If client did not open, click Copy IP'),800); 
}

function openLink(url){ window.open(url,'_blank'); }
function openDiscord(){ openLink('https://discord.gg/3KAyEe2neQ'); }

// NOTICE
function renderNotice(){
  if(!customNoticeText || !customNoticeText.trim()) return;

  let notice = el('#notice');
  if(!notice){
    notice = document.createElement('div');
    notice.id = 'notice';
    notice.style.cssText = `
      background: linear-gradient(90deg, #ffcd32, #f39c12);
      color: #081428;
      padding: 0.8rem 1rem;
      text-align: center;
      font-weight: 600;
      font-size: 0.95rem;
    `;
    document.body.insertBefore(notice, el('#mainContent'));
  }
  notice.innerHTML = customNoticeText;
}

// HEADER
function renderHeader(){
  el('#header').innerHTML = `
  <div class="logo">
    <img src="Assets/Images/StoicheionCraft SMP - Logo.png" alt="Logo">
    <div><h1>StoicheionCraft SMP</h1><span>Bedrock & Java - Crossplay Friendly</span></div>
  </div>
  <div class="nav-wrap">
    <nav id="mainNav">
      <a href="#" data-route="home">Home</a>
      <a href="#" data-route="blog">Blog</a>
    </nav>
    <div class="cta">
      <button class="btn secondary" id="copyBtn">Copy IP</button>
      <button class="btn play" id="joinBtn">Play Now</button>
      <div class="burger" id="burger"><span></span><span></span><span></span></div>
    </div>
  </div>`;

  el('#copyBtn').addEventListener('click', copyServer);
  el('#joinBtn').addEventListener('click', joinMinecraft);
  el('#burger').addEventListener('click', ()=>{ 
    const nav=el('#mainNav'); 
    nav.style.display=(nav.style.display==='flex')?'none':'flex'; 
  });
  els('[data-route]').forEach(a=>a.addEventListener('click', e=>{
    e.preventDefault();
    navigate(a.dataset.route);
  }));
}

// FOOTER
function renderFooter() {
  el('#footer').innerHTML = `
  <div class="footer-inner" style="display:flex; justify-content:space-between; flex-wrap:wrap; padding:1.5rem 2rem; gap:1rem;">
    <div class="footer-lists" style="display:flex; gap:3rem;">
      <div class="footer-list">
        <h4>Company</h4>
        <a href="#" onclick="navigate('about')">About Us</a>
      </div>
      <div class="footer-list">
        <h4>Events</h4>
        <a href="#" onclick="navigate('blog')">Blog</a>
      </div>
    </div>
    <div class="socials" style="text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem;">
      <div style="font-weight:600; color:var(--text-color, #fff); font-size:1rem;">Follow Us</div>
      <div style="display:flex; gap:1rem;">
        <a href="#" onclick="openLink('https://youtube.com')">
          <img src="https://cdn.discordapp.com/emojis/1287945215419617422.webp?size=96" alt="yt" style="width:36px; height:36px;">
        </a>
        <a href="#" onclick="openDiscord()">
          <img src="https://cdn.discordapp.com/emojis/1287948814732234935.webp?size=96" alt="dc" style="width:36px; height:36px;">
        </a>
      </div>
    </div>
  </div>
  <div class="footer-bottom" style="margin-top:1.5rem; text-align:center; font-size:.85rem;">
    © 2025 Stoicheion SMP — All rights reserved
  </div>`;
}

// SERVER STATUS
async function updateServerStatus(){
  const playerElem = el('#playerCount');
  if(!playerElem) return;
  try{
    const res = await fetch(`https://api.mcping.com/?ip=${serverIP}&port=${serverPort}`);
    const data = await res.json();
    if(data.online){
      const online = data.players.now || 0;
      const max = data.players.max || '—';
      playerElem.textContent = `${online} / ${max}`;
    } else playerElem.textContent='Offline';
  }catch(e){ playerElem.textContent='—'; console.error(e);}
}
setInterval(updateServerStatus, 30000);

// NAVIGATION
function navigate(route, id){
  if(maintenanceMode) return renderMaintenance();
  route = route || 'home';

  if(route==='home') renderHome();
  else if(route==='blog') renderBlog();
  else if(route==='about') renderAbout();
  else if(route==='view' && id) renderBlogView(id);
  else render404(); // fallback for unknown routes

  history.replaceState({},'', id?`#view-${id}`:'#'+route);
}

// PAGES
function renderHome(){
  document.title='StoicheionCraft SMP ┤ Home';
  el('#mainContent').innerHTML=`
  <section class="hero section">
    <div class="hero-card">
      <h2>Welcome to Stoicheion SMP</h2>
      <p>Join an active Minecraft SMP community! Explore a massive SMP world, participate in events, build with factions, and leave your mark in a world full of endless possibilities.</p>
      <div class="features">
        <div class="feature">Survival Gameplay</div>
        <div class="feature">SMP World</div>
        <div class="feature">Crossplay</div>
      </div>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap">
        <button class="btn play" onclick="joinMinecraft()">Join Server</button>
        <button class="btn secondary" onclick="navigate('blog')">Latest News</button>
      </div>
      <div style="margin-top:1rem;color:var(--muted);font-size:.95rem">Tip: Keep your Minecraft client updated for Bedrock crossplay.</div>
    </div>
    <aside class="server-card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:.85rem;color:var(--muted)">Server IP</div>
          <div class="server-ip">${serverIP}</div>
        </div>
      </div>
      <div class="server-meta">
        <div class="meta-pill">Port: <strong>${serverPort}</strong></div>
        <div class="meta-pill">Version: <strong>1.20+</strong></div>
        <div class="meta-pill">Players: <strong id="playerCount">—</strong></div>
      </div>
      <div style="display:flex;gap:.6rem;margin-top:.75rem">
        <button class="btn play" style="flex:1" onclick="joinMinecraft()">Play Now</button>
        <button class="btn secondary" style="flex:.9" onclick="copyServer()">Copy</button>
      </div>
    </aside>
  </section>`;
  renderNotice();
  updateServerStatus();
}

function renderBlog(){
  document.title='StoicheionCraft SMP ┤ Blog';
  const main = el('#mainContent');
  main.innerHTML = `
    <section class="section">
      <h3>Latest News</h3>
      <div class="grid">
        ${blogPosts.map(post => `
          <article class="card">
            <img src="${post.image}" alt="${post.title}">
            <div class="title">${post.title}</div>
            <div style="color: var(--muted); font-size: .95rem;">
              ${post.content.length > 120 ? post.content.substring(0,120)+'...' : post.content}
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:auto;">
              <div class="meta">${formatDate(post.date)}</div>
              <div><button class="btn play" onclick="navigate('view',${post.id})">Read More</button></div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>`;
  renderNotice();
}

function renderAbout(){
  document.title='StoicheionCraft SMP ┤ About';
  el('#mainContent').innerHTML=`
    <section class="section">
      <h3>About Stoicheion SMP</h3>
      <div class="card">
        <p style="color:var(--muted)">StoicheionCraft SMP is a Minecraft Survival Multiplayer (SMP) server available for Bedrock Edition and Java Edition.</p>
        <ul>
            <li>Community-focused server for building, exploring, and surviving.</li>
            <li>Peaceful/cooperative gameplay, PvP limited or disabled.</li>
        </ul>
        <h3>Features:</h3>
        <ul>
            <li>One-Player Sleep – skip night if one player sleeps.</li>
            <li>Crossplay supported for Bedrock & Java clients.</li>
            <li>Create Teams for collaboration.</li>
            <li>Land Claim to protect builds.</li>
            <li>TPA (Teleport Requests).</li>
        </ul>
        <p style="color:var(--muted)">Friendly, cross-platform SMP prioritizing building, exploration, teamwork, and community.</p>
        <div style="margin-top:1rem;display:flex;gap:.6rem">
          <button class="btn play" onclick="joinMinecraft()">Play</button>
          <button class="btn secondary" onclick="openDiscord()">Join Discord</button>
        </div>
      </div>
    </section>`;
  renderNotice();
}

function renderBlogView(id){
  const post = blogPosts.find(p => p.id === id);
  if(!post) return navigate('blog');

  document.title = `${post.title} — StoicheionCraft SMP ┤ Blog`;

  el('#mainContent').innerHTML = `
    <section class="section blog-view">
      <div style="margin-bottom:1rem;">
        <button class="btn secondary" onclick="navigate('blog')">← Back to Blog</button>
      </div>
      <div class="blog-banner" style="position:relative; overflow:hidden; border-radius:12px;">
        <img src="${post.image}" alt="${post.title}" style="width:100%; height:400px; object-fit:cover;">
        <div class="blog-banner-overlay" style="
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          background:rgba(0,0,0,0.6);
          color:#fff;
          padding:1.5rem;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
        ">
          <h2 style="margin:0 0 0.5rem 0;">${post.title}</h2>
          <span style="font-size:.9rem; color:#ccc;">${formatDate(post.date)}</span>
        </div>
      </div>
      <div class="blog-content" style="margin-top:1.5rem; line-height:1.6; color:var(--text-color, #fff);">
        <p>${post.content}</p>
      </div>
    </section>`;
  renderNotice();
}

// MAINTENANCE PAGE
function renderMaintenance() {
  document.title = 'StoicheionCraft SMP - Maintenance';
  el('#mainContent').innerHTML = `
    <section style="
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
      height:60vh;
      padding:2rem;
      color:#fff;
      text-align:center;
    ">
      <div style="margin-top:2rem;">
        <img src="Assets/Images/StoicheionCraft SMP - Logo.png" alt="Logo" style="width:120px; margin-bottom:1rem;">
        <h2 style="font-size:2rem; margin-bottom:1rem;">We'll Be Back Soon</h2>
        <p style="font-size:1rem; color:#ccc; max-width:500px; margin:0 auto;">
          Thanks for your patience. <br> <br> We are working to get back online as soon as possible.
        </p>
      </div>
      <div style="margin-bottom:2rem; font-size:1rem; color:#ccc;">
        Please visit our 
        <a href="https://stoicheioncraftsmp.instatus.com/" target="_blank" style="
          color:#ffcd32;
          text-decoration:underline;
          font-weight:600;
        ">status page</a> 
        for more information.
      </div>
    </section>`;
}

// 404 PAGE
function render404() {
  document.title = '404 - Page Not Found';
  el('#mainContent').innerHTML = `
    <section style="
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      height:70vh;
      text-align:center;
      color:#fff;
    ">
      <h1 style="font-size:5rem; margin-bottom:1rem;">404</h1>
      <p style="font-size:1.5rem; margin-bottom:1.5rem;">Oops! Page not found.</p>
      <button class="btn play" onclick="navigate('home')">Go Back Home</button>
    </section>
  `;
}

// INIT
function init(){
  if(maintenanceMode) return renderMaintenance();
  renderHeader();
  renderFooter();
  const hash=location.hash.replace('#','');
  if(hash.startsWith('view-')) navigate('view',parseInt(hash.split('-')[1]));
  else if(hash==='blog') navigate('blog');
  else if(hash==='about') navigate('about');
  else if(hash==='home' || hash==='') navigate('home');
  else render404();
}

window.addEventListener('DOMContentLoaded', init);
