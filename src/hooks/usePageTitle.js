import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title.replace(/\s*\|\s*Green World$/i, '')
  }, [title])
}
