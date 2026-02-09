'use client';

import { useState, useRef, useEffect } from 'react';
import { createRelatedPost } from '@/lib/api';
import { CloseIcon, UploadIcon } from './icons';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type ModalState = 'default' | 'loading' | 'error' | 'success';

export default function NewPostModal({
  isOpen,
  onClose,
  onSuccess,
}: NewPostModalProps) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [modalState, setModalState] = useState<ModalState>('default');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a JPG, JPEG, PNG, GIF, or WEBP image');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }
      setImage(file);
      setError('');
    }
  };

  const handleUploadClick = () => {
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileChange(file);
    // Reset input so the same file can be re-selected
    e.target.value = '';
  };

  const handleConfirm = () => {
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    if (image) {
      uploadFile(image);
    } else {
      handleUploadClick();
    }
  };

  const uploadFile = async (file: File) => {
    setModalState('loading');
    setUploadProgress(0);
    setError('');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      progressIntervalRef.current = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
            }
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('image', file);

      await createRelatedPost(formData, controller.signal);

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      setUploadProgress(100);
      setModalState('success');

      setTimeout(() => {
        onSuccess();
        handleReset();
      }, 2000);
    } catch (err) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      setModalState('error');
      setError('Failed to upload your file');
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setModalState('default');
    setUploadProgress(0);
    setImage(null);
  };

  const handleRetry = () => {
    if (image) {
      uploadFile(image);
    }
  };

  const handleReset = () => {
    setTitle('');
    setImage(null);
    setModalState('default');
    setUploadProgress(0);
    setError('');
  };

  const handleClose = () => {
    if (modalState !== 'loading') {
      handleReset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[330px] md:max-w-[640px] h-[600px] md:h-auto bg-[#D8F34E] border-[3px] border-black p-6 md:p-10 flex flex-col items-center justify-center overflow-y-auto"
        style={{ boxShadow: '10px 10px 0px #000000' }}
      >
        {/* Close Button */}
        <div className="w-full max-w-[560px] flex justify-end p-[10px] h-[48px] md:h-[68px]">
          <button
            onClick={handleClose}
            disabled={modalState === 'loading'}
            className="w-8 h-8 md:w-12 md:h-12 relative hover:opacity-70 transition-opacity disabled:opacity-50"
          >
            <CloseIcon className="w-full h-full" />
          </button>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-[560px] flex flex-col items-center gap-6 md:gap-10">
          {modalState === 'success' ? (
            // Success State
            <div className="flex flex-col items-center gap-12 w-full">
              <div className="text-center">
                <h2
                  className="text-[35px] font-medium leading-[120%] text-[#240F35]"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  Your post was<br />successfully uploaded!
                </h2>
              </div>

              <button
                onClick={handleClose}
                className="btn-base btn-primary-black"
                style={{ width: '109px' }}
              >
                Done
              </button>
            </div>
          ) : (
            // Default/Loading/Error States
            <>
              {/* Title */}
              <div className="text-center w-full flex flex-col items-center gap-4 md:gap-6 px-0 md:px-10">
                <div className="flex flex-col items-center gap-4 md:gap-6 max-w-[480px]">
                  <h2
                    className="text-[24px] md:text-[35px] font-medium leading-[120%] text-[#240F35] text-center"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    Upload your post
                  </h2>
                  <p
                    className="text-sm md:text-lg leading-[180%] text-[#595959] text-center font-normal"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col items-center w-full gap-4 md:gap-6">
                {/* Input Field */}
                <div className="w-full max-w-[250px] md:max-w-[400px]">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (error && e.target.value.trim()) {
                        setError('');
                      }
                    }}
                    placeholder="Post Title*"
                    disabled={modalState === 'loading'}
                    className={`w-full h-[56px] px-4 py-2 bg-white border-2 text-base font-medium text-black placeholder:text-[#8C8C8C] focus:outline-none disabled:opacity-50 ${error && modalState === 'default' ? 'border-[#FF2F2F]' : 'border-black'
                      }`}
                    style={{
                      fontFamily: 'Space Grotesk',
                      borderRadius: '0px'
                    }}
                  />
                  {/* Error Message */}
                  {error && modalState === 'default' && (
                    <p className="text-[#FF2F2F] text-sm mt-1">{error}</p>
                  )}
                </div>

                {/* Upload Button or Progress */}
                {modalState === 'default' ? (
                  <>
                    <button
                      onClick={handleUploadClick}
                      className="btn-base btn-secondary-outline w-full max-w-[250px] md:max-w-[400px] flex items-center justify-center gap-2"
                    >
                      {image ? image.name : 'Upload image'}
                      <UploadIcon />
                    </button>
                  </>
                ) : (
                  <div className="w-full max-w-[250px] md:max-w-[400px] flex flex-col items-end gap-2">
                    <div className="w-full flex flex-col gap-[18px]">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-base font-medium text-black"
                          style={{ fontFamily: 'Space Grotesk' }}
                        >
                          {modalState === 'loading' ? `Loading image ${uploadProgress}%` : 'Failed to upload your file'}
                        </span>
                      </div>
                      <div className="relative w-full h-[10px]">
                        <div className="absolute w-full h-[10px] bg-[#8C8C8C]" />
                        <div
                          className={`absolute h-[10px] transition-all duration-300 ${modalState === 'error' ? 'bg-[#FF2F2F]' : 'bg-black'
                            }`}
                          style={{ width: modalState === 'error' ? '100%' : `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={modalState === 'loading' ? handleCancel : handleRetry}
                      className="text-base font-semibold text-black hover:opacity-70 transition-opacity"
                      style={{ fontFamily: 'Space Grotesk' }}
                    >
                      {modalState === 'loading' ? 'Cancel' : 'Retry'}
                    </button>
                  </div>
                )}

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileSelected}
                  className="hidden"
                />

                {/* Confirm Button */}
                {modalState === 'default' && (
                  <button
                    onClick={handleConfirm}
                    className="btn-base btn-primary-black"
                    style={{ width: '132px' }}
                  >
                    Confirm
                  </button>
                )}

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
