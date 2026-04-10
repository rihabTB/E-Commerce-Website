import instagram from "../assets/socials/instagram.png";
import facebook from "../assets/socials/facebook.png";
import tiktok from "../assets/socials/tiktok.png";
import whatsapp from "../assets/socials/whatsapp.png";
import phone from "../assets/socials/phone.png";
import gmail from "../assets/socials/gmail.png";

export default function Footer() {
  return (
    <footer className="aqueduct-footer">
  <div className="top-beam"></div>

  <div className="bridge-structure">
    <div className="pillar-section-1">
      <div className="large-arch">
        <div className="about">
            <h3>krypton Déco قصر النحاس</h3>
            <p>Livraison 58 wilayas 🇩🇿🚛</p>
            <p>Paiement à la livraison 💵</p>
            <p>Worldwide shipping 🌍📦</p>
        </div>

        </div>
    </div>

    <div className="center-main">
      <div className="recessed-arches">
        <div className="mini-arch"></div>
        <div className="mini-arch"></div>
        <div className="mini-arch"></div>
        <div className="spacer"></div> 
        <div className="mini-arch"></div>
        <div className="mini-arch"></div>
        <div className="mini-arch"></div>
      </div>
      <div className="main-dome">
        <div className="main-footer">
          <ul className="footer-links">
            <li><a href="/">سياسة الشحن 💡​​​</a></li>     {/*not done yet*/}
            <li><a href="/">سياسة التبديل 💡​​</a></li>   {/*not done yet*/}
            <li><a href="/">أسئلة شائعة 💡​</a></li>     {/*not done yet*/}
          </ul>
          <p className="end">© 2026 By <a href="/">RT</a></p></div>
      </div>
    </div>

    <div className="pillar-section-2">
      <div className="large-arch">
        <div className="socials">
            <div className="line">
                <a href="https://www.instagram.com/krypton_deco/" target="_blank" rel="noopener noreferrer">
                    <img src={instagram} alt="Instagram" className="icons" />
                </a>
                <a href="https://www.facebook.com/people/Krypton-D%C3%A9co-2/61557354822233/" target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt="Facebook" className="icons" />
                </a>
               </div> 
            <div className="line">
                <a href="https://www.tiktok.com/@kryptondeco" target="_blank" rel="noopener noreferrer">
                    <img src={tiktok} alt="TikTok" className="icons" />
                </a>
                <a href="https://wa.me/0654" target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp} alt="WhatsApp" className="icons" />
                </a>
            </div>
            <div className="contact-group">
                <div className="contact">
                    <img src={phone} alt="Phone" className="iconsf" />
                    <p>0555422489</p>
                </div>
                <div className="contact">
                    <img src={phone} alt="Phone" className="iconsf" />
                    <p>0698910207</p>
                </div>
                <div className="contact">
                    <img src={gmail} alt="Email" className="iconsf" />
                    <p>kryptondeco@gmail.com</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
}