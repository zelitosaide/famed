"use client"

import { Facebook, Linkedin, Twitter } from "lucide-react"

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedDescription = encodeURIComponent(title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedDescription}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedDescription}%20${encodedUrl}`,
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url)
      // toast({
      //   title: "Link copied to clipboard",
      //   description: "You can now paste it anywhere",
      // })
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => window.open(shareLinks.facebook, "_blank")}
        // aria-label="Share on Facebook"
      >
        <div className="px-2 py-1 rounded-md border flex items-center gap-1 hover:bg-gray-100">
          <Facebook className="w-4 h-4" />
          <span className="sr-only md:not-sr-only md:inline-block">Facebook</span>
        </div>
      </Button>

      <Button
        onClick={() => window.open(shareLinks.twitter, "_blank")}
        // aria-label="Share on X (Twitter)"
      >
        <div className="px-2 py-1 rounded-md border flex items-center gap-1 hover:bg-gray-100">
          <Twitter className="w-4 h-4" />
          <span className="sr-only md:not-sr-only md:inline-block">Twitter</span>
        </div>
      </Button>

      <Button
        onClick={() => window.open(shareLinks.linkedin, "_blank")}
        // aria-label="Share on LinkedIn"
      >
        <div className="px-2 py-1 rounded-md border flex items-center gap-1 hover:bg-gray-100">
          <Linkedin className="w-4 h-4" />
          <span className="sr-only md:not-sr-only md:inline-block">LinkedIn</span>
        </div>
      </Button>

      <Button
        onClick={() => window.open(shareLinks.whatsapp, "_blank")}
        // aria-label="Share on WhatsApp"
      >
        <div className="px-2 py-1 rounded-md border flex items-center gap-1 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700">
          <WhatsAppIcon className="w-4 h-4" />
          <span className="sr-only md:not-sr-only md:inline-block">WhatsApp</span>
        </div>
      </Button>
    </div>
  )
}

// Custom WhatsApp icon component
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  )
}

interface ButtonProps {
  children: React.ReactNode,
  onClick: () => void
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button 
      className="cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  )
}