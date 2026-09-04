'use client';

import React, { useState } from 'react';
import styles from './SummerRegistrationForm.module.css';
import { API_BASE_URL } from '@/config/api';
import { getWhatsAppLink, DISPLAY_PHONE } from '@/config/contact';
import { initializePaystackPayment } from '@/utils/paystack';
import { toPng } from 'html-to-image';
import {
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaWhatsapp,
  FaPlus,
  FaTrash,
  FaCreditCard,
  FaBookmark,
  FaDownload,
  FaFire,
} from 'react-icons/fa';

const PLANS = {
  Starter: { price: 35000, schedule: 'Saturday only — 1 class/week' },
  Builder: { price: 55000, schedule: 'Tue + Thu after school' },
  'Pro Builder': { price: 85000, schedule: '2 weekdays + Saturday' },
};

type PlanKey = keyof typeof PLANS;

const tracksData = [
  { minAge: 6, maxAge: 8, name: 'Junior Builders (Imagine & Create)', ageLabel: 'Ages 6–8', tools: 'Scratch Coding, Canva & Digital Art, AI Exploration' },
  { minAge: 9, maxAge: 12, name: 'Intermediate Builders (Design & Build)', ageLabel: 'Ages 9–12', tools: 'Advanced Scratch, HTML/CSS Web, Modern AI Tools' },
  { minAge: 13, maxAge: 17, name: 'Senior Builders (Build & Innovate)', ageLabel: 'Ages 13–17', tools: 'HTML/CSS/JS, Python Programming, Generative AI' },
];

function getTrackByAge(ageNum: number) {
  if (ageNum <= 8) return tracksData[0];
  if (ageNum <= 12) return tracksData[1];
  return tracksData[2];
}

interface ChildEntry {
  id?: string;
  name: string;
  age: string;
  tier: PlanKey;
}

export default function BuilderAcademyRegistrationForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [parentName, setParentName] = useState('');
  const [countryCode, setCountryCode] = useState('+234');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [agreeUpdates, setAgreeUpdates] = useState(true);
  const [children, setChildren] = useState<ChildEntry[]>([
    { id: 'child-0', name: '', age: '9', tier: 'Builder' },
  ]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [savedRegistration, setSavedRegistration] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [justAddedChildIndex, setJustAddedChildIndex] = useState<number | null>(null);

  const childCount = children.length;
  const rawSubtotal = children.reduce((sum, c) => sum + (PLANS[c.tier]?.price || 55000), 0);
  const discountPercentage = childCount >= 2 ? 0.2 : 0;
  const multiChildDiscount = rawSubtotal * discountPercentage;
  const subtotalAfterMultiChild = rawSubtotal - multiChildDiscount;
  const promoDiscount = appliedPromo ? Number(appliedPromo.discountAmount) || 0 : 0;
  const totalDiscountAmount = multiChildDiscount + promoDiscount;
  const finalTotal = Math.max(0, subtotalAfterMultiChild - promoDiscount);

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) { setPromoError('Please enter a promo code'); return; }
    setValidatingPromo(true);
    setPromoError('');
    setPromoSuccess('');
    try {
      const body = { code: promoInput.trim(), cartSubtotal: subtotalAfterMultiChild, program: 'Builder Academy', parentEmail: email.trim() };
      let res;
      try {
        res = await fetch(`${API_BASE_URL}/api/promotions/validate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } catch {
        res = await fetch('/api/promotions/validate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      }
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedPromo(data);
        setPromoSuccess(`Promo Applied: ${data.code} (-₦${Number(data.discountAmount).toLocaleString()})`);
      } else {
        setAppliedPromo(null);
        setPromoError(data.message || 'Invalid Promo Code');
      }
    } catch {
      setAppliedPromo(null);
      setPromoError('Could not validate promo code. Please try again.');
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleRemovePromo = () => { setAppliedPromo(null); setPromoInput(''); setPromoSuccess(''); setPromoError(''); };

  const handleAddChild = () => {
    setErrorMessage('');
    const newChildId = `child-${Date.now()}`;
    const newIndex = children.length;
    setChildren((prev) => [
      ...prev,
      { id: newChildId, name: '', age: '9', tier: 'Builder' },
    ]);
    setJustAddedChildIndex(newIndex);
    setTimeout(() => {
      setJustAddedChildIndex(null);
    }, 2500);
    setTimeout(() => {
      const el = document.getElementById(newChildId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 80);
  };

  const handleRemoveChild = (index: number) => {
    if (children.length > 1) setChildren(children.filter((_, i) => i !== index));
  };

  const handleChildChange = (index: number, field: keyof ChildEntry, value: string) => {
    const updated = [...children];
    updated[index] = { ...updated[index], [field]: value };
    setChildren(updated);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim()) { setErrorMessage('Please enter parent full name.'); return; }
    const invalid = children.find((c) => !c.name.trim());
    if (invalid) { setErrorMessage('Please enter full name for all children.'); return; }
    setErrorMessage('');
    setStep(2);
  };

  const handlePrevStep = () => { setErrorMessage(''); setStep(1); };

  const executeRegistration = async (paymentMethod: 'Paystack' | 'Pay Later', paymentRef?: string) => {
    setStatus('loading');
    setErrorMessage('');
    const fullPhone = `${countryCode} ${whatsappNumber}`.trim();
    const processedChildren = children.map((c) => {
      const ageNum = parseInt(c.age, 10) || 9;
      const track = getTrackByAge(ageNum);
      const plan = PLANS[c.tier];
      return { name: c.name, age: c.age, tier: c.tier, course: track.name, schedule: plan.schedule, price: plan.price };
    });
    const payload = {
      parentName, parentPhone: fullPhone, parentEmail: email,
      children: processedChildren, program: 'Builder Academy',
      agreeUpdates, rawSubtotal, discountAmount: totalDiscountAmount, amount: finalTotal,
      promoCode: appliedPromo?.code, paymentMethod,
      paymentStatus: paymentMethod === 'Paystack' ? 'Paid' : 'Pending Payment',
      paymentReference: paymentRef || `CBD_ACADEMY_${Date.now()}`,
    };
    try {
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/api/builder-academy-register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } catch {
        response = await fetch('/api/builder-academy-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }
      const resData = await response.json();
      if (response.ok || resData.data) {
        setSavedRegistration({ parentName, parentPhone: fullPhone, email, children: processedChildren, rawSubtotal, finalTotal, discountAmount: totalDiscountAmount, paymentMethod, paymentStatus: payload.paymentStatus, reference: payload.paymentReference });
        setStatus('success');
      } else {
        setErrorMessage(resData.error || 'Registration failed. Please try again.');
        setStatus('error');
      }
    } catch {
      setSavedRegistration({ parentName, parentPhone: fullPhone, email, children: processedChildren, rawSubtotal, finalTotal, discountAmount: totalDiscountAmount, paymentMethod, paymentStatus: payload.paymentStatus, reference: payload.paymentReference });
      setStatus('success');
    }
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber.trim() || !email.trim()) { setErrorMessage('Please enter WhatsApp number and Email.'); return; }
    initializePaystackPayment({
      email, amountNaira: finalTotal,
      metadata: { parentName, parentPhone: `${countryCode} ${whatsappNumber}`, program: 'Builder Academy', childCount },
      onSuccess: (ref) => executeRegistration('Paystack', ref),
      onError: (err) => setErrorMessage(err),
    });
  };

  const handlePayLater = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber.trim() || !email.trim()) { setErrorMessage('Please enter WhatsApp number and Email.'); return; }
    executeRegistration('Pay Later');
  };

  const isPaid = savedRegistration?.paymentStatus === 'Paid';

  const handleDownloadImage = async () => {
    const node = document.getElementById('academy-receipt');
    if (!node) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(node, { quality: 0.95, pixelRatio: 2, backgroundColor: '#ffffff' });
      const link = document.createElement('a');
      link.download = isPaid
        ? `Codiva_Academy_Receipt_${savedRegistration?.reference || Date.now()}.png`
        : `Codiva_Academy_Invoice_${savedRegistration?.reference || Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const whatsappMessage = savedRegistration
    ? isPaid
      ? `Hello Codiva Builders! 🎉 I completed payment for Builder Academy.\n` +
        `Parent: ${savedRegistration.parentName}\n` +
        `Children: ${savedRegistration.children.map((c: any) => `${c.name} (Age ${c.age}, ${c.tier} - ${c.course})`).join('\n')}\n` +
        `Total Paid: ₦${savedRegistration.finalTotal.toLocaleString()}\nRef: ${savedRegistration.reference}`
      : `Hello Codiva Builders! 🔒 I reserved a seat for Builder Academy.\n` +
        `Parent: ${savedRegistration.parentName}\n` +
        `Children: ${savedRegistration.children.map((c: any) => `${c.name} (Age ${c.age}, ${c.tier} - ${c.course})`).join('\n')}\n` +
        `Total Due: ₦${savedRegistration.finalTotal.toLocaleString()}\nRef: ${savedRegistration.reference}`
    : 'Hello Codiva Builders! I have a question about Builder Academy.';

  return (
    <div className={styles.container}>
      {status === 'success' && savedRegistration ? (
        <div className={styles.successContainer}>
          <div className={styles.successIcon} style={{ color: isPaid ? '#10b981' : '#f59e0b' }}>
            {isPaid ? <FaCheckCircle /> : <FaBookmark />}
          </div>
          <h2 className={styles.successTitle}>
            {isPaid ? '🎉 Registration Complete!' : '🔒 Seat Reserved Successfully!'}
          </h2>
          <p className={styles.successDesc}>
            {isPaid ? (
              <>Your child has been enrolled in <strong>Codiva Builder Academy</strong>. A receipt is below.</>
            ) : (
              <>Your seat is reserved! Please complete payment to confirm your child&apos;s spot.</>
            )}
          </p>

          <div className={styles.summaryCard} id="academy-receipt">
            <div className={styles.printHeader}>
              <div className={styles.brandTitle}>
                <span style={{ color: '#FF6B00' }}>Codiva</span>
                <span style={{ color: '#0A66C2' }}>Builders</span>
              </div>
              <div className={styles.brandSub}>Builder Academy • 12-Week Termly Program</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              <span style={{ fontWeight: 800, color: '#0f172a' }}>
                {isPaid ? 'OFFICIAL PAYMENT RECEIPT' : 'PROFORMA INVOICE / SEAT RESERVATION'}
              </span>
              <span style={{ fontWeight: 700, color: isPaid ? '#16a34a' : '#d97706' }}>
                {isPaid ? 'Paid ✓' : 'Seat Reserved (Pending Payment)'}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Parent / Guardian:</span>
              <span className={styles.summaryValue}>{savedRegistration.parentName}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Phone / Email:</span>
              <span className={styles.summaryValue}>{savedRegistration.parentPhone} ({savedRegistration.email})</span>
            </div>

            <div style={{ margin: '0.75rem 0', background: '#eff6ff', padding: '0.75rem', borderRadius: '8px' }}>
              <strong style={{ fontSize: '0.85rem', color: '#0A66C2' }}>Enrolled Children & Plans:</strong>
              {savedRegistration.children.map((c: any, idx: number) => (
                <div key={idx} style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  • <strong>{c.name}</strong> (Age {c.age}) — {c.tier} Tier · {c.course} · ₦{c.price.toLocaleString()}/term
                </div>
              ))}
            </div>

            {savedRegistration.discountAmount > 0 && (
              <div className={styles.summaryRow} style={{ color: '#16a34a', fontWeight: 700 }}>
                <span className={styles.summaryLabel}>Total Savings:</span>
                <span className={styles.summaryValue}>-₦{savedRegistration.discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className={styles.summaryRow} style={{ fontWeight: 800, fontSize: '1.05rem', marginTop: '0.5rem' }}>
              <span className={styles.summaryLabel}>{isPaid ? 'Total Paid:' : 'Total Due:'}</span>
              <span className={styles.summaryValue}>₦{savedRegistration.finalTotal.toLocaleString()}</span>
            </div>

            {!isPaid && (
              <div className={styles.bankDetailsBox}>
                <div className={styles.bankHeader}>
                  <span className={styles.bankTitleIcon}>⚡</span>
                  <div>
                    <div className={styles.bankTitle}>Fast Manual Bank Transfer</div>
                    <div className={styles.bankSubText}>Pay directly to confirm your reserved seat:</div>
                  </div>
                </div>
                <div className={styles.bankGrid}>
                  <div className={styles.bankField}>
                    <span className={styles.bankLabel}>Bank Name</span>
                    <strong className={styles.bankValue}>GTBank (Guaranty Trust)</strong>
                  </div>
                  <div className={styles.bankField}>
                    <span className={styles.bankLabel}>Account Name</span>
                    <strong className={styles.bankValue}>Omidoyin Ayodeji</strong>
                  </div>
                  <div className={styles.bankFieldFull}>
                    <span className={styles.bankLabel}>Account Number</span>
                    <div className={styles.accountNumberBadge}>
                      <span className={styles.accountNumText}>0212516916</span>
                    </div>
                  </div>
                </div>
                <div className={styles.bankNote}>
                  📲 <strong>Next Step:</strong> After transfer, send proof on WhatsApp to <strong>{DISPLAY_PHONE}</strong> for immediate confirmation.
                </div>
              </div>
            )}

            <div className={styles.printFooter}>
              <div>📍 Kwara, Nigeria | 📧 codivabuilders@gmail.com | 📱 {DISPLAY_PHONE}</div>
              <div>Codiva Builders • Kids & Teens Subsidiary of Veleon Academy</div>
            </div>
          </div>

          <div className={styles.receiptActionButtons}>
            <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
              <FaWhatsapp style={{ fontSize: '1.25rem' }} /> Confirm via WhatsApp
            </a>
            <button onClick={handleDownloadImage} disabled={isDownloading} className={styles.btnDownload}>
              <FaDownload /> {isDownloading ? 'Generating...' : isPaid ? 'Download Receipt' : 'Download Invoice'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.scarcityBadge}>
            <FaFire style={{ color: '#e11d48' }} /> Limited slots — Builder Academy Term Enrollment Open!
          </div>

          <h2 className={styles.title}>Enroll Your Child in Builder Academy</h2>
          <p className={styles.subtitle}>
            Register one or multiple children. Choose a schedule tier per child. Enjoy <strong>20% discount</strong> when enrolling 2 or more children!
          </p>

          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <span>Step {step} of 2</span>
              <span>{step === 1 ? 'Children & Plan Selection' : 'Contact & Payment'}</span>
            </div>
            <div className={styles.progressBarTrack}>
              <div className={styles.progressBarFill} style={{ width: step === 1 ? '50%' : '100%' }} />
            </div>
          </div>

          {errorMessage && <div className={styles.errorText}>{errorMessage}</div>}

          {step === 1 ? (
            <form className={styles.form} onSubmit={handleNextStep}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Parent / Guardian Name *</label>
                <input type="text" required placeholder="e.g. Mary Okon" className={styles.input} value={parentName} onChange={(e) => setParentName(e.target.value)} />
              </div>

              <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 700, color: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span>Children Details ({children.length} {children.length === 1 ? 'Child' : 'Children'})</span>
                {children.length >= 2 && (
                  <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.78rem', padding: '0.2rem 0.65rem', borderRadius: '9999px', border: '1px solid #86efac' }}>
                    ✓ 20% Multi-Child Discount Active
                  </span>
                )}
              </div>

              {children.map((child, idx) => {
                const track = getTrackByAge(parseInt(child.age, 10) || 9);
                const cardId = child.id || `child-${idx}`;
                const isNewlyAdded = justAddedChildIndex === idx;
                return (
                  <div
                    key={cardId}
                    id={cardId}
                    style={{
                      background: isNewlyAdded ? '#f0fdf4' : '#f8fafc',
                      border: isNewlyAdded ? '2px solid #22c55e' : '1.5px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '1rem',
                      marginBottom: '1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: isNewlyAdded ? '0 0 0 3px rgba(34, 197, 94, 0.2)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Child #{idx + 1}</span>
                        {isNewlyAdded && (
                          <span style={{ background: '#22c55e', color: '#ffffff', fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>
                            New!
                          </span>
                        )}
                      </div>
                      {children.length > 1 && (
                        <button type="button" onClick={() => handleRemoveChild(idx)}
                          style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0.2rem 0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>
                          <FaTrash /> Remove
                        </button>
                      )}
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Child&apos;s Full Name *</label>
                        <input type="text" required placeholder="e.g. David Okon" className={styles.input} value={child.name} onChange={(e) => handleChildChange(idx, 'name', e.target.value)} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Child&apos;s Age *</label>
                        <select className={styles.select} value={child.age} onChange={(e) => handleChildChange(idx, 'age', e.target.value)}>
                          {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((age) => (
                            <option key={age} value={age}>{age} years old</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Plan Tier */}
                    <div style={{ marginTop: '0.75rem' }}>
                      <label className={styles.label} style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', display: 'block' }}>
                        Schedule Tier for {child.name || `Child #${idx + 1}`}:
                      </label>
                      <div className={styles.tierGrid}>
                        {(Object.keys(PLANS) as PlanKey[]).map((tierKey) => {
                          const plan = PLANS[tierKey];
                          const isSelected = child.tier === tierKey;
                          return (
                            <button
                              type="button"
                              key={tierKey}
                              onClick={() => handleChildChange(idx, 'tier', tierKey)}
                              style={{
                                border: `2px solid ${isSelected ? '#0A66C2' : '#e2e8f0'}`,
                                borderRadius: '10px',
                                padding: '0.65rem 0.4rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: isSelected ? '#eff6ff' : '#ffffff',
                                fontFamily: 'inherit',
                                appearance: 'none',
                                transition: 'all 0.15s ease',
                                boxShadow: isSelected ? '0 2px 8px rgba(10,102,194,0.15)' : 'none',
                              }}
                            >
                              <span style={{ display: 'block', fontWeight: 700, fontSize: '0.8rem', color: '#0f172a' }}>{tierKey}</span>
                              <span style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: '#0A66C2', margin: '0.15rem 0' }}>₦{plan.price.toLocaleString()}</span>
                              <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', lineHeight: 1.3 }}>{plan.schedule}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Auto-Assigned Track */}
                    <div className={styles.trackPreviewCard} style={{ marginTop: '0.75rem' }}>
                      <div className={styles.trackInfo}>
                        <span className={styles.trackTag}>Assigned Track</span>
                        <span className={styles.trackTitle}>{track.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{track.tools}</span>
                      </div>
                      <span className={styles.trackBadge}>{track.ageLabel}</span>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={handleAddChild}
                className={styles.btnAddChild}
              >
                <span className={styles.addChildLeft}>
                  <span className={styles.addChildIconCircle}>
                    <FaPlus />
                  </span>
                  <span className={styles.addChildTitle}>Add Another Child</span>
                </span>
                <span className={styles.addChildDiscountBadge}>
                  Save 20%
                </span>
              </button>

              <div className={styles.buttonRow}>
                <button type="submit" className={styles.btnPrimary}>
                  <span>Continue to Step 2</span>
                  <span className={styles.btnArrowIcon}>
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label className={styles.label}>WhatsApp Phone Number *</label>
                <div className={styles.phoneGroup}>
                  <select className={styles.countryCodeSelect} value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+233">🇬🇭 +233</option>
                    <option value="+254">🇰🇪 +254</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input type="tel" required placeholder="8012345678" className={`${styles.input} ${styles.phoneInput}`} value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Parent Email Address *</label>
                <input type="email" required placeholder="parent@example.com" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <label className={styles.label}>Promo / Discount Code</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input type="text" placeholder="Enter Promo Code (e.g. EARLYBIRD)" className={styles.input} value={promoInput} onChange={(e) => setPromoInput(e.target.value.toUpperCase())} disabled={appliedPromo !== null} />
                  {appliedPromo ? (
                    <button type="button" onClick={handleRemovePromo} className={styles.btnSecondary} style={{ padding: '0.65rem 1rem', background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' }}>Remove</button>
                  ) : (
                    <button type="button" onClick={handleApplyPromo} disabled={validatingPromo} className={styles.btnSecondary} style={{ padding: '0.65rem 1.25rem', background: '#0A66C2', color: '#fff', fontWeight: 600 }}>
                      {validatingPromo ? 'Validating...' : 'Apply'}
                    </button>
                  )}
                </div>
                {promoSuccess && <div style={{ color: '#16a34a', backgroundColor: '#f0fdf4', padding: '0.4rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', marginTop: '0.5rem', border: '1px solid #bbf7d0', fontWeight: 600 }}>✓ {promoSuccess}</div>}
                {promoError && <div style={{ color: '#dc2626', backgroundColor: '#fef2f2', padding: '0.4rem 0.65rem', borderRadius: '6px', fontSize: '0.82rem', marginTop: '0.5rem', border: '1px solid #fecaca' }}>⚠️ {promoError}</div>}
              </div>

              <div style={{ background: '#fff7ed', border: '1.5px solid #fdba74', borderRadius: '12px', padding: '1rem', margin: '1rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#475569' }}>
                  <span>Subtotal ({childCount} {childCount === 1 ? 'child' : 'children'}):</span>
                  <span>₦{rawSubtotal.toLocaleString()}</span>
                </div>
                {multiChildDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#16a34a', fontWeight: 700, marginTop: '0.4rem' }}>
                    <span>Multi-child Discount (20%):</span>
                    <span>-₦{multiChildDiscount.toLocaleString()}</span>
                  </div>
                )}
                {appliedPromo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#16a34a', fontWeight: 700, marginTop: '0.4rem' }}>
                    <span>Promo ({appliedPromo.code}):</span>
                    <span>-₦{promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, borderTop: '1px dashed #fdba74', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                  <span>Amount Payable:</span>
                  <span>₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <label className={styles.checkboxContainer}>
                <input type="checkbox" checked={agreeUpdates} onChange={(e) => setAgreeUpdates(e.target.checked)} className={styles.checkboxInput} />
                <span>I agree to receive Builder Academy schedule, cohort details, and class links via WhatsApp and Email.</span>
              </label>

              <div className={styles.buttonRow} style={{ marginTop: '1rem' }}>
                <button type="button" onClick={handlePrevStep} className={styles.btnSecondary}>
                  <FaArrowLeft style={{ display: 'inline', marginRight: '0.4rem' }} /> Back
                </button>
              </div>

              <div className={styles.actionButtonGroup}>
                <button type="button" onClick={handlePayNow} disabled={status === 'loading'} className={styles.btnPayNow}>
                  <FaCreditCard /> {status === 'loading' ? 'Processing...' : 'Pay Now (Paystack)'}
                </button>
                <button type="button" onClick={handlePayLater} disabled={status === 'loading'} className={styles.btnPayLater}>
                  <FaBookmark /> Reserve & Pay Later
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
