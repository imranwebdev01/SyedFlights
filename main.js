/* ============================================================
   SYEDFLIGHTS — main.js (component-driven, self-contained)
============================================================ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ============ DATA (reusable component sources) ============ */
const DATA = {
  destinations: [
    { city:'New York', country:'United States', rating:4.8, price:299, badge:'Trending', grad:'#...', image:'assets/destination-1.jpg' },
    { city:'Paris', country:'France', rating:4.9, price:449, badge:'Most Loved', grad:'#...', image:'assets/destination-2.jpg' },
   { city:'Bali', country:'Indonesia', rating:4.7, price:389, badge:'Best Value', grad:'#...', image:'assets/destination-3.jpg' },
    { city:'Dubai', country:'UAE', rating:4.8, price:520, badge:'Luxury', grad:'#...', image:'assets/destination-1.jpg' },
    { city:'Tokyo', country:'Japan', rating:4.9, price:699, badge:'Exotic', grad:'#...', image:'assets/destination-2.jpg' },
    { city:'Istanbul', country:'Turkey', rating:4.6, price:349, badge:'Hidden Gem', grad:'#...', image:'assets/destination-3.jpg' },
  ],
  why: [
    { icon:'ri-shield-check-fill',        title:'Secure Booking',        text:'Bank-grade encryption protects every transaction. Book with complete confidence.' },
    { icon:'ri-price-tag-3-fill',         title:'Best Price Guarantee',  text:"Found it cheaper elsewhere? We'll match it and give you an extra 10% off." },
    { icon:'ri-customer-service-2-fill',  title:'24/7 Expert Support',   text:'Our travel specialists are available around the clock, wherever you are.' },
    { icon:'ri-calendar-check-fill',      title:'Flexible Changes',      text:'Plans change. Modify or cancel up to 24 hours before departure, no fee.' },
    { icon:'ri-map-2-fill',               title:'Curated Itineraries',   text:'Expertly designed travel plans tailored to your style, budget, and interests.' },
    { icon:'ri-award-fill',               title:'Loyalty Rewards',       text:'Earn miles on every booking. Redeem for upgrades, lounges, and free flights.' },
  ],
  packages: [
    { featured:true, badge:'Most Popular', icon:'ri-vip-crown-fill', name:'Business Class Escape', desc:'Lie-flat seats, fine dining at 40,000 feet, and a 5-star hotel on arrival.', price:'2,499',
      features:['Business class flights','5-star hotel (7 nights)','Private airport transfers','Lounge access included'], btn:'btn-primary' },
    { icon:'ri-sun-fill', name:'Weekend Getaway', desc:'Short on time, big on experience. Perfect 3-day escapes to nearby gems.', price:'499',
      features:['Economy class flights','4-star hotel (3 nights)','City tour included','Flexible dates'], btn:'btn-outline' },
    { icon:'ri-seedling-fill', name:'Family Adventure', desc:'Memories that last a lifetime. Kid-friendly destinations for all ages.', price:'1,299',
      features:['Family seating together','Resort hotel (10 nights)','Kids activities included','Travel insurance'], btn:'btn-outline' },
  ],
  reviews: [
    { stars:5, text:"SyedFlights turned our honeymoon into a dream. Every detail was perfect — from the seamless booking to the upgrade surprise at check-in.", name:'Amina Rashid', loc:'Dubai, UAE' },
    { stars:5, text:"As a frequent business traveler, I need reliability above all. SyedFlights consistently delivers — best prices, zero headaches, brilliant 24/7 team.", name:"James O'Brien", loc:'London, UK' },
    { stars:5, text:"Booked the Business Class Escape for our anniversary. The lounge, the lie-flat bed, the hotel — everything exceeded expectations. Worth every penny.", name:'Priya Mehta', loc:'Mumbai, India' },
    { stars:4.5, text:"Took the whole family to Bali. Six people, zero stress. The kids loved every minute, and the price beat five other sites I checked.", name:'David Kim', loc:'Seoul, South Korea' },
  ],
};

