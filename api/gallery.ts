import fs from 'node:fs';
import path from 'node:path';
import {
  parseCookies,
  verifySessionToken,
  parseJsonBody,
  normalizeResponse
} from './_security.js';

const GITHUB_REPO = process.env.GITHUB_REPO || 'Priyanshu-95/skumar-website';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Local paths for development fallback
const LOCAL_GALLERY_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'gallery.json');
const LOCAL_GALLERY_DIR = path.join(process.cwd(), 'public', 'projects', 'gallery');

/**
 * Load gallery images list from GitHub repository or local disk
 */
async function loadGalleryImages(): Promise<{ images: string[]; sha?: string }> {
  if (GITHUB_TOKEN) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/gallery.json?ref=${GITHUB_BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'skumar-website-gallery-manager'
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        const contentStr = Buffer.from(data.content, 'base64').toString('utf8');
        return {
          images: JSON.parse(contentStr),
          sha: data.sha
        };
      }
    } catch (err) {
      console.warn('Failed to fetch gallery.json from GitHub, falling back to local file:', err);
    }
  }

  // Fallback to local filesystem
  if (fs.existsSync(LOCAL_GALLERY_JSON_PATH)) {
    const raw = fs.readFileSync(LOCAL_GALLERY_JSON_PATH, 'utf8');
    return { images: JSON.parse(raw) };
  }

  return { images: [] };
}

/**
 * Save gallery images list back to GitHub or local disk
 */
async function saveGalleryImages(
  images: string[],
  commitMessage: string,
  existingSha?: string
): Promise<{ success: boolean; error?: string }> {
  const contentString = JSON.stringify(images, null, 2);

  if (GITHUB_TOKEN) {
    try {
      let sha = existingSha;
      if (!sha) {
        const getRes = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/gallery.json?ref=${GITHUB_BRANCH}`,
          {
            headers: {
              Authorization: `Bearer ${GITHUB_TOKEN}`,
              Accept: 'application/vnd.github+json',
              'User-Agent': 'skumar-website-gallery-manager'
            }
          }
        );
        if (getRes.ok) {
          const getData = await getRes.json();
          sha = getData.sha;
        }
      }

      const putRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/gallery.json`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'skumar-website-gallery-manager',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: commitMessage,
            content: Buffer.from(contentString, 'utf8').toString('base64'),
            sha,
            branch: GITHUB_BRANCH
          })
        }
      );

      if (!putRes.ok) {
        const errData = await putRes.json();
        return { success: false, error: errData.message || 'GitHub API error saving gallery metadata' };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error updating GitHub gallery metadata' };
    }
  }

  // Local filesystem write
  try {
    fs.writeFileSync(LOCAL_GALLERY_JSON_PATH, contentString, 'utf8');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Local filesystem write error' };
  }
}

/**
 * Commit image file to GitHub or local disk
 */
