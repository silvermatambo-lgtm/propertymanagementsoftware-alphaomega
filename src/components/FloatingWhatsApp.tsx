import { useMemo, useState } from 'react';
import { MessageCircle, X, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

type Step = 'welcome' | 'name' | 'phone' | 'service' | 'message' | 'review';

const SERVICES = ['Software Demo', 'Implementation Enquiry', 'Support', 'Other'];
const WHATSAPP_NUMBER = '27820000000'; // REBRAND: replace with client WhatsApp number
const BUSINESS_NAME = 'Alpha Omega'; // REBRAND: replace with client business name

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('welcome');
  const [data, setData] = useState({ name: '', phone: '', service: '', message: '' });

  const canContinue = useMemo(() => {
    if (step === 'name') return data.name.trim().length > 1;
    if (step === 'phone') return data.phone.trim().length > 6;
    if (step === 'service') return !!data.service;
    if (step === 'message') return data.message.trim().length > 2;
    return true;
  }, [step, data]);

  const next = () => {
    const order: Step[] = ['welcome','name','phone','service','message','review'];
    setStep(order[Math.min(order.indexOf(step) + 1, order.length - 1)]);
  };
  const back = () => {
    const order: Step[] = ['welcome','name','phone','service','message','review'];
    setStep(order[Math.max(order.indexOf(step) - 1, 0)]);
  };
  const sendToWhatsApp = () => {
    const text = `Hi ${BUSINESS_NAME}, I would like assistance.%0A%0AName: ${encodeURIComponent(data.name)}%0APhone: ${encodeURIComponent(data.phone)}%0AService: ${encodeURIComponent(data.service)}%0AMessage: ${encodeURIComponent(data.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-[76px] right-4 z-50 md:bottom-8">
      {open && (
        <div className="animate-chat-slide mb-3 w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
          <div className="bg-stone-900 px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500"><MessageCircle size={20}/></div>
                <div><p className="font-bold">{BUSINESS_NAME}</p><p className="text-xs text-stone-300">WhatsApp Assistant • Online</p></div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-2 hover:bg-white/10"><X size={18}/></button>
            </div>
          </div>

          <div className="min-h-[280px] p-5">
            {step === 'welcome' && <><Bubble>Hi 👋 Welcome to {BUSINESS_NAME}. I can help you request a quote or send an enquiry.</Bubble><Bubble>I'll collect a few details first, then prepare your WhatsApp message.</Bubble></>}
            {step === 'name' && <Field label="What's your name?" value={data.name} onChange={v=>setData({...data,name:v})} placeholder="Your full name" />}
            {step === 'phone' && <Field label={`Thanks ${data.name}. What's your phone number?`} value={data.phone} onChange={v=>setData({...data,phone:v})} placeholder="e.g. 073 000 0000" type="tel" />}
            {step === 'service' && <div><p className="mb-3 text-sm font-semibold text-stone-800">What can we help you with?</p><div className="grid gap-2">{SERVICES.map(s=><button key={s} onClick={()=>setData({...data,service:s})} className={`rounded-xl border px-4 py-3 text-left text-sm transition ${data.service===s?'border-amber-500 bg-amber-50 text-amber-800':'border-stone-200 hover:border-amber-300'}`}>{s}</button>)}</div></div>}
            {step === 'message' && <div><p className="mb-3 text-sm font-semibold text-stone-800">Tell us briefly what you need.</p><textarea autoFocus rows={5} value={data.message} onChange={e=>setData({...data,message:e.target.value})} placeholder="Project details, location, preferred date..." className="w-full resize-none rounded-xl border border-stone-200 p-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"/></div>}
            {step === 'review' && <div><div className="mb-4 flex items-center gap-2 text-green-600"><CheckCircle2 size={20}/><b>Ready to send</b></div><div className="space-y-2 rounded-2xl bg-stone-50 p-4 text-sm"><p><b>Name:</b> {data.name}</p><p><b>Phone:</b> {data.phone}</p><p><b>Service:</b> {data.service}</p><p><b>Message:</b> {data.message}</p></div><p className="mt-3 text-xs text-stone-500">Nothing is sent until you press “Continue on WhatsApp”.</p></div>}
          </div>

          <div className="flex items-center gap-2 border-t border-stone-100 p-4">
            {step !== 'welcome' && <button onClick={back} className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200"><ArrowLeft size={17}/></button>}
            {step !== 'review' ? <button onClick={next} disabled={!canContinue} className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-40">{step==='welcome'?'Start Chat':'Continue'}</button> : <button onClick={sendToWhatsApp} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-500"><Send size={16}/> Continue on WhatsApp</button>}
          </div>
        </div>
      )}

      <button onClick={()=>setOpen(!open)} aria-label="Open WhatsApp assistant" className="animate-pulse-gold flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:-translate-y-1 hover:bg-green-400">
        {open ? <X size={27}/> : <MessageCircle size={29}/>} 
      </button>
    </div>
  );
}

function Bubble({children}:{children:React.ReactNode}) { return <div className="mb-3 max-w-[90%] rounded-2xl rounded-tl-sm bg-stone-100 px-4 py-3 text-sm leading-relaxed text-stone-700">{children}</div>; }
function Field({label,value,onChange,placeholder,type='text'}:{label:string;value:string;onChange:(v:string)=>void;placeholder:string;type?:string}) { return <div><p className="mb-3 text-sm font-semibold text-stone-800">{label}</p><input autoFocus type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"/></div>; }
