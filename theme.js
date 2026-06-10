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
  coal:    {ar:"أسود فحمي", b0:"#000000", b1:"#0d0d0f"}
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
  neuDepth:LS.getItem("neuDepth")||"soft"   // soft | deep
};
/* مستخدم جديد ⇒ ثيم عشوائي افتراضياً */
if(!S.theme||!THEMES[S.theme]){
  S.theme=rnd(THEME_KEYS); S.accent=rnd(ACC_KEYS); S.bg=rnd(BG_KEYS);
  S.glassLv=40+Math.floor(Math.random()*50);
  S.flatRad=rnd(["sharp","round"]); S.matElev=rnd(["low","high"]); S.neuDepth=rnd(["soft","deep"]);
  persist();
}
if(!S.accent||!ACCENTS[S.accent]) S.accent="mint";
if(!S.bg||!BGS[S.bg]) S.bg="def";
if(isNaN(S.glassLv)) S.glassLv=60;

function persist(){
  LS.setItem("uiTheme",S.theme); LS.setItem("uiAccent",S.accent); LS.setItem("uiBg",S.bg);
  LS.setItem("glassLv",String(S.glassLv)); LS.setItem("flatRad",S.flatRad);
  LS.setItem("matElev",S.matElev); LS.setItem("neuDepth",S.neuDepth);
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
  b.setAttribute("data-theme",S.theme); b.setAttribute("data-tkpage",PAGE);
  /* اللون الرئيسي — يغطي كل تسميات الصفحات */
  var A=ACCENTS[S.accent];
  var main=L?A.lmain:A.main, deep=L?A.ldeep:A.deep;
  r.setProperty("--mint",main); r.setProperty("--mint-deep",deep); r.setProperty("--mintd",deep);
  /* الخلفية (الوضع الداكن فقط) */
  var G=BGS[S.bg];
  if(!L && G.b0){ r.setProperty("--bg-0",G.b0); r.setProperty("--bg-1",G.b1); r.setProperty("--bg",G.b0); r.setProperty("--bg2",G.b1); r.setProperty("--tk-surface",G.b1); }
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
  BG_KEYS.forEach(function(k){ var g=BGS[k]; var bg=g.b0?("linear-gradient(135deg,"+g.b0+","+g.b1+")"):"linear-gradient(135deg,#070b14,#0c1424)"; h+='<div class="tk-bg'+(S.bg===k?" on":"")+'" style="background:'+bg+'" title="'+g.ar+'" onclick="TK.set(\'bg\',\''+k+'\');TK.refresh()"></div>'; });
  h+='</div>';
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

window.TK={apply:apply,set:set,randomize:randomize,panel:panel,state:S,
  refresh:function(){ if(typeof window.tkRefreshPanel==="function"){ try{ window.tkRefreshPanel(); }catch(e){} } }};
apply();
})();