async function commitImageFile(
  filename: string,
  fileBase64: string
): Promise<{ success: boolean; imagePath?: string; error?: string }> {
  const repoFilePath = `public/projects/gallery/${filename}`;
  const publicImagePath = `/projects/gallery/${filename}`;

  if (GITHUB_TOKEN) {
    try {
      const putRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${repoFilePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'skumar-website-gallery-manager',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Upload showcase photo: ${filename}`,
            content: fileBase64,
            branch: GITHUB_BRANCH
          })
        }
      );

      if (!putRes.ok) {
        const errData = await putRes.json();
        return { success: false, error: errData.message || 'Failed to commit image to GitHub' };
      }

      return { success: true, imagePath: publicImagePath };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error committing image to GitHub' };
    }
  }

  // Local fallback
  try {
    if (!fs.existsSync(LOCAL_GALLERY_DIR)) {
      fs.mkdirSync(LOCAL_GALLERY_DIR, { recursive: true });
    }
    const targetPath = path.join(LOCAL_GALLERY_DIR, filename);
    const buffer = Buffer.from(fileBase64, 'base64');
    fs.writeFileSync(targetPath, buffer);
    return { success: true, imagePath: publicImagePath };
  } catch (err: any) {
    return { success: false, error: err.message || 'Local filesystem error writing image' };
  }
}

export default async function handler(req: any, res: any) {
  normalizeResponse(res);
  res.setHeader('Content-Type', 'application/json');

  // 1. Session check on EVERY operation
  const cookies = parseCookies(req);
  const sessionToken = cookies['gallery_session'];
  if (!verifySessionToken(sessionToken)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Valid administrator session required'
    });
  }

  const method = req.method?.toUpperCase();

  // 2. GET: Retrieve list of all gallery photos
  if (method === 'GET') {
    try {
      const { images } = await loadGalleryImages();
      return res.status(200).json({
        success: true,
        images,
        storageMode: GITHUB_TOKEN ? 'github' : 'local',
        repo: GITHUB_REPO,
        branch: GITHUB_BRANCH
      });
    } catch {
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve gallery photos'
      });
    }
  }

  // 3. POST: Upload & Add new photo to the unified showcase gallery
  if (method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { filename, fileData, mimeType } = body;

      if (!filename || !fileData) {
        return res.status(400).json({
          success: false,
          error: 'Missing required parameters (filename, fileData)'
        });
      }

      // Validate allowed MIME types
      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
      if (mimeType && !allowedMimes.includes(mimeType.toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: 'Unsupported image format. Allowed formats: JPG, PNG, and WebP.'
        });
      }

      // Sanitize filename
      const rawExt = path.extname(filename).toLowerCase();
      const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
      const ext = validExtensions.includes(rawExt) ? rawExt : '.webp';
      const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const cleanFilename = `showcase_${Date.now()}_${baseName}${ext}`;

      // Clean base64 string
      const base64Data = fileData.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

      // Max 10MB limit
      if (base64Data.length > 14 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          error: 'Image file size exceeds maximum limit of 10MB.'
        });
      }

      // 1. Commit image file
      const commitRes = await commitImageFile(cleanFilename, base64Data);
      if (!commitRes.success || !commitRes.imagePath) {
        return res.status(500).json({
          success: false,
          error: commitRes.error || 'Failed to save image file.'
        });
      }

      // 2. Add new photo to gallery list (at the beginning so latest uploads appear first)
      const { images, sha } = await loadGalleryImages();
      const updatedImages = [commitRes.imagePath, ...images];

      // 3. Save updated gallery.json
      const metaRes = await saveGalleryImages(
        updatedImages,
        `Add showcase photo ${cleanFilename}`,
        sha
      );

      if (!metaRes.success) {
        return res.status(500).json({
          success: false,
          error: metaRes.error || 'Failed to update gallery list.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Photo uploaded and added to showcase gallery successfully.',
        imagePath: commitRes.imagePath,
        images: updatedImages,
        mode: GITHUB_TOKEN ? 'github' : 'local'
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err.message || 'Internal server error during upload'
      });
    }
  }

  // 4. DELETE: Remove photo from the showcase gallery
  if (method === 'DELETE') {
    try {
      const body = await parseJsonBody(req);
      const { imagePath } = body;

      if (!imagePath) {
        return res.status(400).json({
          success: false,
          error: 'Missing required parameter: imagePath'
        });
      }

      const { images, sha } = await loadGalleryImages();
      if (!images.includes(imagePath)) {
        return res.status(404).json({
          success: false,
          error: 'The specified image was not found in the gallery.'
        });
      }

      // Filter out image
      const updatedImages = images.filter((img) => img !== imagePath);

      // Save updated gallery.json
      const metaRes = await saveGalleryImages(
        updatedImages,
        `Remove showcase photo ${path.basename(imagePath)}`,
        sha
      );

      if (!metaRes.success) {
        return res.status(500).json({
          success: false,
          error: metaRes.error || 'Failed to update gallery list.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Photo removed from gallery successfully.',
        images: updatedImages
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err.message || 'Internal server error during photo removal'
      });
    }
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({
    success: false,
    error: 'Method Not Allowed'
  });
}