/* ============ COMPONENT RENDERERS ============ */
function renderStars(n){let h='';for(let i=0;i<5;i++){h+= i<Math.floor(n)?'<i class="ri-star-fill"></i>':(i<n?'<i class="ri-star-half-fill"></i>':'<i class="ri-star-line"></i>');}return h;}

function buildDestinations(){
  $('#dest-grid').innerHTML = DATA.destinations.map(d=>`
    <div class="dest-card" data-reveal>
      <div class="dest-img-wrap">
   <img class="dest-img" src="${d.image}" alt="${d.city}">
        <div class="dest-overlay"><span class="dest-badge">${d.badge}</span></div>
      </div>
      <div class="dest-info">
        <div class="dest-top">
          <div><h3 class="dest-name">${d.city}</h3><p class="dest-country"><i class="ri-map-pin-line"></i> ${d.country}</p></div>
          <div class="dest-rating"><i class="ri-star-fill"></i> ${d.rating}</div>
        </div>
        <div class="dest-bottom">
          <div class="dest-price"><span class="price-from">From</span><strong class="price-val">$${d.price}</strong><span class="price-unit">/ person</span></div>
          <button class="btn-book">Book Now <i class="ri-arrow-right-line"></i></button>
        </div>
      </div>
    </div>`).join('');
}
function buildWhy(){
  $('#why-grid').innerHTML = DATA.why.map(w=>`
    <div class="why-card" data-reveal>
      <div class="why-icon"><i class="${w.icon}"></i></div>
      <h3>${w.title}</h3><p>${w.text}</p>
    </div>`).join('');
}
function buildPackages(){
  $('#pkg-grid').innerHTML = DATA.packages.map(p=>`
    <div class="pkg-card ${p.featured?'pkg-featured':''}" data-reveal>
      ${p.badge?`<div class="pkg-badge">${p.badge}</div>`:''}
      <div class="pkg-icon"><i class="${p.icon}"></i></div>
      <h3 class="pkg-name">${p.name}</h3>
      <p class="pkg-desc">${p.desc}</p>
      <ul class="pkg-features">${p.features.map(f=>`<li><i class="ri-check-line"></i> ${f}</li>`).join('')}</ul>
      <div class="pkg-footer">
        <div class="pkg-price"><span>From</span><strong>$${p.price}</strong></div>
        <button class="${p.btn}">Book Package</button>
      </div>
    </div>`).join('');
}
function buildReviews(){
  $('#reviews-wrapper').innerHTML = DATA.reviews.map(r=>`
    <div class="swiper-slide">
      <div class="review-card">
        <div class="review-stars">${renderStars(r.stars)}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author">
          <div class="review-avatar">${r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
          <div><strong>${r.name}</strong><span>${r.loc}</span></div>
        </div>
      </div>
    </div>`).join('');
}

