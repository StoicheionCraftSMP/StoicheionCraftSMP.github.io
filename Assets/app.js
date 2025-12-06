const maintenanceMode = false;
const serverIP = 'StoicheionCraftSMPS3.aternos.me';
const serverPort = '43087';
const banWebhookURL = "https://discord.com/api/webhooks/1441556690133581826/P6Wd8qVkS4Kt3USm8HQ6wybEuH6DyYGmxY7WpsWNeOQP44PUqbX2dIQH-JRDkFahqDfU";

// GOOGLE BLOGGER API SETTINGS
const BLOG_ID = '4867051018069197121';
const API_KEY = 'AIzaSyBvSdhxKjHCXJFKABTqPwJvGHIsyJs3lW0';

// BLOG POSTS (will be fetched)
let blogPosts = [];

const el = (q, ctx=document)=>ctx.querySelector(q);
const els = (q, ctx=document)=>Array.from(ctx.querySelectorAll(q));
const toast = el('#toast');

function formatDate(dateStr){
  const d = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString(undefined, options);
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
let customNoticeText = ``;

function renderNotice(){
  if(!customNoticeText || !customNoticeText.trim()) return;
  let notice = el('#notice');
  if(!notice){
    notice = document.createElement('div');
    notice.id = 'notice';
    notice.className='notice-bar show';
    document.body.insertBefore(notice, el('#mainContent'));
  }
  notice.innerHTML = customNoticeText;
}

// === COUNTDOWN TO 2:30 PM FIGHT ===
function getNext230PM() {
  const now = new Date();
  const target = new Date();

  target.setHours(14, 30, 0, 0); // 2:30 PM

  // if it's already past 2:30 PM today, schedule for tomorrow
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  return target;
}

let countdownTarget = getNext230PM();

function startCountdownNotice() {
  function update() {
    const now = new Date();
    const diff = countdownTarget - now;

    if (diff <= 0) {
      customNoticeText = `<strong>⚔️ The fight has started!</strong>`;
      renderNotice();
      return;
    }

    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    customNoticeText = `
      <strong>Fight starts:</strong> ${h}h ${m}m ${s}s
    `;

    renderNotice();
  }

  update();
  setInterval(update, 1000);
}

// HEADER
function renderHeader(){
  el('#header').innerHTML = `
  <div class="logo">
    <img src="Assets/Images/StoicheionCraft SMP (Christmas) - PFP (Logo).png" alt="Logo">
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
    <div class="footer-inner">
      <div class="footer-lists">
        <div class="footer-list">
          <h4>Company</h4>
          <a href="#" onclick="navigate('about')">About Us</a>
        </div>
        <div class="footer-list">
          <h4>Events</h4>
          <a href="#" onclick="navigate('blog')">Blog</a>
        </div>
        <div class="footer-list">
          <h4>Appeal</h4>
          <a href="#" onclick="navigate('appeal')">Ban Appeal</a>
        </div>
      </div>

      <div class="socials">
        <div class="social-icons" style="margin-top:0.5rem;">
          <a href="#" onclick="openLink('https://youtube.com')">
            <img src="https://cdn.discordapp.com/emojis/1287945215419617422.webp?size=96" alt="YouTube">
          </a>
          <a href="#" onclick="openDiscord()">
            <img src="https://cdn.discordapp.com/emojis/1287948814732234935.webp?size=96" alt="Discord">
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      © 2025 Stoicheion SMP — All rights reserved
    </div>
  `;
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
  else if(route==='appeal') renderAppeal();
  else if(route==='view' && id) renderBlogView(id);
  else render404();
  history.replaceState({},'', id?`#view-${id}`:'#'+route);
}

// HOME
function renderHome(){
  document.title='StoicheionCraft SMP ┤ Home';
  el('#mainContent').innerHTML=`<section class="hero section">
    <div class="hero-card">
      <h2>Welcome to Stoicheion SMP</h2>
      <p>Join an active Minecraft SMP community!</p>
      <div class="features">
        <div class="feature">Survival Gameplay</div>
        <div class="feature">SMP World</div>
        <div class="feature">Crossplay</div>
      </div>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap">
        <button class="btn play" onclick="joinMinecraft()">Join Server</button>
        <button class="btn secondary" onclick="navigate('blog')">Latest News</button>
      </div>
    </div>
    <aside class="server-card">
      <div>
        <div style="font-size:.85rem;color:var(--muted)">Server IP</div>
        <div class="server-ip">${serverIP}</div>
      </div>
      <div class="server-meta">
        <div class="meta-pill">Port: <strong>${serverPort}</strong></div>
        <div class="meta-pill">Bedrock Version: <strong>1.21.123</strong></div>
        <div class="meta-pill">Java Version: <strong>1.21.10</strong></div>
      </div>
    </aside>
  </section>`;
  renderNotice();
  updateServerStatus();
}

// FETCH BLOG POSTS
async function fetchBloggerPosts() {
  try {
    const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`);
    const data = await res.json();
    return data.items.map((item, index) => {
      let img = item.images?.[0]?.url || null;
      if (!img) {
        const match = item.content.match(/<img.*?src="(.*?)"/);
        if (match) img = match[1];
      }

      return {
        id: index + 1,
        title: item.title,
        content: item.content,
        date: item.published,
        image: img,
        video: null
      };
    });
  } catch (err) {
    console.error('Error fetching Blogger posts:', err);
    return [];
  }
}

// BLOG LIST
async function renderBlog(){
  if(blogPosts.length===0) blogPosts = await fetchBloggerPosts();
  document.title='StoicheionCraft SMP - Blog';
  const main = el('#mainContent');
  main.innerHTML = `<section class="section"><h3>Latest News</h3>
    <div class="grid">
      ${blogPosts.map(post=>`
        <article class="card">
          ${post.image? `<img src="${post.image}" alt="${post.title}">` : ''}
          <div class="title">${post.title}</div>
          <div style="display:flex; justify-content:space-between;">
            <div class="meta">${formatDate(post.date)}</div>
            <button class="btn play" onclick="navigate('view',${post.id})">Read More</button>
          </div>
        </article>
      `).join('')}
    </div>
  </section>`;
  renderNotice();
}

// BLOG VIEW
function renderBlogView(id){
  const post = blogPosts.find(p => p.id === id);
  if(!post) return navigate('blog');

  document.title = `${post.title} — StoicheionCraft SMP`;

  el('#mainContent').innerHTML = `
    <section class="section blog-view" style="max-width:800px;margin:0 auto;">
      <h2>${post.title}</h2>
      <span style="font-size:.9rem; color:#999;">${formatDate(post.date)}</span>
      <div class="blog-content">
        ${post.content}
      </div>
    </section>
  `;

  renderNotice();
}

// BAN APPEAL
function renderAppeal(){
  document.title='Ban Appeal ┤ StoicheionCraft SMP';
  el('#mainContent').innerHTML=`
    <section class="section" style="max-width:600px;margin:auto;">
      <h2>Ban Appeal Form</h2>
      <p style="color:#ccc;margin-bottom:1rem;">Submit your appeal and staff will review it.</p>
      <form id="banAppealForm" style="display:flex;flex-direction:column;gap:1rem;">
        <input id="username" class="input" placeholder="Minecraft Username" required>
        <textarea id="reason" class="input" placeholder="Explain why you should be unbanned" rows="5" required></textarea>
        <button class="btn play" type="submit">Submit Appeal</button>
      </form>
    </section>
  `;

  const form = el('#banAppealForm');
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = el("#username").value.trim();
    const reason = el("#reason").value.trim();

    if (!username || !reason) return alert("Please fill in all fields.");

    try {
      await sendBanAppeal(username, reason);
      alert("Your appeal has been submitted!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to send appeal. Try again.");
    }
  });
}

function sendBanAppeal(username, reason){
  return fetch(banWebhookURL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      content: null,
      embeds: [{
        title: "📩 New Ban Appeal Submitted",
        color: 0xffcd32,
        fields: [
          {name: "Username", value: username},
          {name: "Appeal Reason", value: reason}
        ],
        timestamp: new Date().toISOString()
      }]
    })
  });
}

// INIT
async function init(){
  if(maintenanceMode) return renderMaintenance();
  renderHeader();
  renderFooter();

  startCountdownNotice(); // ← Countdown to 2:30 PM activated

  const hash=location.hash.replace('#','');
  if(hash.startsWith('view-')) navigate('view',parseInt(hash.split('-')[1]));
  else if(hash==='blog') navigate('blog');
  else if(hash==='about') navigate('about');
  else if(hash==='appeal') navigate('appeal');
  else if(hash==='home'||hash==='') navigate('home');
  else render404();
}

window.addEventListener('DOMContentLoaded', init);
