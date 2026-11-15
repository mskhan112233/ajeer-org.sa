import React from 'react';
import { useAppAssets } from '@/hooks/useAppAssets';

/**
 * Reusable footer government & partner logos for Desktop and Mobile viewports
 */
export default function FooterPartners({ data = {} }) {
  const { assets } = useAppAssets();
  const mlsdUrl = data.footerMlsdUrl || "https://mlsd.gov.sa/";
  const takamolUrl = data.footerTakamolUrl || "https://takamolholding.com/";
  const tamkeenUrl = data.footerTamkeenUrl || "https://tamkeentech.sa/";
  const stampUrl = data.footerDigitalStampUrl || "https://raqmi.dga.gov.sa/platforms/DigitalStamp/ShowCertificate/441";

  return (
    <div className="col-12 col-md-12 col-lg-6">
      <div>
        {/* Desktop View */}
        <div className="d-none d-md-block">
          <div className="d-flex flex-row align-items-center">
            <div className="p-2">
              <div className="mainFooter__topNavLogo px-3">
                <a href={mlsdUrl} target="_blank" rel="noopener noreferrer">
                  <img src={assets.mlsdLogo} alt="MLSD" height="50" />
                </a>
              </div>
            </div>
            <div className="p-2">
              <div className="mainFooter__topNavLogo px-3">
                <a href={takamolUrl} target="_blank" rel="noopener noreferrer">
                  <img src={assets.takamolLogo} alt="Takamol" height="50" />
                </a>
              </div>
            </div>
            <div className="p-2 footer-border-desktop">
              <div className="mainFooter__topNavLogo px-3">
                <a href={tamkeenUrl} target="_blank" rel="noopener noreferrer">
                  <img src={assets.tamkeenLogo} alt="Tamkeen" height="50" />
                </a>
              </div>
            </div>
            <div className="p-2">
              <div className="mainFooter__topNavLogo px-1">
                <a href={stampUrl} target="_blank" rel="noopener noreferrer">
                  <img src={assets.digitalStamp} alt="Digital Stamp" className="footer-stamp-logo" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="d-block d-md-none">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="p-2 footer-border-mobile">
              <div className="mainFooter__topNavLogo px-3">
                <a href={mlsdUrl} target="_blank" rel="noopener noreferrer">
                  <img src={assets.mlsdLogo} alt="MLSD" height="50" />
                </a>
              </div>
              <div className="mainFooter__topNavLogo px-3">
                <a href={takamolUrl} target="_blank" rel="noopener noreferrer">
                  <img src={assets.takamolLogo} alt="Takamol" height="50" />
                </a>
              </div>
              <div className="mainFooter__topNavLogo px-3">
                <a href={tamkeenUrl} target="_blank" rel="noopener noreferrer">
                  <img src={assets.tamkeenLogo} alt="Tamkeen" height="50" />
                </a>
              </div>
            </div>
            <div className="w-50">
              <div className="p-2">
                <div className="mainFooter__topNavLogo px-1">
                  <a href={stampUrl} target="_blank" rel="noopener noreferrer">
                    <img src={assets.digitalStamp} alt="Digital Stamp" className="footer-stamp-logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
