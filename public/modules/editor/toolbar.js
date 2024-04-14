modules["editor/toolbar"] = {
  // Text Box, Comment, Media
  html: `
  <button class="eTool" tool="select" tooltip="Selection" selected><div><svg width="26" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_306_4" maskUnits="userSpaceOnUse" x="0.192818" y="4.08914" width="36" height="44" fill="black"> <rect fill="white" x="0.192818" y="4.08914" width="36" height="44"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7602 8.2371C8.79786 5.37292 3.25704 8.19611 3.24522 13.0852L3.19284 34.7545C3.18199 39.2411 7.9192 42.1519 11.9168 40.1151L15.9383 38.066L18.0344 42.1798C19.288 44.6402 22.2989 45.6185 24.7593 44.3649L26.0925 43.6856C28.5529 42.4319 29.5312 39.4211 28.2776 36.9606L26.1815 32.8468L29.5308 31.1403C33.5284 29.1034 33.9579 23.56 30.3218 20.9316L12.7602 8.2371Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7602 8.2371C8.79786 5.37292 3.25704 8.19611 3.24522 13.0852L3.19284 34.7545C3.18199 39.2411 7.9192 42.1519 11.9168 40.1151L15.9383 38.066L18.0344 42.1798C19.288 44.6402 22.2989 45.6185 24.7593 44.3649L26.0925 43.6856C28.5529 42.4319 29.5312 39.4211 28.2776 36.9606L26.1815 32.8468L29.5308 31.1403C33.5284 29.1034 33.9579 23.56 30.3218 20.9316L12.7602 8.2371Z" fill="#2F2F2F"/> <path d="M3.24522 13.0852L0.74523 13.0792L3.24522 13.0852ZM12.7602 8.2371L14.2247 6.21101L14.2247 6.21101L12.7602 8.2371ZM3.19284 34.7545L5.69283 34.7606L3.19284 34.7545ZM11.9168 40.1151L10.7818 37.8876L10.7818 37.8876L11.9168 40.1151ZM15.9383 38.066L18.1658 36.931L17.0308 34.7035L14.8033 35.8385L15.9383 38.066ZM18.0344 42.1798L15.8068 43.3147L15.8068 43.3147L18.0344 42.1798ZM24.7593 44.3649L23.6244 42.1373L23.6244 42.1373L24.7593 44.3649ZM26.0925 43.6856L27.2274 45.9131L27.2274 45.9131L26.0925 43.6856ZM28.2776 36.9606L30.5051 35.8256L30.5051 35.8256L28.2776 36.9606ZM26.1815 32.8468L25.0465 30.6193L22.819 31.7543L23.954 33.9818L26.1815 32.8468ZM29.5308 31.1403L30.6658 33.3678L29.5308 31.1403ZM30.3218 20.9316L31.7864 18.9055L31.7864 18.9055L30.3218 20.9316ZM5.74522 13.0913C5.75211 10.2393 8.98425 8.59242 11.2956 10.2632L14.2247 6.21101C8.61146 2.15342 0.761974 6.15294 0.74523 13.0792L5.74522 13.0913ZM5.69283 34.7606L5.74522 13.0913L0.74523 13.0792L0.692844 34.7485L5.69283 34.7606ZM10.7818 37.8876C8.44987 39.0757 5.6865 37.3777 5.69283 34.7606L0.692844 34.7485C0.677478 41.1044 7.38852 45.2281 13.0517 42.3426L10.7818 37.8876ZM14.8033 35.8385L10.7818 37.8876L13.0517 42.3426L17.0733 40.2935L14.8033 35.8385ZM20.2619 41.0448L18.1658 36.931L13.7108 39.201L15.8068 43.3147L20.2619 41.0448ZM23.6244 42.1373C22.3941 42.7642 20.8887 42.275 20.2619 41.0448L15.8068 43.3147C17.6873 47.0054 22.2036 48.4729 25.8943 46.5924L23.6244 42.1373ZM24.9575 41.4581L23.6244 42.1373L25.8943 46.5924L27.2274 45.9131L24.9575 41.4581ZM26.05 38.0956C26.6769 39.3258 26.1877 40.8312 24.9575 41.4581L27.2274 45.9131C30.9181 44.0326 32.3856 39.5163 30.5051 35.8256L26.05 38.0956ZM23.954 33.9818L26.05 38.0956L30.5051 35.8256L28.409 31.7119L23.954 33.9818ZM28.3958 28.9128L25.0465 30.6193L27.3165 35.0744L30.6658 33.3678L28.3958 28.9128ZM28.8572 22.9577C30.9783 24.4909 30.7277 27.7246 28.3958 28.9128L30.6658 33.3678C36.329 30.4822 36.9375 22.629 31.7864 18.9055L28.8572 22.9577ZM11.2956 10.2632L28.8572 22.9577L31.7864 18.9055L14.2247 6.21101L11.2956 10.2632Z" fill="white" mask="url(#path-1-outside-1_306_4)"/> </svg></div></button>
  <button class="eTool" tool="markup" tooltip="Markup"><div><svg width="26" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.1698 36.4384C13.9254 38.5143 16.2208 39.5846 18.2967 38.8291L23.9348 36.7769C26.0107 36.0214 27.0811 33.726 26.3255 31.6501L22.5633 21.3135L9.4076 26.1018L13.1698 36.4384Z" fill="white"/> <path d="M22.1358 20.1389L23.3104 19.7113L23.7379 20.8859L27.5001 31.2226C28.4918 33.9472 27.087 36.9599 24.3624 37.9516L18.7242 40.0037C15.9996 40.9954 12.9869 39.5905 11.9952 36.8659L8.23298 26.5293L7.80546 25.3547L8.98008 24.9271L22.1358 20.1389Z" fillcoloropacity stroke="white" stroke-width="2.5"/> <path d="M11.9685 33.1377L10.7938 33.5652L10.3663 32.3906L2.49986 10.7776C1.50817 8.053 2.913 5.04033 5.63764 4.04864L11.2758 1.99652C14.0004 1.00484 17.0131 2.40967 18.0048 5.1343L25.8712 26.7472L26.2988 27.9219L25.1242 28.3494L11.9685 33.1377Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> </svg></div></button>
  <button class="eTool" tool="text" tooltip="Text Box"><div><svg width="44" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 7V3H25.5V7H17V29.5H12V7H3Z" fill="#2F2F2F"/> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fill="white"/> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fillcoloropacity/> <mask id="path-4-outside-1_925_51" maskUnits="userSpaceOnUse" x="0" y="0" width="52" height="32" fill="black"> <rect fill="white" width="52" height="32"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3V7H12V29.5H17V7H25.5V3H3ZM26.5 9L34 19L26 29.5H31.5L36.5 22.5L42 29.5H47L39.5 19L47 9H42L36.5 15.5L31.5 9H26.5Z"/> </mask> <path d="M3 7H0.5V9.5H3V7ZM3 3V0.5H0.5V3H3ZM12 7H14.5V4.5H12V7ZM12 29.5H9.5V32H12V29.5ZM17 29.5V32H19.5V29.5H17ZM17 7V4.5H14.5V7H17ZM25.5 7V9.5H28V7H25.5ZM25.5 3H28V0.5H25.5V3ZM34 19L35.9886 20.5151L37.1339 19.0119L36 17.5L34 19ZM26.5 9V6.5H21.5L24.5 10.5L26.5 9ZM26 29.5L24.0114 27.9849L20.9523 32H26V29.5ZM31.5 29.5V32H32.7865L33.5343 30.9531L31.5 29.5ZM36.5 22.5L38.4658 20.9554L36.4047 18.3322L34.4657 21.0469L36.5 22.5ZM42 29.5L40.0342 31.0446L40.7849 32H42V29.5ZM47 29.5V32H51.858L49.0343 28.0469L47 29.5ZM39.5 19L37.5 17.5L36.402 18.964L37.4657 20.4531L39.5 19ZM47 9L49 10.5L52 6.5H47V9ZM42 9V6.5H40.8405L40.0915 7.38514L42 9ZM36.5 15.5L34.5184 17.0243L36.4073 19.4798L38.4085 17.1149L36.5 15.5ZM31.5 9L33.4816 7.47572L32.731 6.5H31.5V9ZM5.5 7V3H0.5V7H5.5ZM12 4.5H3V9.5H12V4.5ZM14.5 29.5V7H9.5V29.5H14.5ZM17 27H12V32H17V27ZM14.5 7V29.5H19.5V7H14.5ZM25.5 4.5H17V9.5H25.5V4.5ZM23 3V7H28V3H23ZM3 5.5H25.5V0.5H3V5.5ZM36 17.5L28.5 7.5L24.5 10.5L32 20.5L36 17.5ZM27.9886 31.0151L35.9886 20.5151L32.0114 17.4849L24.0114 27.9849L27.9886 31.0151ZM31.5 27H26V32H31.5V27ZM34.4657 21.0469L29.4657 28.0469L33.5343 30.9531L38.5343 23.9531L34.4657 21.0469ZM43.9658 27.9554L38.4658 20.9554L34.5342 24.0446L40.0342 31.0446L43.9658 27.9554ZM47 27H42V32H47V27ZM37.4657 20.4531L44.9657 30.9531L49.0343 28.0469L41.5343 17.5469L37.4657 20.4531ZM45 7.5L37.5 17.5L41.5 20.5L49 10.5L45 7.5ZM42 11.5H47V6.5H42V11.5ZM38.4085 17.1149L43.9085 10.6149L40.0915 7.38514L34.5915 13.8851L38.4085 17.1149ZM29.5184 10.5243L34.5184 17.0243L38.4816 13.9757L33.4816 7.47572L29.5184 10.5243ZM26.5 11.5H31.5V6.5H26.5V11.5Z" fill="white" mask="url(#path-4-outside-1_925_51)"/> </svg></div></button>
  <button class="eTool" tool="draw" tooltip="Draw"><div><svg width="22" viewBox="0 0 27 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.3863 34.9812C13.2256 37.2873 15.077 39.0806 17.4087 39.846L19.7938 40.629C20.4513 40.8448 21.1712 40.5828 21.5361 39.9948L22.86 37.8619C24.1541 35.7768 24.4197 33.213 23.5803 30.9069L18.9826 18.2748L7.78855 22.3491L12.3863 34.9812Z" fill="white"/> <path d="M18.5551 17.1002L19.7297 16.6726L20.1572 17.8472L24.7549 30.4794C25.7254 33.1458 25.4184 36.1102 23.922 38.5211L22.5982 40.654C21.9291 41.732 20.6094 42.2123 19.404 41.8166L17.0188 41.0337C14.3228 40.1486 12.1822 38.0752 11.2117 35.4088L6.61393 22.7766L6.18641 21.602L7.36103 21.1745L18.5551 17.1002Z" fillcoloropacity stroke="white" stroke-width="2.5"/> <path d="M11.4928 32.5264L10.3182 32.9539L9.89068 31.7793L2.35127 11.065C0.990064 7.32509 2.91836 3.18985 6.65823 1.82865C10.3981 0.467446 14.5333 2.39574 15.8945 6.13561L23.434 26.85L23.8615 28.0246L22.6869 28.4521L11.4928 32.5264Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> </svg></div></button>
  <button class="eTool" tool="erase" tooltip="Erase"><div><svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_130_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_130_2)"> <path d="M176.938 149.353L182.576 147.301L180.524 141.662L151.219 61.1479C146.308 47.6544 131.388 40.6972 117.894 45.6084L83.4034 58.1621C69.9099 63.0733 62.9527 77.9932 67.8639 91.4866L97.1688 172.001L99.2209 177.639L104.859 175.587L176.938 149.353Z" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M104.253 173.921L98.6144 175.974L100.667 181.612L105.486 194.853C110.397 208.346 125.317 215.304 138.81 210.392L173.301 197.839C186.795 192.927 193.752 178.007 188.841 164.514L184.022 151.273L181.969 145.635L176.331 147.687L104.253 173.921Z" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg></div></button>
  <button class="eTool" tool="shape" tooltip="Shapes"><div><svg width="38" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1.97104" y="1.47107" width="22.6493" height="22.6493" rx="5.25" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> <circle cx="32.7043" cy="33.2043" r="11.3246" fill="white" stroke="white" stroke-width="2.5"/> <circle cx="32.7043" cy="33.2043" r="11.3246" fillcoloropacity stroke="white" stroke-width="2.5"/> </svg></div></button>
  <button class="eTool" soon tool="sticky" tooltip="Coming Soon"><div><svg width="44" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_850_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_850_2)"> <path d="M185 38H72C54.3269 38 40 52.3269 40 70V183.246C40 200.801 54.1418 215.078 71.6952 215.245L145.905 215.952C150.739 215.998 155.387 214.098 158.805 210.68L211.728 157.757C215.104 154.382 217 149.803 217 145.029V70C217 52.3269 202.673 38 185 38Z" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M211 144H171C156.641 144 145 155.641 145 170V210" stroke="white" stroke-width="12"/> <rect x="62" y="60" width="133" height="20" rx="10" fill="white"/> <rect x="62" y="88" width="101" height="20" rx="10" fill="white"/> </g> </svg></div></button>
  <button class="eTool" tool="media" tooltip="Media"><div><svg width="40" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_233_21" maskUnits="userSpaceOnUse" x="-0.459759" y="-0.0484619" width="51" height="42" fill="black"> <rect fill="white" x="-0.459759" y="-0.0484619" width="51" height="42"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z" fill="#2F2F2F"/> <path d="M20.9726 12.2718L23.1377 11.0218V11.0218L20.9726 12.2718ZM15.7765 12.2718L17.9415 13.5218L15.7765 12.2718ZM28.5261 25.3549L26.3611 26.6049L28.5261 30.3549L30.6912 26.6049L28.5261 25.3549ZM32.5377 18.4066L30.3726 17.1566V17.1566L32.5377 18.4066ZM37.7339 18.4066L35.5688 19.6566L35.5688 19.6566L37.7339 18.4066ZM47.0534 34.5485L49.2184 33.2985L47.0534 34.5485ZM25.2345 38.9937L25.7061 36.5386L25.4724 36.4937H25.2345V38.9937ZM2.94664 34.4937L0.781578 33.2437L2.94664 34.4937ZM43.0431 7.66221C43.0431 8.88313 42.0533 9.87289 40.8324 9.87289V14.8729C44.8148 14.8729 48.0431 11.6446 48.0431 7.66221H43.0431ZM40.8324 5.45154C42.0533 5.45154 43.0431 6.44129 43.0431 7.66221H48.0431C48.0431 3.67987 44.8148 0.451538 40.8324 0.451538V5.45154ZM38.6217 7.66221C38.6217 6.44129 39.6115 5.45154 40.8324 5.45154V0.451538C36.8501 0.451538 33.6217 3.67987 33.6217 7.66221H38.6217ZM40.8324 9.87289C39.6115 9.87289 38.6217 8.88313 38.6217 7.66221H33.6217C33.6217 11.6446 36.8501 14.8729 40.8324 14.8729V9.87289ZM23.1377 11.0218C21.0207 7.35513 15.7284 7.35511 13.6114 11.0218L17.9415 13.5218C18.134 13.1885 18.6151 13.1885 18.8076 13.5218L23.1377 11.0218ZM30.6912 24.1049L23.1377 11.0218L18.8076 13.5218L26.3611 26.6049L30.6912 24.1049ZM30.3726 17.1566L26.3611 24.1049L30.6912 26.6049L34.7028 19.6566L30.3726 17.1566ZM39.8989 17.1566C37.782 13.4899 32.4896 13.49 30.3726 17.1566L34.7028 19.6566C34.8952 19.3233 35.3763 19.3233 35.5688 19.6566L39.8989 17.1566ZM49.2184 33.2985L39.8989 17.1566L35.5688 19.6566L44.8883 35.7985L49.2184 33.2985ZM44.4553 41.5485C48.6892 41.5485 51.3354 36.9651 49.2184 33.2985L44.8883 35.7985C45.0807 36.1318 44.8402 36.5485 44.4553 36.5485V41.5485ZM25.8163 41.5485H44.4553V36.5485H25.8163V41.5485ZM24.7628 41.4488C25.1057 41.5147 25.458 41.5485 25.8163 41.5485V36.5485C25.7728 36.5485 25.7365 36.5444 25.7061 36.5386L24.7628 41.4488ZM5.54471 41.4937H25.2345V36.4937H5.54471V41.4937ZM0.781578 33.2437C-1.33537 36.9104 1.3108 41.4937 5.54471 41.4937V36.4937C5.15982 36.4937 4.91925 36.077 5.11171 35.7437L0.781578 33.2437ZM13.6114 11.0218L0.781578 33.2437L5.11171 35.7437L17.9415 13.5218L13.6114 11.0218Z" fill="white" mask="url(#path-1-outside-1_233_21)"/> </svg></div></button>

  <div class="eSubToolHolder" keeptooltip>
    <div class="eSubToolShadow"></div>
    <div class="eSubToolContentHolder">
      <div class="eSubToolContentScroll">
        <div class="eSubToolContent" keeptooltip></div>
      </div>
      <div class="eSubToolHolder" option>
        <div class="eSubToolShadow"></div>
          <div class="eSubToolContentHolder">
            <div class="eSubToolContentScroll">
              <div class="eSubToolContent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="eToolHoverTooltip">Tool Boy</div>
  </div>
  `,
  css: {
    ".eToolbar .content": `scrollbar-width: none`,
    ".eToolbar .content::-webkit-scrollbar": `display: none`,

    ".eTool": `--hoverColor: var(--hover); width: 50px; height: 50px; flex-shrink: 0; padding: 0; transition: opacity .3s`,
    ".eTool > div": `display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; transition: .2s; overflow: hidden`,
    ".eTool:hover > div": `background: var(--hoverColor)`,
    ".eTool:active": `transform: unset !important`,
    ".eTool:active > div": `transform: scale(.95); border-radius: 15.5px`,
    ".eTool[option]:active > div": `background: var(--secondary); border-radius: 25px`,
    ".eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eTool[selected][option]:active > div": `border-radius: 25px !important`,
    ".eTool[selected] > div": `background: var(--theme); border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important`,
    ".eTool[selected][option] > div": `background: var(--secondary)`,
    ".eTool[selecthighlight] > div": `background: var(--theme); border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important`,
    ".eTool[selecthighlight]:active > div": `border-radius: 15.5px !important`,

    ".eTool[soon]": `opacity: 0.5`, // TEMP CODE

    ".eDivider": `width: 100%; height: 4px; background: var(--theme)`,
    ".eVerticalDivider": `flex-shrink: 0; width: 4px; height: 100%; background: var(--theme)`,

    ".eSubToolHolder": `position: absolute; max-height: 100%; left: 100%; top: 0px; background: var(--pageColor); border-radius: 0 16px 16px 0; border-left: solid 4px var(--theme); transform: scale(0); transform-origin: top left; transition: opacity .3s, transform: .3s`,
    ".eSubToolHolder[option]": `border-left-color: var(--secondary)`,
    ".eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 20px 16px 0; left: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `overflow: hidden; border-radius: inherit`,
    ".eSubToolContentScroll": `width: fit-content; overflow: auto`,
    ".eSubToolHolder[option] .eSubToolContentScroll": `overflow: visible`,
    ".eSubToolContent": `display: flex; flex-wrap: wrap; gap: 6px`,

    ".eToolHoverTooltip": `position: absolute; display: flex; width: max-content; padding: 3px 6px; background: var(--pageColor); border-radius: 6px; box-shadow: var(--lightShadow); pointer-events: none; user-select: none; text-wrap: nowrap; font-size: 16px; font-weight: 600; transform: scale(0); opacity: 0`,

    ".eSelect": `position: absolute; opacity: 0; z-index: 101; border-radius: 9px; transition: opacity .15s; pointer-events: none`,
    ".eSelectActive": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: all !important; cursor: move; z-index: var(--selectZIndex)`,
    ".eContent[noshiftheld] .eSelectActive": `z-index: var(--annoZIndex) !important`,
    ".eAnnotation[selected] *": `pointer-events: none`,
    ".eSelectTooltip": `position: absolute; transition: .1s; pointer-events: all`,
    ".eSelect[hidetips] .eSelectTooltip": `opacity: 0; pointer-events: none`,
    '.eSelectTooltip[tooltip="topleft"]': `left: -10px; top: -10px; cursor: nwse-resize`,
    '.eSelectTooltip[tooltip="topright"]': `right: -10px; top: -10px; cursor: nesw-resize`,
    '.eSelectTooltip[tooltip="bottomleft"]': `left: -10px; bottom: -10px; cursor: nesw-resize`,
    '.eSelectTooltip[tooltip="bottomright"]': `right: -10px; bottom: -10px; cursor: nwse-resize`,
    '.eSelectTooltip[tooltip="left"]': `left: -10px; top: 50%; transform: translateY(-50%); cursor: ew-resize`,
    '.eSelectTooltip[tooltip="right"]': `right: -10px; top: 50%; transform: translateY(-50%); cursor: ew-resize`,
    '.eSelectTooltip[tooltip="top"]': `left: 50%; top: -10px; transform: translateX(-50%); cursor: ns-resize`,
    '.eSelectTooltip[tooltip="bottom"]': `left: 50%; bottom: -10px; transform: translateX(-50%); cursor: ns-resize`,
    ".eSelectDrag": `position: absolute; box-sizing: border-box; pointer-events: none; z-index: 99; opacity: 0; background: var(--secondary); border: solid 2px var(--theme); border-radius: 10px; transition: opacity .1s`,

    ".eSelectBar": `position: absolute; display: flex; max-width: calc(100vw - 88px); height: 50px; background: var(--pageColor); box-shadow: var(--shadow); z-index: 102; border-radius: 16px; transform: translateY(-10%); opacity: 0; transition: transform .2s, opacity .2s, border-radius .2s`,
    ".eSelectHolder": `display: flex; width: 100%; height: 100%; gap: 6px; overflow: auto; border-radius: inherit`,
    ".eSelectHolder::-webkit-scrollbar": `display: none`,
    ".eActionContainer": `position: absolute; max-width: 100%; background: var(--pageColor)`,
    ".eActionContainer[top]": `--shadowPadding: 20px 16px 0; --shadowBottom: -4px; --shadowTop: 16px; bottom: 100%; border-radius: 16px 16px 0 0; border-bottom: solid 4px var(--theme); transform-origin: bottom center`,
    ".eActionContainer[bottom]": `--shadowPadding: 0 16px 20px; --shadowBottom: -16px; --shadowTop: 0px; top: 100%; border-radius: 0 0 16px 16px; border-top: solid 4px var(--theme); transform-origin: top center`,
    ".eActionShadow": `position: absolute; width: 100%; height: 100%; padding: var(--shadowPadding); bottom: var(--shadowBottom); left: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eActionShadow:after": `position: absolute; width: calc(100% - 32px); height: calc(100% - 16px); left: 16px; top: var(--shadowTop); content: ""; box-shadow: var(--shadow); border-radius: inherit`,
    ".eActionContainerHolder": `width: 100%; height: 100%; overflow: hidden; border-radius: inherit`,
    ".eActionContainerScroll": `width: fit-content`, //; overflow: auto
    ".eActionContainerContent": `display: flex; flex-wrap: wrap; gap: 6px`
  },
  tools: {
    "select": [
      {
        id: "select",
        tooltip: "Select",
        type: "tool",
        module: "pages/editor/toolbar/cursor",
        image: `<svg width="26" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_306_4" maskUnits="userSpaceOnUse" x="0.192818" y="4.08914" width="36" height="44" fill="black"> <rect fill="white" x="0.192818" y="4.08914" width="36" height="44"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7602 8.2371C8.79786 5.37292 3.25704 8.19611 3.24522 13.0852L3.19284 34.7545C3.18199 39.2411 7.9192 42.1519 11.9168 40.1151L15.9383 38.066L18.0344 42.1798C19.288 44.6402 22.2989 45.6185 24.7593 44.3649L26.0925 43.6856C28.5529 42.4319 29.5312 39.4211 28.2776 36.9606L26.1815 32.8468L29.5308 31.1403C33.5284 29.1034 33.9579 23.56 30.3218 20.9316L12.7602 8.2371Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7602 8.2371C8.79786 5.37292 3.25704 8.19611 3.24522 13.0852L3.19284 34.7545C3.18199 39.2411 7.9192 42.1519 11.9168 40.1151L15.9383 38.066L18.0344 42.1798C19.288 44.6402 22.2989 45.6185 24.7593 44.3649L26.0925 43.6856C28.5529 42.4319 29.5312 39.4211 28.2776 36.9606L26.1815 32.8468L29.5308 31.1403C33.5284 29.1034 33.9579 23.56 30.3218 20.9316L12.7602 8.2371Z" fill="#2F2F2F"/> <path d="M3.24522 13.0852L0.74523 13.0792L3.24522 13.0852ZM12.7602 8.2371L14.2247 6.21101L14.2247 6.21101L12.7602 8.2371ZM3.19284 34.7545L5.69283 34.7606L3.19284 34.7545ZM11.9168 40.1151L10.7818 37.8876L10.7818 37.8876L11.9168 40.1151ZM15.9383 38.066L18.1658 36.931L17.0308 34.7035L14.8033 35.8385L15.9383 38.066ZM18.0344 42.1798L15.8068 43.3147L15.8068 43.3147L18.0344 42.1798ZM24.7593 44.3649L23.6244 42.1373L23.6244 42.1373L24.7593 44.3649ZM26.0925 43.6856L27.2274 45.9131L27.2274 45.9131L26.0925 43.6856ZM28.2776 36.9606L30.5051 35.8256L30.5051 35.8256L28.2776 36.9606ZM26.1815 32.8468L25.0465 30.6193L22.819 31.7543L23.954 33.9818L26.1815 32.8468ZM29.5308 31.1403L30.6658 33.3678L29.5308 31.1403ZM30.3218 20.9316L31.7864 18.9055L31.7864 18.9055L30.3218 20.9316ZM5.74522 13.0913C5.75211 10.2393 8.98425 8.59242 11.2956 10.2632L14.2247 6.21101C8.61146 2.15342 0.761974 6.15294 0.74523 13.0792L5.74522 13.0913ZM5.69283 34.7606L5.74522 13.0913L0.74523 13.0792L0.692844 34.7485L5.69283 34.7606ZM10.7818 37.8876C8.44987 39.0757 5.6865 37.3777 5.69283 34.7606L0.692844 34.7485C0.677478 41.1044 7.38852 45.2281 13.0517 42.3426L10.7818 37.8876ZM14.8033 35.8385L10.7818 37.8876L13.0517 42.3426L17.0733 40.2935L14.8033 35.8385ZM20.2619 41.0448L18.1658 36.931L13.7108 39.201L15.8068 43.3147L20.2619 41.0448ZM23.6244 42.1373C22.3941 42.7642 20.8887 42.275 20.2619 41.0448L15.8068 43.3147C17.6873 47.0054 22.2036 48.4729 25.8943 46.5924L23.6244 42.1373ZM24.9575 41.4581L23.6244 42.1373L25.8943 46.5924L27.2274 45.9131L24.9575 41.4581ZM26.05 38.0956C26.6769 39.3258 26.1877 40.8312 24.9575 41.4581L27.2274 45.9131C30.9181 44.0326 32.3856 39.5163 30.5051 35.8256L26.05 38.0956ZM23.954 33.9818L26.05 38.0956L30.5051 35.8256L28.409 31.7119L23.954 33.9818ZM28.3958 28.9128L25.0465 30.6193L27.3165 35.0744L30.6658 33.3678L28.3958 28.9128ZM28.8572 22.9577C30.9783 24.4909 30.7277 27.7246 28.3958 28.9128L30.6658 33.3678C36.329 30.4822 36.9375 22.629 31.7864 18.9055L28.8572 22.9577ZM11.2956 10.2632L28.8572 22.9577L31.7864 18.9055L14.2247 6.21101L11.2956 10.2632Z" fill="white" mask="url(#path-1-outside-1_306_4)"/> </svg>`
      },
      {
        id: "pan",
        tooltip: "Pan",
        type: "tool",
        module: "pages/editor/toolbar/pan",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_597_4" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_597_4)"> <path d="M123.411 222H164.774C169.33 222 173.716 220.273 177.048 217.166L199.274 196.447C202.926 193.043 205 188.274 205 183.281V90.4706C205 85.6967 203.104 81.1183 199.728 77.7426L197.314 75.3284C194.862 72.8771 191.538 71.5 188.071 71.5C183.407 71.5 179.313 73.943 177 77.6192V60.5C177 52.2157 170.284 45.5 162 45.5C156.443 45.5 151.592 48.5217 149 53.0117V49C149 40.7157 142.284 34 134 34C125.716 34 119 40.7157 119 49V60.5117C116.408 56.0217 111.557 53 106 53C97.7157 53 91 59.7157 91 68V119.937C91 124.977 85.1636 127.771 81.2379 124.611L75.8412 120.268C65.4495 111.904 50 119.301 50 132.64C50 136.142 51.1569 139.545 53.2907 142.32L109.141 214.97C112.548 219.403 117.821 222 123.411 222Z" fill="white" stroke="white" stroke-width="12"/> <path d="M164.774 216H123.411C119.684 216 116.169 214.268 113.897 211.314L58.0476 138.664C56.7198 136.936 56 134.819 56 132.64C56 124.34 65.6131 119.737 72.0791 124.942L77.4759 129.285C85.3273 135.605 97 130.016 97 119.937V68C97 63.0294 101.029 59 106 59C110.971 59 115 63.0294 115 68V107C115 109.761 117.239 112 120 112C122.761 112 125 109.761 125 107V49C125 44.0294 129.029 40 134 40C138.971 40 143 44.0294 143 49V107C143 109.761 145.239 112 148 112C150.761 112 153 109.761 153 107V60.5C153 55.5294 157.029 51.5 162 51.5C166.971 51.5 171 55.5294 171 60.5V107C171 109.761 173.239 112 176 112C178.761 112 181 109.761 181 107V84.5711C181 80.6658 184.166 77.5 188.071 77.5C189.946 77.5 191.745 78.245 193.071 79.5711L195.485 81.9853C197.736 84.2357 199 87.288 199 90.4706V183.281C199 186.61 197.617 189.789 195.183 192.059L172.957 212.778C170.735 214.848 167.811 216 164.774 216Z" fill="#2F2F2F"/> </g> </svg>`
      },
      {
        id: "drag",
        tooltip: "Multi-Select",
        type: "tool",
        module: "pages/editor/toolbar/drag",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_117_6" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_117_6)"> <rect x="6" y="-6" width="76" height="76" rx="16" transform="matrix(-1 0 0 1 222 86)" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="6" y="-6" width="72" height="72" rx="36" transform="matrix(-1 0 0 1 118 48)" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M57.1628 194L83.1436 149C89.302 138.333 104.698 138.333 110.856 149L136.837 194C142.996 204.667 135.298 218 122.981 218H71.0192C58.7024 218 51.0044 204.667 57.1628 194Z" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg>`
      }
    ],
    "markup": [
      {
        id: "highlighter",
        tooltip: "Highlighter",
        type: "tool",
        module: "pages/editor/toolbar/highlighter",
        image: `<svg width="26" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.1698 36.4384C13.9254 38.5143 16.2208 39.5846 18.2967 38.8291L23.9348 36.7769C26.0107 36.0214 27.0811 33.726 26.3255 31.6501L22.5633 21.3135L9.4076 26.1018L13.1698 36.4384Z" fill="white"/> <path d="M22.1358 20.1389L23.3104 19.7113L23.7379 20.8859L27.5001 31.2226C28.4918 33.9472 27.087 36.9599 24.3624 37.9516L18.7242 40.0037C15.9996 40.9954 12.9869 39.5905 11.9952 36.8659L8.23298 26.5293L7.80546 25.3547L8.98008 24.9271L22.1358 20.1389Z" fillcoloropacity stroke="white" stroke-width="2.5"/> <path d="M11.9685 33.1377L10.7938 33.5652L10.3663 32.3906L2.49986 10.7776C1.50817 8.053 2.913 5.04033 5.63764 4.04864L11.2758 1.99652C14.0004 1.00484 17.0131 2.40967 18.0048 5.1343L25.8712 26.7472L26.2988 27.9219L25.1242 28.3494L11.9685 33.1377Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> </svg>`
      },
      {
        id: "underline",
        tooltip: "Underline",
        type: "tool",
        module: "pages/editor/toolbar/understrike",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_125_40" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_125_40)"> <path d="M33 128H79.1974H109.403C113.002 128 116.562 128.747 119.857 130.194L126.891 133.283C136.209 137.375 147.058 135.655 154.652 128.881L156.548 127.189C164.183 120.379 175.102 118.68 184.445 122.847L190.945 125.746C194.278 127.232 197.886 128 201.535 128H223" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M128.991 202.4C109.125 202.4 93.5914 196.867 82.3914 185.8C71.1914 174.733 65.5914 158.933 65.5914 138.4V60H97.9914V137.2C97.9914 150.533 100.725 160.133 106.191 166C111.658 171.867 119.325 174.8 129.191 174.8C139.058 174.8 146.725 171.867 152.191 166C157.658 160.133 160.391 150.533 160.391 137.2V60H192.391V138.4C192.391 158.933 186.791 174.733 175.591 185.8C164.391 196.867 148.858 202.4 128.991 202.4Z" fill="white"/> <path d="M82.3914 185.8L90.8257 177.264L82.3914 185.8ZM65.5914 60V48H53.5914V60H65.5914ZM97.9914 60H109.991V48H97.9914V60ZM106.191 166L97.4121 174.181H97.4121L106.191 166ZM152.191 166L160.971 174.181L160.971 174.181L152.191 166ZM160.391 60V48H148.391V60H160.391ZM192.391 60H204.391V48H192.391V60ZM175.591 185.8L184.026 194.336H184.026L175.591 185.8ZM128.991 190.4C111.414 190.4 99.2292 185.567 90.8257 177.264L73.9571 194.336C87.9536 208.166 106.836 214.4 128.991 214.4V190.4ZM90.8257 177.264C82.5415 169.078 77.5914 156.743 77.5914 138.4H53.5914C53.5914 161.123 59.8413 180.388 73.9571 194.336L90.8257 177.264ZM77.5914 138.4V60H53.5914V138.4H77.5914ZM65.5914 72H97.9914V48H65.5914V72ZM85.9914 60V137.2H109.991V60H85.9914ZM85.9914 137.2C85.9914 151.684 88.8744 165.018 97.4121 174.181L114.971 157.819C112.575 155.248 109.991 149.382 109.991 137.2H85.9914ZM97.4121 174.181C105.655 183.027 116.819 186.8 129.191 186.8V162.8C121.83 162.8 117.661 160.706 114.971 157.819L97.4121 174.181ZM129.191 186.8C141.564 186.8 152.728 183.027 160.971 174.181L143.412 157.819C140.722 160.706 136.552 162.8 129.191 162.8V186.8ZM160.971 174.181C169.508 165.018 172.391 151.684 172.391 137.2H148.391C148.391 149.382 145.808 155.248 143.412 157.819L160.971 174.181ZM172.391 137.2V60H148.391V137.2H172.391ZM160.391 72H192.391V48H160.391V72ZM180.391 60V138.4H204.391V60H180.391ZM180.391 138.4C180.391 156.743 175.441 169.078 167.157 177.264L184.026 194.336C198.142 180.388 204.391 161.123 204.391 138.4H180.391ZM167.157 177.264C158.754 185.567 146.569 190.4 128.991 190.4V214.4C151.147 214.4 170.029 208.166 184.026 194.336L167.157 177.264Z" fill="white"/> <path d="M128.991 202.4C109.125 202.4 93.5914 196.867 82.3914 185.8C71.1914 174.733 65.5914 158.933 65.5914 138.4V60H97.9914V137.2C97.9914 150.533 100.725 160.133 106.191 166C111.658 171.867 119.325 174.8 129.191 174.8C139.058 174.8 146.725 171.867 152.191 166C157.658 160.133 160.391 150.533 160.391 137.2V60H192.391V138.4C192.391 158.933 186.791 174.733 175.591 185.8C164.391 196.867 148.858 202.4 128.991 202.4Z" fill="#2F2F2F"/> <path d="M33 128H79.1974H109.403C113.002 128 116.562 128.747 119.857 130.194L126.891 133.283C136.209 137.375 147.058 135.655 154.652 128.881L156.548 127.189C164.183 120.379 175.102 118.68 184.445 122.847L190.945 125.746C194.278 127.232 197.886 128 201.535 128H223" strokecolor stroke-width="20" stroke-linecap="round"/> </g> </svg>`
      },
      /*
      {
        id: "tape",
        tooltip: "Study Tape",
        type: "tool",
        image: "tape.svg"
      },
      */
      {
        type: "divider"
      },
      {
        id: "color",
        type: "option",
        module: "pages/editor/toolbar/color"
      },
      {
        id: "thickness",
        type: "option",
        module: "pages/editor/toolbar/thickness"
      },
      {
        id: "opacity",
        type: "option",
        module: "pages/editor/toolbar/opacity"
      }
    ],
    "text": { id: "text", type: "tool", module: "pages/editor/toolbar/text" },
    "draw": [
      {
        id: "pen",
        tooltip: "Pen",
        type: "tool",
        module: "pages/editor/toolbar/pen",
        image: `<svg width="22" viewBox="0 0 27 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.3863 34.9812C13.2256 37.2873 15.077 39.0806 17.4087 39.846L19.7938 40.629C20.4513 40.8448 21.1712 40.5828 21.5361 39.9948L22.86 37.8619C24.1541 35.7768 24.4197 33.213 23.5803 30.9069L18.9826 18.2748L7.78855 22.3491L12.3863 34.9812Z" fill="white"/> <path d="M18.5551 17.1002L19.7297 16.6726L20.1572 17.8472L24.7549 30.4794C25.7254 33.1458 25.4184 36.1102 23.922 38.5211L22.5982 40.654C21.9291 41.732 20.6094 42.2123 19.404 41.8166L17.0188 41.0337C14.3228 40.1486 12.1822 38.0752 11.2117 35.4088L6.61393 22.7766L6.18641 21.602L7.36103 21.1745L18.5551 17.1002Z" fillcoloropacity stroke="white" stroke-width="2.5"/> <path d="M11.4928 32.5264L10.3182 32.9539L9.89068 31.7793L2.35127 11.065C0.990064 7.32509 2.91836 3.18985 6.65823 1.82865C10.3981 0.467446 14.5333 2.39574 15.8945 6.13561L23.434 26.85L23.8615 28.0246L22.6869 28.4521L11.4928 32.5264Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> </svg>`
      },
      {
        type: "divider"
      },
      {
        id: "color",
        type: "option",
        module: "pages/editor/toolbar/color"
      },
      {
        id: "thickness",
        type: "option",
        module: "pages/editor/toolbar/thickness"
      },
      {
        id: "opacity",
        type: "option",
        module: "pages/editor/toolbar/opacity"
      }
    ],
    "erase": { id: "erase", type: "tool", module: "pages/editor/toolbar/eraser" },
    "shape": [
      {
        id: "square",
        tooltip: "Square",
        type: "tool",
        module: "pages/editor/toolbar/shape",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_134_25" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_134_25)"> <rect x="52" y="52" width="152" height="152" rx="36" stroke="white" stroke-width="32"/> <rect x="74" y="74" width="108" height="108" rx="14" stroke="white" stroke-width="12"/> <rect x="58" y="58" width="140" height="140" rx="30" stroke="#2F2F2F" stroke-width="20"/> </g> </svg>`
      },
      {
        id: "ellipse",
        tooltip: "Ellipse",
        type: "tool",
        module: "pages/editor/toolbar/shape",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_134_33" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_134_33)"> <circle cx="128" cy="128" r="76" stroke="white" stroke-width="32"/> <circle cx="128" cy="128" r="54" stroke="white" stroke-width="12"/> <circle cx="128" cy="128" r="70" stroke="#2F2F2F" stroke-width="20"/> </g> </svg>`
      },
      {
        id: "triangle",
        tooltip: "Triangle",
        type: "tool",
        module: "pages/editor/toolbar/shape",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_134_41" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_134_41)"> <path d="M72.8282 204H183.172C201.628 204 213.177 184.037 203.978 168.037L190.107 176.012L203.978 168.037L148.806 72.0858C139.578 56.0368 116.422 56.0369 107.194 72.0858L52.0225 168.037C42.8225 184.037 54.3718 204 72.8282 204Z" stroke="white" stroke-width="32"/> <path d="M183.172 182H72.8282C71.2902 182 70.3277 180.336 71.0944 179.003L126.266 83.0521C127.035 81.7147 128.965 81.7147 129.734 83.0521L184.906 179.003C185.672 180.336 184.71 182 183.172 182Z" stroke="white" stroke-width="12"/> <path d="M72.8282 198H183.172C197.014 198 205.676 183.027 198.776 171.028L143.604 75.0766C136.683 63.0399 119.317 63.0399 112.396 75.0766L57.2239 171.028C50.3239 183.028 58.9859 198 72.8282 198Z" stroke="#2F2F2F" stroke-width="20"/> </g> </svg>`
      },
      {
        id: "parallelogram",
        tooltip: "Parallelogram",
        type: "tool",
        module: "pages/editor/toolbar/shape",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_134_57" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_134_57)"> <path d="M80.8849 75.7621L46.135 167.183C40.6624 181.581 51.2972 197 66.6995 197H150.812C161.607 197 171.279 190.329 175.115 180.238L209.865 88.8167C215.338 74.4194 204.703 59 189.301 59H105.188C94.3929 59 84.7206 65.671 80.8849 75.7621Z" stroke="white" stroke-width="32"/> <path d="M66.6995 175L101.449 83.5788C102.039 82.0263 103.528 81 105.188 81H189.301L154.551 172.421C153.961 173.974 152.472 175 150.812 175H66.6995Z" stroke="white" stroke-width="12"/> <path d="M86.4934 77.8939L51.7435 169.315C47.7634 179.786 55.4978 191 66.6995 191H150.812C159.116 191 166.556 185.868 169.507 178.106L204.257 86.6849C208.237 76.2141 200.502 65 189.301 65H105.188C96.8842 65 89.4439 70.1315 86.4934 77.8939Z" stroke="#2F2F2F" stroke-width="20"/> </g> </svg>`
      },
      {
        id: "trapezoid",
        tooltip: "Trapezoid",
        type: "tool",
        module: "pages/editor/toolbar/shape",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_135_65" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_135_65)"> <path d="M72.4615 71.8814L43.377 167.881C37.9295 185.862 51.3863 204 70.1742 204H186.826C205.614 204 219.07 185.862 213.623 167.881L184.539 71.8814C180.961 60.0745 170.078 52 157.741 52H99.2587C86.9217 52 76.0385 60.0745 72.4615 71.8814Z" stroke="white" stroke-width="32"/> <path d="M64.4319 174.26L93.5164 78.2603C94.2829 75.7303 96.615 74 99.2587 74H157.741C160.385 74 162.717 75.7303 163.484 78.2603L192.568 174.26C193.735 178.113 190.852 182 186.826 182H70.1742C66.1482 182 63.2646 178.113 64.4319 174.26Z" stroke="white" stroke-width="12"/> <path d="M78.2037 73.6211L87.7741 76.5206L78.2037 73.6211L49.1193 169.621C44.8391 183.749 55.4123 198 70.1742 198H186.826C201.588 198 212.161 183.749 207.881 169.621L178.796 73.6211C175.986 64.3442 167.435 58 157.741 58H99.2587C89.5654 58 81.0143 64.3443 78.2037 73.6211Z" stroke="#2F2F2F" stroke-width="20"/> </g> </svg>`
      },
      {
        id: "rhombus",
        tooltip: "Rhombus",
        type: "tool",
        module: "pages/editor/toolbar/shape",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_135_73" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_135_73)"> <path d="M104.703 211.898L118.015 203.023L104.703 211.898C115.786 228.523 140.214 228.523 151.297 211.898L196.875 143.532C203.145 134.126 203.145 121.874 196.875 112.468L151.297 44.1017L137.985 52.9769L151.297 44.1017C140.214 27.4772 115.786 27.4772 104.703 44.1017L59.1248 112.468C52.8547 121.874 52.8547 134.126 59.1248 143.532L104.703 211.898Z" stroke="white" stroke-width="32"/> <path d="M77.4299 124.672L123.008 56.3051C125.383 52.7427 130.617 52.7427 132.992 56.3051L178.57 124.672C179.914 126.687 179.914 129.313 178.57 131.328L132.992 199.695C130.617 203.257 125.383 203.257 123.008 199.695L77.4299 131.328C76.0863 129.313 76.0863 126.687 77.4299 124.672Z" stroke="white" stroke-width="12"/> <path d="M109.695 47.4299L64.1171 115.797C59.1906 123.186 59.1906 132.814 64.1171 140.203L109.695 208.57C118.403 221.632 137.597 221.632 146.305 208.57L191.883 140.203C196.809 132.814 196.809 123.186 191.883 115.797L146.305 47.4299C137.597 34.3678 118.403 34.3678 109.695 47.4299Z" stroke="#2F2F2F" stroke-width="20"/> </g> </svg>`
      },
      {
        id: "line",
        tooltip: "Line",
        type: "tool",
        module: "pages/editor/toolbar/shape",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_135_84" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_135_84)"> <path d="M68 188L188 68" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M68 188L188 68" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> </g> </svg>`
      }
      /*
      {
        id: "polygon",
        tooltip: "Custom Polygon",
        type: "tool",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_135_91" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_135_91)"> <path d="M197.929 88.0294L149.16 52.5967C136.543 43.4296 119.457 43.4296 106.84 52.5968L58.0708 88.0294C45.4533 97.1966 40.1736 113.446 44.9931 128.279L63.6211 185.61C68.4406 200.443 82.2631 210.485 97.8592 210.485H158.141C173.737 210.485 187.559 200.443 192.379 185.61L211.007 128.279C215.826 113.446 210.547 97.1966 197.929 88.0294Z" stroke="white" stroke-width="32"/> <path d="M136.229 70.3951L184.998 105.828C189.905 109.393 191.958 115.712 190.084 121.48L171.456 178.812C169.581 184.58 164.206 188.485 158.141 188.485H97.8592C91.794 188.485 86.4186 184.58 84.5444 178.812L65.9163 121.48C64.0421 115.712 66.0953 109.393 71.0021 105.828L119.771 70.3951C124.678 66.8301 131.322 66.8301 136.229 70.3951Z" stroke="white" stroke-width="12"/> <path d="M194.402 92.8835L145.634 57.4508C135.119 49.8115 120.881 49.8115 110.366 57.4509L61.5976 92.8835C51.0829 100.523 46.6832 114.064 50.6994 126.425L69.3275 183.756C73.3437 196.116 84.8624 204.485 97.8592 204.485H158.141C171.138 204.485 182.656 196.116 186.673 183.756L205.301 126.425C209.317 114.064 204.917 100.523 194.402 92.8835Z" stroke="#2F2F2F" stroke-width="20"/> </g> </svg>`
      }
      */
    ],
    "sticky": { id: "sticky", type: "tool" },
    "media": [
      {
        id: "upload",
        tooltip: "Upload Image",
        type: "tool",
        module: "pages/editor/toolbar/upload",
        image: `<svg width="40" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_233_21" maskUnits="userSpaceOnUse" x="-0.459759" y="-0.0484619" width="51" height="42" fill="black"> <rect fill="white" x="-0.459759" y="-0.0484619" width="51" height="42"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z" fill="#2F2F2F"/> <path d="M20.9726 12.2718L23.1377 11.0218V11.0218L20.9726 12.2718ZM15.7765 12.2718L17.9415 13.5218L15.7765 12.2718ZM28.5261 25.3549L26.3611 26.6049L28.5261 30.3549L30.6912 26.6049L28.5261 25.3549ZM32.5377 18.4066L30.3726 17.1566V17.1566L32.5377 18.4066ZM37.7339 18.4066L35.5688 19.6566L35.5688 19.6566L37.7339 18.4066ZM47.0534 34.5485L49.2184 33.2985L47.0534 34.5485ZM25.2345 38.9937L25.7061 36.5386L25.4724 36.4937H25.2345V38.9937ZM2.94664 34.4937L0.781578 33.2437L2.94664 34.4937ZM43.0431 7.66221C43.0431 8.88313 42.0533 9.87289 40.8324 9.87289V14.8729C44.8148 14.8729 48.0431 11.6446 48.0431 7.66221H43.0431ZM40.8324 5.45154C42.0533 5.45154 43.0431 6.44129 43.0431 7.66221H48.0431C48.0431 3.67987 44.8148 0.451538 40.8324 0.451538V5.45154ZM38.6217 7.66221C38.6217 6.44129 39.6115 5.45154 40.8324 5.45154V0.451538C36.8501 0.451538 33.6217 3.67987 33.6217 7.66221H38.6217ZM40.8324 9.87289C39.6115 9.87289 38.6217 8.88313 38.6217 7.66221H33.6217C33.6217 11.6446 36.8501 14.8729 40.8324 14.8729V9.87289ZM23.1377 11.0218C21.0207 7.35513 15.7284 7.35511 13.6114 11.0218L17.9415 13.5218C18.134 13.1885 18.6151 13.1885 18.8076 13.5218L23.1377 11.0218ZM30.6912 24.1049L23.1377 11.0218L18.8076 13.5218L26.3611 26.6049L30.6912 24.1049ZM30.3726 17.1566L26.3611 24.1049L30.6912 26.6049L34.7028 19.6566L30.3726 17.1566ZM39.8989 17.1566C37.782 13.4899 32.4896 13.49 30.3726 17.1566L34.7028 19.6566C34.8952 19.3233 35.3763 19.3233 35.5688 19.6566L39.8989 17.1566ZM49.2184 33.2985L39.8989 17.1566L35.5688 19.6566L44.8883 35.7985L49.2184 33.2985ZM44.4553 41.5485C48.6892 41.5485 51.3354 36.9651 49.2184 33.2985L44.8883 35.7985C45.0807 36.1318 44.8402 36.5485 44.4553 36.5485V41.5485ZM25.8163 41.5485H44.4553V36.5485H25.8163V41.5485ZM24.7628 41.4488C25.1057 41.5147 25.458 41.5485 25.8163 41.5485V36.5485C25.7728 36.5485 25.7365 36.5444 25.7061 36.5386L24.7628 41.4488ZM5.54471 41.4937H25.2345V36.4937H5.54471V41.4937ZM0.781578 33.2437C-1.33537 36.9104 1.3108 41.4937 5.54471 41.4937V36.4937C5.15982 36.4937 4.91925 36.077 5.11171 35.7437L0.781578 33.2437ZM13.6114 11.0218L0.781578 33.2437L5.11171 35.7437L17.9415 13.5218L13.6114 11.0218Z" fill="white" mask="url(#path-1-outside-1_233_21)"/> </svg>`
      },
      {
        id: "embed",
        //tooltip: "Embed Website",
        tooltip: "Coming Soon",
        soon: true,
        type: "tool",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_136_99" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_136_99)"> <rect x="40" y="67" width="177" height="122" rx="32" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M106 144.033V110.967C106 104.784 112.714 100.938 118.047 104.066L146.235 120.599C151.505 123.691 151.505 131.309 146.235 134.401L118.047 150.934C112.714 154.062 106 150.216 106 144.033Z" fill="white"/> </g> </svg>`
      }
    ]
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");
    editor.toolbar = this;

    frame.style.maxHeight = "calc(100vh - 148px)";
    frame.style.overflow = "auto";
    frame.style.background = "var(--pageColor)";
    frame.style.boxShadow = "var(--lightShadow)";
    frame.style.borderRadius = "16px";
    frame.style.display = "flex";
    frame.style.flexDirection = "column";
    frame.style.gap = "6px";
    frame.setAttribute("keeptooltip", "");

    let content = editor.page.querySelector(".eContent");

    let subTools = frame.querySelector(".eSubToolHolder");
    let subToolContentHolder = subTools.querySelector(".eSubToolContentHolder");
    let subToolContentScroll = subTools.querySelector(".eSubToolContentScroll");
    let subToolContent = subToolContentScroll.querySelector(".eSubToolContent");
    let mainSubtoolButton;

    let subSubTools = frame.querySelector(".eSubToolHolder[option]");
    let subSubToolContentHolder = subSubTools.querySelector(".eSubToolContentHolder");
    let subSubToolContentScroll = subSubTools.querySelector(".eSubToolContentScroll");
    let subSubToolContent = subSubToolContentScroll.querySelector(".eSubToolContent");
    let mainSubSubtoolButton;

    let tooltipText = frame.querySelector(".eToolHoverTooltip");
    let tooltipElement;
    let tooltipOpen = false;
    this.updateTooltipHover = () => {
      if (tooltipElement != null) {
        if (tooltipElement.hasAttribute("selected") == true && (tooltipElement.hasAttribute("option") == true || tooltipElement.hasAttribute("action") == true)) {
          closeTooltipHover();
          return;
        }

        let themeColor = getComputedStyle(tooltipElement).getPropertyValue("--hoverTooltip");
        if (themeColor != "" && themeColor != null) {
          tooltipText.style.color = themeColor;
        } else {
          tooltipText.style.color = "var(--theme)";
        }

        if (tooltipText.parentElement.closest(".eToolbar .content") != null) {
          tooltipText.style.transformOrigin = "center left";

          let toolsRect = frame.getBoundingClientRect();
          let buttonRect = tooltipElement.getBoundingClientRect();

          let setLeft = frame.offsetWidth;
          let setTop = buttonRect.top - toolsRect.top + (tooltipElement.offsetHeight / 2) - (tooltipText.offsetHeight / 2);
          let subToolWidth = parseInt(subTools.getAttribute("setwidth")) + 4;
          let subToolTop = parseInt(subTools.getAttribute("settop"));
          if (tooltipElement.hasAttribute("tool") == false) {
            setLeft += subToolWidth;
          } else if (mainSubtoolButton != null) {
            if (setTop > subToolTop && setTop < subToolTop + parseInt(subTools.getAttribute("setheight"))) {
              setLeft += subToolWidth;
            }
          }

          tooltipText.style.top = setTop + "px";
          tooltipText.style.left = setLeft + 6 + "px";
        } else {
          let actionContainer = tooltipElement.closest(".eActionContainer");
          let barRect = tooltipText.parentElement.getBoundingClientRect();
          let buttonRect = tooltipElement.getBoundingClientRect();

          tooltipText.style.left = (buttonRect.left - barRect.left) + (tooltipElement.clientWidth / 2) - (tooltipText.clientWidth / 2) + "px";

          if (actionContainer == null) {
            if (tooltipText.parentElement.hasAttribute("tooltipbottom") == false) {
              // Show tooltip on the top
              tooltipText.style.transformOrigin = "center bottom";
              let setTop = -tooltipText.clientHeight - 6;
              /*
              if (actionContainer != null) {
                let actionRect = actionContainer.getBoundingClientRect();
                if (actionRect.top - (tooltipText.clientHeight + 20) > 50) {
                  setTop -= actionContainer.offsetHeight;
                } else {
                  setTop += tooltipText.clientHeight + 8;
                }
              }
              */
              tooltipText.style.top = -tooltipText.clientHeight - 6 + "px";
            } else {
              // Show tooltip on the bottom
              tooltipText.style.transformOrigin = "center top";
              tooltipText.style.top = tooltipText.parentElement.clientHeight + 6 + "px";
            }
          } else {
            let actionRect = actionContainer.getBoundingClientRect();
            if (tooltipText.parentElement.hasAttribute("actionuitop") == true) {
              if (actionRect.top - tooltipText.clientHeight - 6 > 66) {
                tooltipText.style.transformOrigin = "center bottom";
                tooltipText.style.top = -actionContainer.offsetHeight - tooltipText.clientHeight - 6 + "px";
                /*
                if (tooltipText.parentElement.hasAttribute("tooltipbottom") == false) {
                  tooltipText.style.top = -actionContainer.offsetHeight - tooltipText.clientHeight - 6 + "px";
                } else {
                  tooltipText.style.top = actionContainer.offsetHeight - tooltipText.clientHeight - 6 + "px";
                }
                */
              } else {
                tooltipText.style.transformOrigin = "center top";
                tooltipText.style.top = "4px";
                /*
                if (tooltipText.parentElement.hasAttribute("tooltipbottom") == true) {
                  tooltipText.style.top = tooltipText.parentElement.clientHeight + actionContainer.offsetHeight + 6 + "px";
                } else {
                  tooltipText.style.top = "4px";
                }
                */
              }
            } else {
              if (actionRect.top + actionContainer.clientHeight + tooltipText.clientHeight + 6 < fixed.offsetHeight - 66) {
                tooltipText.style.transformOrigin = "center top";
                tooltipText.style.top = tooltipText.parentElement.clientHeight + actionContainer.offsetHeight + 6 + "px";
              } else {
                tooltipText.style.transformOrigin = "center bottom";
                tooltipText.style.top = actionContainer.offsetHeight - tooltipText.clientHeight - 6 + "px";
              }
            }
          }
        }
      }
    }
    let closeTooltipHover = async () => {
      if (tooltipOpen == false) {
        return;
      }
      tooltipOpen = false;
      tooltipText.style.transform = "scale(0)";
      tooltipText.style.opacity = 0;
      await sleep(300);
      if (tooltipOpen == false) {
        tooltipText.style.transition = "unset";
      }
    }
    this.closeTooltipHover = closeTooltipHover;
    editor.page.addEventListener("mousemove", (event) => {
      let hoverElem = event.target;
      if (hoverElem == null) {
        return;
      }
      element = hoverElem.closest("button[tool], button[subtool], button[option], button[action]");
      if ((element == null || element.hasAttribute("tooltip") == false) && (hoverElem.closest("[keeptooltip]") == null || (element != null && element.hasAttribute("option") == true))) {
        tooltipElement = null;
        if (tooltipElement == null) {
          closeTooltipHover();
        }
        return;
      } else if (element == null) {
        return;
      }
      //clearTimeout(closeTimeout);
      if (element.hasAttribute("selected") == true && (element.hasAttribute("option") == true || element.hasAttribute("action") == true)) {
        closeTooltipHover();
        return;
      }
      let toolbar = hoverElem.closest(".eToolbar .content");
      if (toolbar != null && tooltipText.parentElement != toolbar) {
        toolbar.appendChild(tooltipText);
      }
      toolbar = hoverElem.closest(".eSelectBar");
      if (toolbar != null && tooltipText.parentElement != toolbar) {
        toolbar.appendChild(tooltipText);
      }
      tooltipElement = element;
      tooltipText.textContent = element.getAttribute("tooltip");
      this.updateTooltipHover();
      tooltipOpen = true;
      tooltipText.offsetHeight;
      tooltipText.style.transition = ".3s";
      tooltipText.style.transform = "scale(1)";
      tooltipText.style.opacity = 1;
    });
    editor.page.addEventListener("mouseleave", closeTooltipHover);

    let cursorModule = await getModule("pages/editor/toolbar/cursor");

    this.disableTool = () => {
      for (let i = 0; i < toolEvents.length; i++) {
        let remEvent = toolEvents[i];
        remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
      }
      toolEvents = [];
      body.style.removeProperty("user-select");
      editor.page.style.removeProperty("touch-action");
      editor.page.removeAttribute("enabled");
      let editorTools = content.querySelectorAll("[tooleditor]");
      for (let i = 0; i < editorTools.length; i++) {
        let tool = editorTools[i];
        tool.removeAttribute("tooleditor");
        tool.style.opacity = 0;
        if (tool.hasAttribute("src") == true && tool.getAttribute("src").startsWith("blob:") == true) {
          URL.revokeObjectURL(tool.getAttribute("src"));
        }
      }
      if (editorTools.length > 0) {
        (async function () {
          await sleep(150);
          for (let i = 0; i < editorTools.length; i++) {
            let tool = editorTools[i];
            if (tool != null) {
              tool.remove();
            }
          }
        })();
      }
      editor.selecting = {};
      cursorModule.updateBox();
    }
    let tempToolListen = (parent, listen, runFunc, extra) => {
      parent.addEventListener(listen, runFunc, extra);
      toolEvents.push({ type: "event", parent: parent, name: listen, listener: runFunc });
    }
    let utils = await getModule("pages/editor/annotation");
    let mouseSVG;
    this.currentToolModule = "pages/editor/toolbar/cursor";
    let pageContent = editor.page.querySelector(".eContent");
    this.enableTool = async () => {
      this.disableTool();
      let module;
      if (this.currentToolModule != null) {
        module = await getModule(this.currentToolModule);
      }
      if (module != null) {
        module.js(editor, utils, tempToolListen, {
          tool: selectedSubtoolToolID
        });
      }
      module = module || {};
      editor.realtime.tool = module.realtimeTool || 0;
      editor.selecting = {};
      editor.realtime.passthrough = module.publish;
      if (editor.realtime.module != null) {
        editor.realtime.module.publishShort();
      }
      if (module.mouse == "default") {
        pageContent.style.removeProperty("cursor");
        mouseSVG = null;
      } else if (module.mouse == "grab") {
        pageContent.style.cursor = "grab";
        mouseSVG = null;
      } else {
        let setSVG = module.mouse || `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_231_14)"> <mask id="path-1-outside-1_231_14" maskUnits="userSpaceOnUse" x="28" y="27" width="21" height="28" fill="black"> <rect fill="white" x="28" y="27" width="21" height="28"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M34.7886 30.574C32.8075 29.1419 30.0371 30.5535 30.0312 32.998L30 45.8878C29.9946 48.1311 32.3632 49.5865 34.362 48.5681L36.9809 47.2337L38.5573 50.3275C39.3465 51.8764 41.2418 52.4922 42.7907 51.703C44.3396 50.9138 44.9554 49.0185 44.1662 47.4696L42.5899 44.3757L44.8395 43.2295C46.8383 42.2111 47.053 39.4394 45.235 38.1252L34.7886 30.574Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M34.7886 30.574C32.8075 29.1419 30.0371 30.5535 30.0312 32.998L30 45.8878C29.9946 48.1311 32.3632 49.5865 34.362 48.5681L36.9809 47.2337L38.5573 50.3275C39.3465 51.8764 41.2418 52.4922 42.7907 51.703C44.3396 50.9138 44.9554 49.0185 44.1662 47.4696L42.5899 44.3757L44.8395 43.2295C46.8383 42.2111 47.053 39.4394 45.235 38.1252L34.7886 30.574Z" fill="#2F2F2F"/> <path d="M30.0312 32.998L28.0312 32.9932L30.0312 32.998ZM34.7886 30.574L33.617 32.1949L33.617 32.1949L34.7886 30.574ZM30 45.8878L28 45.883L30 45.8878ZM34.362 48.5681L33.454 46.786L33.454 46.786L34.362 48.5681ZM36.9809 47.2337L38.7629 46.3257L37.8549 44.5437L36.0729 45.4516L36.9809 47.2337ZM38.5573 50.3275L40.3393 49.4195L40.3393 49.4195L38.5573 50.3275ZM42.7907 51.703L43.6987 53.485L43.6987 53.485L42.7907 51.703ZM44.1662 47.4696L45.9483 46.5616L45.9483 46.5616L44.1662 47.4696ZM42.5899 44.3757L41.6819 42.5937L39.8999 43.5017L40.8078 45.2837L42.5899 44.3757ZM44.8395 43.2295L45.7475 45.0115L44.8395 43.2295ZM45.235 38.1252L46.4067 36.5043L46.4067 36.5043L45.235 38.1252ZM32.0312 33.0029C32.0331 32.188 32.9566 31.7175 33.617 32.1949L35.9603 28.9531C32.6584 26.5663 28.041 28.9189 28.0312 32.9932L32.0312 33.0029ZM32 45.8926L32.0312 33.0029L28.0312 32.9932L28 45.883L32 45.8926ZM33.454 46.786C32.7877 47.1255 31.9982 46.6404 32 45.8926L28 45.883C27.991 49.6218 31.9387 52.0475 35.27 50.3501L33.454 46.786ZM36.0729 45.4516L33.454 46.786L35.27 50.3501L37.8889 49.0157L36.0729 45.4516ZM40.3393 49.4195L38.7629 46.3257L35.1989 48.1416L36.7753 51.2355L40.3393 49.4195ZM41.8827 49.921C41.318 50.2087 40.627 49.9842 40.3393 49.4195L36.7753 51.2355C38.0659 53.7685 41.1657 54.7757 43.6987 53.485L41.8827 49.921ZM42.3842 48.3776C42.672 48.9423 42.4474 49.6333 41.8827 49.921L43.6987 53.485C46.2318 52.1944 47.2389 49.0947 45.9483 46.5616L42.3842 48.3776ZM40.8078 45.2837L42.3842 48.3776L45.9483 46.5616L44.3719 43.4678L40.8078 45.2837ZM43.9315 41.4475L41.6819 42.5937L43.4978 46.1578L45.7475 45.0115L43.9315 41.4475ZM44.0633 39.7461C44.6693 40.1841 44.5978 41.108 43.9315 41.4475L45.7475 45.0115C49.0788 43.3141 49.4367 38.6946 46.4067 36.5043L44.0633 39.7461ZM33.617 32.1949L44.0633 39.7461L46.4067 36.5043L35.9603 28.9531L33.617 32.1949Z" fill="white" mask="url(#path-1-outside-1_231_14)"/> </g> <defs> <filter id="filter0_d_231_14" x="24" y="23.9961" width="28.4775" height="34.0508" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_231_14"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_231_14" result="shape"/> </filter> </defs> </svg>`;
        setSVG = setSVG.replace(/COLOR_REPLACE/g, "#" + module.color).replace(/OPACITY_REPLACE/g, module.opacity / 100);
        if (setSVG != mouseSVG) {
          mouseSVG = setSVG;
          let reader = new FileReader();
          reader.readAsDataURL(new Blob([setSVG], { type: "image/svg+xml" }));
          reader.onload = () => {
            pageContent.style.cursor = "url('" + reader.result + "') 28 28, auto";
          }
        }
      }
    }

    let updateSubtoolUI = async () => {
      if (mainSubtoolButton != null) {
        let toolsRect = frame.getBoundingClientRect();
        let buttonRect = mainSubtoolButton.getBoundingClientRect();

        if (subToolContent.childElementCount < 8) {
          subToolContent.style.width = "50px";
        } else {
          subToolContent.style.width = "106px";
        }

        subToolContentScroll.style.maxHeight = frame.clientHeight + "px";

        let subtoolHeight = subToolContentScroll.offsetHeight;
        let setSubToolTop = buttonRect.top - toolsRect.top;
        if (setSubToolTop + subtoolHeight > frame.offsetHeight) {
          setSubToolTop = frame.offsetHeight - subtoolHeight;
        } else if (setSubToolTop < 0) {
          setSubToolTop = 0;
        }
        subTools.style.transition = "top .3s, opacity .3s, transform .3s, border-radius .5s";
        subTools.offsetHeight;
        subTools.style.top = setSubToolTop + "px";
        subTools.setAttribute("settop", setSubToolTop);

        if (setSubToolTop < 17) {
          frame.style.borderTopRightRadius = "0px";
        } else {
          frame.style.borderTopRightRadius = "16px";
        }
        if (setSubToolTop + subtoolHeight > frame.offsetHeight - 16) {
          frame.style.borderBottomRightRadius = "0px";
        } else {
          frame.style.borderBottomRightRadius = "16px";
        }

        subTools.setAttribute("setwidth", subToolContentScroll.offsetWidth);
        subTools.setAttribute("setheight", subToolContentScroll.offsetHeight);
        subToolContentHolder.style.width = subToolContentScroll.offsetWidth + "px";
        subToolContentHolder.style.height = subToolContentScroll.offsetHeight + "px";

        subTools.style.opacity = 1;
        subTools.style.transform = "scale(1)";

        subToolContentHolder.style.transition = "width .3s, height .3s";
      }
      if (mainSubSubtoolButton != null) {
        let toolsRect = subTools.getBoundingClientRect();
        let buttonRect = mainSubSubtoolButton.getBoundingClientRect();

        subSubToolContentScroll.style.maxHeight = subTools.clientHeight + "px";

        let subSubtoolHeight = subSubToolContentScroll.offsetHeight;
        let setSubSubToolTop = buttonRect.top - toolsRect.top;
        if (setSubSubToolTop + subSubtoolHeight > subTools.offsetHeight) {
          setSubSubToolTop = subTools.offsetHeight - subSubtoolHeight;
        } else if (setSubSubToolTop < 0) {
          setSubSubToolTop = 0;
        }
        subSubTools.style.transition = "top .3s, opacity .3s, transform .3s, border-radius .5s";
        subTools.offsetHeight;
        subSubTools.style.top = setSubSubToolTop + "px";

        if (setSubSubToolTop < 17) {
          subTools.style.borderTopRightRadius = "0px";
        } else {
          subTools.style.borderTopRightRadius = "16px";
        }
        if (setSubSubToolTop + subSubtoolHeight > subTools.offsetHeight - 16) {
          subTools.style.borderBottomRightRadius = "0px";
        } else {
          subTools.style.borderBottomRightRadius = "16px";
        }

        subSubToolContentHolder.style.width = subSubToolContentScroll.offsetWidth + "px";
        subSubToolContentHolder.style.height = subSubToolContentScroll.offsetHeight + "px";

        subSubTools.style.opacity = 1;
        subSubTools.style.transform = "scale(1)";

        subSubToolContentHolder.style.transition = "width .3s, height .3s";
      }
    }
    editor.updateSubtoolUI = updateSubtoolUI;
    tempListen(window, "resize", updateSubtoolUI);
    frame.addEventListener("scroll", updateSubtoolUI);
    subToolContentScroll.addEventListener("scroll", updateSubtoolUI);

    let preferences = editor.preferences.tools;

    let closeSubtoolUI = async () => {
      if (mainSubtoolButton != null) {
        subTools.style.top = mainSubtoolButton.getBoundingClientRect().top + (mainSubtoolButton.offsetHeight / 2) - frame.getBoundingClientRect().top + "px";
        mainSubtoolButton = null;
      }
      this.updateTooltipHover();
      subToolContentHolder.style.transition = "unset";
      subTools.style.transform = "scale(0)";
      subTools.style.opacity = 0;
      frame.style.borderTopRightRadius = "16px";
      frame.style.borderBottomRightRadius = "16px";
      await sleep(300);
      if (subTools.style.opacity != 0) {
        return;
      }
      subToolContent.innerHTML = "";
      subToolContentHolder.style.removeProperty("width");
      subToolContentHolder.style.removeProperty("height");
      subTools.style.transition = "opacity .3s, transform .3s";
    }
    let showSubtoolUI = async (button, override) => {
      this.closeSubSubtoolUI();

      if (button.hasAttribute("tool") == true) {
        if (mainSubtoolButton == button) {
          closeSubtoolUI();
          return;
        }
        mainSubtoolButton = button;

        let toolID = mainSubtoolButton.getAttribute("tool");
        subToolContent.setAttribute("tool", toolID);
        let loadTools = this.tools[toolID];
        if (Array.isArray(loadTools) == true) {
          subToolContent.innerHTML = "";
          for (let i = 0; i < loadTools.length; i++) {
            let toolData = loadTools[i];
            let insertHTML = `<button class="eTool" new><div></div></button>`;
            if (toolData.type == "divider") {
              insertHTML = `<div class="eDivider" keeptooltip new></div>`;
            }
            subToolContent.insertAdjacentHTML("beforeend", insertHTML);
            let newSubItem = subToolContent.querySelector("[new]");
            newSubItem.removeAttribute("new");

            // TEMP CODE:
            if (toolData.soon == true) {
              newSubItem.setAttribute("soon", "");
            }

            if (toolData.type == "tool") {
              newSubItem.setAttribute("subtool", toolData.id);
              if (toolData.tooltip != null) {
                newSubItem.setAttribute("tooltip", toolData.tooltip);
              }
              if (toolData.module != null) {
                newSubItem.setAttribute("module", toolData.module);
              }
              newSubItem.querySelector("div").innerHTML = toolData.image;
            } else if (toolData.module != null) {
              newSubItem.setAttribute("option", toolData.module);
              let module = await getModule(toolData.module);
              let buttonHolder = newSubItem.querySelector("div");
              buttonHolder.innerHTML = module.button;
              if (module.tooltip != null) {
                newSubItem.setAttribute("tooltip", module.tooltip);
              }
            }
          }

          let selectTool = override || (preferences[toolID] || {}).subtool;
          if (selectTool != null) {
            let selectSubtool = subToolContent.querySelector('.eTool[subtool="' + selectTool + '"]');
            if (selectSubtool != null) {
              this.currentToolModule = selectSubtool.getAttribute("module");
              selectedSubtoolToolID = selectSubtool.getAttribute("subtool");
              selectSubtool.setAttribute("selected", "");
            }
          } else {
            this.currentToolModule = null;
          }

          subTools.style.top = mainSubtoolButton.getBoundingClientRect().top + (mainSubtoolButton.offsetHeight / 2) - frame.getBoundingClientRect().top + "px";
          this.updateToolbar();
          updateSubtoolUI();
          this.updateTooltipHover();
        } else { // No need as the main tool is the subtool
          this.currentToolModule = loadTools.module;
          this.updateToolbar();
          closeSubtoolUI();
        }
      }
    }

    this.closeSubSubtoolUI = async () => {
      if (mainSubSubtoolButton != null) {
        subSubTools.style.top = mainSubSubtoolButton.getBoundingClientRect().top + (mainSubSubtoolButton.offsetHeight / 2) - subTools.getBoundingClientRect().top + "px";
        mainSubSubtoolButton.removeAttribute("selected");
        mainSubSubtoolButton = null;
      }
      subSubToolContentHolder.style.transition = "unset";
      subSubTools.style.transform = "scale(0)";
      subSubTools.style.opacity = 0;
      subTools.style.borderTopRightRadius = "16px";
      subTools.style.borderBottomRightRadius = "16px";
      await sleep(300);
      if (subSubTools.style.opacity != 0) {
        return;
      }
      subSubToolContent.innerHTML = "";
      subSubToolContentHolder.style.removeProperty("width");
      subSubToolContentHolder.style.removeProperty("height");
      subSubTools.style.transition = "opacity .3s, transform .3s";
    }
    let showSubSubtoolUI = async (button) => {
      if (mainSubSubtoolButton == button) {
        this.closeSubSubtoolUI();
        button.removeAttribute("selected");
        return;
      }
      mainSubSubtoolButton = button;

      let module = await getModule(button.getAttribute("option"));
      if (module.html) {
        subSubToolContent.innerHTML = module.html;
        module.js(subSubToolContent, subToolContent.getAttribute("tool"));
      }

      subSubTools.style.top = mainSubSubtoolButton.getBoundingClientRect().top + (mainSubSubtoolButton.offsetHeight / 2) - subTools.getBoundingClientRect().top + "px";
      updateSubtoolUI();
      this.updateTooltipHover();
    }

    //showSubtoolUI(frame.querySelector('[tool="select"]'));
    let selectedToolID = "select";
    let selectedSubtoolToolID = "select";
    this.setCurrentTool = async (element, override) => {
      if (element == null) {
        return;
      }
      element = element.closest("button");
      if (element == null) {
        return;
      }
      if (element.hasAttribute("soon")) { // TEMP CODE
        return;
      }
      if (element.hasAttribute("noselect") == true) {
        return;
      }
      let lastSelectedQuery = "button[selected]";
      if (element.hasAttribute("option") == true) {
        lastSelectedQuery += "[option]";
      }
      let lastSelected = element.parentElement.querySelectorAll(lastSelectedQuery);
      for (let i = 0; i < lastSelected.length; i++) {
        lastSelected[i].removeAttribute("selected");
      }
      element.setAttribute("selected", "");
      if (element.hasAttribute("tool") == true) {
        selectedToolID = element.getAttribute("tool");
        await showSubtoolUI(element, override);
        //this.currentToolModule = element.getAttribute("module");
      } else if (element.hasAttribute("subtool") == true) {
        selectedSubtoolToolID = element.getAttribute("subtool");
        if (preferences[selectedToolID].subtool != null) {
          preferences[selectedToolID].subtool = selectedSubtoolToolID
        }
        this.currentToolModule = element.getAttribute("module");
        await this.updateToolbar();
        await this.closeSubSubtoolUI();
      } else if (element.hasAttribute("option") == true && element.getAttribute("option").length > 0) {
        await showSubSubtoolUI(element);
      }
    }
    frame.addEventListener("click", async (event) => {
      this.setCurrentTool(event.target);
    });

    this.updateToolbar = (noUpdateTool) => {
      let updateColors = frame.querySelectorAll("[fillcoloropacity], [strokecolor], [backcolor], [thickness], [opacity]");
      for (let i = 0; i < updateColors.length; i++) {
        let updateTip = updateColors[i];
        let parent = updateTip.closest("[tool]");
        let toolPref = preferences[parent.getAttribute("tool")];
        if (toolPref != null) {
          let setOpacity = (toolPref.opacity || 0) / 100;
          if (updateTip.hasAttribute("fillcoloropacity") == true && toolPref.color != null) {
            updateTip.setAttribute("fill", editor.hexToRGB(toolPref.color.selected, setOpacity));
          } else if (updateTip.hasAttribute("strokecolor") == true && toolPref.color != null) {
            updateTip.setAttribute("stroke", editor.hexToRGB(toolPref.color.selected));
          } else if (updateTip.hasAttribute("backcolor") == true && toolPref.color != null) {
            updateTip.style.background = editor.hexToRGB(toolPref.color.selected, setOpacity);
          } else if (updateTip.hasAttribute("thickness") == true && toolPref.color != null) {
            updateTip.style.height = toolPref.thickness + "px";
            updateTip.style.background = editor.hexToRGB(toolPref.color.selected, setOpacity);
          } else if (updateTip.hasAttribute("opacity") == true && toolPref.color != null) {
            updateTip.setAttribute("fill", editor.hexToRGB(toolPref.color.selected, setOpacity));
          }
        }
      }
      if (noUpdateTool != true) {
        this.enableTool(this.currentToolModule);
      }
      editor.savePreferences();
    }
    this.updateToolbar();

    // UNDO / REDO
    let undoButton = editor.page.querySelector(".eUndo");
    let redoButton = editor.page.querySelector(".eRedo");
    utils.updateHistory = () => {
      let isEditor = editor.getSelf().access > 0;
      if (utils.history.length > 0 && utils.location > -1 && isEditor) {
        undoButton.removeAttribute("disabled");
      } else {
        undoButton.setAttribute("disabled", "");
      }
      if (utils.history.length > utils.location + 1 && isEditor) {
        redoButton.removeAttribute("disabled");
      } else {
        redoButton.setAttribute("disabled", "");
      }
    }
    undoButton.addEventListener("click", async () => {
      let event = utils.history[utils.location];
      if (event == null) {
        return;
      }
      let addRedo = event.redo.length < 1;
      let sync = getEpoch();
      switch (event.type) {
        case "update":
          for (let i = 0; i < event.changes.length; i++) {
            let change = event.changes[i];
            change.sync = getEpoch();
            if (addRedo) {
              let changeKeys = Object.keys(change);
              let annotation = (editor.annotations[change._id] || {}).render || {};
              let redoAnno = { _id: change._id };
              for (let u = 0; u < changeKeys.length; u++) {
                redoAnno[changeKeys[u]] = annotation[changeKeys[u]];
              }
              event.redo.push(JSON.parse(JSON.stringify(redoAnno)));
            }
            if (editor.selecting[event.redo[i]._id] != null) {
              editor.selecting[event.changes[i]._id] = { ...editor.selecting[event.changes[i]._id], ...change };
            } else {
              editor.realtimeSelect[change._id] = { ...change, done: true };
            }
            let annoContentTx = editor.page.querySelector('.eAnnotation[anno="' + change._id + '"] div[contenteditable]');
            if (annoContentTx != null) {
              annoContentTx.removeAttribute("contenteditable");
            }
            await utils.save(change, null, sync);
            if (annoContentTx != null) {
              annoContentTx.setAttribute("contenteditable", "true");
            }
          }
          break;
        case "remove":
          for (let i = 0; i < event.changes.length; i++) {
            let change = { remove: true };
            let changeID = event.changes[i]._id;
            let annotation = (editor.annotations[changeID] || {}).render || {};
            if (addRedo) {
              event.redo.push(JSON.parse(JSON.stringify(annotation)));
            }
            editor.realtimeSelect[changeID] = { ...change, done: true };
            await utils.save({ _id: changeID, ...change }, null, sync);
            delete editor.selecting[changeID];
          }
          break;
        case "add":
          for (let i = 0; i < event.changes.length; i++) {
            let saveAnno = event.changes[i];
            let oldID = saveAnno._id;
            //delete editor.annotations[oldID];
            let tempID = utils.tempID();
            for (let h = 0; h < utils.history.length; h++) {
              let event = utils.history[h];
              for (let c = 0; c < event.changes.length; c++) {
                if (event.changes[c]._id == oldID) {
                  event.changes[c]._id = tempID;
                }
              }
              for (let c = 0; c < event.redo.length; c++) {
                if (event.redo[c]._id == oldID) {
                  event.redo[c]._id = tempID;
                }
              }
            }
            if (addRedo) {
              event.redo.push({ remove: true, _id: tempID });
            }
            editor.realtimeSelect[tempID] = { ...saveAnno, done: true };
            await utils.save({ ...saveAnno, _id: tempID }, null, sync);
          }
      }
      await utils.forceShort();

      utils.location--; // Remove one from location
      utils.updateHistory();

      await cursorModule.updateBox();
      await cursorModule.redrawActionUI();

      if (event.caret != null) {
        if (event.caret.undoElement != null) {
          event.caret.undoElement.focus();
          utils.setCaretPosition(event.caret.undoElement, event.caret.undoPosition);
        }
      }
    });
    redoButton.addEventListener("click", async () => {
      utils.location++; // Add one to location
      let event = utils.history[utils.location];
      if (event == null) {
        return;
      }
      let sync = getEpoch();
      switch (event.type) {
        case "update":
          for (let i = 0; i < event.redo.length; i++) {
            let change = event.redo[i];
            if (editor.selecting[event.redo[i]._id] != null) {
              editor.selecting[event.redo[i]._id] = { ...editor.selecting[event.redo[i]._id], ...change };
            } else {
              editor.realtimeSelect[change._id] = { ...change, done: true };
            }
            let annoContentTx = editor.page.querySelector('.eAnnotation[anno="' + change._id + '"] div[contenteditable]');
            if (annoContentTx != null) {
              annoContentTx.removeAttribute("contenteditable");
            }
            await utils.save(change, null, sync);
            if (annoContentTx != null) {
              annoContentTx.setAttribute("contenteditable", "true");
            }
          }
          break;
        case "remove": // Sort of Add
          for (let i = 0; i < event.redo.length; i++) {
            let saveAnno = event.redo[i];
            let oldID = saveAnno._id;
            //delete editor.annotations[oldID];
            let tempID = utils.tempID();
            for (let h = 0; h < utils.history.length; h++) {
              let event = utils.history[h];
              for (let c = 0; c < event.redo.length; c++) {
                if (oldID == event.redo[c]._id) {
                  event.redo[c]._id = tempID;
                }
              }
              for (let c = 0; c < event.changes.length; c++) {
                if (oldID == event.changes[c]._id) {
                  event.changes[c]._id = tempID;
                }
              }
            }
            editor.realtimeSelect[tempID] = { ...saveAnno, done: true };
            await utils.save({ ...saveAnno, _id: tempID }, null, sync);
          }
          break;
        case "add": // Sort of Remove
          for (let i = 0; i < event.redo.length; i++) {
            let change = { remove: true };
            let changeID = event.redo[i]._id;
            editor.realtimeSelect[changeID] = { ...change, done: true };
            await utils.save({ _id: changeID, ...change }, null, sync);
            delete editor.selecting[changeID];
          }
      }
      await utils.forceShort();

      utils.updateHistory();

      await cursorModule.updateBox();
      await cursorModule.redrawActionUI();

      if (event.caret != null) {
        if (event.caret.redoElement != null) {
          event.caret.redoElement.focus();
          utils.setCaretPosition(event.caret.redoElement, event.caret.redoPosition);
        }
      }
    });

    // HAND RAISE
    let raiseHand = editor.page.querySelector(".eHandRaise");
    raiseHand.addEventListener("click", async () => {
      let self = editor.getSelf();
      if (self.access != 0) {
        raiseHand.setAttribute("hidden", "");
        return;
      }
      raiseHand.setAttribute("disabled", "");
      if (self.hand == null) {
        let [code] = await sendRequest("PUT", "lessons/members/hand/raise", null, { session: editor.session });
        if (code == 200) {
          self.hand = getEpoch();
          raiseHand.setAttribute("selected", "");
          raiseHand.title = "Hand Raised | Asking to contribute to the lesson.";
        }
      } else {
        let [code] = await sendRequest("DELETE", "lessons/members/hand/lower", null, { session: editor.session });
        if (code == 200) {
          self.hand = null;
          raiseHand.removeAttribute("selected");
          raiseHand.title = "Raise Hand | Ask to contribute to the lesson.";
        }
      }
      raiseHand.removeAttribute("disabled", "");
    });

    //frame.closest(".eSide").style.opacity = 1;
  }
}

