import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qomhlvrrosqxqvqxmzqz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbWhsdnJyb3NxeHF2cXhtenF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4Nzg3NzcsImV4cCI6MjA4NTQ1NDc3N30.LfSXRWJqM7Qf9XZ_319Ew1ui-0S7aneR-VQzKCFa3cU'

export const supabase = createClient(supabaseUrl, supabaseKey)
export const BUCKET = 'portfolio'

export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export interface PhotoItem {
  thumb: string
  full: string
  name: string
}

/**
 * List photos — tries thumb/full subfolders first, falls back to flat.
 */
export async function listPhotos(folder: string): Promise<PhotoItem[]> {
  const { data: thumbData } = await supabase.storage
    .from(BUCKET)
    .list(`${folder}/thumb`, { limit: 500, sortBy: { column: 'name', order: 'asc' } })

  if (thumbData && thumbData.length > 0) {
    return thumbData
      .filter((f) => !f.name.startsWith('.') && f.name !== '.emptyFolderPlaceholder')
      .map((f) => ({
        thumb: getPublicUrl(`${folder}/thumb/${f.name}`),
        full: getPublicUrl(`${folder}/full/${f.name}`),
        name: f.name,
      }))
  }

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(folder, { limit: 500, sortBy: { column: 'name', order: 'asc' } })

  if (error || !data) return []

  return data
    .filter((f) => !f.name.startsWith('.') && f.name !== '.emptyFolderPlaceholder' && !f.id?.endsWith('/'))
    .map((f) => {
      const url = getPublicUrl(`${folder}/${f.name}`)
      return { thumb: url, full: url, name: f.name }
    })
}

export async function listVideos(): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list('videos', { limit: 100, sortBy: { column: 'name', order: 'asc' } })

  if (error || !data) return []

  return data
    .filter((f) => !f.name.startsWith('.') && f.name !== '.emptyFolderPlaceholder')
    .map((f) => getPublicUrl(`videos/${f.name}`))
}

export async function uploadPhoto(folder: string, file: File): Promise<string | null> {
  const safeName = file.name.replace(/\s+/g, '-')
  const path = `${folder}/${safeName}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: true })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  return getPublicUrl(path)
}