/* ============ NAVBAR ============ */
function initNav(){
  const navbar=$('#navbar'), hamburger=$('#nav-hamburger'), navLinks=$('#nav-links'), links=$$('.nav-link');
  window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',scrollY>20),{passive:true});
  hamburger.addEventListener('click',()=>{const o=navLinks.classList.toggle('open');hamburger.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';});
  navLinks.addEventListener('click',e=>{if(e.target.classList.contains('nav-link')){navLinks.classList.remove('open');hamburger.classList.remove('open');document.body.style.overflow='';}});
  document.addEventListener('click',e=>{if(!navbar.contains(e.target)){navLinks.classList.remove('open');hamburger.classList.remove('open');document.body.style.overflow='';}});
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')===`#${en.target.id}`));}),{threshold:.35});
  $$('section[id]').forEach(s=>io.observe(s));
}

/* ============ STARFIELD ============ */
function initStars(){
  const c=$('#stars');if(!c)return;
  const n=Math.min(120,Math.floor(innerWidth*0.08));
  let html='';
  for(let i=0;i<n;i++){const s=Math.random()*2+0.5;
    html+=`<div class="star" style="width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*85}%;--dur:${2+Math.random()*4}s;--delay:${Math.random()*4}s;opacity:${0.2+Math.random()*0.5}"></div>`;}
  c.innerHTML=html;
}

/* ============ THEME ============ */
function initTheme(){
  const btn=$('#theme-toggle'),icon=$('#theme-icon'),html=document.documentElement;
  const apply=d=>{html.setAttribute('data-theme',d?'dark':'light');icon.className=d?'ri-moon-fill':'ri-sun-fill';};
  apply(matchMedia('(prefers-color-scheme: dark)').matches);
  btn.addEventListener('click',()=>apply(html.getAttribute('data-theme')!=='dark'));
}

/* ============ REVEAL ============ */
function initReveal(){
  const io=new IntersectionObserver(es=>es.forEach((en,i)=>{if(en.isIntersecting){setTimeout(()=>en.target.classList.add('visible'),i*70);io.unobserve(en.target);}}),{threshold:.12});
  $$('[data-reveal]').forEach(el=>io.observe(el));
}

/* ============ COUNTERS ============ */
function initCounters(){
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting)return;const el=en.target,t=+el.dataset.count,dur=1600,start=performance.now();
    (function tick(now){const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3),v=Math.round(e*t);
      el.textContent=t>=1000?v.toLocaleString():v;if(p<1)requestAnimationFrame(tick);})(start);
    io.unobserve(el);
  }),{threshold:.5});
  $$('[data-count]').forEach(c=>io.observe(c));
}

/* ============ BACK TO TOP ============ */
function initBackToTop(){
  const btn=$('#back-to-top');
  window.addEventListener('scroll',()=>btn.classList.toggle('visible',scrollY>500),{passive:true});
  btn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
}

/* ============ SWIPER ============ */
function initSwiper(){
  if(typeof Swiper==='undefined')return;
  new Swiper('.reviews-swiper',{slidesPerView:'auto',spaceBetween:24,loop:true,grabCursor:true,
    autoplay:{delay:4000,disableOnInteraction:false,pauseOnMouseEnter:true},keyboard:{enabled:true},
    pagination:{el:'.swiper-pagination',clickable:true},
    breakpoints:{0:{slidesPerView:1},540:{slidesPerView:2},900:{slidesPerView:3}}});
}

