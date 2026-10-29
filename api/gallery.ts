import fs from 'node:fs';
import path from 'node:path';
import {
  parseCookies,
  verifySessionToken,
  parseJsonBody,
  normalizeResponse
} from './_security.js';

interface ProjectMetadata {
  id: string;
  title: string;
  category: string;
  filterCategory: string;
  typeLabel?: string;
  location: string;
  year: string;
  areaSqFt: string;
  heroImage: string;
  gallery: string[];
  [key: string]: any;
}

const GITHUB_REPO = process.env.GITHUB_REPO || 'Priyanshu-95/skumar-website';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Local paths for development fallback
const LOCAL_PROJECTS_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'projects.json');
const LOCAL_PUBLIC_DIR = path.join(process.cwd(), 'public');

/**
 * Load project metadata either from local disk or GitHub repository
 */
async function loadProjectsMetadata(): Promise<{ projects: ProjectMetadata[]; sha?: string }> {
  if (GITHUB_TOKEN) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/projects.json?ref=${GITHUB_BRANCH}`,
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
          projects: JSON.parse(contentStr),
          sha: data.sha
        };
      }
    } catch (err) {
      console.warn('Failed to fetch projects.json from GitHub, falling back to local file:', err);
    }
  }

  // Fallback to local filesystem
  if (fs.existsSync(LOCAL_PROJECTS_JSON_PATH)) {
    const raw = fs.readFileSync(LOCAL_PROJECTS_JSON_PATH, 'utf8');
    return { projects: JSON.parse(raw) };
  }

  return { projects: [] };
}

/**
 * Save project metadata back to GitHub or local disk
 */
async function saveProjectsMetadata(
  projects: ProjectMetadata[],
  commitMessage: string,
  existingSha?: string
): Promise<{ success: boolean; error?: string }> {
  const contentString = JSON.stringify(projects, null, 2);

  if (GITHUB_TOKEN) {
    try {
      // If we don't have SHA, fetch latest SHA
      let sha = existingSha;
      if (!sha) {
        const getRes = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/projects.json?ref=${GITHUB_BRANCH}`,
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
        `https://api.github.com/repos/${GITHUB_REPO}/contents/src/data/projects.json`,
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
        return { success: false, error: errData.message || 'GitHub API error saving metadata' };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error updating GitHub metadata' };
    }
  }

  // Local filesystem write
  try {
    fs.writeFileSync(LOCAL_PROJECTS_JSON_PATH, contentString, 'utf8');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Local filesystem write error' };
  }
}

/**
 * Commit or write an image file
 */
