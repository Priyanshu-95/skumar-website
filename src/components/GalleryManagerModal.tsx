import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  UploadCloud,
  Trash2,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  GitCommit,
  ShieldCheck
} from 'lucide-react';
import type { Project } from '../types';

interface GalleryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGalleryUpdated?: () => void;
  initialProjectId?: string;
}

interface ProjectGalleryItem {
  id: string;
  title: string;
  category: string;
  filterCategory: string;
  heroImage: string;
  gallery: string[];
}

export const GalleryManagerModal: React.FC<GalleryManagerModalProps> = ({
  isOpen,
  onClose,
  onGalleryUpdated,
  initialProjectId
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Gallery management state
  const [projects, setProjects] = useState<ProjectGalleryItem[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false);
  const [storageMode, setStorageMode] = useState<string>('local');
  const [repoInfo, setRepoInfo] = useState<string>('');

  // Upload state
  const [pendingFiles, setPendingFiles] = useState<{ file: File; preview: string }[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Delete confirmation modal state
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch projects data
  const fetchGalleryData = React.useCallback(async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch('/api/gallery', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
        setStorageMode(data.storageMode || 'local');
        if (data.repo) setRepoInfo(`${data.repo} (${data.branch})`);

        // Select initial project or first project
        if (data.projects && data.projects.length > 0) {
          if (initialProjectId && data.projects.some((p: Project) => p.id === initialProjectId)) {
            setSelectedProjectId(initialProjectId);
          } else {
            setSelectedProjectId((prev) => prev || data.projects[0].id);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching gallery data:', err);
    } finally {
      setLoadingProjects(false);
    }
  }, [initialProjectId]);

  // Check auth status on modal open
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setAuthChecking(true);
    setAuthError(null);
    setActionSuccess(null);
    setActionError(null);

    fetch('/api/auth', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setIsAuthenticated(Boolean(data.authenticated));
          if (data.authenticated) {
            fetchGalleryData();
          }
          setAuthChecking(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsAuthenticated(false);
          setAuthChecking(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, fetchGalleryData]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
        fetchGalleryData();
      } else {
        setAuthError(data.error || 'Authentication failed. Please try again.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'logout' })
      });
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      setIsAuthenticated(false);
      setPendingFiles([]);
      setActionSuccess(null);
      setActionError(null);
      onClose();
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setActionSuccess(null);
    setActionError(null);

    const validNewFiles: { file: File; preview: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Size limit: 10MB
      if (file.size > 10 * 1024 * 1024) {
        setActionError(`File "${file.name}" exceeds the 10MB size limit.`);
        continue;
      }
      validNewFiles.push({
        file,
        preview: URL.createObjectURL(file)
      });
    }

    setPendingFiles((prev) => [...prev, ...validNewFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePendingFile = (index: number) => {
    setPendingFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Upload all pending files
  const handleUploadAll = async () => {
    if (pendingFiles.length === 0 || !selectedProjectId) return;

    setUploading(true);
    setActionSuccess(null);
    setActionError(null);
    setUploadProgress(`Uploading 1 of ${pendingFiles.length}...`);

    let uploadedCount = 0;

    for (let i = 0; i < pendingFiles.length; i++) {
      const { file } = pendingFiles[i];
      setUploadProgress(`Uploading ${i + 1} of ${pendingFiles.length}: ${file.name}...`);

      try {
        const base64 = await readFileAsBase64(file);
        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            projectId: selectedProjectId,
            filename: file.name,
            fileData: base64,
            mimeType: file.type
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          uploadedCount++;
          // Update local state gallery
          setProjects((prev) =>
            prev.map((p) =>
              p.id === selectedProjectId ? { ...p, gallery: data.gallery } : p
            )
          );
        } else {
          setActionError(data.error || `Failed to upload "${file.name}".`);
          break;
        }
      } catch (err: any) {
        setActionError(err.message || `Network error uploading "${file.name}".`);
        break;
      }
    }

    setUploading(false);
    setUploadProgress('');

    if (uploadedCount > 0) {
      setPendingFiles([]);
      setActionSuccess(
        `${uploadedCount} image${uploadedCount > 1 ? 's' : ''} added successfully! ${
          storageMode === 'github'
            ? 'Committed to repository. Vercel deployment triggered and will be live in 1–2 minutes.'
            : 'Changes saved.'
        }`
      );
      if (onGalleryUpdated) onGalleryUpdated();
    }
  };

  // Handle Image Deletion
  const confirmDeleteImage = async () => {
    if (!imageToDelete || !selectedProjectId) return;

    setDeleting(true);
    setActionSuccess(null);
    setActionError(null);

    try {
      const res = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          projectId: selectedProjectId,
          imagePath: imageToDelete
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === selectedProjectId ? { ...p, gallery: data.gallery } : p
          )
        );
        setActionSuccess('Image removed from gallery successfully.');
        setImageToDelete(null);
        if (onGalleryUpdated) onGalleryUpdated();
      } else {
        setActionError(data.error || 'Failed to remove image.');
      }
    } catch {
      setActionError('Network error while removing image.');
    } finally {
      setDeleting(false);
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  if (!isOpen) return null;

  const currentProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="fixed inset-0 z-[120] bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#F8F5EF] text-[#171717] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#F5F1E8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#B89563]/15 text-[#B89563] flex items-center justify-center border border-[#B89563]/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-[#171717] flex items-center gap-2">
                Project Gallery Manager
                {isAuthenticated && (
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Authenticated
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-[#78716c]">
                {isAuthenticated
                  ? 'Add and remove photos for completed portfolio projects.'
                  : 'Enter password to access project image manager.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-red-600 hover:bg-stone-200/60 rounded-full transition-colors"
                title="Log out of session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* 1. AUTH CHECKING / LOGIN SCREEN */}
          {authChecking ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-6 h-6 text-[#B89563] animate-spin mx-auto" />
              <p className="text-xs text-stone-500 font-mono">Verifying secure session...</p>
            </div>
          ) : !isAuthenticated ? (
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#B89563]/10 border border-[#B89563]/30 text-[#B89563] flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[#171717]">Authentication Required</h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  This protected interface allows authorized managers to update portfolio photos without developer assistance.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block">
                    Manager Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter administrator password..."
                      autoFocus
                      required
                      className="w-full px-4 py-2.5 pr-10 text-xs bg-white border border-stone-300 rounded-xl text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading || !password}
                  className="w-full py-3 bg-[#B89563] text-white text-xs font-semibold tracking-label rounded-xl hover:bg-[#171717] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>VERIFYING...</span>
                    </>
                  ) : (
                    <span>UNLOCK GALLERY MANAGER</span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* 2. AUTHENTICATED MANAGER INTERFACE */
            <div className="space-y-6">
              {/* Feedback Toasts */}
              {actionSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <span className="font-semibold block">Update Successful</span>
                    <span>{actionSuccess}</span>
                  </div>
                </div>
              )}

              {actionError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <span className="font-semibold block">Notice</span>
                    <span>{actionError}</span>
                  </div>
                </div>
              )}

              {/* Project Selection & Meta Bar */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">
                    Select Project to Manage
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => {
                      setSelectedProjectId(e.target.value);
                      setActionSuccess(null);
                      setActionError(null);
                    }}
                    className="px-3.5 py-2 text-xs bg-[#F8F5EF] border border-stone-300 rounded-xl font-medium text-[#171717] focus:outline-none focus:border-[#B89563]"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.gallery?.length || 0} photos)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-lg border border-stone-200">
                    <GitCommit className="w-3.5 h-3.5 text-[#B89563]" />
                    <span>Mode: {storageMode === 'github' ? 'GitHub Sync' : 'Local Dev'}</span>
                  </div>
                  {repoInfo && <span className="hidden md:inline truncate max-w-[200px]">{repoInfo}</span>}
                </div>
              </div>

              {/* Section A: Upload New Images */}
              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-[#B89563]" />
                    <h3 className="text-xs sm:text-sm font-semibold text-[#171717] uppercase tracking-wider">
                      Add New Photos to {currentProject?.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-stone-400">JPG, PNG, WebP up to 10MB</span>
                </div>

                {/* Dropzone / Upload button */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 hover:border-[#B89563] bg-[#F8F5EF]/60 hover:bg-[#F8F5EF] rounded-2xl p-6 text-center cursor-pointer transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <UploadCloud className="w-8 h-8 text-[#B89563] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#171717]">
                    Click to browse or drag and drop new photos
                  </p>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">
                    Select one or multiple images from your phone or computer
                  </p>
                </div>

                {/* Pending previews */}
                {pendingFiles.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#171717]">
                        Selected Photos Ready for Upload ({pendingFiles.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setPendingFiles([])}
                        className="text-[11px] text-red-600 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {pendingFiles.map((item, idx) => (
                        <div
                          key={idx}
                          className="relative h-24 rounded-xl overflow-hidden border border-stone-300 group bg-stone-100"
                        >
                          <img
                            src={item.preview}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePendingFile(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-sm hover:bg-red-700 transition-colors"
                            title="Remove from upload queue"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] px-1 py-0.5 truncate font-mono">
                            {item.file.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleUploadAll}
                        disabled={uploading}
                        className="px-6 py-2.5 bg-[#B89563] text-white text-xs font-bold tracking-label rounded-full hover:bg-[#171717] transition-all disabled:opacity-50 shadow-md flex items-center gap-2"
                      >
                        {uploading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>{uploadProgress || 'UPLOADING...'}</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>CONFIRM & SAVE PHOTOS</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Section B: Existing Project Photos Grid */}
              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B89563]" />
                    <h3 className="text-xs sm:text-sm font-semibold text-[#171717] uppercase tracking-wider">
                      Current Gallery Photos ({currentProject?.gallery?.length || 0})
                    </h3>
                  </div>
                  <span className="text-[11px] text-stone-400">
                    Click trash icon on any photo to remove
                  </span>
                </div>

                {loadingProjects ? (
                  <div className="py-12 text-center text-xs text-stone-500">
                    <RefreshCw className="w-5 h-5 text-[#B89563] animate-spin mx-auto mb-2" />
                    Loading photos...
                  </div>
                ) : !currentProject?.gallery || currentProject.gallery.length === 0 ? (
                  <div className="py-10 text-center text-xs text-stone-500 font-light">
                    No images in this gallery yet. Use the upload box above to add photos.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {currentProject.gallery.map((imgPath, idx) => {
                      const filename = imgPath.split('/').pop() || `Image ${idx + 1}`;
                      return (
                        <div
                          key={idx}
                          className="group relative h-36 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm hover:shadow-md transition-all"
                        >
                          <img
                            src={imgPath}
                            alt={filename}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] font-mono px-2 py-0.5 bg-black/60 text-white rounded-full">
                                #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => setImageToDelete(imgPath)}
                                className="p-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white shadow-md transition-colors"
                                title="Remove photo from gallery"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[10px] text-white/90 truncate font-mono">
                              {filename}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#F5F1E8] border-t border-stone-200 text-center text-[10px] text-stone-500 font-mono flex items-center justify-between">
          <span>S Kumar Construction & Interior</span>
          <span>Zero Database • Git Source of Truth</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {imageToDelete && (
        <div className="fixed inset-0 z-[130] bg-black/70 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-stone-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-[#171717]">Remove Photo?</h4>
              <p className="text-xs text-stone-500">
                Are you sure you want to remove this photo from the project gallery?
              </p>
              <p className="text-[10px] font-mono text-stone-400 break-all pt-1">
                {imageToDelete.split('/').pop()}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setImageToDelete(null)}
                disabled={deleting}
                className="flex-1 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteImage}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Removing...</span>
                  </>
                ) : (
                  <span>Yes, Remove</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagerModal;