/* ============ AUTH (client-side demo session) ============ */
const Auth=(function(){
  let user=null, dropdownEl=null;
  const signinBtn=$('#signin-btn'), signinLabel=$('#signin-label');
  const STORE='syedflights_session', TRIPS='syedflights_trips';
  const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML;};

  function load(){try{const s=JSON.parse(localStorage.getItem(STORE));if(s)setSession(s,true);}catch(e){}}
  function setSession(u,silent){user=u;localStorage.setItem(STORE,JSON.stringify(u));refreshUI();}
  function logout(){user=null;localStorage.removeItem(STORE);if(dropdownEl){dropdownEl.remove();dropdownEl=null;}refreshUI();const sp=$('#saved-panel');if(sp)sp.style.display='none';}
  function refreshUI(){
    if(!signinBtn)return;
    if(user){signinLabel.textContent=user.fullName.split(' ')[0];signinBtn.querySelector('i').className='ri-user-fill';signinBtn.classList.add('logged-in');loadSavedTrips();}
    else{signinLabel.textContent='Sign In';signinBtn.querySelector('i').className='ri-user-line';signinBtn.classList.remove('logged-in');}
  }
  function getTrips(){try{return JSON.parse(localStorage.getItem(TRIPS))||[];}catch(e){return[];}}
  function setTrips(t){localStorage.setItem(TRIPS,JSON.stringify(t));}

  function buildDropdown(){
    const wrap=document.createElement('div');wrap.className='account-dropdown';
    signinBtn.parentNode.insertBefore(wrap,signinBtn);wrap.appendChild(signinBtn);
    dropdownEl=document.createElement('div');dropdownEl.className='account-menu';
    dropdownEl.innerHTML=`
      <div class="account-menu-header"><strong>${esc(user.fullName)}</strong><span>${esc(user.email)}</span></div>
      <button class="account-menu-item" id="menu-trips"><i class="ri-bookmark-3-line"></i> My Saved Trips</button>
      <button class="account-menu-item danger" id="menu-logout"><i class="ri-logout-box-line"></i> Sign Out</button>`;
    wrap.appendChild(dropdownEl);
    $('#menu-trips').addEventListener('click',()=>{dropdownEl.classList.remove('open');$('#search').scrollIntoView({behavior:'smooth'});loadSavedTrips();});
    $('#menu-logout').addEventListener('click',logout);
    document.addEventListener('click',e=>{if(dropdownEl&&!wrap.contains(e.target))dropdownEl.classList.remove('open');});
  }
  if(signinBtn)signinBtn.addEventListener('click',()=>{
    if(user){if(!dropdownEl)buildDropdown();dropdownEl.classList.toggle('open');}else AuthModal.open('login');
  });

  function loadSavedTrips(){
    const panel=$('#saved-panel'),grid=$('#saved-grid');if(!panel||!user)return;
    const trips=getTrips();
    if(!trips.length){panel.style.display='none';return;}
    panel.style.display='block';
    grid.innerHTML=trips.map(b=>`
      <div class="saved-card" data-id="${b.id}">
        <div class="saved-card-info"><strong>${esc(b.fromCity)} → ${esc(b.toCity)}</strong>
          <span class="saved-card-meta"><i class="ri-calendar-line"></i> ${b.departDate||'—'}${b.returnDate?' – '+b.returnDate:''} · ${b.passengers} pax</span></div>
        <button class="saved-del" data-del="${b.id}" aria-label="Delete"><i class="ri-delete-bin-line"></i></button>
      </div>`).join('');
    $$('[data-del]',grid).forEach(btn=>btn.addEventListener('click',()=>{setTrips(getTrips().filter(t=>String(t.id)!==String(btn.dataset.del)));loadSavedTrips();}));
  }
  function saveTrip(data){
    if(!user)return{success:false,requiresAuth:true};
    const trips=getTrips();trips.unshift({id:Date.now(),...data});setTrips(trips);loadSavedTrips();
    return{success:true};
  }
  load();
  return{setSession,saveTrip,isLoggedIn:()=>!!user};
})();

/* ============ AUTH MODAL ============ */
const AuthModal=(function(){
  const overlay=$('#auth-modal'),closeBtn=$('#modal-close'),tabs=$$('.modal-tab');
  const loginForm=$('#login-form'),signupForm=$('#signup-form'),loginAlert=$('#login-alert'),signupAlert=$('#signup-alert');
  function open(tab='login'){overlay.classList.add('open');switchTab(tab);document.body.style.overflow='hidden';}
  function close(){overlay.classList.remove('open');document.body.style.overflow='';clearAlerts();}
  function switchTab(tab){tabs.forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));loginForm.style.display=tab==='login'?'grid':'none';signupForm.style.display=tab==='signup'?'grid':'none';clearAlerts();}
  function clearAlerts(){[loginAlert,signupAlert].forEach(el=>{if(el){el.className='modal-alert';el.textContent='';}});}
  function showAlert(el,msg,type){if(!el)return;el.className=`modal-alert show ${type}`;el.textContent=msg;}
  function setLoading(form,l){const b=form.querySelector('[type="submit"]');if(!b)return;b.disabled=l;b.querySelector('.btn-text').style.display=l?'none':'inline-flex';b.querySelector('.btn-loading').style.display=l?'inline-flex':'none';}
  closeBtn.addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  tabs.forEach(t=>t.addEventListener('click',()=>switchTab(t.dataset.tab)));

  loginForm.addEventListener('submit',e=>{
    e.preventDefault();clearAlerts();
    const email=$('#l-email').value.trim();setLoading(loginForm,true);
    setTimeout(()=>{
      Auth.setSession({fullName:email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),email});
      showAlert(loginAlert,'Welcome back! Signing you in…','success');setLoading(loginForm,false);setTimeout(close,800);
    },800);
  });
  signupForm.addEventListener('submit',e=>{
    e.preventDefault();clearAlerts();
    const fullName=$('#s-name').value.trim(),email=$('#s-email').value.trim();setLoading(signupForm,true);
    setTimeout(()=>{
      Auth.setSession({fullName,email});
      showAlert(signupAlert,'Account created! Welcome aboard ✈','success');setLoading(signupForm,false);setTimeout(close,800);
    },800);
  });
  return{open,close};
})();