// CURSOR TOOL
modules["pages/editor/toolbar/cursor"] = {
  mouse: "default",
  updateBox: async function (forceNoTransition, forceUpdate) {
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    let cursor = await getModule("pages/editor/toolbar/cursor");
    let toolbarModule = await getModule("editor/toolbar");
    let content = editor.page.querySelector(".eContent");
    let pageHolderRect = content.querySelector(".ePageHolder").getBoundingClientRect();
    let selectionIDs = Object.keys(editor.selecting);
    let checkRemSelections = content.querySelectorAll(".eSelect");

    this.minX = null;
    this.maxX = null;
    this.minY = null;
    this.maxY = null;

    let removeSelections = [];
    for (let i = 0; i < checkRemSelections.length; i++) {
      let selection = checkRemSelections[i];
      let annoID = selection.getAttribute("anno");
      let anno = content.querySelector('.eAnnotation[anno="' + annoID + '"]');
      if (selectionIDs.includes(annoID) == false || anno == null) {
        if (anno != null) {
          anno.removeAttribute("selected");
          anno.removeAttribute("notransition");
          let annoTx = anno.querySelector("div[text]");
          if (annoTx != null) {
            annoTx.removeAttribute("contenteditable");

            if (annoTx.textContent.trim().length < 1) {
              let anno = (editor.annotations[annoID] || {}).render || {};
              await utils.pushHistory("add", [anno]);
              await utils.save({ _id: annoID, remove: true });
              editor.realtimeSelect[annoID] = { _id: annoID, remove: true };
              await utils.forceShort();
            }
          }

          //anno.style.zIndex = (editor.annotations[annoID] || { render: {} }).render.sync;
          //anno.style.pointerEvents = "unset";
          //anno.style.cursor = "unset";
          anno.style.removeProperty("overflow");
          anno.style.removeProperty("border-radius");
          let activeLayer = anno.parentElement.querySelector('.eSelectActive[anno="' + annoID + '"]');
          if (activeLayer != null) {
            activeLayer.remove();
          }
          selection.style.opacity = 0;
          if (selection.hasAttribute("remove") == false) {
            selection.setAttribute("remove", "");
            removeSelections.push(selection);
          }
        } else {
          delete editor.selecting[annoID];
          selection.remove();
        }
      }
    }
    if (removeSelections.length > 0) {
      (async function () {
        await sleep(150);
        for (let i = 0; i < removeSelections.length; i++) {
          let selection = removeSelections[i];
          if (selection != null) {
            selection.remove();
          }
        }
      })();
    }
    if (selectionIDs.length > 0) {
      body.style.userSelect = "none";
    } else {
      body.style.userSelect = "unset";
    }
    let hideTooltipWait = [];
    if (["pages/editor/toolbar/cursor", "pages/editor/toolbar/drag"].includes(toolbarModule.currentToolModule)) { // Prevent selections from other tools
      for (let i = 0; i < selectionIDs.length; i++) {
        let annoID = selectionIDs[i];
        //if (annoID == null || annoID.startsWith("pending_")) {
        //  continue;
        //}
        let annoData = editor.annotations[annoID] || { render: {} };
        let selection = editor.selecting[annoID];
        let merged = { ...annoData.render, ...selection };
        let anno = content.querySelector('.eAnnotation[anno="' + annoID + '"]');
        let select = content.querySelector('.eSelect[anno="' + annoID + '"]');
        let collabSelect = content.querySelector('.eCollabSelect[anno="' + annoID + '"]');
        if (anno == null) {
          delete editor.selecting[annoID];
          if (select != null) {
            select.remove();
          }
          continue;
        }
        anno.setAttribute("selected", "");
        let activeLayer = anno.parentElement.querySelector('.eSelectActive[anno="' + annoID + '"]');
        if (activeLayer == null) {
          anno.parentElement.insertAdjacentHTML("beforeend", `<div class="eSelectActive" anno="${annoID}" tooleditor></div>`);
          activeLayer = anno.parentElement.querySelector('.eSelectActive[anno="' + annoID + '"]');
        }
        activeLayer.style.setProperty("--annoZIndex", ((merged.sync || getEpoch()) % 1000000000) - 10);
        activeLayer.style.setProperty("--selectZIndex", i);
        anno.style.overflow = "hidden";
        anno.style.borderRadius = "2px";
        if (select == null) {
          content.insertAdjacentHTML("beforeend", `<div class="eSelect" new></div>`);
          select = content.querySelector(".eSelect[new]");
          select.removeAttribute("new");
          select.setAttribute("anno", annoID);
          select.style.border = "solid 4px var(--theme)";
          select.style.opacity = 1;
          select.offsetHeight;
          select.style.transition = "all .25s, opacity .15s";
        }
        if (this.action != null || forceNoTransition == true) {
          select.setAttribute("notransition", "");
          anno.setAttribute("notransition", "");
          if (collabSelect != null) {
            collabSelect.setAttribute("notransition", "");
          }
        } else {
          select.removeAttribute("notransition");
          anno.removeAttribute("notransition");
          if (collabSelect != null) {
            collabSelect.removeAttribute("notransition");
          }
        }

        if (selectionIDs.length == 1) {
          if (select.querySelector('.eSelectTooltip[tooltip="topright"]') == null) {
            select.insertAdjacentHTML("beforeend", `
              <svg class="eSelectTooltip" tooltip="topleft" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M2 14V14C2 7.37258 7.37258 2 14 2V2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
              <svg class="eSelectTooltip" tooltip="topright" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M14 14V14C14 7.37258 8.62742 2 2 2V2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
              <svg class="eSelectTooltip" tooltip="bottomleft" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M2 2V2C2 8.62742 7.37258 14 14 14V14" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
              <svg class="eSelectTooltip" tooltip="bottomright" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M14 2V2C14 8.62742 8.62742 14 2 14V14" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
              <svg class="eSelectTooltip" tooltip="left" width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M2 2V18" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
              <svg class="eSelectTooltip" tooltip="right" right="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M2 2V18" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
              <svg class="eSelectTooltip" tooltip="top" width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M18 2H2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
              <svg class="eSelectTooltip" tooltip="bottom" width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M18 2H2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            `);
          }
          select.removeAttribute("hidetips");
        } else {
          if (select.hasAttribute("hidetips") == false) {
            select.setAttribute("hidetips", "");
            hideTooltipWait.push(select);
          }
          let annoTx = anno.querySelector("div[text]");
          if (annoTx != null) {
            annoTx.removeAttribute("contenteditable");
          }
        }
        /*
        let rect = anno.getBoundingClientRect();
        let boxWidth = (anno.offsetWidth * editor.zoom) - 4;
        let boxHeight = (anno.offsetHeight * editor.zoom) - 4;
        select.style.width = boxWidth + "px";
        select.style.height = boxHeight + "px";
        select.style.left = rect.left + window.scrollX - 2 + "px";
        select.style.top = rect.top + window.scrollY - 2 + "px";
        */
        let annoHold = await utils.annoHolder(merged.page);
        let border = 0;
        if (annoHold.parentElement.parentElement.firstElementChild != annoHold.parentElement) {
          border = 4;
        }
        let [width, height] = merged.s;
        let [x, y] = merged.p;
        if (width < 0) {
          width = -width;
          x -= width;
        }
        if (height < 0) {
          height = -height;
          y -= height;
        }
        let pageRect = annoHold.getBoundingClientRect();
        let t = merged.t || 0;
        if (merged.b == "none" && merged.d != "line") {
          t = 0;
        }
        let boxWidth = ((width + t) * editor.zoom) - 4;  // +0 for width, -4 for border
        let boxHeight = ((height + t) * editor.zoom) - 4;
        select.style.width = boxWidth + "px";
        select.style.height = boxHeight + "px";
        let halfT = t / 2;
        select.style.left = pageRect.x + ((x + halfT) * editor.zoom) + window.scrollX - 2 + "px"; // -2 for border, -0 for width
        select.style.top = pageRect.y + (((y + halfT) - border) * editor.zoom) + window.scrollY - 2 + "px";
        let eSelectTopLeft = select.querySelector('.eSelectTooltip[tooltip="topleft"]');
        if (eSelectTopLeft != null) {
          eSelectTopLeft.removeAttribute("hidden");
          let eSelectTopRight = select.querySelector('.eSelectTooltip[tooltip="topright"]');
          let eSelectBottomLeft = select.querySelector('.eSelectTooltip[tooltip="bottomleft"]');
          let eSelectBottomRight = select.querySelector('.eSelectTooltip[tooltip="bottomright"]');
          eSelectBottomRight.removeAttribute("hidden");
          let eSelectLeft = select.querySelector('.eSelectTooltip[tooltip="left"]');
          let eSelectRight = select.querySelector('.eSelectTooltip[tooltip="right"]');
          let eSelectTop = select.querySelector('.eSelectTooltip[tooltip="top"]');
          let eSelectBottom = select.querySelector('.eSelectTooltip[tooltip="bottom"]');
          if (boxWidth < 40) {
            eSelectTop.setAttribute("hidden", "");
            eSelectBottom.setAttribute("hidden", "");
          } else {
            eSelectTop.removeAttribute("hidden");
            eSelectBottom.removeAttribute("hidden");
          }
          if (boxHeight < 40) {
            eSelectLeft.setAttribute("hidden", "");
            eSelectRight.setAttribute("hidden", "");
          } else {
            eSelectLeft.removeAttribute("hidden");
            eSelectRight.removeAttribute("hidden");
          }
          if (boxWidth < 20 || boxHeight < 20) {
            eSelectTopRight.setAttribute("hidden", "");
            eSelectBottomLeft.setAttribute("hidden", "");
          } else {
            eSelectTopRight.removeAttribute("hidden");
            eSelectBottomLeft.removeAttribute("hidden");
          }
        }

        activeLayer.style.width = (width + t) + 8 + "px";
        activeLayer.style.height = (height + t) + 8 + "px";
        activeLayer.style.left = x + halfT - 4 + "px";
        activeLayer.style.top = y + halfT - border - 4 + "px";

        let inverse = 1 / editor.zoom;
        let pageY = pageRect.y - pageHolderRect.y;
        let setMinX = x + halfT;
        this.minX = Math.min(this.minX || setMinX, setMinX);
        let setMaxX = x + width + t + halfT;
        this.maxX = Math.max(this.maxX || setMaxX, setMaxX);
        let setMinY = (pageY * inverse) + y + halfT - border;
        this.minY = Math.min(this.minY || setMinY, setMinY);
        let setMaxY = (pageY * inverse) + y + t - border + height + halfT;
        this.maxY = Math.max(this.maxY || setMaxY, setMaxY);

        let setCheckX = x + width;
        this.checkX = Math.min(this.checkX || setCheckX, setCheckX);
        let setCheckY = (pageY * inverse) + y - border + height;
        this.checkY = Math.min(this.checkX || setCheckY, setCheckY);

        if (collabSelect != null) {
          collabSelect.offsetWidth;
          let collWidth = ((width + t) * editor.zoom) - 3; // +0 for width, -3 for border
          let collHeight = ((height + t) * editor.zoom) - 3;
          collabSelect.style.width = collWidth + "px";
          collabSelect.style.height = collHeight + "px";
          collabSelect.style.left = pageRect.x + ((x + halfT) * editor.zoom) + window.scrollX - 1.5 + "px"; // -1.5 for border, -0 for width
          collabSelect.style.top = pageRect.y + (((y + halfT) - border) * editor.zoom) + window.scrollY - 1.5 + "px";
        }
      }
    }
    if (hideTooltipWait.length > 0) {
      (async function () {
        await sleep(150);
        for (let i = 0; i < hideTooltipWait.length; i++) {
          let select = hideTooltipWait[i];
          if (select != null && select.hasAttribute("hidetips") == true) {
            let tooltips = select.querySelectorAll(".eSelectTooltip");
            for (let r = 0; r < tooltips.length; r++) {
              tooltips[r].remove();
            }
          }
        }
      })();
    }

    if (forceNoTransition != true) {
      cursor.updateActionUI();
    }

    if (this.lastEditorZoom != editor.zoom || forceNoTransition == true || forceUpdate == true) {
      let allSelections = editor.page.querySelector(".eRealtime").querySelectorAll(".eCollabSelect");
      for (let i = 0; i < allSelections.length; i++) {
        let selection = allSelections[i];
        if (forceNoTransition == true) {
          selection.setAttribute("notransition", "");
        }
        let annoID = selection.getAttribute("anno");
        if (editor.annotations[annoID] == null) {
          selection.remove();
          continue;
        }
        let anno = { ...((editor.annotations[annoID]).render || {}), ...(editor.selecting[annoID] || {}) };
        if (anno.f == null) {
          continue;
        }
        let border = 0;
        let annoHold = await utils.annoHolder(anno.page);
        if (annoHold.parentElement.parentElement.firstElementChild != annoHold.parentElement) {
          border = 4;
        }
        let pageRect = annoHold.getBoundingClientRect();
        let t = anno.t || 0;
        if (anno.b == "none" && anno.d != "line") {
          t = 0;
        }
        let boxWidth = ((anno.s[0] + t) * editor.zoom) - 3; // +0 for width, -3 for border
        let boxHeight = ((anno.s[1] + t) * editor.zoom) - 3;
        selection.style.width = boxWidth + "px";
        selection.style.height = boxHeight + "px";
        let halfT = t / 2;
        selection.style.left = pageRect.x + ((anno.p[0] + halfT) * editor.zoom) + window.scrollX - 1.5 + "px"; // -1.5 for border, -0 for width
        selection.style.top = pageRect.y + ((anno.p[1] + halfT - border) * editor.zoom) + window.scrollY - 1.5 + "px";
        selection.offsetHeight;
        selection.removeAttribute("notransition");
      }
    }
    this.lastEditorZoom = editor.zoom;
  },
  actionBarTools: {
    "draw": ["color", "thickness", "opacity", "collaborator", "duplicate", "delete"],
    "text": ["textedit", "color", "opacity", "fontsize", "bold", "italic", "underline", "strikethrough", "textalign", "collaborator", "duplicate", "delete"],
    "markup": ["color", "thickness", "opacity", "collaborator", "duplicate", "delete"],
    "shape": ["color", "thickness", "opacity", "style", "collaborator", "duplicate", "delete"],
    "media": ["collaborator", "duplicate", "delete"]
  },
  actionEvents: [],
  updateActionUI: async function (refresh) {
    let editor = await getModule("pages/editor");
    let toolbarModule = await getModule("editor/toolbar");
    //let utils = await getModule("pages/editor/annotation");
    let content = editor.page.querySelector(".eContent");
    let selectionIDs = Object.keys(editor.selecting);

    let actionUI = content.querySelector(".eSelectBar:not([remove])");
    if (selectionIDs.length > 0 && this.action == null && content.querySelector(".eSelectDrag:not([remove])") == null) {
      if (this.checkX == null || this.checkY == null) {
        return;
      }

      let testSelections = "";
      for (let i = 0; i < selectionIDs.length; i++) {
        testSelections += selectionIDs[i];
      }
      if (this.lastSelections != testSelections || this.lastPxCheckX != this.checkX || this.lastPxCheckY != this.checkY || refresh == true) {
        this.removeActionUI(actionUI);
        actionUI = null;
      }
      this.lastPxCheckX = this.checkX;
      this.lastPxCheckY = this.checkY;
      this.lastSelections = testSelections;

      // Create Action UI
      if (actionUI == null) {
        // Figure out Actions
        let combineTools;
        let anno;
        for (let i = 0; i < selectionIDs.length; i++) {
          anno = (editor.annotations[selectionIDs[i]] || {}).render || {};
          if (anno != null) {
            let tools = this.actionBarTools[anno.f];
            if (combineTools != null) {
              for (let c = 0; c < combineTools.length; c++) {
                if (tools.includes(combineTools[c]) == false) {
                  combineTools.splice(c, 1);
                  c--;
                }
              }
            } else {
              combineTools = JSON.parse(JSON.stringify(tools || {}));
            }
          }
        }
        if (combineTools == null || combineTools.length < 1) {
          return;
        }

        // Create UI
        content.insertAdjacentHTML("beforeend", `<div class="eSelectBar" new>
          <div class="eSelectHolder" keeptooltip></div>
          <div class="eActionContainer" keeptooltip>
            <div class="eActionShadow"></div>
              <div class="eActionContainerHolder">
                <div class="eActionContainerScroll">
                  <div class="eActionContainerContent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>`);
        actionUI = content.querySelector(".eSelectBar[new]");
        actionUI.removeAttribute("new");

        // Add Buttons
        let actionButtonHolder = actionUI.querySelector(".eSelectHolder");
        for (let i = 0; i < combineTools.length; i++) {
          let actionRef = "pages/editor/toolbar/" + combineTools[i];
          let module = await getModule(actionRef);
          if (module.multiSelect == false && selectionIDs.length > 1) {
            continue;
          }
          if (module.divideBefore == true && actionButtonHolder.lastElementChild != null) {
            actionButtonHolder.insertAdjacentHTML("beforeend", `<div class="eVerticalDivider" keeptooltip></div>`);
          }
          actionButtonHolder.insertAdjacentHTML("beforeend", `<button class="eTool" new><div></div></button>`);
          let newAction = actionButtonHolder.querySelector("[new]");
          if (module.divideAfter == true) {
            actionButtonHolder.insertAdjacentHTML("beforeend", `<div class="eVerticalDivider" keeptooltip></div>`);
          }
          newAction.removeAttribute("new");
          newAction.setAttribute("action", actionRef);
          let buttonHolder = newAction.querySelector("div");
          buttonHolder.innerHTML = module.button;
          if (module.setButton != null) {
            module.setButton(editor, newAction);
          }
          if (module.tooltip != null) {
            newAction.setAttribute("tooltip", module.tooltip);
          }
        }
      }

      // Update Action UI
      let unscaledPxLeft = this.minX + ((this.maxX - this.minX) / 2);
      //let unscaledPxTop = this.minY + ((this.maxY - this.minY) / 2);
      let pageHolderRect = editor.page.querySelector(".ePageHolder").getBoundingClientRect();
      let pxLeft = pageHolderRect.x + (unscaledPxLeft * editor.zoom) - (actionUI.clientWidth / 2);
      //console.log(unscaledPxLeft);
      if (pxLeft + actionUI.clientWidth + 8 > fixed.offsetWidth) {
        pxLeft -= (pxLeft + actionUI.clientWidth + 8) - fixed.offsetWidth;
      }
      actionUI.style.left = Math.max(pxLeft, 66) + window.scrollX + "px";
      let yPos = pageHolderRect.y + (this.minY * editor.zoom) - actionUI.clientHeight - 16;
      let isBottom = false;
      if (yPos < 66) {
        let modifiedY = pageHolderRect.y + (this.maxY * editor.zoom) + 16;
        if (modifiedY + actionUI.clientHeight + 66 > fixed.offsetHeight) {
          //yPos = (modifiedY + actionUI.clientHeight + 66) - fixed.offsetHeight;
          yPos = 66;
        } else {
          yPos = modifiedY;
          isBottom = true;
        }
      }
      //if (yPos + actionUI.clientHeight + 8 > fixed.offsetHeight) {
      //  yPos -= (yPos + actionUI.clientHeight + 8) - fixed.offsetHeight;
      //}
      actionUI.style.top = yPos + window.scrollY + "px";

      // Update Tooltip Position
      if (isBottom == false) { // Is the top
        if (yPos - 32 < 66) {
          actionUI.setAttribute("tooltipbottom", "");
        } else {
          actionUI.removeAttribute("tooltipbottom");
        }
      } else { // Is the bottom
        if (fixed.offsetHeight - yPos - actionUI.clientHeight - 32 < 66) {
          actionUI.removeAttribute("tooltipbottom");
        } else {
          actionUI.setAttribute("tooltipbottom", "");
        }
      }

      // Update Action Frame UI
      let actionFrame = actionUI.querySelector(".eActionContainer[module]");
      if (actionFrame != null) {
        let actionContent = actionFrame.querySelector(".eActionContainerContent");
        let alignTop;
        if (isBottom == false) {
          alignTop = true;
          if (yPos - actionContent.clientHeight - 4 < 66) {
            alignTop = false;
          }
        } else {
          alignTop = false;
          if (fixed.offsetHeight - yPos - actionUI.clientHeight - actionContent.clientHeight - 4 < 66) {
            alignTop = true;
          }
        }
        if (alignTop == true) {
          actionUI.setAttribute("actionuitop", "");
        } else {
          actionUI.removeAttribute("actionuitop");
        }

        let button = actionUI.querySelector('.eTool[action="' + actionFrame.getAttribute("module") + '"');
        let frameLeft;
        if (button != null) {
          frameLeft = (button.getBoundingClientRect().left - actionUI.getBoundingClientRect().left) + (button.clientWidth / 2) - (actionContent.clientWidth / 2);
          if (frameLeft + actionContent.clientWidth > actionUI.clientWidth) {
            frameLeft = actionUI.clientWidth - actionContent.clientWidth;
          }
          if (frameLeft < 0) {
            frameLeft = 0;
          }
          actionFrame.style.left = frameLeft + "px";
          actionFrame.style.width = actionContent.clientWidth + "px";
          actionFrame.style.height = actionContent.clientHeight + "px";
        }

        if (alignTop) {
          if (button != null) {
            if (frameLeft < 16) {
              actionUI.style.borderTopLeftRadius = "0px";
            } else {
              actionUI.style.removeProperty("border-top-left-radius");
            }
            if (frameLeft + actionContent.clientWidth > actionUI.clientWidth - 16) {
              actionUI.style.borderTopRightRadius = "0px";
            } else {
              actionUI.style.removeProperty("border-top-right-radius");
            }
            actionUI.style.removeProperty("border-bottom-left-radius");
            actionUI.style.removeProperty("border-bottom-right-radius");
          }

          if (actionFrame.hasAttribute("changetop") == false) {
            (async function () {
              toolbarModule.closeTooltipHover();
              actionFrame.setAttribute("changetop", "");
              actionFrame.style.transform = "scale(0)";
              actionFrame.style.opacity = 0;
              if (actionFrame.hasAttribute("changebottom")) {
                actionFrame.removeAttribute("changebottom");
                await sleep(300);
              }
              if (actionFrame.hasAttribute("changetop")) {
                actionFrame.setAttribute("top", "");
                actionFrame.removeAttribute("bottom");
                actionFrame.offsetHeight;
                actionFrame.style.transform = "scale(1)";
                actionFrame.style.opacity = 1;
              }
            })();
          }
        } else {
          if (button != null) {
            if (frameLeft < 16) {
              actionUI.style.borderBottomLeftRadius = "0px";
            } else {
              actionUI.style.removeProperty("border-bottom-left-radius");
            }
            if (frameLeft + actionContent.clientWidth > actionUI.clientWidth - 16) {
              actionUI.style.borderBottomRightRadius = "0px";
            } else {
              actionUI.style.removeProperty("border-bottom-right-radius");
            }
            actionUI.style.removeProperty("border-top-left-radius");
            actionUI.style.removeProperty("border-top-right-radius");
          }

          if (actionFrame.hasAttribute("changebottom") == false) {
            (async function () {
              toolbarModule.closeTooltipHover();
              actionFrame.setAttribute("changebottom", "");
              actionFrame.style.transform = "scale(0)";
              actionFrame.style.opacity = 0;
              if (actionFrame.hasAttribute("changetop")) {
                actionFrame.removeAttribute("changetop");
                await sleep(300);
              }
              if (actionFrame.hasAttribute("changebottom")) {
                actionFrame.setAttribute("bottom", "");
                actionFrame.removeAttribute("top");
                actionFrame.offsetHeight;
                actionFrame.style.transform = "scale(1)";
                actionFrame.style.opacity = 1;
              }
            })();
          }
        }
      }

      actionUI.style.transform = "translateY(0%)";
      actionUI.style.opacity = 1;
    } else if (actionUI != null) {
      this.removeActionUI(actionUI);
      actionUI = null;
    }
  },
  redrawActionUI: async function () {
    let editor = await getModule("pages/editor");
    //let utils = await getModule("pages/editor/annotation");
    let content = editor.page.querySelector(".eContent");

    let actionUI = content.querySelector(".eSelectBar:not([remove])");
    if (actionUI == null) {
      return;
    }

    await this.updateActionUI(); // Update it first if their are selection changes

    // Update buttons:
    let actionButtonHolder = actionUI.querySelector(".eSelectHolder");
    for (let i = 0; i < actionButtonHolder.children.length; i++) {
      let button = actionButtonHolder.children[i];
      let actionName = button.getAttribute("action");
      if (actionName == null) {
        continue;
      }
      let module = await getModule(actionName);
      if (module == null) {
        continue;
      }
      let buttonHolder = button.querySelector("div");
      buttonHolder.innerHTML = module.button;
      if (module.setButton != null) {
        module.setButton(editor, button);
      }
    }

    // Update current module:
    let actionFrame = actionUI.querySelector(".eActionContainer[module]");
    if (actionFrame != null) {
      let actionContent = actionFrame.querySelector(".eActionContainerContent");
      let module = await getModule(actionFrame.getAttribute("module"));
      if (module != null && module.html != null) {
        actionContent.innerHTML = module.html;
        let selectKeys = Object.keys(editor.selecting);
        let preferenceTool = ((editor.annotations[selectKeys[0]] || {}).render || {}).f;
        await this.runActionModule(module, actionUI, preferenceTool);
      }
      this.updateActionUI();
    }
  },
  clickAction: async function (event) {
    if (event == null || event.target == null) {
      return;
    }
    let editor = await getModule("pages/editor");
    let toolbarModule = await getModule("editor/toolbar");
    let action = event.target.closest(".eTool");
    if (action == null || action.closest(".eSelectHolder") == null) {
      return;
    }
    let holder = action.closest(".eSelectBar");
    if (holder == null) {
      return;
    }
    /*
    for (let i = 0; i < this.actionEvents.length; i++) {
      let remEvent = this.actionEvents[i];
      remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
    }
    this.actionEvents = [];
    */

    let actionHolder = holder.querySelector(".eActionContainer");
    let contentFrame = actionHolder.querySelector(".eActionContainerContent");
    let otherSelected = holder.querySelector(".eTool[selected]");
    if (otherSelected != null) {
      otherSelected.removeAttribute("selected");
      if (otherSelected == action) {
        actionHolder.removeAttribute("module");
        // Close frame:
        actionHolder.style.left = (action.getBoundingClientRect().left - holder.getBoundingClientRect().left) + (action.clientWidth / 2) - (contentFrame.clientWidth / 2) + "px";
        actionHolder.style.transform = "scale(0)";
        actionHolder.style.opacity = 0;
        holder.style.removeProperty("border-top-left-radius");
        holder.style.removeProperty("border-top-right-radius");
        holder.style.removeProperty("border-bottom-left-radius");
        holder.style.removeProperty("border-bottom-right-radius");
        (async function () {
          await sleep(300);
          if (actionHolder.hasAttribute("module") == false) {
            actionHolder.removeAttribute("changetop");
            actionHolder.removeAttribute("changebottom");
            actionHolder.style.left = "unset";
            actionHolder.style.transition = "unset";
          }
        })();
        this.updateActionUI();
        return;
      }
    }
    let moduleID = action.getAttribute("action");
    let module = await getModule(moduleID);
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ((editor.annotations[selectKeys[0]] || {}).render || {}).f;
    if (module != null && module.html != null) {
      contentFrame.innerHTML = module.html;
      action.setAttribute("selected", "");
      if (actionHolder.hasAttribute("module") == false) {
        // Open frame:
        actionHolder.style.transform = "scale(0)";
        actionHolder.style.opacity = 0;
        actionHolder.style.width = contentFrame.clientWidth + "px";
        actionHolder.style.height = contentFrame.clientHeight + "px";
        actionHolder.style.left = (action.getBoundingClientRect().left - holder.getBoundingClientRect().left) + (action.clientWidth / 2) - (contentFrame.clientWidth / 2) + "px";
        actionHolder.style.transition = "opacity .3s, transform .3s, width .3s, height .3s, left .3s";
        actionHolder.offsetHeight;
        actionHolder.style.transform = "scale(1)";
        actionHolder.style.opacity = 1;
      }
      actionHolder.setAttribute("module", moduleID);
    } else {
      actionHolder.removeAttribute("module");
      // Close frame:
      if (otherSelected != null) {
        actionHolder.style.left = (otherSelected.getBoundingClientRect().left - holder.getBoundingClientRect().left) + (otherSelected.clientWidth / 2) - (contentFrame.clientWidth / 2) + "px";
      }
      actionHolder.style.transform = "scale(0)";
      actionHolder.style.opacity = 0;
      holder.style.removeProperty("border-top-left-radius");
      holder.style.removeProperty("border-top-right-radius");
      holder.style.removeProperty("border-bottom-left-radius");
      holder.style.removeProperty("border-bottom-right-radius");
      (async function () {
        await sleep(300);
        if (actionHolder.hasAttribute("module") == false) {
          actionHolder.removeAttribute("changetop");
          actionHolder.removeAttribute("changebottom");
          actionHolder.style.left = "unset";
          actionHolder.style.transition = "unset";
        }
      })();
    }
    toolbarModule.updateTooltipHover();
    await this.runActionModule(module, holder, preferenceTool, { setCaretPosition: event.setCaretPosition, clientX: event.clientX, clientY: event.clientY });
    this.updateActionUI();
  },
  runActionModule: async function (module, holder, preferenceTool, extra) {
    await module.js(holder, preferenceTool, {
      frame: holder,
      updateActionUI: () => { this.updateActionUI(); },
      saveSelecting: async (set, short, saveHistory, lastCaret) => {
        let editor = await getModule("pages/editor");
        let utils = await getModule("pages/editor/annotation");
        let selectKeys = Object.keys(editor.selecting);
        let setKeys = Object.keys(set);
        let sync = getEpoch();
        let saveUpdates = [];
        let pushChanges = [];
        let pushRemoves = [];
        for (let i = 0; i < selectKeys.length; i++) {
          let annoID = selectKeys[i];
          let select = editor.selecting[annoID];
          let original = (editor.annotations[annoID] || {}).render || {};
          let anno = JSON.parse(JSON.stringify(original));
          let annoSet = JSON.parse(JSON.stringify(set));
          select.sync = sync;
          if (annoSet.d != null && typeof annoSet.d == "object") {
            annoSet.d = { ...anno.d, ...annoSet.d };
          }
          if (anno.f == "text") {
            let annoTx = editor.page.querySelector('.eAnnotation[anno="' + annoID + '"] div[text]');
            if (annoTx != null) {
              editor.selecting[annoID] = { ...select, ...annoSet };
              await utils.render({ ...anno, ...annoSet }, annoTx.parentElement);
              annoSet.s = anno.s || [];
              if (anno.textfit == true) {
                annoSet.s[0] = annoTx.offsetWidth + 6;
              }
              annoSet.s[1] = annoTx.offsetHeight + 6;
            }
          }
          let changes = false;
          for (let c = 0; c < setKeys.length; c++) {
            if (annoSet[setKeys[c]] != anno[setKeys[c]]) {
              changes = true;
              break;
            }
          }
          if (changes == false) {
            continue;
          }
          editor.selecting[annoID] = { ...select, ...annoSet };
          saveUpdates.push({ ...select, ...annoSet, _id: annoID });
          if (saveHistory != false) {
            let changeKeys = Object.keys(annoSet);
            let pushFields = {};
            for (let f = 0; f < changeKeys.length; f++) {
              pushFields[changeKeys[f]] = original[changeKeys[f]];
            }
            if (Object.keys(pushFields).length > 0) {
              if (annoSet.remove != true) {
                pushChanges.push(JSON.parse(JSON.stringify({ ...pushFields, _id: annoID })));
              } else {
                pushRemoves.push(JSON.parse(JSON.stringify(anno)));
              }
            }
          }
        }
        if (pushChanges.length > 0) {
          await utils.pushHistory("update", pushChanges, saveHistory, lastCaret);
        }
        if (pushRemoves.length > 0) {
          await utils.pushHistory("add", pushRemoves, saveHistory);
        }
        for (let i = 0; i < saveUpdates.length; i++) {
          await utils.save({ ...saveUpdates[i] }, null, sync);
        }

        await this.updateBox();

        //if (short == true) {
          await utils.forceShort();
          for (let i = 0; i < selectKeys.length; i++) {
            editor.selecting[selectKeys[i]] = {};
          }
        //}
      },
      updateToolActions: async (frame) => {
        let editor = await getModule("pages/editor");
        let toolButtons = frame.querySelectorAll(".eTool[action]");
        for (let i = 0; i < toolButtons.length; i++) {
          let module = await getModule(toolButtons[i].getAttribute("action"));
          if (module != null && module.setButton != null) {
            module.setButton(editor, toolButtons[i]);
          }
        }
      },
      /*
      addEvent: async (parent, listen, runFunc, extra) => {
        parent.addEventListener(listen, runFunc, extra);
        this.actionEvents.push({ type: "event", parent: parent, name: listen, listener: runFunc });
      },
      */
      ...extra
    });
  },
  removeActionUI: async function (actionUI) {
    if (actionUI == null) {
      return;
    }
    (await getModule("pages/editor")).savePreferences();
    actionUI.setAttribute("remove", "");
    actionUI.style.transform = "translateY(-10%)";
    actionUI.style.opacity = 0;
    await sleep(200);
    if (actionUI != null) {
      actionUI.remove();
    }
  },
  enableAction: async function (event) {
    let target = event.target;
    if (target == null) {
      return;
    }
    let editor = await getModule("pages/editor");
    this.activeElem = target.closest(".eSelectActive");
    this.annotationElem = target.closest(".eAnnotation");
    this.selectElem = target.closest(".eSelect");
    this.resizeElem = target.closest(".eSelectTooltip");
    /*
    let anno = this.annotationElem || this.selectElem;
    if (anno == null) {
      return;
    }
    let annoID = anno.getAttribute("anno");
    this.annotation = (editor.annotations[annoID] || {}).render;
    if (this.annotation == null) {
      return;
    }
    */
    if (this.annotationElem != null && this.annotationElem.querySelector("div[contenteditable]") != null) {
      return;
    }
    this.actionEnabled = false;
    if (this.activeElem != null || (this.annotationElem != null && this.annotationElem.hasAttribute("selected"))) {
      // Drag/Move Element
      this.action = "move";
      let inverse = 1 / editor.zoom;
      this.startX = (clientPosition(event, "x") + window.scrollX) * inverse;
      this.startY = (clientPosition(event, "y") + window.scrollY) * inverse;
      body.style.userSelect = "none";
      editor.page.style.touchAction = "pinch-zoom";
      event.preventDefault();
    } else if (this.resizeElem != null) {
      // Resize Element
      this.action = "resize";
      let inverse = 1 / editor.zoom;
      let clientX = clientPosition(event, "x");
      let clientY = clientPosition(event, "y");
      this.startX = (clientX + window.scrollX) * inverse;
      this.startY = (clientY + window.scrollY) * inverse;
      let handleRect = this.resizeElem.getBoundingClientRect();
      this.offsetX = (handleRect.left + (this.resizeElem.clientWidth / 2)) - clientX;
      this.offsetY = (handleRect.top + (this.resizeElem.clientHeight / 2)) - clientY;
      body.style.userSelect = "none";
      editor.page.style.touchAction = "pinch-zoom";
      event.preventDefault();
    }
  },
  oppositeResize: {
    bottomright: ["topleft", "bottomleft", "topright"],
    topleft: ["bottomright", "topright", "bottomleft"],
    topright: ["bottomleft", "topleft", "bottomright"],
    bottomleft: ["topright", "bottomright", "topleft"],
    right: ["left", "left", "right"],
    bottom: ["top", "bottom", "top"],
    left: ["right", "right", "left"],
    top: ["bottom", "top", "bottom"]
  },
  moveAction: async function (event) {
    if (this.action == null) {
      return;
    }
    if (mouseDown() == false) {
      this.endAction();
      return;
    }
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    let inverse = 1 / editor.zoom;
    let mouseX = clientPosition(event, "x");
    let mouseY = clientPosition(event, "y");
    this.endX = (mouseX + window.scrollX) * inverse;
    this.endY = (mouseY + window.scrollY) * inverse;

    let changeX = this.endX - this.startX;
    let changeY = this.endY - this.startY;

    if (this.actionEnabled == false) {
      if (Math.abs(changeX) > 3 || Math.abs(changeY) > 3) {
        this.actionEnabled = true;
      } else {
        return;
      }
    }

    /*
    if (Math.floor(this.endX - this.startX) == 0 && Math.floor(this.endY - this.startY) == 0) {
      this.action = null;
    }
    */
    let setTempSync = getEpoch();

    let keys = Object.keys(editor.selecting);
    for (let i = 0; i < keys.length; i++) {
      let annoid = keys[i];
      let select = editor.selecting[annoid];
      delete select.done;
      let original = editor.annotations[annoid];
      if (original == null) {
        continue;
      }
      if (original.render == null && original.pointer == null) {
        delete editor.annotations[annoid];
        continue;
      }
      let anno = JSON.parse(JSON.stringify(original.render));
      if (original.revert == null) {
        original.revert = JSON.parse(JSON.stringify(original.render));
      }
      if (this.action == "move") {
        select.p = select.p || anno.p;
        select.p[0] = utils.round(select.p[0] + changeX);
        select.p[1] = utils.round(select.p[1] + changeY);
      } else if (this.action == "resize") {
        select.s = select.s || anno.s;
        if (this.size == null) {
          this.size = JSON.parse(JSON.stringify(select.s || anno.s));
        }
        if (this.position == null) {
          this.position = JSON.parse(JSON.stringify(select.p || anno.p));
        }
        if (this.tooltip == null) {
          this.tooltip = this.resizeElem.getAttribute("tooltip");
          if (select.s[0] < 0 && select.s[1] < 0) {
            this.tooltip = this.oppositeResize[this.tooltip][0];
          } else if (select.s[0] < 0) {
            this.tooltip = this.oppositeResize[this.tooltip][1];
          } else if (select.s[1] < 0) {
            this.tooltip = this.oppositeResize[this.tooltip][2];
          }
        }
        let preserveAspect = event.shiftKey || false;
        if (["markup", "draw"].includes(select.f || anno.f) == true) {
          preserveAspect = true; // All drawings keep aspect

          // Handle lines:
          let points = select.d || anno.d;
          if (points.length == 4) {
            if (points[0] == points[2]) { // Horizontal Line
              changeX = 0;
            }
            if (points[1] == points[3]) { // Vertical Line
              changeY = 0;
            }
            preserveAspect = false;
          }
          if (this.size[0] == 0 || this.size[1] == 0) {
            continue;
          }
        }
        let number;
        let pageElem = editor.page.querySelector('.ePage[pageid="' + (select.page || anno.page) + '"]');
        if (pageElem != null) {
          number = parseInt(pageElem.getAttribute("order"));
          if (pageElem.hasAttribute("hide") == true) {
            return;
          }
        }
        let scaleMouse = await utils.scaleToDoc(mouseX + this.offsetX, mouseY + this.offsetY, number);
        let sizeCompare = (a, b) => {
          if (select.s[0] < 0 || select.s[1] < 0) {
            return a < b;
          } else {
            return a > b;
          }
        }
        switch (this.tooltip) {
          case "bottomright":
            if (preserveAspect == true) {
              if (sizeCompare(scaleMouse.x - (this.position[0] + select.s[0]), scaleMouse.y - (this.position[1] + select.s[1]))) {
                select.s[0] = utils.round(this.size[0] + changeX);
                select.s[1] = utils.round(this.size[1] * ((this.size[0] + changeX) / this.size[0]));
              } else {
                select.s[0] = utils.round(this.size[0] * ((this.size[1] + changeY) / this.size[1]));
                select.s[1] = utils.round(this.size[1] + changeY);
              }
            } else {
              select.s[0] = utils.round(this.size[0] + changeX);
              select.s[1] = utils.round(this.size[1] + changeY);
            }
            break;
          case "topleft":
            select.p = select.p || anno.p;
            if (preserveAspect == true) {
              if (sizeCompare(select.p[0] - scaleMouse.x, select.p[1] - scaleMouse.y)) {
                select.s[0] = utils.round(this.size[0] - changeX);
                select.s[1] = utils.round(this.size[1] * ((this.size[0] - changeX) / this.size[0]));
              } else {
                select.s[0] = utils.round(this.size[0] * ((this.size[1] - changeY) / this.size[1]));
                select.s[1] = utils.round(this.size[1] - changeY);
              }
            } else {
              select.s[0] = utils.round(this.size[0] - changeX);
              select.s[1] = utils.round(this.size[1] - changeY);
            }
            select.p[0] = utils.round(this.position[0] + (this.size[0] - select.s[0]));
            select.p[1] = utils.round(this.position[1] + (this.size[1] - select.s[1]));
            break;
          case "topright":
            select.p = select.p || anno.p;
            if (preserveAspect == true) {
              if (sizeCompare(scaleMouse.x - (select.p[0] + select.s[0]), select.p[1] - scaleMouse.y)) {
                select.s[0] = utils.round(this.size[0] + changeX);
                select.s[1] = utils.round(this.size[1] * ((this.size[0] + changeX) / this.size[0]));
              } else {
                select.s[0] = utils.round(this.size[0] * ((this.size[1] - changeY) / this.size[1]));
                select.s[1] = utils.round(this.size[1] - changeY);
              }
            } else {
              select.s[0] = utils.round(this.size[0] + changeX);
              select.s[1] = utils.round(this.size[1] - changeY);
            }
            select.p[1] = utils.round(this.position[1] + (this.size[1] - select.s[1]));
            break;
          case "bottomleft":
            select.p = select.p || anno.p;
            if (preserveAspect == true) {
              if (sizeCompare(select.p[0] - scaleMouse.x, scaleMouse.y - (select.p[1] + select.s[1]))) {
                select.s[0] = utils.round(this.size[0] - changeX);
                select.s[1] = utils.round(this.size[1] * ((this.size[0] - changeX) / this.size[0]));
              } else {
                select.s[0] = utils.round(this.size[0] * ((this.size[1] + changeY) / this.size[1]));
                select.s[1] = utils.round(this.size[1] + changeY);
              }
            } else {
              select.s[0] = utils.round(this.size[0] - changeX);
              select.s[1] = utils.round(this.size[1] + changeY);
            }
            select.p[0] = utils.round(this.position[0] + (this.size[0] - select.s[0]));
            break;
          case "right":
            if (preserveAspect == true) {
              select.s[0] = utils.round(this.size[0] + changeX);
              select.s[1] = utils.round(this.size[1] * ((this.size[0] + changeX) / this.size[0]));
              select.p = select.p || anno.p;
              select.p[1] = utils.round(this.position[1] + ((this.size[1] - select.s[1]) / 2));
            } else {
              select.s[0] = utils.round(this.size[0] + changeX);
            }
            break;
          case "bottom":
            if (preserveAspect == true) {
              select.s[0] = utils.round(this.size[0] * ((this.size[1] + changeY) / this.size[1]));
              select.s[1] = utils.round(this.size[1] + changeY);
              select.p = select.p || anno.p;
              select.p[0] = utils.round(this.position[0] + ((this.size[0] - select.s[0]) / 2));
            } else {
              select.s[1] = utils.round(this.size[1] + changeY);
            }
            break;
          case "left":
            select.p = select.p || anno.p;
            if (preserveAspect == true) {
              select.s[0] = utils.round(this.size[0] - changeX);
              select.s[1] = utils.round(this.size[1] * ((this.size[0] - changeX) / this.size[0]));
              select.p[0] = utils.round(this.position[0] + (this.size[0] - select.s[0]));
              select.p[1] = utils.round(this.position[1] + ((this.size[1] - select.s[1]) / 2));
            } else {
              select.s[0] = utils.round(this.size[0] - changeX);
              select.p[0] = utils.round(this.position[0] + changeX);
            }
            break;
          case "top":
            select.p = select.p || anno.p;
            if (preserveAspect == true) {
              select.s[0] = utils.round(this.size[0] * ((this.size[1] - changeY) / this.size[1]));
              select.s[1] = utils.round(this.size[1] - changeY);
              select.p[0] = utils.round(this.position[0] + ((this.size[0] - select.s[0]) / 2));
              select.p[1] = utils.round(this.position[1] + (this.size[1] - select.s[1]));
            } else {
              select.s[1] = utils.round(this.size[1] - changeY);
              select.p[1] = utils.round(this.position[1] + changeY);
            }
        }
        if (select.f || anno.f == "text") {
          await utils.render({ ...anno, ...select, sync: setTempSync });
          let renderedAnno = editor.page.querySelector('.eAnnotation[anno="' + annoid + '"] div');
          if (renderedAnno != null) {
            if (anno.textfit == true && select.textfit != false) {
              select.s[0] = renderedAnno.offsetWidth + 6;
              select.textfit = false;
            }
            select.s[1] = renderedAnno.offsetHeight + 6; //Math.max(select.s[1], renderedAnno.offsetHeight + 6);
          }
        }
      }
      select.sync = setTempSync;
      await utils.render({ ...anno, ...select });
    }
    if (this.action == "move") {
      this.startX = this.endX;
      this.startY = this.endY;
    }
    this.updateBox();
  },
  endAction: async function () {
    if (this.action == null) {
      return;
    }
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    this.action = null;
    this.tooltip = null;
    this.position = null;
    this.size = null;
    body.style.removeProperty("user-select");
    editor.page.style.removeProperty("touch-action");
    editor.page.removeAttribute("enabled");

    let pageHolder = editor.page.querySelector(".ePageHolder");

    let setTempSync = getEpoch();

    // Save Revert
    let keys = Object.keys(editor.selecting);
    let saveUpdates = [];
    let pushChanges = [];
    let pushAdds = [];
    for (let i = 0; i < keys.length; i++) {
      let annoid = keys[i];
      let selecting = editor.selecting[annoid];
      let original = editor.annotations[annoid];
      if (original != null && original.pointer != null) {
        annoid = original.pointer;
        original = editor.annotations[annoid];
      }
      if (original == null && selecting == null) {
        continue;
      }

      let originalRender = (original.render || {}) || selecting;
      if (originalRender != null && originalRender.page != null) {
        let page = selecting.page || originalRender.page;
        let pos = selecting.p || originalRender.p;
        let currentPage = editor.page.querySelector('.ePage[pageid="' + page + '"]');
        if (currentPage != null) {
          if (currentPage.hasAttribute("hide") == true) {
            editor.selecting[annoid] = { p: originalRender.p };
            await utils.render(originalRender);
            this.updateBox();
            continue;
          }
          let [page] = (await utils.findPage((pos[1] * editor.zoom) + currentPage.getBoundingClientRect().top));
          if (page != currentPage) {
            if (page.hasAttribute("hide") == true) {
              editor.selecting[annoid] = { p: originalRender.p };
              await utils.render(originalRender);
              this.updateBox();
              continue;
            }
            let change = 0;
            let newPageId = page.getAttribute("pageid");
            if (originalRender.page != newPageId) {
              selecting.page = newPageId;
              let originalPageOrder = parseInt(currentPage.getAttribute("order"));
              let newPageOrder = parseInt(page.getAttribute("order"));
              if (originalPageOrder < newPageOrder) {
                for (let i = originalPageOrder; i < newPageOrder; i++) {
                  change -= pageHolder.children[i-1].offsetHeight;
                }
              } else {
                for (let i = newPageOrder; i < originalPageOrder; i++) {
                  change += pageHolder.children[i-1].offsetHeight;
                }
              }
            }
            selecting.p = selecting.p || JSON.parse(JSON.stringify(pos));
            selecting.p[1] = utils.round(pos[1] + change);
          }
        }
      }

      delete selecting.done;
      let changeKeys = Object.keys(selecting);
      let pushFields = {};
      for (let f = 0; f < changeKeys.length; f++) {
        pushFields[changeKeys[f]] = originalRender[changeKeys[f]];
      }
      if (Object.keys(pushFields).length > 0) {
        if (pushFields.f == null) {
          pushChanges.push(JSON.parse(JSON.stringify({ ...pushFields, _id: annoid })));
        } else {
          pushAdds.push({ _id: annoid, remove: true });
        }
      }

      saveUpdates.push(JSON.parse(JSON.stringify({ ...selecting, _id: annoid })));
      selecting.done = true;
    }
    if (pushChanges.length > 0) {
      await utils.pushHistory("update", pushChanges, true);
    }
    if (pushAdds.length > 0) {
      await utils.pushHistory("remove", pushAdds, true);
    }
    for (let i = 0; i < saveUpdates.length; i++) {
      await utils.save(saveUpdates[i], null, setTempSync);
    }
    await utils.forceShort();
    for (let i = 0; i < keys.length; i++) {
      editor.selecting[keys[i]] = {};
    }

    this.updateActionUI();

    utils.resetAnnotationSize();
  },
  js: async function (editor, utils, addEvent) {
    let content = editor.page.querySelector(".eContent");
    editor.updateZoom = this.updateBox;
    let alertModule = await getModule("alert");
    let startX;
    let startY;
    let wasSelected;
    let lastTarget;
    let enableSelect = async (event) => {
      if (event.shiftKey == false) {
        content.setAttribute("noshiftheld", "");
      } else {
        content.removeAttribute("noshiftheld");
      }
      if (event.which === 3 || event.button === 2) {
        return;
      }
      let target = event.target;
      lastTarget = target;
      if (target == null || target.closest(".eContent") == null || target.closest(".eSelectBar") != null) {
        return;
      }
      anno = target.closest(".eAnnotation, .eSelect, .eSelectActive");
      if (anno != null && anno.hasAttribute("member") == true) {
        // A display annotation, not a real one
        return;
      }
      /*
      let selectActive = target.closest(".eSelectActive");
      if (anno == null && selectActive != null) {
        anno = content.querySelector('.eAnnotation[anno="' + selectActive.getAttribute("anno") + '"]');
        console.log(anno)
      }
      */
      if (editor.getSelf().access < 1) {
        editor.selecting = {};
        this.updateBox();
        return;
      }
      startX = clientPosition(event, "x") + window.scrollX;
      startY = clientPosition(event, "y") + window.scrollY;
      if ((anno == null || editor.selecting[anno.getAttribute("anno")] == null) && event.shiftKey == false) {
        editor.selecting = {};
        if (anno == null) {
          this.updateBox();
          return;
        }
      }
      if (anno == null) {
        return;
      }
      let annoID = anno.getAttribute("anno");
      let mCheck;
      let self = editor.getSelf();
      if (self.user != null) {
        mCheck = "user_" + self.user;
      } else {
        mCheck = "temp_" + self._id;
      }
      let render = ((editor.annotations[annoID] || {}).render || {});
      if (editor.lesson.settings.editOthersWork != true && render.m != null && render.m != mCheck && self.access < 4) { // Can't edit another member's work:
        return;
      }
      if (editor.selecting[annoID] == null) {
        wasSelected = annoID;
        editor.selecting[annoID] = {};
      }
      await this.updateBox();
      this.enableAction(event);
    }
    let disableSelect = async (event) => {
      this.endAction(event);

      let target = lastTarget || event.target;
      lastTarget = null;
      if (target == null) {
        return;
      }
      anno = target.closest(".eAnnotation, .eSelect, .eSelectActive");
      if (editor.getSelf().access < 1) {
        editor.selecting = {};
        this.updateBox();
        return;
      }
      let endX = clientPosition(event, "x") + window.scrollX;
      let endY = clientPosition(event, "y") + window.scrollY;
      if (Math.floor(endX - startX) == 0 && Math.floor(endY - startY) == 0) {
        if (anno == null) {
          return;
        }
        let annoID = anno.getAttribute("anno");
        let mCheck;
        let self = editor.getSelf();
        if (self.user != null) {
          mCheck = "user_" + self.user;
        } else {
          mCheck = "temp_" + self._id;
        }
        let render = ((editor.annotations[annoID] || {}).render || {});
        if (editor.lesson.settings.editOthersWork != true && render.m != null && render.m != mCheck && self.access < 4) { // Can't edit another member's work:
          alertModule.open("warning", "<b>Someone Else's Annotation</b>The ability to modify another member's work is disabled.");
          return;
        }
        if (event.shiftKey == true) {
          // Unselect
          if (wasSelected != annoID && editor.selecting[annoID] != null) {
            delete editor.selecting[annoID];
          }
        } else {
          editor.selecting = {};
          editor.selecting[annoID] = {};
        }
        if (wasSelected == null && anno.querySelector("div[text]") != null && anno.querySelector("div[contenteditable]") == null) {
          this.clickAction({
            target: content.querySelector('.eSelectBar:not([remove]) .eTool[action="pages/editor/toolbar/textedit"]'),
            setCaretPosition: true,
            clientX: event.clientX,
            clientY: event.clientY
          });
        }
        this.updateBox();
      }
      wasSelected = null;
    }
    addEvent(content, "mousedown", enableSelect, { passive: false });
    addEvent(content, "touchstart", enableSelect, { passive: false });
    addEvent(content, "mouseup", disableSelect, { passive: false });
    addEvent(content, "touchend", disableSelect, { passive: false });

    addEvent(window, "keydown", (event) => {
      if (event.shiftKey == false) {
        content.setAttribute("noshiftheld", "");
      } else {
        content.removeAttribute("noshiftheld");
      }
    }, { passive: false });

    addEvent(content, "mousemove", (event) => { this.moveAction(event); }, { passive: false });
    addEvent(content, "touchmove", (event) => { this.moveAction(event); }, { passive: false });

    addEvent(window, "scroll", () => { this.updateActionUI(); }, { passive: true });
    addEvent(window, "resize", () => { this.updateActionUI(); }, { passive: true });

    addEvent(content, "click", (event) => { this.clickAction(event); }, { passive: true });
  }
};

