/* ===== ThemeKit — محرّك الثيمات المشترك (كل الصفحات) ===== */
(function(){
"use strict";
var LS=window.localStorage;

/* ---- الألوان الرئيسية (Accent) ---- */
var ACCENTS={
  mint:   {ar:"نعناعي", main:"#5eead4", deep:"#14b8a6", lmain:"#0d9488", ldeep:"#0f766e"},
  violet: {ar:"بنفسجي", main:"#a78bfa", deep:"#7c3aed", lmain:"#7c3aed", ldeep:"#6d28d9"},
  blue:   {ar:"أزرق",   main:"#60a5fa", deep:"#2563eb", lmain:"#2563eb", ldeep:"#1d4ed8"},
  rose:   {ar:"وردي",   main:"#fb7185", deep:"#e11d48", lmain:"#e11d48", ldeep:"#be123c"},
  amber:  {ar:"كهرماني",main:"#fbbf24", deep:"#d97706", lmain:"#c2740a", ldeep:"#a16207"},
  lime:   {ar:"ليموني", main:"#a3e635", deep:"#65a30d", lmain:"#65a30d", ldeep:"#4d7c0f"}
};
/* ---- خلفيات (للوضع الداكن) ---- */
var BGS={
  def:     {ar:"الافتراضي", b0:null,      b1:null},
  midnight:{ar:"منتصف الليل", b0:"#04060c", b1:"#090e1a"},
  ocean:   {ar:"محيط",     b0:"#051320", b1:"#0a2033"},
  grape:   {ar:"عنبي",     b0:"#0d0716", b1:"#171029"},
  forest:  {ar:"غابة",     b0:"#06130d", b1:"#0c2015"},
  coal:    {ar:"أسود فحمي", b0:"#000000", b1:"#0d0d0f"},
  /* تدرّجات بأسلوب Outlook */
  sky:     {ar:"سماء",    g:"linear-gradient(135deg,#1e3a8a 0%,#0ea5e9 55%,#67e8f9 100%)"},
  sunset:  {ar:"غروب",    g:"linear-gradient(135deg,#3b0764 0%,#be185d 45%,#fb923c 100%)"},
  aurora:  {ar:"شفق",     g:"linear-gradient(135deg,#022c22 0%,#0d9488 45%,#a78bfa 100%)"},
  orchid:  {ar:"أوركيد",  g:"linear-gradient(135deg,#312e81 0%,#7c3aed 50%,#f0abfc 100%)"},
  ember:   {ar:"جمر",     g:"linear-gradient(135deg,#1c1917 0%,#7c2d12 50%,#f59e0b 100%)"},
  steel:   {ar:"رمادي هادئ",g:"linear-gradient(135deg,#0f172a 0%,#334155 60%,#94a3b8 100%)"},
  img:     {ar:"صورة 🖼️", img:true}
};
var THEMES={
  glass:   {ar:"زجاجي ✨"},
  flat:    {ar:"مسطّح ⬜"},
  material:{ar:"ماتيريال 🧱"},
  neu:     {ar:"نيومورفيزم 🫧"}
};
var THEME_KEYS=Object.keys(THEMES), ACC_KEYS=Object.keys(ACCENTS), BG_KEYS=Object.keys(BGS);

function rnd(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* ---- الحالة ---- */
var S={
  theme: LS.getItem("uiTheme"),
  accent:LS.getItem("uiAccent"),
  bg:    LS.getItem("uiBg"),
  glassLv:parseInt(LS.getItem("glassLv")||"60",10),
  flatRad:LS.getItem("flatRad")||"round",   // sharp | round
  matElev:LS.getItem("matElev")||"high",    // low | high
  neuDepth:LS.getItem("neuDepth")||"soft",  // soft | deep
  btnShape:LS.getItem("btnShape")||"round", // round | sharp | pill
  btnOp:parseInt(LS.getItem("btnOp")||"100",10),
  dayDone:LS.getItem("dayDone")||"dim"      // dim | neon | fire | accent
};
/* مستخدم جديد ⇒ ثيم عشوائي افتراضياً */
if(!S.theme||!THEMES[S.theme]){
  S.theme=rnd(THEME_KEYS); S.accent=rnd(ACC_KEYS); S.bg=rnd(BG_KEYS);
  S.glassLv=40+Math.floor(Math.random()*50);
  S.flatRad=rnd(["sharp","round"]); S.matElev=rnd(["low","high"]); S.neuDepth=rnd(["soft","deep"]);
  S.btnShape=rnd(["round","sharp","pill"]); S.btnOp=100; S.dayDone=rnd(["dim","neon","accent"]);
  persist();
}
if(isNaN(S.btnOp)) S.btnOp=100;
if(!S.accent||!ACCENTS[S.accent]) S.accent="mint";
if(!S.bg||!BGS[S.bg]) S.bg="def";
if(isNaN(S.glassLv)) S.glassLv=60;

function persist(){
  LS.setItem("uiTheme",S.theme); LS.setItem("uiAccent",S.accent); LS.setItem("uiBg",S.bg);
  LS.setItem("glassLv",String(S.glassLv)); LS.setItem("flatRad",S.flatRad);
  LS.setItem("matElev",S.matElev); LS.setItem("neuDepth",S.neuDepth);
  LS.setItem("btnShape",S.btnShape); LS.setItem("btnOp",String(S.btnOp)); LS.setItem("dayDone",S.dayDone);
}

/* ---- حقن CSS الثيمات (مرة واحدة) ---- */
var CSS=''+
'body[data-theme]{transition:background .35s}'+
'body[data-theme] .card,body[data-theme] .stat{transition:background .3s,box-shadow .3s,border-radius .3s}'+
/* --- مسطّح --- */
'body[data-theme=flat] .orb,body[data-theme=flat] .grain{display:none!important}'+
'body[data-theme=flat] .card::before{display:none!important}'+
'body[data-theme=flat] .card,body[data-theme=flat] .stat{background:var(--tk-surface)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:1px solid var(--tk-line)!important;border-radius:var(--tk-rad)!important;box-shadow:none!important}'+
'body[data-theme=flat] button,body[data-theme=flat] .btn,body[data-theme=flat] .brkbtn,body[data-theme=flat] .set-btn,body[data-theme=flat] select,body[data-theme=flat] input{border-radius:calc(var(--tk-rad) - 3px)!important;box-shadow:none!important}'+
/* --- ماتيريال --- */
'body[data-theme=material] .orb,body[data-theme=material] .grain{display:none!important}'+
'body[data-theme=material] .card::before{display:none!important}'+
'body[data-theme=material] .card,body[data-theme=material] .stat{background:var(--tk-surface)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:none!important;border-radius:18px!important;box-shadow:var(--tk-elev)!important}'+
'body[data-theme=material] button,body[data-theme=material] .btn,body[data-theme=material] .brkbtn,body[data-theme=material] .set-btn{border-radius:999px!important}'+
'body[data-theme=material] .card:hover{box-shadow:var(--tk-elev-h)!important}'+
/* --- نيومورفيزم --- */
'body[data-theme=neu] .orb,body[data-theme=neu] .grain{display:none!important}'+
'body[data-theme=neu] .card::before{display:none!important}'+
'body[data-theme=neu]{background:var(--tk-neubg)!important}'+
'body[data-theme=neu] .card,body[data-theme=neu] .stat{background:var(--tk-neubg)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:none!important;border-radius:22px!important;box-shadow:var(--tk-nsh)!important}'+
'body[data-theme=neu] button,body[data-theme=neu] .btn,body[data-theme=neu] .brkbtn,body[data-theme=neu] .set-btn{box-shadow:var(--tk-nsh-s)!important;border:none!important;border-radius:14px!important}'+
'body[data-theme=neu] input,body[data-theme=neu] select{background:var(--tk-neubg)!important;box-shadow:var(--tk-nsh-in)!important;border:none!important}'+
/* --- لوحة الإعدادات --- */
'.tk-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}'+
'.tk-o{text-align:center;padding:11px 8px;border-radius:11px;border:1px solid var(--stroke,rgba(255,255,255,.12));background:var(--glass,rgba(255,255,255,.06));cursor:pointer;font-weight:600;font-size:12.5px;color:var(--txt-dim,#9fb0cc);transition:.15s;user-select:none}'+
'.tk-o.on{background:linear-gradient(120deg,var(--mint,#5eead4),var(--mint-deep,var(--mintd,#14b8a6)));color:#04211c;border-color:transparent}'+
'.tk-rand{grid-column:1/-1;background:linear-gradient(120deg,#a78bfa,#5eead4,#fbbf24);color:#10131c;font-weight:800}'+
'.tk-sw{display:flex;gap:9px;flex-wrap:wrap;margin-top:4px}'+
'.tk-c{width:34px;height:34px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:.15s;position:relative}'+
'.tk-c.on{border-color:#fff;box-shadow:0 0 0 2px var(--mint,#5eead4);transform:scale(1.08)}'+
'.tk-bg{width:46px;height:34px;border-radius:9px;cursor:pointer;border:2px solid rgba(255,255,255,.18);transition:.15s}'+
'.tk-bg.on{border-color:var(--mint,#5eead4);transform:scale(1.06)}'+
'.tk-k{font-size:12.5px;color:var(--txt-dim,#9fb0cc);margin:13px 0 8px;font-weight:700}'+
'.tk-range{width:100%;accent-color:var(--mint,#5eead4)}'+
'.tk-seg{display:flex;gap:6px}.tk-seg .tk-o{flex:1}'+
/* --- صفحات الإدارة: طابع رسمي --- */
'body[data-tkpage=admin][data-theme=material] button,body[data-tkpage=admin][data-theme=material] .btn{border-radius:12px!important}'+
'body[data-tkpage=admin][data-theme=neu] .card,body[data-tkpage=admin][data-theme=neu] .stat{border-radius:14px!important}'+
'body[data-tkpage=admin] .tk-rand{filter:saturate(.65)}'+
/* --- وضوح شاشات الكمبيوتر --- */
'@media(min-width:1100px){'+
 'body[data-tkpage=admin] .wrap{max-width:980px!important}'+
 'body[data-tkpage=app] .wrap,body[data-tkpage=app] .shell{max-width:1040px!important}'+
 '.card{border-radius:18px}'+
 'body{font-size:15.5px}'+
'}'+
/* --- شكل الأزرار وشفافيتها --- */
'body[data-btnshape=sharp] button,body[data-btnshape=sharp] .btn,body[data-btnshape=sharp] .brkbtn,body[data-btnshape=sharp] .set-btn,body[data-btnshape=sharp] .nav-btn{border-radius:6px!important}'+
'body[data-btnshape=pill] button,body[data-btnshape=pill] .btn,body[data-btnshape=pill] .brkbtn,body[data-btnshape=pill] .set-btn{border-radius:999px!important}'+
'.btn,.brkbtn,.set-btn,button.mint,.brktoggle,.tk-rand{opacity:var(--tk-btnop,1)}'+
/* --- أنماط الأيام المنتهية (جدول التطبيق) --- */
'body[data-daydone=neon] .day.past{opacity:1!important;filter:none!important;border-color:var(--mint)!important;box-shadow:0 0 10px color-mix(in srgb,var(--mint) 55%,transparent),inset 0 0 16px color-mix(in srgb,var(--mint) 22%,transparent)}'+
'body[data-daydone=neon] .day.past .dn,body[data-daydone=neon] .day.past .dd,body[data-daydone=neon] .day.past .val{text-decoration:none!important;color:var(--mint);text-shadow:0 0 8px color-mix(in srgb,var(--mint) 70%,transparent)}'+
'body[data-daydone=fire] .day.past{opacity:1!important;filter:none!important;background:linear-gradient(150deg,#450a0a,#9a3412 55%,#f59e0b)!important;border-color:#f59e0b!important}'+
'body[data-daydone=fire] .day.past .dn,body[data-daydone=fire] .day.past .dd,body[data-daydone=fire] .day.past .val{text-decoration:none!important;color:#fff7ed!important}'+
'body[data-daydone=accent] .day.past{opacity:1!important;filter:none!important;background:linear-gradient(150deg,color-mix(in srgb,var(--mint) 30%,transparent),color-mix(in srgb,var(--mint-deep,var(--mintd,#14b8a6)) 55%,transparent))!important;border-color:var(--mint)!important}'+
'body[data-daydone=accent] .day.past .dn,body[data-daydone=accent] .day.past .dd,body[data-daydone=accent] .day.past .val{text-decoration:none!important;color:#fff!important}'+
'@media(min-width:1100px){body[data-tkpage=admin] #empResult{display:grid;grid-template-columns:1fr 1fr;gap:10px}body[data-tkpage=admin] #empResult>div:first-child{grid-column:1/-1}body[data-tkpage=admin] #empResult>div{margin-bottom:0!important}}';

var PAGE=(function(){ var p=(location.pathname||"").toLowerCase();
  if(p.indexOf("admin")>=0||p.indexOf("upload")>=0) return "admin"; return "app"; })();
function inject(){
  if(document.getElementById("tkStyles"))return;
  var st=document.createElement("style"); st.id="tkStyles"; st.textContent=CSS;
  document.head.appendChild(st);
}

/* ---- التطبيق ---- */
function isLight(){ return document.body.classList.contains("light"); }
function apply(){
  inject();
  var b=document.body, r=b.style, L=isLight();
  b.setAttribute("data-theme",S.theme); b.setAttribute("data-tkpage",PAGE); b.setAttribute("data-btnshape",S.btnShape); b.setAttribute("data-daydone",S.dayDone); r.setProperty("--tk-btnop",(Math.max(35,Math.min(100,S.btnOp))/100).toFixed(2));
  /* اللون الرئيسي — يغطي كل تسميات الصفحات */
  var A=ACCENTS[S.accent];
  var main=L?A.lmain:A.main, deep=L?A.ldeep:A.deep;
  r.setProperty("--mint",main); r.setProperty("--mint-deep",deep); r.setProperty("--mintd",deep);
  /* الخلفية (الوضع الداكن فقط) */
  var G=BGS[S.bg]||BGS.def;
  b.style.backgroundImage=""; b.style.backgroundSize=""; b.style.backgroundAttachment=""; b.style.backgroundPosition="";
  var IMG=LS.getItem("uiBgImg");
  if(G.img && IMG){
    var ov=L?"linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,.6))":"linear-gradient(rgba(4,7,14,.55),rgba(4,7,14,.66))";
    b.style.backgroundImage=ov+",url("+IMG+")"; b.style.backgroundSize="cover"; b.style.backgroundPosition="center"; b.style.backgroundAttachment="fixed";
    r.setProperty("--tk-surface",L?"rgba(255,255,255,.92)":"rgba(10,16,28,.92)");
  } else if(G.g){
    var ov2=L?"":"linear-gradient(rgba(4,7,14,.38),rgba(4,7,14,.5)),";
    b.style.backgroundImage=ov2+G.g; b.style.backgroundSize="cover"; b.style.backgroundAttachment="fixed";
    r.setProperty("--tk-surface",L?"rgba(255,255,255,.9)":"rgba(10,16,28,.9)");
  } else if(!L && G.b0){ r.setProperty("--bg-0",G.b0); r.setProperty("--bg-1",G.b1); r.setProperty("--bg",G.b0); r.setProperty("--bg2",G.b1); r.setProperty("--tk-surface",G.b1); }
  else { r.removeProperty("--bg-0"); r.removeProperty("--bg-1"); r.removeProperty("--bg"); r.removeProperty("--bg2"); r.setProperty("--tk-surface",L?"#ffffff":"#0c1424"); }
  r.setProperty("--tk-line",L?"rgba(22,44,78,.14)":"rgba(255,255,255,.09)");
  /* خصائص كل ثيم */
  if(S.theme==="glass"){
    var k=Math.max(10,Math.min(100,S.glassLv))/60;
    var a1=(L?0.62:0.055)*k, a2=(L?0.8:0.09)*k;
    a1=Math.min(a1,L?0.95:0.5); a2=Math.min(a2,L?0.98:0.6);
    r.setProperty("--glass","rgba(255,255,255,"+a1.toFixed(3)+")");
    r.setProperty("--glass-strong","rgba(255,255,255,"+a2.toFixed(3)+")");
    r.setProperty("--glass2","rgba(255,255,255,"+(a1*1.4).toFixed(3)+")");
    r.setProperty("--blurpx",Math.round(22*k)+"px");
  } else { ["--glass","--glass-strong","--glass2","--blurpx"].forEach(function(v){r.removeProperty(v);}); }
  r.setProperty("--tk-rad",S.flatRad==="sharp"?"7px":"15px");
  r.setProperty("--tk-elev",S.matElev==="high"?(L?"0 2px 5px rgba(40,60,100,.2),0 10px 26px rgba(40,60,100,.18)":"0 2px 5px rgba(0,0,0,.35),0 10px 28px rgba(0,0,0,.3)"):(L?"0 1px 3px rgba(40,60,100,.16)":"0 1px 3px rgba(0,0,0,.3)"));
  r.setProperty("--tk-elev-h",S.matElev==="high"?(L?"0 4px 10px rgba(40,60,100,.24),0 16px 36px rgba(40,60,100,.22)":"0 4px 10px rgba(0,0,0,.4),0 16px 40px rgba(0,0,0,.36)"):(L?"0 2px 6px rgba(40,60,100,.2)":"0 2px 6px rgba(0,0,0,.35)"));
  var nb=L?"#e0e5ec":"#23262e", d=(S.neuDepth==="deep")?12:8;
  r.setProperty("--tk-neubg",nb);
  r.setProperty("--tk-nsh",L?(d+"px "+d+"px "+(d*2)+"px #c3c9d2,-"+d+"px -"+d+"px "+(d*2)+"px #ffffff"):(d+"px "+d+"px "+(d*2)+"px #1a1c22,-"+d+"px -"+d+"px "+(d*2)+"px #2d3340"));
  r.setProperty("--tk-nsh-s",L?"5px 5px 11px #c3c9d2,-5px -5px 11px #ffffff":"5px 5px 11px #1a1c22,-5px -5px 11px #2d3340");
  r.setProperty("--tk-nsh-in",L?"inset 4px 4px 9px #c3c9d2,inset -4px -4px 9px #ffffff":"inset 4px 4px 9px #1a1c22,inset -4px -4px 9px #2d3340");
  if(typeof window.tkOnChange==="function"){ try{ window.tkOnChange(); }catch(e){} }
}

function set(k,v){ S[k]=v; persist(); apply(); }
function randomize(){
  S.theme=rnd(THEME_KEYS); S.accent=rnd(ACC_KEYS); S.bg=rnd(BG_KEYS);
  S.glassLv=40+Math.floor(Math.random()*50);
  S.flatRad=rnd(["sharp","round"]); S.matElev=rnd(["low","high"]); S.neuDepth=rnd(["soft","deep"]);
  S.btnShape=rnd(["round","sharp","pill"]); S.dayDone=rnd(["dim","neon","fire","accent"]);
  persist(); apply();
}

/* ---- لوحة التخصيص (HTML) ---- */
function panel(lang){
  var ar=(lang!=="en");
  function T(o,en){return ar?o:en;}
  var h='';
  h+='<div class="tk-grid">';
  h+='<div class="tk-o tk-rand" onclick="TK.randomize();TK.refresh()">🎲 '+T("ثيم عشوائي","Random theme")+'</div>';
  THEME_KEYS.forEach(function(k){ h+='<div class="tk-o'+(S.theme===k?" on":"")+'" onclick="TK.set(\'theme\',\''+k+'\');TK.refresh()">'+THEMES[k].ar+'</div>'; });
  h+='</div>';
  /* اللون الرئيسي */
  h+='<div class="tk-k">🖌️ '+T("اللون الرئيسي (الأزرار والعناصر)","Accent color")+'</div><div class="tk-sw">';
  ACC_KEYS.forEach(function(k){ var a=ACCENTS[k]; h+='<div class="tk-c'+(S.accent===k?" on":"")+'" style="background:linear-gradient(135deg,'+a.main+','+a.deep+')" title="'+a.ar+'" onclick="TK.set(\'accent\',\''+k+'\');TK.refresh()"></div>'; });
  h+='</div>';
  /* الخلفية */
  h+='<div class="tk-k">🌌 '+T("لون الخلفية (الوضع الداكن)","Background (dark mode)")+'</div><div class="tk-sw">';
  BG_KEYS.forEach(function(k){ var g=BGS[k];
    var bg=g.g?g.g:(g.b0?("linear-gradient(135deg,"+g.b0+","+g.b1+")"):"linear-gradient(135deg,#070b14,#0c1424)");
    if(g.img){ var has=!!LS.getItem("uiBgImg");
      h+='<div class="tk-bg'+(S.bg===k?" on":"")+'" style="background:'+(has?'#222 center/cover url('+LS.getItem("uiBgImg")+')':'repeating-linear-gradient(45deg,#1f2937 0 8px,#374151 8px 16px)')+';display:grid;place-items:center;font-size:15px" title="'+g.ar+'" onclick="TK.pickImage()">🖼️</div>';
    } else {
      h+='<div class="tk-bg'+(S.bg===k?" on":"")+'" style="background:'+bg+'" title="'+g.ar+'" onclick="TK.set(\'bg\',\''+k+'\');TK.refresh()"></div>';
    }
  });
  h+='</div>';
  if(S.bg==="img"&&LS.getItem("uiBgImg")) h+='<div style="margin-top:6px"><span class="tk-o" style="display:inline-block;padding:6px 12px" onclick="TK.clearImage()">🗑️ '+T("إزالة الصورة","Remove image")+'</span></div>';
  /* الأزرار */
  h+='<div class="tk-k">🔘 '+T("شكل الأزرار","Button shape")+'</div><div class="tk-seg">'+
     '<div class="tk-o'+(S.btnShape==="round"?" on":"")+'" onclick="TK.set(\'btnShape\',\'round\');TK.refresh()">'+T("دائري","Round")+'</div>'+
     '<div class="tk-o'+(S.btnShape==="sharp"?" on":"")+'" onclick="TK.set(\'btnShape\',\'sharp\');TK.refresh()">'+T("حاد","Sharp")+'</div>'+
     '<div class="tk-o'+(S.btnShape==="pill"?" on":"")+'" onclick="TK.set(\'btnShape\',\'pill\');TK.refresh()">'+T("كبسولة","Pill")+'</div></div>';
  h+='<div class="tk-k">'+T("شفافية الأزرار","Button opacity")+' · <span id="tkBop">'+S.btnOp+'</span>%</div>'+
     '<input type="range" class="tk-range" min="35" max="100" value="'+S.btnOp+'" oninput="TK.set(\'btnOp\',parseInt(this.value,10));var g=document.getElementById(\'tkBop\');if(g)g.textContent=this.value">';
  /* الأيام المنتهية */
  h+='<div class="tk-k">📅 '+T("شكل الأيام المنتهية في الجدول","Finished-day style")+'</div><div class="tk-grid">'+
     [["dim",T("خافت (الحالي)","Dim")],["neon",T("نيون","Neon")],["fire",T("ناري","Fire")],["accent",T("بلون الثيم","Accent")]].map(function(x){return '<div class="tk-o'+(S.dayDone===x[0]?" on":"")+'" onclick="TK.set(\'dayDone\',\''+x[0]+'\');TK.refresh()">'+x[1]+'</div>';}).join("")+'</div>';
  /* ميزات الثيم المختار */
  if(S.theme==="glass"){
    h+='<div class="tk-k">✨ '+T("قوة الشفافية والضبابية","Glass intensity")+' · <span id="tkGlv">'+S.glassLv+'</span>%</div>'+
       '<input type="range" class="tk-range" min="10" max="100" value="'+S.glassLv+'" oninput="TK.set(\'glassLv\',parseInt(this.value,10));var g=document.getElementById(\'tkGlv\');if(g)g.textContent=this.value">';
  } else if(S.theme==="flat"){
    h+='<div class="tk-k">⬜ '+T("الحواف","Corners")+'</div><div class="tk-seg">'+
       '<div class="tk-o'+(S.flatRad==="sharp"?" on":"")+'" onclick="TK.set(\'flatRad\',\'sharp\');TK.refresh()">'+T("حادّة","Sharp")+'</div>'+
       '<div class="tk-o'+(S.flatRad==="round"?" on":"")+'" onclick="TK.set(\'flatRad\',\'round\');TK.refresh()">'+T("دائرية","Round")+'</div></div>';
  } else if(S.theme==="material"){
    h+='<div class="tk-k">🧱 '+T("قوة الظلال (Elevation)","Elevation")+'</div><div class="tk-seg">'+
       '<div class="tk-o'+(S.matElev==="low"?" on":"")+'" onclick="TK.set(\'matElev\',\'low\');TK.refresh()">'+T("خفيفة","Low")+'</div>'+
       '<div class="tk-o'+(S.matElev==="high"?" on":"")+'" onclick="TK.set(\'matElev\',\'high\');TK.refresh()">'+T("قوية","High")+'</div></div>';
  } else if(S.theme==="neu"){
    h+='<div class="tk-k">🫧 '+T("عمق النقش","Depth")+'</div><div class="tk-seg">'+
       '<div class="tk-o'+(S.neuDepth==="soft"?" on":"")+'" onclick="TK.set(\'neuDepth\',\'soft\');TK.refresh()">'+T("ناعم","Soft")+'</div>'+
       '<div class="tk-o'+(S.neuDepth==="deep"?" on":"")+'" onclick="TK.set(\'neuDepth\',\'deep\');TK.refresh()">'+T("عميق","Deep")+'</div></div>';
  }
  return h;
}

/* إعادة التطبيق عند تبديل داكن/فاتح */
try{
  new MutationObserver(function(){ apply(); }).observe(document.body,{attributes:true,attributeFilter:["class"]});
}catch(e){}

function pickImage(){
  var inp=document.getElementById("tkImgInp");
  if(!inp){ inp=document.createElement("input"); inp.type="file"; inp.accept="image/*"; inp.id="tkImgInp"; inp.style.display="none";
    inp.addEventListener("change",function(){
      var f=this.files&&this.files[0]; if(!f)return;
      if(f.size>2500000){ alert("الصورة كبيرة — يُرجى اختيار صورة أقل من 2.5MB"); this.value=""; return; }
      var rd=new FileReader();
      rd.onload=function(){ try{ LS.setItem("uiBgImg",rd.result); }catch(e){ alert("تعذّر حفظ الصورة (المساحة ممتلئة)"); return; } S.bg="img"; persist(); apply(); if(window.TK)TK.refresh(); };
      rd.readAsDataURL(f); this.value="";
    });
    document.body.appendChild(inp);
  }
  inp.click();
}
function clearImage(){ LS.removeItem("uiBgImg"); if(S.bg==="img"){S.bg="def";persist();} apply(); if(window.TK)TK.refresh(); }
window.TK={apply:apply,set:set,randomize:randomize,panel:panel,state:S,pickImage:pickImage,clearImage:clearImage,
  refresh:function(){ if(typeof window.tkRefreshPanel==="function"){ try{ window.tkRefreshPanel(); }catch(e){} } }};
apply();
})();
