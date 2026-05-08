import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client.js'

function RegistryManager() {
  const [sections, setSections] = useState([])
  const [selectedSection, setSelectedSection] = useState(null)
  const [sectionItems, setSectionItems] = useState([])
  const [addOns, setAddOns] = useState({})
  const [selectedAddOnCategories, setSelectedAddOnCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSectionLoading, setIsSectionLoading] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [error, setError] = useState(null)
  const [showAddSection, setShowAddSection] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [renamingSection, setRenamingSection] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [newSectionName, setNewSectionName] = useState('')
  const [newSectionGroup, setNewSectionGroup] = useState('Default')
  const [newItemGroup, setNewItemGroup] = useState('Default')
  const [newItemName, setNewItemName] = useState('')
  const [newItemShort, setNewItemShort] = useState('')

  const loadSections = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const r = await apiFetch('registry/sections')
      if (!r.ok) throw new Error('Failed to load sections')
      const data = await r.json()
      setSections(data.sections || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const loadAddOns = async () => {
    try {
      const r = await apiFetch('registry/addons')
      if (!r.ok) return
      const data = await r.json()
      setAddOns(data.addOns?.['Add-Ons'] || {})
    } catch {
      // Add-ons optional
    }
  }

  useEffect(() => {
    loadSections()
    loadAddOns()
  }, [])

  const loadSectionItems = async (sectionName) => {
    setIsSectionLoading(true)
    try {
      const r = await apiFetch('master-data')
      if (!r.ok) throw new Error('Failed to load items')
      const data = await r.json()
      const items = (data.items || []).filter((i) => i.categoryName === sectionName)
      setSectionItems(items)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsSectionLoading(false)
    }
  }

  const selectSection = (section) => {
    setSelectedSection(section)
    setShowAddItem(false)
    loadSectionItems(section.name)
    const firstGroup = section.groups?.[0] || 'Default'
    setNewItemGroup(firstGroup)
  }

  const handleAddSection = async () => {
    if (!newSectionName.trim()) return
    const r = await apiFetch('registry/sections', {
      method: 'POST',
      body: JSON.stringify({ name: newSectionName.trim(), groupName: newSectionGroup.trim() || 'Default' }),
    })
    if (!r.ok) {
      const d = await r.json().catch(() => ({}))
      setError(d.detail || 'Failed to create section')
      return
    }
    setNewSectionName('')
    setNewSectionGroup('Default')
    setShowAddSection(false)
    await loadSections()
  }

  const handleDeleteSection = async (sectionName) => {
    if (!window.confirm(`Delete section "${sectionName}" and all its items?`)) return
    const r = await apiFetch(`registry/sections/${encodeURIComponent(sectionName)}`, { method: 'DELETE' })
    if (!r.ok) {
      const d = await r.json().catch(() => ({}))
      setError(d.detail || 'Failed to delete section')
      return
    }
    if (selectedSection?.name === sectionName) {
      setSelectedSection(null)
      setSectionItems([])
    }
    await loadSections()
  }

  const handleRenameSection = async (sectionName) => {
    if (!renameValue.trim() || renameValue.trim() === sectionName) {
      setRenamingSection(null)
      return
    }
    const r = await apiFetch(`registry/sections/${encodeURIComponent(sectionName)}/rename`, {
      method: 'POST',
      body: JSON.stringify({ newName: renameValue.trim() }),
    })
    if (!r.ok) {
      const d = await r.json().catch(() => ({}))
      setError(d.detail || 'Failed to rename section')
      return
    }
    if (selectedSection?.name === sectionName) {
      setSelectedSection((prev) => ({ ...prev, name: renameValue.trim() }))
    }
    setRenamingSection(null)
    await loadSections()
  }

  const handleAddItem = async () => {
    if (!newItemName.trim() || !selectedSection) return
    const r = await apiFetch(`registry/sections/${encodeURIComponent(selectedSection.name)}/items`, {
      method: 'POST',
      body: JSON.stringify({
        groupName: newItemGroup.trim() || 'Default',
        name: newItemName.trim(),
        shortDescription: newItemShort.trim(),
      }),
    })
    if (!r.ok) {
      const d = await r.json().catch(() => ({}))
      setError(d.detail || 'Failed to add item')
      return
    }
    setNewItemName('')
    setNewItemShort('')
    setShowAddItem(false)
    await loadSections()
    await loadSectionItems(selectedSection.name)
  }

  const handleDeleteItem = async (groupName, itemName) => {
    if (!selectedSection) return
    const r = await apiFetch(`registry/sections/${encodeURIComponent(selectedSection.name)}/items`, {
      method: 'DELETE',
      body: JSON.stringify({ groupName, itemName }),
    })
    if (!r.ok) {
      const d = await r.json().catch(() => ({}))
      setError(d.detail || 'Failed to delete item')
      return
    }
    await loadSections()
    await loadSectionItems(selectedSection.name)
  }

  const toggleAddOnCategory = (cat) => {
    setSelectedAddOnCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleImportAddOns = async () => {
    if (selectedAddOnCategories.length === 0) return
    setIsImporting(true)
    setError(null)
    try {
      const r = await apiFetch('registry/import-addons', {
        method: 'POST',
        body: JSON.stringify({ categories: selectedAddOnCategories }),
      })
      if (!r.ok) {
        const d = await r.json().catch(() => ({}))
        setError(d.detail || 'Failed to import')
        return
      }
      const data = await r.json()
      const summary = data.imported.map((i) => `${i.category} (+${i.added})`).join(', ')
      alert(`Imported: ${summary || 'nothing new'}`)
      setSelectedAddOnCategories([])
      await loadSections()
    } finally {
      setIsImporting(false)
    }
  }

  const groupedItems = sectionItems.reduce((acc, item) => {
    const g = item.groupName || 'Default'
    if (!acc[g]) acc[g] = []
    acc[g].push(item)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Registry Manager</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          <button type="button" onClick={() => setError(null)} className="ml-3 text-red-500 hover:text-red-700">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left: Sections */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Sections ({sections.length})</h2>
            <button
              type="button"
              onClick={() => setShowAddSection((v) => !v)}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
            >
              + Add Section
            </button>
          </div>

          {showAddSection && (
            <div className="mb-3 flex flex-col gap-2 rounded-md border border-blue-100 bg-blue-50 p-3">
              <input
                type="text"
                placeholder="Section name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              />
              <input
                type="text"
                placeholder="Initial group name (default: Default)"
                value={newSectionGroup}
                onChange={(e) => setNewSectionGroup(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSection(false)}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {isLoading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : (
            <ul className="max-h-[60vh] space-y-1 overflow-y-auto">
              {sections.map((sec) => (
                <li
                  key={sec.name}
                  className={`group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm cursor-pointer ${selectedSection?.name === sec.name ? 'bg-amber-50 text-amber-800' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => selectSection(sec)}
                >
                  {renamingSection === sec.name ? (
                    <input
                      type="text"
                      value={renameValue}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameSection(sec.name)
                        if (e.key === 'Escape') setRenamingSection(null)
                      }}
                      className="flex-1 rounded border border-gray-300 px-2 py-0.5 text-xs"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 truncate">{sec.name}</span>
                  )}
                  <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">{sec.itemCount}</span>
                  <button
                    type="button"
                    title="Rename"
                    onClick={(e) => {
                      e.stopPropagation()
                      setRenamingSection(sec.name)
                      setRenameValue(sec.name)
                    }}
                    className="hidden text-xs text-gray-400 hover:text-gray-700 group-hover:block"
                  >
                    ✎
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteSection(sec.name)
                    }}
                    className="hidden text-xs text-red-400 hover:text-red-600 group-hover:block"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Items */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          {!selectedSection ? (
            <p className="text-sm text-gray-400">Select a section to view its items.</p>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">{selectedSection.name}</h2>
                <button
                  type="button"
                  onClick={() => setShowAddItem((v) => !v)}
                  className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
                >
                  + Add Item
                </button>
              </div>

              {showAddItem && (
                <div className="mb-3 flex flex-col gap-2 rounded-md border border-green-100 bg-green-50 p-3">
                  <select
                    value={newItemGroup}
                    onChange={(e) => setNewItemGroup(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    {(selectedSection.groups || ['Default']).map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                    <option value="__new__">+ New group…</option>
                  </select>
                  {newItemGroup === '__new__' && (
                    <input
                      type="text"
                      placeholder="New group name"
                      onChange={(e) => setNewItemGroup(e.target.value)}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Short description (optional)"
                    value={newItemShort}
                    onChange={(e) => setNewItemShort(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddItem(false)}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {isSectionLoading ? (
                <p className="text-sm text-gray-400">Loading items…</p>
              ) : sectionItems.length === 0 ? (
                <p className="text-sm text-gray-400">No items in this section.</p>
              ) : (
                <div className="max-h-[55vh] space-y-3 overflow-y-auto">
                  {Object.entries(groupedItems).map(([groupName, items]) => (
                    <div key={groupName}>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">{groupName}</p>
                      <ul className="space-y-0.5">
                        {items.map((item) => (
                          <li key={item.itemName} className="group flex items-center gap-2 rounded px-2 py-1 text-sm hover:bg-gray-50">
                            <span className="flex-1 truncate text-gray-700">{item.itemName}</span>
                            {item.shortDescription && (
                              <span className="hidden max-w-[160px] truncate text-xs text-gray-400 group-hover:block">
                                {item.shortDescription}
                              </span>
                            )}
                            <button
                              type="button"
                              title="Delete item"
                              onClick={() => handleDeleteItem(item.groupName, item.itemName)}
                              className="hidden text-xs text-red-400 hover:text-red-600 group-hover:block"
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Import Add-ons */}
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
        <button
          type="button"
          onClick={() => setShowImport((v) => !v)}
          className="flex w-full items-center justify-between text-left text-sm font-semibold text-gray-700"
        >
          <span>Import Add-ons from Add_ons.json</span>
          <span className="text-gray-400">{showImport ? '▲' : '▼'}</span>
        </button>

        {showImport && (
          <div className="mt-3">
            {Object.keys(addOns).length === 0 ? (
              <p className="text-sm text-gray-400">No add-on categories available.</p>
            ) : (
              <>
                <ul className="mb-3 space-y-2">
                  {Object.entries(addOns).map(([catName, items]) => (
                    <li key={catName} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`addon-${catName}`}
                        checked={selectedAddOnCategories.includes(catName)}
                        onChange={() => toggleAddOnCategory(catName)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <label htmlFor={`addon-${catName}`} className="cursor-pointer text-sm text-gray-700">
                        <span className="font-medium">{catName}</span>
                        <span className="ml-2 text-gray-400">— {items.length} item{items.length !== 1 ? 's' : ''}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={selectedAddOnCategories.length === 0 || isImporting}
                  onClick={handleImportAddOns}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isImporting ? 'Importing…' : `Import Selected (${selectedAddOnCategories.length})`}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RegistryManager