// DRAG TOOL
modules["pages/editor/toolbar/drag"] = {
  getElementsInRect: function (selectBoxRect, children) {
    return Array.from(children)
      .filter(element => {
        const elementRect = element.getBoundingClientRect();
        return (
          elementRect.top <= selectBoxRect.bottom &&
          elementRect.bottom >= selectBoxRect.top &&
          elementRect.left <= selectBoxRect.right &&
          elementRect.right >= selectBoxRect.left
        );
      });
  },
  js: async function (editor, utils, addEvent) {
    let content = editor.page.querySelector(".eContent");

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";

    let cursorModule = await getModule("pages/editor/toolbar/cursor");

    let updateSelectedBounds = (event) => {
      let newX = clientPosition(event, "x") + window.scrollX;
      let newY = clientPosition(event, "y") + window.scrollY;
      if (newX > selectX) {
        selection.style.width = newX - selectX + "px";
        selection.style.left = selectX + "px";
        if (newY > selectY) {
          selection.style.height = newY - selectY + "px";
          selection.style.top = selectY + "px";
          selection.style.borderRadius = "10px 10px 0px 10px";
        } else {
          selection.style.height = selectY - newY + "px";
          selection.style.top = newY + "px";
          selection.style.borderRadius = "10px 0px 10px 10px";
        }
      } else {
        selection.style.width = selectX - newX + "px";
        selection.style.left = newX + "px";
        if (newY > selectY) {
          selection.style.height = newY - selectY + "px";
          selection.style.top = selectY + "px";
          selection.style.borderRadius = "10px 10px 10px 0px";
        } else {
          selection.style.height = selectY - newY + "px";
          selection.style.top = newY + "px";
          selection.style.borderRadius = "0px 10px 10px 10px";
        }
      }

      let selected = this.getElementsInRect(selection.getBoundingClientRect(), content.querySelectorAll(".eAnnotation"));
      for (let i = 0; i < selected.length; i++) {
        let page = selected[i].closest(".ePage");
        if (page != null && page.hasAttribute("hide") == true) {
          continue;
        }
        let annoID = selected[i].getAttribute("anno");
        let mCheck;
        let self = editor.getSelf();
        if (self.user != null) {
          mCheck = "user_" + self.user;
        } else {
          mCheck = "temp_" + self._id;
        }
        let render = ((editor.annotations[annoID] || {}).render || {});
        if (editor.lesson.settings.editOthersWork != true && render.m != null && render.m != mCheck && self.access < 4) { // Can't edit another member's work:
          continue;
        }
        editor.selecting[annoID] = {};
      }
      cursorModule.updateBox();
    }

    let selection;
    let selectX;
    let selectY;
    let wasSelected;
    let prevSelecting;
    let enableSelect = async (event) => {
      if (event.which === 3 || event.button === 2) {
        return;
      }

      cursorModule.enableAction(event);

      let target = event.target;
      if (target == null || target.closest(".eContent") == null || target.closest(".eSelectBar") != null) {
        return;
      }

      anno = target.closest(".eAnnotation, .eSelect, .eSelectActive");
      if (anno != null && anno.hasAttribute("member") == true) {
        // A display annotation, not a real one
        return;
      }

      selectX = clientPosition(event, "x") + window.scrollX;
      selectY = clientPosition(event, "y") + window.scrollY;
      if (anno != null) {
        let annoID = anno.getAttribute("anno");
        if (editor.selecting[annoID] != null) {
          disableSelect();
          return;
        }
        wasSelected = annoID;
      }
      if ((anno == null || editor.selecting[anno.getAttribute("anno")] == null) && event.shiftKey == false) {
        editor.selecting = {};
      }

      disableSelect();
      editor.toolbar.closeSubSubtoolUI();
      event.preventDefault();
      content.insertAdjacentHTML("beforeend", `<div class="eSelectDrag" tooleditor new></div>`);
      selection = content.querySelector(".eSelectDrag:not([remove])");
      selection.removeAttribute("new");

      prevSelecting = JSON.parse(JSON.stringify(editor.selecting));
      updateSelectedBounds(event);
    }
    let moveSelect = async (event) => {
      cursorModule.moveAction(event);

      if (selection == null) {
        return;
      }
      if (mouseDown() == false) {
        disableSelect();
        return;
      }
      selection.style.opacity = .4;

      editor.selecting = JSON.parse(JSON.stringify(prevSelecting));
      updateSelectedBounds(event);
    }
    let disableSelect = async (event) => {
      (async () => {
        if (selection == null) {
          return;
        }
        let remSelect = selection;
        selection = null;
        remSelect.setAttribute("remove", "");
        cursorModule.updateActionUI();
        remSelect.style.opacity = 0;
        await sleep(150);
        remSelect.remove();
      })();
      if (event != null) {
        cursorModule.endAction(event);

        let target = event.target;
        if (target == null) {
          return;
        }
        anno = target.closest(".eAnnotation, .eSelect, .eSelectActive");

        if (Math.floor((clientPosition(event, "x") + window.scrollX) - selectX) == 0 && Math.floor((clientPosition(event, "y") + window.scrollY) - selectY) == 0) {
          if (anno == null) {
            return;
          }
          let annoID = anno.getAttribute("anno");
          if (wasSelected != annoID && editor.selecting[annoID] != null) {
            delete editor.selecting[annoID];
          }
          cursorModule.updateBox();
        }
        wasSelected = null;
      }
    }
    addEvent(content, "mousedown", enableSelect, { passive: false });
    addEvent(content, "touchstart", enableSelect, { passive: false });
    addEvent(content, "mousemove", moveSelect, { passive: false });
    addEvent(content, "touchmove", moveSelect, { passive: false });
    addEvent(content, "mouseup", disableSelect, { passive: false });
    addEvent(content, "touchend", disableSelect, { passive: false });

    addEvent(window, "scroll", () => { cursorModule.updateActionUI(); }, { passive: true });
    addEvent(window, "resize", () => { this.updateActionUI(); }, { passive: true });

    addEvent(content, "click", (event) => { cursorModule.clickAction(event); }, { passive: true });
  }
};

