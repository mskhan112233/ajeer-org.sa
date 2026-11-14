import React from 'react';
import FooterNavCol from './FooterNavCol';
import FooterSocials from './FooterSocials';
import FooterPartners from './FooterPartners';

export default function Footer({ data = {} }) {
  const d = data || {};

  return (
    <footer className="mainFooter ">
      <div className="mainFooter__top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-6 px-5 px-lg-0 footer-nav-col">
              <div className="row footer-nav-row">
                {/* Column 1: Ajeer */}
                <FooterNavCol
                  title={d.footerCol1Title || "أجير"}
                  links={[
                    { text: d.footerLink1Text || "عن أجير", url: d.footerLink1Url || "#" },
                    { text: d.footerLink2Text || "خدمات أجير", url: d.footerLink2Url || "#" }
                  ]}
                />

                {/* Column 2: Support */}
                <FooterNavCol
                  title={d.footerCol2Title || "الدعم"}
                  links={[
                    { text: d.footerLink3Text || "الدعم و المساعدة", url: d.footerLink3Url || "#" },
                    { text: d.footerLink4Text || "الأسئلة الشائعة", url: d.footerLink4Url || "#" }
                  ]}
                />

                {/* Column 3: Terms & Privacy */}
                <FooterNavCol
                  title={d.footerCol3Title || "الشروط و الخصوصية"}
                  links={[
                    { text: d.footerLink5Text || "الشروط والأحكام", url: d.footerLink5Url || "#" },
                    { text: d.footerLink6Text || "سياسة الخصوصية", url: d.footerLink6Url || "#" }
                  ]}
                />

                {/* Column 4: Contact & Socials */}
                <FooterSocials data={d} />

                <hr className="hr d-block d-md-none mt-5" />
              </div>
            </div>

            {/* Government Partners & Stamp Logos */}
            <FooterPartners data={d} />
          </div>
        </div>
      </div>
    </footer>
  );
}
