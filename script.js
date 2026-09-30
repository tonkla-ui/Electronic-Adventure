const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),R=n=>Math.floor(Math.random()*n),P=a=>a[R(a.length)],sh=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const f=x=>+(+x).toFixed(2),fr=v=>v>=1e6?f(v/1e6)+" MΩ":v>=1e3?f(v/1e3)+" kΩ":f(v)+" Ω",mA=x=>f(x)+" mA";
const CL=[["ดำ","#000"],["น้ำตาล","#7c4a1e"],["แดง","#dc2626"],["ส้ม","#f97316"],["เหลือง","#facc15"],["เขียว","#22c55e"],["น้ำเงิน","#3b82f6"],["ม่วง","#a855f7"],["เทา","#9ca3af"],["ขาว","#f8fafc"]],TOL=[["ทอง","#d4af37","±5%"],["เงิน","#c0c0c0","±10%"]];
const bd=(a,b,m,t)=>[CL[a],CL[b],CL[m],TOL[t]].map(x=>`<span class=k2><i class=k style="background:${x[1]}"></i>${x[0]}</span>`).join("");
const mk=(q,c,ce,w)=>{const s=new Set([c]),o=[{t:c,ok:1,e:ce}];for(const[x,e]of w)if(!s.has(x)&&o.length<4){s.add(x);o.push({t:x,e})}return{q,o:sh(o)}};
const G=a=>()=>P(a)();
let S={xp:0,d:{}};try{S=JSON.parse(localStorage.getItem("mbq"))||S}catch(e){}
const save=()=>{try{localStorage.setItem("mbq",JSON.stringify(S))}catch(e){}};
const ST=["pre","les","lab","fin","boss"],SL={pre:"📝 แบบทดสอบก่อนเรียน",les:"📖 บทเรียน",lab:"🧪 ห้องทดลอง",fin:"🏆 แบบทดสอบ Final หลังเรียน",boss:"👹 ต่อสู้กับบอส"},RC=["#a7752c","#16a34a","#dc2626","#2563eb","#9333ea"];

