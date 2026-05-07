import { useEffect, useMemo, useState } from 'react'

const STEPS = ['Event Details', 'Build Menu', 'Choose Template', 'Generate PDF']
const TEMPLATE_OPTIONS = [
  { id: 'corporate_clean', title: 'Corporate Clean', subtitle: 'Sharp and modern' },
  { id: 'elegant_gold', title: 'Elegant Gold', subtitle: 'Premium banquet look' },
  { id: 'festive_floral', title: 'Festive Floral', subtitle: 'Vibrant celebratory style' },
]

async function getJson(url) {
  const response = await fetch(url)
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.detail || 'Request failed')
  return data
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.detail || 'Request failed')
  return data
}

function SalesMenuGenerator() {
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Event fields
  const [clientName, setClientName] = useState('')
  const [eventName, setEventName] = useState('')
  const [occasion, setOccasion] = useState('Wedding')
  const [venue, setVenue] = useState('')
  const [serviceStyle, setServiceStyle] = useState('Buffet')
  const [notes, setNotes] = useState('')
  const [diet, setDiet] = useState('veg')
  const [minGuests, setMinGuests] = useState(50)
  const [maxGuests, setMaxGuests] = useState(120)
  const [isMultiDay, setIsMultiDay] = useState(false)
  const [daysCount, setDaysCount] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [dayPlans, setDayPlans] = useState([
    {
      dayNumber: 1,
      eventDate: '',
      functions: [{ functionName: 'Main Function', mealType: 'dinner', timeSlotCode: 'slot_1_1' }],
    },
  ])

  // Plan / data loading
  const [availablePlans, setAvailablePlans] = useState([])
  const [isPlansLoading, setIsPlansLoading] = useState(true)
  const [plansLoadFailed, setPlansLoadFailed] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState('')
  const [masterItems, setMasterItems] = useState([])

  // Menu building
  const [intakeResult, setIntakeResult] = useState(null)
  const [menuDrafts, setMenuDrafts] = useState([])
  const [activeFunctionIndex, setActiveFunctionIndex] = useState(0)
  const [customSectionCursor, setCustomSectionCursor] = useState({})
  const [pendingSectionSetup, setPendingSectionSetup] = useState(null)
  const [justAddedSectionKey, setJustAddedSectionKey] = useState(null)

  // Output
  const [selectedTemplate, setSelectedTemplate] = useState('elegant_gold')
  const [previewHtml, setPreviewHtml] = useState('')
  const [submittedBy, setSubmittedBy] = useState('')
  const [showSavePlan, setShowSavePlan] = useState(false)

  useEffect(() => {
    const boot = async () => {
      try {
        setIsPlansLoading(true)
        setPlansLoadFailed(false)
        const [plans, items] = await Promise.all([
          getJson('/api/public/generator/packages'),
          getJson('/api/public/generator/master-data'),
        ])
        setAvailablePlans(plans.packages || [])
        setMasterItems(items.items || [])
      } catch (err) {
        setError(err.message || 'Unable to load initial data')
        setPlansLoadFailed(true)
      } finally {
        setIsPlansLoading(false)
      }
    }
    boot()
  }, [])

  const dishCount = useMemo(() => {
    return menuDrafts.reduce((total, fn) => {
      return (
        total +
        (fn.sections || []).reduce(
          (sum, section) =>
            sum + (section.categories || []).reduce((catSum, cat) => catSum + (cat.dishes || []).length, 0),
          0
        )
      )
    }, 0)
  }, [menuDrafts])

  const perPerson = useMemo(() => {
    const selected = availablePlans.find((plan) => plan.id === selectedPlanId)
    return selected ? Number(selected.basePrice || 0) : 0
  }, [availablePlans, selectedPlanId])
  const estimatedTotal = perPerson * (Number(minGuests) || 0)

  const syncDayPlans = (targetCount) => {
    setDayPlans((prev) => {
      const next = []
      for (let idx = 0; idx < targetCount; idx += 1) {
        next.push(
          prev[idx] || {
            dayNumber: idx + 1,
            eventDate: '',
            functions: [
              { functionName: `Function ${idx + 1}`, mealType: 'dinner', timeSlotCode: `slot_${idx + 1}_1` },
            ],
          }
        )
      }
      return next.map((item, idx) => ({ ...item, dayNumber: idx + 1 }))
    })
  }

  const updateFunctionCount = (dayIndex, count) => {
    const safeCount = Math.max(1, Number(count) || 1)
    setDayPlans((prev) =>
      prev.map((day, idx) => {
        if (idx !== dayIndex) return day
        const functions = []
        for (let f = 0; f < safeCount; f += 1) {
          functions.push(
            day.functions[f] || {
              functionName: `Function ${f + 1}`,
              mealType: 'dinner',
              timeSlotCode: `slot_${dayIndex + 1}_${f + 1}`,
            }
          )
        }
        return { ...day, functions }
      })
    )
  }

  const updateFunctionField = (dayIndex, fnIndex, key, value) => {
    setDayPlans((prev) =>
      prev.map((day, idx) =>
        idx === dayIndex
          ? {
              ...day,
              functions: day.functions.map((fn, fIdx) =>
                fIdx === fnIndex ? { ...fn, [key]: value } : fn
              ),
            }
          : day
      )
    )
  }

  const buildEventPayload = () => {
    const slotSet = new Set()
    dayPlans.forEach((day, dayIdx) => {
      day.functions.forEach((fn, fnIdx) => {
        slotSet.add(fn.timeSlotCode || `slot_${dayIdx + 1}_${fnIdx + 1}`)
      })
    })
    return {
      client_name: clientName || 'Guest Client',
      event_name: eventName,
      occasion: occasion,
      venue,
      min_guests: Number(minGuests) || 1,
      max_guests: Number(maxGuests) || null,
      is_multi_day: isMultiDay,
      start_date: startDate,
      end_date: (isMultiDay ? dayPlans[dayPlans.length - 1]?.eventDate : '') || startDate,
      metadata: { diet, service_style: serviceStyle, notes, occasion_type: occasion },
      metadata_fields: [],
      time_slots: Array.from(slotSet).map((slotCode) => ({
        slot_code: slotCode,
        label: slotCode,
        start_time: '10:00:00',
        end_time: '13:00:00',
      })),
      day_plans: dayPlans.map((day) => ({
        day_number: day.dayNumber,
        event_date: day.eventDate || startDate,
        functions: day.functions.map((fn) => ({
          function_name: fn.functionName,
          meal_type: fn.mealType,
          time_slot_code: fn.timeSlotCode,
        })),
      })),
    }
  }

  const continueFromStep1 = async () => {
    setError('')
    if (!clientName.trim()) { setError('Client / Company name is required.'); return }
    if (!startDate) { setError('Event Date is required.'); return }
    if (isMultiDay) {
      const missing = dayPlans.findIndex((d) => !d.eventDate)
      if (missing !== -1) { setError(`Please set a date for Day ${missing + 1}.`); return }
    }
    if (isPlansLoading) {
      setError('Packages are still loading. Please wait a moment.')
      return
    }
    if (plansLoadFailed) {
      setError('Packages failed to load. Please refresh and try again.')
      return
    }
    setIsLoading(true)
    try {
      const payload = {
        selected_package_id: selectedPlanId || null,
        create_own_menu: !selectedPlanId,
        event: buildEventPayload(),
      }
      const data = await postJson('/api/public/generator/intake', payload)
      setIntakeResult(data)
      setMenuDrafts(data.functionMenus || [])
      const cursor = {}
      ;(data.functionMenus || []).forEach((_, idx) => {
        cursor[idx] = 0
      })
      setCustomSectionCursor(cursor)
      setActiveFunctionIndex(0)
      setPendingSectionSetup(null)
      if (selectedPlanId && !(data.functionMenus || []).some((menu) => (menu.sections || []).length > 0)) {
        setError('Selected package loaded but did not generate sections. Please choose another plan or create custom.')
        return
      }
      setStep(2)
    } catch (err) {
      setError(err.message || 'Unable to process intake')
    } finally {
      setIsLoading(false)
    }
  }

  const currentFunction = menuDrafts[activeFunctionIndex]

  const currentCustomSection = useMemo(() => {
    if (!intakeResult?.customBuilderSections?.length) return null
    const index = customSectionCursor[activeFunctionIndex] || 0
    return intakeResult.customBuilderSections[index] || null
  }, [activeFunctionIndex, customSectionCursor, intakeResult])

  const addCustomSection = () => {
    if (!currentCustomSection) return
    const defaultQuantities = {}
    ;(currentCustomSection.subSections || []).forEach((name) => {
      defaultQuantities[name] = 1
    })
    setPendingSectionSetup({ section: currentCustomSection, quantities: defaultQuantities })
  }

  const confirmPendingSection = () => {
    if (!pendingSectionSetup) return
    const { section, quantities } = pendingSectionSetup
    const categories = (section.subSections || []).map((name) => ({
      categoryName: name,
      allowedQuantity: Math.max(0, Number(quantities[name] ?? 1)),
      dishes: [],
    }))
    const key = `${section.sectionName}-${activeFunctionIndex}`
    setMenuDrafts((prev) =>
      prev.map((item, idx) =>
        idx === activeFunctionIndex
          ? { ...item, sections: [...(item.sections || []), { sectionName: section.sectionName, categories }] }
          : item
      )
    )
    setCustomSectionCursor((prev) => ({
      ...prev,
      [activeFunctionIndex]: (prev[activeFunctionIndex] || 0) + 1,
    }))
    setPendingSectionSetup(null)
    setJustAddedSectionKey(key)
    setTimeout(() => setJustAddedSectionKey((prev) => (prev === key ? null : prev)), 1500)
  }

  const cancelPendingSection = () => {
    setPendingSectionSetup(null)
  }

  const skipCustomSection = () => {
    setCustomSectionCursor((prev) => ({
      ...prev,
      [activeFunctionIndex]: (prev[activeFunctionIndex] || 0) + 1,
    }))
  }

  const updateCategoryQuantity = (sectionIndex, categoryIndex, value) => {
    const qty = Math.max(0, Number(value) || 0)
    setMenuDrafts((prev) =>
      prev.map((item, idx) => {
        if (idx !== activeFunctionIndex) return item
        return {
          ...item,
          sections: (item.sections || []).map((section, sIdx) =>
            sIdx === sectionIndex
              ? {
                  ...section,
                  categories: (section.categories || []).map((category, cIdx) =>
                    cIdx === categoryIndex
                      ? { ...category, allowedQuantity: qty, dishes: (category.dishes || []).slice(0, qty) }
                      : category
                  ),
                }
              : section
          ),
        }
      })
    )
  }

  const addDish = (sectionIndex, categoryIndex, dishName) => {
    if (!dishName) return
    setMenuDrafts((prev) =>
      prev.map((item, idx) => {
        if (idx !== activeFunctionIndex) return item
        return {
          ...item,
          sections: (item.sections || []).map((section, sIdx) => {
            if (sIdx !== sectionIndex) return section
            return {
              ...section,
              categories: (section.categories || []).map((category, cIdx) => {
                if (cIdx !== categoryIndex) return category
                const current = category.dishes || []
                if (current.length >= Number(category.allowedQuantity || 0)) return category
                if (current.some((dish) => dish.dishName === dishName)) return category
                const source = masterItems.find((itemData) => itemData.itemName === dishName)
                return {
                  ...category,
                  dishes: [
                    ...current,
                    {
                      dishName,
                      shortDescription: source?.shortDescription || '',
                      premiumDescription: source?.premiumDescription || '',
                    },
                  ],
                }
              }),
            }
          }),
        }
      })
    )
  }

  const removeDish = (sectionIndex, categoryIndex, dishIndex) => {
    setMenuDrafts((prev) =>
      prev.map((item, idx) => {
        if (idx !== activeFunctionIndex) return item
        return {
          ...item,
          sections: (item.sections || []).map((section, sIdx) => {
            if (sIdx !== sectionIndex) return section
            return {
              ...section,
              categories: (section.categories || []).map((category, cIdx) =>
                cIdx === categoryIndex
                  ? { ...category, dishes: (category.dishes || []).filter((_, dIdx) => dIdx !== dishIndex) }
                  : category
              ),
            }
          }),
        }
      })
    )
  }

  const generatePreview = async (templateId = selectedTemplate) => {
    setError('')
    setIsLoading(true)
    try {
      const data = await postJson('/api/public/generator/preview-html', {
        event: buildEventPayload(),
        function_menus: menuDrafts,
        template_name: templateId,
        prepared_by: 'Sales Team',
        service_style: serviceStyle,
      })
      setPreviewHtml(data.html || '')
      return data.html || ''
    } catch (err) {
      setError(err.message || 'Unable to generate preview')
      return ''
    } finally {
      setIsLoading(false)
    }
  }

  const gotoStep3 = async () => {
    if (!previewHtml) await generatePreview(selectedTemplate)
    setStep(3)
  }

  const gotoStep4 = async () => {
    await generatePreview(selectedTemplate)
    setStep(4)
  }

  const downloadHtml = () => {
    if (!previewHtml) return
    const blob = new Blob([previewHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `menu-${(clientName || 'client').toLowerCase().replace(/\s+/g, '-')}.html`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const saveCustomPlan = async () => {
    if (!submittedBy.trim()) {
      setError('Please enter your name before saving the custom plan.')
      return
    }
    const sections = (menuDrafts[0]?.sections || []).map((section) => ({
      sectionName: section.sectionName,
      subSections: (section.categories || []).map((category) => ({
        categoryName: category.categoryName,
        allowedQuantity: Number(category.allowedQuantity || 0),
      })),
    }))
    try {
      setIsLoading(true)
      await postJson('/api/public/generator/packages', {
        submittedBy: submittedBy.trim(),
        package: {
          packageName: `${eventName || occasion} Custom Plan`,
          packageTier: 'Silver',
          basePrice: perPerson || 0,
          minGuests: Number(minGuests) || 1,
          maxGuests: Number(maxGuests) || Number(minGuests) || 1,
          packageDescription: `Sales custom plan for ${clientName || 'client'}`,
          notes: notes || '',
          status: 'Draft',
          sections,
          addOns: [],
        },
      })
      setShowSavePlan(false)
      setSubmittedBy('')
    } catch (err) {
      setError(err.message || 'Unable to save custom plan')
    } finally {
      setIsLoading(false)
    }
  }

  const startOver = () => {
    setStep(1)
    setMenuDrafts([])
    setIntakeResult(null)
    setPreviewHtml('')
    setSelectedPlanId('')
    setError('')
    setPendingSectionSetup(null)
  }

  const summaryCard = (
    <div className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-serif text-[#7A1F2B]">Menu Summary</h3>
      <div className="mt-4 space-y-2 text-sm text-[#6f5b4b]">
        <p>{minGuests} guests</p>
        <p>{startDate || 'No date set'}</p>
        <p>{serviceStyle}</p>
      </div>
      <hr className="my-4 border-[#eadfce]" />
      <p className="text-sm italic text-[#8d7867]">
        {dishCount > 0 ? `${dishCount} dishes selected.` : 'No dishes selected yet.'}
      </p>
      <hr className="my-4 border-[#eadfce]" />
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-[#8d7867]">Per person</span>
          <span className="text-[#6f5b4b]">₹{perPerson}</span>
        </div>
        <div className="flex justify-between text-xl font-serif text-[#7A1F2B]">
          <span>Estimated total</span>
          <span>₹{estimatedTotal}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FBF7F1] px-4 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Step indicator */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {STEPS.map((label, index) => {
            const num = index + 1
            const stateClass =
              num < step
                ? 'bg-[#7A1F2B] text-white'
                : num === step
                  ? 'bg-[#E8D58A] text-[#7A1F2B]'
                  : 'bg-white text-[#8d7867] border border-[#e2d5c2]'
            return (
              <div key={label} className="flex items-center gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${stateClass}`}>
                  {num < step ? '✓' : num}
                </div>
                <span className="text-sm text-[#6f5b4b]">{label}</span>
              </div>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border border-[#eadfce] bg-white p-6 shadow-sm">

            {/* ── STEP 1: Event Details ── */}
            {step === 1 ? (
              <>
                <h1 className="text-5xl font-serif text-[#7A1F2B]">Event Details</h1>
                <p className="mt-1 text-[#8d7867]">Tell us about the occasion.</p>

                {/* Core fields */}
                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <label className="text-sm text-[#6f5b4b]">Client / Company *
                    <input value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm" placeholder="Sharma &amp; Co." />
                  </label>
                  <label className="text-sm text-[#6f5b4b]">Event Name
                    <input value={eventName} onChange={(e) => setEventName(e.target.value)} className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm" placeholder="Sharma Wedding 2026" />
                  </label>
                  <label className="text-sm text-[#6f5b4b]">Occasion
                    <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm">
                      <option>Wedding</option><option>Corporate</option><option>Birthday</option><option>Other</option>
                    </select>
                  </label>
                  <label className="text-sm text-[#6f5b4b]">Venue
                    <input value={venue} onChange={(e) => setVenue(e.target.value)} className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm" placeholder="Event venue" />
                  </label>
                  <label className="text-sm text-[#6f5b4b]">Event Date *
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value)
                        if (!isMultiDay) {
                          setDayPlans((prev) => prev.map((d, i) => (i === 0 ? { ...d, eventDate: e.target.value } : d)))
                        }
                      }}
                      className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="text-sm text-[#6f5b4b]">Guest Count *
                    <input type="number" min={1} value={minGuests} onChange={(e) => setMinGuests(e.target.value)} className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm" placeholder="50" />
                  </label>
                  <label className="text-sm text-[#6f5b4b]">Max Guests
                    <input type="number" min={1} value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm" placeholder="120" />
                  </label>
                  <label className="text-sm text-[#6f5b4b]">Service Style
                    <select value={serviceStyle} onChange={(e) => setServiceStyle(e.target.value)} className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm">
                      <option>Buffet</option><option>Plated Dinner</option><option>Family Style</option>
                    </select>
                  </label>
                  <label className="text-sm text-[#6f5b4b]">Diet Preference
                    <select value={diet} onChange={(e) => setDiet(e.target.value)} className="mt-1 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm">
                      <option value="veg">Veg</option><option value="nonveg">Non-Veg</option><option value="jain">Jain</option>
                    </select>
                  </label>
                </div>

                {/* Plan selection — elevated above notes */}
                <div className="mt-5 rounded-md border border-[#e7dbca] bg-[#fcfaf6] p-4">
                  <p className="mb-2 text-sm font-medium text-[#6f5b4b]">Select a Menu Plan</p>
                  {isPlansLoading ? (
                    <p className="text-xs text-[#8d7867]">Loading plans…</p>
                  ) : !isPlansLoading && availablePlans.length === 0 ? (
                    <p className="mb-2 text-xs text-amber-700">No active plans found — you can build a custom menu.</p>
                  ) : null}
                  <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm"
                  >
                    <option value="">Create Own Menu (no predefined plan)</option>
                    {availablePlans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.packageName} — {plan.packageTier}
                        {plan.basePrice ? ` · ₹${plan.basePrice}/person` : ''}
                      </option>
                    ))}
                  </select>
                  {selectedPlanId ? (
                    <p className="mt-1.5 text-xs text-green-700">Plan selected — menu sections will be pre-filled on the next step.</p>
                  ) : (
                    <p className="mt-1.5 text-xs text-[#8d7867]">Custom mode — you will build the menu segment by segment.</p>
                  )}
                </div>

                {/* Notes */}
                <div className="mt-4">
                  <label className="text-sm text-[#6f5b4b]">Notes for the kitchen
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 h-20 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm" placeholder="Allergies, special requests, timings…" />
                  </label>
                </div>

                {/* Multi-day section */}
                <div className="mt-5 border-t border-[#eadfce] pt-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-[#6f5b4b]">
                      <input
                        type="checkbox"
                        checked={isMultiDay}
                        onChange={(e) => {
                          setIsMultiDay(e.target.checked)
                          if (!e.target.checked) { setDaysCount(1); syncDayPlans(1) }
                        }}
                      />
                      <span className="font-medium">Multi-day event</span>
                    </label>
                    {isMultiDay && (
                      <label className="flex items-center gap-2 text-sm text-[#6f5b4b]">
                        Number of days:
                        <input
                          type="number"
                          min={1}
                          value={daysCount}
                          onChange={(e) => {
                            const count = Math.max(1, Number(e.target.value) || 1)
                            setDaysCount(count)
                            syncDayPlans(count)
                          }}
                          className="w-16 rounded-md border border-[#e7dbca] px-2 py-1 text-sm"
                        />
                      </label>
                    )}
                  </div>

                  {isMultiDay && (
                    <div className="mt-3 space-y-3">
                      {dayPlans.map((day, dayIndex) => (
                        <div key={day.dayNumber} className="rounded-md border border-[#eadfce] bg-[#fcfaf6] p-3">
                          <div className="flex flex-wrap items-center gap-4 mb-2">
                            <span className="text-sm font-medium text-[#7A1F2B]">Day {day.dayNumber}</span>
                            <label className="flex items-center gap-2 text-xs text-[#6f5b4b]">
                              Date:
                              <input
                                type="date"
                                value={day.eventDate}
                                onChange={(e) => setDayPlans((prev) => prev.map((d, i) => (i === dayIndex ? { ...d, eventDate: e.target.value } : d)))}
                                className="rounded-md border border-[#e7dbca] px-2 py-1 text-xs"
                              />
                            </label>
                            <label className="flex items-center gap-2 text-xs text-[#6f5b4b]">
                              Functions on this day:
                              <input
                                type="number"
                                min={1}
                                value={day.functions.length}
                                onChange={(e) => updateFunctionCount(dayIndex, e.target.value)}
                                className="w-12 rounded-md border border-[#e7dbca] px-2 py-1 text-xs"
                              />
                            </label>
                          </div>
                          <div className="space-y-2 border-l-2 border-[#eadfce] pl-3">
                            {day.functions.map((fn, fnIndex) => (
                              <div key={`${day.dayNumber}-${fnIndex}`} className="flex flex-wrap items-center gap-2">
                                <span className="w-20 shrink-0 text-xs text-[#8d7867]">Function {fnIndex + 1}:</span>
                                <input
                                  value={fn.functionName}
                                  onChange={(e) => updateFunctionField(dayIndex, fnIndex, 'functionName', e.target.value)}
                                  className="min-w-[120px] flex-1 rounded-md border border-[#e7dbca] px-2 py-1 text-xs"
                                  placeholder="e.g. Sangeet Ceremony"
                                />
                                <select
                                  value={fn.mealType}
                                  onChange={(e) => updateFunctionField(dayIndex, fnIndex, 'mealType', e.target.value)}
                                  className="rounded-md border border-[#e7dbca] px-2 py-1 text-xs"
                                >
                                  <option value="breakfast">Breakfast</option>
                                  <option value="lunch">Lunch</option>
                                  <option value="hi-tea">Hi-Tea</option>
                                  <option value="dinner">Dinner</option>
                                </select>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between">
                  <button type="button" disabled className="rounded-md border border-[#e7dbca] px-4 py-2 text-sm text-[#8d7867]">Back</button>
                  <button type="button" onClick={continueFromStep1} disabled={isLoading} className="rounded-md bg-[#7A1F2B] px-6 py-2 text-sm font-medium text-white disabled:opacity-60">
                    {isLoading ? 'Loading…' : 'Next →'}
                  </button>
                </div>
              </>
            ) : null}

            {/* ── STEP 2: Build Menu ── */}
            {step === 2 ? (
              <>
                <h2 className="text-5xl font-serif text-[#7A1F2B]">Build the Menu</h2>
                <p className="mt-1 text-[#8d7867]">
                  {selectedPlanId
                    ? 'Review and adjust your pre-filled menu sections.'
                    : 'Add segments one by one to build your custom menu.'}
                </p>

                {/* Function tabs (only show when multiple functions) */}
                {menuDrafts.length > 1 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {menuDrafts.map((menu, idx) => (
                      <button
                        key={`${menu.dayNumber}-${menu.timeSlotCode}-${idx}`}
                        type="button"
                        onClick={() => { setActiveFunctionIndex(idx); setPendingSectionSetup(null) }}
                        className={`rounded-md px-3 py-1.5 text-xs ${idx === activeFunctionIndex ? 'bg-[#7A1F2B] text-white' : 'border border-[#e7dbca] text-[#6f5b4b]'}`}
                      >
                        Day {menu.dayNumber} — {menu.functionName}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom: segment prompt (one by one) */}
                {!selectedPlanId && !pendingSectionSetup && currentCustomSection && (
                  <div className="mt-4 rounded-md border border-[#E8D58A] bg-[#fff9ea] p-4">
                    <p className="text-sm font-medium text-[#7A1F2B]">
                      Next segment: <strong>{currentCustomSection.sectionName}</strong>
                    </p>
                    {(currentCustomSection.subSections || []).length > 0 && (
                      <p className="mt-0.5 text-xs text-[#8d7867]">
                        Categories: {(currentCustomSection.subSections || []).join(' · ')}
                      </p>
                    )}
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={addCustomSection} className="rounded-md bg-[#7A1F2B] px-4 py-1.5 text-xs font-medium text-white">
                        Add
                      </button>
                      <button type="button" onClick={skipCustomSection} className="rounded-md border border-[#7A1F2B] px-4 py-1.5 text-xs text-[#7A1F2B]">
                        Skip
                      </button>
                    </div>
                  </div>
                )}

                {/* Custom: quantity setup before dishes appear */}
                {!selectedPlanId && pendingSectionSetup && (
                  <div className="mt-4 rounded-md border border-[#7A1F2B] bg-[#fff6ee] p-4">
                    <p className="text-sm font-medium text-[#7A1F2B]">
                      How many dishes for each category in <strong>{pendingSectionSetup.section.sectionName}</strong>?
                    </p>
                    <div className="mt-3 space-y-2">
                      {(pendingSectionSetup.section.subSections || []).map((name) => (
                        <div key={name} className="flex items-center gap-3">
                          <span className="w-36 shrink-0 text-xs text-[#6f5b4b]">{name}</span>
                          <input
                            type="number"
                            min={0}
                            value={pendingSectionSetup.quantities[name] ?? 1}
                            onChange={(e) =>
                              setPendingSectionSetup((prev) => ({
                                ...prev,
                                quantities: {
                                  ...prev.quantities,
                                  [name]: Math.max(0, Number(e.target.value) || 0),
                                },
                              }))
                            }
                            className="w-16 rounded-md border border-[#e7dbca] px-2 py-1 text-xs"
                          />
                          <span className="text-xs text-[#8d7867]">dishes</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={confirmPendingSection} className="rounded-md bg-[#7A1F2B] px-4 py-1.5 text-xs font-medium text-white">
                        Confirm &amp; Add
                      </button>
                      <button type="button" onClick={cancelPendingSection} className="rounded-md border border-[#e7dbca] px-4 py-1.5 text-xs text-[#8d7867]">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Custom: all segments covered signal */}
                {!selectedPlanId && !pendingSectionSetup && !currentCustomSection && (currentFunction?.sections || []).length > 0 && (
                  <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3">
                    <p className="text-sm font-medium text-green-700">
                      All segments covered — review your menu below and continue when ready.
                    </p>
                  </div>
                )}

                {/* Sections list */}
                <div className="mt-4 space-y-3">
                  {(currentFunction?.sections || []).map((section, sectionIndex) => {
                    const highlightKey = `${section.sectionName}-${activeFunctionIndex}`
                    const isHighlighted = justAddedSectionKey === highlightKey
                    return (
                      <div
                        key={`${section.sectionName}-${sectionIndex}`}
                        className={`rounded-md border p-3 transition-all duration-700 ${isHighlighted ? 'border-green-400 bg-green-50' : 'border-[#eadfce]'}`}
                      >
                        <p className="font-medium text-[#7A1F2B]">
                          {section.sectionName}
                          {isHighlighted && (
                            <span className="ml-2 text-xs font-normal text-green-600">✓ added</span>
                          )}
                        </p>
                        {(section.categories || []).map((category, categoryIndex) => {
                          const filled = (category.dishes || []).length
                          const total = Number(category.allowedQuantity || 0)
                          const isFull = total > 0 && filled >= total
                          const opts = masterItems
                            .filter((item) =>
                              (item.categoryName || '').toLowerCase().includes((category.categoryName || '').toLowerCase()) ||
                              (category.categoryName || '').toLowerCase().includes((item.categoryName || '').toLowerCase())
                            )
                            .slice(0, 120)
                          return (
                            <div key={`${category.categoryName}-${categoryIndex}`} className="mt-2 rounded border border-[#f0e7da] p-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="flex-1 text-xs text-[#6f5b4b]">{category.categoryName}</p>
                                <span className={`text-xs font-semibold ${isFull ? 'text-green-600' : filled > 0 ? 'text-amber-600' : 'text-[#8d7867]'}`}>
                                  {filled}/{total}
                                </span>
                                <input
                                  type="number"
                                  min={0}
                                  value={category.allowedQuantity}
                                  onChange={(e) => updateCategoryQuantity(sectionIndex, categoryIndex, e.target.value)}
                                  className="w-14 rounded-md border border-[#e7dbca] px-2 py-1 text-xs"
                                  title="Quantity"
                                />
                                <select
                                  defaultValue=""
                                  disabled={isFull}
                                  onChange={(e) => {
                                    addDish(sectionIndex, categoryIndex, e.target.value)
                                    e.target.value = ''
                                  }}
                                  className={`rounded-md border border-[#e7dbca] px-2 py-1 text-xs ${isFull ? 'cursor-not-allowed opacity-40' : ''}`}
                                >
                                  <option value="">{isFull ? 'Filled ✓' : 'Add dish…'}</option>
                                  {!isFull && opts.map((item) => (
                                    <option key={`${item.groupName}-${item.itemName}`} value={item.itemName}>{item.itemName}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {(category.dishes || []).map((dish, dishIndex) => (
                                  <span key={`${dish.dishName}-${dishIndex}`} className="inline-flex items-center gap-1 rounded-full bg-[#f7efe3] px-2 py-1 text-xs text-[#7A1F2B]">
                                    {dish.dishName}
                                    <button
                                      type="button"
                                      onClick={() => removeDish(sectionIndex, categoryIndex, dishIndex)}
                                      className="ml-0.5 leading-none hover:text-red-600"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="rounded-md border border-[#e7dbca] px-4 py-2 text-sm text-[#8d7867]">Back</button>
                  <button type="button" onClick={gotoStep3} disabled={isLoading} className="rounded-md bg-[#7A1F2B] px-6 py-2 text-sm font-medium text-white">
                    {isLoading ? 'Loading…' : 'Next →'}
                  </button>
                </div>
              </>
            ) : null}

            {/* ── STEP 3: Choose Template ── */}
            {step === 3 ? (
              <>
                <h2 className="text-5xl font-serif text-[#7A1F2B]">Choose Template</h2>
                <p className="mt-1 text-[#8d7867]">Pick the final output style.</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {TEMPLATE_OPTIONS.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={async () => {
                        setSelectedTemplate(template.id)
                        await generatePreview(template.id)
                      }}
                      className={`rounded-lg border p-3 text-left ${selectedTemplate === template.id ? 'border-[#7A1F2B] bg-[#fff6ee]' : 'border-[#eadfce] bg-white'}`}
                    >
                      <p className="font-serif text-xl text-[#7A1F2B]">{template.title}</p>
                      <p className="mt-1 text-xs text-[#8d7867]">{template.subtitle}</p>
                    </button>
                  ))}
                </div>
                {previewHtml && (
                  <div className="mt-4">
                    <p className="mb-1 text-xs text-[#8d7867]">Preview</p>
                    <iframe title="template-preview" srcDoc={previewHtml} className="h-80 w-full rounded-md border border-[#eadfce]" />
                  </div>
                )}
                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(2)} className="rounded-md border border-[#e7dbca] px-4 py-2 text-sm text-[#8d7867]">Back</button>
                  <button type="button" onClick={gotoStep4} disabled={isLoading} className="rounded-md bg-[#7A1F2B] px-6 py-2 text-sm font-medium text-white">
                    {isLoading ? 'Loading…' : 'Next →'}
                  </button>
                </div>
              </>
            ) : null}

            {/* ── STEP 4: Generate PDF ── */}
            {step === 4 ? (
              <>
                <h2 className="text-5xl font-serif text-[#7A1F2B]">Generate PDF</h2>
                <p className="mt-1 text-[#8d7867]">Preview and export your final menu.</p>
                {previewHtml ? (
                  <iframe title="menu-preview" srcDoc={previewHtml} className="mt-4 h-[560px] w-full rounded-md border border-[#eadfce]" />
                ) : (
                  <p className="mt-4 text-sm text-[#8d7867]">No preview yet. Go back and choose a template.</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={downloadHtml} className="rounded-md bg-[#7A1F2B] px-4 py-2 text-sm font-medium text-white">Download HTML</button>
                  {!selectedPlanId ? (
                    <button type="button" onClick={() => setShowSavePlan(true)} className="rounded-md border border-[#7A1F2B] px-4 py-2 text-sm font-medium text-[#7A1F2B]">
                      Save Plan to Databank
                    </button>
                  ) : null}
                  <button type="button" onClick={startOver} className="rounded-md border border-[#e7dbca] px-4 py-2 text-sm text-[#8d7867]">Start Over</button>
                </div>
                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(3)} className="rounded-md border border-[#e7dbca] px-4 py-2 text-sm text-[#8d7867]">Back</button>
                  <span className="rounded-md bg-[#E8D58A] px-4 py-2 text-sm text-[#7A1F2B]">Done</span>
                </div>
              </>
            ) : null}

            {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
          </div>
          <div>{summaryCard}</div>
        </div>
      </div>

      {/* Save plan modal */}
      {showSavePlan ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#eadfce] bg-white p-5">
            <h4 className="text-xl font-serif text-[#7A1F2B]">Save Custom Plan</h4>
            <p className="mt-1 text-sm text-[#8d7867]">Enter your name to save this plan to the databank.</p>
            <input
              value={submittedBy}
              onChange={(e) => setSubmittedBy(e.target.value)}
              className="mt-3 w-full rounded-md border border-[#e7dbca] px-3 py-2 text-sm"
              placeholder="Your name"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setShowSavePlan(false)} className="rounded-md border border-[#e7dbca] px-4 py-2 text-sm text-[#8d7867]">Cancel</button>
              <button type="button" onClick={saveCustomPlan} className="rounded-md bg-[#7A1F2B] px-4 py-2 text-sm text-white">Save</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SalesMenuGenerator
