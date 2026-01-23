import { FooterLinks } from "../footer-links/footer-links";

export const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-[#2f3439] to-[#4a4f55] border-t border-black/30">
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-6">
        <FooterLinks />

        <div className="flex justify-center gap-6">
          <a href="https://steam.com" aria-label="Steam">
            <img
              src="/social-icons/SteamIcon.svg"
              alt="Steam"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>

          <a href="https://github.com" aria-label="GitHub">
            <img
              src="/social-icons/GithubIcon.svg"
              alt="GitHub"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>

          <a href="https://linkedin.com" aria-label="LinkedIn">
            <img
              src="/social-icons/LinkedinIcon.svg"
              alt="LinkedIn"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>

          <a href="https://youtube.com" aria-label="YouTube">
            <img
              src="/social-icons/YoutubeIcon.svg"
              alt="YouTube"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