const RM=[
{n:"การอ่านตัวต้านทาน",ic:"🎨",bs:"Resist-Ogre 👹",
l:`<b>หลักการ</b><p>ตัวต้านทาน 4 แถบ: แถบ 1–2 = เลขสองหลัก, แถบ 3 = ตัวคูณ 10ⁿ, แถบ 4 = ค่าผิดพลาด</p><div class="rescard lv">${CL.map((z,idx)=>`<span class=k2><i class=k style="background:${z[1]}"></i>${idx}</span>`).join("")}${TOL.map(z=>`<span class=k2><i class=k style="background:${z[1]}"></i>${z[2]}</span>`).join("")}</div><b>สูตร</b><p>ค่า = (แถบ1 แถบ2) × 10^(แถบ3) Ω ± ค่าผิดพลาด</p><b>ตัวอย่าง</b><p>เหลือง-ม่วง-แดง-ทอง = 47×10² = 4.7 kΩ ±5% (1 kΩ = 1,000 Ω)</p>`,
lab:{t:"ตัวอ่านค่าตัวต้านทาน 4 แถบ",f:[["a","แถบ 1 (1–9)",1,9,1,4],["b","แถบ 2 (0–9)",0,9,1,7],["m","ตัวคูณ 10ⁿ (n = 0–6)",0,6,1,2],["t","ค่าผิดพลาด (0 = ทอง, 1 = เงิน)",0,1,1,0]],c:v=>`<div class=rescard>${bd(v.a,v.b,v.m,v.t)}</div><h3>= ${fr((v.a*10+v.b)*10**v.m)} ${TOL[v.t][2]}</h3><div class=mu>(${v.a}${v.b}) × 10^${v.m}</div>`},
g:G([()=>{const a=1+R(9),b=R(10),m=R(7),t=R(2),v=(a*10+b)*10**m,T=TOL[t][2],s=x=>fr(x)+" "+T,m2=m>0?m-1:m+2;
return mk(`<b>อ่านค่าความต้านทานจากแถบสี</b><div class=rescard>${bd(a,b,m,t)}</div>`,s(v),`ถูก: ${CL[a][0]}=${a}, ${CL[b][0]}=${b}, ตัวคูณ ${CL[m][0]}=10^${m} → ${a}${b}×10^${m} = ${fr(v)} และ ${TOL[t][0]} = ${T}`,
[[`${fr(v)} ${TOL[1-t][2]}`,`ผิด: ค่าตัวเลขถูก แต่แถบ ${TOL[t][0]} คือ ${T} ไม่ใช่ ${TOL[1-t][2]}`],[s(v*10),`ผิด: ${CL[m][0]} คือ 10^${m} ไม่ใช่ 10^${m+1} (อ่านตัวคูณเกิน 1 ขั้น)`],[s((a*10+b)*10**m2),`ผิด: อ่านตัวคูณคลาดเป็น 10^${m2} ทั้งที่แถบที่ 3 คือ ${CL[m][0]}`],[s((b*10+a)*10**m),`ผิด: สลับหลักตัวเลข ต้องอ่านแถบซ้ายสุดก่อน (${a} แล้วตามด้วย ${b})`],[`${a}${b}${m} Ω ${T}`,`ผิด: เอาเลขตัวคูณไปต่อเป็นหลักที่ 3 แต่ต้องคูณด้วย 10 ยกกำลัง ${m}`]])},
()=>{const a=1+R(9),b=R(10),m=R(7),t=R(2),v=(a*10+b)*10**m,m2=m<6?m+1:m-1;
return mk(`ตัวต้านทาน <b>${fr(v)} ${TOL[t][2]}</b> ตรงกับแถบสีชุดใด? (แถบ 1 → 4)`,`<div class=rescard>${bd(a,b,m,t)}</div>`,`ถูก: ${fr(v)} = ${a}${b}×10^${m} → ${CL[a][0]}, ${CL[b][0]}, ${CL[m][0]} (10^${m}), ${TOL[t][0]} (${TOL[t][2]})`,
[[`<div class=rescard>${bd(a,b,m2,t)}</div>`,`ผิด: ตัวคูณ ${CL[m2][0]} = 10^${m2} จะได้ ${fr((a*10+b)*10**m2)} ไม่ตรงโจทย์`],[`<div class=rescard>${bd(b,a,m,t)}</div>`,`ผิด: สลับแถบ 1 กับ 2 จะได้ ${fr((b*10+a)*10**m)}`],[`<div class=rescard>${bd(a,b,m,1-t)}</div>`,`ผิด: แถบที่ 4 เป็น ${TOL[1-t][0]} = ${TOL[1-t][2]} แต่โจทย์ให้ ${TOL[t][2]}`],[`<div class=rescard>${bd(a,b,(m+3)%7,t)}</div>`,`ผิด: ตัวคูณ ${CL[(m+3)%7][0]} = 10^${(m+3)%7} ทำให้ค่าเปลี่ยนเป็น ${fr((a*10+b)*10**((m+3)%7))}`]])}])},
{n:"สารกึ่งตัวนำ",ic:"🔬",bs:"Silicon Slime 🟢",
l:`<b>หลักการ</b><p>ซิลิคอน/เจอร์เมเนียมมีเวเลนซ์อิเล็กตรอน 4 ตัว สารบริสุทธิ์นำไฟฟ้าได้น้อย ร้อนขึ้น → พาหะเพิ่ม → R ลดลง (ต่างจากตัวนำ)</p><div class="rs lv">บริสุทธิ์(4): ⚪⚪⚪⚪ &nbsp;ชนิด N(5): ⚪⚪⚪⚪🔵 &nbsp;ชนิด P(3): ⚪⚪⚪⭕</div><b>สูตร/กฎ</b><p><b>ชนิด N</b>: เจือเวเลนซ์ 5 (P,As,Sb) → พาหะหลัก=อิเล็กตรอน</p><p><b>ชนิด P</b>: เจือเวเลนซ์ 3 (B,Al,Ga,In) → พาหะหลัก=โฮล</p><b>ตัวอย่าง</b><p>เจือฟอสฟอรัส (เวเลนซ์5) ลงในซิลิคอน → เหลืออิเล็กตรอนอิสระ 1 ตัว/อะตอม → ได้สารชนิด N</p>`,
lab:{t:"เจือสารให้สารกึ่งตัวนำ",f:[["z","เวเลนซ์อิเล็กตรอนของสารเจือ (3–5)",3,5,1,5],["n","ปริมาณสารเจือ",1,12,1,6]],c:v=>{const N=v.z==5,H=v.z==3;return`<h3>${N?"ชนิด N":H?"ชนิด P":"สารบริสุทธิ์ (Intrinsic)"}</h3><div class=dots>${v.z==4?"—":(N?"🔵":"⚪").repeat(v.n)}</div><div class=mu>${N?"เหลืออิเล็กตรอนอิสระ (🔵) เป็นพาหะข้างมาก":H?"เกิดโฮล (⚪) เป็นพาหะข้างมาก":"เวเลนซ์ 4 ตัวพอดี ไม่มีพาหะเพิ่ม"}</div>`}},
g:G([()=>{const D=P([["โบรอน (B)",3],["อะลูมิเนียม (Al)",3],["แกลเลียม (Ga)",3],["อินเดียม (In)",3],["ฟอสฟอรัส (P)",5],["สารหนู (As)",5],["แอนติโมนี (Sb)",5]]),base=P(["ซิลิคอน (Si)","เจอร์เมเนียม (Ge)"]),n=D[1]==5,T=x=>x?"N":"P",C=x=>x?"อิเล็กตรอนอิสระ":"โฮล",o=(t,c)=>`ชนิด ${T(t)} — พาหะข้างมาก: ${C(c)}`;
return mk(`เจือ <b>${D[0]}</b> (เวเลนซ์อิเล็กตรอน ${D[1]} ตัว) ลงใน${base} (4 ตัว) จะได้สารกึ่งตัวนำชนิดใด และพาหะข้างมากคืออะไร?`,o(n,n),`ถูก: สารเจือมี ${D[1]} ตัว ${n?"มากกว่า 4 → เหลืออิเล็กตรอนอิสระ 1 ตัวต่ออะตอม → ชนิด N (Negative)":"น้อยกว่า 4 → ขาดอิเล็กตรอน 1 ตัว เกิดโฮล → ชนิด P (Positive)"}`,
[[o(!n,!n),`ผิด: ชนิดสลับกัน สารเจือเวเลนซ์ ${D[1]} ให้ชนิด ${T(n)} ไม่ใช่ ${T(!n)}`],[o(n,!n),`ผิด: ชนิด ${T(n)} ถูก แต่พาหะข้างมากคือ${C(n)} (${n?"โฮล":"อิเล็กตรอน"}เป็นพาหะข้างน้อย)`],[o(!n,n),`ผิด: ชนิดและพาหะไม่สอดคล้องกัน ชนิด ${T(!n)} ต้องมีพาหะข้างมากเป็น${C(!n)}`]])},
()=>{const M=P([["ทองแดง",1],["อะลูมิเนียม",1],["ซิลิคอน",0],["เจอร์เมเนียม",0]]),c=M[1],A=["เพิ่มขึ้น","ลดลง","คงที่","กลายเป็นศูนย์"],k=c?0:1;
const E=[c?"ถูก: ตัวนำ อะตอมสั่นแรงขึ้น อิเล็กตรอนชนอะตอมบ่อยขึ้น ความต้านทานจึงเพิ่ม":"ผิด: นั่นคือพฤติกรรมของตัวนำ สารกึ่งตัวนำมีพาหะเพิ่มเมื่อร้อน",c?"ผิด: นั่นคือพฤติกรรมของสารกึ่งตัวนำ ตัวนำมี R เพิ่มเมื่อร้อน":"ถูก: สารกึ่งตัวนำ ความร้อนทำให้เกิดคู่อิเล็กตรอน-โฮลมากขึ้น พาหะเพิ่ม ความต้านทานจึงลด","ผิด: ความต้านทานของวัสดุเปลี่ยนตามอุณหภูมิ ไม่คงที่","ผิด: R = 0 เกิดเฉพาะสภาพนำยิ่งยวดที่อุณหภูมิต่ำมาก"];
return mk(`เมื่ออุณหภูมิสูงขึ้น ค่าความต้านทานของ<b>${M[0]}</b>จะเป็นอย่างไร?`,A[k],E[k],A.map((x,j)=>[x,E[j]]).filter((_,j)=>j!=k))}])},
{n:"ไดโอด",ic:"🔺",bs:"Diode Dragon 🐉",
l:`<b>หลักการ</b><p>ไดโอดนำกระแสทางเดียว: <b>ไบแอสตรง</b>=แอโนด(+)สูงกว่าแคโทด(−)เกิน Vf, <b>ไบแอสกลับ</b>=ไม่นำกระแส</p><div class="rs lv">ตรง: 🔋→[▷|]→⚡นำกระแส &nbsp;|&nbsp; กลับ: 🔋→[|◁]→⛔ไม่นำ</div><b>สูตร</b><p>Vf: Si≈0.7V, Ge≈0.3V, LED แดง≈2V &nbsp;|&nbsp; I = (Vs − Vf) / R</p><b>ตัวอย่าง</b><p>Si diode, Vs=9V, R=470Ω → I=(9−0.7)/470≈17.7 mA</p>`,
lab:{t:"วงจรไดโอดอนุกรมตัวต้านทาน",f:[["s","แรงดันแหล่งจ่าย Vs (V)",-10,12,.5,5],["r","R (Ω)",100,2000,100,470],["d","Vf ของไดโอด (V) 0.3=Ge, 0.7=Si",.3,2,.1,.7]],c:v=>{const I=v.s>=v.d?(v.s-v.d)/v.r*1000:0;return`<h3>${v.s<0?"ไบแอสกลับ — ไม่นำกระแส":v.s>=v.d?"ไบแอสตรง — นำกระแส":"Vs ยังต่ำกว่า Vf — ยังไม่นำกระแส"}</h3><div class=bar><i style="width:${Math.min(100,I*4)}%"></i></div><p>I = ${mA(I)}${I?` = (${v.s} − ${f(v.d)}) / ${v.r}`:""}</p>`}},
g:G([()=>{const Vs=P([3,5,6,9,12]),Rr=P([100,220,330,470,680,1000,2200]),d=P([["ซิลิคอน",.7],["เจอร์เมเนียม",.3],["LED สีแดง",2]]),Vf=d[1],ov=Vf==.7?.3:.7,I=(Vs-Vf)/Rr*1000;
return mk(`ไดโอด${d[0]} (Vf = ${Vf} V) ไบแอสตรงอนุกรมกับ R = ${Rr} Ω แหล่งจ่าย ${Vs} V กระแสในวงจรเท่าใด?`,mA(I),`ถูก: I = (Vs−Vf)/R = (${Vs}−${Vf})/${Rr} = ${f(Vs-Vf)}/${Rr} A = ${mA(I)}`,
[[mA(Vs/Rr*1000),"ผิด: ลืมหักแรงดันตกคร่อมไดโอด Vf"],[mA((Vs-ov)/Rr*1000),`ผิด: ใช้ Vf ผิดชนิด (${ov} V) ทั้งที่โจทย์ให้ ${Vf} V`],[mA((Vs+Vf)/Rr*1000),"ผิด: Vf ต้องลบออกจากแหล่งจ่าย ไม่ใช่บวก"],[mA((Vs-Vf)/Rr),"ผิด: ลืมแปลงหน่วยจาก A เป็น mA (คูณ 1000)"]])},
()=>{const Vs=P([5,9,12,15]),Rr=P([220,470,1000,2200]);
return mk(`ไดโอดซิลิคอนอนุกรมกับ R = ${Rr} Ω แต่ต่อ<b>ไบแอสกลับ</b> (แอโนดต่อขั้วลบ) แหล่งจ่าย ${Vs} V กระแสประมาณเท่าใด?`,"≈ 0 mA","ถูก: ไบแอสกลับ ไดโอดเหมือนสวิตช์เปิดวงจร มีเพียงกระแสรั่วไหลระดับ nA–µA ซึ่งน้อยมาก",[[mA(Vs/Rr*1000),"ผิด: คำนวณเหมือนไม่มีไดโอด แต่ไดโอดกั้นกระแสไว้"],[mA((Vs-.7)/Rr*1000),"ผิด: 0.7 V เป็นแรงดันของไบแอสตรง ใช้ไม่ได้เมื่อไบแอสกลับ"],["−"+mA(Vs/Rr*1000),"ผิด: ไบแอสกลับไม่มีกระแสไหลเท่าค่าโอห์ม เพราะไดโอดกั้นไว้"]])},
()=>{const K=P([0,1,2]),d=P([.4,.5,.6,1,2,3,5,-1,-2,-4]),c=d>=.7?0:d>0?1:2,t=["ไบแอสตรงและนำกระแส","ไบแอสตรง แต่ยังไม่นำกระแส","ไบแอสกลับ ไม่นำกระแส","ไบแอสกลับ แต่มีกระแสไหลมาก"],
cx=[`ถูก: VA−VK = ${f(d)} V ≥ 0.7 V ไดโอดซิลิคอนเริ่มนำกระแส`,`ถูก: VA−VK = ${f(d)} V เป็นบวก (ไบแอสตรง) แต่ยังไม่ถึง 0.7 V จึงยังไม่นำกระแส`,`ถูก: VA−VK = ${f(d)} V ≤ 0 แอโนดไม่สูงกว่าแคโทด จึงไบแอสกลับ ไม่นำกระแส`],
wx=[d>0?`ผิด: ${f(d)} V ยังต่ำกว่า 0.7 V ไดโอดจึงยังไม่นำกระแส`:"ผิด: VA<VK เป็นไบแอสกลับ ไม่นำกระแส",d>=.7?`ผิด: ${f(d)} V ถึง 0.7 V แล้ว ไดโอดนำกระแสแล้ว`:"ผิด: VA≤VK ไม่ใช่ไบแอสตรง",`ผิด: VA−VK = ${f(d)} V เป็นบวก จึงเป็นไบแอสตรง ไม่ใช่ไบแอสกลับ`,d>0?"ผิด: VA−VK เป็นบวก จึงไม่ใช่ไบแอสกลับ":"ผิด: ไบแอสกลับมีเพียงกระแสรั่วไหลน้อยมาก ไม่ใช่กระแสมาก"];
return mk(`ไดโอดซิลิคอน แอโนดมีศักย์ ${f(K+d)} V และแคโทด ${K} V ไดโอดอยู่ในสภาวะใด?`,t[c],cx[c],t.map((x,j)=>[x,wx[j]]).filter((_,j)=>j!=c))}])},
{n:"ทรานซิสเตอร์",ic:"⚡",bs:"Transistor Titan 🤖",
l:`<b>หลักการ</b><p>BJT มี 3 ขา B,C,E · <b>คัตออฟ</b>:VBE&lt;0.7V หยุดนำ · <b>แอคทีฟ</b>:VBE=0.7V,VCE&gt;0.2V ขยายสัญญาณ · <b>แซทเทอเรชัน</b>:VCE≈0.2V สวิตช์ปิด</p><div class="rs lv">🔴คัตออฟ → 🟡แอคทีฟ(ขยาย) → 🟢แซทเทอเรชัน(เต็มพิกัด)</div><b>สูตร</b><p>IE=IC+IB &nbsp;|&nbsp; IC=β·IB &nbsp;|&nbsp; VCE=Vcc−IC·Rc</p><b>ตัวอย่าง</b><p>β=100, IB=40µA → IC=100×40µA=4mA</p>`,
lab:{t:"ทรานซิสเตอร์ NPN (ต่อ CE)",f:[["i","IB (µA)",0,200,10,40],["b","β",20,300,10,100],["c","Vcc (V)",5,20,1,12],["r","Rc (Ω)",100,5000,100,1000]],c:v=>{let I=v.b*v.i/1000,V=v.c-I*v.r/1000,g="แอคทีฟ (ขยายสัญญาณ)";if(!v.i){I=0;V=v.c;g="คัตออฟ (สวิตช์เปิด)"}else if(V<=.2){V=.2;I=(v.c-.2)/v.r*1000;g="แซทเทอเรชัน (สวิตช์ปิด)"}return`<h3>${g}</h3><p>IC = ${mA(I)}<br>VCE = ${f(V)} V</p><div class=mu>IC = β·IB = ${v.b}×${v.i} µA · VCE = Vcc − IC·Rc</div>`}},
g:G([()=>{const Ib=P([10,20,25,40,50,60,80,100]),b=P([50,80,100,120,150,200]),I=b*Ib/1000;
return mk(`ทรานซิสเตอร์ NPN ทำงานช่วงแอคทีฟ มี β = ${b} และ IB = ${Ib} µA ค่า IC เท่าใด?`,mA(I),`ถูก: IC = β·IB = ${b}×${Ib} µA = ${b*Ib} µA = ${mA(I)}`,[[mA((b+1)*Ib/1000),"ผิด: นี่คือ IE = IC+IB = (β+1)·IB ไม่ใช่ IC"],[mA(b*Ib),"ผิด: ลืมแปลง µA เป็น mA (หาร 1000)"],[mA(Ib/b),"ผิด: กลับสูตร IC = β·IB เป็น IB/β"],[mA(b*Ib/1e4),"ผิด: แปลงหน่วยเกิน (หาร 10⁴ แทน 10³)"]])},
()=>{const Ic=P([1,2,3,5,10]),Ib=P([20,50,100,200]),I=Ic+Ib/1000;
return mk(`ทรานซิสเตอร์ตัวหนึ่งมี IC = ${Ic} mA และ IB = ${Ib} µA ค่า IE เท่าใด?`,mA(I),`ถูก: IE = IC + IB = ${Ic} mA + ${Ib/1000} mA = ${mA(I)}`,[[mA(Ic-Ib/1000),"ผิด: กระแสเบสไหลเข้าเช่นเดียวกับ IC ต้องบวกกัน ไม่ใช่ลบ"],[mA(Ic+Ib),"ผิด: บวกโดยไม่แปลง µA เป็น mA"],[mA(Ib/1000),"ผิด: นั่นคือ IB ไม่ใช่ IE"]])},
()=>{const k=R(3),Vb=[P([0,.2,.3]),.7,.7][k],Vc=[P([5,9,12]),P([2,3,4,6,8]),P([.1,.2,.3])][k],t=["คัตออฟ (Cutoff)","แอคทีฟ (Active)","แซทเทอเรชัน (Saturation)","เบรกดาวน์ (Breakdown)"],
cx=[`ถูก: VBE = ${Vb} V ต่ำกว่า 0.7 V รอยต่อ B-E ยังไม่นำ IB≈0 และ IC≈0 ทรานซิสเตอร์เหมือนสวิตช์เปิด`,`ถูก: VBE = 0.7 V (B-E ไบแอสตรง) และ VCE = ${Vc} V สูงกว่า 0.2 V (B-C ไบแอสกลับ) จึงได้ IC = β·IB ใช้ขยายสัญญาณ`,`ถูก: VBE = 0.7 V แต่ VCE = ${Vc} V ต่ำมาก (≈0.2 V) B-E และ B-C ไบแอสตรงทั้งคู่ IC สูงสุด เหมือนสวิตช์ปิด`],
wx=["ผิด: VBE = 0.7 V มี IB ไหลแล้ว จึงไม่ใช่คัตออฟ",k==0?"ผิด: VBE ต่ำกว่า 0.7 V ยังไม่มี IB จึงไม่อยู่ในช่วงแอคทีฟ":"ผิด: VCE ≈ 0.2 V ต่ำมาก แสดงว่าอิ่มตัวแล้ว ไม่ใช่แอคทีฟ",k==0?"ผิด: ยังไม่มี IB ไหล จึงอิ่มตัวไม่ได้":`ผิด: VCE = ${Vc} V ยังสูงกว่า 0.2 V จึงยังไม่อิ่มตัว`,"ผิด: เบรกดาวน์เกิดเมื่อแรงดันย้อนกลับเกินพิกัด ซึ่งโจทย์ไม่ได้ระบุ"];
return mk(`ทรานซิสเตอร์ NPN มี VBE = ${Vb} V และ VCE = ${Vc} V ทำงานอยู่ในช่วงใด?`,t[k],cx[k],t.map((x,j)=>[x,wx[j]]).filter((_,j)=>j!=k))}])},
{n:"วิเคราะห์วงจร",ic:"🧩",bs:"Circuit Kraken 🐙",
l:`<b>หลักการ</b><p><b>อนุกรม</b>: กระแสเท่ากันทุกจุด แรงดันแบ่งตามค่า R &nbsp;|&nbsp; <b>ขนาน</b>: แรงดันเท่ากันทุกสาขา กระแสแยกไหล</p><div class="rs lv">อนุกรม: ➡️R1➡️R2➡️ (I เท่ากัน) &nbsp;|&nbsp; ขนาน: ┳R1┳(V เท่ากัน)┻R2┻</div><b>สูตร</b><p>V=IR, P=I²R=VI &nbsp;|&nbsp; อนุกรม Req=R1+R2 &nbsp;|&nbsp; ขนาน Req=R1·R2/(R1+R2)</p><b>ตัวอย่าง</b><p>R1=300Ω,R2=600Ω อนุกรม Vs=12V → V2=12×600/900=8V</p>`,
lab:{t:"วงจรอนุกรม / ขนาน",f:[["m","0 = อนุกรม, 1 = ขนาน",0,1,1,0],["s","Vs (V)",3,24,1,12],["a","R1 (Ω)",100,1000,100,300],["b","R2 (Ω)",100,1000,100,600]],c:v=>{const q=v.m,Re=q?v.a*v.b/(v.a+v.b):v.a+v.b,I=v.s/Re*1000;return`<h3>${q?"ขนาน":"อนุกรม"}: Req = ${f(Re)} Ω</h3><p>I รวม = ${mA(I)}<br>${q?`I1 = ${mA(v.s/v.a*1000)} · I2 = ${mA(v.s/v.b*1000)} (แรงดันเท่ากัน ${v.s} V)`:`V1 = ${f(I*v.a/1000)} V · V2 = ${f(I*v.b/1000)} V (กระแสเท่ากัน)`}</p>`}},
g:G([()=>{const Vs=P([6,9,12,15,24]),r=[100,200,300,400,500,600,1000,2000],R1=P(r),R2=P(r.filter(x=>x!=R1)),V2=Vs*R2/(R1+R2),V=x=>f(x)+" V";
return mk(`วงจรอนุกรม แหล่งจ่าย ${Vs} V, R1 = ${R1} Ω, R2 = ${R2} Ω แรงดันตกคร่อม R2 เท่าใด?`,V(V2),`ถูก: I = Vs/(R1+R2) = ${Vs}/${R1+R2} A แล้ว V2 = I·R2 = ${Vs}×${R2}/${R1+R2} = ${V(V2)}`,[[V(Vs*R1/(R1+R2)),"ผิด: นี่คือแรงดันคร่อม R1 (สลับตัวต้านทาน)"],[V(Vs/2),"ผิด: แบ่งครึ่งได้เฉพาะเมื่อ R1 = R2"],[V(Vs),"ผิด: Vs คือแรงดันรวม ไม่ใช่เฉพาะ R2"],[V(Vs*R2/R1),"ผิด: ต้องหารด้วย R1+R2 ไม่ใช่ R1"]])},
()=>{const r=[100,200,300,600,1200,2400],R1=P(r),R2=P(r),Re=R1*R2/(R1+R2),O=x=>f(x)+" Ω";
return mk(`ตัวต้านทาน ${R1} Ω และ ${R2} Ω ต่อขนานกัน ความต้านทานรวมเท่าใด?`,O(Re),`ถูก: Req = R1·R2/(R1+R2) = ${R1}×${R2}/${R1+R2} = ${O(Re)} (น้อยกว่าตัวที่เล็กสุดเสมอ)`,[[O(R1+R2),"ผิด: นั่นคือสูตรอนุกรม R1+R2"],[O((R1+R2)/2),"ผิด: ค่าเฉลี่ยไม่ใช่ความต้านทานรวมของวงจรขนาน"],[O(Math.min(R1,R2)),"ผิด: ค่ารวมขนานต้องน้อยกว่า R ตัวที่เล็กที่สุด ไม่เท่ากัน"],[O(R1*R2),"ผิด: ลืมหารด้วย R1+R2"]])},
()=>{const I=P([10,20,50,100]),Rr=P([100,220,470,1000]),W=x=>f(x)+" mW";
return mk(`ตัวต้านทาน ${Rr} Ω มีกระแส ${I} mA ไหลผ่าน กำลังไฟฟ้าที่สูญเสียเป็นความร้อนเท่าใด?`,W(I*I*Rr/1000),`ถูก: P = I²R = (${I/1000} A)² × ${Rr} Ω = ${f(I*I*Rr/1e6)} W = ${W(I*I*Rr/1000)}`,[[W(I*I*Rr),"ผิด: ลืมแปลง mA เป็น A ก่อนยกกำลังสอง"],[W(I*Rr/1000),"ผิด: I·R คือแรงดัน (V) ไม่ใช่กำลัง"],[W(I*I*Rr/1e6),"ผิด: แปลงหน่วยเกินไป 1000 เท่า"]])}])}
];

