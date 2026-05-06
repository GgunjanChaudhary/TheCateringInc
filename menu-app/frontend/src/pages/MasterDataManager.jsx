import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../api/client.js'

function MasterDataManager() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [shortDescription, setShortDescription] = useState('')
  const [premiumDescription, setPremiumDescription] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadMasterData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await apiFetch('master-data')
        if (!response.ok) {
          throw new Error('Failed to fetch master data.')
        }
        const data = await response.json()
        setItems(data.items ?? [])
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadMasterData()
  }, [])

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    if (!normalizedSearch) {
      return items
    }

    return items.filter((item) =>
      [
        item.categoryName,
        item.groupName,
        item.itemName,
        item.shortDescription,
        item.premiumDescription,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch),
    )
  }, [items, searchTerm])

  const openEditor = (item) => {
    setEditingItem(item)
    setShortDescription(item.shortDescription ?? '')
    setPremiumDescription(item.premiumDescription ?? '')
  }

  const closeEditor = () => {
    setEditingItem(null)
    setShortDescription('')
    setPremiumDescription('')
  }

  const handleSave = async () => {
    if (!editingItem) {
      return
    }

    setIsSaving(true)
    setError(null)
    try {
      const response = await apiFetch('master-data', {
        method: 'PATCH',
        body: JSON.stringify({
          categoryName: editingItem.categoryName,
          groupName: editingItem.groupName,
          itemName: editingItem.itemName,
          shortDescription,
          premiumDescription,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update master data.')
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.categoryName === editingItem.categoryName &&
          item.groupName === editingItem.groupName &&
          item.itemName === editingItem.itemName
            ? { ...item, shortDescription, premiumDescription }
            : item,
        ),
      )

      closeEditor()
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Master Data Manager</h1>
          <p className="text-sm text-gray-500">
            Search and edit short/premium item descriptions
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search category, group, item, or description..."
              className="w-full max-w-xl rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <span className="text-sm text-gray-500">
              {filteredItems.length} item(s)
            </span>
          </div>

          {error ? <p className="text-sm text-red-600 mb-3">{error}</p> : null}
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading master data...</p>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-md">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Group
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Item
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Short Description
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Premium Description
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={`${item.categoryName}-${item.groupName}-${item.itemName}`}
                      className="border-t border-gray-100"
                    >
                      <td className="px-3 py-2 text-sm text-gray-800">{item.categoryName}</td>
                      <td className="px-3 py-2 text-sm text-gray-800">{item.groupName}</td>
                      <td className="px-3 py-2 text-sm text-gray-800">{item.itemName}</td>
                      <td className="px-3 py-2 text-sm text-gray-700 max-w-sm truncate">
                        {item.shortDescription}
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-700 max-w-sm truncate">
                        {item.premiumDescription}
                      </td>
                      <td className="px-3 py-2 text-sm">
                        <button
                          type="button"
                          onClick={() => openEditor(item)}
                          className="rounded-md border border-blue-300 px-3 py-1.5 text-blue-600 hover:bg-blue-50"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {editingItem ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Edit Item</h2>
            <p className="text-sm text-gray-500 mb-4">
              {editingItem.categoryName} / {editingItem.groupName} / {editingItem.itemName}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={shortDescription}
                  onChange={(event) => setShortDescription(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Premium Description
                </label>
                <textarea
                  rows={4}
                  value={premiumDescription}
                  onChange={(event) => setPremiumDescription(event.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-60"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MasterDataManager
