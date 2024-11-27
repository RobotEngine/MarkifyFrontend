modules["dropdowns/editor/share/options"] = {
  html: `
  <div class="eShareActionTitle" style="margin-bottom: 12px"><div></div>Member Settings<div></div></div>
  <button class="eShareActionOption border" option="forceLogin" title="Require those joining to login for verified identites."><div label>Require Login</div><div class="eOptionToggle"><div></div></div></button>
  <button class="eShareActionOption border" option="editOthersWork" title="Allow members to edit and delete annotations created by other members."><div label>Modify Other's Work</div><div class="eOptionToggle"><div></div></div></button>
  <button class="eShareActionOption border" option="anonymousMode" title="Hide all member names and colors in cursors."><div label>Anonymous Mode</div><div class="eOptionToggle"><div></div></div></button>
  <button class="eShareActionOption border" option="allowExport" title="Allow members to export, print, or copy the lesson."><div label>Allow Exporting</div><div class="eOptionToggle"><div></div></div></button>
  <button class="eShareActionOption border" option="observeViewers" title="Allow members to observe those who aren't editing."><div label>Observe Viewers</div><div class="eOptionToggle"><div></div></div></button>
  <div class="eShareActionTitle" style="margin-top: 18px"><div></div>Tool Toggle<div></div></div>
  <div class="eShareToolToggle">
    <div class="eShareToolToggleBar">
      <button class="eShareToolToggleBarTool" tool="draw"><div><svg width="22" viewBox="0 0 27 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.3863 34.9812C13.2256 37.2873 15.077 39.0806 17.4087 39.846L19.7938 40.629C20.4513 40.8448 21.1712 40.5828 21.5361 39.9948L22.86 37.8619C24.1541 35.7768 24.4197 33.213 23.5803 30.9069L18.9826 18.2748L7.78855 22.3491L12.3863 34.9812Z" fill="white"></path> <path d="M18.5551 17.1002L19.7297 16.6726L20.1572 17.8472L24.7549 30.4794C25.7254 33.1458 25.4184 36.1102 23.922 38.5211L22.5982 40.654C21.9291 41.732 20.6094 42.2123 19.404 41.8166L17.0188 41.0337C14.3228 40.1486 12.1822 38.0752 11.2117 35.4088L6.61393 22.7766L6.18641 21.602L7.36103 21.1745L18.5551 17.1002Z" fillcoloropacity="" stroke="white" stroke-width="2.5" fill="rgba(226, 122, 255, 1)"></path> <path d="M11.4928 32.5264L10.3182 32.9539L9.89068 31.7793L2.35127 11.065C0.990064 7.32509 2.91836 3.18985 6.65823 1.82865C10.3981 0.467446 14.5333 2.39574 15.8945 6.13561L23.434 26.85L23.8615 28.0246L22.6869 28.4521L11.4928 32.5264Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"></path> </svg></div></button>
      <button class="eShareToolToggleBarTool" tool="markup"><div><svg width="26" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.1698 36.4384C13.9254 38.5143 16.2208 39.5846 18.2967 38.8291L23.9348 36.7769C26.0107 36.0214 27.0811 33.726 26.3255 31.6501L22.5633 21.3135L9.4076 26.1018L13.1698 36.4384Z" fill="white"></path> <path d="M22.1358 20.1389L23.3104 19.7113L23.7379 20.8859L27.5001 31.2226C28.4918 33.9472 27.087 36.9599 24.3624 37.9516L18.7242 40.0037C15.9996 40.9954 12.9869 39.5905 11.9952 36.8659L8.23298 26.5293L7.80546 25.3547L8.98008 24.9271L22.1358 20.1389Z" fillcoloropacity="" stroke="white" stroke-width="2.5" fill="rgba(255, 187, 51, 0.3)"></path> <path d="M11.9685 33.1377L10.7938 33.5652L10.3663 32.3906L2.49986 10.7776C1.50817 8.053 2.913 5.04033 5.63764 4.04864L11.2758 1.99652C14.0004 1.00484 17.0131 2.40967 18.0048 5.1343L25.8712 26.7472L26.2988 27.9219L25.1242 28.3494L11.9685 33.1377Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"></path> </svg></div></button>
      <button class="eShareToolToggleBarTool" tool="erase"><div><svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1893_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"></rect> </mask> <g mask="url(#mask0_1893_2)"> <path d="M154.613 154.645L158.856 158.888L163.098 154.645L196.12 121.623C206.274 111.469 206.274 95.0072 196.12 84.8535L170.166 58.8995C160.012 48.7459 143.55 48.7459 133.396 58.8995L100.375 91.9214L96.1319 96.164L100.375 100.407L154.613 154.645Z" fill="#2F2F2F" stroke="white" stroke-width="12"></path> <path d="M100.407 100.375L96.1646 96.1319L91.9219 100.375L58.9 133.396C48.7463 143.55 48.7463 160.012 58.9 170.166L79.1943 190.46C82.945 194.211 88.0321 196.318 93.3365 196.318L112.889 196.318C118.161 196.318 123.221 194.236 126.966 190.525L154.626 163.118L158.908 158.875L154.645 154.613L100.407 100.375Z" fill="#2F2F2F" stroke="white" stroke-width="12"></path> </g> </svg></div></button>
      <button class="eShareToolToggleBarTool" tool="text"><div><svg width="44" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 7V3H25.5V7H17V29.5H12V7H3Z" fill="#2F2F2F"></path> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fill="white"></path> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fillcoloropacity="" fill="rgba(0, 132, 255, 1)"></path> <mask id="path-4-outside-1_925_51" maskUnits="userSpaceOnUse" x="0" y="0" width="52" height="32" fill="black"> <rect fill="white" width="52" height="32"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3V7H12V29.5H17V7H25.5V3H3ZM26.5 9L34 19L26 29.5H31.5L36.5 22.5L42 29.5H47L39.5 19L47 9H42L36.5 15.5L31.5 9H26.5Z"></path> </mask> <path d="M3 7H0.5V9.5H3V7ZM3 3V0.5H0.5V3H3ZM12 7H14.5V4.5H12V7ZM12 29.5H9.5V32H12V29.5ZM17 29.5V32H19.5V29.5H17ZM17 7V4.5H14.5V7H17ZM25.5 7V9.5H28V7H25.5ZM25.5 3H28V0.5H25.5V3ZM34 19L35.9886 20.5151L37.1339 19.0119L36 17.5L34 19ZM26.5 9V6.5H21.5L24.5 10.5L26.5 9ZM26 29.5L24.0114 27.9849L20.9523 32H26V29.5ZM31.5 29.5V32H32.7865L33.5343 30.9531L31.5 29.5ZM36.5 22.5L38.4658 20.9554L36.4047 18.3322L34.4657 21.0469L36.5 22.5ZM42 29.5L40.0342 31.0446L40.7849 32H42V29.5ZM47 29.5V32H51.858L49.0343 28.0469L47 29.5ZM39.5 19L37.5 17.5L36.402 18.964L37.4657 20.4531L39.5 19ZM47 9L49 10.5L52 6.5H47V9ZM42 9V6.5H40.8405L40.0915 7.38514L42 9ZM36.5 15.5L34.5184 17.0243L36.4073 19.4798L38.4085 17.1149L36.5 15.5ZM31.5 9L33.4816 7.47572L32.731 6.5H31.5V9ZM5.5 7V3H0.5V7H5.5ZM12 4.5H3V9.5H12V4.5ZM14.5 29.5V7H9.5V29.5H14.5ZM17 27H12V32H17V27ZM14.5 7V29.5H19.5V7H14.5ZM25.5 4.5H17V9.5H25.5V4.5ZM23 3V7H28V3H23ZM3 5.5H25.5V0.5H3V5.5ZM36 17.5L28.5 7.5L24.5 10.5L32 20.5L36 17.5ZM27.9886 31.0151L35.9886 20.5151L32.0114 17.4849L24.0114 27.9849L27.9886 31.0151ZM31.5 27H26V32H31.5V27ZM34.4657 21.0469L29.4657 28.0469L33.5343 30.9531L38.5343 23.9531L34.4657 21.0469ZM43.9658 27.9554L38.4658 20.9554L34.5342 24.0446L40.0342 31.0446L43.9658 27.9554ZM47 27H42V32H47V27ZM37.4657 20.4531L44.9657 30.9531L49.0343 28.0469L41.5343 17.5469L37.4657 20.4531ZM45 7.5L37.5 17.5L41.5 20.5L49 10.5L45 7.5ZM42 11.5H47V6.5H42V11.5ZM38.4085 17.1149L43.9085 10.6149L40.0915 7.38514L34.5915 13.8851L38.4085 17.1149ZM29.5184 10.5243L34.5184 17.0243L38.4816 13.9757L33.4816 7.47572L29.5184 10.5243ZM26.5 11.5H31.5V6.5H26.5V11.5Z" fill="white" mask="url(#path-4-outside-1_925_51)"></path> </svg></div></button>
      <button class="eShareToolToggleBarTool" tool="shape"><div><svg width="38" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1.97104" y="1.47107" width="22.6493" height="22.6493" rx="5.25" fill="#2F2F2F" stroke="white" stroke-width="2.5"></rect> <circle cx="32.7043" cy="33.2043" r="11.3246" fill="white" stroke="white" stroke-width="2.5"></circle> <circle cx="32.7043" cy="33.2043" r="11.3246" fillcoloropacity="" stroke="white" stroke-width="2.5" fill="rgba(255, 76, 108, 1)"></circle> </svg></div></button>
      <button class="eShareToolToggleBarTool" tool="sticky"><div><svg width="44" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_850_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"></rect> </mask> <g mask="url(#mask0_850_2)"> <path d="M185 38H72C54.3269 38 40 52.3269 40 70V183.246C40 200.801 54.1418 215.078 71.6952 215.245L145.905 215.952C150.739 215.998 155.387 214.098 158.805 210.68L211.728 157.757C215.104 154.382 217 149.803 217 145.029V70C217 52.3269 202.673 38 185 38Z" fill="#2F2F2F" stroke="white" stroke-width="12"></path> <path d="M211 144H171C156.641 144 145 155.641 145 170V210" stroke="white" stroke-width="12"></path> <rect x="62" y="60" width="133" height="20" rx="10" fill="white"></rect> <rect x="62" y="88" width="101" height="20" rx="10" fill="white"></rect> </g> </svg></div></button>
      <button class="eShareToolToggleBarTool" tool="page"><div><svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2372_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"></rect> </mask> <g mask="url(#mask0_2372_2)"> <path d="M169 41H87C72.6406 41 61 52.6406 61 67V188.211C61 202.487 72.5109 214.093 86.7864 214.21L168.786 214.884C183.229 215.002 195 203.327 195 188.885V67C195 52.6406 183.359 41 169 41Z" fillcoloropacity="" stroke="white" stroke-width="24" fill="white"></path> <path d="M169 47H87C75.9543 47 67 55.9543 67 67V188.211C67 199.193 75.8545 208.12 86.8357 208.21L168.836 208.884C179.945 208.975 189 199.994 189 188.885V67C189 55.9543 180.046 47 169 47Z" stroke="#2F2F2F" stroke-width="12"></path> <path d="M68 58C68 52.4772 72.4772 48 78 48H156V64C156 69.5228 151.523 74 146 74H68V58Z" fill="#2F2F2F"></path> </g> </svg></div></button>
      <button class="eShareToolToggleBarTool" tool="media"><div><svg width="40" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_233_21" maskUnits="userSpaceOnUse" x="-0.459759" y="-0.0484619" width="51" height="42" fill="black"> <rect fill="white" x="-0.459759" y="-0.0484619" width="51" height="42"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z"></path> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z" fill="#2F2F2F"></path> <path d="M20.9726 12.2718L23.1377 11.0218V11.0218L20.9726 12.2718ZM15.7765 12.2718L17.9415 13.5218L15.7765 12.2718ZM28.5261 25.3549L26.3611 26.6049L28.5261 30.3549L30.6912 26.6049L28.5261 25.3549ZM32.5377 18.4066L30.3726 17.1566V17.1566L32.5377 18.4066ZM37.7339 18.4066L35.5688 19.6566L35.5688 19.6566L37.7339 18.4066ZM47.0534 34.5485L49.2184 33.2985L47.0534 34.5485ZM25.2345 38.9937L25.7061 36.5386L25.4724 36.4937H25.2345V38.9937ZM2.94664 34.4937L0.781578 33.2437L2.94664 34.4937ZM43.0431 7.66221C43.0431 8.88313 42.0533 9.87289 40.8324 9.87289V14.8729C44.8148 14.8729 48.0431 11.6446 48.0431 7.66221H43.0431ZM40.8324 5.45154C42.0533 5.45154 43.0431 6.44129 43.0431 7.66221H48.0431C48.0431 3.67987 44.8148 0.451538 40.8324 0.451538V5.45154ZM38.6217 7.66221C38.6217 6.44129 39.6115 5.45154 40.8324 5.45154V0.451538C36.8501 0.451538 33.6217 3.67987 33.6217 7.66221H38.6217ZM40.8324 9.87289C39.6115 9.87289 38.6217 8.88313 38.6217 7.66221H33.6217C33.6217 11.6446 36.8501 14.8729 40.8324 14.8729V9.87289ZM23.1377 11.0218C21.0207 7.35513 15.7284 7.35511 13.6114 11.0218L17.9415 13.5218C18.134 13.1885 18.6151 13.1885 18.8076 13.5218L23.1377 11.0218ZM30.6912 24.1049L23.1377 11.0218L18.8076 13.5218L26.3611 26.6049L30.6912 24.1049ZM30.3726 17.1566L26.3611 24.1049L30.6912 26.6049L34.7028 19.6566L30.3726 17.1566ZM39.8989 17.1566C37.782 13.4899 32.4896 13.49 30.3726 17.1566L34.7028 19.6566C34.8952 19.3233 35.3763 19.3233 35.5688 19.6566L39.8989 17.1566ZM49.2184 33.2985L39.8989 17.1566L35.5688 19.6566L44.8883 35.7985L49.2184 33.2985ZM44.4553 41.5485C48.6892 41.5485 51.3354 36.9651 49.2184 33.2985L44.8883 35.7985C45.0807 36.1318 44.8402 36.5485 44.4553 36.5485V41.5485ZM25.8163 41.5485H44.4553V36.5485H25.8163V41.5485ZM24.7628 41.4488C25.1057 41.5147 25.458 41.5485 25.8163 41.5485V36.5485C25.7728 36.5485 25.7365 36.5444 25.7061 36.5386L24.7628 41.4488ZM5.54471 41.4937H25.2345V36.4937H5.54471V41.4937ZM0.781578 33.2437C-1.33537 36.9104 1.3108 41.4937 5.54471 41.4937V36.4937C5.15982 36.4937 4.91925 36.077 5.11171 35.7437L0.781578 33.2437ZM13.6114 11.0218L0.781578 33.2437L5.11171 35.7437L17.9415 13.5218L13.6114 11.0218Z" fill="white" mask="url(#path-1-outside-1_233_21)"></path> </svg></div></button>
    </div>
    <div class="eShareToolToggleInfo">
      <div class="eShareToolToggleRow">
        <div title>Draw</div>
        <div line></div>
        <button class="eShareActionOption border" option="draw"><div class="eOptionToggle"><div></div></div></button>
      </div>
      <div class="eShareToolToggleRow">
        <div title>Markup</div>
        <div line></div>
        <button class="eShareActionOption border" option="markup"><div class="eOptionToggle"><div></div></div></button>
      </div>
      <div class="eShareToolToggleRow">
        <div title>Erase</div>
        <div line></div>
        <button class="eShareActionOption border" option="erase"><div class="eOptionToggle"><div></div></div></button>
      </div>
      <div class="eShareToolToggleRow">
        <div title>Text Box</div>
        <div line></div>
        <button class="eShareActionOption border" option="text"><div class="eOptionToggle"><div></div></div></button>
      </div>
      <div class="eShareToolToggleRow">
        <div title>Shapes</div>
        <div line></div>
        <button class="eShareActionOption border" option="shape"><div class="eOptionToggle"><div></div></div></button>
      </div>
      <div class="eShareToolToggleRow">
        <div title>Stickies</div>
        <div line></div>
        <button class="eShareActionOption border" option="sticky"><div class="eOptionToggle"><div></div></div></button>
      </div>
      <div class="eShareToolToggleRow" tool="page">
        <div title>Page</div>
        <div line></div>
        <button class="eShareActionOption border" option="page"><div class="eOptionToggle"><div></div></div></button>
      </div>
      <div class="eShareToolToggleRow">
        <div title>Media</div>
        <div line></div>
        <button class="eShareActionOption border" option="media"><div class="eOptionToggle"><div></div></div></button>
      </div>
    </div>
  </div>
  `,
  css: {
    ".eShareActionTitle": `display: flex; width: 100%; align-items: center; font-size: 16px; white-space: pre-wrap; font-weight: 600; color: var(--secondary)`,
    ".eShareActionTitle div": `flex: 1; margin: 0px 8px; height: 2px; background: var(--hover); border-radius: 1px`,

    ".eShareActionOption": `display: flex; width: 300px; max-width: calc(100% - 14px); padding: 6px; margin: 7px 7px 11px 7px; align-items: center; --borderWidth: 3px; --borderRadius: 18px; justify-content: center; align-items: center; font-size: 16px; font-weight: 700; text-align: left`,
    ".eShareActionOption:last-child": `margin: 7px`,
    ".eShareActionOption div[label]": `flex: 1; margin: 0 8px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eShareActionOption[on]": `--themeColor: var(--theme); --color: #fff; --borderColor: var(--hover)`,
    ".eShareActionOption[off]": `--themeColor: var(--gray); --color: #000; --borderColor: var(--lightGray)`,
    ".eOptionToggle": `position: relative; width: 36px; height: 20px; padding: 2px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eOptionToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eShareActionOption[on] .eOptionToggle div": `right: 2px`,
    ".eShareActionOption[off] .eOptionToggle div": `right: calc(100% - 22px)`,
    ".eShareActionOption[on]:hover": `background: var(--hover); --borderWidth: 0px; transform: scale(1.05)`,
    ".eShareActionOption[off]:hover": `background: var(--lightGray); --borderWidth: 0px; transform: scale(1.05)`,
    ".eShareActionOption:hover .eOptionToggle": `background: #fff`,
    ".eShareActionOption:hover .eOptionToggle div": `background: var(--themeColor)`,
    
    ".eShareToolToggle": `position: relative; display: flex; width: 100%`,
    ".eShareToolToggleBar": `display: flex; flex-direction: column; gap: 6px; margin: 8px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; align-items: center; pointer-events: none`,
    ".eShareToolToggleBarTool": `--hoverColor: var(--hover); width: 50px; height: 50px; flex-shrink: 0; padding: 0; transition: .2s`,
    ".eShareToolToggleBarTool > div": `display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; overflow: hidden`,
    ".eShareToolToggleInfo": `display: flex; flex-direction: column; gap: 6px; flex: 1; margin: 8px 0; align-items: center`,
    ".eShareToolToggleRow": `display: flex; width: 100%; height: 50px; flex-shrink: 0; align-items: center`,
    ".eShareToolToggleRow div[title]": `font-size: 16px; font-weight: 600; margin: 0 8px 0 2px; white-space: nowrap`,
    ".eShareToolToggleRow div[line]": `flex: 1; height: 3px; border-radius: 2px; transition: .2s`,
    ".eShareToolToggleRow button": `width: fit-content !important`
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");
    
    let forceLoginButton = frame.querySelector('.eShareActionOption[option="forceLogin"]');
    let editOthersWorkButton = frame.querySelector('.eShareActionOption[option="editOthersWork"]');
    let allowExportButton = frame.querySelector('.eShareActionOption[option="allowExport"]');
    let observeViewersButton = frame.querySelector('.eShareActionOption[option="observeViewers"]');
    let anonymousModeButton = frame.querySelector('.eShareActionOption[option="anonymousMode"]');
    let toolToggle = frame.querySelector(".eShareToolToggle");
    let toolToggleHolder = toolToggle.querySelector(".eShareToolToggleInfo");
    let toolToogleOptions = toolToggleHolder.querySelectorAll(".eShareActionOption");

    editor.updateOptions = async () => {
      if (editor.lesson.settings.forceLogin == true) {
        forceLoginButton.setAttribute("on", "");
        forceLoginButton.removeAttribute("off");
      } else {
        forceLoginButton.setAttribute("off", "");
        forceLoginButton.removeAttribute("on");
      }
      if (editor.lesson.settings.editOthersWork == true) {
        editOthersWorkButton.setAttribute("on", "");
        editOthersWorkButton.removeAttribute("off");
      } else {
        editOthersWorkButton.setAttribute("off", "");
        editOthersWorkButton.removeAttribute("on");
      }
      if (editor.lesson.settings.anonymousMode == true) {
        anonymousModeButton.setAttribute("on", "");
        anonymousModeButton.removeAttribute("off");
      } else {
        anonymousModeButton.setAttribute("off", "");
        anonymousModeButton.removeAttribute("on");
      }
      if (editor.lesson.settings.allowExport != false) {
        allowExportButton.setAttribute("on", "");
        allowExportButton.removeAttribute("off");
      } else {
        allowExportButton.setAttribute("off", "");
        allowExportButton.removeAttribute("on");
      }
      if (editor.lesson.settings.observeViewers != false) {
        observeViewersButton.setAttribute("on", "");
        observeViewersButton.removeAttribute("off");
      } else {
        observeViewersButton.setAttribute("off", "");
        observeViewersButton.removeAttribute("on");
      }

      if (toolToogleOptions != null) {
        editor.lesson.settings.disabled = editor.lesson.settings.disabled ?? [];
        for (let i = 0; i < toolToogleOptions.length; i++) {
          let tool = toolToogleOptions[i];
          let toolName = tool.getAttribute("option");
          let toolImage = toolToggle.querySelector('.eShareToolToggleBarTool[tool="' + toolName + '"]');
          if (editor.lesson.settings.disabled.includes(toolName) == false) {
            tool.setAttribute("on", "");
            tool.removeAttribute("off");
            tool.parentElement.querySelector("div[line]").style.background = "var(--hover)";
            toolImage.removeAttribute("disabled");
          } else {
            tool.setAttribute("off", "");
            tool.removeAttribute("on");
            tool.parentElement.querySelector("div[line]").style.background = "var(--lightGray)";
            toolImage.setAttribute("disabled", "");
          }
        }
      }
      if (editor.lesson.settings.observeViewers != false) {
        observeViewersButton.setAttribute("on", "");
        observeViewersButton.removeAttribute("off");
      } else {
        observeViewersButton.setAttribute("off", "");
        observeViewersButton.removeAttribute("on");
      }
    }
    editor.updateOptions();

    forceLoginButton.addEventListener("click", async () => {
      forceLoginButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "forceLogin", value: !forceLoginButton.hasAttribute("on") }, { session: editor.session });
      forceLoginButton.removeAttribute("disabled");
    });
    editOthersWorkButton.addEventListener("click", async () => {
      editOthersWorkButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "editOthersWork", value: !editOthersWorkButton.hasAttribute("on") }, { session: editor.session });
      editOthersWorkButton.removeAttribute("disabled");
    });
    anonymousModeButton.addEventListener("click", async () => {
      anonymousModeButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "anonymousMode", value: !anonymousModeButton.hasAttribute("on") }, { session: editor.session });
      anonymousModeButton.removeAttribute("disabled");
    });
    allowExportButton.addEventListener("click", async () => {
      allowExportButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "allowExport", value: !allowExportButton.hasAttribute("on") }, { session: editor.session });
      allowExportButton.removeAttribute("disabled");
    });
    observeViewersButton.addEventListener("click", async () => {
      observeViewersButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "observeViewers", value: !observeViewersButton.hasAttribute("on") }, { session: editor.session });
      observeViewersButton.removeAttribute("disabled");
    });

    toolToggleHolder.addEventListener("click", async (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let button = target.closest(".eShareActionOption");
      if (button == null) {
        return;
      }
      button.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting/tool", { set: button.getAttribute("option"), value: !button.hasAttribute("on") }, { session: editor.session });
      button.removeAttribute("disabled");
    });
  }
}