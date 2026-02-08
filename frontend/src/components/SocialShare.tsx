'use client';

import { LinkedInIcon, FacebookIcon, XIcon } from './icons';

export default function SocialShare() {
    const handleShare = (platform: string) => {
        const shareUrl = window.location.href;
        const text = document.title;
        let url = '';

        switch (platform) {
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
                break;
        }

        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className="flex flex-col gap-6 lg:gap-4">
            <h3 className="text-base font-bold text-black">Share on</h3>
            <div className="flex flex-row items-center gap-8 lg:gap-4">
                {/* LinkedIn */}
                <button
                    onClick={() => handleShare('linkedin')}
                    className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label="Share on LinkedIn"
                >
                    <LinkedInIcon color="black" />
                </button>

                {/* Facebook */}
                <button
                    onClick={() => handleShare('facebook')}
                    className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label="Share on Facebook"
                >
                    <FacebookIcon color="black" />
                </button>

                {/* Twitter/X */}
                <button
                    onClick={() => handleShare('twitter')}
                    className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label="Share on X (Twitter)"
                >
                    <XIcon color="black" />
                </button>
            </div>
        </div>
    );
}
