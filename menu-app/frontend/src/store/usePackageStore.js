import { create } from 'zustand'
import { apiFetch } from '../api/client.js'

export const usePackageStore = create((set) => ({
  packages: [],
  sectionsMaster: [],
  addOnsMaster: [],
  tierRules: {},
  selectedPackageId: null,
  isLoading: false,
  error: null,

  setPackages: (packages) => set({ packages }),
  addPackage: (menuPackage) =>
    set((state) => ({ packages: [...state.packages, menuPackage] })),
  updatePackage: (updatedPackage) =>
    set((state) => ({
      packages: state.packages.map((menuPackage) =>
        menuPackage.id === updatedPackage.id ? updatedPackage : menuPackage,
      ),
    })),
  setSelectedPackageId: (selectedPackageId) => set({ selectedPackageId }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  fetchPackages: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiFetch('packages')
      if (!response.ok) {
        throw new Error('Failed to fetch packages.')
      }

      const packages = await response.json()
      set({ packages, isLoading: false })
    } catch (error) {
      set({ isLoading: false, error: error.message })
    }
  },
  fetchSectionsMaster: async () => {
    set({ error: null })
    try {
      const response = await apiFetch('sections-master')
      if (!response.ok) {
        throw new Error('Failed to fetch sections master.')
      }

      const data = await response.json()
      set({
        sectionsMaster: data.sections ?? [],
        addOnsMaster: data.addOnsMaster ?? [],
        tierRules: data.tierRules ?? {},
      })
    } catch (error) {
      set({ error: error.message })
    }
  },
  deletePackage: async (packageId) => {
    try {
      const response = await apiFetch(`packages/${packageId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete package.')
      }

      set((state) => ({
        packages: state.packages.filter((menuPackage) => menuPackage.id !== packageId),
      }))
    } catch (error) {
      set({ error: error.message })
    }
  },
  reset: () =>
    set({
      packages: [],
      selectedPackageId: null,
      isLoading: false,
      error: null,
    }),
}))
