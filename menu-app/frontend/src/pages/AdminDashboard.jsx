import { useEffect, useState } from 'react'
import { usePackageStore } from '../store/usePackageStore.js'
import { apiFetch } from '../api/client.js'

const TIER_OPTIONS = ['Corporate', 'Silver', 'Gold', 'Platinum']
const TIER_BADGE_CLASS = {
  Corporate: 'bg-gray-200 text-gray-800',
  Silver: 'bg-slate-200 text-slate-800',
  Gold: 'bg-amber-200 text-amber-800',
  Platinum: 'bg-indigo-200 text-indigo-800',
}
const STATUS_BADGE_CLASS = {
  Active: 'bg-green-100 text-green-700',
  Draft: 'bg-yellow-100 text-yellow-700',
}

function AdminDashboard() {
  const packages = usePackageStore((state) => state.packages)
  const sectionsMaster = usePackageStore((state) => state.sectionsMaster)
  const addOnsMaster = usePackageStore((state) => state.addOnsMaster)
  const tierRules = usePackageStore((state) => state.tierRules)
  const addPackage = usePackageStore((state) => state.addPackage)
  const updatePackage = usePackageStore((state) => state.updatePackage)
  const fetchPackages = usePackageStore((state) => state.fetchPackages)
  const fetchSectionsMaster = usePackageStore((state) => state.fetchSectionsMaster)
  const deletePackage = usePackageStore((state) => state.deletePackage)
  const isLoading = usePackageStore((state) => state.isLoading)
  const setError = usePackageStore((state) => state.setError)
  const storeError = usePackageStore((state) => state.error)
  const [isSaving, setIsSaving] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const [isDeletingId, setIsDeletingId] = useState(null)
  const [editingPackageId, setEditingPackageId] = useState(null)
  const [packageName, setPackageName] = useState('')
  const [packageTier, setPackageTier] = useState('Corporate')
  const [basePrice, setBasePrice] = useState('')
  const [minGuests, setMinGuests] = useState('')
  const [maxGuests, setMaxGuests] = useState('')
  const [packageDescription, setPackageDescription] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('Draft')
  const [sections, setSections] = useState([])
  const [addOns, setAddOns] = useState([])

  const buildEmptySections = () =>
    sectionsMaster.map((section) => ({
      sectionName: section.sectionName,
      isCustom: false,
      subSections: (section.subSections ?? []).map((subSection) => ({
        categoryName: subSection,
        allowedQuantity: '',
        isCustom: false,
      })),
    }))

  const buildEmptyAddOns = () =>
    addOnsMaster.map((addOn) => ({
      name: addOn.name,
      price: addOn.price,
      unit: addOn.unit,
      enabled: false,
      counters: addOn.minCounters ?? null,
      appliesTo: addOn.appliesTo ?? [],
      minCounters: addOn.minCounters ?? null,
    }))

  const resetForm = () => {
    setEditingPackageId(null)
    setPackageName('')
    setPackageTier('Corporate')
    setBasePrice('')
    setMinGuests('')
    setMaxGuests('')
    setPackageDescription('')
    setNotes('')
    setStatus('Draft')
    setSections(buildEmptySections())
    setAddOns(buildEmptyAddOns())
  }

  useEffect(() => {
    fetchSectionsMaster()
    fetchPackages()
  }, [fetchSectionsMaster, fetchPackages])

  useEffect(() => {
    if (sectionsMaster.length > 0 && sections.length === 0) setSections(buildEmptySections())
    if (addOnsMaster.length > 0 && addOns.length === 0) setAddOns(buildEmptyAddOns())
  }, [sectionsMaster, addOnsMaster, sections.length, addOns.length])

  const tierHint = () => {
    const rule = tierRules?.[packageTier]
    if (!rule) return ''
    if (rule.mainCourseCuisines) return `${packageTier}: Main course set of ${rule.mainCourseCuisines} cuisines.`
    if (rule.nonVegOptions?.length) return `${packageTier}: Non-veg options include ${rule.nonVegOptions.join(', ')}. Mutton available as add-on at 100/plate.`
    return ''
  }

  const handleSectionNameChange = (sectionIndex, value) => {
    setSections((prev) => prev.map((section, index) => (index === sectionIndex ? { ...section, sectionName: value } : section)))
  }
  const handleSubSectionChange = (sectionIndex, subSectionIndex, field, value) => {
    setSections((prev) =>
      prev.map((section, index) =>
        index !== sectionIndex
          ? section
          : {
              ...section,
              subSections: section.subSections.map((subSection, itemIndex) =>
                itemIndex === subSectionIndex ? { ...subSection, [field]: value } : subSection,
              ),
            },
      ),
    )
  }
  const addCustomSubSection = (sectionIndex) => {
    setSections((prev) =>
      prev.map((section, index) =>
        index !== sectionIndex ? section : { ...section, subSections: [...section.subSections, { categoryName: '', allowedQuantity: '', isCustom: true }] },
      ),
    )
  }
  const removeSubSection = (sectionIndex, subSectionIndex) => {
    setSections((prev) =>
      prev.map((section, index) =>
        index !== sectionIndex ? section : { ...section, subSections: section.subSections.filter((_, itemIndex) => itemIndex !== subSectionIndex) },
      ),
    )
  }
  const addCustomTopLevelSection = () => {
    setSections((prev) => [...prev, { sectionName: '', isCustom: true, subSections: [{ categoryName: '', allowedQuantity: '', isCustom: true }] }])
  }
  const removeTopLevelSection = (sectionIndex) => {
    setSections((prev) => prev.filter((_, index) => index !== sectionIndex))
  }
  const resetSectionToMaster = (sectionIndex) => {
    const currentSection = sections[sectionIndex]
    const masterSection = sectionsMaster.find((section) => section.sectionName === currentSection.sectionName)
    if (!masterSection) return
    setSections((prev) =>
      prev.map((section, index) =>
        index !== sectionIndex
          ? section
          : {
              ...section,
              isCustom: false,
              subSections: masterSection.subSections.map((subSection) => ({ categoryName: subSection, allowedQuantity: '', isCustom: false })),
            },
      ),
    )
  }
  const handleAddOnChange = (index, field, value) => {
    setAddOns((prev) => prev.map((addOn, addOnIndex) => (addOnIndex === index ? { ...addOn, [field]: value } : addOn)))
  }

  const getCuisineSoftWarning = () => {
    if (packageTier !== 'Gold' && packageTier !== 'Platinum') return ''
    const required = tierRules?.[packageTier]?.mainCourseCuisines
    if (!required) return ''
    const cuisineSectionNames = ['Indian Cuisine', 'Oriental', 'Continental']
    const present = sections.filter((section) => cuisineSectionNames.includes((section.sectionName || '').trim())).length
    return present !== required ? `Soft warning: ${packageTier} suggests ${required} cuisines, but ${present} cuisine sections are currently present.` : ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    const normalizedSections = sections
      .filter((section) => section.sectionName.trim())
      .map((section) => ({
        sectionName: section.sectionName.trim(),
        subSections: section.subSections
          .filter((subSection) => subSection.categoryName.trim() && subSection.allowedQuantity !== '')
          .map((subSection) => ({ categoryName: subSection.categoryName.trim(), allowedQuantity: Number(subSection.allowedQuantity) })),
      }))
      .filter((section) => section.subSections.length > 0)
    const normalizedAddOns = addOns.map((addOn) => ({
      name: addOn.name,
      price: Number(addOn.price),
      unit: addOn.unit,
      enabled: Boolean(addOn.enabled),
      counters: addOn.counters === null || addOn.counters === '' ? null : Number(addOn.counters),
    }))
    if (!packageName.trim()) return setError('Package Name is required.')
    if (basePrice === '' || Number(basePrice) < 0) return setError('Base Price must be a valid non-negative number.')
    if (minGuests === '' || Number(minGuests) < 1) return setError('Minimum guests must be at least 1.')
    if (maxGuests === '' || Number(maxGuests) < Number(minGuests)) return setError('Maximum guests must be greater than or equal to minimum guests.')
    if (!packageTier) return setError('Package Tier is required.')
    if (normalizedSections.length === 0) return setError('At least one section with sub-sections is required.')
    if (!normalizedSections.some((section) => section.subSections.some((subSection) => subSection.allowedQuantity > 0))) return setError('At least one sub-section must have allowed quantity greater than 0.')
    if (normalizedAddOns.find((addOn) => addOn.name === 'Chaats Counter' && addOn.enabled && (addOn.counters === null || addOn.counters < 4))) return setError('Chaats Counter must be at least 4 when enabled.')

    setIsSaving(true)
    try {
      const isEditing = Boolean(editingPackageId)
      const response = await apiFetch(isEditing ? `packages/${editingPackageId}` : 'packages', {
        method: isEditing ? 'PUT' : 'POST',
        body: JSON.stringify({
          packageName: packageName.trim(),
          packageTier,
          basePrice: Number(basePrice),
          minGuests: Number(minGuests),
          maxGuests: Number(maxGuests),
          packageDescription: packageDescription.trim(),
          notes: notes.trim(),
          status,
          sections: normalizedSections,
          addOns: normalizedAddOns,
        }),
      })
      if (!response.ok) throw new Error(isEditing ? 'Failed to update package.' : 'Failed to save package.')
      const saved = await response.json()
      if (isEditing) updatePackage(saved)
      else addPackage(saved)
      resetForm()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditPackage = (menuPackage) => {
    setEditingPackageId(menuPackage.id)
    setPackageName(menuPackage.packageName ?? '')
    setPackageTier(menuPackage.packageTier ?? 'Corporate')
    setBasePrice(String(menuPackage.basePrice ?? ''))
    setMinGuests(String(menuPackage.minGuests ?? ''))
    setMaxGuests(String(menuPackage.maxGuests ?? ''))
    setPackageDescription(menuPackage.packageDescription ?? '')
    setNotes(menuPackage.notes ?? '')
    setStatus(menuPackage.status ?? 'Draft')
    setSections((menuPackage.sections ?? []).map((section) => ({
      sectionName: section.sectionName,
      isCustom: false,
      subSections: (section.subSections ?? []).map((subSection) => ({ categoryName: subSection.categoryName, allowedQuantity: String(subSection.allowedQuantity), isCustom: false })),
    })))
    setAddOns((menuPackage.addOns ?? []).map((addOn) => {
      const master = addOnsMaster.find((m) => m.name === addOn.name)
      return { name: addOn.name, price: addOn.price, unit: addOn.unit, enabled: addOn.enabled, counters: addOn.counters, appliesTo: master?.appliesTo ?? [], minCounters: master?.minCounters ?? null }
    }))
  }

  const handleSeedPredefinedPackages = async () => {
    setError(null)
    setIsSeeding(true)
    try {
      const response = await apiFetch('packages/predefined', { method: 'POST' })
      if (!response.ok) throw new Error('Failed to load predefined packages.')
      await fetchPackages()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSeeding(false)
    }
  }

  const handleDeletePackage = async (packageId) => {
    setError(null)
    setIsDeletingId(packageId)
    try {
      await deletePackage(packageId)
    } finally {
      setIsDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">TCI Menu Generator</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-lg font-medium text-gray-900">{editingPackageId ? 'Edit Menu Package' : 'Create Menu Package'}</h2>
            <button type="button" onClick={handleSeedPredefinedPackages} disabled={isSeeding} className="rounded-md border border-indigo-300 px-3 py-2 text-sm text-indigo-700 hover:bg-indigo-50 disabled:opacity-60">
              {isSeeding ? 'Loading...' : 'Load Predefined Packages'}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                <input type="text" value={packageName} onChange={(event) => setPackageName(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g., Silver Package" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Tier</label>
                <select value={packageTier} onChange={(event) => setPackageTier(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white">
                  {TIER_OPTIONS.map((tier) => <option key={tier} value={tier}>{tier}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price</label>
                <input type="number" min="0" step="0.01" value={basePrice} onChange={(event) => setBasePrice(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="e.g., 999.00" />
              </div>
            </div>
            {tierHint() ? <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">{tierHint()}</div> : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Guests</label>
                <input type="number" min="1" step="1" value={minGuests} onChange={(event) => setMinGuests(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                <input type="number" min="1" step="1" value={maxGuests} onChange={(event) => setMaxGuests(event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Description</label>
              <textarea value={packageDescription} onChange={(event) => setPackageDescription(event.target.value)} rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
                {['Draft', 'Active'].map((statusOption) => <button key={statusOption} type="button" onClick={() => setStatus(statusOption)} className={`px-4 py-2 text-sm ${status === statusOption ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>{statusOption}</button>)}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-medium text-gray-900">Sections (hierarchical)</h3>
                <button type="button" onClick={addCustomTopLevelSection} className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200">Add custom top-level section</button>
              </div>
              <div className="space-y-4">
                {sections.map((section, sectionIndex) => (
                  <details key={`section-${sectionIndex}`} open className="rounded-md border border-gray-200 bg-gray-50">
                    <summary className="cursor-pointer px-3 py-2 font-medium text-gray-800"><span>{section.sectionName || `Custom section ${sectionIndex + 1}`}</span></summary>
                    <div className="px-3 pb-3 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 items-end">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Section Name</label>
                          <input type="text" value={section.sectionName} onChange={(event) => handleSectionNameChange(sectionIndex, event.target.value)} readOnly={!section.isCustom} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white read-only:bg-gray-100" />
                        </div>
                        <button type="button" onClick={() => addCustomSubSection(sectionIndex)} className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200">Add custom sub-section</button>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => resetSectionToMaster(sectionIndex)} className="rounded-md border border-blue-300 px-3 py-2 text-sm text-blue-700">Reset to master</button>
                          {section.isCustom ? <button type="button" onClick={() => removeTopLevelSection(sectionIndex)} className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-700">Remove section</button> : null}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {section.subSections.map((subSection, subSectionIndex) => (
                          <div key={`sub-section-${sectionIndex}-${subSectionIndex}`} className="grid grid-cols-1 md:grid-cols-[1fr_150px_auto] gap-2 items-end">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Category Name</label>
                              <input type="text" value={subSection.categoryName} onChange={(event) => handleSubSectionChange(sectionIndex, subSectionIndex, 'categoryName', event.target.value)} readOnly={!subSection.isCustom} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white read-only:bg-gray-100" />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Allowed Quantity</label>
                              <input type="number" min="0" step="1" value={subSection.allowedQuantity} onChange={(event) => handleSubSectionChange(sectionIndex, subSectionIndex, 'allowedQuantity', event.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
                            </div>
                            <button type="button" onClick={() => removeSubSection(sectionIndex, subSectionIndex)} className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-600">Remove</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Add-Ons</h3>
              <div className="space-y-2">
                {addOns.map((addOn, index) => {
                  const appliesToCurrentTier = addOn.appliesTo.length === 0 || addOn.appliesTo.includes(packageTier)
                  return (
                    <div key={addOn.name} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="flex flex-wrap gap-3 items-center justify-between">
                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={addOn.enabled} onChange={(event) => handleAddOnChange(index, 'enabled', event.target.checked)} />
                          {addOn.name}
                        </label>
                        <span className="text-sm text-gray-600">Rs. {Number(addOn.price).toFixed(2)} {addOn.unit}</span>
                      </div>
                      {!appliesToCurrentTier ? <p className="text-xs text-amber-700 mt-1">Not typically applicable for {packageTier}, but can be enabled manually.</p> : null}
                      {addOn.name === 'Chaats Counter' && addOn.enabled ? (
                        <div className="mt-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Counters (minimum {addOn.minCounters ?? 4})</label>
                          <input type="number" min={addOn.minCounters ?? 4} step="1" value={addOn.counters ?? ''} onChange={(event) => handleAddOnChange(index, 'counters', event.target.value)} className="w-44 rounded-md border border-gray-300 px-3 py-2 text-sm" />
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
            {getCuisineSoftWarning() ? <p className="text-sm text-amber-700">{getCuisineSoftWarning()}</p> : null}
            {storeError ? <p className="text-sm text-red-600">{storeError}</p> : null}
            <div className="flex gap-2">
              <button type="submit" disabled={isSaving} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">{isSaving ? 'Saving...' : editingPackageId ? 'Update Package' : 'Save Package'}</button>
              {editingPackageId ? <button type="button" onClick={resetForm} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">Cancel Edit</button> : null}
            </div>
          </form>
        </section>
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Menu Packages</h2>
          {isLoading ? <p className="text-sm text-gray-500">Loading packages...</p> : packages.length === 0 ? <p className="text-sm text-gray-500">No packages yet.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {packages.map((menuPackage) => (
                <article key={menuPackage.id} className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{menuPackage.packageName}</h3>
                      <p className="text-sm text-gray-600">Rs. {Number(menuPackage.basePrice).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${TIER_BADGE_CLASS[menuPackage.packageTier] ?? 'bg-gray-200 text-gray-800'}`}>{menuPackage.packageTier ?? 'Corporate'}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_BADGE_CLASS[menuPackage.status] ?? 'bg-yellow-100 text-yellow-700'}`}>{menuPackage.status ?? 'Draft'}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Guests: {menuPackage.minGuests ?? 0} - {menuPackage.maxGuests ?? 0}</p>
                  {menuPackage.packageDescription ? <p className="text-sm text-gray-600 mb-2">{menuPackage.packageDescription}</p> : null}
                  <div className="space-y-2 mb-3">
                    {(menuPackage.sections ?? []).map((section, sectionIndex) => (
                      <div key={`${menuPackage.id}-section-${sectionIndex}`}>
                        <p className="text-xs font-semibold text-gray-600 mb-1">{section.sectionName}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(section.subSections ?? []).map((subSection, subSectionIndex) => (
                            <span key={`${menuPackage.id}-${sectionIndex}-${subSectionIndex}`} className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-2.5 py-1 text-xs font-medium">{subSection.categoryName}: {subSection.allowedQuantity}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Enabled Add-Ons</p>
                    <p className="text-sm text-gray-700">
                      {(menuPackage.addOns ?? []).filter((addOn) => addOn.enabled).map((addOn) => (addOn.name === 'Chaats Counter' ? `${addOn.name} x${addOn.counters ?? 0}` : `${addOn.name} +${addOn.price}/${addOn.unit}`)).join(', ') || 'None'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEditPackage(menuPackage)} className="rounded-md border border-blue-300 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50">Edit</button>
                    <button type="button" onClick={() => handleDeletePackage(menuPackage.id)} disabled={isDeletingId === menuPackage.id} className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-60">{isDeletingId === menuPackage.id ? 'Deleting...' : 'Delete'}</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
