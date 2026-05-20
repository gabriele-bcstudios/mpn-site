import Link from "next/link";

const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "Students", href: "/students" },
  { label: "Become a Tutor", href: "/become-a-tutor" },
  { label: "Legal", href: "/legal" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-10 md:py-16">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Contatti</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            MPN Language Platform
            <br />
            support@mpnplatform.com
            <br />
            +44 20 0000 0000
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">Link utili</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">Policy</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