/* ============ FLIGHT SEARCH ============ */
function initSearch(){
  const tabs=$$('.stab'),returnFld=$('#return-field'),fromIn=$('#sf-from'),toIn=$('#sf-to'),
        departIn=$('#sf-depart'),returnIn=$('#sf-return'),swapBtn=$('#swap-btn'),searchBtn=$('#search-btn'),
        panel=$('#results-panel'),grid=$('#results-grid'),empty=$('#results-empty'),closeBtn=$('#results-close');
  const today=new Date().toISOString().split('T')[0];
  if(departIn)departIn.min=today;if(returnIn)returnIn.min=today;

  tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');if(returnFld)returnFld.style.display=tab.dataset.trip==='roundtrip'?'flex':'none';}));
  swapBtn.addEventListener('click',()=>{const t=fromIn.value;fromIn.value=toIn.value;toIn.value=t;});

  const AIRLINES=[{name:'SyedFlights Air',icon:'ri-flight-takeoff-line'},{name:'Sky Express',icon:'ri-plane-line'},{name:'Global Wings',icon:'ri-flight-land-line'},{name:'Horizon Air',icon:'ri-flight-takeoff-line'}];
  const gen=(f,t)=>AIRLINES.map((a,i)=>({airline:a.name,icon:a.icon,from:f,to:t,
    departs:`${8+i*3}:${i%2===0?'00':'30'}`,arrives:`${14+i*2}:${i%2===0?'45':'15'}`,
    duration:`${5+i}h ${i*15}m`,stops:i===0?'Non-stop':`${i} stop${i>1?'s':''}`,price:249+i*130+Math.floor(Math.random()*60)}));

  function render(flights){
    grid.innerHTML=flights.map((f,i)=>`
      <div class="flight-card">
        <div class="flight-info">
          <div class="flight-airline"><i class="${f.icon}"></i> ${f.airline}</div>
          <div class="flight-route"><span>${f.from.split('(')[0].trim()}</span><span class="flight-route-line"></span><span>${f.to.split('(')[0].trim()}</span></div>
          <div class="flight-meta"><i class="ri-time-line"></i> ${f.departs} – ${f.arrives} · ${f.duration} · ${f.stops}</div>
        </div>
        <div class="flight-price-col">
          <div style="text-align:right"><div class="flight-price-label">From</div><div class="flight-price">$${f.price}</div><div class="flight-price-label">per person</div></div>
          <button class="btn-select" data-idx="${i}">Select</button>
        </div>
      </div>`).join('');
    $$('.btn-select',grid).forEach(btn=>btn.addEventListener('click',()=>{
      const f=flights[+btn.dataset.idx];
      const r=Auth.saveTrip({fromCity:f.from,toCity:f.to,departDate:departIn.value,returnDate:returnIn?.value||null,passengers:+$('#sf-pax').value||1});
      if(r.success){btn.textContent='Saved ✓';btn.classList.add('saved');}
      else if(r.requiresAuth)AuthModal.open('login');
    }));
  }

  searchBtn.addEventListener('click',()=>{
    const from=fromIn.value.trim(),to=toIn.value.trim(),depart=departIn.value;
    [fromIn,toIn,departIn].forEach(inp=>{const e=!inp.value.trim();inp.style.borderColor=e?'var(--danger)':'';setTimeout(()=>inp.style.borderColor='',1800);});
    if(!from||!to||!depart)return;
    if(from.toLowerCase()===to.toLowerCase()){empty.querySelector('p').textContent='Departure and destination cannot be the same.';empty.style.display='block';grid.innerHTML='';panel.style.display='block';return;}
    const orig=searchBtn.innerHTML;searchBtn.innerHTML='<i class="ri-loader-4-line spin"></i> Searching…';searchBtn.disabled=true;
    setTimeout(()=>{render(gen(from,to));empty.style.display='none';panel.style.display='block';panel.scrollIntoView({behavior:'smooth',block:'nearest'});searchBtn.innerHTML=orig;searchBtn.disabled=false;},700);
  });
  closeBtn.addEventListener('click',()=>panel.style.display='none');
}