// PAN TOOL
modules["pages/editor/toolbar/pan"] = {
  mouse: "grab",
  js: async function (editor, utils, addEvent) {
    let content = editor.page.querySelector(".eContent");

    body.style.userSelect = "none";

    let dragging = false;
    let startScrollX;
    let startScrollY;
    let selectX;
    let selectY;
    let enableDrag = async (event) => {
      dragging = true;
      startScrollX = window.scrollX;
      startScrollY = window.scrollY;
      selectX = clientPosition(event, "x");
      selectY = clientPosition(event, "y");
      content.style.cursor = "grabbing";
      body.style.userSelect = "none";
    }
    let moveDrag = async (event) => {
      if (dragging != true) {
        return;
      }
      if (mouseDown() == false) {
        disableDrag();
        return;
      }
      if (event.touches != null) {
        disableDrag();
        return;
      }
      let newX = clientPosition(event, "x");
      let newY = clientPosition(event, "y");
      window.scrollTo({ left: startScrollX - (newX - selectX), top: startScrollY - (newY - selectY) });
    }
    let disableDrag = async () => {
      dragging = false;
      content.style.cursor = "grab";
    }
    addEvent(content, "mousedown", enableDrag, { passive: false });
    addEvent(content, "touchstart", enableDrag, { passive: false });
    addEvent(content, "mousemove", moveDrag, { passive: false });
    addEvent(content, "touchmove", moveDrag, { passive: false });
    addEvent(content, "mouseup", disableDrag, { passive: false });
    addEvent(content, "touchend", disableDrag, { passive: false });
  }
};

