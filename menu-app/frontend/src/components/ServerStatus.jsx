import { useEffect, useState } from 'react'

const STATUS_STYLES = {
  checking: 'bg-gray-400',
  online: 'bg-green-500',
  offline: 'bg-red-500',
}

const STATUS_LABELS = {
  checking: 'Checking...',
  online: 'Online',
  offline: 'Offline',
}

function ServerStatus() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    let isMounted = true
    const checkHealth = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/'
        const response = await fetch(`${baseUrl}api/health`)
        if (!isMounted) return
        setStatus(response.ok ? 'online' : 'offline')
      } catch {
        if (isMounted) setStatus('offline')
      }
    }

    checkHealth()
    const timer = window.setInterval(checkHealth, 15000)
    return () => {
      isMounted = false
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className="inline-flex items-center gap-2 text-sm text-gray-700">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_STYLES[status]}`} />
      <span>Server: {STATUS_LABELS[status]}</span>
    </div>
  )
}

export default ServerStatus
