import fs from 'fs'

/**
 * Reads only the first chunk of a file (enough to contain the image header)
 * instead of loading the whole file into memory.
 */
function readHeaderChunk(filePath: string, size = 65536): Buffer {
  const fd = fs.openSync(filePath, 'r')
  try {
    const stats = fs.fstatSync(fd)
    const length = Math.min(size, stats.size)
    const buffer = Buffer.alloc(length)
    fs.readSync(fd, buffer, 0, length, 0)
    return buffer
  } finally {
    fs.closeSync(fd)
  }
}

interface Dimensions {
  width: number
  height: number
}

function getJpegDimensions(buffer: Buffer): Dimensions | null {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null

  let offset = 2
  while (offset + 3 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset++
      continue
    }
    const marker = buffer[offset + 1]

    // Padding byte between markers
    if (marker === 0xff) {
      offset++
      continue
    }

    // Markers with no payload (SOI/EOI/RST0-7/TEM)
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      offset += 2
      continue
    }

    if (offset + 4 > buffer.length) break
    const length = buffer.readUInt16BE(offset + 2)

    const isSOF =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc

    if (isSOF) {
      if (offset + 9 > buffer.length) break
      const height = buffer.readUInt16BE(offset + 5)
      const width = buffer.readUInt16BE(offset + 7)
      return { width, height }
    }

    // Start of Scan: headers are done, no point scanning further
    if (marker === 0xda) break

    offset += 2 + length
  }
  return null
}

function getPngDimensions(buffer: Buffer): Dimensions | null {
  if (buffer.length < 24) return null
  const isPng = buffer[0] === 0x89 && buffer.toString('ascii', 1, 4) === 'PNG'
  if (!isPng) return null
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

/**
 * Returns true if the image at filePath is taller than it is wide (portrait/vertical).
 * Supports JPEG and PNG headers. Fails safe (returns false) for any other
 * format or read error.
 */
export function isVerticalImage(filePath: string): boolean {
  try {
    const buffer = readHeaderChunk(filePath)
    const dims = getJpegDimensions(buffer) ?? getPngDimensions(buffer)
    if (!dims || !dims.width || !dims.height) return false
    return dims.height > dims.width
  } catch {
    return false
  }
}