// HIGHLIGHT TOOL
modules["pages/editor/toolbar/highlighter"] = {
  mouse: `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_235_2)"> <path d="M31.3781 20.4071L30.4384 20.0651L30.0964 21.0048L27.0871 29.2728C26.3315 31.3487 27.4019 33.644 29.4778 34.3996L34.1875 36.1138C36.2634 36.8694 38.5588 35.799 39.3144 33.7231L42.3237 25.4551L42.6657 24.5155L41.726 24.1734L31.3781 20.4071Z" fill="COLOR_REPLACE" fill-opacity="OPACITY_REPLACE" stroke="white" stroke-width="2"/> <path d="M39.3631 30.6623L40.3028 31.0044L40.6448 30.0647L46.8824 12.927C47.6379 10.8511 46.5676 8.55575 44.4917 7.80018L39.7819 6.08596C37.706 5.33039 35.4106 6.40074 34.655 8.47665L28.4175 25.6143L28.0754 26.554L29.0151 26.896L39.3631 30.6623Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> </g> <defs> <filter id="filter0_d_235_2" x="21.8447" y="0.84375" width="30.2803" height="40.5127" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_235_2"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_235_2" result="shape"/> </filter> </defs> </svg>`,
  realtimeTool: 1,
  js: async function (editor, utils, addEvent) {
    this.color = editor.preferences.tools.markup.color.selected;
    this.thickness = editor.preferences.tools.markup.thickness;
    this.opacity = editor.preferences.tools.markup.opacity;
    this.publish = { c: this.color, o: this.opacity };

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";

    let markup;
    let anno;
    let enableMarkup = async (event) => {
      disableMarkup();
      editor.toolbar.closeSubSubtoolUI();
      event.preventDefault();
      let clientY = clientPosition(event, "y");
      let [page, number] = await utils.findPage(clientY);
      if (page.hasAttribute("hide") == true) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientY, number);
      if (editor.lesson.type == "freeboard") {
        y += 4;
      }
      let tempID = utils.tempID();
      let newAnno = {
        _id: tempID,
        f: "markup",
        p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
        s: [0, 0],
        c: this.color,
        t: this.thickness,
        o: this.opacity,
        d: [0, 0]
      };
      if (page != null && page.hasAttribute("pageid") == true) {
        newAnno.page = page.getAttribute("pageid");
      }
      [markup, anno] = await utils.render(newAnno);
      editor.selecting[tempID] = markup;
    }
    let moveMarkup = async (event) => {
      if (markup == null) {
        return;
      }
      if (mouseDown() == false) {
        disableMarkup();
        return;
      }
      if (event.touches != null && event.touches.length > 1) {
        return;
      }
      event.preventDefault();
      let rect = anno.getBoundingClientRect();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x") - rect.left, clientPosition(event, "y") - rect.top);
      let halfT = utils.round(markup.t / 2);
      x -= halfT;
      y -= halfT;
      if (event.shiftKey == false) {
        if (x > markup.s[0]) {
          markup.s[0] = Math.ceil(x);
        }
        if (y > markup.s[1]) {
          markup.s[1] = Math.ceil(y);
        }
        let sizeIncX = Math.ceil(x);
        if (sizeIncX < 0) {
          for (let i = 0; i < markup.d.length; i += 2) {
            markup.d[i] = utils.round(markup.d[i] - sizeIncX);
          }
          markup.s[0] = utils.round(markup.s[0] - sizeIncX);
          markup.p[0] = utils.round(markup.p[0] + sizeIncX);
          x = 0;
        }
        let sizeIncY = Math.ceil(y);
        if (sizeIncY < 0) {
          for (let i = 1; i < markup.d.length; i += 2) {
            markup.d[i] = utils.round(markup.d[i] - sizeIncY);
          }
          markup.s[1] = utils.round(markup.s[1] - sizeIncY);
          markup.p[1] = utils.round(markup.p[1] + sizeIncY);
          y = 0;
        }
        markup.d.push(utils.round(x));
        markup.d.push(utils.round(y));
      } else {
        markup.d = [markup.d[0], markup.d[1]];
        let sizeIncX = x;
        if (sizeIncX < markup.d[0]) {
          markup.d[0] = utils.round(markup.d[0] - sizeIncX);
          markup.s[0] = markup.s[0] - sizeIncX;
          markup.p[0] = utils.round(markup.p[0] + sizeIncX);
          x = 0;
        } else {
          markup.s[0] = Math.ceil(x);
        }
        let sizeIncY = y;
        if (sizeIncY < markup.d[1]) {
          markup.d[1] = utils.round(markup.d[1] - sizeIncY);
          markup.s[1] = markup.s[1] - sizeIncY;
          markup.p[1] = utils.round(markup.p[1] + sizeIncY);
          y = 0;
        } else {
          markup.s[1] = Math.ceil(y);
        }
        markup.d[2] = x;
        markup.d[3] = y;
        if (drawModule.horizontalLine(markup.d) == true) {
          markup.d[3] = markup.d[1];
          markup.s[1] = markup.t;
          markup.p[1] = utils.round(markup.p[1] + markup.d[1]);
          markup.d[1] = 0;
          markup.d[3] = 0;
        }
      }
      utils.render(markup, anno);
      if (markup.d.length > 6150) { // Start new annotation when path too long
        disableMarkup();
        enableMarkup(event);
      }
    }
    let drawModule = await getModule("pages/editor/toolbar/pen");
    let disableMarkup = async () => {
      if (markup == null) {
        return;
      }
      markup.d = drawModule.simplifyPath(markup.d, .75 / editor.zoom);
      if (drawModule.relativelyStraight(markup.d, 5 * editor.zoom) == true) {
        markup.d = [markup.d[0], markup.d[1], markup.d[markup.d.length - 2], markup.d[markup.d.length - 1]]; // Strait line
        if (drawModule.horizontalLine(markup.d) == true) {
          let averageY = (markup.d[1] + markup.d[3]) / 2;
          markup.s[1] = markup.t;
          markup.p[1] = utils.round(markup.p[1] + averageY);
          markup.d[1] = 0;
          markup.d[3] = 0;
        }
      }

      utils.save(markup, anno);
      utils.pushHistory("remove", [{ _id: markup._id }]);

      markup.done = true; // Alert other clients that this annotation is done
      await utils.forceShort();
      delete editor.selecting[markup._id];
      markup = null;
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousedown", enableMarkup, { passive: false });
    addEvent(content, "touchstart", enableMarkup, { passive: false });
    addEvent(content, "mousemove", moveMarkup, { passive: false });
    addEvent(content, "touchmove", moveMarkup, { passive: false });
    addEvent(content, "mouseup", disableMarkup, { passive: false });
    addEvent(content, "touchend", disableMarkup, { passive: false });
  }
};
// UNDERLINE TOOL
modules["pages/editor/toolbar/understrike"] = {
  mouse: `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_235_2)"> <path d="M31.3781 20.4071L30.4384 20.0651L30.0964 21.0048L27.0871 29.2728C26.3315 31.3487 27.4019 33.644 29.4778 34.3996L34.1875 36.1138C36.2634 36.8694 38.5588 35.799 39.3144 33.7231L42.3237 25.4551L42.6657 24.5155L41.726 24.1734L31.3781 20.4071Z" fill="COLOR_REPLACE" stroke="white" stroke-width="2"/> <path d="M39.3631 30.6623L40.3028 31.0044L40.6448 30.0647L46.8824 12.927C47.6379 10.8511 46.5676 8.55575 44.4917 7.80018L39.7819 6.08596C37.706 5.33039 35.4106 6.40074 34.655 8.47665L28.4175 25.6143L28.0754 26.554L29.0151 26.896L39.3631 30.6623Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> </g> <defs> <filter id="filter0_d_235_2" x="21.8447" y="0.84375" width="30.2803" height="40.5127" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_235_2"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_235_2" result="shape"/> </filter> </defs> </svg>`,
  realtimeTool: 1,
  js: async function (editor, utils, addEvent) {
    this.color = editor.preferences.tools.markup.color.selected;
    this.thickness = editor.preferences.tools.markup.thickness;
    this.publish = { c: this.color };

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";

    let markup;
    let anno;
    let enableMarkup = async (event) => {
      disableMarkup();
      editor.toolbar.closeSubSubtoolUI();
      event.preventDefault();
      let clientY = clientPosition(event, "y");
      let [page, number] = await utils.findPage(clientY);
      if (page.hasAttribute("hide") == true) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientY, number);
      if (editor.lesson.type == "freeboard") {
        y += 4;
      }
      let thickness = utils.round(Math.max(this.thickness / 4, 1));
      let tempID = utils.tempID();
      let newAnno = {
        _id: tempID,
        f: "draw",
        p: [utils.round(x - thickness), utils.round(y - thickness)],
        s: [0, 0],
        c: this.color,
        t: thickness,
        o: 100,
        d: [0, 0]
      };
      if (page != null && page.hasAttribute("pageid") == true) {
        newAnno.page = page.getAttribute("pageid");
      }
      [markup, anno] = await utils.render(newAnno);
      editor.selecting[tempID] = markup;
    }
    let drawModule = await getModule("pages/editor/toolbar/pen");
    let moveMarkup = async (event) => {
      if (markup == null) {
        return;
      }
      if (mouseDown() == false) {
        disableMarkup();
        return;
      }
      if (event.touches != null && event.touches.length > 1) {
        return;
      }
      event.preventDefault();
      let rect = anno.getBoundingClientRect();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x") - rect.left, clientPosition(event, "y") - rect.top);
      let halfT = utils.round(Math.max(this.thickness / 4, 1)) / 2;
      x -= halfT;
      y -= halfT;
      let sizeIncX = x;
      if (sizeIncX < markup.d[0]) {
        markup.d[0] = utils.round(markup.d[0] - sizeIncX);
        markup.s[0] = utils.round(markup.s[0] - sizeIncX);
        markup.p[0] = utils.round(markup.p[0] + sizeIncX);
        x = 0;
      } else {
        markup.s[0] = Math.ceil(x);
      }
      let sizeIncY = y;
      if (sizeIncY < markup.d[1]) {
        markup.d[1] = utils.round(markup.d[1] - sizeIncY);
        markup.s[1] = utils.round(markup.s[1] - sizeIncY);
        markup.p[1] = utils.round(markup.p[1] + sizeIncY);
        y = 0;
      } else {
        markup.s[1] = Math.ceil(y);
      }
      markup.d[2] = x;
      markup.d[3] = y;
      if (drawModule.horizontalLine(markup.d) == true) {
        markup.d[3] = markup.d[1];
        markup.s[1] = markup.t;
        markup.p[1] = utils.round(markup.p[1] + markup.d[1]);
        markup.d[1] = 0;
        markup.d[3] = 0;
      }
      utils.render(markup, anno);
    }
    let disableMarkup = async () => {
      if (markup == null) {
        return;
      }

      utils.save(markup, anno);
      utils.pushHistory("remove", [{ _id: markup._id }]);

      markup.done = true; // Alert other clients that this annotation is done
      await utils.forceShort();
      delete editor.selecting[markup._id];
      markup = null;
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousedown", enableMarkup, { passive: false });
    addEvent(content, "touchstart", enableMarkup, { passive: false });
    addEvent(content, "mousemove", moveMarkup, { passive: false });
    addEvent(content, "touchmove", moveMarkup, { passive: false });
    addEvent(content, "mouseup", disableMarkup, { passive: false });
    addEvent(content, "touchend", disableMarkup, { passive: false });
  }
};

// TEXT TOOL
modules["pages/editor/toolbar/text"] = {
  js: async function (editor, utils, addEvent, extra) {
    this.color = editor.preferences.tools.text.color.selected;
    this.opacity = editor.preferences.tools.text.opacity;
    this.publish = {};

    let toolbar = await getModule("editor/toolbar");
    let cursor = await getModule("pages/editor/toolbar/cursor");

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";
    editor.page.setAttribute("enabled", "");

    let content = editor.page.querySelector(".eContent");

    let text;
    let anno;
    let clientY;
    let clientX;
    let textmove = async (event) => {
      if (text == null) {
        // If not text box, make one!
        text = {
          f: "text",
          //p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
          s: [0, 0], //[this.thickness, this.thickness],
          c: this.color,
          o: this.opacity,
          d: { s: editor.preferences.tools.text.size, al: editor.preferences.tools.text.align, b: ["Example Text"] },
          hidden: true,
          textfit: true
        };
      }
      clientX = clientPosition(event, "x") || clientX;
      clientY = clientPosition(event, "y") || clientY;
      let [page, number] = await utils.findPage(clientY);
      if (page.hasAttribute("hide") == true) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY, number);
      if (editor.lesson.type == "freeboard") {
        y += 4;
      }
      text.p = [utils.round(x - (text.s[0] / 2)), utils.round(y - (text.s[1] / 2))];
      if (page != null && page.hasAttribute("pageid") == true) {
        text.page = page.getAttribute("pageid");
      }
      [_, anno] = await utils.render(text, anno);
      let textElem = anno.querySelector("div[text]");
      if (textElem != null) {
        text.s = [textElem.offsetWidth, textElem.offsetHeight];
        delete text.hidden;
      }
      editor.selecting["cursor"] = text;
    }
    let placetext = async () => {
      let saveText = JSON.parse(JSON.stringify(text));
      text = null;
      delete editor.selecting["cursor"];

      let tempID = utils.tempID();
      anno.setAttribute("anno", tempID);
      anno.removeAttribute("tooleditor");
      saveText.sync = getEpoch();
      utils.save({ ...saveText, _id: tempID }, anno);
      utils.pushHistory("remove", [{ _id: tempID }]);

      saveText.done = true; // Alert other clients that this annotation is done
      editor.selecting[tempID] = saveText;
      await utils.forceShort();

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'), "select");
      editor.selecting[tempID] = {};
      await cursor.updateBox();

      let textElem = anno.querySelector("div[text]");
      if (textElem != null) {
        textElem.textContent = "";
      }

      cursor.clickAction({
        target: content.querySelector('.eSelectBar:not([remove]) .eTool[action="pages/editor/toolbar/textedit"]')
      });
    }
    addEvent(content, "mousemove", textmove, { passive: false });
    addEvent(content, "touchmove", textmove, { passive: false });
    addEvent(window, "scroll", textmove, { passive: false });
    addEvent(content, "mouseup", placetext, { passive: false });
    addEvent(content, "touchend", placetext, { passive: false });
  }
};

// PEN TOOL
modules["pages/editor/toolbar/pen"] = {
  mouse: `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_230_9)"> <path d="M34.1403 16.8592L33.2006 16.5172L32.8586 17.4569L30.0243 25.2438C29.0801 27.8382 29.3788 30.7224 30.8347 33.0682L31.1771 33.6198C31.6637 34.4037 32.6235 34.7531 33.5002 34.4653L34.117 34.2628C36.7401 33.4017 38.8229 31.3843 39.7672 28.7899L42.6014 21.003L42.9434 20.0633L42.0037 19.7213L34.1403 16.8592Z" fill="COLOR_REPLACE" fill-opacity="OPACITY_REPLACE" stroke="white" stroke-width="2"/> <path d="M39.0164 27.925L39.9561 28.2671L40.2981 27.3274L45.5943 12.7762C46.5735 10.0858 45.1863 7.11099 42.4959 6.13176C39.8055 5.15253 36.8307 6.53971 35.8514 9.23012L30.5553 23.7813L30.2132 24.721L31.1529 25.063L39.0164 27.925Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> </g> <defs> <filter id="filter0_d_230_9" x="24.4814" y="0.817383" width="26.4268" height="38.748" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_230_9"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_230_9" result="shape"/> </filter> </defs> </svg>`,
  realtimeTool: 2,
  simplifyPath: function (points, epsilon) {
    if (points.length <= 2) {
      return points;
    }

    let dmax = 0;
    let index = 0;

    for (let i = 2; i < points.length - 2; i += 2) {
      let d = this.perpendicularDistance(points.slice(i, i + 2), points.slice(0, 2), points.slice(-2));
      if (d > dmax) {
        index = i;
        dmax = d;
      }
    }

    if (dmax > epsilon) {
      let left = this.simplifyPath(points.slice(0, index + 2), epsilon);
      let right = this.simplifyPath(points.slice(index), epsilon);
      return left.slice(0, left.length - 2).concat(right);
    } else {
      if (points[0] !== points[points.length - 2] || points[1] !== points[points.length - 1]) {
        return [points[0], points[1], points[points.length - 2], points[points.length - 1]];
      } else {
        return [points[0], points[1]];
      }
    }
  },
  perpendicularDistance: function (point, lineStart, lineEnd) {
    return Math.abs((lineEnd[1] - lineStart[1]) * point[0] - (lineEnd[0] - lineStart[0]) * point[1] +
      lineEnd[0] * lineStart[1] - lineEnd[1] * lineStart[0]) /
      Math.sqrt(Math.pow(lineEnd[1] - lineStart[1], 2) + Math.pow(lineEnd[0] - lineStart[0], 2));
  },
  relativelyStraight: function (coordinates, tolerance) {
    // Extract pairs of points from the coordinates array
    const points = [];
    for (let i = 0; i < coordinates.length; i += 2) {
      points.push([coordinates[i], coordinates[i + 1]]);
    }

    // Calculate the slope between consecutive pairs of points
    let slope = null;
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];

      const newSlope = (y2 - y1) / (x2 - x1);

      if (isFinite(newSlope)) {
        if (Math.abs(slope - newSlope) > tolerance) {
          return false; // Slopes differ significantly
        }

        slope = newSlope;
      }
    }

    return true; // All slopes are consistent
  },
  horizontalLine: function (points) {
    if (Math.abs(points[1] - points[3]) < 15) {
      return true;
    }
    return false;
  },
  js: async function (editor, utils, addEvent) {
    this.color = editor.preferences.tools.draw.color.selected;
    this.thickness = editor.preferences.tools.draw.thickness;
    this.opacity = editor.preferences.tools.draw.opacity;
    this.publish = { c: this.color, o: this.opacity };

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";

    let draw;
    let anno;
    let enableDraw = async (event) => {
      disableDraw();
      editor.toolbar.closeSubSubtoolUI();
      event.preventDefault();
      let clientY = clientPosition(event, "y");
      let [page, number] = await utils.findPage(clientY);
      if (page.hasAttribute("hide") == true) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientY, number);
      if (editor.lesson.type == "freeboard") {
        y += 4;
      }
      let tempID = utils.tempID();
      let newAnno = {
        _id: tempID,
        f: "draw",
        p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
        s: [0, 0], //[this.thickness, this.thickness],
        c: this.color,
        t: this.thickness,
        o: this.opacity,
        d: [0, 0]
      };
      if (page != null && page.hasAttribute("pageid") == true) {
        newAnno.page = page.getAttribute("pageid");
      }
      [draw, anno] = await utils.render(newAnno);
      editor.selecting[tempID] = draw;
    }
    let moveDraw = async (event) => {
      if (draw == null) {
        return;
      }
      if (mouseDown() == false) {
        disableDraw();
        return;
      }
      if (event.touches != null && event.touches.length > 1) {
        return;
      }
      event.preventDefault();
      let rect = anno.getBoundingClientRect();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x") - rect.left, clientPosition(event, "y") - rect.top);
      let halfT = utils.round(draw.t / 2);
      x -= halfT;
      y -= halfT;
      if (event.shiftKey == false) {
        if (x > draw.s[0]) {
          draw.s[0] = Math.ceil(x);
        }
        if (y > draw.s[1]) {
          draw.s[1] = Math.ceil(y);
        }
        let sizeIncX = Math.ceil(x);
        if (sizeIncX < 0) {
          for (let i = 0; i < draw.d.length; i += 2) {
            draw.d[i] = utils.round(draw.d[i] - sizeIncX);
          }
          draw.s[0] = utils.round(draw.s[0] - sizeIncX);
          draw.p[0] = utils.round(draw.p[0] + sizeIncX);
          x = 0;
        }
        let sizeIncY = Math.ceil(y);
        if (sizeIncY < 0) {
          for (let i = 1; i < draw.d.length; i += 2) {
            draw.d[i] = utils.round(draw.d[i] - sizeIncY);
          }
          draw.s[1] = utils.round(draw.s[1] - sizeIncY);
          draw.p[1] = utils.round(draw.p[1] + sizeIncY);
          y = 0;
        }
        draw.d.push(utils.round(x));
        draw.d.push(utils.round(y));
      } else {
        draw.d = [draw.d[0], draw.d[1]];
        let sizeIncX = x;
        if (sizeIncX < draw.d[0]) {
          draw.d[0] = utils.round(draw.d[0] - sizeIncX);
          draw.s[0] = utils.round(draw.s[0] - sizeIncX);
          draw.p[0] = utils.round(draw.p[0] + sizeIncX);
          x = 0;
        } else {
          draw.s[0] = Math.ceil(x);
        }
        let sizeIncY = y;
        if (sizeIncY < draw.d[1]) {
          draw.d[1] = utils.round(draw.d[1] - sizeIncY);
          draw.s[1] = utils.round(draw.s[1] - sizeIncY);
          draw.p[1] = utils.round(draw.p[1] + sizeIncY);
          y = 0;
        } else {
          draw.s[1] = Math.ceil(y);
        }
        draw.d[2] = x;
        draw.d[3] = y;
      }
      utils.render(draw, anno);
      if (draw.d.length > 6150) { // Start new annotation when path too long
        disableDraw();
        enableDraw(event);
      }
    }
    let disableDraw = async () => {
      if (draw == null) {
        return;
      }
      draw.d = this.simplifyPath(draw.d, .75 / editor.zoom);

      utils.save(draw, anno);
      utils.pushHistory("remove", [{ _id: draw._id }]);

      draw.done = true; // Alert other clients that this annotation is done
      await utils.forceShort();
      delete editor.selecting[draw._id];
      draw = null;
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousedown", enableDraw, { passive: false });
    addEvent(content, "touchstart", enableDraw, { passive: false });
    addEvent(content, "mousemove", moveDraw, { passive: false });
    addEvent(content, "touchmove", moveDraw, { passive: false });
    addEvent(content, "mouseup", disableDraw, { passive: false });
    addEvent(content, "touchend", disableDraw, { passive: false });
  }
};
// ERASER TOOL
modules["pages/editor/toolbar/eraser"] = {
  mouse: `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_236_14)"> <path d="M32 25V24H33H43C45.2091 24 47 25.7909 47 28V36C47 38.2091 45.2091 40 43 40H33H32V39V25Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> <path d="M32 39V40H31H21C18.7909 40 17 38.2091 17 36V28C17 25.7909 18.7909 24 21 24H31H32V25V39Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> </g> <defs> <filter id="filter0_d_236_14" x="12" y="19" width="40" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_236_14"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_236_14" result="shape"/> </filter> </defs> </svg>`,
  realtimeTool: 3,
  js: async function (editor, utils, addEvent) {
    this.publish = {};

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";
    editor.page.setAttribute("enabled", "");

    function isPointOnLine(x, y, x1, y1, x2, y2, tolerance) {
      // Calculate the distance from the point to the line segment
      let A = x - x1;
      let B = y - y1;
      let C = x2 - x1;
      let D = y2 - y1;

      let dot = A * C + B * D;
      let lenSq = C * C + D * D;
      let param = dot / lenSq;

      let closestX, closestY;

      if (param < 0 || (x1 == x2 && y1 == y2)) {
        closestX = x1;
        closestY = y1;
      } else if (param > 1) {
        closestX = x2;
        closestY = y2;
      } else {
        closestX = x1 + param * C;
        closestY = y1 + param * D;
      }

      let dx = x - closestX;
      let dy = y - closestY;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // Check if the distance is within the specified tolerance
      return distance <= tolerance;
    }

    let erasing = false;
    let starterase = (event) => {
      erasing = true;
      erase(event);
    }
    let x0;
    let y0;
    let enderase = () => {
      x0 = 0;
      y0 = 0;
      erasing = false;
    }
    let erase = async (event) => {
      if (mouseDown() == false || erasing == false) {
        enderase();
        return;
      }
      if (event.touches != null && event.touches.length > 1) {
        return;
      }
      editor.toolbar.closeSubSubtoolUI();

      let x1 = clientPosition(event, "x");
      let y1 = clientPosition(event, "y");

      event.preventDefault();

      let [page] = await utils.findPage(y1);
      if (page.hasAttribute("hide") == true) {
        return;
      }

      let mCheck;
      let self = editor.getSelf();
      if (self.user != null) {
        mCheck = "user_" + self.user;
      } else {
        mCheck = "temp_" + self._id;
      }

      x0 = x0 || x1;
      y0 = y0 || y1;

      // To fix cursor move, a line is drawn between mouse points and elements between are removed:
      let dx = Math.abs(x1 - x0);
      let dy = Math.abs(y1 - y0);
      let sx = (x0 < x1) ? 1 : -1;
      let sy = (y0 < y1) ? 1 : -1;
      let err = dx - dy;

      while (true) {
        // Handle Erase:
        let annos = document.elementsFromPoint(x0, y0);
        for (let i = 0; i < annos.length; i++) {
          let anno = annos[i].closest(".eAnnotation");
          if (anno != null && anno.hasAttribute("hidden") == false && anno.querySelector("polyline") != null) {
            let annoID = anno.getAttribute("anno");
            let annotation = editor.annotations[annoID];
            if (annotation != null) {
              let render = annotation.render || {};
              if (editor.lesson.settings.editOthersWork != true && render.m != null && render.m != mCheck && self.access < 4) { // Can't edit another member's work:
                continue;
              }
              
              // This alone isn't enough, the actual points MUST be checked:
              let drawing = anno.querySelector("polyline");
              if (drawing != null && drawing.hasAttribute("points") == true) {
                let rect = anno.getBoundingClientRect();
                let { x, y } = await utils.scaleToDoc(x0 - rect.left, y0 - rect.top);
                let points = drawing.points;
                for (let i = 1; i < points.numberOfItems; i++) {
                  if (isPointOnLine(x + 100, y + 100, points.getItem(i - 1).x, points.getItem(i - 1).y, points.getItem(i).x, points.getItem(i).y, (parseInt(drawing.getAttribute("stroke-width")) / 2) + 10)) {
                    anno.setAttribute("hidden", "");
                    await utils.pushHistory("add", [render]);
                    let updateAnno = { _id: annoID, remove: true };
                    utils.save(updateAnno, anno);
                    this.publish.u = updateAnno;
                    await utils.forceShort();
                    delete this.publish.u;
                    break;
                  }
                }
              }
            }
          }
        }

        if (x0 === x1 && y0 === y1) {
          break;
        }

        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x0 += sx;
        }
        if (e2 < dx) {
          err += dx;
          y0 += sy;
        }
      }

      x0 = x1;
      y0 = y1;
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousedown", starterase, { passive: false });
    addEvent(content, "touchstart", starterase, { passive: false });
    addEvent(content, "mousemove", erase, { passive: false });
    addEvent(content, "touchmove", erase, { passive: false });
    addEvent(content, "mouseup", enderase, { passive: false });
    addEvent(content, "touchend", enderase, { passive: false });
  }
};