async function commitImageFile(
  projectId: string,
  filename: string,
  fileBase64: string
): Promise<{ success: boolean; imagePath?: string; error?: string }> {
  const repoFilePath = `public/projects/${projectId}/${filename}`;
  const publicImagePath = `/projects/${projectId}/${filename}`;

  if (GITHUB_TOKEN) {
    try {
      // Check if file already exists to prevent silent overwrite
      const checkRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${repoFilePath}?ref=${GITHUB_BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'skumar-website-gallery-manager'
          }
        }
      );

      let sha: string | undefined;
      if (checkRes.ok) {
        const existingData = await checkRes.json();
        sha = existingData.sha;
      }

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
            message: `Add project image ${filename} to ${projectId}`,
            content: fileBase64,
            sha, // If existing, updates with sha; if new, omitted
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
    const targetDir = path.join(LOCAL_PUBLIC_DIR, 'projects', projectId);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetPath = path.join(targetDir, filename);
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

  // 1. Rigorous session verification for every action
  const cookies = parseCookies(req);
  const sessionToken = cookies['gallery_session'];
  if (!verifySessionToken(sessionToken)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Valid administrator session required'
    });
  }

  const method = req.method?.toUpperCase();

  // 2. GET: Retrieve list of projects, galleries, and deployment status
  if (method === 'GET') {
    try {
      const { projects } = await loadProjectsMetadata();
      return res.status(200).json({
        success: true,
        projects: projects.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          filterCategory: p.filterCategory,
          heroImage: p.heroImage,
          gallery: p.gallery || []
        })),
        storageMode: GITHUB_TOKEN ? 'github' : 'local',
        repo: GITHUB_REPO,
        branch: GITHUB_BRANCH
      });
    } catch (_err) {
      return res.status(500).json({
        success: false,
        error: 'Failed to retrieve project gallery list'
      });
    }
  }

  // 3. POST: Upload & Add new image to a project gallery
  if (method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { projectId, filename, fileData, mimeType } = body;

      if (!projectId || !filename || !fileData) {
        return res.status(400).json({
          success: false,
          error: 'Missing required parameters (projectId, filename, fileData)'
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

      // Sanitize filename to prevent directory traversal
      const rawExt = path.extname(filename).toLowerCase();
      const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
      const ext = validExtensions.includes(rawExt) ? rawExt : '.webp';
      const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      
      // Clean unique filename (never overwrite silently)
      const timestamp = Date.now();
      const cleanFilename = `${baseName}_${timestamp}${ext}`;

      // Clean base64 string
      const base64Data = fileData.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

      // Check file size (max 10MB in bytes = ~14MB base64)
      if (base64Data.length > 14 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          error: 'Image file size exceeds maximum limit of 10MB.'
        });
      }

      // Verify that project exists
      const { projects, sha } = await loadProjectsMetadata();
      const projectIndex = projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) {
        return res.status(404).json({
          success: false,
          error: `Project with ID "${projectId}" not found.`
        });
      }

      // 1. Commit image file
      const commitRes = await commitImageFile(projectId, cleanFilename, base64Data);
      if (!commitRes.success || !commitRes.imagePath) {
        return res.status(500).json({
          success: false,
          error: commitRes.error || 'Failed to save image file.'
        });
      }

      // 2. Append new image path to project gallery metadata
      if (!Array.isArray(projects[projectIndex].gallery)) {
        projects[projectIndex].gallery = [];
      }
      projects[projectIndex].gallery.push(commitRes.imagePath);

      // 3. Save updated metadata
      const metaRes = await saveProjectsMetadata(
        projects,
        `Add gallery photo ${cleanFilename} to ${projectId}`,
        sha
      );

      if (!metaRes.success) {
        return res.status(500).json({
          success: false,
          error: metaRes.error || 'Failed to update project gallery metadata.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Image successfully uploaded and added to project gallery.',
        imagePath: commitRes.imagePath,
        gallery: projects[projectIndex].gallery,
        mode: GITHUB_TOKEN ? 'github' : 'local'
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err.message || 'Internal server error during image upload'
      });
    }
  }

  // 4. DELETE: Remove image from project gallery
  if (method === 'DELETE') {
    try {
      const body = await parseJsonBody(req);
      const { projectId, imagePath } = body;

      if (!projectId || !imagePath) {
        return res.status(400).json({
          success: false,
          error: 'Missing required parameters (projectId, imagePath)'
        });
      }

      const { projects, sha } = await loadProjectsMetadata();
      const projectIndex = projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) {
        return res.status(404).json({
          success: false,
          error: `Project with ID "${projectId}" not found.`
        });
      }

      const project = projects[projectIndex];
      if (!Array.isArray(project.gallery) || !project.gallery.includes(imagePath)) {
        return res.status(404).json({
          success: false,
          error: 'The specified image was not found in this project gallery.'
        });
      }

      // Remove image reference from gallery
      project.gallery = project.gallery.filter((img) => img !== imagePath);

      // Save updated metadata
      const metaRes = await saveProjectsMetadata(
        projects,
        `Remove gallery photo ${path.basename(imagePath)} from ${projectId}`,
        sha
      );

      if (!metaRes.success) {
        return res.status(500).json({
          success: false,
          error: metaRes.error || 'Failed to update project gallery metadata'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Image removed from gallery successfully.',
        gallery: project.gallery
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err.message || 'Internal server error during image removal'
      });
    }
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({
    success: false,
    error: 'Method Not Allowed'
  });
}