/* ============ CONTACT FORM ============ */
function initContact(){
  const form=$('#contact-form'),alert=$('#contact-alert'),success=$('#contact-success');if(!form)return;
  const fields={
    name:{el:$('#c-name'),err:$('#c-name-err'),v:v=>v.trim().length>=2},
    email:{el:$('#c-email'),err:$('#c-email-err'),v:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)},
    subject:{el:$('#c-subject'),err:$('#c-subject-err'),v:v=>v.length>0},
    message:{el:$('#c-message'),err:$('#c-message-err'),v:v=>v.trim().length>=10},
  };
  const msg={name:'Please enter your name (min. 2 characters)',email:'Please enter a valid email address',subject:'Please select a subject',message:'Message must be at least 10 characters'};
  Object.values(fields).forEach(({el,err})=>el.addEventListener('input',()=>{err.textContent='';el.closest('.field-wrap').style.borderColor='';}));
  form.addEventListener('submit',e=>{
    e.preventDefault();if(alert){alert.className='modal-alert';alert.textContent='';}if(success)success.style.display='none';
    let ok=true;
    Object.entries(fields).forEach(([k,{el,err,v}])=>{if(!v(el.value)){err.textContent=msg[k];el.closest('.field-wrap').style.borderColor='var(--danger)';ok=false;}});
    if(!ok)return;
    const b=form.querySelector('[type="submit"]');b.disabled=true;b.querySelector('.btn-text').style.display='none';b.querySelector('.btn-loading').style.display='inline-flex';
    setTimeout(()=>{form.reset();if(success){success.style.display='flex';setTimeout(()=>success.style.display='none',6000);}b.disabled=false;b.querySelector('.btn-text').style.display='inline-flex';b.querySelector('.btn-loading').style.display='none';},900);
  });
}

/* ============ NEWSLETTER ============ */
function initNewsletter(){
  ['#newsletter-form','#footer-nl'].forEach(sel=>{
    const form=$(sel);if(!form)return;
    form.addEventListener('submit',e=>{e.preventDefault();const s=form.parentElement.querySelector('.nl-success')||$('#nl-success');form.reset();if(s){s.style.display='flex';setTimeout(()=>s.style.display='none',4000);}});
  });
}

/* ============ DESTINATION "Book Now" ============ */
function initBookNow(){
  document.addEventListener('click',e=>{
    const btn=e.target.closest('.btn-book');if(!btn)return;
    const city=btn.closest('.dest-card')?.querySelector('.dest-name')?.textContent||'';
    const toIn=$('#sf-to');if(toIn&&city)toIn.value=city;
    $('#search').scrollIntoView({behavior:'smooth'});setTimeout(()=>$('#sf-from')?.focus(),600);
  });
}

/* ============ BOOT ============ */
document.addEventListener('DOMContentLoaded',()=>{
  buildDestinations();buildWhy();buildPackages();buildReviews();
  initNav();initStars();initTheme();initReveal();initCounters();initBackToTop();
  initSwiper();initSearch();initContact();initNewsletter();initBookNow();
});