// SHAPE TOOL
modules["pages/editor/toolbar/shape"] = {
  js: async function (editor, utils, addEvent, extra) {
    this.color = editor.preferences.tools.shape.color.selected;
    this.thickness = editor.preferences.tools.shape.thickness;
    this.opacity = editor.preferences.tools.shape.opacity;
    this.publish = {};

    let toolbar = await getModule("editor/toolbar");
    let cursor = await getModule("pages/editor/toolbar/cursor");

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";
    editor.page.setAttribute("enabled", "");

    /*
    let clientY = clientPosition(event, "y");
    let [page, number] = await utils.findPage(clientY);
    let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientY, number);
    let tempID = utils.tempID();
    let newAnno = {
      _id: tempID,
      f: "draw",
      p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
      s: [0, 0], //[this.thickness, this.thickness],
      c: this.color,
      t: this.thickness,
      o: this.opacity,
      d: [0, 0]
    };
    if (page != null && page.hasAttribute("pageid") == true) {
      newAnno.page = page.getAttribute("pageid");
    }
    [draw, anno] = await utils.render(newAnno);
    editor.selecting[tempID] = draw;
    */
    let shape;
    let anno;
    let clientY;
    let clientX;
    let shapemove = async (event) => {
      if (shape == null) {
        // If not shape, make one!
        shape = {
          f: "shape",
          //p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
          s: [125, 125], //[this.thickness, this.thickness],
          c: this.color,
          t: this.thickness,
          o: this.opacity,
          //d: []
        };
        switch (extra.tool) {
          case "square":
            shape.d = "square";
            break;
          case "ellipse":
            shape.d = "ellipse";
            break;
          case "triangle":
            shape.d = "triangle";
            break;
          case "parallelogram":
            shape.d = "parallelogram";
            break;
          case "trapezoid":
            shape.d = "trapezoid";
            break;
          case "rhombus":
            shape.d = "rhombus";
            break;
          case "line":
            shape.d = "line";
        }
      }
      clientX = clientPosition(event, "x") || clientX;
      clientY = clientPosition(event, "y") || clientY;
      let [page, number] = await utils.findPage(clientY);
      if (page.hasAttribute("hide") == true) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY, number);
      if (editor.lesson.type == "freeboard") {
        y += 4;
      }
      shape.p = [utils.round(x - (shape.s[0] / 2) - shape.t), utils.round(y - (shape.s[1] / 2) - shape.t)];
      if (page != null && page.hasAttribute("pageid") == true) {
        shape.page = page.getAttribute("pageid");
      }
      [_, anno] = await utils.render(shape, anno);
      editor.selecting["cursor"] = shape;
    }
    let placeshape = async () => {
      let saveShape = JSON.parse(JSON.stringify(shape));
      shape = null;
      delete editor.selecting["cursor"];

      let tempID = utils.tempID();
      anno.setAttribute("anno", tempID);
      anno.removeAttribute("tooleditor");
      saveShape.sync = getEpoch();
      utils.save({ ...saveShape, _id: tempID }, anno);
      utils.pushHistory("remove", [{ _id: tempID }]);

      saveShape.done = true; // Alert other clients that this annotation is done
      editor.selecting[tempID] = saveShape;
      await utils.forceShort();

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'), "select");
      editor.selecting[tempID] = {};
      cursor.updateBox();
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousemove", shapemove, { passive: false });
    addEvent(content, "touchmove", shapemove, { passive: false });
    addEvent(window, "scroll", shapemove, { passive: false });
    addEvent(content, "mouseup", placeshape, { passive: false });
    addEvent(content, "touchend", placeshape, { passive: false });
  }
};

// MEDIA TOOL
modules["pages/editor/toolbar/upload"] = {
  width: 150,
  height: 150,
  js: async function (editor, utils, addEvent, extra) {
    this.publish = {};

    let toolbar = await getModule("editor/toolbar");
    let cursor = await getModule("pages/editor/toolbar/cursor");
    let alertModule = await getModule("alert");

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";
    editor.page.setAttribute("enabled", "");

    let content = editor.page.querySelector(".eContent");

    let uploadInput = editor.page.querySelector(".eToolMediaInput");
    if (uploadInput != null) {
      uploadInput.remove();
    }
    
    editor.page.insertAdjacentHTML("beforeend", `<input class="eToolMediaInput" tooleditor type="file" accept="image/*" multiple="true" hidden="true">`);
    uploadInput = editor.page.querySelector(".eToolMediaInput");
    
    let reset = () => {
      let button = editor.page.querySelector('.eTool[module="pages/editor/toolbar/upload"]');
      if (button != null) {
        button.removeAttribute("selected");
      }
      uploadInput.value = null;
      toolbar.disableTool();
    }

    uploadInput.addEventListener("change", async (event) => {
      if (connected == false) {
        reset();
        alertModule.open("error", "<b>No Connection</b>Connect to the internet to upload media.");
        return;
      }
      /*
      if (button != null) {
        button.removeAttribute("selected");
      }
      */
      let file = (event.target.files || [])[0];
      if (file == null) {
        return;
      }
      if (file.kind == "file") {
        file = file.getAsFile();
      }
      if (file.kind != "string") {
        if (file.type.substring(0, 6) == "image/") {
          if (supportedImageTypes.includes(file.type.replace(/image\//g, "")) == true) {
            if (file.size < 10485760) { // 10 MB
              this.imageBlob = URL.createObjectURL(file);
              let image = new Image();
              image.src = this.imageBlob;
              image.onload = () => {
                this.width = Math.min(image.width, 400);
                this.height = image.height * (this.width / image.width);
                mediamove(event);
              }
              let form = new FormData();
              form.append("media", file);
              let initBlob = this.imageBlob;
              let [code, result] = await sendRequest("POST", "lessons/save/upload", form, { noFileType: true, session: editor.session });
              let blobAnno = editor.page.querySelector('.eAnnotation[src="' + initBlob + '"]');
              if (code == 200) {
                let preload = new Image();
                preload.src = assetURL + result.file;
                preload.onload = () => {
                  if (blobAnno != null && blobAnno.hasAttribute("anno") == true) {
                    utils.save({ _id: blobAnno.getAttribute("anno"), d: result.file }, blobAnno);
                  }
                  if (image.src == this.imageBlob) {
                    this.imageBlob = result.file;
                    if (this.media != null) {
                      this.media.d = result.file;
                    }
                  }
                  if (image.src == this.imageBlob) {
                    URL.revokeObjectURL(this.imageBlob);
                  }
                }
              } else {
                if (image.src == this.imageBlob) {
                  URL.revokeObjectURL(this.imageBlob);
                }
                if (blobAnno != null) {
                  if (blobAnno.hasAttribute("anno") == true) {
                    utils.save({ _id: blobAnno.getAttribute("anno"), remove: true }, blobAnno);
                  } else {
                    blobAnno.remove();
                  }
                }
                reset();
              }
            } else {
              reset();
              alertModule.open("error", "<b>Image Too Large</b>10 MB is the file size limit.");
            }
          } else {
            reset();
            alertModule.open("error", `<b>Invalid Image Type</b>The following image types are supported: <i style='color: var(--darkGray)'>${(supportedImageTypes.join(", "))}</i>`);
          }
        } else {
          reset();
          alertModule.open("error", "<b>Invalid File Type</b>Only images are currently supported.");
        }
      }
      uploadInput.value = null;
    });
    uploadInput.addEventListener("cancel", () => {
      reset();
      uploadInput.value = null;
    });

    uploadInput.click();

    let anno;
    let clientY;
    let clientX;
    let mediamove = async (event) => {
      if (this.media == null) {
        // If not text box, make one!
        this.media = {
          f: "media",
          //p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
          //s: [this.width, this.height], //[this.thickness, this.thickness],
          c: this.color,
          o: this.opacity
        };
      }
      clientX = clientPosition(event, "x") || clientX;
      clientY = clientPosition(event, "y") || clientY;
      let [page, number] = await utils.findPage(clientY);
      if (page.hasAttribute("hide") == true) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY, number);
      if (editor.lesson.type == "freeboard") {
        y += 4;
      }
      this.media.s = [this.width, this.height];
      this.media.p = [utils.round(x - (this.media.s[0] / 2)), utils.round(y - (this.media.s[1] / 2))];
      if (page != null && page.hasAttribute("pageid") == true) {
        this.media.page = page.getAttribute("pageid");
      }
      [_, anno] = await utils.render({ ...this.media, d: this.imageBlob }, anno);
      editor.selecting["cursor"] = this.media;
    }
    let placemedia = async () => {
      let saveMedia = JSON.parse(JSON.stringify(this.media));
      if (this.imageBlob.startsWith("blob:") == false) {
        saveMedia.d = this.imageBlob;
      }
      this.media = null;
      delete editor.selecting["cursor"];

      let tempID = utils.tempID();
      anno.setAttribute("anno", tempID);
      anno.removeAttribute("tooleditor");
      saveMedia.sync = getEpoch();
      utils.save({ ...saveMedia, _id: tempID }, anno);
      utils.pushHistory("remove", [{ _id: tempID }]);

      saveMedia.done = true; // Alert other clients that this annotation is done
      editor.selecting[tempID] = saveMedia;
      await utils.forceShort();

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'), "select");
      editor.selecting[tempID] = {};
      await cursor.updateBox();
    }
    addEvent(content, "mousemove", mediamove, { passive: false });
    addEvent(content, "touchmove", mediamove, { passive: false });
    addEvent(window, "scroll", mediamove, { passive: false });
    addEvent(content, "mouseup", placemedia, { passive: false });
    addEvent(content, "touchend", placemedia, { passive: false });
  }
};

modules["pages/editor/toolbar/color"] = {
  button: `<div class="eSubToolColorHolder"><div class="eSubToolColor" backcolor picked></div></div>`,
  tooltip: "Colors",
  setButton: function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
    button.querySelector(".eSubToolColor").style.background = editor.hexToRGB(preferenceTool.c, (preferenceTool.o || 0) / 100);
  },
  html: `
    <div class="eSubToolColorFrame">
      <div class="eSubToolColorSelector">
        <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
        <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
        <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
        <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
        <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
        <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
        <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
        <button class="eTool" enablepicker option noselect><div><img class="eSubToolImage" src="./images/editor/picker.svg"></div></button>
      </div>
      <div class="eSubToolColorPicker">
        <div class="eSubToolColorPickerTop">
          <div class="eSubToolColorPickerTopSelected"></div>
          <button class="eSubToolColorPickerEyedroper" title="Eyedropper"><img src="./images/editor/eyedropper.svg"></button>
          <button class="eSubToolColorPickerTopBack buttonAnim border"><img src="./images/tooltips/close.svg"></button>
        </div>
        <div class="eSubToolColorPickerShade">
          <div><canvas></canvas></div>
          <button></button>
        </div>
        <div class="eSubToolColorPickerGradient">
          <div class="eSubToolColorPickerGradientSlider"></div>
          <button></button>
        </div>
        <div class="eSubToolColorPickerInput">
          <button class="largeButton border" title="Change Color Scale"></button>
          <input name="Color Input">
        </div>
      </div>
    </div>
  `,
  css: {
    ".eSubToolColorHolder": `display: flex; width: 32px; height: 32px; background: #fff; border: solid 3px var(--pageColor); border-radius: 19px; justify-content: center; align-items: center`,
    ".eSubToolColor": `width: 100%; height: 100%; border-radius: 16px`,
    ".eSubToolImage": `width: 100%`,

    ".eSubToolColorFrame": `position: relative; width: 212px; min-height: 106px`,
    ".eSubToolColorSelector": `display: flex; flex-wrap: wrap; top: 0px; justify-content: center; align-items: center; transform: scale(1); opacity: 1; transition: .5s`,
    ".eSubToolColorSelector .eTool": `width: 46px; height: 46px; margin: 3px`,
    ".eSubToolColorSelector .eTool > div": `border-radius: 25px !important`,
    ".eSubToolColorSelector .eSubToolColor": `width: 32px; height: 32px`,

    ".eSubToolColorPicker": `width: 212px; position: absolute; top: 0px; transform: scale(.9); opacity: 0; transition: .5s; pointer-events: none; touch-action: none`,
    ".eSubToolColorPickerTop": `position: relative; display: flex; box-sizing: border-box; width: 100%; height: 50px; padding: 10px`,
    ".eSubToolColorPickerTopSelected": `width: 30px; height: 30px; border-radius: 10px`,
    ".eSubToolColorPickerEyedroper": `width: 30px; height: 30px; padding: 0px; margin: 0 13px 0 6px; border-radius: 10px`,
    ".eSubToolColorPickerEyedroper img": `width: 100%; height: 100%`,
    ".eSubToolColorPickerEyedroper:hover": `background: var(--hover)`,
    ".eSubToolColorPickerEyedroper:active": `transform: scale(.95)`,
    ".eSubToolColorPickerTopBack": `position: relative; width: 22px; height: 22px; margin: 3px 3px 3px auto; --borderWidth: 3px; --borderRadius: 11px`,
    ".eSubToolColorPickerTopBack img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".eSubToolColorPickerShade": `position: relative; width: calc(100% - 20px); height: 102px; margin: 0px 10px 10px`,
    ".eSubToolColorPickerShade div": `width: 100%; height: 100%; border-radius: 10px; overflow: hidden`,
    ".eSubToolColorPickerShade canvas": `width: 100%; height: 100%; background: #000`,
    ".eSubToolColorPickerShade button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 3px var(--pageColor); border-radius: 10px; transition: transform .2s`,
    ".eSubToolColorPickerShade button:hover": `transform: scale(1.2) !important`,
    ".eSubToolColorPickerShade button:active": `transform: scale(1.1) !important`,
    ".eSubToolColorPickerGradient": `position: relative; width: calc(100% - 20px); height: 10px; margin: 14px 10px 10px 10px`,
    ".eSubToolColorPickerGradientSlider": `width: 100%; height: 100%; background: -webkit-linear-gradient(left, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0)); border-radius: 5px`,
    ".eSubToolColorPickerGradient button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 3px var(--pageColor); border-radius: 10px; transition: transform .2s`,
    ".eSubToolColorPickerGradient button:hover": `transform: scale(1.2) !important`,
    ".eSubToolColorPickerGradient button:active": `transform: scale(1.1) !important`,
    ".eSubToolColorPickerInput": `display: flex; width: calc(100% - 20px); margin: 14px 10px 10px`,
    ".eSubToolColorPickerInput button": `height: 22px; padding: 3px 6px; margin: 3px; --borderWidth: 3px; --borderRadius: 7px; font-size: 16px; font-weight: 700; color: var(--theme)`,
    ".eSubToolColorPickerInput input": `flex: 1; min-width: 0px; height: 19px; margin-left: 6px; border: solid 3px var(--secondary); outline: none; border-radius: 14px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolColorPickerInput input::placeholder": `color: var(--hover)`
  },
  hslToHex: function (h, s, l) {
    l /= 100;
    let a = s * Math.min(l, 1 - l) / 100;
    let f = n => {
      let k = (n + h / 30) % 12;
      let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    }
    return `${f(0)}${f(8)}${f(4)}`;
  },
  hsvToHex: function (h, s, b) {
    // HSV to HSL
    let x = (200 - s) * b / 100;
    s = x === 0 || x === 200 ? 0 : Math.round(s * b / (x <= 100 ? x : 200 - x));
    let l = Math.round(x / 2);
    // HSL to HEX
    return this.hslToHex(h, s, l);
  },
  hexToRGB: function (hex) {
    if (hex.length < 4) {
      hex = hex.split("").map((hexVal) => { return hexVal + hexVal }).join("");
    }
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
  },
  hexToHSL: function (hex) {
    let [r, g, b] = this.hexToRGB(hex);

    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [Math.round(360 * h), Math.round(s * 100), Math.round(l * 100)];
  },
  hexToHSV: function (hex) {
    // HEX to HSL
    let [h, s, l] = this.hexToHSL(hex);
    // HSL to HSV
    let x = s * (l < 50 ? l : 100 - l);
    b = l + (x / 100);
    return [h, l === 0 ? s : 2 * x / b, l + (x / 100)];
  },
  rgbToHex: function (r, g, b) {
    return (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  },
  setPreferenceTool: function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let isModify = extra != null && selectKeys.length > 0;
    let updatePref = isModify == false || selectKeys.length == 1;
    if (isModify != true) {
      this.preferenceTool = {};
    } else {
      this.setPreferenceTool(editor);
    }
    let preferences = editor.preferences.tools;
    if (preferences[toolID] == null) {
      return;
    }
    let toolPref = preferences[toolID];
    let selectedColor = toolPref.color.selected;
    if (this.preferenceTool.c != null) {
      selectedColor = this.preferenceTool.c;
    }

    let colorButtons = frame.querySelector(".eSubToolColorSelector").children;
    let selected = false;
    let runColorSelections = () => {
      selected = false;
      this.setPreferenceTool(editor);
      for (let i = 0; i < toolPref.color.options.length; i++) {
        let button = colorButtons[i];
        let setColor = toolPref.color.options[i];
        button.setAttribute("int", i);
        button.querySelector(".eSubToolColor").style.background = editor.hexToRGB(setColor, toolPref.opacity / 100);
        let isSelected = false;
        if (isModify == false) {
          isSelected = setColor == toolPref.color.selected;
        } else {
          isSelected = setColor == this.preferenceTool.c;
        }
        if (isSelected || (i > toolPref.color.options.length - 2 && selected == false)) {
          button.setAttribute("selected", "");
          selected = true;
        } else {
          button.removeAttribute("selected", "");
        }
      }
    }
    runColorSelections();

    let selector = frame.querySelector(".eSubToolColorSelector");
    let picker = frame.querySelector(".eSubToolColorPicker");
    let [h, s, v] = [];
    selector.addEventListener("click", async (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      element = element.closest(".eTool");
      if (element == null) {
        return;
      }
      if (element.hasAttribute("int") == true) {
        let setColor = toolPref.color.options[parseInt(element.getAttribute("int"))];
        if (updatePref) {
          toolPref.color.selected = setColor;
        }
        selectedColor = setColor;
        if (isModify == false) {
          editor.toolbar.closeSubSubtoolUI();
        } else {
          await extra.saveSelecting({ c: setColor });
          utils.forceShort(); // Make sure other users see the color change (no mouse movement)
          extra.updateToolActions(extra.frame);
          runColorSelections();
        }
        editor.toolbar.updateToolbar(isModify);
      } else if (element.hasAttribute("enablepicker") == true) {
        //if (updatePref) {
        //  selectedColor = toolPref.color.selected;
        //}
        [h, s, v] = this.hexToHSV(selectedColor);
        updatePickerUI();
        picker.style.position = "relative";
        selector.style.position = "absolute";
        picker.style.transform = "scale(1)";
        selector.style.transform = "scale(.9)";
        picker.style.opacity = 1;
        selector.style.opacity = 0;
        picker.style.pointerEvents = "all";
        if (isModify == false) {
          editor.updateSubtoolUI();
        } else {
          extra.updateActionUI();
        }
      }
    });

    frame.querySelector(".eSubToolColorPickerTopBack").addEventListener("click", async () => {
      selector.style.position = "relative";
      picker.style.position = "absolute";
      selector.style.transform = "scale(1)";
      picker.style.transform = "scale(.9)";
      selector.style.opacity = 1;
      picker.style.opacity = 0;
      selector.style.pointerEvents = "all";
      picker.style.pointerEvents = "none";
      if (isModify == false) {
        editor.updateSubtoolUI();
      } else {
        extra.updateActionUI();
      }
    });

    // CUSTOM COLOR PICKER:
    let colorShowBox = frame.querySelector(".eSubToolColorPickerTopSelected");
    let colorSliderHolder = frame.querySelector(".eSubToolColorPickerGradient");
    let colorPointer = colorSliderHolder.querySelector("button");
    let shadeSliderHolder = frame.querySelector(".eSubToolColorPickerShade");
    let canvas = shadeSliderHolder.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let shadePointer = shadeSliderHolder.querySelector("button");
    let modeButton = frame.querySelector(".eSubToolColorPickerInput button");
    let modeInput = frame.querySelector(".eSubToolColorPickerInput input");
    let colorGradientEnabled = false;
    let colorSliderEnabled = false;
    let modes = ["HEX", "RGB", "HSL", "HSB"];
    modeButton.addEventListener("click", () => {
      editor.preferences.tools.options.colorpicker.scale++;
      if (editor.preferences.tools.options.colorpicker.scale > modes.length - 1) {
        editor.preferences.tools.options.colorpicker.scale = 0;
      }
      modeButton.textContent = modes[editor.preferences.tools.options.colorpicker.scale];
      editor.savePreferences();
      updatePickerUI();
    });
    modeButton.textContent = modes[editor.preferences.tools.options.colorpicker.scale];
    modeInput.addEventListener("input", () => {
      switch (modes[editor.preferences.tools.options.colorpicker.scale]) {
        case "HEX":
          modeInput.value = modeInput.value.replace(/[^0-9a-z]/gi, "");
          if ((/^([0-9a-f]{3}){1,2}$/i).test(modeInput.value) == true) {
            updateStoredValues(modeInput.value);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "RGB":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let rgbVals = modeInput.value.match(/\d+/g);
          if (rgbVals[0] >= 0 && rgbVals[0] <= 255 && rgbVals[1] >= 0 && rgbVals[1] <= 255 && rgbVals[2] >= 0 && rgbVals[2] <= 255) {
            updateStoredValues(this.rgbToHex(rgbVals[0], rgbVals[1], rgbVals[2]));
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "HSL":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let hslVals = modeInput.value.match(/\d+/g);
          if (hslVals[0] >= 0 && hslVals[0] <= 360 && hslVals[1] >= 0 && hslVals[1] <= 100 && hslVals[2] >= 0 && hslVals[2] <= 100) {
            updateStoredValues(this.hslToHex(hslVals[0], hslVals[1], hslVals[2]));
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "HSB":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let hsvVals = modeInput.value.match(/\d+/g);
          if (hsvVals[0] >= 0 && hsvVals[0] <= 360 && hsvVals[1] >= 0 && hsvVals[1] <= 100 && hsvVals[2] >= 0 && hsvVals[2] <= 100) {
            updateStoredValues(this.hsvToHex(hsvVals[0], hsvVals[1], hsvVals[2]));
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
      }
    });
    let updatePickerUI = () => {
      // Update Colors Shown:
      let hue = "#" + this.hsvToHex(h, 100, 100);
      colorShowBox.style.background = "#" + selectedColor;
      shadePointer.style.background = "#" + selectedColor;
      colorPointer.style.background = hue;
      // Update Pointer Positions:
      shadePointer.style.left = (shadeSliderHolder.offsetWidth * (s / 100)) - 10 + "px";
      shadePointer.style.top = (shadeSliderHolder.offsetHeight - (shadeSliderHolder.offsetHeight * (v / 100))) - 10 + "px";
      colorPointer.style.left = (colorSliderHolder.offsetWidth * (h / 360)) - 10 + "px";
      // Update Gradient:
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let colorscale = ctx.createLinearGradient(0, 0, canvas.width, 0);
      colorscale.addColorStop(0, "white");
      colorscale.addColorStop(1, hue);
      ctx.fillStyle = colorscale;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let grayscale = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grayscale.addColorStop(0, "rgba(0, 0, 0, 0)");
      grayscale.addColorStop(1, "black");
      ctx.fillStyle = grayscale;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Update Input:
      switch (modes[editor.preferences.tools.options.colorpicker.scale]) {
        case "HEX":
          modeInput.value = selectedColor.toUpperCase();
          break;
        case "RGB":
          let rgbVal = this.hexToRGB(selectedColor);
          modeInput.value = rgbVal[0] + ", " + rgbVal[1] + ", " + rgbVal[2];
          break;
        case "HSL":
          let hslVal = this.hexToHSL(selectedColor);
          modeInput.value = hslVal[0] + ", " + hslVal[1] + ", " + hslVal[2];
          break;
        case "HSB":
          let hsbVal = this.hexToHSV(selectedColor);
          modeInput.value = Math.floor(hsbVal[0]) + ", " + Math.floor(hsbVal[1]) + ", " + Math.floor(hsbVal[2]);
      }
      modeInput.placeholder = modeInput.value;
      modeInput.style.borderColor = "var(--secondary)";
      // Update Toolbar Colors:
      editor.toolbar.updateToolbar(isModify);
    }
    let updateStoredValues = async (hex) => {
      selectedColor = hex || this.hsvToHex(h, s, v);
      runColorSelections();
      let selectedButton = selector.querySelector('.eTool[selected]');
      let int = parseInt(selectedButton.getAttribute("int"));
      if (int == null || int < 0 || int > 6) {
        return;
      }
      toolPref.color.options[int] = selectedColor;
      selectedButton.querySelector(".eSubToolColor").style.background = editor.hexToRGB(selectedColor, toolPref.opacity / 100);
      if (hex != null) {
        [h, s, v] = this.hexToHSV(selectedColor);
      }
      if (updatePref) {
        toolPref.color.selected = selectedColor;
      }
      updatePickerUI();
      if (isModify == true) {
        await extra.saveSelecting({ c: selectedColor });
        extra.updateToolActions(extra.frame);
      }
    }
    let eventGradientUpdate = (event) => {
      if (colorGradientEnabled == false) {
        return;
      }
      if (mouseDown() == false || event.target.closest(".eSubToolColorPicker") == null) {
        app.style.userSelect = "unset";
        colorGradientEnabled = false;
        return;
      }
      let barRect = shadeSliderHolder.getBoundingClientRect();
      s = Math.ceil(Math.max(Math.min((clientPosition(event, "x") - barRect.x - 2) / shadeSliderHolder.offsetWidth, 1), 0) * 100);
      v = Math.ceil(Math.max(Math.min((shadeSliderHolder.offsetHeight - (clientPosition(event, "y") - barRect.y + 2)) / shadeSliderHolder.offsetHeight, 1), 0) * 100);
      updateStoredValues();
    }
    let gradientDown = (event) => {
      editor.events.mouseMove = eventGradientUpdate;
      colorGradientEnabled = true;
      app.style.userSelect = "none";
      eventGradientUpdate(event);
    }
    shadeSliderHolder.addEventListener("mousedown", gradientDown);
    shadeSliderHolder.addEventListener("touchstart", (e) => {
      screenPressed = true;
      gradientDown(e);
    }, { passive: true });
    let eventColorUpdate = (event) => {
      if (colorSliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || event.target.closest(".eSubToolColorPicker") == null) {
        app.style.userSelect = "unset";
        colorSliderEnabled = false;
        return;
      }
      let barRect = colorSliderHolder.getBoundingClientRect();
      h = Math.ceil(Math.max(Math.min(((event.clientX || event.changedTouches[0].clientX) - barRect.x) / colorSliderHolder.offsetWidth, 1), 0) * 360);
      updateStoredValues();
    }
    let colorSliderDown = (event) => {
      editor.events.mouseMove = eventColorUpdate;
      colorSliderEnabled = true;
      app.style.userSelect = "none";
      eventColorUpdate(event);
    }
    colorSliderHolder.addEventListener("mousedown", colorSliderDown);
    colorSliderHolder.addEventListener("touchstart", (e) => {
      screenPressed = true;
      colorSliderDown(e);
    }, { passive: true });
    editor.events.mouseMove = null;
    let eyeDropper = frame.querySelector(".eSubToolColorPickerEyedroper");
    if (window.EyeDropper == null) {
      eyeDropper.style.display = "none";
    }
    eyeDropper.addEventListener("click", () => {
      (new EyeDropper())
        .open()
        .then((result) => {
          updateStoredValues(result.sRGBHex.substring(1));
        })
        .catch(() => { });
    });

    editor.toolbar.updateToolbar(isModify);
  }
};
modules["pages/editor/toolbar/thickness"] = {
  button: `<div class="eSubToolThicknessButtonHolder"><div class="eSubToolThickness" thickness picked></div></div>`,
  tooltip: "Thickness",
  setButton: function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
    let tip = button.querySelector(".eSubToolThickness");
    tip.style.width = preferenceTool.t + "px";
    tip.style.background = editor.hexToRGB(preferenceTool.c, (preferenceTool.o || 0) / 100);
  },
  html: `
    <div class="eSubToolThicknessHolder">
      <input class="eSubToolThicknessInput" name="Thickness">
      <div class="eSubToolThicknessSlider"><button></button></div>
    </div>
  `,
  css: {
    ".eSubToolThicknessButtonHolder": `display: flex; background: #fff; padding: 3px; transform: translateX(-12px); border-radius: 12px`,
    ".eSubToolThickness": `width: 60px; height: 16px; background: var(--darkGray); border-radius: 9.5px`,
    ".eSelectBar .eSubToolThicknessButtonHolder": `transform: translateY(12px) !important`,
    ".eSelectBar .eSubToolThickness": `height: 60px !important; width: 16px`,

    ".eSubToolThicknessHolder": `box-sizing: border-box; display: flex; width: 212px; height: 50px; padding: 6px; align-items: center`,
    ".eSubToolThicknessInput": `width: 40px; height: 26px; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 20px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolThicknessInput::placeholder": `color: var(--hover)`,
    ".eSubToolThicknessSlider": `position: relative; flex: 1; height: 10px; margin: 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolThicknessSlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolThicknessSlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolThicknessSlider button:active": `transform: scale(1.1) !important`
  },
  setPreferenceTool: function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
  },
  minValue: 1,
  maxValue: 50,
  exponentFactor: 1.4,
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let cursorModule = await getModule("pages/editor/toolbar/cursor");
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    this.setPreferenceTool(editor);
    let isModify = selectKeys.length > 0;
    let updatePref = isModify == false || selectKeys.length == 1;
    let preferences = editor.preferences.tools;
    if (preferences[toolID] == null) {
      return;
    }
    let toolPref = preferences[toolID];
    let selectedThickness = toolPref.thickness;
    if (isModify) {
      selectedThickness = this.preferenceTool.t;
    }

    let slider = frame.querySelector(".eSubToolThicknessSlider");
    let pointer = slider.querySelector("button");
    let input = frame.querySelector(".eSubToolThicknessInput");
    let sliderEnabled = false;
    let updateUI = async (updateVal, noPref) => {
      if (updatePref && noPref != true) {
        toolPref.thickness = selectedThickness;
      }
      let percentage = Math.pow(((selectedThickness - this.minValue) / (this.maxValue - this.minValue)), 1 / this.exponentFactor);
      pointer.style.left = ((slider.offsetWidth - 10) * percentage) - 6 + "px";
      //pointer.style.left = ((slider.offsetWidth - 10) * ((selectedThickness - this.minValue) / (this.maxValue - this.minValue))) - 6 + "px";
      if (updateVal != false) {
        input.value = selectedThickness;
      }
      if (isModify == false) {
        editor.toolbar.updateToolbar(isModify);
      } else if (updateVal != null || noPref != true) {
        await extra.saveSelecting({ t: selectedThickness });
        cursorModule.updateBox();
        extra.updateToolActions(extra.frame);
      }
    }
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || event.target.closest(".eSubToolThicknessHolder") == null) {
        app.style.userSelect = "unset";
        sliderEnabled = false;
        return;
      }
      let barRect = slider.getBoundingClientRect();
      selectedThickness = Math.ceil(Math.pow((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0)), this.exponentFactor) * (this.maxValue - this.minValue) + this.minValue);
      //Math.ceil((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0) * (this.maxValue - this.minValue)) + this.minValue);
      updateUI();
    }
    editor.events.mouseMove = eventBarUpdate;
    let enableSlider = (event) => {
      sliderEnabled = true;
      app.style.userSelect = "none";
      eventBarUpdate(event);
    }
    slider.addEventListener("mousedown", enableSlider);
    slider.addEventListener("touchstart", (e) => {
      screenPressed = true;
      enableSlider(e);
    }, { passive: true });
    input.addEventListener("focus", () => {
      input.value = "";
      input.placeholder = selectedThickness;
    });
    input.addEventListener("blur", () => {
      input.value = selectedThickness;
    });
    input.addEventListener("input", () => {
      selectedThickness = Math.max(Math.min(input.value, this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      selectedThickness = Math.max(Math.min(input.value, this.maxValue), this.minValue);
      updateUI();
    });
    updateUI(null, true);
  }
};
modules["pages/editor/toolbar/opacity"] = {
  button: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_138_110" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_138_110)"> <circle cx="143.851" cy="143.354" r="65.7026" transform="rotate(-45 143.851 143.354)" stroke="white" stroke-width="24"/> <mask id="path-3-outside-1_138_110" maskUnits="userSpaceOnUse" x="24" y="24" width="133" height="134" fill="black"> <rect fill="white" x="24" y="24" width="133" height="134"/> <path d="M142.557 77.5985C140.342 68.2142 135.656 59.594 128.984 52.6332C122.312 45.6725 113.897 40.6251 104.615 38.0155C95.3332 35.4058 85.5216 35.3291 76.1998 37.7932C66.878 40.2573 58.3859 45.1724 51.6058 52.0279C44.8256 58.8834 40.0047 67.4292 37.6438 76.7777C35.2829 86.1262 35.4681 95.9364 38.1802 105.189C40.8923 114.442 46.0324 122.8 53.0664 129.394C60.1005 135.989 68.772 140.58 78.1802 142.691L90 90L142.557 77.5985Z"/> </mask> <path d="M142.557 77.5985C140.342 68.2142 135.656 59.594 128.984 52.6332C122.312 45.6725 113.897 40.6251 104.615 38.0155C95.3332 35.4058 85.5216 35.3291 76.1998 37.7932C66.878 40.2573 58.3859 45.1724 51.6058 52.0279C44.8256 58.8834 40.0047 67.4292 37.6438 76.7777C35.2829 86.1262 35.4681 95.9364 38.1802 105.189C40.8923 114.442 46.0324 122.8 53.0664 129.394C60.1005 135.989 68.772 140.58 78.1802 142.691L90 90L142.557 77.5985Z" fill="white"/> <path d="M142.557 77.5985C140.342 68.2142 135.656 59.594 128.984 52.6332C122.312 45.6725 113.897 40.6251 104.615 38.0155C95.3332 35.4058 85.5216 35.3291 76.1998 37.7932C66.878 40.2573 58.3859 45.1724 51.6058 52.0279C44.8256 58.8834 40.0047 67.4292 37.6438 76.7777C35.2829 86.1262 35.4681 95.9364 38.1802 105.189C40.8923 114.442 46.0324 122.8 53.0664 129.394C60.1005 135.989 68.772 140.58 78.1802 142.691L90 90L142.557 77.5985Z" stroke="white" stroke-width="24" mask="url(#path-3-outside-1_138_110)"/> <circle cx="143.851" cy="143.354" r="53.7026" transform="rotate(-45 143.851 143.354)" fill="white"/> <path opacity fill-rule="evenodd" clip-rule="evenodd" d="M100.45 142.99L153.625 196.165C161.903 194.641 169.892 191.162 176.85 185.729L123.487 132.366C116.884 137.592 109.031 141.307 100.45 142.99ZM132.016 123.924L185.434 177.343C190.985 170.568 194.629 162.754 196.366 154.614L142.857 101.104C141.077 109.62 137.291 117.399 132.016 123.924ZM181.824 105.381C191.106 114.662 196.279 126.496 197.346 138.623L148.583 89.8595C160.709 90.9258 172.543 96.0996 181.824 105.381ZM137.126 196.637L90.5683 150.079C92.002 161.504 97.105 172.556 105.877 181.328C114.65 190.1 125.702 195.203 137.126 196.637ZM90 36C115.579 36 137.005 53.7851 142.585 77.664C159.819 77.3339 177.158 83.7445 190.309 96.8957C215.968 122.554 215.968 164.155 190.309 189.813C164.651 215.472 123.05 215.472 97.392 189.813C84.3953 176.817 77.9818 159.73 78.1514 142.696C54.0275 137.295 36 115.753 36 90C36 60.1766 60.1766 36 90 36Z" fill="#2F2F2F"/> </g> </svg>`,
  tooltip: "Opacity",
  setButton: function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
    button.querySelector("[opacity]").setAttribute("fill", editor.hexToRGB(preferenceTool.c, (preferenceTool.o || 0) / 100));
  },
  html: `
    <div class="eSubToolOpacityHolder">
      <input class="eSubToolOpacityInput" name="Thickness">
      <div class="eSubToolOpacitySlider"><button></button></div>
    </div>
  `,
  css: {
    ".eSubToolOpacityHolder": `box-sizing: border-box; display: flex; width: 212px; height: 50px; padding: 6px; align-items: center`,
    ".eSubToolOpacityInput": `width: 40px; height: 26px; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 20px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolOpacitySlider": `position: relative; flex: 1; height: 10px; margin: 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolOpacitySlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolOpacitySlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolOpacitySlider button:active": `transform: scale(1.1) !important`
  },
  setPreferenceTool: function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
  },
  minValue: 10,
  maxValue: 100,
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    this.setPreferenceTool(editor);
    let isModify = selectKeys.length > 0;
    let updatePref = isModify == false || selectKeys.length == 1;
    let preferences = editor.preferences.tools;
    if (preferences[toolID] == null) {
      return;
    }
    let toolPref = preferences[toolID];
    let selectedOpacity = toolPref.opacity;
    if (isModify) {
      selectedOpacity = this.preferenceTool.o;
    }

    let slider = frame.querySelector(".eSubToolOpacitySlider");
    let pointer = slider.querySelector("button");
    let input = frame.querySelector(".eSubToolOpacityInput");
    let sliderEnabled = false;
    let updateUI = async (updateVal, noPref) => {
      if (updatePref && noPref != true) {
        toolPref.opacity = selectedOpacity;
      }
      let percentage = (selectedOpacity - this.minValue) / (this.maxValue - this.minValue);
      pointer.style.left = ((slider.offsetWidth - 10) * percentage) - 6 + "px";
      if (updateVal != false) {
        input.value = selectedOpacity;
      }
      if (isModify == true && (updateVal != null || noPref != true)) {
        await extra.saveSelecting({ o: selectedOpacity });
        extra.updateToolActions(extra.frame);
      }
      editor.toolbar.updateToolbar(isModify);
    }
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || event.target.closest(".eSubToolOpacityHolder") == null) {
        app.style.userSelect = "unset";
        sliderEnabled = false;
        return;
      }
      let barRect = slider.getBoundingClientRect();
      selectedOpacity = Math.ceil((Math.max(Math.min(((event.clientX || event.changedTouches[0].clientX) - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0) * (this.maxValue - this.minValue)) + this.minValue);
      updateUI();
    }
    editor.events.mouseMove = eventBarUpdate;
    let enableSlider = (event) => {
      sliderEnabled = true;
      app.style.userSelect = "none";
      eventBarUpdate(event);
    }
    slider.addEventListener("mousedown", enableSlider);
    slider.addEventListener("touchstart", (e) => {
      screenPressed = true;
      enableSlider(e);
    }, { passive: true });
    input.addEventListener("focus", () => {
      input.value = "";
      input.placeholder = selectedOpacity;
    });
    input.addEventListener("blur", () => {
      input.value = selectedOpacity;
    });
    input.addEventListener("input", () => {
      selectedOpacity = Math.max(Math.min(input.value, this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      selectedOpacity = Math.max(Math.min(input.value, this.maxValue), this.minValue);
      updateUI();
    });
    updateUI(null, true);
  }
};

modules["pages/editor/toolbar/style"] = {
  button: `<div class="eSubToolStyleHolder"><div class="eSubToolStyle"></div></div>`,
  tooltip: "Styling",
  setButton: function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
    let buttonElem = button.querySelector(".eSubToolStyle");
    let color = editor.hexToRGB(preferenceTool.c, (preferenceTool.o || 0) / 100);
    let prefI = preferenceTool.i;
    let prefB = preferenceTool.b;
    if (preferenceTool.d == "line") {
      prefI = false;
      if (prefB == "none") {
        prefB = "solid";
      }
    }
    if (prefB != "none") {
      if (prefI != true) {
        buttonElem.style.border = (prefB || "solid") + " 4px " + color; //var(--darkGray)
        buttonElem.style.removeProperty("background");
      } else {
        buttonElem.style.border = (prefB || "solid") + " 4px " + editor.hexToRGB(editor.darkenHex(preferenceTool.c, 20), (preferenceTool.o || 0) / 100);
        buttonElem.style.background = color;
      }
    } else {
      buttonElem.style.background = color;
      buttonElem.style.removeProperty("border");
    }
  },
  html: `
    <div class="eSubToolStyleContainer">
      <button class="eTool" tooltip="Filled" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" fill></div></div></div></button>
      <div class="eVerticalDivider" styles keeptooltip></div>
      <button class="eTool" tooltip="Solid Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" solid></div></div></div></button>
      <button class="eTool" tooltip="Dashed Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" dashed></div></div></div></button>
      <button class="eTool" tooltip="No Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" none></div></div></div></button>
    </div>
  `,
  css: {
    ".eSubToolStyleHolder": `display: flex; width: 32px; height: 32px; background: #fff; border: solid 3px var(--pageColor); border-radius: 11px; justify-content: center; align-items: center`,
    ".eSubToolStyle": `box-sizing: border-box; width: 100%; height: 100%; border-radius: 8px`,

    ".eSubToolStyleContainer": `display: flex; width: 100%; height: 50px; gap: 6px; overflow: auto; border-radius: inherit`,
    ".eSubToolStyleContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolStyleContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolStyleContainer .eTool[selected] > div": `background: var(--theme) !important`
  },
  setPreferenceTool: function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    this.setPreferenceTool(editor);
    let selectedI = this.preferenceTool.i;
    let selectedB = this.preferenceTool.b;

    let fill = frame.querySelector(".eSubToolStyle[fill]");
    let solid = frame.querySelector(".eSubToolStyle[solid]");
    let dashed = frame.querySelector(".eSubToolStyle[dashed]");
    let none = frame.querySelector(".eSubToolStyle[none]");

    let fillButton = fill.closest(".eTool");
    let solidButton = solid.closest(".eTool");
    let dashedButton = dashed.closest(".eTool");
    let noneButton = none.closest(".eTool");

    if (this.preferenceTool.d == "line") {
      fillButton.style.display = "none";
      frame.querySelector(".eVerticalDivider[styles]").style.display = "none";
      noneButton.style.display = "none";
      selectedI = false;
      if (selectedB == "none") {
        selectedB = "solid";
      }
    }

    // i - INSIDE COLOR
    // b - BORDER
    let updateButtons = () => {
      fillButton.removeAttribute("selected");
      solidButton.removeAttribute("selected");
      dashedButton.removeAttribute("selected");
      noneButton.removeAttribute("selected");

      if (selectedB != "none") {
        if (selectedI != true) {
          if ((selectedB || "solid") == "solid") {
            solidButton.setAttribute("selected", "");
          } else {
            dashedButton.setAttribute("selected", "");
          }
        } else {
          fillButton.setAttribute("selected", "");
          if ((selectedB || "solid") == "solid") {
            solidButton.setAttribute("selected", "");
          } else {
            dashedButton.setAttribute("selected", "");
          }
        }
      } else {
        fillButton.setAttribute("selected", "");
        noneButton.setAttribute("selected", "");
      }

      let color = editor.hexToRGB(this.preferenceTool.c, (this.preferenceTool.o || 0) / 100);
      let borderColor = color;
      if (selectedI == true || selectedB == "none") {
        borderColor = editor.hexToRGB(editor.darkenHex(this.preferenceTool.c, 20), (this.preferenceTool.o || 0) / 100);
      }

      fill.style.background = color;
      solid.style.border = "solid 4px " + borderColor;
      dashed.style.border = "dashed 4px " + borderColor;
      none.style.border = "solid 4px #fff";
      none.style.background = color;
      none.parentElement.style.border = "solid 4px " + color;
    }
    updateButtons();

    fillButton.addEventListener("click", async () => {
      if (selectedI != true) {
        selectedI = true;
      } else {
        selectedI = false;
      }
      await extra.saveSelecting({ i: selectedI }, true);
      extra.updateToolActions(extra.frame);
      updateButtons();
    });
    solidButton.addEventListener("click", async () => {
      selectedB = "solid";
      await extra.saveSelecting({ b: selectedB }, true);
      extra.updateToolActions(extra.frame);
      updateButtons();
    });
    dashedButton.addEventListener("click", async () => {
      selectedB = "dashed";
      await extra.saveSelecting({ b: selectedB }, true);
      extra.updateToolActions(extra.frame);
      updateButtons();
    });
    noneButton.addEventListener("click", async () => {
      selectedB = "none";
      await extra.saveSelecting({ b: selectedB }, true);
      await extra.saveSelecting({ b: selectedB }, true);
      extra.updateToolActions(extra.frame);
      updateButtons();
    });
  }
};