let TI=0,AC;const esc=s=>String(s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const sfx=t=>{if(S.m)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const N={click:[[660,.05]],ok:[[523,.09],[659,.09],[784,.14]],bad:[[220,.14],[165,.24]],tick:[[880,.04]],win:[[523,.1],[659,.1],[784,.1],[1047,.3]],lose:[[330,.15],[262,.15],[196,.35]],lucky:[[784,.08],[988,.08],[1175,.18]],warn:[[440,.12],[349,.12],[262,.3]]}[t];let x=AC.currentTime;for(const[q,d]of N){const o=AC.createOscillator(),g=AC.createGain();o.type=/bad|lose|warn/.test(t)?"sawtooth":"square";o.frequency.value=q;g.gain.setValueAtTime(.05,x);g.gain.exponentialRampToValueAtTime(.0001,x+d);o.connect(g);g.connect(AC.destination);o.start(x);o.stop(x+d);x+=d}}catch(e){}};
document.addEventListener("click",e=>{if(e.target.closest("button:not(.o),.rm"))sfx("click")});
const A=h=>{clearInterval(TI);$("#app").innerHTML=h;scrollTo(0,0)},
hud=()=>`<div class=h><b>🔌 Electronic Adventure</b><span><button class=ib onclick="help()">❓ วิธีเล่น</button> <button class=ib onclick="S.m=S.m?0:1;save();this.textContent=S.m?'🔇':'🔊'">${S.m?"🔇":"🔊"}</button></span></div><div class=xr><b class=nm>👤 ${esc(S.nm||"ผู้เล่น")}</b><div class=bar><i style="width:${S.xp%100}%"></i></div><span>Lv ${(S.xp/100|0)+1} · ${S.xp} XP</span></div>`;
const fx=(i,s,xp)=>{(S.d[i]=S.d[i]||{})[s]=1;S.xp+=xp;save();sfx("ok")};
function home(){const n=RM.filter((r,i)=>(S.d[i]||{}).boss).length;
A(hud()+`<div class=c><b>เอาชนะบอสทุกห้อง เพื่อจ่ายไฟให้เมนบอร์ด</b><div class=mu>ระบบพร้อมใช้งาน ${n}/5 ${"🟢".repeat(n)}${"⚫".repeat(5-n)}</div></div><div class="c fc" onclick="fset()"><div class=ic>🌟</div><b style="font-size:1.25rem">FINAL CHAPTER</b><div>สุ่มโจทย์จากทุกหัวข้อ · เลือกความยาก Easy → Nightmare</div></div><div class=gr2>`+RM.map((r,i)=>{const d=S.d[i]||{},k=ST.filter(s=>d[s]).length;return`<div class="c rm" style="border-color:${RC[i]};background:color-mix(in srgb,${RC[i]} 10%,var(--cd))" onclick="room(${i})"><div class=ic>${r.ic}</div><b>CHIP ${i+1}</b><div>${r.n}</div><div class=mu>${"★".repeat(k)}${"☆".repeat(5-k)}</div></div>`}).join("")+`</div>`)}
function room(i){const r=RM[i],d=S.d[i]||{};
A(hud()+`<button class=b2 onclick="home()">← ห้องทั้งหมด</button><h2>${r.ic} CHIP ${i+1}: ${r.n}</h2>`+ST.map((s,j)=>{const u=j==0||d[ST[j-1]];return`<button class=st ${u?"":"disabled"} onclick="go(${i},'${s}')">${u?(d[s]?"✅":"▶️"):"🔒"} ${SL[s]}</button>`}).join(""))}
function go(i,s){s=="les"?les(i):s=="lab"?labv(i):quiz(i,s)}
function les(i){A(hud()+`<div class=c><h2>📖 ${RM[i].n}</h2>${RM[i].l}</div><button class=b onclick="fx(${i},'les',30);room(${i})">จบบทเรียน +30 XP</button><button class=b2 onclick="room(${i})">← กลับ</button>`)}
function labv(i){const L=RM[i].lab,v={};L.f.forEach(([id,,,,,df])=>v[id]=df);let n=0;
A(hud()+`<div class=c><h2>🧪 ${L.t}</h2>${L.f.map(([id,lb])=>`<button class=st id=r_${id}>${lb}: <b id=x_${id}>${v[id]}</b></button>`).join("")}<div class="rs pulse2" id=out>${L.c(v)}</div></div><button class=b id=sv disabled>บันทึกผลการทดลอง +30 XP (ปรับค่าอย่างน้อย 4 ครั้ง)</button><button class=b2 onclick="room(${i})">← กลับ</button>`);
const draw=()=>{const o=$("#out");o.classList.remove("pulse2");o.innerHTML=L.c(v);void o.offsetWidth;o.classList.add("pulse2")};
L.f.forEach(([id,lb,mn,mx,st])=>$("#r_"+id).onclick=()=>pick(lb,mn,mx,st,v[id],x=>{v[id]=x;$("#x_"+id).textContent=x;draw();if(++n>=4)$("#sv").disabled=false}));
$("#sv").onclick=()=>{fx(i,"lab",30);room(i)}}
function pick(lb,mn,mx,st,val,cb){let v=+val;const cl=x=>Math.min(mx,Math.max(mn,+(+x).toFixed(2)));
const o=document.createElement("div");o.className="ov";
o.innerHTML=`<div class="c md ctr"><h3>${lb}</h3><div class=pkr><button class=ib id=pm>−</button><input id=pv type=number value=${v} min=${mn} max=${mx} step=${st}><button class=ib id=pp>+</button></div><button class=b id=pok>ยืนยัน</button></div>`;
document.body.appendChild(o);
$("#pm").onclick=()=>{v=cl(+$("#pv").value-st);$("#pv").value=v};
$("#pp").onclick=()=>{v=cl(+$("#pv").value+st);$("#pv").value=v};
$("#pok").onclick=()=>{const r=cl(+$("#pv").value);o.remove();cb(r)}}
const modal=(h,cb)=>{const o=document.createElement("div");o.className="ov";o.innerHTML=`<div class="c md">${h}<button class=b>ตกลง</button></div>`;o.querySelector("button").onclick=()=>{o.remove();cb&&cb()};document.body.appendChild(o)};
const burst=(ch,n=36)=>{const d=document.createElement("div");d.className="cfw";d.innerHTML=Array.from({length:n},()=>`<i class=cf style="left:${R(100)}%;animation-delay:${R(10)/10}s;animation-duration:${2+R(20)/10}s">${P(ch)}</i>`).join("");document.body.appendChild(d);setTimeout(()=>d.remove(),4500)};
const confetti=()=>burst(["🎉","✨","⭐","⚡","🔌"]);
const help=()=>modal(`<h2>📖 วิธีเล่น</h2><ol class=hl><li>เลือก CHIP (ห้อง) แล้วเล่นตามลำดับ: 📝 ก่อนเรียน → 📖 บทเรียน → 🧪 ห้องทดลอง (แตะปุ่มค่าเพื่อเลือกค่า) → 🏆 Final → 👹 บอส</li><li>โจทย์สุ่มใหม่ทุกครั้ง ตอบแล้วมีเฉลยละเอียดทั้งข้อถูกและข้อผิด ตอบถูกได้ XP</li><li>สู้บอส: หัวใจ 3 ดวง ตอบผิดเสียหัวใจ 1 ดวง เวลา 45 วิ/ข้อ หมดเวลาเลือกเสียหัวใจ 1 ดวง หรือเพิ่มโจทย์อีก 3 ข้อ (เด้งป็อปอัพ)</li><li>🍀 ทุก 2 ข้อ (โหมดมีหัวใจ) มีโอกาสสุ่มเกิด Lucky Time ตาม % ที่แสดงบนจอ เลือกหัวใจ+1 หรือสุ่ม Event พิเศษ (4 แบบ 25% เท่ากัน) หัวใจทองสะสมสูงสุด 5 ดวง ใช้กันดาเมจก่อนหัวใจแดงเสมอ</li><li>🌟 FINAL CHAPTER: สุ่มโจทย์จากทุกหัวข้อ เลือกความยาก Easy → Abyss (ยากขึ้น เวลาสั้นลง) และพิมพ์จำนวนข้อเองได้</li><li>เอาชนะบอสครบทั้ง 5 CHIP เพื่อจ่ายไฟให้เมนบอร์ด 🔌</li></ol>`);
function splash(){A(`<div class="c ctr"><h2>🔌 Electronic Adventure</h2><p class=mu>ผจญภัยพิชิตความรู้อิเล็กทรอนิกส์</p><button class=b id=pl style="font-size:1.7rem;padding:18px">▶</button></div>`);
$("#pl").onclick=()=>S.nm?home():welcome()}
function welcome(){A(`<div class="c ctr"><h2>👤 ตั้งชื่อผู้เล่น</h2><p class=mu>กรอกชื่อก่อนเริ่มผจญภัย</p><input id=nm type=text maxlength=16 placeholder="ชื่อผู้เล่น" value="${esc(S.nm||"")}"><button class=b id=go1>เริ่มผจญภัย ▶</button></div>`);
$("#nm").onkeydown=e=>{if(e.key=="Enter")$("#go1").click()};
$("#go1").onclick=()=>{const v=$("#nm").value.trim();if(!v){sfx("bad");$("#nm").focus();return}S.nm=v;const f1=!S.h;S.h=1;save();home();if(f1)help()}}
const done=()=>RM.every((r,j)=>(S.d[j]||{}).boss),DF={Easy:{i:"🟢",hp:5,tl:60,x:1,lp:50},Normal:{i:"🟡",hp:3,tl:45,x:1.5,lp:50},Hard:{i:"🟠",hp:2,tl:30,x:2,lp:35},Nightmare:{i:"🔴",hp:1,tl:15,x:3,lp:35},Abyss:{i:"⚫",hp:1,tl:10,x:4,lp:20}};
function play(c){let N=c.N,k=0,sc=0,hp=c.hp||0,gold=0,streak=0,pendingLucky=false,bonusNext=false;const B=!!c.hp,qs=Array.from({length:N},()=>c.g());
const dmg=(n=1)=>{for(let z=0;z<n;z++)gold>0?gold--:hp--};
const addHeart=(n=1)=>{for(let z=0;z<n;z++){if(hp<c.hp)hp++;else if(gold<5)gold++}};
const hpHtml=()=>"❤️".repeat(Math.max(hp,0))+"🖤".repeat(Math.max(c.hp-hp,0))+(gold>0?" +"+"💛".repeat(gold):"");
const popup=(cls,fxfn,ttl,opts)=>{fxfn();const o=document.createElement("div");o.className="ov "+cls;o.innerHTML=`<div class="c md ctr">${ttl}${opts.map((op,ix)=>`<button class=b id=pu${ix}>${op[0]}</button>`).join("")}</div>`;document.body.appendChild(o);opts.forEach((op,ix)=>$("#pu"+ix).onclick=()=>{o.remove();op[1]()})};
const lucky=cb=>popup("lk",()=>{sfx("lucky");burst(["✨","🍀","⭐","💫","🌟"],24)},"<h2>🍀 LUCKY TIME!</h2><p>โชคเข้าข้างคุณ! เลือกรางวัล</p>",[["❤️ เพิ่มหัวใจ 1 ดวง",()=>{addHeart(1);$("#hp").innerHTML=hpHtml();cb()}],["🎲 สุ่ม Event พิเศษ",()=>specialEvent(cb)]]);
const penalty=(a,b)=>popup("pn",()=>sfx("warn"),"<h2>⏰ หมดเวลา!</h2><p>เลือกบทลงโทษ</p>",[["💔 เสียหัวใจ 1 ดวง",a],["➕ เพิ่มโจทย์อีก 3 ข้อ",b]]);
function specialEvent(cb){const ev=R(4);
const EV=[
{t:"❤️ โบนัสหัวใจ",d:"ได้รับหัวใจ 2 ดวง!",fx:()=>{sfx("lucky");burst(["✨","❤️","💛"],16)},run:()=>{addHeart(2);$("#hp").innerHTML=hpHtml();cb()}},
{t:"❓ เสี่ยงดวง",d:"เสียหัวใจ 1 ดวงก่อน แล้วตอบคำถามพิเศษชิงหัวใจคืน!",fx:()=>sfx("tick"),run:()=>{dmg(1);$("#hp").innerHTML=hpHtml();miniQ(cb)}},
{t:"🍀 โชคเพิ่ม",d:"เพิ่มโอกาส Lucky Time ในข้อถัดไปอีก 5%",fx:()=>{sfx("ok");burst(["🍀","✨"],10)},run:()=>{bonusNext=true;cb()}},
{t:"💥 โชคร้าย",d:"เคราะห์ซ้ำ! เสียหัวใจ 1 ดวงทันที",fx:()=>{sfx("warn");document.body.classList.add("fl");setTimeout(()=>document.body.classList.remove("fl"),500)},run:()=>{dmg(1);$("#hp").innerHTML=hpHtml();cb()}}
][ev];
popup("lk",()=>{},`<h2>🎲 Special Event!</h2><p><b>${EV.t}</b><br>${EV.d}</p>`,[["ดำเนินการต่อ",()=>{EV.fx();EV.run()}]])}
function miniQ(cb){const q=c.g();const o=document.createElement("div");o.className="ov";
o.innerHTML=`<div class="c md"><h3>❓ คำถามพิเศษ</h3><div class=q>${q.q}</div>${q.o.map(x=>`<button class=o>${x.t}</button>`).join("")}<div id=mex></div></div>`;
document.body.appendChild(o);
o.querySelectorAll(".o").forEach((b,j)=>b.onclick=()=>{const ok=!!q.o[j].ok;sfx(ok?"ok":"bad");
o.querySelectorAll(".o").forEach((x,y)=>{x.disabled=true;x.classList.add(q.o[y].ok?"ok":y==j?"no":"dim");x.insertAdjacentHTML("beforeend",`<div class=e>${q.o[y].ok?"✔":"✘"} ${q.o[y].e}</div>`)});
if(ok){addHeart(1);$("#hp").innerHTML=hpHtml()}
o.querySelector("#mex").innerHTML=`<div class="fb ${ok?"ok":"no"}">${ok?"🎉 ตอบถูก! ได้หัวใจคืน 1 ดวง":"💔 ตอบผิด หัวใจไม่กลับมา"}</div><button class=b id=mok>ปิด</button>`;
o.querySelector("#mok").onclick=()=>{o.remove();cb()}})}
const end=()=>{const w=c.win(sc,N,hp),xp=Math.round(sc*c.x),a0=done();S.xp+=xp;if(w&&c.mark)c.mark();save();
A(hud()+`<div class="c ctr"><h2>${w?c.wt:"💀 ยังไม่ผ่าน"}</h2><p>คะแนน ${sc}/${N} · ได้ +${xp} XP</p>${c.note(sc,N)}<button class=b id=ag>${w?"เล่นอีกครั้ง":"ลองใหม่"} (สุ่มโจทย์ใหม่)</button><button class=b2 id=bk>← กลับ</button></div>`);
$("#ag").onclick=c.again;$("#bk").onclick=c.back;sfx(w?"win":"lose");if(w)confetti();
if(w&&!a0&&done())setTimeout(()=>{sfx("win");confetti();modal(`<div class=ctr><h2>🎊 ยินดีด้วย ${esc(S.nm)}!</h2><p>คุณเอาชนะบอสครบทั้ง 5 CHIP เมนบอร์ดจ่ายไฟครบแล้ว 🔌<br>ลองท้าทาย 🌟 FINAL CHAPTER ระดับ Nightmare ดูไหม?</p></div>`)},1200)};
const show=()=>{const q=qs[k];let tm=c.tl;
A(hud()+`<div class=c>${B?`<div class=bh id=bh><b>${c.bn}</b>${c.lp?`<span class=mu>🍀${c.lp}%/2ข้อ</span>`:""}<span id=hp>${hpHtml()}</span>${c.tl?`<b id=tm class=tmr>⏱ ${tm}</b>`:""}</div><div class="bar bo"><i style="width:${100*(N-sc)/N}%"></i></div>`:`<div class=mu>${c.t}</div>`}<div class=mu>ข้อ ${k+1}/${N}</div><div class=q>${q.q}</div>${q.o.map(o=>`<button class=o>${o.t}</button>`).join("")}<div id=ex></div></div>`);
const adv=()=>{const last=(B&&hp<1)||k+1>=N;if(last)end();else{k++;show()}};
const rev=(j,m,ok)=>{$$(".o").forEach((x,y)=>{x.disabled=true;x.classList.add(q.o[y].ok?"ok":y==j?"no":"dim");x.insertAdjacentHTML("beforeend",`<div class=e>${q.o[y].ok?"✔":"✘"} ${q.o[y].e}</div>`)});
if(B){$(".bo i").style.width=100*(N-sc)/N+"%";$("#hp").innerHTML=hpHtml()}
$("#ex").innerHTML=`<div class="fb ${ok?"ok":"no"}">${m}</div><button class=b id=nx>${pendingLucky?"🍀 รับรางวัล Lucky Time":"ต่อไป"}</button>`;
$("#nx").onclick=()=>{if(pendingLucky){pendingLucky=false;lucky(adv)}else adv()}};
$$(".o").forEach((b,j)=>b.onclick=()=>{clearInterval(TI);const ok=!!q.o[j].ok;if(ok)sc++;else if(B)dmg(1);sfx(ok?"ok":"bad");
if(B){if(ok)$("#bh").classList.add("hit");else{document.body.classList.add("fl");setTimeout(()=>document.body.classList.remove("fl"),500)}streak++;if(bonusNext){bonusNext=false;if(R(100)<5)pendingLucky=true}if(streak%2==0&&c.lp&&R(100)<c.lp)pendingLucky=true}
rev(j,ok?"🎉 ถูกต้อง!"+(B?" ทำดาเมจสำเร็จ":""):B?"💥 ตอบผิด! เสียหัวใจ 1 ดวง":"❌ ยังไม่ถูก ดูเฉลยด้านบน",ok)});
if(B&&c.tl)TI=setInterval(()=>{tm--;const e=$("#tm");e.textContent="⏱ "+tm;if(tm<=10){e.classList.add("tw");sfx("tick")}if(tm<=0){clearInterval(TI);$$(".o").forEach(x=>x.disabled=true);
penalty(()=>{dmg(1);rev(-1,"💔 เสียหัวใจ 1 ดวง",0)},()=>{N+=3;for(let z=0;z<3;z++)qs.push(c.g());rev(-1,"➕ เพิ่มโจทย์อีก 3 ข้อ (บอสฟื้นพลัง!)",0)})}},1000)};
show()}
function quiz(i,m){const B=m=="boss",r=RM[i];
play({t:SL[m],N:{pre:5,fin:8,boss:10}[m],hp:B?3:0,tl:B?45:0,lp:B?50:0,g:r.g,x:B?20:10,bn:"👹 "+r.bs,win:(s,n,h)=>B?h>0:m=="fin"?s/n>=.6:1,wt:B?"🏆 ชนะบอส!":"✅ ผ่านแล้ว",
note:()=>m=="fin"?"<p class=mu>ต้องได้ตั้งแต่ 60% ขึ้นไป จึงจะผ่านและปลดล็อกบอส</p>":"",mark:()=>{(S.d[i]=S.d[i]||{})[m]=1},again:()=>quiz(i,m),back:()=>room(i)})}
function fset(){let d="Normal";
A(hud()+`<div class=c><h2>🌟 FINAL CHAPTER</h2><p class=mu>สุ่มโจทย์จากทุกหัวข้อ (CHIP 1–5)</p><b>เลือกระดับความยาก</b><div class=gr>${Object.keys(DF).map(k=>`<button class=dfb data-d=${k}>${DF[k].i} ${k}<div class=mu>❤️${DF[k].hp} · ⏱${DF[k].tl}วิ · XP×${DF[k].x} · 🍀${DF[k].lp}%</div></button>`).join("")}</div><label><b>จำนวนข้อ</b> (1–100)<input id=fn type=number min=1 max=100 value=10 inputmode=numeric></label></div><button class=b id=st1>เริ่มทำแบบทดสอบ ▶</button><button class=b2 onclick="home()">← กลับ</button>`);
const pk=k=>{d=k;$$(".dfb").forEach(x=>x.classList.toggle("on",x.dataset.d==k))};$$(".dfb").forEach(x=>x.onclick=()=>pk(x.dataset.d));pk(d);
$("#st1").onclick=()=>fp(d,Math.max(1,Math.min(100,parseInt($("#fn").value)||10)))}
function fp(d,n){const D=DF[d];play({t:"",N:n,hp:D.hp,tl:D.tl,lp:D.lp,g:()=>P(RM).g(),x:10*D.x,bn:"🌟 FINAL · "+d,win:(s,m,h)=>h>0,wt:"🌟 ผ่าน FINAL CHAPTER!",
note:(s,m)=>{const p=s/m*100;return`<p>แรงก์: <b style="font-size:1.6rem">${p>=90?"S":p>=75?"A":p>=60?"B":"C"}</b></p>`},again:()=>fp(d,n),back:fset})}
splash();