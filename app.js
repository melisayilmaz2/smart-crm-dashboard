/* Orbit CRM: local-first sample; no real client information. */
const KEY = 'orbit-crm-v1';
const STAGES = ['New','Contacted','Qualified','Proposal','Won','Lost'];
const BOARD_STAGES = STAGES.slice(0,4);
const seed = [
{id:'1',name:'Sophie Chen',company:'Lumina Labs',value:8400,stage:'New',followUp:'2026-11-02'},
{id:'2',name:'Marcus Reed',company:'Aperture Studio',value:12500,stage:'Contacted',followUp:'2026-11-05'},
{id:'3',name:'Amelia Brooks',company:'Kinfolk Digital',value:6200,stage:'Qualified',followUp:'2026-11-01'},
{id:'4',name:'Noah Patel',company:'Northstar Health',value:21500,stage:'Proposal',followUp:'2026-11-03'},
{id:'5',name:'Olivia James',company:'Atlas Ventures',value:14500,stage:'Won',followUp:''},
{id:'6',name:'Ethan Moore',company:'Bloom Commerce',value:9600,stage:'Lost',followUp:''},
{id:'7',name:'Isabella Park',company:'Skyline Works',value:5400,stage:'New',followUp:'2026-11-04'},
{id:'8',name:'Leo Williams',company:'Mosaic Systems',value:11300,stage:'Proposal',followUp:'2026-11-08'}
];
const $ = (id) => document.getElementById(id);
function load(){try{const d=JSON.parse(localStorage.getItem(KEY));return Array.isArray(d)?d:structuredClone(seed);}catch{return structuredClone(seed);}}
let leads=load(), editing=null;
function save(){localStorage.setItem(KEY,JSON.stringify(leads));render();}
function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);}
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){const opened=leads.filter(x=>!['Won','Lost'].includes(x.stage));const won=leads.filter(x=>x.stage==='Won');const closed=leads.filter(x=>['Won','Lost'].includes(x.stage));
$('pipelineValue').textContent=money(opened.reduce((a,x)=>a+x.value,0));$('openCount').textContent=opened.length;$('wonValue').textContent=money(won.reduce((a,x)=>a+x.value,0));$('winRate').textContent=closed.length?`${Math.round(won.length/closed.length*100)}%`:'—';
$('board').innerHTML=BOARD_STAGES.map(stage=>{const group=leads.filter(x=>x.stage===stage);return `<section class="stage"><h3>${safe(stage)}<span>${group.length}</span></h3>${group.map(x=>`<article class="lead"><strong>${safe(x.name)}</strong><p>${safe(x.company)}</p><div class="lead-bottom"><b>${money(x.value)}</b><button data-edit="${safe(x.id)}">Edit ↗</button></div></article>`).join('')||'<p class="empty">No leads</p>'}</section>`}).join('');
const q=$('search').value.trim().toLowerCase(),f=$('filter').value;const visible=leads.filter(x=>(f==='all'||x.stage===f)&&(`${x.name} ${x.company}`.toLowerCase().includes(q)));
$('rows').innerHTML=visible.map(x=>`<tr><td>${safe(x.name)}</td><td>${safe(x.company)}</td><td>${money(x.value)}</td><td><span class="tag">${safe(x.stage)}</span></td><td>${safe(x.followUp||'—')}</td><td class="actions-cell"><button data-edit="${safe(x.id)}">Edit</button> · <button data-delete="${safe(x.id)}">Delete</button></td></tr>`).join('');$('empty').hidden=visible.length>0;}
function openEditor(id=null){editing=id;const found=leads.find(x=>x.id===id);$('leadForm').reset();$('dialogTitle').textContent=found?'Edit opportunity':'Add opportunity';if(found){for(const key of ['name','company','value','stage','followUp'])$('leadForm').elements.namedItem(key).value=found[key];}$('leadDialog').showModal();}
$('addBtn').addEventListener('click',()=>openEditor());$('closeDialog').addEventListener('click',()=>$('leadDialog').close());$('cancelDialog').addEventListener('click',()=>$('leadDialog').close());
$('leadForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const record={id:editing??crypto.randomUUID(),name:String(fd.get('name')).trim(),company:String(fd.get('company')).trim(),value:Number(fd.get('value')),stage:String(fd.get('stage')),followUp:String(fd.get('followUp'))};if(!record.name||!record.company||!Number.isFinite(record.value)||record.value<0||!STAGES.includes(record.stage))return;if(editing){leads=leads.map(x=>x.id===editing?record:x);}else leads.unshift(record);$('leadDialog').close();save();});
document.addEventListener('click',e=>{const edit=e.target.closest('[data-edit]');if(edit)openEditor(edit.dataset.edit);const del=e.target.closest('[data-delete]');if(del&&confirm('Delete this opportunity?')){leads=leads.filter(x=>x.id!==del.dataset.delete);save();}});$('search').addEventListener('input',render);$('filter').addEventListener('change',render);$('resetBtn').addEventListener('click',()=>{if(confirm('Reset all saved changes to sample data?')){leads=structuredClone(seed);save();}});render();