modules["pages/editor/toolbar/duplicate"] = {
  button: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_673_41" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_673_41)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M73 65H133C137.418 65 141 68.5817 141 73V94H153V73C153 61.9543 144.046 53 133 53H73C61.9543 53 53 61.9543 53 73V133C53 144.046 61.9543 153 73 153H94V141H73C68.5817 141 65 137.418 65 133V73C65 68.5817 68.5817 65 73 65Z" fill="white"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M133 21H73C44.2812 21 21 44.2812 21 73V133C21 161.719 44.2812 185 73 185H94V153H73C61.9543 153 53 144.046 53 133V73C53 61.9543 61.9543 53 73 53H133C144.046 53 153 61.9543 153 73V94H185V73C185 44.2812 161.719 21 133 21Z" fill="white"/> <rect x="87" y="87" width="132" height="132" rx="36" stroke="white" stroke-width="32"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M133 33H73C50.9086 33 33 50.9086 33 73V133C33 155.091 50.9086 173 73 173H94V153H73C61.9543 153 53 144.046 53 133V73C53 61.9543 61.9543 53 73 53H133C144.046 53 153 61.9543 153 73V94H173V73C173 50.9086 155.091 33 133 33Z" fill="#2F2F2F"/> <rect x="109" y="109" width="88" height="88" rx="14" stroke="white" stroke-width="12"/> <path d="M125 153H182" stroke="white" stroke-width="30" stroke-linecap="round"/> <path d="M153 181L153 124" stroke="white" stroke-width="30" stroke-linecap="round"/> <path d="M125 153H182" stroke="#2F2F2F" stroke-width="15" stroke-linecap="round"/> <path d="M153 181L153 124" stroke="#2F2F2F" stroke-width="15" stroke-linecap="round"/> <rect x="93" y="93" width="120" height="120" rx="30" stroke="#2F2F2F" stroke-width="20"/> </g> </svg>`,
  tooltip: "Duplicate",
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    let cursor = await getModule("pages/editor/toolbar/cursor");
    let selectKeys = Object.keys(editor.selecting);

    let newSelect = {};
    let newNewSelect = {};
    let setTempSync = getEpoch();
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      let tempID = utils.tempID();
      let newAnno = JSON.parse(JSON.stringify(({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {}));
      newAnno._id = tempID;
      newAnno.p = newAnno.p || [0, 0];
      newAnno.p[0] += 50;
      newAnno.p[1] += 50;
      newAnno.sync = setTempSync;
      delete newAnno.m;
      await utils.render(newAnno);
      editor.annotations[tempID] = { render: newAnno };
      newSelect[tempID] = newAnno;
      newNewSelect[tempID] = {};
      //await utils.save(newAnno);
    }

    editor.selecting = newSelect;

    cursor.action = "save";
    await cursor.endAction();

    editor.selecting = newNewSelect;

    cursor.updateBox();

    //utils.forceShort();
  }
};
modules["pages/editor/toolbar/delete"] = {
  button: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_673_23" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_673_23)"> <path d="M170.895 45H85.3463C67.613 45 53.7495 60.2992 55.4914 77.9467L65.9071 183.474C67.4224 198.827 80.3347 210.528 95.762 210.528H160.479C175.906 210.528 188.819 198.827 190.334 183.474L200.75 77.9467C202.492 60.2992 188.628 45 170.895 45Z" fill="white" stroke="white" stroke-width="34"/> <path d="M128.811 171.731L128.811 83.0442" stroke="#2F2F2F" stroke-width="14" stroke-linecap="round"/> <path d="M100.615 172.88L95.0507 83.8926" stroke="#2F2F2F" stroke-width="14" stroke-linecap="round"/> <path d="M156.256 172.88L161.82 83.8926" stroke="#2F2F2F" stroke-width="14" stroke-linecap="round"/> <path d="M170.895 51H85.3463C71.1597 51 60.0689 63.2393 61.4623 77.3574L71.8781 182.885C73.0903 195.167 83.4201 204.528 95.762 204.528H160.479C172.821 204.528 183.151 195.167 184.363 182.885L194.779 77.3574C196.172 63.2394 185.082 51 170.895 51Z" stroke="#2F2F2F" stroke-width="22"/> </g> </svg>`,
  tooltip: "Delete",
  css: {
    '.eTool[action="pages/editor/toolbar/delete"]': `--hoverColor: var(--error); --hoverTooltip: var(--error)`
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    let cursor = await getModule("pages/editor/toolbar/cursor");
    await extra.saveSelecting({ remove: true });
    let selectKeys = Object.keys(editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      editor.selecting[selectKeys[i]].remove = true;
      editor.selecting[selectKeys[i]].done = true;

      let allSelections = [...editor.page.querySelectorAll('.eSelect[anno="' + selectKeys[i] + '"]'), ...editor.page.querySelectorAll('.eSelectActive[anno="' + selectKeys[i] + '"]'), ...editor.page.querySelectorAll('.eCollabSelect[anno="' + selectKeys[i] + '"]')];
      for (let i = 0; i < allSelections.length; i++) {
        allSelections[i].remove();
      }
    }
    await utils.forceShort();
    editor.selecting = {};
    cursor.updateBox();
  }
};

modules["pages/editor/toolbar/collaborator"] = {
  button: `<img class="eSubToolCollaborator" src="./images/profiles/default.svg">`,
  divideBefore: true,
  setButton: async function (editor, button) {
    button.setAttribute("disabled", "");
    let selectKeys = Object.keys(editor.selecting);
    //let buttonElem = button.querySelector(".eSubToolStyle");
    // Loop through to see if collaborator option should be shown
    let modifiedBy;
    for (let i = 0; i < selectKeys.length; i++) {
      let annotation = editor.annotations[selectKeys[i]];
      let setModifiedBy = (annotation.render || {}).m || (annotation.revert || {}).m;
      if (setModifiedBy == null || setModifiedBy.startsWith("temp_") == true || (modifiedBy != null && setModifiedBy != modifiedBy)) {
        button.style.display = "none";
        return;
      }
      modifiedBy = setModifiedBy;
    }
    let modifyID = modifiedBy.substring(5);
    if (modifyID == editor.sessionID || modifyID == userID) {
      button.style.display = "none";
      return;
    }
    let collaborator = editor.collaborators[modifyID];
    if (collaborator == null) { // Fetch to get the collaborator
      let [code, body] = await sendRequest("GET", "lessons/members/collaborator?userid=" + modifyID, null, { session: editor.session });
      if (code == 200) {
        editor.collaborators[body._id] = body;
        collaborator = editor.collaborators[body._id];
      } else {
        return;
      }
    }
    button.setAttribute("userid", collaborator._id);
    button.setAttribute("tooltip", collaborator.user);
    button.querySelector(".eSubToolCollaborator").src = collaborator.image || "./images/profiles/default.svg";
    button.removeAttribute("disabled");
    if (button.style.display != "unset") {
      button.style.display = "unset";
      editor.updateZoom();
    }
  },
  html: `
  <div class="eSubToolCollaboratorHolder">
    <img class="eSubToolCollaboratorPicture">
    <div class="eSubToolCollaboratorInfo">
      <div name></div>
      <div email></div>
    </div>
  </div>
  `,
  css: {
    ".eSubToolCollaborator": `width: 32px; height: 32px; padding: 3px; object-fit: cover; background: var(--pageColor); border-radius: 19px`,

    ".eSubToolCollaboratorHolder": `display: flex; flex-wrap: wrap; width: max-content; max-width: var(--uiwidth); padding: 8px; gap: 4px; align-items: center`,
    ".eSubToolCollaboratorPicture": `width: 50px; height: 50px; padding: 3px; margin: 1px; border: solid 4px var(--theme); object-fit: cover; background: var(--pageColor); border-radius: 32px`,
    ".eSubToolCollaboratorInfo": `margin: 4px; text-align: left`,
    ".eSubToolCollaboratorInfo div[name]": `max-width: calc(var(--uiwidth) - 24px); font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolCollaboratorInfo div[email]": `max-width: calc(var(--uiwidth) - 24px); font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    
    let collaboratorID = extra.frame.querySelector('.eTool[action="pages/editor/toolbar/collaborator"]').getAttribute("userid");
    let collaborator = editor.collaborators[collaboratorID];
    if (collaborator == null) {
      return;
    }

    frame.querySelector(".eSubToolCollaboratorPicture").src = collaborator.image || "./images/profiles/default.svg";
    let name = frame.querySelector(".eSubToolCollaboratorInfo div[name]");
    name.textContent = collaborator.user;
    name.title = collaborator.user;
    let email = frame.querySelector(".eSubToolCollaboratorInfo div[email]");
    email.textContent = collaborator.email;
    email.title = collaborator.email;

    frame.querySelector(".eSubToolCollaboratorHolder").style.setProperty("--uiwidth", frame.closest(".eSelectBar").clientWidth + "px");
  }
};

// Textbox Functions
modules["pages/editor/toolbar/textedit"] = {
  button: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_800_56" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_800_56)"> <rect x="111" y="47" width="34" height="162" rx="17" stroke="white" stroke-width="12"/> <path d="M128 211.485L131.536 215.021C134.724 218.209 139.048 220 143.556 220H177C186.389 220 194 212.389 194 203C194 193.611 186.389 186 177 186H128H79C69.6112 186 62 193.611 62 203C62 212.389 69.6112 220 79 220H112.444C116.952 220 121.276 218.209 124.464 215.021L128 211.485Z" stroke="white" stroke-width="12"/> <path d="M128 44.5147L131.536 40.9792C134.724 37.7911 139.048 36 143.556 36H177C186.389 36 194 43.6112 194 53C194 62.3888 186.389 70 177 70H128H79C69.6112 70 62 62.3888 62 53C62 43.6112 69.6112 36 79 36H112.444C116.952 36 121.276 37.7911 124.464 40.9792L128 44.5147Z" stroke="white" stroke-width="12"/> <rect x="117" y="53" width="22" height="150" rx="11" fill="#2F2F2F"/> <path d="M68 203C68 196.925 72.9249 192 79 192H128H177C183.075 192 188 196.925 188 203V203C188 209.075 183.075 214 177 214H143.556C140.639 214 137.841 212.841 135.778 210.778L128 203L120.222 210.778C118.159 212.841 115.361 214 112.444 214H79C72.9249 214 68 209.075 68 203V203Z" fill="#2F2F2F"/> <path d="M68 53C68 59.0751 72.9249 64 79 64H128H177C183.075 64 188 59.0751 188 53V53C188 46.9249 183.075 42 177 42H143.556C140.639 42 137.841 43.1589 135.778 45.2218L128 53L120.222 45.2218C118.159 43.1589 115.361 42 112.444 42H79C72.9249 42 68 46.9249 68 53V53Z" fill="#2F2F2F"/> </g> </svg>`,
  tooltip: "Edit Text",
  divideAfter: true,
  multiSelect: false,
  setButton: function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let annoTx = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"] div[contenteditable]');
    if (annoTx == null) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  },
  pastEvents: [],
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};

    let annoElem = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"]');
    if (annoElem == null) {
      return;
    }
    let annoTx = annoElem.querySelector("div[text]");
    if (annoTx == null) {
      return;
    }

    if (annoTx.hasAttribute("contenteditable") == false) {
      annoTx.setAttribute("contenteditable", "true");
      annoTx.focus();

      if (extra.setCaretPosition != true || document.caretRangeFromPoint == null) {
        if (window.getSelection && document.createRange) {
          range = document.createRange();
          range.selectNodeContents(annoTx);
          sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText(annoTx);
          range.select();
        }
      } else {
        let range = document.caretRangeFromPoint(extra.clientX, extra.clientY);
        let selection = window.getSelection();

        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      annoTx.removeAttribute("contenteditable");
    }

    for (let i = 0; i < this.pastEvents.length; i++) {
      let remEvent = this.pastEvents[i];
      remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
    }
    this.pastEvents = [];

    let saveHistory = false;
    //let lastClock;
    let lastCaret = {};
    let setLastCaret = (position) => {
      if (window.getSelection != null) {
        let textBox = window.getSelection().baseNode.parentElement;
        if (textBox != null) {
          lastCaret[position + "Element"] = textBox;
          lastCaret[position + "Position"] = utils.getCurrentCaretPosition(textBox);
        }
      }
    }
    let inputListener = (event) => {
      selectID = Object.keys(editor.selecting)[0];
      original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};

      let saveObj = { d: {} };
      let addText = [];
      for (let i = 0; i < annoTx.childNodes.length; i++) {
        //addText += annoTx.childNodes[i].textContent + "\n";
        let text = annoTx.childNodes[i].textContent;
        if (text == "") {
          text = "\n";
        }
        addText.push(text);
      }
      editor.selecting[selectID].d = editor.selecting[selectID].d || JSON.parse(JSON.stringify(original.d || {}));
      editor.selecting[selectID].d.b = addText;
      saveObj.d.b = addText;
      /*
      saveObj.s = [];
      if (original.textfit == true) {
        saveObj.s[0] = annoTx.offsetWidth + 6;
      }
      saveObj.s[1] = annoTx.offsetHeight + 6;
      */
      /*
      if (lastClock == null) {
        restartSaveClock();
      }
      */
      if (event != null && [" ", null].includes(event.data) == true) {
        saveHistory = true;
        //setLastCaret("redo");
      }
      extra.saveSelecting(saveObj, true, saveHistory, lastCaret);
      saveHistory = false;
      //utils.forceShort();
    };
    /*
    let restartSaveClock = () => {
      clearTimeout(lastClock);
      lastClock = setTimeout(() => {
        saveHistory = true;
        lastClock = null;
        inputListener();
      }, 5000);
    }
    */
    this.pastEvents.push({ type: "event", parent: annoTx, name: "input", listener: inputListener });
    annoTx.addEventListener("input", inputListener);

    let keyListener = (event) => {
      if (event != null && [" ", "Enter", "Backspace"].includes(event.key) == true) {
        setLastCaret("undo");
      }

      let lastHistory = utils.history[utils.location];
      if (lastHistory != null) {
        lastHistory.caret = lastHistory.caret || {};
        setLastCaret("redo");
        lastHistory.caret.redoElement = lastCaret.redoElement;
        lastHistory.caret.redoPosition = lastCaret.redoPosition;
      }
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "keydown", listener: keyListener });
    annoTx.addEventListener("keydown", keyListener);

    let pasteListener = (event) => {
      // Cancel paste
      event.preventDefault();

      // Insert text manually
      document.execCommand("insertHTML", false, (event.originalEvent || event).clipboardData.getData("text/plain")); //.replace(/\n\n/g, "</br>")
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "paste", listener: pasteListener });
    annoTx.addEventListener("paste", pasteListener);

    extra.updateToolActions(extra.frame);
  }
};

modules["pages/editor/toolbar/fontsize"] = {
  button: `<div class="eSubToolFontSize"></div>`,
  tooltip: "Font Size",
  setButton: function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    let buttonTx = button.querySelector(".eSubToolFontSize");
    buttonTx.textContent = original.d.s || 18;
    buttonTx.style.color = "#" + original.c;
  },
  html: `
    <div class="eSubToolFontSizeContainer">
      <button class="eFontSizeOption" small>Small</button>
      <button class="eFontSizeOption" medium>Medium</button>
      <button class="eFontSizeOption" large>Large</button>
      <div class="eFontSizeLine"></div>
      <div class="eFontSizeInput border"><div class="eFontSizeBox" contenteditable></div></div>
    </div>
  `,
  css: {
    ".eSubToolFontSize": `padding: 2px 8px; background: var(--pageColor); border-radius: 17px; font-size: 24px; font-weight: 700; text-wrap: nowrap`,

    ".eSubToolFontSizeContainer": `display: flex; flex-direction: column; padding: 6px; align-items: center`,
    ".eFontSizeOption": `display: flex; width: 120px; height: 36px; margin-bottom: 4px; border-radius: 10px; justify-content: center; align-items: center; font-weight: 600; transition: .15s`,
    ".eFontSizeOption:hover": `background: var(--secondary); color: #fff`,
    ".eFontSizeOption[selected]": `background: var(--theme) !important; color: #fff`,
    ".eFontSizeOption[small]": `font-size: 14px`,
    ".eFontSizeOption[medium]": `font-size: 18px`,
    ".eFontSizeOption[large]": `font-size: 22px`,
    ".eFontSizeLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".eFontSizeInput": `display: flex; padding: 3px; margin: 8px; --borderWidth: 3px; --borderColor: var(--secondary); justify-content: center; align-items: center; --borderRadius: 15px; color: var(--theme); font-size: 20px; font-weight: 600`,
    ".eFontSizeInput div": `max-width: 50px; min-width: 25px; padding: 0 8px; border: none; outline: none; border-radius: 16px; text-align: center; white-space: nowrap; overflow: hidden`,
  },
  setPreferenceTool: function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    this.setPreferenceTool(editor);
    let selectedS = this.preferenceTool.d.s || 18;

    let preferences = editor.preferences.tools;
    let toolPref = preferences[toolID];

    let smallButton = frame.querySelector(".eFontSizeOption[small]"); // 14px
    let mediumButton = frame.querySelector(".eFontSizeOption[medium]"); // 18px
    let largeButton = frame.querySelector(".eFontSizeOption[large]"); // 26px
    let inputSize = frame.querySelector(".eFontSizeBox"); // Custom

    let updateSizeBox = () => {
      smallButton.removeAttribute("selected");
      mediumButton.removeAttribute("selected");
      largeButton.removeAttribute("selected");

      if (selectedS == 14) {
        smallButton.setAttribute("selected", "");
      } else if (selectedS == 18) {
        mediumButton.setAttribute("selected", "");
      } else if (selectedS == 26) {
        largeButton.setAttribute("selected", "");
      }

      inputSize.textContent = selectedS;
    }
    updateSizeBox();

    let saveSize = async (set) => {
      selectedS = set;
      if (toolPref != null) {
        toolPref.size = selectedS;
        editor.savePreferences();
      }
      await extra.saveSelecting({ d: { s: selectedS } }, true);
      extra.updateToolActions(extra.frame);
      updateSizeBox();
    }

    smallButton.addEventListener("click", () => {
      saveSize(14);
    });
    mediumButton.addEventListener("click", () => {
      saveSize(18);
    });
    largeButton.addEventListener("click", () => {
      saveSize(26);
    });

    inputSize.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (event.keyCode == 13) {
        event.preventDefault();
        saveSize(parseInt(inputSize.textContent));
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > 250) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than 250");
        }
      }
    });
    inputSize.addEventListener("focusout", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (textBox.textContent == "") {
        textBox.textContent = selectedS;
        return;
      }
      let textInt = parseInt(textBox.textContent) || selectedS;
      if (textInt == "") {
        setZoomText();
      } else if (textInt > 250) {
        textBox.textContent = "250";
      } else if (textInt < 1) {
        textBox.textContent = "1";
      }
      saveSize(parseInt(inputSize.textContent));
    });
    inputSize.addEventListener("focus", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
    });
  }
};

