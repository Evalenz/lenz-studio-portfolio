import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qomhlvrrosqxqvqxmzqz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbWhsdnJyb3NxeHF2cXhtenF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4Nzg3NzcsImV4cCI6MjA4NTQ1NDc3N30.LfSXRWJqM7Qf9XZ_319Ew1ui-0S7aneR-VQzKCFa3cU'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const BUCKET = 'portfolio'

/**
 * Get the public URL for a file in the portfolio bucket
 */
export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * List all files in a folder within the portfolio bucket
 */
export async function listPhotos(folder: string): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(folder, {
      limit: 500,
      sortBy: { column: 'name', order: 'asc' },
    })

  if (error || !data) return []

  return data
    .filter((f) => !f.id?.endsWith('/') && f.name !== '.emptyFolderPlaceholder')
    .map((f) => getPublicUrl(`${folder}/${f.name}`))
}

/**
 * Upload a file to the portfolio bucket
 */
export async function uploadPhoto(
  folder: string,
  file: File
): Promise<string | null> {
  const safeName = file.name.replace(/\s+/g, '-')
  const path = `${folder}/${safeName}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  return getPublicUrl(path)
}
