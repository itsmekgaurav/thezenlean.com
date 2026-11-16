import Image from "next/image";

// A real screenshot of the app in a plain iPhone outline. Screens come from the app's own
// screenshot repository, refreshed on every release; never mocked.
export function Phone({ shot, alt, priority = false, className = "" }: { shot: string; alt: string; priority?: boolean; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        <Image
          src={`/shots/${shot}-1320.webp`}
          alt={alt}
          width={1320}
          height={2868}
          sizes="(max-width: 760px) 70vw, 340px"
          priority={priority}
        />
      </div>
    </div>
  );
}

export const APP_STORE_URL = "https://apps.apple.com/app/zen-lean-calorie-tracker/id6763917700";

export function StoreButton({ label = "Download on the App Store" }: { label?: string }) {
  return (
    <a className="store" href={APP_STORE_URL} target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.5zM14.2 6.1c.6-.73 1.01-1.74.9-2.75-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.22z"
        />
      </svg>
      <span>{label}</span>
    </a>
  );
}