modules["pages/editor/toolbar/bold"] = {
  button: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_808_8" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_808_8)"> <mask id="path-2-outside-1_808_8" maskUnits="userSpaceOnUse" x="44" y="37" width="178" height="185" fill="black"> <rect fill="white" x="44" y="37" width="178" height="185"/> <path d="M56.1 210V49H138.44C159.6 49 175.393 52.91 185.82 60.73C196.247 68.3967 201.46 78.5167 201.46 91.09C201.46 99.37 199.237 106.653 194.79 112.94C190.497 119.073 184.363 123.98 176.39 127.66C168.57 131.187 159.217 132.95 148.33 132.95L152.93 121.91C164.277 121.91 174.167 123.673 182.6 127.2C191.033 130.573 197.55 135.557 202.15 142.15C206.903 148.59 209.28 156.487 209.28 165.84C209.28 179.793 203.607 190.68 192.26 198.5C181.067 206.167 164.66 210 143.04 210H56.1ZM101.18 177.11H139.36C147.18 177.11 153.083 175.807 157.07 173.2C161.21 170.44 163.28 166.3 163.28 160.78C163.28 155.26 161.21 151.197 157.07 148.59C153.083 145.83 147.18 144.45 139.36 144.45H97.96V112.94H132.46C140.127 112.94 145.877 111.637 149.71 109.03C153.543 106.423 155.46 102.513 155.46 97.3C155.46 92.0867 153.543 88.2533 149.71 85.8C145.877 83.1933 140.127 81.89 132.46 81.89H101.18V177.11Z"/> </mask> <path d="M56.1 210H44.1V222H56.1V210ZM56.1 49V37H44.1V49H56.1ZM185.82 60.73L178.62 70.33L178.665 70.3641L178.711 70.3978L185.82 60.73ZM194.79 112.94L184.993 106.01L184.976 106.034L184.959 106.058L194.79 112.94ZM176.39 127.66L181.323 138.599L181.371 138.577L181.419 138.556L176.39 127.66ZM148.33 132.95L137.253 128.335L130.33 144.95H148.33V132.95ZM152.93 121.91V109.91H144.93L141.853 117.295L152.93 121.91ZM182.6 127.2L177.97 138.271L178.057 138.307L178.143 138.342L182.6 127.2ZM202.15 142.15L192.308 149.016L192.4 149.147L192.495 149.276L202.15 142.15ZM192.26 198.5L199.041 208.4L199.055 208.391L199.07 208.381L192.26 198.5ZM101.18 177.11H89.18V189.11H101.18V177.11ZM157.07 173.2L163.637 183.244L163.682 183.214L163.726 183.185L157.07 173.2ZM157.07 148.59L150.239 158.456L150.455 158.605L150.676 158.745L157.07 148.59ZM97.96 144.45H85.96V156.45H97.96V144.45ZM97.96 112.94V100.94H85.96V112.94H97.96ZM149.71 109.03L156.458 118.953L156.458 118.953L149.71 109.03ZM149.71 85.8L142.962 95.7231L143.101 95.8171L143.241 95.9073L149.71 85.8ZM101.18 81.89V69.89H89.18V81.89H101.18ZM68.1 210V49H44.1V210H68.1ZM56.1 61H138.44V37H56.1V61ZM138.44 61C158.494 61 171.21 64.7722 178.62 70.33L193.02 51.13C179.577 41.0478 160.706 37 138.44 37V61ZM178.711 70.3978C186.169 75.8814 189.46 82.4639 189.46 91.09H213.46C213.46 74.5694 206.324 60.9119 192.929 51.0622L178.711 70.3978ZM189.46 91.09C189.46 97.085 187.897 101.905 184.993 106.01L204.587 119.87C210.577 111.401 213.46 101.655 213.46 91.09H189.46ZM184.959 106.058C182.08 110.172 177.743 113.819 171.361 116.764L181.419 138.556C190.983 134.141 198.914 127.974 204.621 119.822L184.959 106.058ZM171.457 116.721C165.545 119.387 157.958 120.95 148.33 120.95V144.95C160.476 144.95 171.595 142.986 181.323 138.599L171.457 116.721ZM159.407 137.565L164.007 126.525L141.853 117.295L137.253 128.335L159.407 137.565ZM152.93 133.91C163.059 133.91 171.311 135.486 177.97 138.271L187.23 116.129C177.022 111.86 165.495 109.91 152.93 109.91V133.91ZM178.143 138.342C184.694 140.962 189.217 144.585 192.308 149.016L211.992 135.284C205.883 126.529 197.372 120.185 187.057 116.058L178.143 138.342ZM192.495 149.276C195.479 153.319 197.28 158.604 197.28 165.84H221.28C221.28 154.369 218.327 143.861 211.805 135.024L192.495 149.276ZM197.28 165.84C197.28 175.906 193.499 183.072 185.45 188.619L199.07 208.381C213.715 198.288 221.28 183.681 221.28 165.84H197.28ZM185.479 188.6C177.148 194.306 163.559 198 143.04 198V222C165.761 222 184.986 218.027 199.041 208.4L185.479 188.6ZM143.04 198H56.1V222H143.04V198ZM101.18 189.11H139.36V165.11H101.18V189.11ZM139.36 189.11C148.161 189.11 156.812 187.706 163.637 183.244L150.503 163.156C149.355 163.907 146.199 165.11 139.36 165.11V189.11ZM163.726 183.185C171.613 177.927 175.28 169.796 175.28 160.78H151.28C151.28 162.033 151.051 162.546 150.994 162.658C150.963 162.721 150.881 162.904 150.414 163.215L163.726 183.185ZM175.28 160.78C175.28 151.763 171.592 143.553 163.464 138.435L150.676 158.745C150.897 158.884 150.985 158.975 151.004 158.995C151.019 159.012 151.024 159.017 151.035 159.04C151.048 159.065 151.28 159.52 151.28 160.78H175.28ZM163.901 138.724C157.018 133.959 148.253 132.45 139.36 132.45V156.45C146.107 156.45 149.149 157.701 150.239 158.456L163.901 138.724ZM139.36 132.45H97.96V156.45H139.36V132.45ZM109.96 144.45V112.94H85.96V144.45H109.96ZM97.96 124.94H132.46V100.94H97.96V124.94ZM132.46 124.94C141.112 124.94 149.716 123.537 156.458 118.953L142.962 99.1069C142.037 99.736 139.142 100.94 132.46 100.94V124.94ZM156.458 118.953C164.028 113.806 167.46 105.908 167.46 97.3H143.46C143.46 98.4328 143.256 98.8429 143.247 98.8606C143.238 98.879 143.237 98.8809 143.228 98.8912C143.216 98.9046 143.146 98.9822 142.962 99.1069L156.458 118.953ZM167.46 97.3C167.46 88.6942 164.009 80.704 156.179 75.6927L143.241 95.9073C143.38 95.9961 143.403 96.033 143.371 95.9977C143.335 95.959 143.304 95.9104 143.289 95.8816C143.253 95.8096 143.46 96.1589 143.46 97.3H167.46ZM156.458 75.8769C149.716 71.2927 141.112 69.89 132.46 69.89V93.89C139.142 93.89 142.037 95.094 142.962 95.7231L156.458 75.8769ZM132.46 69.89H101.18V93.89H132.46V69.89ZM89.18 81.89V177.11H113.18V81.89H89.18Z" fill="white" mask="url(#path-2-outside-1_808_8)"/> <path d="M56.1 210V49H138.44C159.6 49 175.393 52.91 185.82 60.73C196.247 68.3967 201.46 78.5167 201.46 91.09C201.46 99.37 199.237 106.653 194.79 112.94C190.497 119.073 184.363 123.98 176.39 127.66C168.57 131.187 159.217 132.95 148.33 132.95L152.93 121.91C164.277 121.91 174.167 123.673 182.6 127.2C191.033 130.573 197.55 135.557 202.15 142.15C206.903 148.59 209.28 156.487 209.28 165.84C209.28 179.793 203.607 190.68 192.26 198.5C181.067 206.167 164.66 210 143.04 210H56.1ZM101.18 177.11H139.36C147.18 177.11 153.083 175.807 157.07 173.2C161.21 170.44 163.28 166.3 163.28 160.78C163.28 155.26 161.21 151.197 157.07 148.59C153.083 145.83 147.18 144.45 139.36 144.45H97.96V112.94H132.46C140.127 112.94 145.877 111.637 149.71 109.03C153.543 106.423 155.46 102.513 155.46 97.3C155.46 92.0867 153.543 88.2533 149.71 85.8C145.877 83.1933 140.127 81.89 132.46 81.89H101.18V177.11Z" fill="#2F2F2F"/> </g> </svg>`,
  tooltip: "Bold",
  divideBefore: true,
  setButton: function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    if (original.d.bo != true) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    extra.saveSelecting({ d: { bo: !(original.d.bo || false) } }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/italic"] = {
  button: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_808_19" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_808_19)"> <mask id="path-2-outside-1_808_19" maskUnits="userSpaceOnUse" x="82" y="37" width="99" height="185" fill="black"> <rect fill="white" x="82" y="37" width="99" height="185"/> <path d="M96.67 210L128.87 49H166.36L134.16 210H96.67Z"/> </mask> <path d="M96.67 210L84.903 207.647L82.0324 222H96.67V210ZM128.87 49V37H119.032L117.103 46.6466L128.87 49ZM166.36 49L178.127 51.3534L180.998 37H166.36V49ZM134.16 210V222H143.998L145.927 212.353L134.16 210ZM108.437 212.353L140.637 51.3534L117.103 46.6466L84.903 207.647L108.437 212.353ZM128.87 61H166.36V37H128.87V61ZM154.593 46.6466L122.393 207.647L145.927 212.353L178.127 51.3534L154.593 46.6466ZM134.16 198H96.67V222H134.16V198Z" fill="white" mask="url(#path-2-outside-1_808_19)"/> <path d="M96.67 210L128.87 49H166.36L134.16 210H96.67Z" fill="#2F2F2F"/> </g> </svg>`,
  tooltip: "Italic",
  setButton: function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    if (original.d.it != true) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    extra.saveSelecting({ d: { it: !(original.d.it || false) } }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/underline"] = {
  button: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_808_24" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_808_24)"> <mask id="path-2-outside-1_808_24" maskUnits="userSpaceOnUse" x="52" y="25" width="152" height="167" fill="black"> <rect fill="white" x="52" y="25" width="152" height="167"/> <path d="M127.991 179.4C108.125 179.4 92.5914 173.867 81.3914 162.8C70.1914 151.733 64.5914 135.933 64.5914 115.4V37H96.9914V114.2C96.9914 127.533 99.7247 137.133 105.191 143C110.658 148.867 118.325 151.8 128.191 151.8C138.058 151.8 145.725 148.867 151.191 143C156.658 137.133 159.391 127.533 159.391 114.2V37H191.391V115.4C191.391 135.933 185.791 151.733 174.591 162.8C163.391 173.867 147.858 179.4 127.991 179.4Z"/> </mask> <path d="M81.3914 162.8L89.8257 154.264L89.8257 154.264L81.3914 162.8ZM64.5914 37V25H52.5914V37H64.5914ZM96.9914 37H108.991V25H96.9914V37ZM105.191 143L96.4121 151.181L96.4121 151.181L105.191 143ZM151.191 143L159.971 151.181L159.971 151.181L151.191 143ZM159.391 37V25H147.391V37H159.391ZM191.391 37H203.391V25H191.391V37ZM174.591 162.8L183.026 171.336L183.026 171.336L174.591 162.8ZM127.991 167.4C110.414 167.4 98.2292 162.567 89.8257 154.264L72.9571 171.336C86.9536 185.166 105.836 191.4 127.991 191.4V167.4ZM89.8257 154.264C81.5415 146.078 76.5914 133.743 76.5914 115.4H52.5914C52.5914 138.123 58.8413 157.388 72.9571 171.336L89.8257 154.264ZM76.5914 115.4V37H52.5914V115.4H76.5914ZM64.5914 49H96.9914V25H64.5914V49ZM84.9914 37V114.2H108.991V37H84.9914ZM84.9914 114.2C84.9914 128.684 87.8744 142.018 96.4121 151.181L113.971 134.819C111.575 132.248 108.991 126.382 108.991 114.2H84.9914ZM96.4121 151.181C104.655 160.027 115.819 163.8 128.191 163.8V139.8C120.83 139.8 116.661 137.706 113.971 134.819L96.4121 151.181ZM128.191 163.8C140.564 163.8 151.728 160.027 159.971 151.181L142.412 134.819C139.722 137.706 135.552 139.8 128.191 139.8V163.8ZM159.971 151.181C168.508 142.018 171.391 128.684 171.391 114.2H147.391C147.391 126.382 144.808 132.248 142.412 134.819L159.971 151.181ZM171.391 114.2V37H147.391V114.2H171.391ZM159.391 49H191.391V25H159.391V49ZM179.391 37V115.4H203.391V37H179.391ZM179.391 115.4C179.391 133.743 174.441 146.078 166.157 154.264L183.026 171.336C197.142 157.388 203.391 138.123 203.391 115.4H179.391ZM166.157 154.264C157.754 162.567 145.569 167.4 127.991 167.4V191.4C150.147 191.4 169.029 185.166 183.026 171.336L166.157 154.264Z" fill="white" mask="url(#path-2-outside-1_808_24)"/> <rect x="47" y="192" width="162" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M127.991 179.4C108.125 179.4 92.5914 173.867 81.3914 162.8C70.1914 151.733 64.5914 135.933 64.5914 115.4V37H96.9914V114.2C96.9914 127.533 99.7247 137.133 105.191 143C110.658 148.867 118.325 151.8 128.191 151.8C138.058 151.8 145.725 148.867 151.191 143C156.658 137.133 159.391 127.533 159.391 114.2V37H191.391V115.4C191.391 135.933 185.791 151.733 174.591 162.8C163.391 173.867 147.858 179.4 127.991 179.4Z" fill="#2F2F2F"/> </g> </svg>`,
  tooltip: "Underline",
  setButton: function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    if (original.d.ul != true) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    extra.saveSelecting({ d: { ul: !(original.d.ul || false) } }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/strikethrough"] = {
  button: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_810_34" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_810_34)"> <mask id="path-2-outside-1_810_34" maskUnits="userSpaceOnUse" x="46" y="34" width="162" height="191" fill="black"> <rect fill="white" x="46" y="34" width="162" height="191"/> <path d="M127.155 212.76C114.275 212.76 101.932 211.073 90.125 207.7C78.3184 204.173 68.8117 199.65 61.605 194.13L74.255 166.07C81.155 170.977 89.2817 175.04 98.635 178.26C108.142 181.327 117.725 182.86 127.385 182.86C134.745 182.86 140.648 182.17 145.095 180.79C149.695 179.257 153.068 177.187 155.215 174.58C157.362 171.973 158.435 168.983 158.435 165.61C158.435 161.317 156.748 157.943 153.375 155.49C150.002 152.883 145.555 150.813 140.035 149.28C134.515 147.593 128.382 146.06 121.635 144.68C115.042 143.147 108.372 141.307 101.625 139.16C95.0317 137.013 88.975 134.253 83.455 130.88C77.935 127.507 73.4117 123.06 69.885 117.54C66.5117 112.02 64.825 104.967 64.825 96.38C64.825 87.18 67.2784 78.8233 72.185 71.31C77.245 63.6433 84.7584 57.5867 94.725 53.14C104.845 48.54 117.495 46.24 132.675 46.24C142.795 46.24 152.762 47.4667 162.575 49.92C172.388 52.22 181.052 55.7467 188.565 60.5L177.065 88.79C169.552 84.4967 162.038 81.3533 154.525 79.36C147.012 77.2133 139.652 76.14 132.445 76.14C125.238 76.14 119.335 76.9833 114.735 78.67C110.135 80.3567 106.838 82.58 104.845 85.34C102.852 87.9467 101.855 91.0133 101.855 94.54C101.855 98.68 103.542 102.053 106.915 104.66C110.288 107.113 114.735 109.107 120.255 110.64C125.775 112.173 131.832 113.707 138.425 115.24C145.172 116.773 151.842 118.537 158.435 120.53C165.182 122.523 171.315 125.207 176.835 128.58C182.355 131.953 186.802 136.4 190.175 141.92C193.702 147.44 195.465 154.417 195.465 162.85C195.465 171.897 192.935 180.177 187.875 187.69C182.815 195.203 175.225 201.26 165.105 205.86C155.138 210.46 142.488 212.76 127.155 212.76Z"/> </mask> <path d="M90.125 207.7L86.6906 219.198L86.7594 219.219L86.8284 219.238L90.125 207.7ZM61.605 194.13L50.6653 189.198L46.7553 197.871L54.3081 203.657L61.605 194.13ZM74.255 166.07L81.2093 156.291L69.3141 147.832L63.3153 161.138L74.255 166.07ZM98.635 178.26L94.7289 189.606L94.8396 189.645L94.951 189.681L98.635 178.26ZM145.095 180.79L148.652 192.251L148.771 192.214L148.89 192.174L145.095 180.79ZM155.215 174.58L145.952 166.952L145.952 166.952L155.215 174.58ZM153.375 155.49L146.038 164.985L146.176 165.092L146.317 165.195L153.375 155.49ZM140.035 149.28L136.528 160.756L136.675 160.801L136.823 160.842L140.035 149.28ZM121.635 144.68L118.917 156.368L119.073 156.404L119.23 156.437L121.635 144.68ZM101.625 139.16L97.91 150.57L97.9483 150.583L97.9866 150.595L101.625 139.16ZM83.455 130.88L77.1976 141.119L77.1976 141.119L83.455 130.88ZM69.885 117.54L59.6457 123.797L59.7082 123.9L59.7727 124.001L69.885 117.54ZM72.185 71.31L62.1697 64.6999L62.1537 64.7242L62.1378 64.7485L72.185 71.31ZM94.725 53.14L99.6143 64.0988L99.6526 64.0817L99.6907 64.0644L94.725 53.14ZM162.575 49.92L159.665 61.5617L159.751 61.5832L159.837 61.6034L162.575 49.92ZM188.565 60.5L199.682 65.0189L203.46 55.7236L194.981 50.359L188.565 60.5ZM177.065 88.79L171.111 99.2089L183.018 106.012L188.182 93.3089L177.065 88.79ZM154.525 79.36L151.228 90.8983L151.338 90.9295L151.448 90.9587L154.525 79.36ZM114.735 78.67L110.604 67.4035L110.604 67.4035L114.735 78.67ZM104.845 85.34L114.377 92.6294L114.477 92.499L114.573 92.3659L104.845 85.34ZM106.915 104.66L99.5777 114.155L99.7158 114.262L99.857 114.365L106.915 104.66ZM120.255 110.64L117.043 122.202L117.043 122.202L120.255 110.64ZM138.425 115.24L135.707 126.928L135.736 126.935L135.766 126.942L138.425 115.24ZM158.435 120.53L154.962 132.017L154.999 132.027L155.035 132.038L158.435 120.53ZM176.835 128.58L183.092 118.341L183.092 118.341L176.835 128.58ZM190.175 141.92L179.936 148.177L179.998 148.28L180.063 148.381L190.175 141.92ZM187.875 187.69L197.828 194.393L197.828 194.393L187.875 187.69ZM165.105 205.86L160.139 194.936L160.108 194.95L160.076 194.964L165.105 205.86ZM127.155 200.76C115.335 200.76 104.105 199.214 93.4217 196.162L86.8284 219.238C99.7585 222.933 113.215 224.76 127.155 224.76V200.76ZM93.5595 196.202C82.6825 192.953 74.6193 188.983 68.902 184.603L54.3081 203.657C63.0042 210.317 73.9542 215.394 86.6906 219.198L93.5595 196.202ZM72.5447 199.062L85.1947 171.002L63.3153 161.138L50.6653 189.198L72.5447 199.062ZM67.3008 175.849C75.2784 181.522 84.4676 186.074 94.7289 189.606L102.541 166.914C94.0958 164.006 87.0317 160.431 81.2093 156.291L67.3008 175.849ZM94.951 189.681C105.607 193.118 116.432 194.86 127.385 194.86V170.86C119.018 170.86 110.676 169.535 102.319 166.839L94.951 189.681ZM127.385 194.86C135.337 194.86 142.586 194.133 148.652 192.251L141.538 169.329C138.711 170.207 134.153 170.86 127.385 170.86V194.86ZM148.89 192.174C154.745 190.223 160.402 187.158 164.478 182.208L145.952 166.952C145.734 167.216 144.645 168.291 141.3 169.406L148.89 192.174ZM164.478 182.208C168.392 177.456 170.435 171.77 170.435 165.61H146.435C146.435 166.197 146.331 166.491 145.952 166.952L164.478 182.208ZM170.435 165.61C170.435 157.61 167.017 150.574 160.433 145.785L146.317 165.195C146.484 165.317 146.538 165.381 146.528 165.371C146.516 165.356 146.476 165.305 146.437 165.227C146.398 165.149 146.392 165.11 146.399 165.141C146.407 165.178 146.435 165.324 146.435 165.61H170.435ZM160.712 145.995C155.767 142.173 149.778 139.532 143.247 137.718L136.823 160.842C141.332 162.095 144.236 163.594 146.038 164.985L160.712 145.995ZM143.542 137.804C137.598 135.988 131.09 134.365 124.04 132.923L119.23 156.437C125.674 157.755 131.432 159.199 136.528 160.756L143.542 137.804ZM124.353 132.992C118.084 131.534 111.721 129.779 105.263 127.725L97.9866 150.595C105.023 152.834 112 154.759 118.917 156.368L124.353 132.992ZM105.34 127.75C99.5735 125.872 94.3786 123.492 89.7124 120.641L77.1976 141.119C83.5715 145.015 90.4899 148.155 97.91 150.57L105.34 127.75ZM89.7124 120.641C85.7679 118.23 82.5555 115.083 79.9974 111.079L59.7727 124.001C64.2679 131.037 70.1022 136.783 77.1976 141.119L89.7124 120.641ZM80.1244 111.283C78.2211 108.168 76.825 103.462 76.825 96.38H52.825C52.825 106.471 54.8023 115.872 59.6457 123.797L80.1244 111.283ZM76.825 96.38C76.825 89.4481 78.6335 83.3821 82.2323 77.8715L62.1378 64.7485C55.9233 74.2645 52.825 84.9119 52.825 96.38H76.825ZM82.2004 77.9201C85.7806 72.4955 91.3377 67.7914 99.6143 64.0988L89.8357 42.1812C78.179 47.3819 68.7095 54.7911 62.1697 64.6999L82.2004 77.9201ZM99.6907 64.0644C107.791 60.3824 118.618 58.24 132.675 58.24V34.24C116.372 34.24 101.899 36.6976 89.7594 42.2156L99.6907 64.0644ZM132.675 58.24C141.814 58.24 150.804 59.3464 159.665 61.5617L165.485 38.2783C154.72 35.5869 143.776 34.24 132.675 34.24V58.24ZM159.837 61.6034C168.519 63.6382 175.907 66.692 182.149 70.6409L194.981 50.359C186.196 44.8013 176.258 40.8017 165.313 38.2366L159.837 61.6034ZM177.448 55.981L165.948 84.271L188.182 93.3089L199.682 65.0189L177.448 55.981ZM183.019 78.3711C174.702 73.6189 166.228 70.0497 157.602 67.7613L151.448 90.9587C157.849 92.657 164.401 95.3744 171.111 99.2089L183.019 78.3711ZM157.822 67.8217C149.326 65.3944 140.856 64.14 132.445 64.14V88.14C138.447 88.14 144.697 89.0323 151.228 90.8983L157.822 67.8217ZM132.445 64.14C124.431 64.14 116.994 65.0604 110.604 67.4035L118.866 89.9365C121.676 88.9062 126.046 88.14 132.445 88.14V64.14ZM110.604 67.4035C104.699 69.5687 99.0017 72.9351 95.1169 78.3141L114.573 92.3659C114.675 92.2248 115.571 91.1447 118.866 89.9365L110.604 67.4035ZM95.3127 78.0506C91.596 82.9109 89.855 88.5881 89.855 94.54H113.855C113.855 93.4385 114.107 92.9824 114.377 92.6294L95.3127 78.0506ZM89.855 94.54C89.855 102.524 93.3658 109.355 99.5777 114.155L114.252 95.1646C114.018 94.9836 113.904 94.8598 113.862 94.8099C113.823 94.7638 113.831 94.7647 113.853 94.8084C113.875 94.853 113.882 94.883 113.88 94.8728C113.877 94.8584 113.855 94.7567 113.855 94.54H89.855ZM99.857 114.365C104.736 117.913 110.621 120.418 117.043 122.202L123.467 99.0778C118.849 97.795 115.841 96.3137 113.973 94.9552L99.857 114.365ZM117.043 122.202C122.753 123.788 128.977 125.363 135.707 126.928L141.143 103.552C134.687 102.05 128.797 100.558 123.467 99.0778L117.043 122.202ZM135.766 126.942C142.24 128.413 148.639 130.105 154.962 132.017L161.908 109.043C155.045 106.969 148.103 105.134 141.085 103.538L135.766 126.942ZM155.035 132.038C160.865 133.761 166.025 136.037 170.578 138.819L183.092 118.341C176.605 114.376 169.499 111.286 161.835 109.022L155.035 132.038ZM170.578 138.819C174.473 141.2 177.555 144.282 179.936 148.177L200.414 135.663C196.048 128.518 190.237 122.707 183.092 118.341L170.578 138.819ZM180.063 148.381C182.048 151.488 183.465 156.056 183.465 162.85H207.465C207.465 152.777 205.355 143.392 200.287 135.459L180.063 148.381ZM183.465 162.85C183.465 169.505 181.65 175.452 177.922 180.987L197.828 194.393C204.221 184.902 207.465 174.288 207.465 162.85H183.465ZM177.922 180.987C174.356 186.281 168.697 191.046 160.139 194.936L170.071 216.784C181.753 211.474 191.274 204.125 197.828 194.393L177.922 180.987ZM160.076 194.964C152.182 198.608 141.397 200.76 127.155 200.76V224.76C143.58 224.76 158.095 222.312 170.134 216.756L160.076 194.964Z" fill="white" mask="url(#path-2-outside-1_810_34)"/> <rect x="22" y="111" width="212" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M127.155 212.76C114.275 212.76 101.932 211.073 90.125 207.7C78.3184 204.173 68.8117 199.65 61.605 194.13L74.255 166.07C81.155 170.977 89.2817 175.04 98.635 178.26C108.142 181.327 117.725 182.86 127.385 182.86C134.745 182.86 140.648 182.17 145.095 180.79C149.695 179.257 153.068 177.187 155.215 174.58C157.362 171.973 158.435 168.983 158.435 165.61C158.435 161.317 156.748 157.943 153.375 155.49C150.002 152.883 145.555 150.813 140.035 149.28C134.515 147.593 128.382 146.06 121.635 144.68C115.042 143.147 108.372 141.307 101.625 139.16C95.0317 137.013 88.975 134.253 83.455 130.88C77.935 127.507 73.4117 123.06 69.885 117.54C66.5117 112.02 64.825 104.967 64.825 96.38C64.825 87.18 67.2784 78.8233 72.185 71.31C77.245 63.6433 84.7584 57.5867 94.725 53.14C104.845 48.54 117.495 46.24 132.675 46.24C142.795 46.24 152.762 47.4667 162.575 49.92C172.388 52.22 181.052 55.7467 188.565 60.5L177.065 88.79C169.552 84.4967 162.038 81.3533 154.525 79.36C147.012 77.2133 139.652 76.14 132.445 76.14C125.238 76.14 119.335 76.9833 114.735 78.67C110.135 80.3567 106.838 82.58 104.845 85.34C102.852 87.9467 101.855 91.0133 101.855 94.54C101.855 98.68 103.542 102.053 106.915 104.66C110.288 107.113 114.735 109.107 120.255 110.64C125.775 112.173 131.832 113.707 138.425 115.24C145.172 116.773 151.842 118.537 158.435 120.53C165.182 122.523 171.315 125.207 176.835 128.58C182.355 131.953 186.802 136.4 190.175 141.92C193.702 147.44 195.465 154.417 195.465 162.85C195.465 171.897 192.935 180.177 187.875 187.69C182.815 195.203 175.225 201.26 165.105 205.86C155.138 210.46 142.488 212.76 127.155 212.76Z" fill="#2F2F2F"/> </g> </svg>`,
  tooltip: "Strikethrough",
  setButton: function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    if (original.d.st != true) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    extra.saveSelecting({ d: { st: !(original.d.st || false) } }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/textalign"] = {
  button: ``,
  tooltip: "Text Alignment",
  options: {
    left: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_815_89" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_815_89)"> <rect x="47" y="171" width="138" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="47" y="111" width="112" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="47" y="51" width="162" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg>`,
    center: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_815_84" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_815_84)"> <rect x="59" y="171" width="138" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="72" y="111" width="112" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="47" y="51" width="162" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg>`,
    right: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_815_76" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_815_76)"> <rect x="71" y="171" width="138" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="97" y="111" width="112" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="47" y="51" width="162" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg>`
  },
  setButton: function (editor, button) {
    let buttonImg = button.querySelector("div");
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] || {}).render || {}), ...(editor.selecting[selectID] || {}) }) || {};
    let selectedAl = original.d.al || "left";
    if (selectedAl == "left") {
      buttonImg.innerHTML = this.options.left;
    } else if (selectedAl == "center") {
      buttonImg.innerHTML = this.options.center;
    } else if (selectedAl == "right") {
      buttonImg.innerHTML = this.options.right;
    }
  },
  html: `
    <div class="eSubToolTextAlignContainer">
      <button class="eTool" tooltip="Left Align" left option><div></div></button>
      <button class="eTool" tooltip="Center Align" center option><div></div></button>
      <button class="eTool" tooltip="Right Align" right option><div></div></button>
    </div>
  `,
  css: {
    ".eSubToolTextAlignContainer": `display: flex; width: 100%; height: 50px; gap: 6px; overflow: auto; border-radius: inherit`,
    ".eSubToolTextAlignContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolTextAlignContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolTextAlignContainer .eTool[selected] > div": `background: var(--theme) !important`
  },
  setPreferenceTool: function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] || {}).render || {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] || {}) }) || {};
  },
  js: async function (frame, toolID, extra) {
    let editor = await getModule("pages/editor");
    this.setPreferenceTool(editor);
    let selectedAl = this.preferenceTool.d.al || "left";

    let preferences = editor.preferences.tools;
    let toolPref = preferences[toolID];

    let leftAlign = frame.querySelector(".eTool[left]");
    let centerAlign = frame.querySelector(".eTool[center]");
    let rightAlign = frame.querySelector(".eTool[right]");

    leftAlign.querySelector("div").innerHTML = this.options.left;
    centerAlign.querySelector("div").innerHTML = this.options.center;
    rightAlign.querySelector("div").innerHTML = this.options.right;

    let updateAlignment = () => {
      leftAlign.removeAttribute("selected");
      centerAlign.removeAttribute("selected");
      rightAlign.removeAttribute("selected");

      if (selectedAl == "left") {
        leftAlign.setAttribute("selected", "");
      } else if (selectedAl == "center") {
        centerAlign.setAttribute("selected", "");
      } else if (selectedAl == "right") {
        rightAlign.setAttribute("selected", "");
      }
    }
    updateAlignment();

    leftAlign.addEventListener("click", async () => {
      selectedAl = "left";
      if (toolPref != null) {
        toolPref.align = selectedAl;
        editor.savePreferences();
      }
      await extra.saveSelecting({ d: { al: selectedAl } }, true);
      extra.updateToolActions(extra.frame);
      updateAlignment();
    });
    centerAlign.addEventListener("click", async () => {
      selectedAl = "center";
      if (toolPref != null) {
        toolPref.align = selectedAl;
        editor.savePreferences();
      }
      await extra.saveSelecting({ d: { al: selectedAl } }, true);
      extra.updateToolActions(extra.frame);
      updateAlignment();
    });
    rightAlign.addEventListener("click", async () => {
      selectedAl = "right";
      if (toolPref != null) {
        toolPref.align = selectedAl;
        editor.savePreferences();
      }
      await extra.saveSelecting({ d: { al: selectedAl } }, true);
      extra.updateToolActions(extra.frame);
      updateAlignment();
    });
  }
};