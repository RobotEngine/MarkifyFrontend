modules["editor/toolbar"] = class {
  // Text Box, Comment, Media
  html = `
  <button class="eTool" tool="select" tooltip="Selection" selected><div><svg width="26" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_306_4" maskUnits="userSpaceOnUse" x="0.192818" y="4.08914" width="36" height="44" fill="black"> <rect fill="white" x="0.192818" y="4.08914" width="36" height="44"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7602 8.2371C8.79786 5.37292 3.25704 8.19611 3.24522 13.0852L3.19284 34.7545C3.18199 39.2411 7.9192 42.1519 11.9168 40.1151L15.9383 38.066L18.0344 42.1798C19.288 44.6402 22.2989 45.6185 24.7593 44.3649L26.0925 43.6856C28.5529 42.4319 29.5312 39.4211 28.2776 36.9606L26.1815 32.8468L29.5308 31.1403C33.5284 29.1034 33.9579 23.56 30.3218 20.9316L12.7602 8.2371Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7602 8.2371C8.79786 5.37292 3.25704 8.19611 3.24522 13.0852L3.19284 34.7545C3.18199 39.2411 7.9192 42.1519 11.9168 40.1151L15.9383 38.066L18.0344 42.1798C19.288 44.6402 22.2989 45.6185 24.7593 44.3649L26.0925 43.6856C28.5529 42.4319 29.5312 39.4211 28.2776 36.9606L26.1815 32.8468L29.5308 31.1403C33.5284 29.1034 33.9579 23.56 30.3218 20.9316L12.7602 8.2371Z" fill="#2F2F2F"/> <path d="M3.24522 13.0852L0.74523 13.0792L3.24522 13.0852ZM12.7602 8.2371L14.2247 6.21101L14.2247 6.21101L12.7602 8.2371ZM3.19284 34.7545L5.69283 34.7606L3.19284 34.7545ZM11.9168 40.1151L10.7818 37.8876L10.7818 37.8876L11.9168 40.1151ZM15.9383 38.066L18.1658 36.931L17.0308 34.7035L14.8033 35.8385L15.9383 38.066ZM18.0344 42.1798L15.8068 43.3147L15.8068 43.3147L18.0344 42.1798ZM24.7593 44.3649L23.6244 42.1373L23.6244 42.1373L24.7593 44.3649ZM26.0925 43.6856L27.2274 45.9131L27.2274 45.9131L26.0925 43.6856ZM28.2776 36.9606L30.5051 35.8256L30.5051 35.8256L28.2776 36.9606ZM26.1815 32.8468L25.0465 30.6193L22.819 31.7543L23.954 33.9818L26.1815 32.8468ZM29.5308 31.1403L30.6658 33.3678L29.5308 31.1403ZM30.3218 20.9316L31.7864 18.9055L31.7864 18.9055L30.3218 20.9316ZM5.74522 13.0913C5.75211 10.2393 8.98425 8.59242 11.2956 10.2632L14.2247 6.21101C8.61146 2.15342 0.761974 6.15294 0.74523 13.0792L5.74522 13.0913ZM5.69283 34.7606L5.74522 13.0913L0.74523 13.0792L0.692844 34.7485L5.69283 34.7606ZM10.7818 37.8876C8.44987 39.0757 5.6865 37.3777 5.69283 34.7606L0.692844 34.7485C0.677478 41.1044 7.38852 45.2281 13.0517 42.3426L10.7818 37.8876ZM14.8033 35.8385L10.7818 37.8876L13.0517 42.3426L17.0733 40.2935L14.8033 35.8385ZM20.2619 41.0448L18.1658 36.931L13.7108 39.201L15.8068 43.3147L20.2619 41.0448ZM23.6244 42.1373C22.3941 42.7642 20.8887 42.275 20.2619 41.0448L15.8068 43.3147C17.6873 47.0054 22.2036 48.4729 25.8943 46.5924L23.6244 42.1373ZM24.9575 41.4581L23.6244 42.1373L25.8943 46.5924L27.2274 45.9131L24.9575 41.4581ZM26.05 38.0956C26.6769 39.3258 26.1877 40.8312 24.9575 41.4581L27.2274 45.9131C30.9181 44.0326 32.3856 39.5163 30.5051 35.8256L26.05 38.0956ZM23.954 33.9818L26.05 38.0956L30.5051 35.8256L28.409 31.7119L23.954 33.9818ZM28.3958 28.9128L25.0465 30.6193L27.3165 35.0744L30.6658 33.3678L28.3958 28.9128ZM28.8572 22.9577C30.9783 24.4909 30.7277 27.7246 28.3958 28.9128L30.6658 33.3678C36.329 30.4822 36.9375 22.629 31.7864 18.9055L28.8572 22.9577ZM11.2956 10.2632L28.8572 22.9577L31.7864 18.9055L14.2247 6.21101L11.2956 10.2632Z" fill="white" mask="url(#path-1-outside-1_306_4)"/> </svg></div></button>
  <button class="eTool" tool="draw" tooltip="Draw"><div><svg width="22" viewBox="0 0 27 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.3863 34.9812C13.2256 37.2873 15.077 39.0806 17.4087 39.846L19.7938 40.629C20.4513 40.8448 21.1712 40.5828 21.5361 39.9948L22.86 37.8619C24.1541 35.7768 24.4197 33.213 23.5803 30.9069L18.9826 18.2748L7.78855 22.3491L12.3863 34.9812Z" fill="white"/> <path d="M18.5551 17.1002L19.7297 16.6726L20.1572 17.8472L24.7549 30.4794C25.7254 33.1458 25.4184 36.1102 23.922 38.5211L22.5982 40.654C21.9291 41.732 20.6094 42.2123 19.404 41.8166L17.0188 41.0337C14.3228 40.1486 12.1822 38.0752 11.2117 35.4088L6.61393 22.7766L6.18641 21.602L7.36103 21.1745L18.5551 17.1002Z" fillcoloropacity stroke="white" stroke-width="2.5"/> <path d="M11.4928 32.5264L10.3182 32.9539L9.89068 31.7793L2.35127 11.065C0.990064 7.32509 2.91836 3.18985 6.65823 1.82865C10.3981 0.467446 14.5333 2.39574 15.8945 6.13561L23.434 26.85L23.8615 28.0246L22.6869 28.4521L11.4928 32.5264Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> </svg></div></button>
  <button class="eTool" tool="markup" tooltip="Markup"><div><svg width="26" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.1698 36.4384C13.9254 38.5143 16.2208 39.5846 18.2967 38.8291L23.9348 36.7769C26.0107 36.0214 27.0811 33.726 26.3255 31.6501L22.5633 21.3135L9.4076 26.1018L13.1698 36.4384Z" fill="white"/> <path d="M22.1358 20.1389L23.3104 19.7113L23.7379 20.8859L27.5001 31.2226C28.4918 33.9472 27.087 36.9599 24.3624 37.9516L18.7242 40.0037C15.9996 40.9954 12.9869 39.5905 11.9952 36.8659L8.23298 26.5293L7.80546 25.3547L8.98008 24.9271L22.1358 20.1389Z" fillcoloropacity stroke="white" stroke-width="2.5"/> <path d="M11.9685 33.1377L10.7938 33.5652L10.3663 32.3906L2.49986 10.7776C1.50817 8.053 2.913 5.04033 5.63764 4.04864L11.2758 1.99652C14.0004 1.00484 17.0131 2.40967 18.0048 5.1343L25.8712 26.7472L26.2988 27.9219L25.1242 28.3494L11.9685 33.1377Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> </svg></div></button> 
  <button class="eTool" tool="erase" tooltip="Erase"><div><svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1893_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_1893_2)"> <path d="M154.613 154.645L158.856 158.888L163.098 154.645L196.12 121.623C206.274 111.469 206.274 95.0072 196.12 84.8535L170.166 58.8995C160.012 48.7459 143.55 48.7459 133.396 58.8995L100.375 91.9214L96.1319 96.164L100.375 100.407L154.613 154.645Z" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M100.407 100.375L96.1646 96.1319L91.9219 100.375L58.9 133.396C48.7463 143.55 48.7463 160.012 58.9 170.166L79.1943 190.46C82.945 194.211 88.0321 196.318 93.3365 196.318L112.889 196.318C118.161 196.318 123.221 194.236 126.966 190.525L154.626 163.118L158.908 158.875L154.645 154.613L100.407 100.375Z" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg></div></button>
  <button class="eTool" tool="text" tooltip="Text Box"><div><svg width="44" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 7V3H25.5V7H17V29.5H12V7H3Z" fill="#2F2F2F"/> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fill="white"/> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fillcoloropacity/> <mask id="path-4-outside-1_925_51" maskUnits="userSpaceOnUse" x="0" y="0" width="52" height="32" fill="black"> <rect fill="white" width="52" height="32"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3V7H12V29.5H17V7H25.5V3H3ZM26.5 9L34 19L26 29.5H31.5L36.5 22.5L42 29.5H47L39.5 19L47 9H42L36.5 15.5L31.5 9H26.5Z"/> </mask> <path d="M3 7H0.5V9.5H3V7ZM3 3V0.5H0.5V3H3ZM12 7H14.5V4.5H12V7ZM12 29.5H9.5V32H12V29.5ZM17 29.5V32H19.5V29.5H17ZM17 7V4.5H14.5V7H17ZM25.5 7V9.5H28V7H25.5ZM25.5 3H28V0.5H25.5V3ZM34 19L35.9886 20.5151L37.1339 19.0119L36 17.5L34 19ZM26.5 9V6.5H21.5L24.5 10.5L26.5 9ZM26 29.5L24.0114 27.9849L20.9523 32H26V29.5ZM31.5 29.5V32H32.7865L33.5343 30.9531L31.5 29.5ZM36.5 22.5L38.4658 20.9554L36.4047 18.3322L34.4657 21.0469L36.5 22.5ZM42 29.5L40.0342 31.0446L40.7849 32H42V29.5ZM47 29.5V32H51.858L49.0343 28.0469L47 29.5ZM39.5 19L37.5 17.5L36.402 18.964L37.4657 20.4531L39.5 19ZM47 9L49 10.5L52 6.5H47V9ZM42 9V6.5H40.8405L40.0915 7.38514L42 9ZM36.5 15.5L34.5184 17.0243L36.4073 19.4798L38.4085 17.1149L36.5 15.5ZM31.5 9L33.4816 7.47572L32.731 6.5H31.5V9ZM5.5 7V3H0.5V7H5.5ZM12 4.5H3V9.5H12V4.5ZM14.5 29.5V7H9.5V29.5H14.5ZM17 27H12V32H17V27ZM14.5 7V29.5H19.5V7H14.5ZM25.5 4.5H17V9.5H25.5V4.5ZM23 3V7H28V3H23ZM3 5.5H25.5V0.5H3V5.5ZM36 17.5L28.5 7.5L24.5 10.5L32 20.5L36 17.5ZM27.9886 31.0151L35.9886 20.5151L32.0114 17.4849L24.0114 27.9849L27.9886 31.0151ZM31.5 27H26V32H31.5V27ZM34.4657 21.0469L29.4657 28.0469L33.5343 30.9531L38.5343 23.9531L34.4657 21.0469ZM43.9658 27.9554L38.4658 20.9554L34.5342 24.0446L40.0342 31.0446L43.9658 27.9554ZM47 27H42V32H47V27ZM37.4657 20.4531L44.9657 30.9531L49.0343 28.0469L41.5343 17.5469L37.4657 20.4531ZM45 7.5L37.5 17.5L41.5 20.5L49 10.5L45 7.5ZM42 11.5H47V6.5H42V11.5ZM38.4085 17.1149L43.9085 10.6149L40.0915 7.38514L34.5915 13.8851L38.4085 17.1149ZM29.5184 10.5243L34.5184 17.0243L38.4816 13.9757L33.4816 7.47572L29.5184 10.5243ZM26.5 11.5H31.5V6.5H26.5V11.5Z" fill="white" mask="url(#path-4-outside-1_925_51)"/> </svg></div></button>
  <button class="eTool" tool="shape" tooltip="Shapes"><div><svg width="38" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1.97104" y="1.47107" width="22.6493" height="22.6493" rx="5.25" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> <circle cx="32.7043" cy="33.2043" r="11.3246" fill="white" stroke="white" stroke-width="2.5"/> <circle cx="32.7043" cy="33.2043" r="11.3246" fillcoloropacity stroke="white" stroke-width="2.5"/> </svg></div></button>
  <button class="eTool" tool="sticky" tooltip="Stickies"><div><svg width="44" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_850_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_850_2)"> <path d="M185 38H72C54.3269 38 40 52.3269 40 70V183.246C40 200.801 54.1418 215.078 71.6952 215.245L145.905 215.952C150.739 215.998 155.387 214.098 158.805 210.68L211.728 157.757C215.104 154.382 217 149.803 217 145.029V70C217 52.3269 202.673 38 185 38Z" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M211 144H171C156.641 144 145 155.641 145 170V210" stroke="white" stroke-width="12"/> <rect x="62" y="60" width="133" height="20" rx="10" fill="white"/> <rect x="62" y="88" width="101" height="20" rx="10" fill="white"/> </g> </svg></div></button>
  <button class="eTool" tool="page" tooltip="Page"><div><svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2372_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2372_2)"> <path d="M169 41H87C72.6406 41 61 52.6406 61 67V188.211C61 202.487 72.5109 214.093 86.7864 214.21L168.786 214.884C183.229 215.002 195 203.327 195 188.885V67C195 52.6406 183.359 41 169 41Z" fill="white" stroke="white" stroke-width="24"/> <path d="M169 47H87C75.9543 47 67 55.9543 67 67V188.211C67 199.193 75.8545 208.12 86.8357 208.21L168.836 208.884C179.945 208.975 189 199.994 189 188.885V67C189 55.9543 180.046 47 169 47Z" stroke="#2F2F2F" stroke-width="12"/> <path d="M68 58C68 52.4772 72.4772 48 78 48H156V64C156 69.5228 151.523 74 146 74H68V58Z" fill="#2F2F2F"/> </g> </svg></div></button>
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
  `;
  css = {
    ".eToolbar .content": `scrollbar-width: none`,
    ".eToolbar .content::-webkit-scrollbar": `display: none`,

    ".eTool": `--hoverColor: var(--hover); width: 50px; height: 50px; flex-shrink: 0; padding: 0; transition: opacity .3s`,
    ".eTool > div": `display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; transition: .2s; overflow: hidden`,
    ".eTool:hover > div": `background: var(--hoverColor)`,
    ".eTool:active": `transform: unset !important`,
    ".eTool:active > div": `transform: scale(.95); border-radius: 15.5px`,
    ".eTool[option]:active > div": `background: var(--secondary);border-radius: 25px`,
    ".eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eTool[selected][option]:active > div": `border-radius: 25px !important`,
    ".eTool[selected] > div": `background: var(--theme); border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important`,
    ".eTool[selected][option] > div": `background: var(--secondary)`,
    ".eTool[selecthighlight] > div": `background: var(--theme); border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important`,
    ".eTool[selecthighlight]:active > div": `border-radius: 15.5px !important`,
    ".eTool[off]": `opacity: 0.5`,

    ".eTool[soon]": `opacity: 0.5`, // TEMP CODE

    ".eDivider": `width: 100%; height: 4px; background: var(--hover)`,
    ".eVerticalDivider": `flex-shrink: 0; width: 4px; height: 100%; background: var(--hover)`,

    ".eSubToolHolder": `position: absolute; max-height: 100%; left: 100%; top: 0px; background: var(--pageColor); border-radius: 0 16px 16px 0; border-left: solid 4px var(--theme); transform: scale(0); transform-origin: top left; transition: opacity .3s, transform: .3s`,
    ".eSubToolHolder[option]": `border-left-color: var(--secondary)`,
    ".eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 20px 16px 0; left: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `overflow: hidden; border-radius: inherit`,
    ".eSubToolContentScroll": `width: fit-content; overflow: auto`,
    ".eSubToolHolder[option] .eSubToolContentScroll": `overflow: visible`,
    ".eSubToolContent": `display: flex; flex-wrap: wrap; gap: 6px`,

    ".eToolHoverTooltip": `position: absolute; display: flex; width: max-content; padding: 3px 6px; background: var(--pageColor); border-radius: 6px; box-shadow: var(--lightShadow); pointer-events: none; user-select: none; text-wrap: nowrap; font-size: 16px; font-weight: 600; transform: scale(0); opacity: 0`,
    
    ".eSelect": `position: absolute; left: 0px; top: 0px; opacity: 0; z-index: 101; border-radius: 9px; transition: opacity .15s, transform 0s; pointer-events: none`,
    ".eSelect[tooleditor]": `z-index: 102`,
    ".eSelectActive": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: all !important; cursor: move; z-index: var(--selectZIndex)`,
    ".eContent[noshiftheld] .eSelectActive": `z-index: var(--annoZIndex) !important`,
    ".eAnnotation[selected] > *": `pointer-events: none`,
    ".eSelectTooltip": `position: absolute; transition: .1s; pointer-events: all; --scale: 1`,
    '.eSelectTooltip:hover': `--scale: 1.3`,
    '.eSelectTooltip:active': `--scale: 1.1 !important`,
    ".eSelect[hidetips] .eSelectTooltip": `opacity: 0; pointer-events: none`,
    ".eSelect[notransition] .eSelectTooltip[duplicate]": `opacity: 0; pointer-events: none`,
    '.eSelectTooltip[tooltip="movetop"]': `width: 100%; height: 10px; top: -10px; cursor: move`,
    '.eSelectTooltip[tooltip="movebottom"]': `width: 100%; height: 10px; bottom: -10px; cursor: move`,
    '.eSelectTooltip[tooltip="moveleft"]': `width: 10px; height: 100%; left: -10px; cursor: move`,
    '.eSelectTooltip[tooltip="moveright"]': `width: 10px; height: 100%; right: -10px; cursor: move`,
    '.eSelectTooltip[tooltip="topleft"]': `left: -10px; top: -10px; cursor: nwse-resize`,
    '.eSelectTooltip[tooltip="topright"]': `right: -10px; top: -10px; cursor: nesw-resize`,
    '.eSelectTooltip[tooltip="bottomleft"]': `left: -10px; bottom: -10px; cursor: nesw-resize`,
    '.eSelectTooltip[tooltip="bottomright"]': `right: -10px; bottom: -10px; cursor: nwse-resize`,
    '.eSelectTooltip[tooltip="left"]': `left: -14px; top: 50%; transform: translateY(-50%); cursor: ew-resize`,
    '.eSelectTooltip[tooltip="right"]': `right: -14px; top: 50%; transform: translateY(-50%); cursor: ew-resize`,
    '.eSelectTooltip[tooltip="top"]': `left: 50%; top: -14px; transform: translateX(-50%); cursor: ns-resize`,
    '.eSelectTooltip[tooltip="bottom"]': `left: 50%; bottom: -14px; transform: translateX(-50%); cursor: ns-resize`,
    '.eSelectTooltip[tooltip="rotate"]': `left: -28px; bottom: -28px; cursor: crosshair`,
    ".eSelectDrag": `position: absolute; box-sizing: border-box; pointer-events: none; z-index: 99; opacity: 0; background: var(--secondary); border: solid 2px var(--theme); border-radius: 10px; transition: opacity .1s`,
    ".eSelectTooltip[duplicate]": `opacity: 0; pointer-events: none`,
    ".eSelect[showduplicate] .eSelectTooltip[duplicate]": `opacity: 1 !important; pointer-events: all !important`,
    '.eSelectTooltip[tooltip="duplicateleft"]': `left: -50px; top: 50%; transform: translateY(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectTooltip[tooltip="duplicateright"]': `right: -50px; top: 50%; transform: translateY(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectTooltip[tooltip="duplicatetop"]': `left: 50%; top: -50px; transform: translateX(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectTooltip[tooltip="duplicatebottom"]': `left: 50%; bottom: -50px; transform: translateX(-50%) scale(var(--scale)); cursor: pointer`,

    ".eSelectSnap": `position: absolute; left: 0px; top: 0px; z-index: 102; background: var(--secondary); border-radius: 1px; pointer-events: none`,
    ".eSelectSnap div[marker]": `position: absolute; z-index: 102; background: var(--secondary); border-radius: 1px; pointer-events: none`,
    '.eSelectSnap div[marker="snapxleft"]': `width: 2px; height: 16px; left: 0px; top: 50%; transform: translateY(-50%)`,
    '.eSelectSnap div[marker="snapxright"]': `width: 2px; height: 16px; right: 0px; top: 50%; transform: translateY(-50%)`,
    '.eSelectSnap div[marker="snapytop"]': `width: 16px; height: 2px; top: 0px; left: 50%; transform: translateX(-50%)`,
    '.eSelectSnap div[marker="snapybottom"]': `width: 16px; height: 2px; bottom: 0px; left: 50%; transform: translateX(-50%)`,

    ".eSelectBar": `position: absolute; display: flex; max-width: calc(100vw - 88px); height: 50px; background: var(--pageColor); box-shadow: var(--shadow); z-index: 102; border-radius: 16px; transform: translateY(-10%); opacity: 0; transition: transform .2s, opacity .2s, border-radius .2s`,
    ".eSelectHolder": `display: flex; width: 100%; height: 100%; gap: 6px; overflow: auto; border-radius: inherit`,
    ".eSelectHolder::-webkit-scrollbar": `display: none`,
    ".eSelectHolder[locked] > *": `display: none`,
    ".eSelectHolder .eTool[stayonlock]": `display: unset`,
    ".eActionContainer": `position: absolute; max-width: 100%; background: var(--pageColor)`,
    ".eActionContainer[top]": `--shadowPadding: 20px 16px 0; --shadowBottom: -4px; --shadowTop: 16px; bottom: 100%; border-radius: 16px 16px 0 0; border-bottom: solid 4px var(--theme); transform-origin: bottom center`,
    ".eActionContainer[bottom]": `--shadowPadding: 0 16px 20px; --shadowBottom: -16px; --shadowTop: 0px; top: 100%; border-radius: 0 0 16px 16px; border-top: solid 4px var(--theme); transform-origin: top center`,
    ".eActionShadow": `position: absolute; width: 100%; height: 100%; padding: var(--shadowPadding); bottom: var(--shadowBottom); left: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eActionShadow:after": `position: absolute; width: calc(100% - 32px); height: calc(100% - 16px); left: 16px; top: var(--shadowTop); content: ""; box-shadow: var(--shadow); border-radius: inherit`,
    ".eActionContainerHolder": `width: 100%; height: 100%; overflow: hidden; border-radius: inherit`,
    ".eActionContainerScroll": `width: fit-content; border-radius: inherit`, //; overflow: auto
    ".eActionContainerContent": `flex-wrap: wrap; gap: 6px; border-radius: inherit`
  };
  tools= {
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
    "page": { id: "page", type: "tool", module: "pages/editor/toolbar/page" },
    "sticky": { id: "sticky", type: "tool", module: "pages/editor/toolbar/sticky" },
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
        tooltip: "Embed",
        type: "tool",
        //soon: true,
        module: "pages/editor/toolbar/embed",
        image: `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_136_99" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_136_99)"> <rect x="40" y="67" width="177" height="122" rx="32" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M106 144.033V110.967C106 104.784 112.714 100.938 118.047 104.066L146.235 120.599C151.505 123.691 151.505 131.309 146.235 134.401L118.047 150.934C112.714 154.062 106 150.216 106 144.033Z" fill="white"/> </g> </svg>`
      }
    ]
  };
  subToolTypes = {
    draw: ["draw"],
    markup: ["markup"],
    shape: ["shape"],
    text: ["text"],
    sticky: ["sticky"],
    page: ["page"],
    media: ["media", "embed"]
  };
  checkSubToolType = function (editor, check) {
    let disabled = editor.lesson.settings.disabled ?? [];
    for (let i = 0; i < disabled.length; i++) {
      let subTool = this.subToolTypes[disabled[i]];
      if (subTool != null && subTool.includes(check) == true) {
        return true;
      }
    }
  }
  loadedModules = {};
  getModule = async function (path) {
    let module = this.loadedModules[path] ?? await this.loadModule(path);
    this.loadedModules[path] = module;
    return module;
  }
  js = async function (frame) {
    let editor = this.parent;
    let utils = editor.utils;
    let alertModule = await this.loadModule("alert");
    editor.toolbar = this;
    this.cursor = await this.getModule("pages/editor/toolbar/cursor");

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
    let pageHolder = content.querySelector(".ePageHolder");

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
      let element = hoverElem.closest("button[tool], button[subtool], button[option], button[action]");
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

    let toolEvents = [];
    this.disableTool = async () => {
      for (let i = 0; i < toolEvents.length; i++) {
        let remEvent = toolEvents[i];
        remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
        delete tempListeners[remEvent.remID];
      }
      toolEvents = [];
      if (this.endToolEvent != null) {
        this.endToolEvent();
        this.endToolEvent = null;
      }
      body.style.removeProperty("user-select");
      editor.page.style.removeProperty("touch-action");
      editor.page.removeAttribute("enabled");
      editor.pinchZoomDisable = false;
      editor.usingStylus = false;
      utils.clearSelection();
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
      await this.cursor.endAction();
      editor.selecting = {};
      this.cursor.updateBox();
      if (editor.lastZoom != null && editor.zoomChanged == false) {
        editor.setZoom(editor.lastZoom, null, { clientX: fixed.offsetWidth / 2, clientY: fixed.offsetHeight / 2 });
        editor.lastZoom = null;
      }
    }
    let tempToolListen = (parent, listen, runFunc, extra) => {
      parent.addEventListener(listen, runFunc, extra);
      let listener = { type: "event", parent: parent, name: listen, listener: runFunc };
      listener.remID = addTempListener(listener);
      toolEvents.push(listener);
    }
    let mouseSVG;
    this.currentToolModule = "pages/editor/toolbar/cursor";
    let pageContent = editor.page.querySelector(".eContent");
    this.enableTool = async (extra) => {
      this.disableTool();
      let module;
      if (this.currentToolModule != null) {
        module = await this.getModule(this.currentToolModule);
      }
      if (module != null) {
        module.js(editor, utils, tempToolListen, {
          tool: selectedSubtoolToolID,
          ...(extra ?? {})
        });
      }
      module = module ?? {};
      editor.realtime.tool = module.realtimeTool ?? 0;
      //editor.selecting = {};
      editor.realtime.passthrough = module.publish;
      if (editor.realtime.module != null && editor.realtime.module.publishShort != null) {
        editor.realtime.module.publishShort();
      }
      if (module.mouse == "default") {
        pageContent.style.removeProperty("cursor");
        mouseSVG = null;
      } else if (module.mouse == "grab") {
        pageContent.style.cursor = "grab";
        mouseSVG = null;
      } else {
        let setSVG = module.mouse ?? `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_231_14)"> <mask id="path-1-outside-1_231_14" maskUnits="userSpaceOnUse" x="28" y="27" width="21" height="28" fill="black"> <rect fill="white" x="28" y="27" width="21" height="28"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M34.7886 30.574C32.8075 29.1419 30.0371 30.5535 30.0312 32.998L30 45.8878C29.9946 48.1311 32.3632 49.5865 34.362 48.5681L36.9809 47.2337L38.5573 50.3275C39.3465 51.8764 41.2418 52.4922 42.7907 51.703C44.3396 50.9138 44.9554 49.0185 44.1662 47.4696L42.5899 44.3757L44.8395 43.2295C46.8383 42.2111 47.053 39.4394 45.235 38.1252L34.7886 30.574Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M34.7886 30.574C32.8075 29.1419 30.0371 30.5535 30.0312 32.998L30 45.8878C29.9946 48.1311 32.3632 49.5865 34.362 48.5681L36.9809 47.2337L38.5573 50.3275C39.3465 51.8764 41.2418 52.4922 42.7907 51.703C44.3396 50.9138 44.9554 49.0185 44.1662 47.4696L42.5899 44.3757L44.8395 43.2295C46.8383 42.2111 47.053 39.4394 45.235 38.1252L34.7886 30.574Z" fill="#2F2F2F"/> <path d="M30.0312 32.998L28.0312 32.9932L30.0312 32.998ZM34.7886 30.574L33.617 32.1949L33.617 32.1949L34.7886 30.574ZM30 45.8878L28 45.883L30 45.8878ZM34.362 48.5681L33.454 46.786L33.454 46.786L34.362 48.5681ZM36.9809 47.2337L38.7629 46.3257L37.8549 44.5437L36.0729 45.4516L36.9809 47.2337ZM38.5573 50.3275L40.3393 49.4195L40.3393 49.4195L38.5573 50.3275ZM42.7907 51.703L43.6987 53.485L43.6987 53.485L42.7907 51.703ZM44.1662 47.4696L45.9483 46.5616L45.9483 46.5616L44.1662 47.4696ZM42.5899 44.3757L41.6819 42.5937L39.8999 43.5017L40.8078 45.2837L42.5899 44.3757ZM44.8395 43.2295L45.7475 45.0115L44.8395 43.2295ZM45.235 38.1252L46.4067 36.5043L46.4067 36.5043L45.235 38.1252ZM32.0312 33.0029C32.0331 32.188 32.9566 31.7175 33.617 32.1949L35.9603 28.9531C32.6584 26.5663 28.041 28.9189 28.0312 32.9932L32.0312 33.0029ZM32 45.8926L32.0312 33.0029L28.0312 32.9932L28 45.883L32 45.8926ZM33.454 46.786C32.7877 47.1255 31.9982 46.6404 32 45.8926L28 45.883C27.991 49.6218 31.9387 52.0475 35.27 50.3501L33.454 46.786ZM36.0729 45.4516L33.454 46.786L35.27 50.3501L37.8889 49.0157L36.0729 45.4516ZM40.3393 49.4195L38.7629 46.3257L35.1989 48.1416L36.7753 51.2355L40.3393 49.4195ZM41.8827 49.921C41.318 50.2087 40.627 49.9842 40.3393 49.4195L36.7753 51.2355C38.0659 53.7685 41.1657 54.7757 43.6987 53.485L41.8827 49.921ZM42.3842 48.3776C42.672 48.9423 42.4474 49.6333 41.8827 49.921L43.6987 53.485C46.2318 52.1944 47.2389 49.0947 45.9483 46.5616L42.3842 48.3776ZM40.8078 45.2837L42.3842 48.3776L45.9483 46.5616L44.3719 43.4678L40.8078 45.2837ZM43.9315 41.4475L41.6819 42.5937L43.4978 46.1578L45.7475 45.0115L43.9315 41.4475ZM44.0633 39.7461C44.6693 40.1841 44.5978 41.108 43.9315 41.4475L45.7475 45.0115C49.0788 43.3141 49.4367 38.6946 46.4067 36.5043L44.0633 39.7461ZM33.617 32.1949L44.0633 39.7461L46.4067 36.5043L35.9603 28.9531L33.617 32.1949Z" fill="white" mask="url(#path-1-outside-1_231_14)"/> </g> <defs> <filter id="filter0_d_231_14" x="24" y="23.9961" width="28.4775" height="34.0508" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_231_14"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_231_14" result="shape"/> </filter> </defs> </svg>`;
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
              let module = await this.getModule(toolData.module);
              let buttonHolder = newSubItem.querySelector("div");
              buttonHolder.innerHTML = module.button;
              if (module.tooltip != null) {
                newSubItem.setAttribute("tooltip", module.tooltip);
              }
            }
          }

          let selectTool = override ?? (preferences[toolID] ?? {}).subtool;
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
    let showSubSubtoolUI = async (button, extra) => {
      if (mainSubSubtoolButton == button) {
        this.closeSubSubtoolUI();
        button.removeAttribute("selected");
        return;
      }
      mainSubSubtoolButton = button;

      let module = await this.getModule(button.getAttribute("option"));
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
    this.setCurrentTool = async (element, override, extra) => {
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
      if (element.hasAttribute("off")) {
        alertModule.open("warning", "<b>Tool Toggle</b>The lesson owner has disabled this tool.");
        return;
      }
      if (element.hasAttribute("noselect") == true) {
        return;
      }
      let setToolID = element.getAttribute("tool");
      if (setToolID != null) {
        let self = editor.getSelf();
        let disabledTools = (editor.lesson.settings ?? {}).disabled ?? [];
        if (self.access < 4 && disabledTools.includes(setToolID) == true) {
          return;
        }
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
        selectedToolID = setToolID;
        await showSubtoolUI(element);
        //this.currentToolModule = element.getAttribute("module");
      } else if (element.hasAttribute("subtool") == true) {
        selectedSubtoolToolID = element.getAttribute("subtool");
        if (preferences[selectedToolID].subtool != null) {
          preferences[selectedToolID].subtool = selectedSubtoolToolID;
        }
        this.currentToolModule = element.getAttribute("module");
        await this.updateToolbar(null, extra);
        this.closeSubSubtoolUI();
      } else if (element.hasAttribute("option") == true && element.getAttribute("option").length > 0) {
        await showSubSubtoolUI(element);
      }
    }
    frame.addEventListener("mousedown", (event) => {
      this.setCurrentTool(event.target);
    });
    frame.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.setCurrentTool(event.target); 
      }
    });

    this.updateToolbar = (noUpdateTool, extra) => {
      let updateColors = frame.querySelectorAll("[fillcoloropacity], [strokecolor], [backcolor], [thickness], [opacity]");
      for (let i = 0; i < updateColors.length; i++) {
        let updateTip = updateColors[i];
        let parent = updateTip.closest("[tool]");
        let toolPref = preferences[parent.getAttribute("tool")];
        if (toolPref != null) {
          let setOpacity = (toolPref.opacity ?? 0) / 100;
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
        this.enableTool(extra);
      }
      editor.savePreferences();
    }
    this.updateToolbar();

    let toolElements = frame.querySelectorAll(".eTool[tool]");
    this.checkToolToggle = () => {
      if (editor.lesson == null) {
        return;
      }
      let self = editor.getSelf();
      let disabledTools = (editor.lesson.settings ?? {}).disabled ?? [];
      for (let i = 0; i < toolElements.length; i++) {
        let tool = toolElements[i];
        if (self.access > 3 || disabledTools.includes(tool.getAttribute("tool")) == false) {
          tool.removeAttribute("off");
        } else {
          tool.setAttribute("off", "");
        }
      }
      if (disabledTools.includes(selectedToolID) == true) {
        alertModule.open("warning", "<b>Tool Toggle</b>Your current tool was disabled by the lesson owner.");
        this.setCurrentTool(frame.querySelector('.eTool[tool="select"]'));
      }
    }
    this.checkToolToggle();

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
    let undoAction = async () => {
      if (undoButton.hasAttribute("disabled") == true) {
        return;
      }
      let event = utils.history[utils.location];
      if (event == null) {
        return;
      }
      utils.location--; // Remove one from location
      let addRedo = event.redo.length < 1;
      let keys = Object.keys(editor.selecting);
      let annoContentTx;
      //let sync = getEpoch();
      switch (event.type) {
        case "update":
          for (let i = 0; i < event.changes.length; i++) {
            let change = event.changes[i];
            if (change.parent != null) {
              if (((editor.annotations[change.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Annotation is missing, invalid save
              }
            }
            change.sync = getEpoch();
            if (addRedo) {
              let changeKeys = Object.keys(change);
              let annotation = (editor.annotations[change._id] ?? {}).render ?? {};
              let redoAnno = { _id: change._id };
              for (let u = 0; u < changeKeys.length; u++) {
                redoAnno[changeKeys[u]] = annotation[changeKeys[u]];
              }
              event.redo.push(JSON.parse(JSON.stringify(redoAnno)));
            }
            //if (editor.selecting[event.redo[i]._id] != null) {
            //  editor.selecting[event.changes[i]._id] = { ...editor.selecting[event.changes[i]._id], ...change };
            //} else {
            //editor.realtimeSelect[change._id] = { ...change, done: true };
            //}
            annoContentTx = editor.page.querySelector('.eAnnotation[anno="' + change._id + '"] div[contenteditable]');
            if (annoContentTx != null) {
              annoContentTx.removeAttribute("contenteditable");
            }
            //await utils.save(change, null, sync);
            editor.selecting[change._id] = change;
          }
          break;
        case "remove":
          for (let i = 0; i < event.changes.length; i++) {
            let change = { remove: true };
            let changeID = event.changes[i]._id;
            let annotation = (editor.annotations[changeID] ?? {}).render ?? {};
            if (addRedo) {
              let [x, y] = editor.getAbsolutePosition(annotation);
              event.redo.push(JSON.parse(JSON.stringify({ ...annotation, parent: null, p: [x, y] })));
            }
            //editor.realtimeSelect[changeID] = { ...change, done: true };
            //await utils.save({ _id: changeID, ...change }, null, sync, true);
            editor.selecting[changeID] = { _id: changeID, ...change };
            //delete editor.selecting[changeID];
          }
          break;
        case "add":
          for (let i = 0; i < event.changes.length; i++) {
            let saveAnno = event.changes[i];
            if (saveAnno.parent != null) {
              if (((editor.annotations[saveAnno.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Annotation is missing, invalid save
              }
            }
            let oldID = saveAnno._id;
            //delete editor.annotations[oldID];
            let tempID = utils.tempID();
            for (let h = 0; h < utils.history.length; h++) {
              let event = utils.history[h];
              for (let c = 0; c < event.changes.length; c++) {
                let change = event.changes[c];
                if (change._id == oldID) {
                  change._id = tempID;
                }
                if (change.parent == oldID) {
                  change.parent = tempID;
                }
              }
              for (let c = 0; c < event.redo.length; c++) {
                let change = event.redo[c];
                if (change._id == oldID) {
                  change._id = tempID;
                }
                if (change.parent == oldID) {
                  change.parent = tempID;
                }
              }
            }
            if (addRedo) {
              event.redo.push({ remove: true, _id: tempID });
            }
            if (saveAnno.parent != null) {
              if (((editor.annotations[saveAnno.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Annotation is missing, invalid save
              }
            }
            let saveClone = JSON.parse(JSON.stringify(saveAnno));
            //editor.realtimeSelect[tempID] = { ...saveClone, done: true };
            //await utils.save({ ...saveClone, _id: tempID }, null, sync);
            editor.selecting[tempID] = { ...saveClone, _id: tempID };
          }
      }

      this.cursor.action = "save";
      await this.cursor.endAction(null, true, keys);

      await this.cursor.redrawActionUI();
      utils.updateHistory();

      if (annoContentTx != null) {
        annoContentTx.setAttribute("contenteditable", "true");
        await sleep(1);
      }

      if (event.caret != null) {
        if (event.caret.undoElement != null) {
          event.caret.undoElement.focus();
          utils.setCaretPosition(event.caret.undoElement, event.caret.undoPosition);
        }
      }
    }
    let redoAction = async () => {
      if (redoButton.hasAttribute("disabled") == true) {
        return;
      }
      utils.location++; // Add one to location
      let event = utils.history[utils.location];
      if (event == null) {
        return;
      }
      let keys = Object.keys(editor.selecting);
      let annoContentTx;
      //let sync = getEpoch();
      switch (event.type) {
        case "update":
          for (let i = 0; i < event.redo.length; i++) {
            let change = event.redo[i];
            //if (editor.selecting[event.redo[i]._id] != null) {
            //  editor.selecting[event.redo[i]._id] = { ...editor.selecting[event.redo[i]._id], ...change };
            //} else {
            if (change.parent != null) {
              if (((editor.annotations[change.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Annotation is missing, invalid save
              }
            }
            //editor.realtimeSelect[change._id] = { ...change, done: true };
            //}
            annoContentTx = editor.page.querySelector('.eAnnotation[anno="' + change._id + '"] div[contenteditable]');
            if (annoContentTx != null) {
              annoContentTx.removeAttribute("contenteditable");
            }
            //await utils.save(change, null, sync);
            editor.selecting[change._id] = change;
          }
          break;
        case "remove": // Sort of Add
          for (let i = 0; i < event.redo.length; i++) {
            let saveAnno = event.redo[i];
            if (saveAnno.parent != null) {
              if (((editor.annotations[saveAnno.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Annotation is missing, invalid save
              }
            }
            let oldID = saveAnno._id;
            //delete editor.annotations[oldID];
            let tempID = utils.tempID();
            for (let h = 0; h < utils.history.length; h++) {
              let event = utils.history[h];
              for (let c = 0; c < event.redo.length; c++) {
                let change = event.redo[c];
                if (change._id == oldID) {
                  change._id = tempID;
                }
                if (change.parent == oldID) {
                  change.parent = tempID;
                }
              }
              for (let c = 0; c < event.changes.length; c++) {
                let change = event.changes[c];
                if (change._id == oldID) {
                  change._id = tempID;
                }
                if (change.parent == oldID) {
                  change.parent = tempID;
                }
              }
            }
            if (saveAnno.parent != null) {
              if (((editor.annotations[saveAnno.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Annotation is missing, invalid save
              }
            }
            let saveClone = JSON.parse(JSON.stringify(saveAnno));
            //editor.realtimeSelect[tempID] = { ...saveClone, done: true };
            //await utils.save({ ...saveClone, _id: tempID }, null, sync);
            editor.selecting[tempID] = { ...saveClone, _id: tempID };
          }
          break;
        case "add": // Sort of Remove
          for (let i = 0; i < event.redo.length; i++) {
            let change = { remove: true };
            let changeID = event.redo[i]._id;
            //editor.realtimeSelect[changeID] = { ...change, done: true };
            //await utils.save({ _id: changeID, ...change }, null, sync);
            editor.selecting[changeID] = change;
            //delete editor.selecting[changeID];
          }
      }
      
      this.cursor.action = "save";
      await this.cursor.endAction(null, true, keys);
      
      await this.cursor.redrawActionUI();
      utils.updateHistory();

      if (annoContentTx != null) {
        annoContentTx.setAttribute("contenteditable", "true");
        await sleep(1);
      }

      if (event.caret != null) {
        if (event.caret.redoElement != null) {
          event.caret.redoElement.focus();
          utils.setCaretPosition(event.caret.redoElement, event.caret.redoPosition);
        }
      }
    }
    undoButton.addEventListener("click", undoAction);
    redoButton.addEventListener("click", redoAction);

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

    // COPY / PASTE
    let fileUpload = async (items, event) => {
      if (editor.getSelf().access < 1) {
        return;
      }
      let activatedTool = false;
      for (let i = 0; i < items.length; i++) {
        let file = items[i];
        if (file != null) {
          if (file.kind == "file") {
            file = file.getAsFile();
          }
          if (file.kind != "string") {
            if (file.type.substring(0, 6) == "image/") {
              let mediaTool = frame.querySelector('.eTool[tool="media"]');
              if (mediaTool.hasAttribute("selected") == false) {
                await this.setCurrentTool(mediaTool);
              }
              await this.setCurrentTool(frame.querySelector('.eTool[subtool="upload"]'), null, { file: file, event: event });
              activatedTool = true;
              return true;
            }
          }
        }
      }
      return activatedTool;
    }
    tempListen(editor.page, "drop", (event) => {
      fileUpload(event.dataTransfer.items, event);
      event.preventDefault();
      event.stopPropagation();
    });
    tempListen(editor.page, "dragover", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "copy";
    });
    tempListen(window, "paste", async (event) => {
      let self = editor.getSelf();
      if (self.access < 1) {
        return;
      }
      let data = event.clipboardData ?? event.originalEvent.clipboardData ?? {};
      if (document.activeElement != null) {
        if (document.activeElement.closest("[contenteditable]") != null || document.activeElement.closest("input") != null) {
          return;
        }
      }
      if (data.items.length > 0) {
        if (fileUpload(data.items) == true) {
          event.preventDefault();
          return;
        } else {
          let html = data.getData("text/html");
          let startIndex = html.indexOf("(markify+copypaste)"); // 19 chars
          let endIndex = html.indexOf("(/markify+copypaste)");
          if (startIndex > -1 && endIndex > -1) {
            let markifyData = JSON.parse(decodeURIComponent(html.substring(startIndex + 19, endIndex)));
            if (markifyData.length < 1) {
              return;
            }
            let pageRect = pageHolder.getBoundingClientRect();
            let pageTopLeftX = -pageRect.left / editor.zoom;
            let pageTopLeftY = -pageRect.top / editor.zoom;
            let pageBottomRightX = (fixed.offsetWidth - pageRect.left) / editor.zoom;
            let pageBottomRightY = (fixed.offsetHeight - pageRect.top) / editor.zoom;
            let newSelect = {};
            let newNewSelect = {};
            let setTempSync = getEpoch();
            let minLeft;
            let minTop;
            let maxLeft;
            let maxTop;
            //let maxZIndex;
            let minZIndex;
            let parentIDs = {};
            for (let i = 0; i < markifyData.length; i++) {
              let newAnno = markifyData[i];
              let tempID = utils.tempID();
              parentIDs[newAnno._id] = tempID;
              newAnno.oldID = newAnno._id;
              newAnno._id = tempID;
              newAnno.p = newAnno.p ?? [0, 0];
              let [x, y] = newAnno.p;
              let [width, height] = newAnno.s;
              let thick = 0;
              if (newAnno.t != null) {
                if (newAnno.b != "none" || newAnno.d == "line") {
                  thick = newAnno.t;
                }
              }
              if (width < 0) {
                width = -width;
                x -= width;
              }
              if (height < 0) {
                height = -height;
                y -= height;
              }
              let halfT = thick / 2;

              let radian = (newAnno.r ?? 0) * (Math.PI / 180);
              let thickWidth = width + thick;
              let thickHeight = height + thick;
              let changedWidth = ((Math.abs(thickWidth * Math.cos(radian)) + Math.abs(thickHeight * Math.sin(radian))) - thickWidth) / 2;
              let changedHeight = ((Math.abs(thickWidth * Math.sin(radian)) + Math.abs(thickHeight * Math.cos(radian))) - thickHeight) / 2;
              
              x += halfT - changedWidth;
              y += halfT - changedHeight;
              width = thickWidth + (changedWidth * 2);
              height = thickHeight + (changedHeight * 2);
              
              if (x < minLeft || minLeft == null) {
                minLeft = x;
              }
              if (y < minTop || minTop == null) {
                minTop = y;
              }
              if ((x + width) > maxLeft || maxLeft == null) {
                maxLeft = x + width;
              }
              if ((y + height) > maxTop || maxTop == null) {
                maxTop = y + height;
              }
              //maxZIndex = Math.max(maxZIndex ?? newAnno.l ?? utils.maxLayer, newAnno.l ?? utils.maxLayer);
              minZIndex = Math.min(minZIndex ?? newAnno.l ?? utils.minLayer, newAnno.l ?? utils.minLayer);
            }
            //maxZIndex++;
            let centerX = (maxLeft - minLeft) / 2;
            let centerY = (maxTop - minTop) / 2;
            for (let i = 0; i < markifyData.length; i++) {
              let newAnno = markifyData[i];
              if (self.access < 4 && this.checkSubToolType(editor, newAnno.f) == true) {
                continue;
              }
              let existingAnno = (editor.annotations[newAnno.oldID] ?? {}).render;
              if (existingAnno != null) {
                let [x, y] = editor.getAbsolutePosition(existingAnno, true);
                let [width, height] = existingAnno.s;
                let thick = 0;
                if (existingAnno.t != null) {
                  if (existingAnno.b != "none" || existingAnno.d == "line") {
                    thick = existingAnno.t;
                  }
                }
                if (width < 0) {
                  width = -width;
                  x -= width;
                }
                if (height < 0) {
                  height = -height;
                  y -= height;
                }
                let halfT = thick / 2;

                let radian = (existingAnno.r ?? 0) * (Math.PI / 180);
                let thickWidth = width + thick;
                let thickHeight = height + thick;
                let changedWidth = ((Math.abs(thickWidth * Math.cos(radian)) + Math.abs(thickHeight * Math.sin(radian))) - thickWidth) / 2;
                let changedHeight = ((Math.abs(thickWidth * Math.sin(radian)) + Math.abs(thickHeight * Math.cos(radian))) - thickHeight) / 2;
                
                x += halfT - changedWidth;
                y += halfT - changedHeight;
                width = thickWidth + (changedWidth * 2);
                height = thickHeight + (changedHeight * 2);
                if (x + width > pageTopLeftX && x < pageBottomRightX && y + height > pageTopLeftY && y < pageBottomRightY) {
                  newAnno.p[0] = (newAnno.p[0] ?? existingAnno.p[0]) + 50;
                  newAnno.p[1] = (newAnno.p[1] ?? existingAnno.p[1]) + 50;
                } else {
                  existingAnno = null;
                }
              }
              delete newAnno.oldID;
              if (existingAnno == null) {
                let { x, y } = await utils.scaleToDoc(fixed.offsetWidth / 2, fixed.offsetHeight / 2);
                newAnno.p[0] += x + centerX - maxLeft;
                newAnno.p[1] += y + centerY - maxTop;
              }
              newAnno.l = utils.maxLayer + 1 + ((newAnno.l ?? utils.maxLayer) - minZIndex);
              if (newAnno.parented != null) {
                let parentCopy = parentIDs[newAnno.parented.parent];
                if (parentCopy != null) {
                  newAnno.parent = parentCopy;
                  newAnno.p[0] = newAnno.parented.x;
                  newAnno.p[1] = newAnno.parented.y;
                }
                delete newAnno.parented;
              }
              newNewSelect[newAnno._id] = {};
              /*if (["page"].includes(newAnno.f) == false) {
                newAnno.l = (newAnno.l ?? utils.maxLayer) + 1;
              } else {
                newAnno.l = (newAnno.l ?? utils.minLayer) - 1;
              }*/
              newAnno.sync = setTempSync;
              delete newAnno.m;
              newSelect[newAnno._id] = newAnno;
            }
            editor.selecting = newSelect;
            this.cursor.action = "save";
            await this.cursor.endAction();
            editor.selecting = newNewSelect;
            this.cursor.updateBox();
          }
        }
      }
    });
    tempListen(window, "copy", (event) => {
      let selection = document.getSelection();
      if (selection.toString().length > 0) {
        return; // User it selecting text, ignore event
      }
      let data = event.clipboardData ?? event.originalEvent.clipboardData ?? {};

      let saveTextData = "";
      let saveAnnoData = [];

      let selectKeys = Object.keys(editor.selecting);
      let checkChunks = [];
      //let maxZIndex;
      //let minZIndex;
      for (let i = 0; i < selectKeys.length; i++) {
        let annoID = selectKeys[i];
        let annotation = (editor.annotations[annoID] ?? {}).render ?? {};
        checkChunks = [ ...checkChunks, ...editor.annotationInChunks(annotation) ];
        //maxZIndex = Math.max(maxZIndex ?? annotation.l ?? utils.maxLayer, annotation.l ?? utils.maxLayer);
        //minZIndex = Math.min(minZIndex ?? annotation.l ?? utils.minLayer, annotation.l ?? utils.minLayer);
        let renderCopy = JSON.parse(JSON.stringify(annotation));
        if (renderCopy.parent != null) {
          renderCopy.parented = {
            parent: renderCopy.parent,
            x: annotation.p[0],
            y: annotation.p[1]
          };
        }
        let [x, y] = editor.getAbsolutePosition(annotation);
        renderCopy.p = [x, y];
        renderCopy.parent = null;
        saveAnnoData.push(renderCopy);
        let richText = annotation.d ?? {};
        if (richText.b != null) {
          if (saveTextData.length > 0) {
            saveTextData += "\n";
          }
          for (let t = 0; t < richText.b.length; t++) {
            let addText = "";
            if (richText.b[t] != "\n") {
              addText = richText.b[t];
            } else {
              addText = "\n";
            }
            saveTextData += addText;
          }
        }
      }
      let annotationKeys = {};
      for (let c = 0; c < checkChunks.length; c++) {
        annotationKeys = { ...annotationKeys, ...(editor.chunkAnnotations[checkChunks[c]] ?? {}) };
      }
      let annotations = Object.keys(annotationKeys);
      for (let a = 0; a < annotations.length; a++) {
        let checkAnnoID = annotations[a];
        if (checkAnnoID == null || editor.selecting[checkAnnoID] != null) {
          continue;
        }
        let checkAnnotation = editor.annotations[checkAnnoID];
        if (checkAnnotation == null) {
          continue;
        }
        if (checkAnnotation.pointer != null) {
          checkAnnoID = checkAnnotation.pointer;
          checkAnnotation = editor.annotations[checkAnnoID] ?? { render: {} };
        }
        let render = checkAnnotation.render ?? {};
        let currentAnnoCheck = render;
        let checkedParents = [];
        let enableContinue = false;
        while (currentAnnoCheck.parent != null) {
          let annoid = currentAnnoCheck.parent;
          if (annoid == null || checkedParents.includes(annoid) == true) {
            break;
          }
          checkedParents.push(annoid);
          let annotation = editor.annotations[annoid];
          if (annotation == null) {
            break;
          }
          if (annotation.pointer != null) {
            annoid = annotation.pointer;
            annotation = editor.annotations[annoid] ?? { render: {} };
          }
          if (editor.selecting[annoid] != null) {
            enableContinue = true;
            break;
          }
          currentAnnoCheck = annotation.render ?? {};
        }
        if (enableContinue == false) {
          continue;
        }
        //maxZIndex = Math.max(maxZIndex ?? render.l ?? utils.maxLayer, render.l ?? utils.maxLayer);
        //minZIndex = Math.min(minZIndex ?? render.l ?? utils.minLayer, render.l ?? utils.minLayer);
        let renderCopy = JSON.parse(JSON.stringify(render));
        if (renderCopy.parent != null) {
          renderCopy.parented = {
            parent: renderCopy.parent,
            x: render.p[0],
            y: render.p[1]
          };
        }
        let [x, y] = editor.getAbsolutePosition(render);
        renderCopy.p = [x, y];
        renderCopy.parent = null;
        saveAnnoData.push(renderCopy);
        let richText = renderCopy.d ?? {};
        if (richText.b != null) {
          if (saveTextData.length > 0) {
            saveTextData += "\n";
          }
          for (let t = 0; t < richText.b.length; t++) {
            let addText = "";
            if (richText.b[t] != "\n") {
              addText = richText.b[t];
            } else {
              addText = "\n";
            }
            saveTextData += addText;
          }
        }
      }
      /*
      maxZIndex++;
      let duplicateKeys = Object.keys(newSelect);
      for (let i = 0; i < duplicateKeys.length; i++) {
        let selectDup = newSelect[duplicateKeys[i]];
        selectDup.l = maxZIndex + ((selectDup.l ?? utils.maxLayer) - minZIndex);
        let [x, y] = editor.getAbsolutePosition(selectDup);
        selectDup.p = [x + offsetX, y + offsetY];
        selectDup.parent = null;
        selectDup.sync = setTempSync;
        delete selectDup.m;
        delete selectDup.lock;
        delete selectDup.hidden;
      }*/

      /*let selectKeys = Object.keys(editor.selecting);
      let saveTextData = "";
      let saveAnnoData = [];
      for (let i = 0; i < selectKeys.length; i++) {
        let annoID = selectKeys[i];
        let annotation = (editor.annotations[annoID] ?? {}).render ?? {};
        saveAnnoData.push(annotation);
        let richText = annotation.d ?? {};
        if (richText.b != null) {
          if (i > 0) {
            saveTextData += "\n";
          }
          for (let t = 0; t < richText.b.length; t++) {
            let addText = "";
            if (richText.b[t] != "\n") {
              addText = richText.b[t];
            } else {
              addText = "\n";
            }
            saveTextData += addText;
          }
        }
      }*/
      
      data.setData("text/html", `<meta charset="utf-8"><html><head></head><body><span data-meta="<!--(markify+copypaste)${encodeURIComponent(JSON.stringify(saveAnnoData))}(/markify+copypaste)-->"></span><div>${saveTextData}</div></body></html>`);
      data.setData("text/plain", saveTextData);
      event.preventDefault();
    });

    tempListen(window, "keydown", async (event) => {
      let self = editor.getSelf();
      if (self.access < 1) {
        return;
      }
      let meta = event.ctrlKey || event.metaKey;
      if (event.keyCode == 90 && event.shiftKey == true && meta == true) {
        event.preventDefault();
        return redoAction();
      }
      if (event.keyCode == 90 && meta == true) {
        event.preventDefault();
        return undoAction();
      }
      if (document.activeElement != null) {
        if (document.activeElement.closest("[contenteditable]") != null || document.activeElement.closest("input") != null) {
          //if (document.activeElement.hasAttribute("nodelete") == false) {
          return;
          //}
        }
      }
      if ([8, 46].includes(event.keyCode) == true) { // Backspace / Delete Key
        //this.cursor.clickAction({ target: editor.page.querySelector('.eTool[action="pages/editor/toolbar/delete"]') });
        let selectKeys = Object.keys(editor.selecting);
        for (let i = 0; i < selectKeys.length; i++) {
          let selectID = selectKeys[i];
          let anno = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
          if (editor.lesson.settings.editOthersWork != true && [anno.a, anno.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
            continue;
          }
          if (anno.lock == true) {
            continue;
          }
          editor.selecting[selectID].remove = true;
          editor.selecting[selectID].done = true;

          let allSelections = [...editor.page.querySelectorAll('.eSelect[anno="' + selectID + '"]'), ...editor.page.querySelectorAll('.eSelectActive[anno="' + selectID + '"]'), ...editor.page.querySelectorAll('.eCollabSelect[anno="' + selectID + '"]')];
          for (let i = 0; i < allSelections.length; i++) {
            allSelections[i].remove();
          }
        }
        this.cursor.action = "save";
        await this.cursor.endAction();
        editor.selecting = {};
        this.cursor.updateBox();
        return;
      }
      if ([37, 38, 39, 40].includes(event.keyCode) == true) { // Arrow Keys
        let selectKeys = Object.keys(editor.selecting);
        if (selectKeys.length < 1) {
          return;
        }
        event.preventDefault();
        for (let i = 0; i < selectKeys.length; i++) {
          let selectID = selectKeys[i];
          let selecting = editor.selecting[selectID];
          let existingAnno = (editor.annotations[selectID] ?? {}).render;
          if (editor.lesson.settings.editOthersWork != true && [existingAnno.a, existingAnno.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
            continue;
          }
          selecting.p = selecting.p ?? [existingAnno.p[0] ?? 0, existingAnno.p[1] ?? 0];
          let nudge = 1;
          if (event.shiftKey == true) {
            nudge = 10;
          }
          if (event.keyCode == 37) {
            selecting.p[0] -= nudge;
          } else if (event.keyCode == 38) {
            selecting.p[1] -= nudge;
          } else if (event.keyCode == 39) {
            selecting.p[0] += nudge;
          } else if (event.keyCode == 40) {
            selecting.p[1] += nudge;
          }
        }
        this.cursor.action = "save";
        await this.cursor.endAction();
        //this.cursor.updateBox();
        return;
      }
      if (event.keyCode == 68 && meta == true) { // Duplicate
        event.preventDefault();
        let moreModule = await this.getModule("dropdowns/editor/toolbar/more");
        await moreModule.handleDuplicate();
        /*let selectKeys = Object.keys(editor.selecting);
        if (selectKeys.length < 1) {
          return;
        }
        event.preventDefault();
        let newSelect = {};
        let newNewSelect = {};
        let setTempSync = getEpoch();
        for (let i = 0; i < selectKeys.length; i++) {
          let selectID = selectKeys[i];
          let tempID = utils.tempID();
          let newAnno = JSON.parse(JSON.stringify(({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {}));
          if (self.access < 4 && this.checkSubToolType(editor, newAnno.f) == true) {
            continue;
          }
          newAnno._id = tempID;
          newAnno.p = newAnno.p ?? [0, 0];
          newAnno.p[0] += 50;
          newAnno.p[1] += 50;
          if (["page"].includes(newAnno.f) == false) {
            newAnno.l = (newAnno.l ?? utils.maxLayer) + 1;
          } else {
            newAnno.l = (newAnno.l ?? utils.minLayer) - 1;
          }
          newAnno.sync = setTempSync;
          delete newAnno.m;
          delete newAnno.lock;
          await utils.render(newAnno);
          editor.annotations[tempID] = { render: newAnno };
          newSelect[tempID] = newAnno;
          newNewSelect[tempID] = {};
        }
        editor.selecting = newSelect;
        this.cursor.action = "save";
        await this.cursor.endAction();
        editor.selecting = newNewSelect;
        this.cursor.updateBox();
        return;*/
      }
    });
    
    this.cursor.updateBox();
    //frame.closest(".eSide").style.opacity = 1;
  }
}

// CURSOR TOOL
modules["pages/editor/toolbar/cursor"] = class {
  mouse = "default";
  currentSelections = {};
  currentSnapElements = {};
  updateBox = async function (forceNoTransition, forceUpdate, noUpdateAction) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
    let dragSelect = toolbarModule.getModule("pages/editor/toolbar/drag");
    let content = editor.page.querySelector(".eContent");
    let pageHolderRect = content.querySelector(".ePageHolder").getBoundingClientRect();
    let selectionIDs = Object.keys(editor.selecting);
    //let checkRemSelections = [ ...content.querySelectorAll(".eSelect") ];
    let self = editor.getSelf();

    this.minX = null;
    this.maxX = null;
    this.minY = null;
    this.maxY = null;
    this.resizePreserveAspect = false;
    this.multiSelectResizePreserveAspect = false;

    let removeSelections = [];
    let currentCheckSelections = Object.keys(this.currentSelections);
    for (let i = 0; i < currentCheckSelections.length; i++) {
      let annoID = currentCheckSelections[i];
      if (annoID == null) {
        delete this.currentSelections[annoID];
        continue;
      }
      let selection = content.querySelector('.eSelect[anno="' + annoID + '"]');
      let annoData = editor.annotations[annoID] ?? {};
      let render = annoData.render ?? {};
      if (annoData.pointer != null) {
        delete this.currentSelections[annoID];
        annoID = annoData.pointer;
        annoData = editor.annotations[annoID] ?? { render: {} };
        this.currentSelections[annoID] = "";
      }
      let anno = content.querySelector('.eAnnotation[anno="' + annoID + '"]');
      if (editor.selecting[annoID] == null || render.remove == true) { // || anno == null || anno.hasAttribute("hidden") == true) {
        delete this.currentSelections[annoID];
        if (anno != null) {
          anno.removeAttribute("selected");
          anno.removeAttribute("notransition");
          let annoTx = anno.querySelector("div[edit]");
          if (annoTx != null) {
            annoTx.removeAttribute("contenteditable");

            if (annoTx.hasAttribute("text") == true && annoTx.textContent.trim().length < 1) {
              await utils.pushHistory("add", [render]);
              await utils.save({ _id: annoID, remove: true });
              editor.realtimeSelect[annoID] = { ...editor.realtimeSelect[annoID], _id: annoID, remove: true };
              await utils.forceShort();
            }
          }

          //anno.style.zIndex = (editor.annotations[annoID] ?? { render: {} }).render.sync;
          //anno.style.pointerEvents = "unset";
          //anno.style.cursor = "unset";
          anno.style.removeProperty("overflow");
          anno.style.removeProperty("border-radius");
          let activeLayer = anno.parentElement.querySelector('.eSelectActive[anno="' + annoID + '"]');
          if (activeLayer != null) {
            activeLayer.remove();
          }
        }
        if (selection != null) {
          selection.style.opacity = 0;
          if (selection.hasAttribute("remove") == false) {
            selection.setAttribute("remove", "");
            removeSelections.push(selection);
          }
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
    let selectedElements = [];
    let selectionChange = false;
    let showTooltips = true;
    let showDuplicateTooltips = true;
    let showTextBoxEdit = true;
    let showOnlyPages = true;
    if (["pages/editor/toolbar/cursor", "pages/editor/toolbar/drag"].includes(toolbarModule.currentToolModule)) {
      for (let i = 0; i < selectionIDs.length; i++) {
        let annoID = selectionIDs[i];
        let annoData = editor.annotations[annoID] ?? { render: {} };
        if (annoData.pointer != null) {
          annoID = annoData.pointer;
          annoData = editor.annotations[annoID] ?? { render: {} };
        }
        let selection = editor.selecting[annoID];
        let merged = { ...annoData.render, ...selection };
        if (merged.remove == true) {
          continue;
        }
        let anno = annoData.element; //content.querySelector('.eAnnotation[anno="' + annoID + '"]');
        if (anno == null) {
          continue;
        }
        let select = content.querySelector('.eSelect[anno="' + annoID + '"]');
        let collabSelect = content.querySelector('.eCollabSelect[anno="' + annoID + '"]');
        let currentAnnoCheck = merged;
        let checkedParents = [];
        let enableContinue = false;
        while (currentAnnoCheck.parent != null) {
          let annoid = currentAnnoCheck.parent;
          if (annoid == null || checkedParents.includes(annoid) == true) {
            break;
          }
          checkedParents.push(annoid);
          let annotation = editor.annotations[annoid];
          if (annotation == null) {
            break;
          }
          if (annotation.pointer != null) {
            annoid = annotation.pointer;
            annotation = editor.annotations[annoid] ?? { render: {} };
          }
          if (editor.selecting[annoid] != null) {
            enableContinue = true;
            break;
          }
          currentAnnoCheck = annotation.render ?? {};
        }
        if (enableContinue == true) {
          delete editor.selecting[annoID];
          this.updateBox(forceNoTransition, forceUpdate, noUpdateAction);
          return;
        }
        anno.setAttribute("selected", "");
        /*let activeLayer = anno.parentElement.querySelector('.eSelectActive[anno="' + annoID + '"]');
        if ((editor.lesson.settings.editOthersWork == true || [merged.a, merged.m].includes(self.modify) == true || self.access > 3) &&  self.access > 0) {
          if (activeLayer == null) {
            anno.parentElement.insertAdjacentHTML("afterbegin", `<div class="eSelectActive" anno="${annoID}" tooleditor></div>`);
            activeLayer = anno.parentElement.querySelector('.eSelectActive[anno="' + annoID + '"]');
          }
          activeLayer.style.setProperty("--annoZIndex", merged.l ?? Math.round(((merged.sync ?? getEpoch()) / 2000000000000) * 2147483647));
          activeLayer.style.setProperty("--selectZIndex", i);
        } else if (activeLayer != null) {
          activeLayer.remove();
          activeLayer = null;
        }*/
        if (["sticky", "page"].includes(merged.f) == false) {
          anno.style.overflow = "hidden";
        }
        if (this.currentSelections[annoID] == null) {
          selectionChange = true;
        }
        this.currentSelections[annoID] = "";
        if (["page"].includes(merged.f) != true) {
          showDuplicateTooltips = false;
          showOnlyPages = false;
        }
        if (["text"].includes(merged.f) != true) {
          showTextBoxEdit = false;
        }
        if (editor.lesson.settings.editOthersWork != true && [merged.a, merged.m].includes(self.modify) == false && self.access < 4 && self.access > 0) {
          showTooltips = false;
        }
        if (merged.lock == true || self.access < 1 || (editor.lesson.settings.editOthersWork != true && [merged.a, merged.m].includes(self.modify) == false && self.access < 4)) { // Can't edit another member's work:
          showTooltips = false;
        }

        if (["markup", "draw"].includes(merged.f) == true) {
          this.resizePreserveAspect = true; // All drawings keep aspect
        } else if (["sticky", "media"].includes(merged.f) == true && ["bottomright", "topleft", "topright", "bottomleft"].includes(this.tooltip) == true) {
          this.resizePreserveAspect = true;
        } else if (["page"].includes(merged.f) == true && ["bottomright", "topleft", "topright", "bottomleft"].includes(this.tooltip) == true && (merged.source) != null) {
          this.resizePreserveAspect = true;
        }

        anno.style.borderRadius = (4 / editor.zoom) + "px";
        
        let [width, height] = merged.s;
        let [x, y] = editor.getAbsolutePosition(merged);
        let rotate = merged.r ?? 0;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        if (width < 0) {
          width = -width;
          x -= width;
        }
        if (height < 0) {
          height = -height;
          y -= height;
        }
        let t = merged.t ?? 0;
        if (merged.b == "none" && merged.d != "line") {
          t = 0;
        }
        let halfT = t / 2;

        if (selectionIDs.length > 1 || dragSelect.selection != null) {
          if (select == null) {
            content.insertAdjacentHTML("beforeend", `<div class="eSelect" new></div>`);
            select = content.querySelector(".eSelect[new]");
            select.removeAttribute("new");
            select.setAttribute("anno", annoID);
            select.style.border = "solid 4px var(--secondary)";
            select.style.opacity = 1;
          }
          if (rotate != 0 && dragSelect.selection == null) {
            this.multiSelectResizePreserveAspect = true;
          }
        }

        if (this.action != null || forceNoTransition == true) {
          if (select != null) {
            select.setAttribute("notransition", "");
          }
          anno.setAttribute("notransition", "");
          if (collabSelect != null) {
            collabSelect.setAttribute("notransition", "");
          }
        } else {
          if (select != null) {
            select.removeAttribute("notransition");
          }
          anno.removeAttribute("notransition");
          if (collabSelect != null) {
            collabSelect.removeAttribute("notransition");
          }
        }

        selectedElements.push(annoID);
        
        this.lastElementWidth = width + t;
        this.lastElementHeight = height + t;
        this.lastElementX = pageHolderRect.x + ((x + halfT) * editor.zoom) + window.scrollX - 2;
        this.lastElementY = pageHolderRect.y + ((y + halfT) * editor.zoom) + window.scrollY - 2;
        this.lastElementRotate = rotate;
        
        if (select != null) {
          select.style.width = ((this.lastElementWidth * editor.zoom) - 4) + "px";
          select.style.height = ((this.lastElementHeight * editor.zoom) - 4) + "px";
          select.style.transform = "translate(" + this.lastElementX + "px," + this.lastElementY + "px) rotate(" + this.lastElementRotate + "deg)";
          select.offsetHeight;
          select.style.transition = "all .25s, opacity .15s";
        }

        /*if (activeLayer != null) {
          let sizeInverse = 22 * inverse;
          let posInverse = 11 * inverse;
          activeLayer.style.width = (width + t) + sizeInverse + "px";
          activeLayer.style.height = (height + t) + sizeInverse + "px";
          let [relX, relY] = merged.p;
          activeLayer.style.transform = "translate(" + (relX + halfT - posInverse) + "px," + (relY + halfT - border - posInverse) + "px) rotate(" + rotate + "deg)";
        }*/

        let radian = rotate * (Math.PI / 180);
        let thickWidth = width + t;
        let thickHeight = height + t;
        let changedWidth = ((Math.abs(thickWidth * Math.cos(radian)) + Math.abs(thickHeight * Math.sin(radian))) - thickWidth) / 2;
        let changedHeight = ((Math.abs(thickWidth * Math.sin(radian)) + Math.abs(thickHeight * Math.cos(radian))) - thickHeight) / 2;

        let setMinX = x + halfT - changedWidth;
        this.minX = Math.min(this.minX ?? setMinX, setMinX);
        let setMaxX = x + width + t + halfT + changedWidth;
        this.maxX = Math.max(this.maxX ?? setMaxX, setMaxX);
        let setMinY = y + halfT - changedHeight;
        this.minY = Math.min(this.minY ?? setMinY, setMinY);
        let setMaxY = y + t + height + halfT + changedHeight;
        this.maxY = Math.max(this.maxY ?? setMaxY, setMaxY);

        let setCheckX = x + width;
        this.checkX = Math.min(this.checkX ?? setCheckX, setCheckX);
        let setCheckY = y + height;
        this.checkY = Math.min(this.checkY ?? setCheckY, setCheckY);

        if (collabSelect != null) {
          collabSelect.offsetWidth;
          let collWidth = ((width + t) * editor.zoom) - 3; // +0 for width, -3 for border
          let collHeight = ((height + t) * editor.zoom) - 3;
          collabSelect.style.width = collWidth + "px";
          collabSelect.style.height = collHeight + "px";
          //collabSelect.style.left = pageHolderRect.x + ((x + halfT) * editor.zoom) + window.scrollX - 1.5 + "px"; // -1.5 for border, -0 for width
          //collabSelect.style.top = pageHolderRect.y + (((y + halfT) - border) * editor.zoom) + window.scrollY - 1.5 + "px";
          collabSelect.style.transform = "translate(" + (pageHolderRect.x + ((x + halfT) * editor.zoom) + window.scrollX - 1.5) + "px," + (pageHolderRect.y + ((y + halfT) * editor.zoom) + window.scrollY - 1.5) + "px) rotate(" + rotate + "deg)";
        }

        if (forceNoTransition == true && select != null) {
          select.removeAttribute("notransition");
        }
      }
    }
    let removeSelectBox = () => {
      if (this.selectBox == null) {
        return;
      }
      let remSelect = this.selectBox;
      this.selectBox = null;
      this.lastSelectAmount = 0;
      (async function () {
        remSelect.style.opacity = 0;
        await sleep(150);
        if (remSelect != null) {
          remSelect.remove();
        }
      })();
    }
    if (selectedElements.length > 0 && dragSelect.selection == null) {
      if (this.lastSelectAmount == selectedElements.length && selectionChange == true) {
        removeSelectBox();
      }
      if (this.selectBox == null) {
        content.insertAdjacentHTML("beforeend", `<div class="eSelect" tooleditor new></div>`);
        this.selectBox = content.querySelector(".eSelect[new]");
        this.selectBox.removeAttribute("new");
        this.selectBox.style.border = "solid 4px var(--theme)";
        this.selectBox.style.opacity = 1;
      }
      if (this.action != null || forceNoTransition == true || this.lastSelectAmount != selectedElements.length) {
        this.selectBox.setAttribute("notransition", "");
      } else {
        this.selectBox.removeAttribute("notransition");
      }
      this.lastSelectAmount = selectedElements.length;
      this.selectBox.offsetHeight;
      let boxWidth = 0;
      let boxHeight = 0;
      let boxX = 0;
      let boxY = 0;
      this.selectRotation = 0;
      if (selectedElements.length < 2) {
        boxWidth = ((this.lastElementWidth * editor.zoom) - 4);
        boxHeight = ((this.lastElementHeight * editor.zoom) - 4);
        boxX = this.lastElementX;
        boxY = this.lastElementY;
        this.selectRotation = this.lastElementRotate;
      } else {
        boxWidth = ((this.maxX - this.minX) * editor.zoom) - 4;
        boxHeight = ((this.maxY - this.minY) * editor.zoom) - 4;
        boxX = pageHolderRect.x + (this.minX * editor.zoom) + window.scrollX - 2;
        boxY = pageHolderRect.y + (this.minY * editor.zoom) + window.scrollY - 2;
      }
      this.selectBox.style.width = boxWidth + "px";
      this.selectBox.style.height = boxHeight + "px";
      this.selectBox.style.transform = "translate(" + boxX + "px," + boxY + "px) rotate(" + this.selectRotation + "deg)";
      this.selectBox.offsetHeight;
      this.selectBox.style.transition = "all .25s, opacity .15s";

      if (showDuplicateTooltips != true) {
        this.tooltipPadding = 24;
      } else {
        this.tooltipPadding = 60;
      }
      if (showTooltips == true) {
        if (this.selectBox.querySelector('.eSelectTooltip[tooltip="topright"]') == null) {
          this.selectBox.insertAdjacentHTML("beforeend", `
            <div class="eSelectTooltip" tooltip="movetop" ignore></div>
            <div class="eSelectTooltip" tooltip="movebottom" ignore></div>
            <div class="eSelectTooltip" tooltip="moveleft" ignore></div>
            <div class="eSelectTooltip" tooltip="moveright" ignore></div>
            <svg class="eSelectTooltip" tooltip="rotate" width="26" height="26" viewBox="0 0 31 31" hidden fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.46244 9.45089C2.67045 10.2429 1.38612 10.2429 0.594123 9.45089C-0.197875 8.65884 -0.197875 7.37466 0.594123 6.58261L3.46244 9.45089ZM9.04395 3.86918L3.46244 9.45089L0.594123 6.58261L6.17562 1.0009L9.04395 3.86918Z" fill="#0084FF"/> <path d="M14.6257 6.58261C15.4177 7.37466 15.4177 8.65884 14.6257 9.45089C13.8337 10.2429 12.5494 10.2429 11.7574 9.45089L14.6257 6.58261ZM9.04373 1.0009L14.6257 6.58261L11.7574 9.45089L6.17541 3.86918L9.04373 1.0009Z" fill="var(--theme)"/> <path d="M21.3783 19.0707C20.5863 18.2786 20.5863 16.9945 21.3783 16.2024C22.1703 15.4104 23.4546 15.4104 24.2466 16.2024L21.3783 19.0707ZM26.9603 24.6523L21.3783 19.0707L24.2466 16.2024L29.8281 21.7841L26.9603 24.6523Z" fill="var(--theme)"/> <path d="M24.2466 30.2341C23.4546 31.0261 22.1703 31.0261 21.3783 30.2341C20.5863 29.442 20.5863 28.1579 21.3783 27.3658L24.2466 30.2341ZM29.8281 24.6524L24.2466 30.2341L21.3783 27.3658L26.9603 21.7841L29.8281 24.6524Z" fill="var(--theme)"/> <path d="M7.63804 2.43607V10.0101C7.63804 17.2905 13.5396 23.1924 20.8203 23.1924H28.394" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" tooltip="topleft" width="16" height="16" viewBox="0 0 16 16" hidden fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M2 14V14C2 7.37258 7.37258 2 14 2V2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" tooltip="topright" width="16" height="16" viewBox="0 0 16 16" hidden fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M14 14V14C14 7.37258 8.62742 2 2 2V2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" tooltip="bottomleft" width="16" height="16" viewBox="0 0 16 16" hidden fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M2 2V2C2 8.62742 7.37258 14 14 14V14" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" tooltip="bottomright" width="16" height="16" viewBox="0 0 16 16" hidden fill="none" xmlns="http://www.w3.org/2000/svg" hidden> <path d="M14 2V2C14 8.62742 8.62742 14 2 14V14" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" tooltip="left" width="12" height="28" viewBox="0 0 12 28" hidden fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6V22" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" tooltip="right" width="12" height="28" viewBox="0 0 12 28" hidden fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6V22" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" tooltip="top" width="28" height="12" viewBox="0 0 28 12" hidden fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6H6" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" tooltip="bottom" width="28" height="12" viewBox="0 0 28 12" hidden fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6H6" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" duplicate tooltip="duplicateleft" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10.5" fill="var(--hover)" stroke="var(--theme)" stroke-width="3"/> <path d="M12 16.5L12 7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> <path d="M16.5 12H7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" duplicate tooltip="duplicateright" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10.5" fill="var(--hover)" stroke="var(--theme)" stroke-width="3"/> <path d="M12 16.5L12 7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> <path d="M16.5 12H7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" duplicate tooltip="duplicatetop" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10.5" fill="var(--hover)" stroke="var(--theme)" stroke-width="3"/> <path d="M12 16.5L12 7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> <path d="M16.5 12H7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> </svg>
            <svg class="eSelectTooltip" duplicate tooltip="duplicatebottom" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10.5" fill="var(--hover)" stroke="var(--theme)" stroke-width="3"/> <path d="M12 16.5L12 7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> <path d="M16.5 12H7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> </svg>
          `);
        }
        if (showDuplicateTooltips == false) {
          this.selectBox.removeAttribute("showduplicate");
        } else {
          this.selectBox.setAttribute("showduplicate", "");
        }
        if (showTextBoxEdit == false) {
          let eSelectTopLeft = this.selectBox.querySelector('.eSelectTooltip[tooltip="topleft"]');
          if (eSelectTopLeft != null) {
            eSelectTopLeft.removeAttribute("hidden");
            let eSelectTopRight = this.selectBox.querySelector('.eSelectTooltip[tooltip="topright"]');
            let eSelectBottomLeft = this.selectBox.querySelector('.eSelectTooltip[tooltip="bottomleft"]');
            let eSelectBottomRight = this.selectBox.querySelector('.eSelectTooltip[tooltip="bottomright"]');
            eSelectBottomRight.removeAttribute("hidden");
            let eSelectLeft = this.selectBox.querySelector('.eSelectTooltip[tooltip="left"]');
            let eSelectRight = this.selectBox.querySelector('.eSelectTooltip[tooltip="right"]');
            let eSelectTop = this.selectBox.querySelector('.eSelectTooltip[tooltip="top"]');
            let eSelectBottom = this.selectBox.querySelector('.eSelectTooltip[tooltip="bottom"]');
            let eSelectRotate = this.selectBox.querySelector('.eSelectTooltip[tooltip="rotate"]');
            if (boxWidth < 52) {
              eSelectTop.setAttribute("hidden", "");
              eSelectBottom.setAttribute("hidden", "");
            } else {
              eSelectTop.removeAttribute("hidden");
              eSelectBottom.removeAttribute("hidden");
            }
            if (boxHeight < 52) {
              eSelectLeft.setAttribute("hidden", "");
              eSelectRight.setAttribute("hidden", "");
            } else {
              eSelectLeft.removeAttribute("hidden");
              eSelectRight.removeAttribute("hidden");
            }
            if (boxWidth < 20 || boxHeight < 20) {
              eSelectTopRight.setAttribute("hidden", "");
              eSelectBottomLeft.setAttribute("hidden", "");
              eSelectRotate.setAttribute("hidden", "");
            } else {
              eSelectTopRight.removeAttribute("hidden");
              eSelectBottomLeft.removeAttribute("hidden");
              if (showOnlyPages == false) {
                eSelectRotate.removeAttribute("hidden");
                eSelectBottomLeft.style.removeProperty("display");
              } else {
                eSelectRotate.setAttribute("hidden", "");
                eSelectBottomLeft.style.display = "unset";
              }
            }
          }
        } else {
          let eSelectLeft = this.selectBox.querySelector('.eSelectTooltip[tooltip="left"]');
          if (eSelectLeft != null) {
            eSelectLeft.removeAttribute("hidden");
            this.selectBox.querySelector('.eSelectTooltip[tooltip="right"]').removeAttribute("hidden");
            this.selectBox.querySelector('.eSelectTooltip[tooltip="topleft"]').setAttribute("hidden", "");
            this.selectBox.querySelector('.eSelectTooltip[tooltip="topright"]').setAttribute("hidden", "");
            this.selectBox.querySelector('.eSelectTooltip[tooltip="bottomleft"]').setAttribute("hidden", "");
            this.selectBox.querySelector('.eSelectTooltip[tooltip="bottomright"]').setAttribute("hidden", "");
            this.selectBox.querySelector('.eSelectTooltip[tooltip="top"]').setAttribute("hidden", "");
            this.selectBox.querySelector('.eSelectTooltip[tooltip="bottom"]').setAttribute("hidden", "");
            let eSelectRotate = this.selectBox.querySelector('.eSelectTooltip[tooltip="rotate"]');
            if (boxHeight < 40) {
              eSelectRotate.setAttribute("hidden", "");
            } else {
              eSelectRotate.removeAttribute("hidden");
            }
          }
        }
        this.selectBox.removeAttribute("hidetips");
      } else {
        this.selectBox.setAttribute("hidetips", "");
      }

      if (forceNoTransition == true && this.selectBox != null) {
        this.selectBox.removeAttribute("notransition");
      }
    } else {
      removeSelectBox();
    }

    if (noUpdateAction != true) { //forceNoTransition != true && 
      this.updateActionUI();
    }
    //if (this.lastEditorZoom != editor.zoom || forceNoTransition == true || forceUpdate == true) {
    let allSelections = editor.page.querySelector(".eRealtime").querySelectorAll(".eCollabSelect");
    for (let i = 0; i < allSelections.length; i++) {
      let selection = allSelections[i];
      let annoID = selection.getAttribute("anno");
      let anno;
      if (annoID != "cursor") {
        if (editor.annotations[annoID] == null) {
          selection.remove();
          continue;
        }
        anno = { ...((editor.annotations[annoID]).render ?? {}), ...(editor.selecting[annoID] ?? {}) };
        if (anno.f == null) {
          continue;
        }
      } else {
        let member = editor.members[selection.getAttribute("member")];
        if (member == null || member.cursorRender == null) {
          continue;
        }
        anno = { ...member.cursorRender, ...(editor.selecting[annoID] ?? {}) };
      }
      let border = 0;
      let t = anno.t ?? 0;
      if (anno.b == "none" && anno.d != "line") {
        t = 0;
      }
      let [width, height] = anno.s;
      let [x, y, extra] = editor.getAbsolutePosition(anno, true);
      if (forceNoTransition == true || (this.action != null && extra.selectedParent == true)) {
        selection.setAttribute("notransition", "");
      }
      let rotate = anno.r ?? 0;
      if (rotate > 180) {
        rotate = -(360 - rotate);
      }
      if (width < 0) {
        width = -width;
        x -= width;
      }
      if (height < 0) {
        height = -height;
        y -= height;
      }
      let boxWidth = ((width + t) * editor.zoom) - 3; // +0 for width, -3 for border
      let boxHeight = ((height + t) * editor.zoom) - 3;
      selection.style.width = boxWidth + "px";
      selection.style.height = boxHeight + "px";
      let halfT = t / 2;
      //selection.style.left = pageHolderRect.x + ((x + halfT) * editor.zoom) + window.scrollX - 1.5 + "px"; // -1.5 for border, -0 for width
      //selection.style.top = pageHolderRect.y + (((y + halfT) - border) * editor.zoom) + window.scrollY - 1.5 + "px";
      selection.style.transform = "translate(" + (pageHolderRect.x + ((x + halfT) * editor.zoom) + window.scrollX - 1.5) + "px," + (pageHolderRect.y + (((y + halfT) - border) * editor.zoom) + window.scrollY - 1.5) + "px) rotate(" + rotate + "deg)";
      selection.offsetHeight;
      selection.removeAttribute("notransition");
    }

    if (forceNoTransition == true || forceUpdate == true) {
      await this.updateSnapLines();
    }
    //}
    //this.lastEditorZoom = editor.zoom;
  }
  actionBarTools = {
    "draw": ["color", "thickness", "opacity", "unlock", "collaborator", "delete", "more"],
    "text": ["textedit", "color", "opacity", "fontsize", "bold", "italic", "underline", "strikethrough", "textalign", "unlock", "collaborator", "delete", "more"],
    "markup": ["color", "thickness", "opacity", "unlock", "collaborator", "delete", "more"],
    "shape": ["color", "thickness", "opacity", "style", "unlock", "collaborator", "delete", "more"],
    "sticky": ["textedit", "color", "fontsize", "bold", "italic", "underline", "strikethrough", "textalign", "unlock", "collaborator", "reactions", "delete", "more"],
    "page": ["uploadpage", "resize", "settitle", "color", "hidepage", "rotatepage", "unlock", "collaborator", "delete", "more"],
    "media": ["unlock", "collaborator", "delete", "more"],
    "embed": ["openlink", "enlarge", "setembed", "unlock", "collaborator", "delete", "more"]
  }
  actionEvents = [];
  updateActionUI = async function (refresh) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let content = editor.page.querySelector(".eContent");
    if (content == null) {
      return;
    }
    let selectionIDs = Object.keys(editor.selecting);

    let actionUI = content.querySelector(".eSelectBar:not([remove])");
    if (selectionIDs.length > 0 && (this.action == null || this.actionEnabled != true) && content.querySelector(".eSelectDrag:not([remove])") == null) {
      if (this.checkX == null || this.checkY == null) {
        return;
      }

      let testSelections = "";
      for (let i = 0; i < selectionIDs.length; i++) {
        testSelections += selectionIDs[i];
      }
      if (this.lastSelections != testSelections || this.lastPxCheckX != this.checkX || this.lastPxCheckY != this.checkY || refresh == true) {
        if (refresh != false) {
          this.removeActionUI(actionUI);
          actionUI = null;
        }
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
          anno = (editor.annotations[selectionIDs[i]] ?? {}).render ?? {};
          if (anno != null) {
            let tools = this.actionBarTools[anno.f] ?? [];
            if (combineTools != null) {
              for (let c = 0; c < combineTools.length; c++) {
                if (tools.includes(combineTools[c]) == false) {
                  combineTools.splice(c, 1);
                  c--;
                }
              }
            } else {
              combineTools = JSON.parse(JSON.stringify(tools ?? {}));
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

        let actionButtonHolder = actionUI.querySelector(".eSelectHolder");
        let self = editor.getSelf();
        let showLocked = self.access < 1;
        if (showLocked == false) {
          for (let i = 0; i < selectionIDs.length; i++) {
            let selectID = selectionIDs[i];
            let anno = ({ ...((editor.annotations[selectID] || {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
            if (anno.lock == true) {
              showLocked = true;
              break;
            }
            if (editor.lesson.settings.editOthersWork != true && [anno.a, anno.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
              showLocked = true;
              break;
            }
          }
        }
        if (showLocked == false) {
          actionButtonHolder.removeAttribute("locked");
        } else {
          actionButtonHolder.setAttribute("locked", "");
        }

        // Add Buttons
        for (let i = 0; i < combineTools.length; i++) {
          let actionRef = "pages/editor/toolbar/" + combineTools[i];
          let module = await toolbarModule.getModule(actionRef);
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
          if (module.showOnLock == true) {
            newAction.setAttribute("stayonlock", "");
          }
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
      let yPos = pageHolderRect.y + (this.minY * editor.zoom) - actionUI.clientHeight - this.tooltipPadding;
      let isBottom = false;
      if (yPos < 66) {
        let modifiedY = pageHolderRect.y + (this.maxY * editor.zoom) + this.tooltipPadding;
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
        actionContent.style.display = "flex";
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
          actionUI.querySelector(".eActionContainerScroll").style.maxWidth = actionUI.clientWidth + "px";
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
  }
  redrawActionUI = async function (skip, longUpdate) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let content = editor.page.querySelector(".eContent");

    let actionUI = content.querySelector(".eSelectBar:not([remove])");
    if (actionUI == null) {
      return;
    }

    if (skip != true) {
      await this.updateActionUI(); // Update it first if their are selection changes
    }

    let actionButtonHolder = actionUI.querySelector(".eSelectHolder");
    let self = editor.getSelf();
    let showLocked = self.access < 1;
    if (showLocked == false) {
      let selectKeys = Object.keys(editor.selecting);
      for (let i = 0; i < selectKeys.length; i++) {
        let selectID = selectKeys[i];
        let anno = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
        if (anno.lock == true) {
          showLocked = true;
          break;
        }
        if (editor.lesson.settings.editOthersWork != true && [anno.a, anno.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
          showLocked = true;
          break;
        }
      }
    }
    if (showLocked == false) {
      actionButtonHolder.removeAttribute("locked");
    } else {
      actionButtonHolder.setAttribute("locked", "");
    }
    let currentLocked = actionButtonHolder.hasAttribute("locked");
    if (showLocked == false) {
      if (currentLocked == true) {
        actionButtonHolder.removeAttribute("locked");
        this.updateActionUI();
      }
    } else {
      if (currentLocked == false) {
        actionButtonHolder.setAttribute("locked", "");
        this.closeActionContainer(actionUI, null, true);
        this.updateActionUI();
      }
    }

    // Update buttons:
    for (let i = 0; i < actionButtonHolder.children.length; i++) {
      let button = actionButtonHolder.children[i];
      let actionName = button.getAttribute("action");
      if (actionName == null) {
        continue;
      }
      let module = await toolbarModule.getModule(actionName);
      if (module == null || module.reRender == false) {
        continue;
      }
      //let buttonHolder = button.querySelector("div");
      //buttonHolder.innerHTML = module.button;
      if (module.setButton != null) {
        module.setButton(editor, button);
      }
    }

    // Update current module:
    if (longUpdate == true) {
      return;
    }
    let actionFrame = actionUI.querySelector(".eActionContainer[module]");
    if (actionFrame != null) {
      let actionContent = actionFrame.querySelector(".eActionContainerContent");
      let module = await toolbarModule.getModule(actionFrame.getAttribute("module"));
      if (module != null && module.html != null && module.reRender != false) {
        actionContent.innerHTML = module.html;
        let selectKeys = Object.keys(editor.selecting);
        let preferenceTool = ((editor.annotations[selectKeys[0]] ?? {}).render ?? {}).f;
        await this.runActionModule(module, actionUI, preferenceTool, { rerender: true });
      }
    }
  }
  closeActionContainer = function (holder, action, forceClose) {
    let actionHolder = holder.querySelector(".eActionContainer");
    let contentFrame = actionHolder.querySelector(".eActionContainerContent");
    let otherSelected = holder.querySelector(".eTool[selected]");
    if (otherSelected != null) {
      otherSelected.removeAttribute("selected");
      if (otherSelected == action || forceClose == true) {
        actionHolder.removeAttribute("module");
        // Close frame:
        if (action != null) {
          actionHolder.style.left = (action.getBoundingClientRect().left - holder.getBoundingClientRect().left) + (action.clientWidth / 2) - (contentFrame.clientWidth / 2) + "px";
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
        this.updateActionUI();
        return {};
      }
    }
    return { actionHolder: actionHolder, contentFrame: contentFrame, otherSelected: otherSelected };
  }
  clickAction = async function (event) {
    if (event == null || event.target == null) {
      return;
    }
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let interact = this.interactRun(event.target);
    if (interact == true) {
      return;
    }
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

    let { actionHolder, contentFrame, otherSelected } = this.closeActionContainer(holder, action);
    if (actionHolder == null) {
      return;
    }

    let moduleID = action.getAttribute("action");
    let module = await toolbarModule.getModule(moduleID);
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ((editor.annotations[selectKeys[0]] ?? {}).render ?? {}).f;
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
    await this.runActionModule(module, holder, preferenceTool, { setCaretPosition: event.setCaretPosition, clientX: event.clientX, clientY: event.clientY, button: action });
    this.updateActionUI();
  }
  runActionModule = async function (module, holder, preferenceTool, extra) {
    if (module.js == null) {
      return;
    }
    await module.js(holder, preferenceTool, {
      frame: holder,
      module: this,
      updateActionUI: () => { this.updateActionUI(); },
      saveSelecting: async (set, short, saveHistory, lastCaret, refreshBox) => {
        let toolbarModule = this.parent;
        let editor = toolbarModule.parent;
        let utils = editor.utils;
        let selectKeys = Object.keys(editor.selecting);
        let setKeys = Object.keys(set);
        let sync = getEpoch();
        for (let i = 0; i < selectKeys.length; i++) {
          let annoID = selectKeys[i];
          let select = editor.selecting[annoID];
          let original = (editor.annotations[annoID] ?? {}).render ?? {};
          if (original.lock == true && set.lock == null) {
            continue;
          }
          let anno = JSON.parse(JSON.stringify(original));
          let annoSet = JSON.parse(JSON.stringify(set));
          select.sync = sync;
          if (annoSet.d != null && typeof annoSet.d == "object") {
            annoSet.d = { ...anno.d, ...annoSet.d };
          }
          if (anno.f == "text") {
            let annoTx = editor.page.querySelector('.eAnnotation[anno="' + annoID + '"] div[text]');
            if (annoTx != null && annoSet.remove != true) {
              editor.selecting[annoID] = { ...select, ...annoSet };
              await utils.render({ ...anno, ...annoSet }, annoTx.parentElement);
              annoSet.s = anno.s ?? [];
              if (anno.textfit == true) {
                annoSet.s[0] = annoTx.offsetWidth + 6;
              }
              annoSet.s[1] = annoTx.offsetHeight + 6;
            }
          }/* else if (anno.f == "sticky") {
            let annoTx = editor.page.querySelector('.eAnnotation[anno="' + annoID + '"] div[holder]');
            if (annoTx != null) {
              if (annoTx.offsetHeight > annoTx.parentElement.offsetHeight) {
                editor.selecting[annoID] = { ...select, ...annoSet };
                await utils.render({ ...anno, ...annoSet }, annoTx.parentElement);
                annoSet.s = anno.s ?? [];
                annoSet.s[1] = annoTx.offsetHeight;
              }
            }
          }*/
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
        }

        this.action = "save";
        await this.endAction(null, null, null, saveHistory);
      },
      updateToolActions: async (frame) => {
        let toolbarModule = this.parent;
        let editor = toolbarModule.parent;
        let actionButtonHolder = frame.querySelector(".eSelectHolder");
        let toolButtons = actionButtonHolder.querySelectorAll(".eTool[action]");

        let self = editor.getSelf();
        let showLocked = self.access < 1;
        if (showLocked == false) {
          let selectKeys = Object.keys(editor.selecting);
          for (let i = 0; i < selectKeys.length; i++) {
            let selectID = selectKeys[i];
            let anno = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
            if (anno.lock == true) {
              showLocked = true;
              break;
            }
            if (editor.lesson.settings.editOthersWork != true && [anno.a, anno.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
              showLocked = true;
              break;
            }
          }
        }
        if (showLocked == false) {
          actionButtonHolder.removeAttribute("locked");
        } else {
          actionButtonHolder.setAttribute("locked", "");
          this.closeActionContainer(frame, null, true);
        }

        for (let i = 0; i < toolButtons.length; i++) {
          let module = await toolbarModule.getModule(toolButtons[i].getAttribute("action"));
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
  }
  removeActionUI = async function (actionUI) {
    if (actionUI == null) {
      return;
    }
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    editor.savePreferences();
    actionUI.setAttribute("remove", "");
    actionUI.style.transform = "translateY(-10%)";
    actionUI.style.opacity = 0;
    await sleep(200);
    if (actionUI != null) {
      actionUI.remove();
    }
  }
  enableAction = async function (event) {
    let target = event.target;
    if (target == null) {
      return;
    }
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
    this.activeElem = target.closest(".eSelectActive");
    this.annotationElem = target.closest(".eAnnotation, .eAnnotationHolder");
    if (this.annotationElem != null && this.annotationElem.className == "eAnnotationHolder") {
      this.annotationElem = null;
    }
    this.selectElem = target.closest(".eSelect");
    this.resizeElem = target.closest(".eSelectTooltip");
    if (this.resizeElem != null && this.resizeElem.hasAttribute("ignore") == true) {
      this.resizeElem = null;
    }
    /*
    let anno = this.annotationElem ?? this.selectElem;
    if (anno == null) {
      return;
    }
    let annoID = anno.getAttribute("anno");
    this.annotation = (editor.annotations[annoID] ?? {}).render;
    if (this.annotation == null) {
      return;
    }
    */
    if (editor.getSelf().access < 1) {
      return;
    }
    
    /*if (this.annotationElem != null && (this.annotationElem.querySelector("div[contenteditable]") != null || this.annotationElem.querySelector("div[visible] input") != null)) {
      return;
    }*/
    this.actionEnabled = false;
    //if (this.activeElem != null || (this.annotationElem != null && this.annotationElem.hasAttribute("selected"))) {
    if (this.resizeElem == null) {
      // Drag/Move Element
      this.action = "move";
      this.enableStartX = clientPosition(event, "x");
      this.enableStartY = clientPosition(event, "y");
      //let inverse = 1 / editor.zoom;
      //this.startX = this.enableStartX + window.scrollX; //) * inverse;
      //this.startY = this.enableStartY + window.scrollY; //) * inverse;
      let originalPos = await utils.scaleToDoc(this.enableStartX, this.enableStartY, 0);
      this.rootX = originalPos.x;
      this.rootY = originalPos.y;
      body.style.userSelect = "none";
      editor.page.style.touchAction = "pinch-zoom";
      event.preventDefault();
    } else {
      if (this.resizeElem.hasAttribute("duplicate") == false) {
        this.enableStartX = clientPosition(event, "x");
        this.enableStartY = clientPosition(event, "y");
        let originalPos = await utils.scaleToDoc(this.enableStartX, this.enableStartY, 0);

        // Must apply rotations based on the select box:
        let boundingBoxWidth = this.maxX - this.minX;
        let boundingBoxHeight = this.maxY - this.minY;
        let transformRotateWidth = this.minX + (boundingBoxWidth / 2);
        let transformRotateHeight = this.minY + (boundingBoxHeight / 2);

        let radian = this.selectRotation * (Math.PI / 180);

        //let originalWidth = (Math.abs(boundingBoxWidth * Math.cos(radian)) - Math.abs(boundingBoxHeight * Math.sin(radian))) / (Math.cos(radian) ** 2 - Math.sin(radian) ** 2);
        //let originalHeight = (Math.abs(boundingBoxHeight * Math.cos(radian)) - Math.abs(boundingBoxWidth * Math.sin(radian))) / (Math.cos(radian) ** 2 - Math.sin(radian) ** 2);
        let originalWidth = boundingBoxWidth;
        let originalHeight = boundingBoxHeight;

        if (this.selectRotation != 0) {
          originalWidth = this.lastElementWidth;
          originalHeight = this.lastElementHeight;
        }

        // Calculate the rotated bounding box dimensions using the original bounding box dimensions
        let rotatedWidth = Math.abs(boundingBoxWidth * Math.cos(radian)) + Math.abs(boundingBoxHeight * Math.sin(radian));
        let rotatedHeight = Math.abs(boundingBoxHeight * Math.cos(radian)) + Math.abs(boundingBoxWidth * Math.sin(radian));

        // Calculate the offset to the new top-left corner of the rotated bounding box:
        let offsetX = (rotatedWidth - originalWidth) / 2;
        let offsetY = (rotatedHeight - originalHeight) / 2;

        // Calculate the new top-left corner of the rotated bounding box:
        let rotatedTopLeftX = transformRotateWidth - (rotatedWidth / 2) + offsetX;
        let rotatedTopLeftY = transformRotateHeight - (rotatedHeight / 2) + offsetY;

        this.originalPosition = [rotatedTopLeftX, rotatedTopLeftY];
        this.originalSize = [originalWidth, originalHeight];

        if (this.resizeElem.getAttribute("tooltip") != "rotate") {
          // Resize Element
          this.action = "resize";

          let halfRotateWidth = this.originalPosition[0] + (this.originalSize[0] / 2);
          let halfRotateHeight = this.originalPosition[1] + (this.originalSize[1] / 2);
          let [xCoord, yCoord] = utils.rotatePoint(originalPos.x - halfRotateWidth, -(originalPos.y - halfRotateHeight), -this.selectRotation);
          this.rootX = xCoord;
          this.rootY = yCoord;
          this.tooltip = this.resizeElem.getAttribute("tooltip");
        } else {
          // Rotate Element
          this.action = "rotate";

          let centerX = this.originalSize[0] / 2;
          let centerY = this.originalSize[1] / 2;
          let yRoot = -(originalPos.y - (this.originalPosition[1] + centerY));
          let xRoot = originalPos.x - (this.originalPosition[0] + centerX);

          this.originalRotate = this.selectRotation;

          this.originalRotation = (Math.atan2(yRoot, xRoot) * 180) / Math.PI;
          if (this.originalRotation < 0) {
            this.originalRotation = 360 + this.originalRotation;
          }
        }
        body.style.userSelect = "none";
        editor.page.style.touchAction = "pinch-zoom";
        event.preventDefault();
      } else {
        // Duplicate Element
        let moreModule = await this.loadModule("dropdowns/editor/toolbar/more");
        moreModule.parent = toolbarModule;
        await moreModule.handleDuplicate(this.resizeElem.getAttribute("tooltip"));
      }
    }

    this.position = {};
    this.size = {};
    this.rotation = {};
  }
  snapThreshold = 8;
  renderSnaps = [];
  updateSnapLines = async function (render) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let content = editor.page.querySelector(".eContent");
    let pageHolder = content.querySelector(".ePageHolder");
    let pageRect = pageHolder.getBoundingClientRect();

    //let renderSnaps = [];
    let validSnaps = {};
    let snapX = 0;
    let snapY = 0;
    for (let i = 0; i < this.renderSnaps.length; i++) {
      let snap = this.renderSnaps[i];
      if (snap == null) {
        continue;
      }
      let existingValid = validSnaps[snap.type];
      if (existingValid != null) {
        if (snap.marker != null) {
          if (Math.max(snap.width, snap.height) > Math.max(existingValid.width, existingValid.height)) {
            continue;
          }
        } else {
          snap.width = snap.width + existingValid.width - (Math.min(snap.x + snap.width, existingValid.x + existingValid.width) - Math.max(snap.x, existingValid.x));
          snap.height = snap.height + existingValid.height - (Math.min(snap.y + snap.height, existingValid.y + existingValid.height) - Math.max(snap.y, existingValid.y));
          snap.x = Math.min(snap.x, existingValid.x);
          snap.y = Math.min(snap.y, existingValid.y);
        }
      }

      if (snap.marker != null && snap.width < 1 && snap.height < 1) {
        continue;
      }
      if (snap.width > 0 && snap.height > 0) {
        if (snap.width > snap.height) {
          snap.height = 0;
        } else {
          snap.width = 0;
        }
      }

      validSnaps[snap.type] = snap;
      //renderSnaps.push(snap);

      /*if (snap.additional != null) {
        let additional = snap.additional();
        for (let a = 0; a < additional.length; a++) {
          let snapVisual = additional[a];
          renderSnaps.push({ ...snapVisual, visual: true });
          validSnaps[snapVisual.type] = snapVisual;
        }
      }*/
      if (snap.additionalLines != null) {
        for (let a = 0; a < snap.additionalLines.length; a++) {
          let snapVisual = snap.additionalLines[a];
          //renderSnaps.push({ ...snapVisual, visual: true });
          validSnaps[snapVisual.type] = snapVisual;
        }
      }
    }
    if (validSnaps["left_left_side"] != null && validSnaps["right_right_side"] != null) {
      delete validSnaps["center_vertical"];
    }
    if (validSnaps["top_top_side"] != null && validSnaps["bottom_bottom_side"] != null) {
      delete validSnaps["center_horizontal"];
    }
    if (validSnaps["center_distance_left"] == null || validSnaps["center_distance_right"] == null || validSnaps["center_distance_right"].width - validSnaps["center_distance_left"].width > this.snapThreshold) {
      delete validSnaps["center_distance_left"];
      delete validSnaps["center_distance_right"];
    }
    if (validSnaps["center_distance_right"] == null || validSnaps["center_distance_left"] == null || validSnaps["center_distance_left"].width - validSnaps["center_distance_right"].width > this.snapThreshold) {
      delete validSnaps["center_distance_right"];
      delete validSnaps["center_distance_left"];
    }
    if (validSnaps["center_distance_top"] == null || validSnaps["center_distance_bottom"] == null || validSnaps["center_distance_bottom"].height - validSnaps["center_distance_top"].height > this.snapThreshold) {
      delete validSnaps["center_distance_top"];
      delete validSnaps["center_distance_bottom"];
    }
    if (validSnaps["center_distance_bottom"] == null || validSnaps["center_distance_top"] == null || validSnaps["center_distance_top"].height - validSnaps["center_distance_bottom"].height > this.snapThreshold) {
      delete validSnaps["center_distance_bottom"];
      delete validSnaps["center_distance_top"];
    }
    let renderSnaps = Object.keys(validSnaps);
    for (let i = 0; i < renderSnaps.length; i++) {
      let snap = validSnaps[renderSnaps[i]];
      if (snap == null) { //|| validSnaps[snap.type] == null) {
        continue;
      }

      if (snap.axis == "x") {
        snapX = snap.threshold;
      } else if (snap.axis == "y") {
        snapY = snap.threshold;
      }

      if (render != false) {
        let offsetWidth = -1;
        let offsetHeight = -1;
        if (snap.marker == "x") {
          offsetWidth += 1;
        } else if (snap.marker == "y") {
          offsetHeight += 1;
        }
        
        let snapElement = this.currentSnapElements[snap.type];
        if (snapElement == null) {
          content.insertAdjacentHTML("beforeend", `<div class="eSelectSnap" tooleditor new></div>`);
          snapElement = content.querySelector(".eSelectSnap[new]");
          snapElement.removeAttribute("new");
          this.currentSnapElements[snap.type] = snapElement;

          if (snap.marker == "x") {
            snapElement.insertAdjacentHTML("beforeend", `<div marker="snapxleft"></div><div marker="snapxright"></div>`);
          } else if (snap.marker == "y") {
            snapElement.insertAdjacentHTML("beforeend", `<div marker="snapytop"></div><div marker="snapybottom"></div>`);
          }
        }

        snapElement.style.width = Math.max(Math.round(snap.width * editor.zoom), 2) + "px";
        snapElement.style.height = Math.max(Math.round(snap.height * editor.zoom), 2) + "px";
        snapElement.style.left = Math.round(pageRect.x + (snap.x * editor.zoom) + window.scrollX + offsetWidth) + "px";
        snapElement.style.top = Math.round(pageRect.y + (snap.y * editor.zoom) + window.scrollY + offsetHeight) + "px";
      }
    }
    let checkRemoveSnaps = Object.keys(this.currentSnapElements);
    for (let i = 0; i < checkRemoveSnaps.length; i++) {
      let checkSnap = checkRemoveSnaps[i];
      if (validSnaps[checkSnap] == null) {
        this.currentSnapElements[checkSnap].remove();
        delete this.currentSnapElements[checkSnap];
      }
    }
    return { snapX: snapX, snapY: snapY };
  }
  snapItems = async function (event, extra) {
    // Loops through other visible annotations
    // Checks if sides / centers line up withen threshold
    // Also checks distance between items to check for patterns
    // Returns an offset X / Y to correct for line up

    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;

    if (["move", "resize"].includes(this.action) == false) {
      return { snapX: 0, snapY: 0 };
    }
    if (this.action == "resize" && this.selectRotation != 0) {
      return { snapX: 0, snapY: 0 };
    }
    if (editor.options.snapping == false) {
      return { snapX: 0, snapY: 0 };
    }
    if (Object.keys(editor.selecting).length < 1) {
      return { snapX: 0, snapY: 0 };
    }

    let content = editor.page.querySelector(".eContent");
    let pageHolder = content.querySelector(".ePageHolder");

    // Get page viewbox:
    let pageRect = pageHolder.getBoundingClientRect();
    let pageTopLeftX = -pageRect.left / editor.zoom;
    let pageTopLeftY = -pageRect.top / editor.zoom;
    let pageBottomRightX = (fixed.offsetWidth - pageRect.left) / editor.zoom;
    let pageBottomRightY = (fixed.offsetHeight - pageRect.top) / editor.zoom;

    // Determine selection bounds:
    let selectTopLeftX = this.minX;
    let selectTopLeftY = this.minY;
    let selectBottomRightX = this.maxX;
    let selectBottomRightY = this.maxY;
    if (extra.scaleWidth < 0) {
      selectTopLeftX = this.maxX;
      selectBottomRightX = this.minX;
    }
    if (extra.scaleHeight < 0) {
      selectTopLeftY = this.maxY;
      selectBottomRightY = this.minY;
    }

    // Get common parent:
    let hasCommonParent = true;
    let commonParent = null;
    let selectedKeys = Object.keys(editor.selecting);
    for (let i = 0; i < selectedKeys.length; i++) {
      let annoid = selectedKeys[i];
      let original = editor.annotations[annoid];
      if (original == null) {
        continue;
      }
      if (original.pointer != null) {
        annoid = original.pointer;
        original = editor.annotations[annoid] ?? { render: {} };
      }
      if (original == null || original.render == null) {
        continue;
      }
      //lowestZIndex = Math.min(original.render.l, lowestZIndex ?? original.render ?? 0);
      if (original.render.parent != commonParent && i > 0) {
        hasCommonParent = false;
        break;
      }
      commonParent = original.render.parent;
    }

    // Gets all items in loaded chunks:
    let annotationKeys = {};
    if (event.ctrlKey != true) {
      for (let c = 0; c < editor.visibleChunks.length; c++) {
        annotationKeys = { ...annotationKeys, ...(editor.chunkAnnotations[editor.visibleChunks[c]] ?? {}) };
      }
    }
    let annotations = Object.keys(annotationKeys);
    
    this.renderSnaps = [];
    let applySnap = (data, run) => {
      let threshold = Math.abs(data.threshold);
      if (threshold > this.snapThreshold) {
        return;
      }
      if (extra.resizeHandleAxis != null) {
        if (extra.resizeHandleAxis == "x" && data.axis == "y") {
          return;
        } else if (extra.resizeHandleAxis == "y" && data.axis == "x") {
          return;
        }
      }
      for (let i = 0; i < this.renderSnaps.length; i++) {
        let check = this.renderSnaps[i];
        if (check == null) {
          continue;
        }
        if (check.axis == data.axis) {
          let compare = Math.round(Math.abs(check.threshold) - threshold);
          if (compare > 0) {
            this.renderSnaps.splice(i, 1);
            i--;
          } else if (compare < 0) { // || check.type != data.type
            return;
          }
        }
        if (data.type == check.type && data.centerSize != null && check.centerSize != null) {
          if (data.centerSize > check.centerSize) {
            return;
          }/* else {
            this.renderSnaps.splice(i, 1);
            i--;
          }*/
        }
        if (data.type == check.type && data.marker != null && check.centerSize == null) {
          //return;
        }
      }
      if (extra.render != false || data.marker != null) {
        data = { ...data, ...run() };
        if (data.additional != null) {
          let result = data.additional();
          if (result === false) {
            return;
          } else {
            data.additionalLines = result;
          }
        }
      } else {
        data = { ...data, width: 0, height: 0, x: 0, y: 0 };
      }
      this.renderSnaps.push(data);
      /*let existingSnap = this.renderSnaps[type];
      if (existingSnap != null && existingSnap.distance - threshold > 0) {
        return;
      }
      this.renderSnaps[type] = { ...data, distance: threshold };*/
    }

    // Loop through loaded annotations:
    let checkDistanceXDirection = [];
    let checkDistanceYDirection = [];
    for (let i = 0; i < annotations.length; i++) {
      let annoid = annotations[i];
      let annotation = editor.annotations[annoid];
      if (annotation == null) {
        continue;
      }
      if (annotation.pointer != null) {
        annoid = annotation.pointer;
        annotation = editor.annotations[annoid];
      }
      if (editor.selecting[annoid] != null) {
        continue;
      }
      let render = annotation.render;
      if (render == null) {
        continue;
      }
      if (["markup", "draw"].includes(render.f) == true) {
        continue;
      }
      if (hasCommonParent == true && render.parent != commonParent && annoid != commonParent) {
        continue;
      }
      let currentAnnoCheck = render;
      let checkedParents = [];
      let enableContinue = false;
      while (currentAnnoCheck.parent != null) {
        let annoid = currentAnnoCheck.parent;
        if (annoid == null || checkedParents.includes(annoid) == true) {
          break;
        }
        checkedParents.push(annoid);
        let annotation = editor.annotations[annoid];
        if (annotation == null) {
          break;
        }
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = editor.annotations[annoid] ?? { render: {} };
        }
        if (editor.selecting[annoid] != null) {
          enableContinue = true;
          break;
        }
        currentAnnoCheck = annotation.render ?? {};
      }
      if (enableContinue == true) {
        continue;
      }
      let [x, y] = editor.getAbsolutePosition(render, true);
      let [width, height] = render.s;
      let thick = 0;
      if (render.t != null) {
        if (render.b != "none" || render.d == "line") {
          thick = render.t;
        }
      }
      if (width < 0) {
        width = -width;
        x -= width;
      }
      if (height < 0) {
        height = -height;
        y -= height;
      }
      let halfT = thick / 2;

      let radian = (render.r ?? 0) * (Math.PI / 180);
      let thickWidth = width + thick;
      let thickHeight = height + thick;
      let changedWidth = ((Math.abs(thickWidth * Math.cos(radian)) + Math.abs(thickHeight * Math.sin(radian))) - thickWidth) / 2;
      let changedHeight = ((Math.abs(thickWidth * Math.sin(radian)) + Math.abs(thickHeight * Math.cos(radian))) - thickHeight) / 2;
      
      x += halfT - changedWidth;
      y += halfT - changedHeight;
      width = thickWidth + (changedWidth * 2);
      height = thickHeight + (changedHeight * 2);
      
      // Check for snap lines:
      if (x + width > pageTopLeftX && x < pageBottomRightX && y + height > pageTopLeftY && y < pageBottomRightY) {
        if (this.action == "move" || ["topright", "bottomright", "right"].includes(this.tooltip) == false) {
          applySnap({ type: "left_left_side", axis: "x", threshold: x - selectTopLeftX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, y + height) - Math.min(selectTopLeftY, y)),
            x: x,
            y: Math.min(selectTopLeftY, y)
          };});
        }
        if (this.action == "move" || ["topleft", "bottomleft", "left"].includes(this.tooltip) == false) {
          applySnap({ type: "left_right_side", axis: "x", threshold: x - selectBottomRightX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, y + height) - Math.min(selectTopLeftY, y)),
            x: x,
            y: Math.min(selectTopLeftY, y)
          };});
        }
        if (this.action == "resize" && ["topright", "bottomright", "right"].includes(this.tooltip) == false) {
          applySnap({ type: "left_center_side", axis: "x", threshold: (x + (width / 2)) - selectTopLeftX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, y + height) - Math.min(selectTopLeftY, y)),
            x: x + (width / 2),
            y: Math.min(selectTopLeftY, y)
          };});
        }
        if (this.action == "move" || ["bottomleft", "bottomright", "bottom"].includes(this.tooltip) == false) {
          applySnap({ type: "top_top_side", axis: "y", threshold: y - selectTopLeftY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, x + width) - Math.min(selectTopLeftX, x)),
            height: 0,
            x: Math.min(selectTopLeftX, x),
            y: y
          };});
        }
        if (this.action == "move" || ["topleft", "topright", "top"].includes(this.tooltip) == false) {
          applySnap({ type: "top_bottom_side", axis: "y", threshold: y - selectBottomRightY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, x + width) - Math.min(selectTopLeftX, x)),
            height: 0,
            x: Math.min(selectTopLeftX, x),
            y: y
          };});
        }
        if (this.action == "resize" && ["bottomleft", "bottomright", "bottom"].includes(this.tooltip) == false) {
          applySnap({ type: "top_center_side", axis: "y", threshold: (y + (height / 2)) - selectTopLeftY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, x + width) - Math.min(selectTopLeftX, x)),
            height: 0,
            x: Math.min(selectTopLeftX, x),
            y: y + (height / 2)
          };});
        }
        if (this.action == "move" || ["topleft", "bottomleft", "left"].includes(this.tooltip) == false) {
          applySnap({ type: "right_right_side", axis: "x", threshold: (x + width) - selectBottomRightX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, y + height) - Math.min(selectTopLeftY, y)),
            x: x + width,
            y: Math.min(selectTopLeftY, y)
          };});
        }
        if (this.action == "move" || ["topright", "bottomright", "right"].includes(this.tooltip) == false) {
          applySnap({ type: "right_left_side", axis: "x", threshold: (x + width) - selectTopLeftX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, y + height) - Math.min(selectTopLeftY, y)),
            x: x + width,
            y: Math.min(selectTopLeftY, y)
          };});
        }
        if (this.action == "resize" && ["topleft", "bottomleft", "left"].includes(this.tooltip) == false) {
          applySnap({ type: "right_center_side", axis: "x", threshold: (x + (width / 2)) - selectBottomRightX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, y + height) - Math.min(selectTopLeftY, y)),
            x: x + (width / 2),
            y: Math.min(selectTopLeftY, y)
          };});
        }
        if (this.action == "move" || ["topleft", "topright", "top"].includes(this.tooltip) == false) {
          applySnap({ type: "bottom_bottom_side", axis: "y", threshold: (y + height) - selectBottomRightY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, x + width) - Math.min(selectTopLeftX, x)),
            height: 0,
            x: Math.min(selectTopLeftX, x),
            y: y + height
          };});
        }
        if (this.action == "move" || ["bottomleft", "bottomright", "bottom"].includes(this.tooltip) == false) {
          applySnap({ type: "bottom_top_side", axis: "y", threshold: (y + height) - selectTopLeftY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, x + width) - Math.min(selectTopLeftX, x)),
            height: 0,
            x: Math.min(selectTopLeftX, x),
            y: y + height
          };});
        }
        if (this.action == "resize" && ["topleft", "topright", "top"].includes(this.tooltip) == false) {
          applySnap({ type: "bottom_center_side", axis: "y", threshold: (y + (height / 2)) - selectBottomRightY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, x + width) - Math.min(selectTopLeftX, x)),
            height: 0,
            x: Math.min(selectTopLeftX, x),
            y: y + (height / 2)
          };});
        }
        
        if (this.action == "move") {
          applySnap({ type: "center_vertical", axis: "x", threshold: (x + (width / 2)) - (selectTopLeftX + ((selectBottomRightX - selectTopLeftX) / 2)) }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, y + height) - Math.min(selectTopLeftY, y)),
            x: x + (width / 2),
            y: Math.min(selectTopLeftY, y)
          };});
          applySnap({ type: "center_horizontal", axis: "y", threshold: (y + (height / 2)) - (selectTopLeftY + ((selectBottomRightY - selectTopLeftY) / 2)) }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, x + width) - Math.min(selectTopLeftX, x)),
            height: 0,
            x: Math.min(selectTopLeftX, x),
            y: y + (height / 2)
          };});

          // Check for equal distance snap:
          if (hasCommonParent == true) {
            if (x < selectTopLeftX || y < selectTopLeftY || x + width > selectBottomRightX || y + height > selectBottomRightY) {
              if (x < selectBottomRightX && x + width > selectTopLeftX) {
                checkDistanceYDirection.push({ _id: annoid, width: width, height: height, x: x, y: y });
              }
              if (y < selectBottomRightY && y + height > selectTopLeftY) {
                checkDistanceXDirection.push({ _id: annoid, width: width, height: height, x: x, y: y });
              }
            }
          }
        }
      }
    }

    // Check for equal distance snap:
    checkDistanceXDirection.sort((a, b) => (a.x + (a.width / 2)) - (b.x + (b.width / 2)));
    checkDistanceYDirection.sort((a, b) => (a.y + (a.height / 2)) - (b.y + (b.height / 2)));
    let xDistances = {};
    let xDistanceIds = {};
    for (let i = 0; i < checkDistanceXDirection.length; i++) {
      let el1 = checkDistanceXDirection[i];
      for (let j = i + 1; j < checkDistanceXDirection.length; j++) {
        let el2 = checkDistanceXDirection[j];
        let distance = 0;
        if (el2.x > el1.x + el1.width) {
          distance = el2.x - el1.x - el1.width;
        } else if (el1.x > el2.x + el2.width) {
          distance = el1.x - el2.x - el2.width;
        } else if (el2.x + el2.width < el1.x) {
          distance = el1.x - el2.x - el2.width;
        } else if (el1.x + el1.width < el2.x) {
          distance = el2.x - el1.x - el1.width;
        }
        distance = Math.round(distance);
        if (distance > 0) {
          if (xDistances[distance] == null) {
            xDistances[distance] = [];
          }
          xDistances[distance].push([el1, el2]);
          if (xDistanceIds[distance] == null) {
            xDistanceIds[distance] = {};
          }
          xDistanceIds[distance][el1._id] = "";
          xDistanceIds[distance][el2._id] = "";
        }
      }
    }
    /*for (let i = 0; i < checkDistanceXDirection.length - 1; i++) {
      let el1 = checkDistanceXDirection[i];
      let el2 = checkDistanceXDirection[i + 1];
      let distance = 0;
      if (el2.x > el1.x + el1.width) {
        distance = el2.x - el1.x - el1.width;
      } else if (el1.x > el2.x + el2.width) {
        distance = el1.x - el2.x - el2.width;
      } else if (el2.x + el2.width < el1.x) {
        distance = el1.x - el2.x - el2.width;
      } else if (el1.x + el1.width < el2.x) {
        distance = el2.x - el1.x - el1.width;
      }
      distance = Math.round(distance);
      if (distance > 0) {
        if (xDistances[distance] == null) {
          xDistances[distance] = [];
        }
        xDistances[distance].push([el1, el2]);
      }
    }*/
    let yDistances = {};
    let yDistanceIds = {};
    for (let i = 0; i < checkDistanceYDirection.length; i++) {
      let el1 = checkDistanceYDirection[i];
      for (let j = i + 1; j < checkDistanceYDirection.length; j++) {
        let el2 = checkDistanceYDirection[j];
        let distance = 0;
        if (el2.y > el1.y + el1.height) {
          distance = el2.y - el1.y - el1.height;
        } else if (el1.y > el2.y + el2.height) {
          distance = el1.y - el2.y - el2.height;
        } else if (el2.y + el2.height < el1.y) {
          distance = el1.y - el2.y - el2.height;
        } else if (el1.y + el1.height < el2.y) {
          distance = el2.y - el1.y - el1.height;
        }
        distance = Math.round(distance);
        if (distance > 0) {
          if (yDistances[distance] == null) {
            yDistances[distance] = [];
          }
          yDistances[distance].push([el1, el2]);
          if (yDistanceIds[distance] == null) {
            yDistanceIds[distance] = {};
          }
          yDistanceIds[distance][el1._id] = "";
          yDistanceIds[distance][el2._id] = "";
        }
      }
    }
    /*for (let i = 0; i < checkDistanceYDirection.length - 1; i++) {
      let el1 = checkDistanceYDirection[i];
      let el2 = checkDistanceYDirection[i + 1];
      let distance = 0;
      let checkDistance = (loop) => {
        distance = 0;
        if (el2.y > el1.y + el1.height) {
          distance = el2.y - el1.y - el1.height;
        } else if (el1.y > el2.y + el2.height) {
          distance = el1.y - el2.y - el2.height;
        } else if (el2.y + el2.height < el1.y) {
          distance = el1.y - el2.y - el2.height;
        } else if (el1.y + el1.height < el2.y) {
          distance = el2.y - el1.y - el1.height;
        }
        if (distance == 0) {
          loop++;
          el2 = checkDistanceYDirection[i + loop];
          if (el2 != null) {
            checkDistance(loop);
          }
        }
      }
      checkDistance(0);
      distance = Math.round(distance);
      if (distance > 0) {
        if (yDistances[distance] == null) {
          yDistances[distance] = [];
        }
        yDistances[distance].push([el1, el2]);
      }
    }*/
    let checkOverlap = (pos1, length1, pos2, length2) => {
      if (pos1 < pos2 + length2 && pos2 < pos1 + length1) {
        return true;
      }
      return false;
    }
    let determinePositionAxis = (elementPos, elementSize, selectPos1, selectPos2) => {
      if (elementSize < selectPos2 - selectPos1) {
        let offset = 0;
        if (selectPos1 > elementPos) {
          offset = (elementPos - selectPos1) / 2;
        } else if (selectPos2 < elementPos + elementSize) {
          offset = (elementPos + elementSize - selectPos2) / 2;
        }
        return (elementPos + (elementSize / 2)) - offset;
      } else {
        let offset = 0;
        if (selectPos1 < elementPos) {
          offset = (selectPos1 - elementPos) / 2;
        } else if (selectPos2 > elementPos + elementSize) {
          offset = (selectPos2 - elementPos - elementSize) / 2;
        }
        return selectPos1 + ((selectPos2 - selectPos1) / 2) - offset;
      }
    }
    let xDistanceKeys = Object.keys(xDistances);
    for (let i = 0; i < xDistanceKeys.length; i++) {
      let key = xDistanceKeys[i];
      let distance = parseFloat(key);
      let elements = xDistances[key];
      let elemIds = xDistanceIds[key];

      for (let s = 0; s < checkDistanceXDirection.length; s++) {
        let elem = checkDistanceXDirection[s]; //elements[s];

        applySnap({ type: "right_left_distance", axis: "x", marker: "x", threshold: elem.x - selectBottomRightX - distance }, () => { return {
          width: elem.x - selectBottomRightX,
          height: 0,
          x: selectBottomRightX,
          y: determinePositionAxis(elem.y, elem.height, selectTopLeftY, selectBottomRightY),
          additional: function () {
            let renderLines = [];
            for (let e = 0; e < elements.length; e++) {
              let [el1, el2] = elements[e];
              let lineSize = el2.x - el1.x - el1.width;
              let linePos = el1.x + el1.width;
              if (checkOverlap(this.x, this.width, linePos, lineSize)) {
                return false;
              }
              renderLines.push({
                type: "right_left_distance_" + Math.floor(lineSize) + "_" + Math.floor(linePos),
                width: lineSize,
                height: 0,
                x: linePos,
                y: determinePositionAxis(el2.y, el2.height, el1.y, el1.y + el1.height),
                marker: "x"
              });
            }
            return renderLines;
          }
        };});
        applySnap({ type: "left_right_distance", axis: "x", marker: "x", threshold: distance - selectTopLeftX + elem.x + elem.width }, () => { return {
          width: selectTopLeftX - elem.x - elem.width,
          height: 0,
          x: elem.x + elem.width,
          y: determinePositionAxis(elem.y, elem.height, selectTopLeftY, selectBottomRightY),
          additional: function () {
            let renderLines = [];
            for (let e = 0; e < elements.length; e++) {
              let [el1, el2] = elements[e];
              let lineSize = el2.x - el1.x - el1.width;
              let linePos = el1.x + el1.width;
              if (checkOverlap(this.x, this.width, linePos, lineSize)) {
                return false;
              }
              renderLines.push({
                type: "left_right_distance_" + Math.floor(lineSize) + "_" + Math.floor(linePos),
                width: lineSize,
                height: 0,
                x: linePos,
                y: determinePositionAxis(el2.y, el2.height, el1.y, el1.y + el1.height),
                marker: "x"
              });
            }
            return renderLines;
          }
        };});
        if (elemIds[elem._id] == null) {
          continue;
        }
        let leftCenterSize = selectTopLeftX - elem.x - elem.width;
        applySnap({ type: "center_distance_left", center: true, axis: "x", marker: "x", centerSize: leftCenterSize, threshold: -((distance / 2) - selectTopLeftX - ((selectBottomRightX - selectTopLeftX) / 2) + elem.x + elem.width) }, () => { return {
          width: leftCenterSize,
          height: 0,
          x: elem.x + elem.width,
          y: determinePositionAxis(elem.y, elem.height, selectTopLeftY, selectBottomRightY)
        };});
        let rightCenterSize = elem.x - selectBottomRightX;
        applySnap({ type: "center_distance_right", center: true, axis: "x", marker: "x", centerSize: rightCenterSize, threshold: -((distance / 2) + selectTopLeftX + ((selectBottomRightX - selectTopLeftX) / 2) - elem.x) }, () => { return {
          width: rightCenterSize,
          height: 0,
          x: selectBottomRightX,
          y: determinePositionAxis(elem.y, elem.height, selectTopLeftY, selectBottomRightY)
        };});
      }
    }
    let yDistanceKeys = Object.keys(yDistances);
    for (let i = 0; i < yDistanceKeys.length; i++) {
      let key = yDistanceKeys[i];
      let distance = parseFloat(key);
      let elements = yDistances[key];
      let elemIds = yDistanceIds[key];

      for (let s = 0; s < checkDistanceYDirection.length; s++) {
        let elem = checkDistanceYDirection[s]; //elements[s];

        applySnap({ type: "bottom_top_distance", axis: "y", marker: "y", threshold: elem.y - selectBottomRightY - distance }, () => { return {
          width: 0,
          height: elem.y - selectBottomRightY,
          x: determinePositionAxis(elem.x, elem.width, selectTopLeftX, selectBottomRightX),
          y: selectBottomRightY,
          additional: function () {
            let renderLines = [];
            for (let e = 0; e < elements.length; e++) {
              let [el1, el2] = elements[e];
              let lineSize = el2.y - el1.y - el1.height;
              let linePos = el1.y + el1.height;
              if (checkOverlap(this.y, this.height, linePos, lineSize)) {
                return false;
              }
              renderLines.push({
                type: "bottom_top_distance_" + Math.floor(lineSize) + "_" + Math.floor(linePos),
                width: 0,
                height: lineSize,
                x: determinePositionAxis(el2.x, el2.width, el1.x, el1.x + el1.width),
                y: linePos,
                marker: "y"
              });
            }
            return renderLines;
          }
        };});
        applySnap({ type: "top_bottom_distance", axis: "y", marker: "y", threshold: distance - selectTopLeftY + elem.y + elem.height }, () => { return {
          width: 0,
          height: selectTopLeftY - elem.y - elem.height,
          x: determinePositionAxis(elem.x, elem.width, selectTopLeftX, selectBottomRightX),
          y: elem.y + elem.height,
          additional: function () {
            let renderLines = [];
            for (let e = 0; e < elements.length; e++) {
              let [el1, el2] = elements[e];
              let lineSize = el2.y - el1.y - el1.height;
              let linePos = el1.y + el1.height;
              if (checkOverlap(this.y, this.height, linePos, lineSize)) {
                return false;
              }
              renderLines.push({
                type: "top_bottom_distance_" + Math.floor(lineSize) + "_" + Math.floor(linePos),
                width: 0,
                height: lineSize,
                x: determinePositionAxis(el2.x, el2.width, el1.x, el1.x + el1.width),
                y: linePos,
                marker: "y"
              });
            }
            return renderLines;
          }
        };});
        
        if (elemIds[elem._id] == null) {
          continue;
        }

        let topCenterSize = selectTopLeftY - elem.y - elem.height;
        applySnap({ type: "center_distance_top", center: true, axis: "y", marker: "y", centerSize: topCenterSize, threshold: -((distance / 2) - selectTopLeftY - ((selectBottomRightY - selectTopLeftY) / 2) + elem.y + elem.height) }, () => { return {
          width: 0,
          height: topCenterSize,
          x: determinePositionAxis(elem.x, elem.width, selectTopLeftX, selectBottomRightX),
          y: elem.y + elem.height
        };});
        let bottomCenterSize = elem.y - selectBottomRightY;
        applySnap({ type: "center_distance_bottom", center: true, axis: "y", marker: "y", centerSize: bottomCenterSize, threshold: -((distance / 2) + selectTopLeftY + ((selectBottomRightY - selectTopLeftY) / 2) - elem.y) }, () => { return {
          width: 0,
          height: bottomCenterSize,
          x: determinePositionAxis(elem.x, elem.width, selectTopLeftX, selectBottomRightX),
          y: selectBottomRightY
        };});
      }
    }

    // Render snap lines:
    return await this.updateSnapLines(extra.render);
  }
  scrollIntervalX = 0;
  scrollIntervalY = 0;
  scrollIntervalRunning = false;
  setScrollInterval = async function () {
    if (this.scrollIntervalRunning == true) {
      return;
    }
    this.scrollIntervalRunning = true;
    while (this.action != null && (this.scrollIntervalX != 0 || this.scrollIntervalY != 0)) {
      window.scrollTo(window.scrollX + this.scrollIntervalX, window.scrollY + this.scrollIntervalY);
      await this.moveAction(this.scrollLastEvent, null, null, true);
      await sleep(10);
    }
    this.scrollIntervalRunning = false;
  }
  lastMouseX = 0;
  lastMouseY = 0;
  moveAction = async function (event, snapX, snapY, fromScroll) {
    if (this.action == null) {
      return;
    }
    if (mouseDown() == false) {
      this.endAction();
      return;
    }
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
    //let inverse = 1 / editor.zoom;
    let mouseX = this.lastMouseX;
    let mouseY = this.lastMouseY;
    
    if (event != null) {
      mouseX = clientPosition(event, "x");
      mouseY = clientPosition(event, "y");
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
      this.scrollLastEvent = event;
    } else {
      event = this.scrollLastEvent ?? {};
    }

    this.endX = mouseX + window.scrollX; //) * inverse;
    this.endY = mouseY + window.scrollY; //) * inverse;

    let self = editor.getSelf();

    if (this.actionEnabled == false) {
      if (Math.abs(mouseX - this.enableStartX) > 3 || Math.abs(mouseY - this.enableStartY) > 3) {
        this.actionEnabled = true;
      } else {
        return;
      }
    }

    // Handle Scroll with Mouse:
    if (fromScroll != true && ["move", "resize"].includes(this.action) == true) {
      let scrollOffset = 32;
      this.scrollIntervalX = 0;
      this.scrollIntervalY = 0;
      let leftPos = scrollOffset - mouseX;
      if (leftPos > 0) {
        let percentage = 1 + ((leftPos - scrollOffset) / scrollOffset);
        this.scrollIntervalX = -Math.min(6 * percentage, 10);
      }
      let rightPos = mouseX - fixed.offsetWidth + scrollOffset;
      if (rightPos > 0) {
        let percentage = 1 + ((rightPos - scrollOffset) / scrollOffset);
        this.scrollIntervalX = Math.min(6 * percentage, 10);
      }
      let topPos = scrollOffset - mouseY;
      if (topPos > 0) {
        let percentage = 1 + ((topPos - scrollOffset) / scrollOffset);
        this.scrollIntervalY = -Math.min(6 * percentage, 10);
      }
      let bottomPos = mouseY - fixed.offsetHeight + scrollOffset;
      if (bottomPos > 0) {
        let percentage = 1 + ((bottomPos - scrollOffset) / scrollOffset);
        this.scrollIntervalY = Math.min(6 * percentage, 10);
      }
      if (this.scrollIntervalX != 0 || this.scrollIntervalY != 0) {
        return this.setScrollInterval();
      }
    }

    let keys = Object.keys(editor.selecting);
    let setTempSync = getEpoch();
    
    let { x, y } = await utils.scaleToDoc(mouseX, mouseY, 0);
    let offsetSnapX = snapX ?? 0;
    let offsetSnapY = snapY ?? 0;

    let scaleWidth = 1;
    let scaleHeight = 1;
    let snapHandleAxis;
    let changeXCoord = 0;
    let changeYCoord = 0;
    let sizeLimitX = false;
    let sizeLimitY = false;
    let fixAnnotationHolder = this.tooltip;
    let preserveAspect = this.resizePreserveAspect || event.shiftKey || false;
    let rotateChange = 0;
    if (this.action == "resize") {
      // Calculate the change in width / height:
      let originalMidpointX = this.originalSize[0] / 2;
      let originalMidpointY = this.originalSize[1] / 2;
      let halfRotateWidth = this.originalPosition[0] + originalMidpointX;
      let halfRotateHeight = this.originalPosition[1] + originalMidpointY;
      let [xCoord, yCoord] = utils.rotatePoint(x - halfRotateWidth, -(y - halfRotateHeight), -this.selectRotation);
      let changeX = xCoord - this.rootX + offsetSnapX;
      let changeY = yCoord - this.rootY - offsetSnapY;
      if (this.rootX < 0) {
        changeX *= -1;
      }
      if (this.rootY < 0) {
        changeY *= -1;
      }
      if (keys.length > 1) {
        if (this.originalSize[0] + changeX < 25) {
          changeX = -this.originalSize[0] + 25;
        }
        if (this.originalSize[1] + changeY < 25) {
          changeY = -this.originalSize[1] + 25;
        }
      }
      //scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
      //scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];

      // Handle resize based on handles:
      let oppositePositionX = 0;
      let oppositePositionY = 0;
      let newSize = [0, 0];
      let newOppositePositionX = 0;
      let newOppositePositionY = 0;
      switch (this.tooltip) {
        case "bottomright":
          if (preserveAspect == true || this.multiSelectResizePreserveAspect == true) {
            let setXFromChangeX = this.originalSize[0] + changeX;
            let setYFromChangeX = this.originalSize[1] * ((this.originalSize[0] + changeX) / this.originalSize[0]);
            let setXFromChangeY = this.originalSize[0] * ((this.originalSize[1] + changeY) / this.originalSize[1]);
            let setYFromChangeY = this.originalSize[1] + changeY;
            if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
              scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
              snapHandleAxis = "x";
            } else {
              scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
              snapHandleAxis = "y";
            }
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0];
          oppositePositionY = this.originalPosition[1];
          newOppositePositionX = this.originalPosition[0];
          newOppositePositionY = this.originalPosition[1];
          break;
        case "topleft":
          if (preserveAspect == true || this.multiSelectResizePreserveAspect == true) {
            let setXFromChangeX = this.originalSize[0] + changeX;
            let setYFromChangeX = this.originalSize[1] * ((this.originalSize[0] + changeX) / this.originalSize[0]);
            let setXFromChangeY = this.originalSize[0] * ((this.originalSize[1] + changeY) / this.originalSize[1]);
            let setYFromChangeY = this.originalSize[1] + changeY;
            if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
              scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
              snapHandleAxis = "x";
            } else {
              scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
              snapHandleAxis = "y";
            }
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + this.originalSize[0];
          oppositePositionY = this.originalPosition[1] + this.originalSize[1];
          newOppositePositionX = this.originalPosition[0] + newSize[0];
          newOppositePositionY = this.originalPosition[1] + newSize[1];
          break;
        case "topright":
          if (preserveAspect == true || this.multiSelectResizePreserveAspect == true) {
            let setXFromChangeX = this.originalSize[0] + changeX;
            let setYFromChangeX = this.originalSize[1] * ((this.originalSize[0] + changeX) / this.originalSize[0]);
            let setXFromChangeY = this.originalSize[0] * ((this.originalSize[1] + changeY) / this.originalSize[1]);
            let setYFromChangeY = this.originalSize[1] + changeY;
            if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
              scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
              snapHandleAxis = "x";
            } else {
              scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
              snapHandleAxis = "y";
            }
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0];
          oppositePositionY = this.originalPosition[1] + this.originalSize[1];
          newOppositePositionX = this.originalPosition[0];
          newOppositePositionY = this.originalPosition[1] + newSize[1];
          break;
        case "bottomleft":
          if (preserveAspect == true || this.multiSelectResizePreserveAspect == true) {
            let setXFromChangeX = this.originalSize[0] + changeX;
            let setYFromChangeX = this.originalSize[1] * ((this.originalSize[0] + changeX) / this.originalSize[0]);
            let setXFromChangeY = this.originalSize[0] * ((this.originalSize[1] + changeY) / this.originalSize[1]);
            let setYFromChangeY = this.originalSize[1] + changeY;
            if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
              scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
              snapHandleAxis = "x";
            } else {
              scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
              snapHandleAxis = "y";
            }
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + this.originalSize[0];
          oppositePositionY = this.originalPosition[1];
          newOppositePositionX = this.originalPosition[0] + newSize[0];
          newOppositePositionY = this.originalPosition[1];
          break;
        case "right":
          if (preserveAspect == true) {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0];
          oppositePositionY = this.originalPosition[1] + (this.originalSize[1] / 2);
          newOppositePositionX = this.originalPosition[0];
          newOppositePositionY = this.originalPosition[1] + (newSize[1] / 2);
          fixAnnotationHolder = "bottomright";
          snapHandleAxis = "x";
          break;
        case "bottom":
          if (preserveAspect == true) {
            scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
            scaleHeight = scaleWidth;
          } else {
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + (this.originalSize[0] / 2);
          oppositePositionY = this.originalPosition[1];
          newOppositePositionX = this.originalPosition[0] + (newSize[0] / 2);
          newOppositePositionY = this.originalPosition[1];
          fixAnnotationHolder = "bottomright";
          snapHandleAxis = "y";
          break;
        case "left":
          if (preserveAspect == true) {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + this.originalSize[0];
          oppositePositionY = this.originalPosition[1] + (this.originalSize[1] / 2);
          newOppositePositionX = this.originalPosition[0] + newSize[0];
          newOppositePositionY = this.originalPosition[1] + (newSize[1] / 2);
          fixAnnotationHolder = "topleft";
          snapHandleAxis = "x";
          break;
        case "top":
          if (preserveAspect == true) {
            scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
            scaleHeight = scaleWidth;
          } else {
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + (this.originalSize[0] / 2);
          oppositePositionY = this.originalPosition[1] + this.originalSize[1];
          newOppositePositionX = this.originalPosition[0] + (newSize[0] / 2);
          newOppositePositionY = this.originalPosition[1] + newSize[1];
          fixAnnotationHolder = "topleft";
          snapHandleAxis = "y";
      }
      
      let newSelectionMidpointX = newSize[0] / 2;
      let newSelectionMidpointY = newSize[1] / 2;
      
      let midpointChangeX = newSelectionMidpointX - originalMidpointX;
      let midpointChangeY = newSelectionMidpointY - originalMidpointY;
      
      // Calculate relative position:
      let [originalXCoord, originalYCoord] = utils.rotatePoint(oppositePositionX - halfRotateWidth, -(oppositePositionY - halfRotateHeight), this.selectRotation);

      let newHalfRotateWidth = this.originalPosition[0] + newSelectionMidpointX;
      let newHalfRotateHeight = this.originalPosition[1] + newSelectionMidpointY;
      let [newXCoord, newYCoord] = utils.rotatePoint(newOppositePositionX - newHalfRotateWidth, -(newOppositePositionY - newHalfRotateHeight), this.selectRotation);

      // Calculate change in opposite handle position:
      changeXCoord = (newXCoord + newHalfRotateWidth) - (originalXCoord + halfRotateWidth) - midpointChangeX;
      changeYCoord = (newHalfRotateHeight - newYCoord) - (halfRotateHeight - originalYCoord) - midpointChangeY;

      sizeLimitX = oppositePositionX != newOppositePositionX;
      sizeLimitY = oppositePositionY != newOppositePositionY;
    } else if (this.action == "rotate") {
      let centerX = this.originalSize[0] / 2;
      let centerY = this.originalSize[1] / 2;
      let yRoot = -(y - (this.originalPosition[1] + centerY));
      let xRoot = x - (this.originalPosition[0] + centerX);

      let newRotation = (Math.atan2(yRoot, xRoot) * 180) / Math.PI;
      if (newRotation < 0) {
        newRotation = 360 + newRotation;
      }
      let snapDegree = 15;
      if (event.shiftKey == true) {
        snapDegree = 1;
      }
      let setRotation = Math.round((this.originalRotate + (this.originalRotation - newRotation)) / snapDegree) * snapDegree;
      rotateChange = (Math.round(setRotation / snapDegree) * snapDegree) - this.originalRotate;
    }

    for (let i = 0; i < keys.length; i++) {
      let annoid = keys[i];
      let original = editor.annotations[annoid];
      if (original == null) {
        continue;
      }
      if (original.render == null && original.pointer == null) {
        delete editor.annotations[annoid];
        continue;
      }
      if (original.pointer != null) {
        annoid = original.pointer;
        original = editor.annotations[annoid] ?? { render: {} };
      }
      let select = editor.selecting[annoid];
      delete select.done;
      let anno = {
        f: original.render.f,
        p: [original.render.p[0], original.render.p[1]],
        s: [original.render.s[0], original.render.s[1]],
        r: original.render.r,
        t: original.render.t,
        b: original.render.b,
        d: original.render.d
      };
      if (original.revert == null) {
        original.revert = JSON.parse(JSON.stringify(original.render));
      }
      if (original.render.lock == true) {
        return this.endAction();
      }
      if (self.access < 1) {
        delete editor.selecting[annoid];
        return;
      }
      if (editor.lesson.settings.editOthersWork != true && [original.render.a, original.render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
        delete editor.selecting[annoid];
        return;
      }

      let thick = 0;
      if (anno.t != null) {
        if (anno.b != "none" || anno.d == "line") {
          thick = anno.t;
        }
      }
      let halfThick = thick / 2;

      if (this.position[annoid] == null) {
        this.position[annoid] = [anno.p[0], anno.p[1]];
      }
      if (this.size[annoid] == null) {
        this.size[annoid] = [anno.s[0], anno.s[1]];
      }
      if (this.rotation[annoid] == null) {
        this.rotation[annoid] = anno.r ?? 0;
      }

      if (this.action == "move") {
        select.p = select.p ?? anno.p;
        let originalAnnoPos = this.position[annoid];
        select.p[0] = utils.round(originalAnnoPos[0] + (x - this.rootX) + offsetSnapX);
        select.p[1] = utils.round(originalAnnoPos[1] + (y - this.rootY) + offsetSnapY);
      } else if (this.action == "resize") {
        select.p = select.p ?? anno.p;
        select.s = select.s ?? anno.s;
        let [originalAnnoX, originalAnnoY] = editor.getAbsolutePosition(original.render);
        let originalAnnoSize = this.size[annoid];

        if (originalAnnoSize[0] == 0 || originalAnnoSize[1] == 0) {
          continue;
        }

        let rotate = anno.r ?? 0;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        if (scaleWidth == scaleHeight && this.selectRotation == 0) {
          rotate = 0;
        }
        let rotateDifference = rotate - this.selectRotation;
        let radian = rotateDifference * (Math.PI / 180);
        
        let useOriginalWidth = Math.abs(originalAnnoSize[0]) + thick;
        let useOriginalHeight = Math.abs(originalAnnoSize[1]) + thick;

        // FIRST: Figure out the bounding box size of element:
        let boundingWidth = Math.abs(useOriginalWidth * Math.cos(radian)) + Math.abs(useOriginalHeight * Math.sin(radian));
        let boundingHeight = Math.abs(useOriginalHeight * Math.cos(radian)) + Math.abs(useOriginalWidth * Math.sin(radian));
        
        // SECOND: Apply the scaling to the bouding box:
        let setBoundWidth = boundingWidth * scaleWidth;
        let setBoundHeight = boundingHeight * scaleHeight;
        
        // THIRD: Determine actual element width by converting bounding box size back to element size:
        let setWidth = 0;
        let setHeight = 0;
        let maintainSizeWidth = false;
        let maintainSizeHeight = false;

        let absRotate = Math.abs(rotateDifference);
        if (absRotate > 45 && absRotate < 135) {
          let cosAbs = Math.abs(Math.cos((rotateDifference + 90) * (Math.PI / 180)));
          let cosCorrectWidth = (boundingHeight / cosAbs) - useOriginalWidth;
          let cosCorrectHeight = (boundingWidth / cosAbs) - useOriginalHeight;
          let revertThickWidth = thick;
          let revertThickHeight = thick;
          if (rotateDifference != 0) {
            if (setBoundWidth < 0) {
              cosCorrectWidth *= -1;
              revertThickWidth *= -1;
            }
            if (setBoundHeight < 0) {
              cosCorrectHeight *= -1;
              revertThickHeight *= -1;
            }
          }
          setWidth = (setBoundHeight / cosAbs) - cosCorrectWidth - revertThickWidth;
          setHeight = (setBoundWidth / cosAbs) - cosCorrectHeight - revertThickHeight;

          if (keys.length > 1) {
            if (setWidth < 25) {
              setWidth = 25;
              maintainSizeHeight = true;
            }
            if (setHeight < 25) {
              setHeight = 25;
              maintainSizeWidth = true;
            }
          }
        } else {
          let cosAbs = Math.abs(Math.cos(radian));
          let cosCorrectWidth = (boundingWidth / cosAbs) - useOriginalWidth;
          let cosCorrectHeight = (boundingHeight / cosAbs) - useOriginalHeight;
          let revertThickWidth = thick;
          let revertThickHeight = thick;
          if (rotateDifference != 0) {
            if (setBoundWidth < 0) {
              cosCorrectWidth *= -1;
              revertThickWidth *= -1;
            }
            if (setBoundHeight < 0) {
              cosCorrectHeight *= -1;
              revertThickHeight *= -1;
            }
          }
          setWidth = (setBoundWidth / cosAbs) - cosCorrectWidth - revertThickWidth;
          setHeight = (setBoundHeight / cosAbs) - cosCorrectHeight - revertThickHeight;

          if (keys.length > 1) {
            if (setWidth < 25) {
              setWidth = 25;
              maintainSizeWidth = true;
            }
            if (setHeight < 25) {
              setHeight = 25;
              maintainSizeHeight = true;
            }
          }
        }
        
        // Preserve original sign:
        if (originalAnnoSize[0] < 0) {
          setWidth *= -1;
        }
        if (originalAnnoSize[1] < 0) {
          setHeight *= -1;
        }

        // FINALLY: Apply the new size:
        select.s[0] = utils.round(setWidth);
        select.s[1] = utils.round(setHeight);
        
        // Special function cases:
        if (["text"].includes(anno.f ?? select.f) == true) {
          await utils.render({ ...original.render, ...select, _id: annoid, sync: setTempSync });
          if (anno.f == "text") {
            let renderedAnno = editor.page.querySelector('.eAnnotation[anno="' + annoid + '"] div[edit]');
            if (renderedAnno != null) {
              if (original.render.textfit == true && select.textfit != false) {
                select.s[0] = renderedAnno.offsetWidth + 6;
                select.textfit = false;
              }
              select.s[1] = renderedAnno.offsetHeight + 6; //Math.max(select.s[1], renderedAnno.offsetHeight + 6);
            }
          }
        }

        // Get original midpoint of element:
        let originalAnnoMidpointX = (originalAnnoSize[0] + thick) / 2;
        let originalAnnoMidpointY = (originalAnnoSize[1] + thick) / 2;

        // Get offset from center of select box:
        let offsetX = originalAnnoX + halfThick + originalAnnoMidpointX - this.originalPosition[0] - (this.originalSize[0] / 2);
        let offsetY = originalAnnoY + halfThick + originalAnnoMidpointY - this.originalPosition[1] - (this.originalSize[1] / 2);

        // Calculate center of original selection box:
        let selectionCenterX = this.originalPosition[0] + (this.originalSize[0] / 2);
        let selectionCenterY = this.originalPosition[1] + (this.originalSize[1] / 2);

        // Get midpoint of element:
        let newAnnoMidpointX = (setWidth + thick) / 2;
        let newAnnoMidpointY = (setHeight + thick) / 2;
        
        // Apply the selection box position change based on relative position:
        let relativePos = editor.getRelativePosition({
          ...original.render,
          p: [
            utils.round(selectionCenterX + (offsetX * scaleWidth) - halfThick - newAnnoMidpointX - changeXCoord),
            utils.round(selectionCenterY + (offsetY * scaleHeight) - halfThick - newAnnoMidpointY - changeYCoord)
          ]
        });
        if (maintainSizeWidth == false) {
          select.p[0] = relativePos[0];
        }
        if (maintainSizeHeight == false) {
          select.p[1] = relativePos[1];
        }

        if (["page"].includes(select.f ?? anno.f) == true) {
          if (select.s[0] < 100) {
            if (sizeLimitX == true) {
              select.p[0] -= 100 - select.s[0];
            }
            select.s[0] = 100;
          }
          if (select.s[1] < 100) {
            if (sizeLimitY == true) {
              select.p[1] -= 100 - select.s[1];
            }
            select.s[1] = 100;
          }
        }
        select.resizing = [fixAnnotationHolder, originalAnnoX, originalAnnoY, originalAnnoSize[0] + thick, originalAnnoSize[1] + thick];
      } else if (this.action == "rotate") {
        select.p = select.p ?? anno.p;
        select.r = select.r ?? anno.r;
        let [originalAnnoX, originalAnnoY] = editor.getAbsolutePosition(original.render);
        let originalAnnoSize = this.size[annoid];

        // Set rotation:
        if (["page"].includes(select.f ?? anno.f) == false) {
          let changeRotate = this.rotation[annoid] + rotateChange;
          if (changeRotate < 0) {
            changeRotate = 360 + changeRotate;
          }
          if (changeRotate > 359) {
            changeRotate = changeRotate - 360;
          }
          select.r = changeRotate;
        }

        // Calculate radian:
        let radian = rotateChange * (Math.PI / 180);

        // Get original midpoint of element:
        let originalAnnoMidpointX = (originalAnnoSize[0] + 0) / 2;
        let originalAnnoMidpointY = (originalAnnoSize[1] + 0) / 2;

        // Get center position of element:
        let originalAnnoCenterX = originalAnnoX + originalAnnoMidpointX + thick;
        let originalAnnoCenterY = originalAnnoY + originalAnnoMidpointY + thick;

        // Calculate center of original selection box:
        let selectionCenterX = this.originalPosition[0] + (this.originalSize[0] / 2);
        let selectionCenterY = this.originalPosition[1] + (this.originalSize[1] / 2);

        // Determine new rotated center position:
        let rotatedCenterX = selectionCenterX + ((originalAnnoCenterX - selectionCenterX) * Math.cos(radian)) - ((originalAnnoCenterY - selectionCenterY) * Math.sin(radian));
        let rotatedCenterY = selectionCenterY + ((originalAnnoCenterX - selectionCenterX) * Math.sin(radian)) + ((originalAnnoCenterY - selectionCenterY) * Math.cos(radian));

        // Apply new position:
        let relativePos = editor.getRelativePosition({
          ...original.render,
          p: [
            utils.round(rotatedCenterX - originalAnnoMidpointX - thick),
            utils.round(rotatedCenterY - originalAnnoMidpointY - thick)
          ]
        });
        select.p[0] = relativePos[0];
        select.p[1] = relativePos[1];
      }
      select.sync = setTempSync;
      await utils.render({ ...original.render, ...select });
    }

    await this.updateBox();

    if (snapX == null && snapY == null) {
      let { snapX, snapY } = await this.snapItems(event, { resizeHandleAxis: snapHandleAxis, scaleWidth: scaleWidth, scaleHeight: scaleHeight, render: false });
      if (snapX != 0 || snapY != 0) {
        await this.moveAction(event, snapX, snapY, fromScroll);
      }
      await this.snapItems(event, { resizeHandleAxis: snapHandleAxis, scaleWidth: scaleWidth, scaleHeight: scaleHeight });
    }
  }
  endAction = async function (event, fromHistory, sentKeys, saveHistory) {
    if (this.action == null) {
      return;
    }
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
    this.action = null;
    body.style.removeProperty("user-select");
    editor.page.style.removeProperty("touch-action");
    editor.page.removeAttribute("enabled");

    //let pageHolder = editor.page.querySelector(".ePageHolder");

    let setTempSync = getEpoch();
    let self = editor.getSelf();

    this.renderSnaps = [];
    await this.updateSnapLines();

    // Save Revert
    let keys = Object.keys(editor.selecting);
    let saveUpdates = [];
    let annoIDs = {};
    let pushChanges = [];
    let pushAdds = [];
    let pushRemoves = [];
    let deleteKeys = {};
    for (let i = 0; i < keys.length; i++) {
      let annoid = keys[i];
      let selecting = editor.selecting[annoid];
      if (Object.keys(selecting).length < 1) {
        continue;
      }
      let original = editor.annotations[annoid] ?? { render: selecting };
      if (original != null && original.pointer != null) {
        annoid = original.pointer;
        original = editor.annotations[annoid];
      }
      if (original == null || selecting == null) {
        continue;
      }

      let originalRender = (original.render ?? {}) ?? selecting;

      delete selecting.done;
      let changeKeys = Object.keys(selecting);
      let pushFields = {
        parent: originalRender.parent ?? null,
        p: originalRender.p
      };
      for (let f = 0; f < changeKeys.length; f++) {
        pushFields[changeKeys[f]] = originalRender[changeKeys[f]] ?? null;
      }
      if (saveHistory != false) {
        if (selecting.remove != true) {
          if (Object.keys(pushFields).length > 0) {
            if (pushFields.f == null) {
              pushChanges.push(JSON.parse(JSON.stringify({ ...pushFields, _id: annoid })));
            } else {
              pushAdds.push({ _id: annoid, remove: true });
            }
          }
        } else {
          pushRemoves.push(JSON.parse(JSON.stringify(originalRender)));
        }
      }

      saveUpdates.push(JSON.parse(JSON.stringify({ ...selecting, _id: annoid })));
      selecting.done = true;

      annoIDs[annoid] = true;

      // Update child annotations:
      let merged = { ...originalRender, ...selecting };
      let checkChunks = [ ...editor.annotationInChunks(originalRender), ...editor.annotationInChunks(merged) ];
      let annotationKeys = {};
      for (let c = 0; c < checkChunks.length; c++) {
        annotationKeys = { ...annotationKeys, ...(editor.chunkAnnotations[checkChunks[c]] ?? {}) };
      }
      let annotations = Object.keys(annotationKeys);
      if (selecting.remove == true && fromHistory != true) {
        for (let a = 0; a < annotations.length; a++) {
          let checkAnnoID = annotations[a];
          if (checkAnnoID == null || checkAnnoID == annoid) {
            continue;
          }
          let checkAnnotation = editor.annotations[checkAnnoID];
          if (checkAnnotation == null) {
            continue;
          }
          if (checkAnnotation.pointer != null) {
            checkAnnoID = checkAnnotation.pointer;
            checkAnnotation = editor.annotations[checkAnnoID] ?? { render: {} };
          }
          let currentAnnoCheck = checkAnnotation.render ?? {};
          let checkedParents = [];
          while (currentAnnoCheck.parent != null) {
            let checkannoid = currentAnnoCheck.parent;
            if (checkannoid == null || checkedParents.includes(checkannoid) == true) {
              break;
            }
            checkedParents.push(checkannoid);
            let annotation = editor.annotations[checkannoid];
            if (annotation == null) {
              break;
            }
            if (annotation.pointer != null) {
              checkannoid = annotation.pointer;
              annotation = editor.annotations[checkannoid] ?? { render: {} };
            }
            if (checkannoid == annoid) {
              editor.realtimeSelect[checkAnnoID] = { ...(editor.realtimeSelect[checkAnnoID] ?? {}), remove: true };
              saveUpdates.push({ remove: true, _id: checkAnnoID });
              let [x, y] = editor.getAbsolutePosition(checkAnnotation.render);
              pushRemoves.push(JSON.parse(JSON.stringify({ ...checkAnnotation.render, parent: null, p: [x, y] })));
              break;
            }
            currentAnnoCheck = annotation.render ?? {};
          }
        }
      }
      if (selecting.p != null) {
        if (selecting.s != null) {
          if (Math.floor(Math.abs(originalRender.p[0] - selecting.p[0])) > 0 || Math.floor(Math.abs(originalRender.p[1] - selecting.p[1])) > 0) {
            let changedXSize = selecting.p[0] - originalRender.p[0];
            let changedYSize = selecting.p[1] - originalRender.p[1];
            for (let a = 0; a < annotations.length; a++) {
              let checkAnnoID = annotations[a];
              if (checkAnnoID == null || checkAnnoID == annoid) {
                continue;
              }
              let checkAnnotation = editor.annotations[checkAnnoID];
              if (checkAnnotation == null) {
                continue;
              }
              if (checkAnnotation.pointer != null) {
                checkAnnoID = checkAnnotation.pointer;
                checkAnnotation = editor.annotations[checkAnnoID] ?? { render: {} };
              }
              let render = checkAnnotation.render;
              if ((render.parent ?? "").startsWith("pending_") == true) {
                let parentAnno = editor.annotations[render.parent];
                if (parentAnno != null && parentAnno.pointer != null) {
                  render.parent = parentAnno.pointer;
                }
              }
              if (render.parent != annoid) {
                continue;
              }
              let newPos = [render.p[0] - changedXSize, render.p[1] - changedYSize];
              editor.realtimeSelect[checkAnnoID] = { ...(editor.realtimeSelect[checkAnnoID] ?? {}), p: newPos, parent: annoid };
              saveUpdates.push({ p: newPos, parent: annoid, _id: checkAnnoID });
              pushChanges.push({ p: render.p, parent: annoid, _id: checkAnnoID });
            }
          }
        }
        if (["page"].includes(merged.f) == true) { // See if in bounds, also check parent to know what is allowed in bounds
          let position = editor.getAbsolutePosition(merged, true);
          let thickness = 0;
          if (merged.t != null) {
            if (merged.b != "none" || merged.d == "line") {
              thickness = merged.t;
            }
          }
          for (let a = 0; a < annotations.length; a++) {
            let checkAnnoID = annotations[a];
            if (checkAnnoID == null || checkAnnoID == annoid) {
              continue;
            }
            let checkAnnotation = editor.annotations[checkAnnoID];
            if (checkAnnotation == null) {
              continue;
            }
            if (checkAnnotation.pointer != null) {
              checkAnnoID = checkAnnotation.pointer;
              checkAnnotation = editor.annotations[checkAnnoID] ?? { render: {} };
            }
            let render = { ...(checkAnnotation.render ?? {}), ...(utils.pendingSaves[checkAnnoID] ?? {}), ...(editor.selecting[checkAnnoID] ?? {}) };
            if (render.parent == annoid) {
              continue;
            }
            let thick = 0;
            if (render.t != null) {
              if (render.b != "none" || render.d == "line") {
                thick = render.t;
              }
            }
            let [x, y] = editor.getAbsolutePosition(render, true);
            let checkX = x + (render.s[0] / 2) + thick;
            let checkY = y + (render.s[1] / 2) + thick;
            if (checkX >= position[0] && checkX <= position[0] + merged.s[0] + thickness) {
              if (checkY >= position[1] && checkY <= position[1] + merged.s[1] + thickness) {
                if ((render.l ?? 0) > (merged.l ?? 0)) {
                  if (self.access > 0 && editor.lesson.settings.editOthersWork != true && [render.a, render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
                    continue;  
                  }
                  let setParent = editor.parentFromAnnotation({
                    ...render,
                    parent: null,
                    prevParent: render.parent,
                    p: [checkX, checkY]
                  }, null, null, true);
                  if (setParent != render.parent) {
                    // This is updated in the save utility, just here to add to the history
                    /*let relativePos = editor.getRelativePosition({
                      ...render,
                      parent: annoid,
                      p: [x, y]
                    });*/
                    //let newPos = [relativePos[0], relativePos[1]];
                    //editor.realtimeSelect[checkAnnoID] = { p: newPos, parent: annoid };
                    //saveUpdates.push({ p: newPos, parent: annoid, sync: getEpoch(), _id: checkAnnoID, done: true });
                    pushChanges.push({ p: render.p, parent: render.parent, _id: checkAnnoID });
                  }
                }
              }
            }
          }
        }
      }
      if (selecting.remove == true) {
        //delete editor.selecting[annoid];
        //keys.splice(keys.indexOf(annoid), 1);
        //i--;
        deleteKeys[annoid] = "";
      }
    }
    if (fromHistory != true) {
      if (pushChanges.length > 0) {
        await utils.pushHistory("update", pushChanges);
      }
      if (pushAdds.length > 0) {
        await utils.pushHistory("remove", pushAdds);
      }
      if (pushRemoves.length > 0) {
        await utils.pushHistory("add", pushRemoves);
      }
    }
    let beforeSelect = JSON.stringify(editor.selecting); // Rendering clears out selected!
    /*for (let i = 0; i < saveUpdates.length; i++) {
      await utils.save(saveUpdates[i], null, setTempSync, false);
    }*/
    let savedAnnoIDs = {};
    while (saveUpdates.length > 0) {
      for (let i = 0; i < saveUpdates.length; i++) {
        let newSave = saveUpdates[i];
        if (annoIDs[newSave.parent] == null || savedAnnoIDs[newSave.parent] != null) {
          await utils.save(newSave, null, setTempSync, false);
          editor.selecting[newSave._id] = {};
          savedAnnoIDs[newSave._id] = true;
          saveUpdates.splice(i, 1);
          i--;
        }
      }
      await sleep(1); // Just to be safe
    }
    editor.selecting = JSON.parse(beforeSelect);
    await utils.forceShort();
    editor.selecting = {};
    sentKeys = sentKeys ?? keys;
    for (let i = 0; i < sentKeys.length; i++) {
      let key = sentKeys[i];
      if (deleteKeys[key] == null) {
        editor.selecting[key] = {};
      }
    }

    //utils.resetAnnotationSize();
    await this.updateBox(true);
  }
  interactRun = async function (target) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let reaction = target.closest(".eReaction");
    if (reaction != null) {
      if (reaction.hasAttribute("emoji") == false) {
        return;
      }
      reaction.setAttribute("disabled", "");
      let body = {
        emoji: reaction.getAttribute("emoji"),
        annotation: reaction.closest(".eAnnotation").getAttribute("anno")
      };
      if (reaction.hasAttribute("selected") == false) {
        await sendRequest("PUT", "lessons/members/reaction", body, { session: editor.session });
      } else {
        await sendRequest("PUT", "lessons/members/reaction/remove", body, { session: editor.session });
      }
      reaction.removeAttribute("disabled");
      return true;
    }
    let embedButton = target.closest("div[activate] button");
    let embedAnno = target.closest(".eAnnotation");
    let runEmbed = false;
    if (embedButton != null && embedAnno != null) {
      if (embedButton.closest(".eAnnotation[embed]") == embedAnno) {
        runEmbed = true;
      }
    }
    if (runEmbed == true) {
      let render = ((editor.annotations[embedAnno.getAttribute("anno")] ?? {}).render ?? {});
      if (render.embed != null) {
        if (render.embed.url == null) {
          window.open(render.d);
          return;
        }
        let embedHolder = embedAnno.querySelector("div[content]");
        embedHolder.insertAdjacentHTML("beforeend", `<iframe allowfullscreen></iframe>`);
        let embedFrame = embedHolder.querySelector("iframe");
        embedFrame.setAttribute("currenturl", render.embed.url);
        if (render.embed.color != null) {
          embedFrame.style.background = cleanString(render.embed.color);
        }
        let frameWidth = render.s[0] - 16;
        let defaultMaxWidth = 800;
        if (frameWidth < 300) {
          defaultMaxWidth = 300;
        }
        let embedWidth = Math.max(frameWidth, defaultMaxWidth);
        let scale = frameWidth / embedWidth;
        embedFrame.style.width = embedWidth + "px";
        embedFrame.style.height = ((render.s[1] - 24 - embedAnno.querySelector("div[details]").offsetHeight) * (1 / scale)) + "px";
        embedFrame.style.transform = "scale(" + scale + ")";
        embedFrame.src = render.embed.url;
        embedHolder.querySelector("img[thumbnail]").style.display = "none";
        embedHolder.querySelector("div[activate]").style.display = "none";
      }
      return true;
    }
    let pageReveal = target.closest(".eAnnotation[page] div[hide] button");
    if (pageReveal != null) {
      if (editor.getSelf().access < 4) {
        return;
      }
      let pageAnno = pageReveal.closest(".eAnnotation[page]");
      if (pageAnno != null) {
        let oldSelecting = JSON.stringify(editor.selecting);
        editor.selecting = {};
        editor.selecting[pageAnno.getAttribute("anno")] = { hidden: false };
        this.action = "save";
        await this.endAction();
        editor.selecting = JSON.parse(oldSelecting);
        await this.redrawActionUI();
        this.updateBox();
      }
      return true;
    }
    // THE BELOW IS TEMP:
    let SPINNERButton = target.closest(".eAnnotation[spinner] button[spinnerbutton]");
    if (SPINNERButton != null) {
      let self = editor.getSelf();
      if (self.access < 1) {
        return;
      }

      let spinnerAnno = SPINNERButton.closest(".eAnnotation[spinner]");
      if (spinnerAnno != null) {
        if (spinnerAnno.hasAttribute("running") == true) {
          return true;
        }
        let annoID = spinnerAnno.getAttribute("anno");
        let render = ((editor.annotations[annoID] ?? {}).render ?? {});
        let alertModule = await this.loadModule("alert");
        if (editor.lesson.settings.editOthersWork != true && [render.a, render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
          alertModule.close(this.someoneElsesAnnoWarning);
          this.someoneElsesAnnoWarning = await alertModule.open("warning", "<b>Someone Else's Annotation</b>The ability to modify another member's work is disabled.");
          return true;
        }

        let memberIDs = Object.keys(editor.members);
        let randomMemberID = memberIDs[Math.floor(Math.random() * memberIDs.length)];
        let randomMember = editor.members[randomMemberID];
        if (randomMember == null) {
          return true;
        }
        editor.selecting = {};
        editor.selecting[annoID] = { d: randomMember.name };
        this.action = "save";
        await this.endAction();
        editor.selecting = {};
        this.updateBox();
        editor.utils.syncSave(true);
      }

      return true;
    }
  }
  clickInSelect = function (editor, utils, x, y) {
    let sizeInverse = 10 * (1 / editor.zoom);
    if (Object.keys(editor.selecting).length < 1) {
      return false;
    }
    if (this.minX == null || this.minY == null || this.maxY == null || this.maxY == null) {
      return false;
    }
    let selectTopLeftX = this.minX;
    let selectTopLeftY = this.minY;
    let selectBottomRightX = this.maxX;
    let selectBottomRightY = this.maxY;
    let selectWidth = selectBottomRightX - selectTopLeftX;
    let selectHeight = selectBottomRightY - selectTopLeftY;

    let transformRotateWidth = selectTopLeftX + (selectWidth / 2);
    let transformRotateHeight = selectTopLeftY + (selectHeight / 2);

    let radian = this.selectRotation * (Math.PI / 180);

    if (this.selectRotation != 0) {
      selectWidth = this.lastElementWidth;
      selectHeight = this.lastElementHeight;
    }

    // Calculate the rotated bounding box dimensions using the original bounding box dimensions
    let rotatedWidth = Math.abs(selectTopLeftX * Math.cos(radian)) + Math.abs(selectTopLeftY * Math.sin(radian));
    let rotatedHeight = Math.abs(selectTopLeftY * Math.cos(radian)) + Math.abs(selectTopLeftX * Math.sin(radian));

    // Calculate the offset to the new top-left corner of the rotated bounding box:
    let offsetX = (rotatedWidth - selectWidth) / 2;
    let offsetY = (rotatedHeight - selectHeight) / 2;

    // Calculate the new top-left corner of the rotated bounding box:
    let rotatedTopLeftX = transformRotateWidth - (rotatedWidth / 2) + offsetX;
    let rotatedTopLeftY = transformRotateHeight - (rotatedHeight / 2) + offsetY;

    let halfRotateWidth = rotatedTopLeftX + (selectWidth / 2);
    let halfRotateHeight = rotatedTopLeftY + (selectHeight / 2);
    let [xCoord, yCoord] = utils.rotatePoint(x - halfRotateWidth, y - halfRotateHeight, this.selectRotation);
    xCoord += halfRotateWidth;
    yCoord += halfRotateHeight;

    if (xCoord > rotatedTopLeftX - sizeInverse && xCoord < (rotatedTopLeftX + selectWidth + sizeInverse) && yCoord > rotatedTopLeftY - sizeInverse && yCoord < (rotatedTopLeftY + selectHeight + sizeInverse)) { // In the select box, cancel unselect
      return true;
    }
    return false;
  }
  js = async function (editor, utils, addEvent) {
    let content = editor.page.querySelector(".eContent");
    editor.updateZoom = async (forceNoTransition, noUpdateAction, forceUpdate) => {
      await this.updateBox(forceNoTransition, forceUpdate, noUpdateAction);
    }
    let alertModule = await this.loadModule("alert");
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
      let reaction = target.closest(".eReaction");
      if (reaction != null) {
        return;
      }
      if (target == null || target.closest(".eContent") == null || target.closest(".eSelectBar") != null) {
        return;
      }
      if (target.closest("button") != null || target.closest("a") != null) {
        return;
      }
      let anno = target.closest(".eAnnotation"); //, .eSelect, .eSelectActive
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
      /*if (editor.getSelf().access < 1) {
        editor.selecting = {};
        this.updateBox();
        return;
      }*/
      let clientX = clientPosition(event, "x");
      let clientY = clientPosition(event, "y");
      startX = clientX + window.scrollX;
      startY = clientY + window.scrollY;
      let { x, y } = await utils.scaleToDoc(clientX, clientY, 0);
      let annoID;
      let render;
      
      if (anno != null) {
        annoID = anno.getAttribute("anno");

        //let self = editor.getSelf();
        render = ((editor.annotations[annoID] ?? {}).render ?? {});
        /*if (editor.lesson.settings.editOthersWork != true && [render.a, render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
          return;
        }*/
      
        if (anno.querySelector("div[edit]") != null && anno.querySelector("div[edit]").closest(".eAnnotation") == anno && anno.querySelector("div[contenteditable]") != null) {
          return;
        }
        if (editor.selecting[annoID] != null) {
          if (render.f == "page" && target.closest("div[title]") != null && anno.querySelector("div[title]").closest(".eAnnotation") == anno && render.lock != true) {
            if (target.closest("div[title]").hasAttribute("contenteditable") == false) {
              this.clickAction({
                target: content.querySelector('.eSelectBar:not([remove]) .eTool[action="pages/editor/toolbar/settitle"]')
              });
            }
            return;
          }
          if (render.f == "embed" && target.closest("div[input]") != null && anno.querySelector("div[input]").closest(".eAnnotation") == anno && render.lock != true) {
            if (render.embed == null) {
              this.clickAction({
                target: content.querySelector('.eSelectBar:not([remove]) .eTool[action="pages/editor/toolbar/setembed"]')
              });
            }
            return;
          }
        }
      }
      
      //let newlySelected = false;
      if (this.clickInSelect(editor, utils, x, y) == true) {
        return await this.enableAction(event);
      }
      if (target.closest(".eSelect") == null) {
        if (event.shiftKey == false) {
          await sleep(); // NEEDED TO ALLOW OTHER EVENTS TO FIRE (TEXT BOX / INPUT)
          editor.selecting = {};
          if (anno == null) {
            this.updateBox();
            return;
          }
        }
        if (render != null && editor.selecting[annoID] == null) {
          if (render.f != "page" || target.closest("div[title]") != null) {
            wasSelected = annoID;
            editor.selecting[annoID] = {};
            //newlySelected = true;
          }
        }
      }
      await this.updateBox();
      await this.enableAction(event);
      /*if (newlySelected == true) {
        if (render.f == "embed" && render.embed == null && render.lock != true) {
          this.clickAction({
            target: content.querySelector('.eSelectBar:not([remove]) .eTool[action="pages/editor/toolbar/setembed"]')
          });
        }
      }*/
    }
    let moveSelect = async (event) => {
      await this.moveAction(event);
      /*if (this.action != null) {
        await this.moveAction(event);
      } else if (mouseDown() == true) {
        let endX = clientPosition(event, "x") + window.scrollX;
        let endY = clientPosition(event, "y") + window.scrollY;
        if ((Math.floor(endX - startX) != 0 || Math.floor(endY - startY) != 0)) {
          await this.enableAction(event);
          await this.moveAction(event);
        }
      }*/
    }
    let disableSelect = async (event) => {
      this.endAction(event);
      
      let target = lastTarget ?? event.target;
      lastTarget = null;
      if (target == null) {
        return;
      }
      if (target.closest("button") != null || target.closest("a") != null || target.closest(".eSelect") != null) {
        return;
      }
      let anno = target.closest(".eAnnotation"); //, .eSelect, .eSelectActive
      /*if (editor.getSelf().access < 1) {
        editor.selecting = {};
        this.updateBox();
        return;
      }*/
      let endX = clientPosition(event, "x") + window.scrollX;
      let endY = clientPosition(event, "y") + window.scrollY;
      if (Math.floor(endX - startX) == 0 && Math.floor(endY - startY) == 0) {
        if (anno == null) {
          return;
        }
        let annoID = anno.getAttribute("anno");
        let self = editor.getSelf();
        let render = ((editor.annotations[annoID] ?? {}).render ?? {});
        if (self.access > 0 && editor.lesson.settings.editOthersWork != true && [render.a, render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
          alertModule.close(this.someoneElsesAnnoWarning);
          this.someoneElsesAnnoWarning = await alertModule.open("warning", "<b>Someone Else's Annotation</b>The ability to modify another member's work is disabled.");
        }
        if (event.shiftKey == true) {
          // Unselect
          if (wasSelected != annoID && editor.selecting[annoID] != null) {
            delete editor.selecting[annoID];
          } else {
            editor.selecting[annoID] = {};
          }
        } else {
          editor.selecting = {};
          editor.selecting[annoID] = {};
        }
        if (wasSelected == null && anno.querySelector("div[edit]") != null && anno.querySelector("div[edit]").closest(".eAnnotation") == anno && anno.querySelector("div[contenteditable]") == null) {
          this.clickAction({
            target: content.querySelector('.eSelectBar:not([remove]) .eTool[action="pages/editor/toolbar/textedit"]'),
            setCaretPosition: true,
            clientX: event.clientX,
            clientY: event.clientY
          });
        }
      }
      this.updateBox();
      wasSelected = null;
    }
    addEvent(content, "mousedown", enableSelect, { passive: false });
    addEvent(content, "touchstart", enableSelect, { passive: false });
    addEvent(document, "mouseup", disableSelect, { passive: false });
    addEvent(document, "touchend", disableSelect, { passive: false });

    let checkShift = (event) => {
      if (event.shiftKey == false) {
        content.setAttribute("noshiftheld", "");
      } else {
        content.removeAttribute("noshiftheld");
      }
    }
    addEvent(window, "keydown", checkShift, { passive: false });
    addEvent(window, "keyup", checkShift, { passive: false });

    addEvent(document, "mousemove", moveSelect, { passive: false });
    addEvent(document, "touchmove", moveSelect, { passive: false });

    addEvent(window, "scroll", async () => {
      await this.moveAction();
      this.updateActionUI();
    }, { passive: true });
    addEvent(window, "resize", () => { this.updateActionUI(); }, { passive: true });

    addEvent(content, "click", (event) => { this.clickAction(event); }, { passive: true });
  }
};

// DRAG TOOL
modules["pages/editor/toolbar/drag"] = class {
  scrollIntervalX = 0;
  scrollIntervalY = 0;
  scrollIntervalRunning = false;
  setScrollInterval = async function () {
    if (this.scrollIntervalRunning == true) {
      return;
    }
    this.scrollIntervalRunning = true;
    while (this.selection != null && (this.scrollIntervalX != 0 || this.scrollIntervalY != 0)) {
      window.scrollTo(window.scrollX + this.scrollIntervalX, window.scrollY + this.scrollIntervalY);
      await this.updateSelectedBounds(this.scrollLastEvent, null, null, true);
      await sleep(10);
    }
    this.scrollIntervalRunning = false;
  }
  js = async function (editor, utils, addEvent) {
    let content = editor.page.querySelector(".eContent");
    let annoHolder = content.querySelector(".ePageHolder");

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";

    let cursorModule = this.parent.cursor;

    let selectX;
    let selectY;
    let wasSelected;
    let prevSelecting;

    let self = editor.getSelf();

    let useX = 0;
    let useY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    this.updateSelectedBounds = async (event) => {
      if (this.selection == null) {
        return;
      }
      if (event != null) {
        lastMouseX = clientPosition(event, "x");
        lastMouseY = clientPosition(event, "y");

        // Handle Scroll with Mouse:
        let scrollOffset = 32;
        this.scrollIntervalX = 0;
        this.scrollIntervalY = 0;
        let leftPos = scrollOffset - lastMouseX;
        if (leftPos > 0) {
          let percentage = 1 + ((leftPos - scrollOffset) / scrollOffset);
          this.scrollIntervalX = -Math.min(6 * percentage, 10);
        }
        let rightPos = lastMouseX - fixed.offsetWidth + scrollOffset;
        if (rightPos > 0) {
          let percentage = 1 + ((rightPos - scrollOffset) / scrollOffset);
          this.scrollIntervalX = Math.min(6 * percentage, 10);
        }
        let topPos = scrollOffset - lastMouseY;
        if (topPos > 0) {
          let percentage = 1 + ((topPos - scrollOffset) / scrollOffset);
          this.scrollIntervalY = -Math.min(6 * percentage, 10);
        }
        let bottomPos = lastMouseY - fixed.offsetHeight + scrollOffset;
        if (bottomPos > 0) {
          let percentage = 1 + ((bottomPos - scrollOffset) / scrollOffset);
          this.scrollIntervalY = Math.min(6 * percentage, 10);
        }
        this.scrollLastEvent = event;
        if (this.scrollIntervalX != 0 || this.scrollIntervalY != 0) {
          return this.setScrollInterval();
        }
      }
      let { x, y } = await utils.scaleToDoc(lastMouseX, lastMouseY, 0);
      useX = x;
      useY = y;
      let selectWidth = 0;
      let selectHeight = 0;
      let topLeftX = 0;
      let topLeftY = 0;
      if (useX > selectX) {
        selectWidth = useX - selectX;
        topLeftX = selectX;
        if (useY > selectY) {
          selectHeight = useY - selectY;
          topLeftY = selectY;
          this.selection.style.borderRadius = "10px 10px 0px 10px";
        } else {
          selectHeight = selectY - useY;
          topLeftY = useY;
          this.selection.style.borderRadius = "10px 0px 10px 10px";
        }
      } else {
        selectWidth = selectX - useX;
        topLeftX = useX;
        if (useY > selectY) {
          selectHeight = useY - selectY;
          topLeftY = selectY;
          this.selection.style.borderRadius = "10px 10px 10px 0px";
        } else {
          selectHeight = selectY - useY;
          topLeftY = useY;
          this.selection.style.borderRadius = "0px 10px 10px 10px";
        }
      }

      let pageRect = annoHolder.getBoundingClientRect();
      this.selection.style.width = (selectWidth * editor.zoom) + "px";
      this.selection.style.height = (selectHeight * editor.zoom) + "px";
      this.selection.style.left = pageRect.x + (topLeftX * editor.zoom) + window.scrollX + "px";
      this.selection.style.top = pageRect.y + (topLeftY * editor.zoom) + window.scrollY + "px";
      
      let bottomRightX = topLeftX + selectWidth;
      let bottomRightY = topLeftY + selectHeight;
      let checkChunks = editor.regionInChunks(topLeftX, topLeftY, bottomRightX, bottomRightY);
      let annotationKeys = {};
      for (let c = 0; c < checkChunks.length; c++) {
        annotationKeys = { ...annotationKeys, ...(editor.chunkAnnotations[checkChunks[c]] ?? {}) };
      }
      let annotations = Object.keys(annotationKeys);
      for (let a = 0; a < annotations.length; a++) {
        let annoid = annotations[a];
        let annotation = editor.annotations[annoid];
        if (annotation == null) {
          continue;
        }
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = editor.annotations[annoid];
        }
        let render = annotation.render;
        if (render == null) {
          continue;
        }
        if (editor.lesson.settings.editOthersWork != true && [render.a, render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
          continue;
        }
        if (render.remove == true) {
          continue;
        }
        let thick = 0;
        if (render.t != null) {
          if (render.b != "none" || render.d == "line") {
            thick = render.t;
          }
        }
        let [x, y] = editor.getAbsolutePosition(render, true);
        let endX = x + render.s[0] + thick;
        let endY = y + render.s[1] + thick;
        if (render.s[0] < 0) {
          x += render.s[0] + thick;
          endX = x - render.s[0] + thick;
        }
        if (render.s[1] < 0) {
          y += render.s[1] + thick;
          endY = y - render.s[1] + thick;
        }
        if (render.f != "page") { // Part in bounds:
          if (!(x < bottomRightX && endX > topLeftX && y < bottomRightY && endY > topLeftY)) {
            continue;
          }
        } else { // Entire thing in bounds:
          if (x < topLeftX || y < topLeftY || endX > bottomRightX || endY > bottomRightY) {
            continue;
          }
        }

        let currentAnnoCheck = render;
        let checkedParents = [];
        let parentCancel = false;
        while (currentAnnoCheck.parent != null) {
          let checkannoid = currentAnnoCheck.parent;
          if (checkannoid == null || checkedParents.includes(checkannoid) == true) {
            break;
          }
          checkedParents.push(checkannoid);
          let annotation = editor.annotations[checkannoid];
          if (annotation == null) {
            break;
          }
          if (annotation.pointer != null) {
            checkannoid = annotation.pointer;
            annotation = editor.annotations[checkannoid];
          }
          currentAnnoCheck = annotation.render ?? {};
          if (editor.selecting[checkannoid] != null || currentAnnoCheck.hide == true) {
            parentCancel = true;
            break;
          }
        }
        if (parentCancel == true) {
          continue;
        }

        editor.selecting[annoid] = {};
      }
      cursorModule.updateBox();
    }
    editor.updateSelectedBounds = this.updateSelectedBounds;

    let enableSelect = async (event) => {
      if (event.which === 3 || event.button === 2) {
        return;
      }

      let target = event.target;
      if (target.closest("button") != null || target.closest("a") != null) {
        return;
      }
      await cursorModule.enableAction(event);
      let reaction = target.closest(".eReaction");
      if (reaction != null) {
        return;
      }
      if (target == null || target.closest(".eContent") == null || target.closest(".eSelect") != null || target.closest(".eSelectBar") != null) {
        return;
      }
      let anno = target.closest(".eAnnotation"); //.eSelect, .eSelectActive
      if (anno != null && anno.hasAttribute("member") == true) {
        // A display annotation, not a real one
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientPosition(event, "y"), 0);
      selectX = x;
      selectY = y;
      useX = x;
      useY = y;
      if (cursorModule.clickInSelect(editor, utils, x, y) == true && event.shiftKey == false) {
        return;
      }
      if (anno != null) {
        let annoID = anno.getAttribute("anno");
        if (editor.selecting[annoID] != null) {
          disableSelect();
          return;
        }
        wasSelected = annoID;
      }
      if (event.shiftKey == false) {
        editor.selecting = {};
      }
      /*if ((anno == null || editor.selecting[anno.getAttribute("anno")] == null) && event.shiftKey == false) {
        editor.selecting = {};
      }*/

      disableSelect();
      editor.toolbar.closeSubSubtoolUI();
      //event.preventDefault();
      content.insertAdjacentHTML("beforeend", `<div class="eSelectDrag" tooleditor new></div>`);
      this.selection = content.querySelector(".eSelectDrag:not([remove])");
      this.selection.removeAttribute("new");

      prevSelecting = JSON.parse(JSON.stringify(editor.selecting));
      this.updateSelectedBounds(event);
    }
    let moveSelect = async (event) => {
      if (this.selection == null) {
        await cursorModule.moveAction(event);
      }
      /*if (event != null) {
        if (cursorModule.action != null) {
          await cursorModule.moveAction(event);
        } else if (this.selection == null) {
          let endX = clientPosition(event, "x") + window.scrollX;
          let endY = clientPosition(event, "y") + window.scrollY;
          if ((Math.floor(endX - selectX) != 0 || Math.floor(endY - selectY) != 0)) {
            await cursorModule.enableAction(event);
            await cursorModule.moveAction(event);
          }
        }
      }*/

      if (this.selection == null) {
        return;
      }
      if (mouseDown() == false) {
        disableSelect();
        return;
      }
      this.selection.style.opacity = .4;

      editor.selecting = JSON.parse(JSON.stringify(prevSelecting));
      this.updateSelectedBounds(event);
    }
    let disableSelect = async (event) => {
      if (this.selection != null) {
        let remSelect = this.selection;
        this.selection = null;
        remSelect.setAttribute("remove", "");
        remSelect.style.opacity = 0;
        (async () => {
          await sleep(150);
          remSelect.remove();
        })();
      }
      if (event != null) {
        await cursorModule.endAction(event);

        let target = event.target;
        if (target == null) {
          return;
        }
        let anno = target.closest(".eAnnotation"); //, .eSelect, .eSelectActive
        let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientPosition(event, "y"), 0);
        if (Math.floor(x - selectX) == 0 && Math.floor(y - selectY) == 0) {
          if (anno == null) {
            return;
          }
          let annoID = anno.getAttribute("anno");
          if (wasSelected != annoID && editor.selecting[annoID] != null) {
            delete editor.selecting[annoID];
          }
        }
        await cursorModule.updateBox();
        wasSelected = null;
      }
    }
    addEvent(content, "mousedown", enableSelect, { passive: false });
    addEvent(content, "touchstart", enableSelect, { passive: false });
    addEvent(document, "mousemove", moveSelect, { passive: false });
    addEvent(document, "touchmove", moveSelect, { passive: false });
    addEvent(document, "mouseup", disableSelect, { passive: false });
    addEvent(document, "touchend", disableSelect, { passive: false });

    addEvent(window, "scroll", () => { moveSelect(); cursorModule.updateActionUI(); }, { passive: true });
    addEvent(window, "resize", () => { cursorModule.updateActionUI(); }, { passive: true });

    addEvent(content, "click", (event) => { cursorModule.clickAction(event); }, { passive: true });
  }
};

// PAN TOOL
modules["pages/editor/toolbar/pan"] = class {
  mouse = "grab";
  js = async function (editor, utils, addEvent) {
    let cursorModule = this.parent.cursor;
    let content = editor.page.querySelector(".eContent");

    body.style.userSelect = "none";

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startScrollX = 0;
    let startScrollY = 0;
    let enableDrag = async (event) => {
      if (event.target != null) {
        let reaction = event.target.closest(".eReaction");
        if (reaction != null) {
          return;
        }
      }
      dragging = true;
      startX = clientPosition(event, "x");
      startY = clientPosition(event, "y");
      startScrollX = window.scrollX;
      startScrollY = window.scrollY;
      content.style.cursor = "grabbing";
      body.style.userSelect = "none";
    }
    let moveDrag = async (event) => {
      if (dragging != true) {
        return;
      }
      if (mouseDown() == false) {
        disableDrag(event);
        return;
      }
      if (event.touches != null) {
        disableDrag(event);
        return;
      }
      window.scrollTo({ left: startScrollX - (clientPosition(event, "x") - startX), top: startScrollY - (clientPosition(event, "y") - startY) });
    }
    let disableDrag = async (event) => {
      if (event != null && event.target != null) {
        let interact = cursorModule.interactRun(event.target);
        if (interact == true) {
          return;
        }
      }
      dragging = false;
      content.style.cursor = "grab";
    }
    addEvent(content, "mousedown", enableDrag, { passive: false });
    addEvent(content, "touchstart", enableDrag, { passive: false });
    addEvent(document, "mousemove", moveDrag, { passive: false });
    addEvent(document, "touchmove", moveDrag, { passive: false });
    addEvent(document, "mouseup", disableDrag, { passive: false });
    addEvent(document, "touchend", disableDrag, { passive: false });
  }
};

// HIGHLIGHT TOOL
modules["pages/editor/toolbar/highlighter"] = class {
  mouse = `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_235_2)"> <path d="M31.3781 20.4071L30.4384 20.0651L30.0964 21.0048L27.0871 29.2728C26.3315 31.3487 27.4019 33.644 29.4778 34.3996L34.1875 36.1138C36.2634 36.8694 38.5588 35.799 39.3144 33.7231L42.3237 25.4551L42.6657 24.5155L41.726 24.1734L31.3781 20.4071Z" fill="COLOR_REPLACE" fill-opacity="OPACITY_REPLACE" stroke="white" stroke-width="2"/> <path d="M39.3631 30.6623L40.3028 31.0044L40.6448 30.0647L46.8824 12.927C47.6379 10.8511 46.5676 8.55575 44.4917 7.80018L39.7819 6.08596C37.706 5.33039 35.4106 6.40074 34.655 8.47665L28.4175 25.6143L28.0754 26.554L29.0151 26.896L39.3631 30.6623Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> </g> <defs> <filter id="filter0_d_235_2" x="21.8447" y="0.84375" width="30.2803" height="40.5127" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_235_2"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_235_2" result="shape"/> </filter> </defs> </svg>`;
  realtimeTool = 1;
  js = async function (editor, utils, addEvent) {
    this.color = editor.preferences.tools.markup.color.selected;
    this.thickness = editor.preferences.tools.markup.thickness;
    this.opacity = editor.preferences.tools.markup.opacity;
    this.publish = { c: this.color, o: this.opacity };

    body.style.userSelect = "none";
    if (editor.options.stylusmode != true) {
      editor.page.style.touchAction = "pinch-zoom";
    } else {
      editor.pinchZoomDisable = true;
    }

    let markup;
    let anno;
    let enableMarkup = async (event) => {
      if (event.changedTouches != null && event.changedTouches[0] != null) {
        let touch = event.changedTouches[0];
        if (touch.touchType == "stylus") {
          editor.usingStylus = true;
        } else if (editor.options.stylusmode == true) {
          return;
        }
      } else if (editor.options.stylusmode == true) {
        return;
      }
      disableMarkup();
      editor.toolbar.closeSubSubtoolUI();
      event.preventDefault();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientPosition(event, "y"));
      let tempID = utils.tempID();
      let newAnno = {
        _id: tempID,
        f: "markup",
        p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
        s: [0, 0],
        l: utils.maxLayer + 1,
        c: this.color,
        t: this.thickness,
        o: this.opacity,
        d: [0, 0]
      };
      let parentID = editor.parentFromPoint(x, y);
      if (parentID != null) {
        this.setParent = parentID;
      }
      if (mouseDown() == false) {
        return;
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
      if (editor.usingStylus == true) {
        if (event.changedTouches != null && event.changedTouches[0] != null) {
          let touch = event.changedTouches[0];
          if (touch.touchType != "stylus") {
            return;
          }
          //touch.force = the force of the touch - useful for later ;)
        } else {
          return;
        }
      }
      event.preventDefault();
      let rect = anno.getBoundingClientRect();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x") - rect.left, clientPosition(event, "y") - rect.top, true);
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
    let drawModule = await editor.toolbar.getModule("pages/editor/toolbar/pen");
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
      
      if (this.setParent != null) {
        markup.parent = this.setParent;
        editor.applyRelativePosition(markup);
      }

      utils.save(markup, anno);
      utils.pushHistory("remove", [{ _id: markup._id }]);

      markup.done = true; // Alert other clients that this annotation is done
      await utils.forceShort();
      delete editor.selecting[markup._id];
      markup = null;
      editor.usingStylus = false;
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousedown", enableMarkup, { passive: false });
    addEvent(content, "touchstart", enableMarkup, { passive: false });
    addEvent(content, "mousemove", moveMarkup, { passive: false });
    addEvent(content, "touchmove", moveMarkup, { passive: false });
    addEvent(content, "mouseup", disableMarkup, { passive: false });
    addEvent(content, "touchend", disableMarkup, { passive: false });
    editor.toolbar.endToolEvent = disableMarkup;
  }
};
// UNDERLINE TOOL
modules["pages/editor/toolbar/understrike"] = class {
  mouse = `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_235_2)"> <path d="M31.3781 20.4071L30.4384 20.0651L30.0964 21.0048L27.0871 29.2728C26.3315 31.3487 27.4019 33.644 29.4778 34.3996L34.1875 36.1138C36.2634 36.8694 38.5588 35.799 39.3144 33.7231L42.3237 25.4551L42.6657 24.5155L41.726 24.1734L31.3781 20.4071Z" fill="COLOR_REPLACE" stroke="white" stroke-width="2"/> <path d="M39.3631 30.6623L40.3028 31.0044L40.6448 30.0647L46.8824 12.927C47.6379 10.8511 46.5676 8.55575 44.4917 7.80018L39.7819 6.08596C37.706 5.33039 35.4106 6.40074 34.655 8.47665L28.4175 25.6143L28.0754 26.554L29.0151 26.896L39.3631 30.6623Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> </g> <defs> <filter id="filter0_d_235_2" x="21.8447" y="0.84375" width="30.2803" height="40.5127" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_235_2"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_235_2" result="shape"/> </filter> </defs> </svg>`;
  realtimeTool = 1;
  js = async function (editor, utils, addEvent) {
    this.color = editor.preferences.tools.markup.color.selected;
    this.thickness = editor.preferences.tools.markup.thickness;
    this.publish = { c: this.color };

    body.style.userSelect = "none";
    if (editor.options.stylusmode != true) {
      editor.page.style.touchAction = "pinch-zoom";
    } else {
      editor.pinchZoomDisable = true;
    }

    let markup;
    let anno;
    let enableMarkup = async (event) => {
      if (event.changedTouches != null && event.changedTouches[0] != null) {
        let touch = event.changedTouches[0];
        if (touch.touchType == "stylus") {
          editor.usingStylus = true;
        } else if (editor.options.stylusmode == true) {
          return;
        }
      } else if (editor.options.stylusmode == true) {
        return;
      }
      disableMarkup();
      editor.toolbar.closeSubSubtoolUI();
      event.preventDefault();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientPosition(event, "y"));
      let thickness = utils.round(Math.max(this.thickness / 4, 1));
      let tempID = utils.tempID();
      let newAnno = {
        _id: tempID,
        f: "draw",
        p: [utils.round(x - thickness), utils.round(y - thickness)],
        s: [0, 0],
        l: utils.maxLayer + 1,
        c: this.color,
        t: thickness,
        o: 100,
        d: [0, 0]
      };
      let parentID = editor.parentFromPoint(x, y);
      if (parentID != null) {
        this.setParent = parentID;
      }
      if (mouseDown() == false) {
        return;
      }
      [markup, anno] = await utils.render(newAnno);
      editor.selecting[tempID] = markup;
    }
    let drawModule = await editor.toolbar.getModule("pages/editor/toolbar/pen");
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
      if (editor.usingStylus == true) {
        if (event.changedTouches != null && event.changedTouches[0] != null) {
          let touch = event.changedTouches[0];
          if (touch.touchType != "stylus") {
            return;
          }
          //touch.force = the force of the touch - useful for later ;)
        } else {
          return;
        }
      }
      event.preventDefault();
      let rect = anno.getBoundingClientRect();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x") - rect.left, clientPosition(event, "y") - rect.top, true);
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

      if (this.setParent != null) {
        markup.parent = this.setParent;
        editor.applyRelativePosition(markup);
      }

      utils.save(markup, anno);
      utils.pushHistory("remove", [{ _id: markup._id }]);

      markup.done = true; // Alert other clients that this annotation is done
      await utils.forceShort();
      delete editor.selecting[markup._id];
      markup = null;
      editor.usingStylus = false;
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousedown", enableMarkup, { passive: false });
    addEvent(content, "touchstart", enableMarkup, { passive: false });
    addEvent(content, "mousemove", moveMarkup, { passive: false });
    addEvent(content, "touchmove", moveMarkup, { passive: false });
    addEvent(content, "mouseup", disableMarkup, { passive: false });
    addEvent(content, "touchend", disableMarkup, { passive: false });
    editor.toolbar.endToolEvent = disableMarkup;
  }
};

// TEXT TOOL
modules["pages/editor/toolbar/text"] = class {
  js = async function (editor, utils, addEvent, extra) {
    this.color = editor.preferences.tools.text.color.selected;
    this.opacity = editor.preferences.tools.text.opacity;
    this.publish = {};

    let toolbar = this.parent;
    let cursor = toolbar.cursor;

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
          l: utils.maxLayer + 1,
          c: this.color,
          o: this.opacity,
          d: { s: editor.preferences.tools.text.size, al: editor.preferences.tools.text.align, b: ["Example Text"] },
          hidden: true,
          textfit: true
        };
      }
      if (event != null) {
        clientX = clientPosition(event, "x");
        clientY = clientPosition(event, "y");
      }
      if (clientX == null || clientY == null) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY);
      text.p = [utils.round(x - (text.s[0] / 2)), utils.round(y - (text.s[1] / 2))];
      [text, anno] = await utils.render(text, anno);
      let textElem = anno.querySelector("div[text]");
      if (textElem != null) {
        text.s = [textElem.offsetWidth, textElem.offsetHeight];
        delete text.hidden;
      }
      editor.selecting["cursor"] = text;
    }
    let placetext = async () => {
      let parentID = editor.parentFromPoint(text.p[0] + (text.s[0] / 2), text.p[1] + (text.s[1] / 2));
      if (parentID != null) {
        text.parent = parentID;
        editor.applyRelativePosition(text);
      }
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

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'));
      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[subtool="select"]'));
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
    addEvent(window, "scroll", () => { textmove(); }, { passive: false });
    addEvent(content, "mouseup", placetext, { passive: false });
    addEvent(content, "touchend", placetext, { passive: false });
  }
};

// PEN TOOL
modules["pages/editor/toolbar/pen"] = class {
  mouse = `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_230_9)"> <path d="M34.1403 16.8592L33.2006 16.5172L32.8586 17.4569L30.0243 25.2438C29.0801 27.8382 29.3788 30.7224 30.8347 33.0682L31.1771 33.6198C31.6637 34.4037 32.6235 34.7531 33.5002 34.4653L34.117 34.2628C36.7401 33.4017 38.8229 31.3843 39.7672 28.7899L42.6014 21.003L42.9434 20.0633L42.0037 19.7213L34.1403 16.8592Z" fill="COLOR_REPLACE" fill-opacity="OPACITY_REPLACE" stroke="white" stroke-width="2"/> <path d="M39.0164 27.925L39.9561 28.2671L40.2981 27.3274L45.5943 12.7762C46.5735 10.0858 45.1863 7.11099 42.4959 6.13176C39.8055 5.15253 36.8307 6.53971 35.8514 9.23012L30.5553 23.7813L30.2132 24.721L31.1529 25.063L39.0164 27.925Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> </g> <defs> <filter id="filter0_d_230_9" x="24.4814" y="0.817383" width="26.4268" height="38.748" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_230_9"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_230_9" result="shape"/> </filter> </defs> </svg>`;
  realtimeTool = 2;
  simplifyPath = function (points, epsilon) {
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
  }
  perpendicularDistance = function (point, lineStart, lineEnd) {
    return Math.abs((lineEnd[1] - lineStart[1]) * point[0] - (lineEnd[0] - lineStart[0]) * point[1] +
      lineEnd[0] * lineStart[1] - lineEnd[1] * lineStart[0]) /
      Math.sqrt(Math.pow(lineEnd[1] - lineStart[1], 2) + Math.pow(lineEnd[0] - lineStart[0], 2));
  }
  relativelyStraight = function (coordinates, tolerance) {
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
  }
  horizontalLine = function (points) {
    if (Math.abs(points[1] - points[3]) < 15) {
      return true;
    }
    return false;
  }
  js = async function (editor, utils, addEvent) {
    this.color = editor.preferences.tools.draw.color.selected;
    this.thickness = editor.preferences.tools.draw.thickness;
    this.opacity = editor.preferences.tools.draw.opacity;
    this.publish = { c: this.color, o: this.opacity };

    body.style.userSelect = "none";
    if (editor.options.stylusmode != true) {
      editor.page.style.touchAction = "pinch-zoom";
    } else {
      editor.pinchZoomDisable = true;
    }

    let draw;
    let anno;
    let enableDraw = async (event) => {
      if (event.changedTouches != null && event.changedTouches[0] != null) {
        let touch = event.changedTouches[0];
        if (touch.touchType == "stylus") {
          editor.usingStylus = true;
        } else if (editor.options.stylusmode == true) {
          return;
        }
      } else if (editor.options.stylusmode == true) {
        return;
      }
      disableDraw();
      editor.toolbar.closeSubSubtoolUI();
      event.preventDefault();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x"), clientPosition(event, "y"));
      let tempID = utils.tempID();
      let newAnno = {
        _id: tempID,
        f: "draw",
        p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
        s: [0, 0], //[this.thickness, this.thickness],
        l: utils.maxLayer + 1,
        c: this.color,
        t: this.thickness,
        o: this.opacity,
        d: [0, 0]
      };
      let parentID = editor.parentFromPoint(x, y);
      if (parentID != null) {
        this.setParent = parentID;
      }

      if (mouseDown() == false) {
        return;
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
      if (editor.usingStylus == true) {
        if (event.changedTouches != null && event.changedTouches[0] != null) {
          let touch = event.changedTouches[0];
          if (touch.touchType != "stylus") {
            return;
          }
          //touch.force = the force of the touch - useful for later ;)
        } else {
          return;
        }
      }
      event.preventDefault();
      let rect = anno.getBoundingClientRect();
      let { x, y } = await utils.scaleToDoc(clientPosition(event, "x") - rect.left, clientPosition(event, "y") - rect.top, true);
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
        await disableDraw();
        enableDraw(event);
      }
    }
    let disableDraw = async () => {
      if (draw == null) {
        return;
      }
      draw.d = this.simplifyPath(draw.d, .75 / editor.zoom);

      if (this.setParent != null) {
        draw.parent = this.setParent;
        editor.applyRelativePosition(draw);
      }

      utils.save(draw, anno);
      utils.pushHistory("remove", [{ _id: draw._id }]);

      draw.done = true; // Alert other clients that this annotation is done
      await utils.forceShort();
      delete editor.selecting[draw._id];
      draw = null;
      editor.usingStylus = false;
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousedown", enableDraw, { passive: false });
    addEvent(content, "touchstart", enableDraw, { passive: false });
    addEvent(content, "mousemove", moveDraw, { passive: false });
    addEvent(content, "touchmove", moveDraw, { passive: false });
    addEvent(content, "mouseup", disableDraw, { passive: false });
    addEvent(content, "touchend", disableDraw, { passive: false });
    editor.toolbar.endToolEvent = disableDraw;
  }
};
// ERASER TOOL
modules["pages/editor/toolbar/eraser"] = class {
  mouse = `<svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d_236_14)"> <path d="M32 25V24H33H43C45.2091 24 47 25.7909 47 28V36C47 38.2091 45.2091 40 43 40H33H32V39V25Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> <path d="M32 39V40H31H21C18.7909 40 17 38.2091 17 36V28C17 25.7909 18.7909 24 21 24H31H32V25V39Z" fill="#2F2F2F" stroke="white" stroke-width="2"/> </g> <defs> <filter id="filter0_d_236_14" x="12" y="19" width="40" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_236_14"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_236_14" result="shape"/> </filter> </defs> </svg>`;
  realtimeTool = 3;
  js = async function (editor, utils, addEvent) {
    this.publish = {};

    body.style.userSelect = "none";
    if (editor.options.stylusmode != true) {
      editor.page.style.touchAction = "pinch-zoom";
    } else {
      editor.pinchZoomDisable = true;
    }
    editor.page.setAttribute("enabled", "");

    let isPointOnLine = (x, y, x1, y1, x2, y2, tolerance) => {
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
      if (event.changedTouches != null && event.changedTouches[0] != null) {
        let touch = event.changedTouches[0];
        if (touch.touchType == "stylus") {
          editor.usingStylus = true;
        } else if (editor.options.stylusmode == true) {
          return;
        }
      } else if (editor.options.stylusmode == true) {
        return;
      }
      erasing = true;
      erase(event);
    }
    let x0;
    let y0;
    let enderase = () => {
      x0 = null;
      y0 = null;
      erasing = false;
      editor.usingStylus = false;
    }
    let erase = async (event) => {
      if (mouseDown() == false || erasing == false) {
        enderase();
        return;
      }
      if (event.touches != null && event.touches.length > 1) {
        return;
      }
      if (editor.usingStylus == true) {
        if (event.changedTouches != null && event.changedTouches[0] != null) {
          let touch = event.changedTouches[0];
          if (touch.touchType != "stylus") {
            return;
          }
          //touch.force = the force of the touch - useful for later ;)
        } else {
          return;
        }
      }
      editor.toolbar.closeSubSubtoolUI();

      let x1 = clientPosition(event, "x");
      let y1 = clientPosition(event, "y");

      event.preventDefault();

      let self = editor.getSelf();

      x0 = x0 ?? x1;
      y0 = y0 ?? y1;

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
          if (anno != null && anno.hasAttribute("hidden") == false) {
            let drawing = anno.querySelector(":scope > svg > polyline");
            if (drawing != null && drawing.hasAttribute("points") == true) {
              let annoID = anno.getAttribute("anno");
              let annotation = editor.annotations[annoID];
              if (annotation != null) {
                let render = annotation.render ?? {};
                if (render.lock == true) {
                  continue;
                }
                if (editor.lesson.settings.editOthersWork != true && [render.a, render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
                  continue;
                }

                // This alone isn't enough, the actual points MUST be checked:
                let scaledPos = await utils.scaleToDoc(x0, y0);
                let position = editor.getAbsolutePosition(render);
                let xPos = scaledPos.x - position[0];
                let yPos = scaledPos.y - position[1];
                if (render.s[0] < 0) {
                  xPos -= render.s[0];
                }
                if (render.s[1] < 0) {
                  yPos -= render.s[1];
                }
                let points = drawing.points;
                let halfWidth = drawing.parentElement.viewBox.baseVal.width / 2;
                let halfHeight = drawing.parentElement.viewBox.baseVal.height / 2;
                for (let i = 1; i < points.numberOfItems; i++) {
                  let prevPoint = points.getItem(i - 1);
                  let prevRelativeX = prevPoint.x - halfWidth;
                  let prevRelativeY = -(prevPoint.y - halfHeight);
                  let point = points.getItem(i);
                  let pRelativeX = point.x - halfWidth;
                  let pRelativeY = -(point.y - halfHeight);
                  if (render.s[0] < 0) {
                    prevRelativeX *= -1;
                    pRelativeX *= -1;
                  }
                  if (render.s[1] < 0) {
                    prevRelativeY *= -1;
                    pRelativeY *= -1;
                  }
                  let [prevPointX, prevPointY] = utils.rotatePoint(prevRelativeX, prevRelativeY, render.r);
                  let [pointX, pointY] = utils.rotatePoint(pRelativeX, pRelativeY, render.r);
                  if (isPointOnLine(xPos + 100, yPos + 100, prevPointX + halfWidth, (-prevPointY) + halfHeight, pointX + halfWidth, (-pointY) + halfHeight, (parseInt(drawing.getAttribute("stroke-width")) / 2) + 10)) {
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
modules["pages/editor/toolbar/shape"] = class {
  js = async function (editor, utils, addEvent, extra) {
    this.color = editor.preferences.tools.shape.color.selected;
    this.thickness = editor.preferences.tools.shape.thickness;
    this.opacity = editor.preferences.tools.shape.opacity;
    this.publish = {};
    
    let toolbar = this.parent;
    let cursor = toolbar.cursor;

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";
    editor.page.setAttribute("enabled", "");

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
          l: utils.maxLayer + 1,
          c: this.color,
          t: this.thickness,
          o: this.opacity,
          i: editor.preferences.tools.shape.filled
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
      if (event != null) {
        clientX = clientPosition(event, "x");
        clientY = clientPosition(event, "y");
      }
      if (clientX == null || clientY == null) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY);
      shape.p = [utils.round(x - (shape.s[0] / 2) - shape.t), utils.round(y - (shape.s[1] / 2) - shape.t)];
      [shape, anno] = await utils.render(shape, anno);
      editor.selecting["cursor"] = shape;
    }
    let placeshape = async () => {
      let parentID = editor.parentFromPoint(shape.p[0] + (shape.s[0] / 2), shape.p[1] + (shape.s[1] / 2));
      if (parentID != null) {
        shape.parent = parentID;
        editor.applyRelativePosition(shape);
      }
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

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'));
      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[subtool="select"]'));
      editor.selecting[tempID] = {};
      cursor.updateBox();
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousemove", shapemove, { passive: false });
    addEvent(content, "touchmove", shapemove, { passive: false });
    addEvent(window, "scroll", () => { shapemove(); }, { passive: false });
    addEvent(content, "mouseup", placeshape, { passive: false });
    addEvent(content, "touchend", placeshape, { passive: false });
  }
};

// STICKY NOTE TOOL
modules["pages/editor/toolbar/sticky"] = class {
  js = async function (editor, utils, addEvent, extra) {
    this.color = editor.preferences.tools.sticky.color.selected;
    this.publish = {};

    let toolbar = this.parent;
    let cursor = toolbar.cursor;

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";
    editor.page.setAttribute("enabled", "");

    let sticky;
    let anno;
    let clientX;
    let clientY;
    let stickymove = async (event) => {
      if (sticky == null) {
        // If not sticky, make one!
        sticky = {
          f: "sticky",
          //p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
          s: [220, 220], //[this.thickness, this.thickness],
          l: utils.maxLayer + 1,
          c: this.color,
          sig: editor.getSelf().name
        };
      }
      if (event != null) {
        clientX = clientPosition(event, "x");
        clientY = clientPosition(event, "y");
      }
      if (clientX == null || clientY == null) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY);
      sticky.p = [utils.round(x - (sticky.s[0] / 2)), utils.round(y - (sticky.s[1] / 2))];
      [sticky, anno] = await utils.render(sticky, anno);
      editor.selecting["cursor"] = sticky;
    }
    let placesticky = async () => {
      let parentID = editor.parentFromPoint(sticky.p[0] + (sticky.s[0] / 2), sticky.p[1] + (sticky.s[1] / 2));
      if (parentID != null) {
        sticky.parent = parentID;
        editor.applyRelativePosition(sticky);
      }
      let saveSticky = JSON.parse(JSON.stringify(sticky));
      sticky = null;
      delete editor.selecting["cursor"];

      let tempID = utils.tempID();
      anno.setAttribute("anno", tempID);
      anno.removeAttribute("tooleditor");
      saveSticky.sync = getEpoch();
      utils.save({ ...saveSticky, _id: tempID }, anno);
      utils.pushHistory("remove", [{ _id: tempID }]);

      saveSticky.done = true; // Alert other clients that this annotation is done
      editor.selecting[tempID] = saveSticky;
      await utils.forceShort();

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'));
      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[subtool="select"]'));
      editor.selecting[tempID] = {};
      await cursor.updateBox();

      let textElem = anno.querySelector("div[edit]");
      if (textElem != null) {
        textElem.textContent = "";
      }

      cursor.clickAction({
        target: content.querySelector('.eSelectBar:not([remove]) .eTool[action="pages/editor/toolbar/textedit"]')
      });
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousemove", stickymove, { passive: false });
    addEvent(content, "touchmove", stickymove, { passive: false });
    addEvent(window, "scroll", () => { stickymove(); }, { passive: false });
    addEvent(content, "mouseup", placesticky, { passive: false });
    addEvent(content, "touchend", placesticky, { passive: false });
  }
};

// PAGE TOOL
modules["pages/editor/toolbar/page"] = class {
  js = async function (editor, utils, addEvent, extra) {
    this.color = editor.preferences.tools.page.color.selected;
    this.size = editor.preferences.tools.page.size;
    this.publish = {};

    let toolbar = this.parent;
    let cursor = toolbar.cursor;

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";
    editor.page.setAttribute("enabled", "");

    let page;
    let anno;
    let clientY;
    let clientX;
    let pagemove = async (event) => {
      if (page == null) {
        // If not a page, make one!
        page = {
          f: "page",
          title: "Untitled Page",
          //p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
          s: this.size, //this.size
          l: utils.minLayer - 1,
          c: this.color
        };
      }
      if (event != null) {
        clientX = clientPosition(event, "x");
        clientY = clientPosition(event, "y");
      }
      if (clientX == null || clientY == null) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY);
      page.p = [utils.round(x - (page.s[0] / 2)), utils.round(y - (page.s[1] / 2))];
      [page, anno] = await utils.render(page, anno);
      editor.selecting["cursor"] = page;
    }
    let placepage = async () => {
      let parentID = editor.parentFromPoint(page.p[0] + (page.s[0] / 2), page.p[1] + (page.s[1] / 2), page.l);
      if (parentID != null) {
        page.parent = parentID;
        editor.applyRelativePosition(page);
      }
      let savePage = JSON.parse(JSON.stringify(page));
      page = null;
      delete editor.selecting["cursor"];

      let tempID = utils.tempID();
      anno.setAttribute("anno", tempID);
      anno.removeAttribute("tooleditor");
      savePage.sync = getEpoch();
      utils.save({ ...savePage, _id: tempID }, anno);
      utils.pushHistory("remove", [{ _id: tempID }]);

      savePage.done = true; // Alert other clients that this annotation is done
      editor.selecting[tempID] = savePage;
      await utils.forceShort();

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'));
      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[subtool="select"]'));
      editor.selecting[tempID] = {};
      await cursor.updateBox();
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousemove", pagemove, { passive: false });
    addEvent(content, "touchmove", pagemove, { passive: false });
    addEvent(window, "scroll", () => { pagemove(); }, { passive: false });
    addEvent(content, "mouseup", placepage, { passive: false });
    addEvent(content, "touchend", placepage, { passive: false });

    if (editor.zoom > .5) {
      editor.lastZoom = editor.zoom;
      await editor.setZoom(.5, null, { clientX: fixed.offsetWidth / 2, clientY: fixed.offsetHeight / 2 });
      editor.zoomChanged = false;
    }
  }
};

// MEDIA TOOL
modules["pages/editor/toolbar/upload"] = class {
  width = 150;
  height = 150;
  js = async function (editor, utils, addEvent, extra) {
    this.publish = {};

    let toolbar = this.parent;
    let cursor = toolbar.cursor;
    let alertModule = await this.loadModule("alert");

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
      this.media = null;
      this.imageBlob = null;
      let button = editor.page.querySelector('.eTool[module="pages/editor/toolbar/upload"]');
      if (button != null) {
        button.removeAttribute("selected");
      }
      uploadInput.value = null;
      toolbar.disableTool();
    }
    this.media = null;
    this.imageBlob = null;

    let startImagePlace = async (file, event) => {
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
                //mediamove(event);
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
    }
    uploadInput.addEventListener("change", async (event) => {
      startImagePlace((event.target.files ?? [])[0], event);
    });
    uploadInput.addEventListener("cancel", () => {
      reset();
      uploadInput.value = null;
    });

    if (extra.file == null) {
      uploadInput.click();
    } else {
      startImagePlace(extra.file, extra.event);
    }

    let anno;
    let clientY;
    let clientX;
    let mediamove = async (event) => {
      if (this.imageBlob == null) {
        return;
      }
      if (this.media == null) {
        // If not text box, make one!
        this.media = {
          f: "media",
          //p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
          //s: [this.width, this.height], //[this.thickness, this.thickness],
          l: utils.maxLayer + 1,
          c: this.color,
          o: this.opacity
        };
      }
      if (event != null) {
        clientX = clientPosition(event, "x");
        clientY = clientPosition(event, "y");
      }
      if (clientX == null || clientY == null) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY);
      this.media.s = [this.width, this.height];
      this.media.p = [utils.round(x - (this.media.s[0] / 2)), utils.round(y - (this.media.s[1] / 2))];
      [this.media, anno] = await utils.render({ ...this.media, d: this.imageBlob }, anno);
      editor.selecting["cursor"] = this.media;
    }
    let placemedia = async () => {
      if (this.imageBlob == null || this.imageBlob == null) {
        return;
      }
      let parentID = editor.parentFromPoint(this.media.p[0] + (this.media.s[0] / 2), this.media.p[1] + (this.media.s[1] / 2));
      if (parentID != null) {
        this.media.parent = parentID;
        editor.applyRelativePosition(this.media);
      }
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

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'));
      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[subtool="select"]'));
      editor.selecting[tempID] = {};
      cursor.updateBox();
    }
    addEvent(content, "mousemove", mediamove, { passive: false });
    addEvent(content, "touchmove", mediamove, { passive: false });
    addEvent(window, "scroll", () => { mediamove(); }, { passive: false });
    addEvent(content, "mouseup", placemedia, { passive: false });
    addEvent(content, "touchend", placemedia, { passive: false });
  }
};

// EMBED TOOL
modules["pages/editor/toolbar/embed"] = class {
  js = async function (editor, utils, addEvent, extra) {
    this.publish = {};

    let toolbar = this.parent;
    let cursor = toolbar.cursor;

    body.style.userSelect = "none";
    editor.page.style.touchAction = "pinch-zoom";
    editor.page.setAttribute("enabled", "");

    let embed;
    let anno;
    let clientY;
    let clientX;
    let embedmove = async (event) => {
      if (embed == null) {
        // If not embed, make one!
        embed = {
          f: "embed",
          //p: [utils.round(x - this.thickness), utils.round(y - this.thickness)],
          s: [400, 350], //[this.thickness, this.thickness],
          l: utils.maxLayer + 1
          //d: []
        };
      }
      if (event != null) {
        clientX = clientPosition(event, "x");
        clientY = clientPosition(event, "y");
      }
      if (clientX == null || clientY == null) {
        return;
      }
      let { x, y } = await utils.scaleToDoc(clientX, clientY);
      embed.p = [utils.round(x - (embed.s[0] / 2)), utils.round(y - (embed.s[1] / 2))];
      [embed, anno] = await utils.render(embed, anno);
      editor.selecting["cursor"] = embed;
    }
    let placeembed = async () => {
      let parentID = editor.parentFromPoint(embed.p[0] + (embed.s[0] / 2), embed.p[1] + (embed.s[1] / 2));
      if (parentID != null) {
        embed.parent = parentID;
        editor.applyRelativePosition(embed);
      }
      let saveEmbed = JSON.parse(JSON.stringify(embed));
      embed = null;
      delete editor.selecting["cursor"];

      let tempID = utils.tempID();
      anno.setAttribute("anno", tempID);
      anno.removeAttribute("tooleditor");
      saveEmbed.sync = getEpoch();
      utils.save({ ...saveEmbed, _id: tempID }, anno);
      utils.pushHistory("remove", [{ _id: tempID }]);

      saveEmbed.done = true; // Alert other clients that this annotation is done
      editor.selecting[tempID] = saveEmbed;
      await utils.forceShort();

      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[tool="select"]'));
      await toolbar.setCurrentTool(editor.page.querySelector('.eTool[subtool="select"]'));
      editor.selecting[tempID] = {};
      await cursor.updateBox();

      await sleep();

      cursor.clickAction({
        target: content.querySelector('.eSelectBar:not([remove]) .eTool[action="pages/editor/toolbar/setembed"]')
      });
    }
    let content = editor.page.querySelector(".eContent");
    addEvent(content, "mousemove", embedmove, { passive: false });
    addEvent(content, "touchmove", embedmove, { passive: false });
    addEvent(window, "scroll", () => { embedmove(); }, { passive: false });
    addEvent(content, "mouseup", placeembed, { passive: false });
    addEvent(content, "touchend", placeembed, { passive: false });
  }
};

modules["pages/editor/toolbar/color"] = class {
  button = `<div class="eSubToolColorHolder"><div class="eSubToolColor" backcolor picked></div></div>`;
  tooltip = "Colors";
  setButton = function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    button.querySelector(".eSubToolColor").style.background = editor.hexToRGB(preferenceTool.c, (preferenceTool.o ?? 0) / 100);
  }
  html = `
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
  `;
  css = {
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
  };
  hslToHex = function (h, s, l) {
    l /= 100;
    let a = s * Math.min(l, 1 - l) / 100;
    let f = n => {
      let k = (n + h / 30) % 12;
      let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    }
    return `${f(0)}${f(8)}${f(4)}`;
  }
  hsvToHex = function (h, s, b) {
    // HSV to HSL
    let x = (200 - s) * b / 100;
    s = x === 0 || x === 200 ? 0 : Math.round(s * b / (x <= 100 ? x : 200 - x));
    let l = Math.round(x / 2);
    // HSL to HEX
    return this.hslToHex(h, s, l);
  }
  hexToRGB = function (hex) {
    if (hex.length < 4) {
      hex = hex.split("").map((hexVal) => { return hexVal + hexVal }).join("");
    }
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
  }
  hexToHSL = function (hex) {
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
  }
  hexToHSV = function (hex) {
    // HEX to HSL
    let [h, s, l] = this.hexToHSL(hex);
    // HSL to HSV
    let x = s * (l < 50 ? l : 100 - l);
    let b = l + (x / 100);
    return [h, l === 0 ? s : 2 * x / b, l + (x / 100)];
  }
  rgbToHex = function (r, g, b) {
    return (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }
  setPreferenceTool = function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
  }
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
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

    let selector = frame.querySelector(".eSubToolColorSelector");
    let colorButtons = selector.children;
    let picker = frame.querySelector(".eSubToolColorPicker");
    let selected = false;
    let runColorSelections = () => {
      selected = false;
      this.setPreferenceTool(editor);
      for (let i = 0; i < colorButtons.length; i++) {
        let button = colorButtons[i];
        let setColor = toolPref.color.options[i];
        let isSelected = false;
        if (setColor != null) {
          button.setAttribute("int", i);
          button.querySelector(".eSubToolColor").style.background = editor.hexToRGB(setColor, toolPref.opacity / 100);
          if (isModify == false) {
            isSelected = setColor == toolPref.color.selected;
          } else {
            isSelected = setColor == this.preferenceTool.c;
          }
        }
        if (selected == false) {
          if (isSelected || setColor == null) {
            button.setAttribute("selected", "");
            selected = true;
          } else {
            button.removeAttribute("selected", "");
          }
        } else {
          button.removeAttribute("selected", "");
        }
      }
    }
    runColorSelections();

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
          let selected = selector.querySelector("button[selected]");
          if (selected != null) {
            selected.removeAttribute("selected");
          }
          element.setAttribute("selected", "");
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
    if (isModify == true) {
      extra.updateActionUI();
    }

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
    let firstChange;
    let updateStoredValues = async (hex) => {
      selectedColor = hex ?? this.hsvToHex(h, s, v);
      let selectedButton = selector.querySelector(".eTool[int][selected]");
      if (selectedButton == null) {
        selectedButton = selector.children[selector.childElementCount - 2];
        let selected = selector.querySelector(".eTool[selected]");
        if (selected != null) {
          selected.removeAttribute("selected");
        }
        selectedButton.setAttribute("selected", "");
      }
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
        await extra.saveSelecting({ c: selectedColor }, null, firstChange);
        extra.updateToolActions(extra.frame);
        firstChange = false;
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
      firstChange = true;
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
      h = Math.ceil(Math.max(Math.min(((event.clientX ?? event.changedTouches[0].clientX) - barRect.x) / colorSliderHolder.offsetWidth, 1), 0) * 360);
      updateStoredValues();
    }
    let colorSliderDown = (event) => {
      editor.events.mouseMove = eventColorUpdate;
      colorSliderEnabled = true;
      firstChange = true;
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
          firstChange = true;
          updateStoredValues(result.sRGBHex.substring(1));
        })
        .catch(() => { });
    });

    editor.toolbar.updateToolbar(isModify);
  }
};
modules["pages/editor/toolbar/thickness"] = class {
  button = `<div class="eSubToolThicknessButtonHolder"><div class="eSubToolThickness" thickness picked></div></div>`;
  tooltip = "Thickness";
  setButton = function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    let tip = button.querySelector(".eSubToolThickness");
    tip.style.width = preferenceTool.t + "px";
    tip.style.background = editor.hexToRGB(preferenceTool.c, (preferenceTool.o ?? 0) / 100);
  }
  html = `
    <div class="eSubToolThicknessHolder">
      <input class="eSubToolThicknessInput" name="Thickness">
      <div class="eSubToolThicknessSlider"><button></button></div>
    </div>
  `;
  css = {
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
  };
  setPreferenceTool = function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
  }
  minValue = 1;
  maxValue = 50;
  exponentFactor = 1.4;
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let cursorModule = toolbarModule.cursor;
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
    let firstChange;
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
        await extra.saveSelecting({ t: selectedThickness }, null, firstChange, null, false);
        cursorModule.updateBox(true);
        extra.updateToolActions(extra.frame);
        firstChange = false;
      }
    }
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || event.target.closest(".eSubToolThicknessHolder") == null) {
        app.style.userSelect = "unset";
        sliderEnabled = false;
        cursorModule.updateBox();
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
      firstChange = true;
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
      firstChange = true;
    });
    input.addEventListener("blur", () => {
      input.value = selectedThickness;
    });
    input.addEventListener("input", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedThickness = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedThickness = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI();
    });
    updateUI(null, true);
  }
};
modules["pages/editor/toolbar/opacity"] = class {
  button = `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1880_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_1880_2)"> <circle cx="128.5" cy="127.5" r="95.5" fill="white" stroke="white" stroke-width="16" stroke-miterlimit="3.99393" stroke-linecap="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M128.5 40C122.667 40 116.959 40.572 111.432 41.6653C111.259 41.6995 111.089 41.7391 110.921 41.7838C99.9626 44.0313 89.5327 48.361 80.2041 54.5355C80.0944 54.6017 79.9856 54.6708 79.878 54.7428C75.2764 57.8235 70.9838 61.3289 67.056 65.2032C66.9129 65.3444 66.7703 65.486 66.6282 65.6282C62.5849 69.6714 58.9358 74.1087 55.7428 78.878C55.6707 78.9856 55.6017 79.0944 55.5355 79.2041C49.361 88.5327 45.0313 98.9626 42.7838 109.921C42.7391 110.089 42.6995 110.259 42.6653 110.432C41.572 115.959 41 121.667 41 127.5C41 133.333 41.572 139.041 42.6653 144.568C42.6995 144.741 42.7391 144.911 42.7838 145.079C45.0313 156.037 49.361 166.467 55.5355 175.796C55.6017 175.906 55.6708 176.014 55.7428 176.122C58.811 180.705 62.3005 184.981 66.1562 188.896C66.3129 189.055 66.4702 189.214 66.6281 189.372C67.1376 189.881 67.6533 190.384 68.1751 190.881C71.7949 194.327 75.7097 197.467 79.878 200.257C79.9856 200.329 80.0944 200.398 80.2041 200.464C89.5327 206.639 99.9626 210.969 110.921 213.216C111.089 213.261 111.259 213.3 111.432 213.335C116.959 214.428 122.667 215 128.5 215C134.333 215 140.041 214.428 145.568 213.335C149.902 212.477 152.721 208.269 151.863 203.934C151.006 199.6 146.797 196.781 142.463 197.639C137.953 198.531 133.285 199 128.5 199V127.5V56C133.285 56 137.953 56.469 142.463 57.3611C146.797 58.2186 151.006 55.4 151.863 51.0658C152.721 46.7315 149.902 42.5228 145.568 41.6653C140.041 40.572 134.333 40 128.5 40ZM177.122 54.7428C173.451 52.2848 168.482 53.2685 166.024 56.94C163.566 60.6114 164.549 65.5803 168.221 68.0383C176.022 73.2607 182.739 79.9785 187.962 87.7791C190.42 91.4506 195.389 92.4343 199.06 89.9763C202.731 87.5183 203.715 82.5494 201.257 78.878C194.871 69.3394 186.661 61.1287 177.122 54.7428ZM214.335 110.432C213.477 106.098 209.269 103.279 204.934 104.137C200.6 104.994 197.781 109.203 198.639 113.537C199.531 118.047 200 122.715 200 127.5C200 132.285 199.531 136.953 198.639 141.463C197.781 145.797 200.6 150.006 204.934 150.863C209.269 151.721 213.477 148.902 214.335 144.568C215.428 139.041 216 133.333 216 127.5C216 121.667 215.428 115.959 214.335 110.432ZM201.257 176.122C203.715 172.451 202.731 167.482 199.06 165.024C195.389 162.566 190.42 163.549 187.962 167.221C182.739 175.022 176.022 181.739 168.221 186.962C164.549 189.42 163.566 194.389 166.024 198.06C168.482 201.731 173.451 202.715 177.122 200.257C186.661 193.871 194.871 185.661 201.257 176.122Z" opacity fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Opacity";
  setButton = function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    button.querySelector("[opacity]").setAttribute("fill", editor.hexToRGB(preferenceTool.c, (preferenceTool.o ?? 0) / 100));
  }
  html = `
    <div class="eSubToolOpacityHolder">
      <input class="eSubToolOpacityInput" name="Thickness">
      <div class="eSubToolOpacitySlider"><button></button></div>
    </div>
  `;
  css = {
    ".eSubToolOpacityHolder": `box-sizing: border-box; display: flex; width: 212px; height: 50px; padding: 6px; align-items: center`,
    ".eSubToolOpacityInput": `width: 40px; height: 26px; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 20px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolOpacitySlider": `position: relative; flex: 1; height: 10px; margin: 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolOpacitySlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolOpacitySlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolOpacitySlider button:active": `transform: scale(1.1) !important`
  };
  setPreferenceTool = function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
  }
  minValue = 10;
  maxValue = 100;
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
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
    let firstChange;
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
        await extra.saveSelecting({ o: selectedOpacity }, null, firstChange);
        extra.updateToolActions(extra.frame);
        firstChange = false;
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
      selectedOpacity = Math.ceil((Math.max(Math.min(((event.clientX ?? event.changedTouches[0].clientX) - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0) * (this.maxValue - this.minValue)) + this.minValue);
      updateUI();
    }
    editor.events.mouseMove = eventBarUpdate;
    let enableSlider = (event) => {
      sliderEnabled = true;
      firstChange = true;
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
      firstChange = true;
    });
    input.addEventListener("blur", () => {
      input.value = selectedOpacity;
    });
    input.addEventListener("input", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedOpacity = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedOpacity = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI();
    });
    updateUI(null, true);
  }
};

modules["pages/editor/toolbar/style"] = class {
  button = `<div class="eSubToolStyleHolder"><div class="eSubToolStyle"></div></div>`;
  tooltip = "Styling";
  setButton = function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    let buttonElem = button.querySelector(".eSubToolStyle");
    let color = editor.hexToRGB(preferenceTool.c, (preferenceTool.o ?? 0) / 100);
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
        buttonElem.style.border = (prefB ?? "solid") + " 4px " + color; //var(--darkGray)
        buttonElem.style.removeProperty("background");
      } else {
        buttonElem.style.border = (prefB ?? "solid") + " 4px " + editor.hexToRGB(editor.darkenHex(preferenceTool.c, 20), (preferenceTool.o ?? 0) / 100);
        buttonElem.style.background = color;
      }
    } else {
      buttonElem.style.background = color;
      buttonElem.style.removeProperty("border");
    }
  }
  html = `
    <div class="eSubToolStyleContainer">
      <button class="eTool" tooltip="Filled" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" fill></div></div></div></button>
      <div class="eVerticalDivider" styles keeptooltip></div>
      <button class="eTool" tooltip="Solid Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" solid></div></div></div></button>
      <button class="eTool" tooltip="Dashed Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" dashed></div></div></div></button>
      <button class="eTool" tooltip="No Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" none></div></div></div></button>
    </div>
  `;
  css = {
    ".eSubToolStyleHolder": `display: flex; width: 32px; height: 32px; background: #fff; border: solid 3px var(--pageColor); border-radius: 11px; justify-content: center; align-items: center`,
    ".eSubToolStyle": `box-sizing: border-box; width: 100%; height: 100%; border-radius: 8px`,

    ".eSubToolStyleContainer": `display: flex; width: 100%; height: 50px; gap: 6px; overflow: auto; border-radius: inherit`,
    ".eSubToolStyleContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolStyleContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolStyleContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
  setPreferenceTool = function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
  }
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
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
          if ((selectedB ?? "solid") == "solid") {
            solidButton.setAttribute("selected", "");
          } else {
            dashedButton.setAttribute("selected", "");
          }
        } else {
          fillButton.setAttribute("selected", "");
          if ((selectedB ?? "solid") == "solid") {
            solidButton.setAttribute("selected", "");
          } else {
            dashedButton.setAttribute("selected", "");
          }
        }
      } else {
        fillButton.setAttribute("selected", "");
        noneButton.setAttribute("selected", "");
      }

      let color = editor.hexToRGB(this.preferenceTool.c, (this.preferenceTool.o ?? 0) / 100);
      let borderColor = color;
      if (selectedI == true || selectedB == "none") {
        borderColor = editor.hexToRGB(editor.darkenHex(this.preferenceTool.c, 20), (this.preferenceTool.o ?? 0) / 100);
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
      editor.preferences.tools.shape.filled = selectedI;
      editor.savePreferences();
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

modules["pages/editor/toolbar/delete"] = class {
  button = `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_673_23" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_673_23)"> <path d="M170.895 45H85.3463C67.613 45 53.7495 60.2992 55.4914 77.9467L65.9071 183.474C67.4224 198.827 80.3347 210.528 95.762 210.528H160.479C175.906 210.528 188.819 198.827 190.334 183.474L200.75 77.9467C202.492 60.2992 188.628 45 170.895 45Z" fill="white" stroke="white" stroke-width="34"/> <path d="M128.811 171.731L128.811 83.0442" stroke="#2F2F2F" stroke-width="14" stroke-linecap="round"/> <path d="M100.615 172.88L95.0507 83.8926" stroke="#2F2F2F" stroke-width="14" stroke-linecap="round"/> <path d="M156.256 172.88L161.82 83.8926" stroke="#2F2F2F" stroke-width="14" stroke-linecap="round"/> <path d="M170.895 51H85.3463C71.1597 51 60.0689 63.2393 61.4623 77.3574L71.8781 182.885C73.0903 195.167 83.4201 204.528 95.762 204.528H160.479C172.821 204.528 183.151 195.167 184.363 182.885L194.779 77.3574C196.172 63.2394 185.082 51 170.895 51Z" stroke="#2F2F2F" stroke-width="22"/> </g> </svg>`;
  tooltip = "Delete";
  css = {
    '.eTool[action="pages/editor/toolbar/delete"]': `--hoverColor: var(--error); --hoverTooltip: var(--error)`
  };
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let cursor = toolbarModule.cursor;
    await extra.saveSelecting({ remove: true });
    /*let selectKeys = Object.keys(editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      editor.selecting[selectID].remove = true;
      editor.selecting[selectID].done = true;

      /*let allSelections = [...editor.page.querySelectorAll('.eSelect[anno="' + selectID + '"]'), ...editor.page.querySelectorAll('.eSelectActive[anno="' + selectID + '"]'), ...editor.page.querySelectorAll('.eCollabSelect[anno="' + selectID + '"]')];
      for (let i = 0; i < allSelections.length; i++) {
        allSelections[i].remove();
      }
    }
    //await utils.forceShort();
    editor.selecting = {};*/
    cursor.updateBox();
  }
};
modules["pages/editor/toolbar/more"] = class {
  button = `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2030_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2030_2)"> <circle cx="54" cy="128" r="26" fill="white" stroke="white" stroke-width="12"/> <circle cx="54" cy="128" r="20" fill="#2F2F2F"/> <circle cx="128" cy="128" r="26" fill="white" stroke="white" stroke-width="12"/> <circle cx="128" cy="128" r="20" fill="#2F2F2F"/> <circle cx="202" cy="128" r="26" fill="white" stroke="white" stroke-width="12"/> <circle cx="202" cy="128" r="20" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "More";
  showOnLock = true;
  //divideBefore = true;
  setButton = async function (editor, button) {
    button.setAttribute("dropdown", "dropdowns/editor/toolbar/more");
    button.setAttribute("dropdowntitle", "More");
    //button.setAttribute("noscrollclose", "");

    if (this.parent.cursor.refreshButtons != null) {
      this.parent.cursor.refreshButtons();
    }
  }
  js = async function (frame, toolID, extra) {
    let toolbarMoreModule = await this.loadModule("dropdowns/editor/toolbar/more");
    toolbarMoreModule.frame = frame;
    toolbarMoreModule.origin = extra.button;
    toolbarMoreModule.toolID = toolID;
    toolbarMoreModule.extra = extra;
  }
};
modules["dropdowns/editor/toolbar/more"] = class {
  html = `
  <button class="eToolbarMoreAction" option="duplicate" close title="Duplicate"><img src="./images/editor/duplicate.svg">Duplicate</button>
  <button class="eToolbarMoreAction" option="lock" close title="Lock to prevent editing."><img src="./images/editor/lock.svg">Lock</button>
  <div class="eToolbarMoreLine" option="layers"></div>
  <button class="eToolbarMoreAction" option="bringfront" close title="Bring Forward"><img src="./images/editor/rearrange/up.svg">Bring to Front</button>
  <button class="eToolbarMoreAction" option="sendback" close title="Send Backward"><img src="./images/editor/rearrange/down.svg">Send to Back</button>
  <div class="eToolbarMoreLine" option="duplicate"></div>
  <button class="eToolbarMoreAction" option="copylink" close title="Copy a share link to element." style="--themeColor: var(--secondary)"><img src="./images/tooltips/copy.svg">Copy Link</button>
  `;
  css = {
    ".eToolbarMoreAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eToolbarMoreAction:not(:last-child)": `margin-bottom: 4px`,
    ".eToolbarMoreAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: #fff; border-radius: 4px`,
    ".eToolbarMoreAction:hover": `background: var(--themeColor); color: #fff`,
    ".eToolbarMoreLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".eToolbarMoreShowMe": `color: var(--theme); font-weight: 700`
  };
  handleDuplicate = async function (tooltip) { // Duplicate all selected annotations
    let toolbar = this.parent;
    let editor = toolbar.parent;
    let utils = editor.utils;
    let cursor = toolbar.cursor;

    let self = editor.getSelf();
    let selectKeys = Object.keys(editor.selecting);
    let checkChunks = [];
    let newSelect = {};
    let newNewSelect = {};
    let parentIDs = {};
    let setTempSync = getEpoch();
    let maxZIndex;
    let minZIndex;
    let offsetX = 50;
    let offsetY = 50;
    
    if (tooltip != null) {
      offsetX = 0;
      offsetY = 0;
      if (tooltip == "duplicateleft") {
        offsetX -= (cursor.maxX - cursor.minX) + 34;
      } else if (tooltip == "duplicateright") {
        offsetX += (cursor.maxX - cursor.minX) + 34;
      } else if (tooltip == "duplicatetop") {
        offsetY -= (cursor.maxY - cursor.minY) + 34;
      } else if (tooltip == "duplicatebottom") {
        offsetY += (cursor.maxY - cursor.minY) + 34;
      }
    }
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      let tempID = utils.tempID();
      let newAnno = JSON.parse(JSON.stringify({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }));
      if (self.access < 4 && toolbar.checkSubToolType(editor, newAnno.f) == true) {
        continue;
      }
      checkChunks = [ ...checkChunks, ...editor.annotationInChunks(newAnno) ];
      parentIDs[selectID] = tempID;
      newAnno._id = tempID;
      maxZIndex = Math.max(maxZIndex ?? newAnno.l ?? utils.maxLayer, newAnno.l ?? utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? newAnno.l ?? utils.minLayer, newAnno.l ?? utils.minLayer);
      newSelect[tempID] = newAnno;
      newNewSelect[tempID] = {};
    }
    let annotationKeys = {};
    for (let c = 0; c < checkChunks.length; c++) {
      annotationKeys = { ...annotationKeys, ...(editor.chunkAnnotations[checkChunks[c]] ?? {}) };
    }
    let annotations = Object.keys(annotationKeys);
    for (let a = 0; a < annotations.length; a++) {
      let checkAnnoID = annotations[a];
      if (checkAnnoID == null || editor.selecting[checkAnnoID] != null) {
        continue;
      }
      let checkAnnotation = editor.annotations[checkAnnoID];
      if (checkAnnotation == null) {
        continue;
      }
      if (checkAnnotation.pointer != null) {
        checkAnnoID = checkAnnotation.pointer;
        checkAnnotation = editor.annotations[checkAnnoID] ?? { render: {} };
      }
      let render = checkAnnotation.render ?? {};
      let currentAnnoCheck = render;
      let checkedParents = [];
      let enableContinue = false;
      while (currentAnnoCheck.parent != null) {
        let annoid = currentAnnoCheck.parent;
        if (annoid == null || checkedParents.includes(annoid) == true) {
          break;
        }
        checkedParents.push(annoid);
        let annotation = editor.annotations[annoid];
        if (annotation == null) {
          break;
        }
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = editor.annotations[annoid] ?? { render: {} };
        }
        if (editor.selecting[annoid] != null) {
          enableContinue = true;
          break;
        }
        currentAnnoCheck = annotation.render ?? {};
      }
      if (enableContinue == false) {
        continue;
      }
      let tempID = utils.tempID();
      let newAnno = JSON.parse(JSON.stringify(render));
      if (self.access < 4 && toolbar.checkSubToolType(editor, newAnno.f) == true) {
        continue;
      }
      parentIDs[checkAnnoID] = tempID;
      newAnno._id = tempID;
      maxZIndex = Math.max(maxZIndex ?? newAnno.l ?? utils.maxLayer, newAnno.l ?? utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? newAnno.l ?? utils.minLayer, newAnno.l ?? utils.minLayer);
      newSelect[tempID] = newAnno;
    }
    maxZIndex++;
    let duplicateKeys = Object.keys(newSelect);
    for (let i = 0; i < duplicateKeys.length; i++) {
      let selectDup = newSelect[duplicateKeys[i]];
      let checkParent = parentIDs[selectDup.parent];
      if (checkParent != null) {
        selectDup.parent = checkParent;
      } else {
        let [x, y] = editor.getAbsolutePosition(selectDup);
        selectDup.p = [x + offsetX, y + offsetY];
        selectDup.parent = null;
      }
      selectDup.l = maxZIndex + ((selectDup.l ?? utils.maxLayer) - minZIndex);
      selectDup.sync = setTempSync;
      delete selectDup.m;
      delete selectDup.lock;
      //delete selectDup.hidden;
    }
    cursor.action = "save";
    editor.selecting = newSelect;
    await cursor.endAction();
    editor.selecting = newNewSelect;
    //cursor.updateBox();
  }
  js = async function (frame, extra) {
    let editor = await findModule(extra.origin);
    this.editor = editor;
    let utils = editor.utils;
    this.parent = editor.toolbar;
    let cursor = this.parent.cursor;

    let duplicateButton = frame.querySelector('.eToolbarMoreAction[option="duplicate"]');
    let duplicateLine = frame.querySelector('.eToolbarMoreLine[option="duplicate"]');
    duplicateButton.addEventListener("click", () => { this.handleDuplicate(); });
    let lockButton = frame.querySelector('.eToolbarMoreAction[option="lock"]');
    lockButton.addEventListener("click", async () => {
      await this.extra.saveSelecting({ lock: true });
      this.extra.updateToolActions(this.extra.frame);
    });

    let layersLine = frame.querySelector('.eToolbarMoreLine[option="layers"]');
    let frontButton = frame.querySelector('.eToolbarMoreAction[option="bringfront"]');
    frontButton.addEventListener("click", async () => {
      let selectKeys = Object.keys(editor.selecting);
      selectKeys.sort((a, b) => {
        let selectA = (editor.annotations[a] ?? {}).render ?? {};
        let selectB = (editor.annotations[b] ?? {}).render ?? {};
        return (selectA.l ?? selectA.sync) - (selectB.l ?? selectB.sync);
      });
      for (let i = 0; i < selectKeys.length; i++) {
        utils.maxLayer++;
        editor.selecting[selectKeys[i]].l = utils.maxLayer;
      }
      cursor.action = "save";
      await cursor.endAction();
      //cursor.updateBox();
      //await this.extra.saveSelecting({ l: utils.maxLayer + 1 }, true);
      //this.refreshButtons();
    });
    let backButton = frame.querySelector('.eToolbarMoreAction[option="sendback"]');
    backButton.addEventListener("click", async () => {
      let selectKeys = Object.keys(editor.selecting);
      selectKeys.sort((a, b) => {
        let selectA = (editor.annotations[a] ?? {}).render ?? {};
        let selectB = (editor.annotations[b] ?? {}).render ?? {};
        return (selectB.l ?? selectB.sync) - (selectA.l ?? selectA.sync);
      });
      for (let i = 0; i < selectKeys.length; i++) {
        utils.minLayer--;
        editor.selecting[selectKeys[i]].l = utils.minLayer;
      }
      cursor.action = "save";
      await cursor.endAction();
      //cursor.updateBox();
      //await this.extra.saveSelecting({ l: utils.minLayer - 1 }, true);
      //this.refreshButtons();
    });
    let shareButton = frame.querySelector('.eToolbarMoreAction[option="copylink"]');
    shareButton.addEventListener("click", async () => {
      /*if (editor.lesson.access == null || editor.lesson.access < 0) {
        let alert = await alertModule.open("info", '<b>Shared Link Disabled</b><div>To create a share link to this element, the lesson link must be set to public. <a class="eToolbarMoreShowMe" new>Show Me</a></div>', { time: 8 });
        let showMeButton = fixed.querySelector(".eToolbarMoreShowMe[new]");
        showMeButton.removeAttribute("new");
        showMeButton.addEventListener("click", async () => {
          alertModule.close(alert);
          await sleep(1);
          dropdownModule.open(editor.page.querySelector(".eShare"), "dropdowns/editor/share/link");
        });
        if (editor.getSelf().access < 4) {
          showMeButton.remove();
        }
        return;
      }*/
      let firstAnno = Object.keys(editor.selecting)[0];
      if (firstAnno == null || firstAnno.startsWith("pending_") == true) {
        return;
      }
      copyClipboardText("https://markify.link/join?lesson=" + editor.id + "&annotation=" + firstAnno, "link");
    });

    this.refreshButtons = () => {
      if (frame == null) {
        return;
      }
      let self = editor.getSelf();
      let showLock = self.access > 0;
      let pending = false;
      let selectKeys = Object.keys(editor.selecting);
      //let layer = 0;
      if (showLock != false) {
        for (let i = 0; i < selectKeys.length; i++) {
          let annotation = editor.annotations[selectKeys[i]];
          let render = annotation.render ?? annotation.revert ?? {};
          //let layer = render.l ?? Math.round(((render.sync ?? getEpoch()) / 2000000000000) * 2147483647);
          if (render._id.startsWith("pending_") == true) {
            pending = true;
          }
          if (render.lock == true) {
            showLock = false;
            break;
          }
          if (editor.lesson.settings.editOthersWork != true && [render.a, render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
            showLock = false;
            break;
          }
        }
      }
      if (showLock == true) {
        lockButton.style.display = "flex";
        layersLine.style.display = "block";
        frontButton.style.display = "flex";
        backButton.style.display = "flex";
      } else {
        lockButton.style.display = "none";
        layersLine.style.display = "none";
        frontButton.style.display = "none";
        backButton.style.display = "none";
      }
      if (self.access > 0) {
        duplicateButton.style.display = "flex";
        duplicateLine.style.display = "block";
      } else {
        duplicateButton.style.display = "none";
        duplicateLine.style.display = "none";
      }
      if (pending == false) {
        shareButton.removeAttribute("disabled");
      } else {
        shareButton.setAttribute("disabled", "");
      }
      /*if (layer < utils.maxLayer || selectKeys.length > 1) {
        frontButton.removeAttribute("disabled");
      } else {
        frontButton.setAttribute("disabled", "");
      }
      if (layer > utils.minLayer || selectKeys.length > 1) {
        backButton.removeAttribute("disabled");
      } else {
        backButton.setAttribute("disabled", "");
      }*/
    }
    cursor.refreshButtons = this.refreshButtons;
    this.refreshButtons();
  }
}
modules["pages/editor/toolbar/unlock"] = class {
  button = `<svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2037_69" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2037_69)"> <rect x="69" y="119" width="118" height="88" rx="17.7647" stroke="white" stroke-width="12"/> <rect x="45.12" y="95.12" width="165.76" height="135.76" rx="41.6447" stroke="white" stroke-width="35.76"/> <rect x="-6" y="6" width="30" height="52" rx="15" transform="matrix(1 0 0 -1 119 207)" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="-6" y="6" width="52" height="52" rx="26" transform="matrix(1 0 0 -1 108 183)" fill="#2F2F2F" stroke="white" stroke-width="12"/> <mask id="path-6-outside-1_2037_69" maskUnits="userSpaceOnUse" x="57.7168" y="10.7168" width="136" height="107" fill="black"> <rect fill="white" x="57.7168" y="10.7168" width="136" height="107"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M73.1983 96.8319L88.2938 84.1652C86.0671 71.8657 90.3169 58.7503 100.578 50.1404C115.552 37.5753 137.754 39.2844 150.642 53.8204C150.863 54.0691 151.081 54.3215 151.296 54.5777L162.161 67.5263L175.95 55.9561L165.084 43.0075C145.914 20.1615 111.854 17.1816 89.0075 36.3517C70.9481 51.5053 65.3023 75.9636 73.1983 96.8319Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M73.1983 96.8319L88.2938 84.1652C86.0671 71.8657 90.3169 58.7503 100.578 50.1404C115.552 37.5753 137.754 39.2844 150.642 53.8204C150.863 54.0691 151.081 54.3215 151.296 54.5777L162.161 67.5263L175.95 55.9561L165.084 43.0075C145.914 20.1615 111.854 17.1816 89.0075 36.3517C70.9481 51.5053 65.3023 75.9636 73.1983 96.8319Z" fill="white"/> <path d="M88.2938 84.1652L96.0072 93.3578L101.343 88.8809L100.102 82.0275L88.2938 84.1652ZM73.1983 96.8319L61.9748 101.078L67.9586 116.893L80.9117 106.024L73.1983 96.8319ZM100.578 50.1404L108.291 59.333L108.291 59.333L100.578 50.1404ZM150.642 53.8204L141.664 61.7816L141.664 61.7817L150.642 53.8204ZM151.296 54.5777L160.488 46.8642L160.488 46.8641L151.296 54.5777ZM162.161 67.5263L152.968 75.2397L160.682 84.4323L169.874 76.7188L162.161 67.5263ZM175.95 55.9561L183.663 65.1486L192.856 57.4352L185.142 48.2426L175.95 55.9561ZM165.084 43.0075L174.277 35.2941L174.277 35.2941L165.084 43.0075ZM89.0075 36.3517L81.2941 27.1591L89.0075 36.3517ZM80.5803 74.9727L65.4848 87.6393L80.9117 106.024L96.0072 93.3578L80.5803 74.9727ZM100.102 82.0275C98.6109 73.7924 101.462 65.063 108.291 59.333L92.8642 40.9479C79.1714 52.4376 73.5232 69.939 76.4857 86.303L100.102 82.0275ZM108.291 59.333C118.273 50.9575 133.075 52.0957 141.664 61.7816L159.621 45.8592C142.432 26.473 112.832 24.1932 92.8642 40.9479L108.291 59.333ZM141.664 61.7817C141.812 61.9486 141.958 62.1184 142.103 62.2913L160.488 46.8641C160.203 46.5246 159.914 46.1896 159.621 45.8591L141.664 61.7817ZM142.103 62.2911L152.968 75.2397L171.353 59.8128L160.488 46.8642L142.103 62.2911ZM168.236 46.7636L154.447 58.3337L169.874 76.7188L183.663 65.1486L168.236 46.7636ZM155.892 50.721L166.757 63.6695L185.142 48.2426L174.277 35.2941L155.892 50.721ZM96.721 45.5442C114.49 30.6341 140.982 32.9518 155.892 50.721L174.277 35.2941C150.847 7.37115 109.217 3.729 81.2941 27.1591L96.721 45.5442ZM84.4217 92.5853C78.2746 76.3388 82.6891 57.3183 96.721 45.5442L81.2941 27.1591C59.2071 45.6923 52.3301 75.5884 61.9748 101.078L84.4217 92.5853Z" fill="white" mask="url(#path-6-outside-1_2037_69)"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M77.8308 106.198L91.8333 94.4485C84.1197 79.7826 87.3658 61.2265 100.578 50.1404C115.552 37.5753 137.754 39.2844 150.642 53.8204C150.863 54.0691 151.081 54.3215 151.296 54.5777L162.161 67.5263L175.95 55.9561L165.084 43.0075C145.914 20.1615 111.854 17.1816 89.0075 36.3517C68.1585 53.8461 63.8543 83.7418 77.8308 106.198Z" fill="#2F2F2F"/> <rect x="51.1177" y="101.118" width="153.765" height="123.765" rx="35.647" stroke="#2F2F2F" stroke-width="23.7647"/> <rect width="18" height="40" rx="9" transform="matrix(1 0 0 -1 119 195)" fill="#2F2F2F"/> <rect width="40" height="40" rx="20" transform="matrix(1 0 0 -1 108 171)" fill="#2F2F2F"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M77.8308 106.198L91.8333 94.4485C84.1197 79.7826 87.3658 61.2265 100.578 50.1404C115.552 37.5753 137.754 39.2844 150.642 53.8204C150.863 54.0691 151.081 54.3215 151.296 54.5777L162.161 67.5263L175.95 55.9561L165.084 43.0075C145.914 20.1615 111.854 17.1816 89.0075 36.3517C68.1585 53.8461 63.8543 83.7418 77.8308 106.198Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Unlock";
  divideBefore = true;
  showOnLock = true;
  setButton = async function (editor, button) {
    let self = editor.getSelf();
    let selectKeys = Object.keys(editor.selecting);
    let showButton = true;
    let hideButton = self.access < 1;
    let locked = false;
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      let anno = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
      if (anno.lock == true) {
        locked = true;
      }
      if ([anno.a, anno.m].includes(self.modify) == false && self.access < 4) {
        showButton = false;
        break;
      }
      if (editor.lesson.settings.editOthersWork != true && [anno.a, anno.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
        hideButton = true;
        break;
      }
    }
    if (showButton == true) {
      button.style.removeProperty("opacity");
      this.disabled = false;
    } else {
      button.style.opacity = .5;
      this.disabled = true;
    }
    if (hideButton == false && locked == true) {
      button.style.display = "unset";
    } else {
      button.style.display = "none";
    }
  }
  js = async function (frame, toolID, extra) {
    let alertModule = await this.loadModule("alert");
    if (this.disabled == true) {
      alertModule.open("error", "<b>You Didn't Lock This</b>Only the member who locked this can unlock it.");
      return;
    }
    await extra.saveSelecting({ lock: false }, true);
    extra.updateToolActions(extra.frame);
  }
};

modules["pages/editor/toolbar/collaborator"] = class {
  button = `<img class="eSubToolCollaborator" src="./images/profiles/default.svg">`;
  showOnLock = true;
  setButton = async function (editor, button) {
    if (editor.lesson.settings.anonymousMode == true && editor.getSelf().access < 4) {
      button.style.display = "none";
      cursorModule.updateActionUI(false);
      return;
    }
    let cursorModule = this.parent.cursor;
    button.setAttribute("disabled", "");
    let selectKeys = Object.keys(editor.selecting);
    //let buttonElem = button.querySelector(".eSubToolStyle");
    // Loop through to see if collaborator option should be shown
    let modifiedBy;
    for (let i = 0; i < selectKeys.length; i++) {
      let annotation = editor.annotations[selectKeys[i]].render ?? {};
      let setModifiedBy = annotation.m ?? annotation.a;
      if (setModifiedBy == null || (modifiedBy != null && setModifiedBy != modifiedBy)) {
        button.style.display = "none";
        cursorModule.updateActionUI(false);
        return;
      }
      modifiedBy = setModifiedBy;
    }
    if (modifiedBy == null || modifiedBy == editor.getSelf().modify || modifiedBy.length != 24) {
      button.style.display = "none";
      cursorModule.updateActionUI(false);
      return;
    }
    let collaborator = editor.collaborators[modifiedBy];
    if (collaborator == null) { // Fetch to get the collaborator
      let [code, body] = await sendRequest("GET", "lessons/members/collaborator?modify=" + modifiedBy, null, { session: editor.session, allowError: [404] });
      if (code == 200) {
        editor.collaborators[body._id] = body;
        collaborator = editor.collaborators[body._id];
      } else {
        editor.collaborators[modifiedBy] = {};
        collaborator = editor.collaborators[modifiedBy];
      }
    }
    if (collaborator._id == null) {
      button.style.display = "none";
      cursorModule.updateActionUI(false);
      return;
    }
    button.setAttribute("collaborator", collaborator._id);
    button.setAttribute("tooltip", collaborator.name);
    let image = button.querySelector(".eSubToolCollaborator");
    if (image.getAttribute("src") != (collaborator.image ?? "./images/profiles/default.svg")) {
      image.src = collaborator.image ?? "./images/profiles/default.svg";
    }
    image.style.border = "solid 3px " + collaborator.color;
    button.removeAttribute("disabled");
    if (button.style.display != "unset") {
      button.style.display = "unset";
      cursorModule.updateActionUI(false);
    }
  }
  html = `
  <div class="eSubToolCollaboratorHolder">
    <div class="eSubToolCollaboratorBackdrop"><div></div></div>
    <div class="eSubToolCollaboratorContent">
      <div class="eSubToolCollaboratorCursor"></div>
      <img class="eSubToolCollaboratorPicture">
      <div class="eSubToolCollaboratorInfo">
        <div name></div>
        <div email></div>
      </div>
    </div>
    <button class="largeButton">Make Viewer</button>
  </div>
  `;
  css = {
    ".eSubToolCollaborator": `width: 30px; height: 30px; padding: 2px; object-fit: cover; background: var(--pageColor); border-radius: 20px`,

    ".eSubToolCollaboratorHolder": `display: flex; flex-direction: column; width: fit-content; max-width: var(--uiwidth); gap: 4px; align-items: center; border-radius: inherit`,
    ".eSubToolCollaboratorContent": `display: flex; flex-wrap: wrap; width: max-content; max-width: calc(100% - 16px); margin: 8px; gap: 4px; align-items: center; border-radius: inherit`,
    ".eSubToolCollaboratorBackdrop": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1; border-radius: inherit; overflow: hidden`,
    ".eSubToolCollaboratorBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .3; background-image: url(./images/editor/background.svg); background-position: center`,
    ".eSubToolCollaboratorCursor": `display: none; width: 40px; height: 40px; flex-shrink: 0; margin: 2px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px`,
    ".eSubToolCollaboratorPicture": `display: none; width: 44px; height: 44px; flex-shrink: 0; margin: 2px; background: #fff; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px`,
    ".eSubToolCollaboratorInfo": `margin: 4px; text-align: left`,
    ".eSubToolCollaboratorInfo div[name]": `max-width: calc(var(--uiwidth) - 24px); font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolCollaboratorInfo div[email]": `display: none; max-width: calc(var(--uiwidth) - 24px); font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolCollaboratorHolder .largeButton": `width: fit-content; padding: 6px 10px; margin: 4px 12px 12px; background: var(--theme); text-wrap: nowrap; font-size: 16px; --borderRadius: 12px; color: #fff`,
    //".eSubToolCollaboratorShowMe": `color: var(--theme); font-weight: 700`
  };
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;

    let button = extra.frame.querySelector('.eTool[action="pages/editor/toolbar/collaborator"]');
    let collaboratorID = button.getAttribute("collaborator");
    let collaborator = editor.collaborators[collaboratorID];
    if (collaborator == null) {
      return;
    }

    let holder = frame.querySelector(".eSubToolCollaboratorHolder");
    holder.style.setProperty("--themeColor", collaborator.color);
    if (collaborator.email == null) {
      frame.querySelector(".eSubToolCollaboratorCursor").style.display = "unset";
    } else {
      let image = frame.querySelector(".eSubToolCollaboratorPicture");
      if (image.src != (collaborator.image ?? "./images/profiles/default.svg")) {
        image.src = (collaborator.image ?? "./images/profiles/default.svg");
      }
      image.style.display = "unset";
    }
    let info = frame.querySelector(".eSubToolCollaboratorInfo");
    info.style.color = editor.textColorBackground(collaborator.color);
    let name = info.querySelector("div[name]");
    name.textContent = collaborator.name;
    name.title = collaborator.name;
    if (collaborator.email != null) {
      let email = info.querySelector("div[email]");
      email.textContent = collaborator.email;
      email.title = collaborator.email;
      email.style.display = "unset";
    }
    holder.style.setProperty("--uiwidth", frame.closest(".eSelectBar").clientWidth + "px");
    
    let member;
    if (editor.getSelf().access > 3) {
      let memberIDs = Object.keys(editor.members);
      for (let i = 0; i < memberIDs.length; i++) {
        let memberCheck = editor.members[memberIDs[i]];
        if (memberCheck.modify == collaboratorID) {
          member = memberCheck;
          break;
        }
      }
    }
    let makeViewerButton = frame.querySelector(".largeButton");
    editor.updateMakeViewerButton = () => {
      if (member != null && member.access == 1) {
        makeViewerButton.setAttribute("member", member._id);
        makeViewerButton.style.removeProperty("display");
      } else {
        makeViewerButton.style.display = "none";
      }
      extra.updateActionUI();
    }
    makeViewerButton.addEventListener("click", async () => {
      makeViewerButton.setAttribute("disabled", "");
      let [code] = await sendRequest("PUT", "lessons/members/access?member=" + makeViewerButton.getAttribute("member"), { access: 0 }, { session: editor.session });
      makeViewerButton.removeAttribute("disabled");
      if (code == 200) {
        makeViewerButton.style.display = "none";
        extra.updateActionUI();
      }
    });
    editor.updateMakeViewerButton();
  }
};

modules["pages/editor/toolbar/reactions"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1765_4" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1765_4)"> <mask id="path-2-outside-1_1765_4" maskUnits="userSpaceOnUse" x="33" y="33.8643" width="190" height="190" fill="black"> <rect fill="white" x="33" y="33.8643" width="190" height="190"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M161.422 53.1009C151.092 48.4513 139.632 45.8643 127.569 45.8643C81.9673 45.8643 45 82.8316 45 128.433C45 174.035 81.9673 211.002 127.569 211.002C173.17 211.002 210.138 174.035 210.138 128.433C210.138 116.37 207.551 104.911 202.901 94.5807H199.404V111.094C199.404 120.215 192.01 127.608 182.89 127.608H177.936C168.815 127.608 161.422 120.215 161.422 111.094V94.5807H144.908C135.788 94.5807 128.394 87.1872 128.394 78.0669V73.1128C128.394 63.9925 135.788 56.599 144.908 56.599H161.422V53.1009Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M161.422 53.1009C151.092 48.4513 139.632 45.8643 127.569 45.8643C81.9673 45.8643 45 82.8316 45 128.433C45 174.035 81.9673 211.002 127.569 211.002C173.17 211.002 210.138 174.035 210.138 128.433C210.138 116.37 207.551 104.911 202.901 94.5807H199.404V111.094C199.404 120.215 192.01 127.608 182.89 127.608H177.936C168.815 127.608 161.422 120.215 161.422 111.094V94.5807H144.908C135.788 94.5807 128.394 87.1872 128.394 78.0669V73.1128C128.394 63.9925 135.788 56.599 144.908 56.599H161.422V53.1009Z" fill="white"/> <path d="M161.422 53.1009H173.422V45.3424L166.347 42.1581L161.422 53.1009ZM202.901 94.5807L213.844 89.6556L210.66 82.5807H202.901V94.5807ZM199.404 94.5807V82.5807H187.404V94.5807H199.404ZM161.422 94.5807H173.422V82.5807H161.422V94.5807ZM161.422 56.599V68.599H173.422V56.599H161.422ZM166.347 42.1581C154.499 36.8254 141.363 33.8643 127.569 33.8643V57.8643C137.901 57.8643 147.684 60.0772 156.497 64.0436L166.347 42.1581ZM127.569 33.8643C75.3399 33.8643 33 76.2042 33 128.433H57C57 89.459 88.5947 57.8643 127.569 57.8643V33.8643ZM33 128.433C33 180.662 75.3399 223.002 127.569 223.002V199.002C88.5947 199.002 57 167.407 57 128.433H33ZM127.569 223.002C179.798 223.002 222.138 180.662 222.138 128.433H198.138C198.138 167.407 166.543 199.002 127.569 199.002V223.002ZM222.138 128.433C222.138 114.639 219.177 101.504 213.844 89.6556L191.959 99.5057C195.925 108.318 198.138 118.101 198.138 128.433H222.138ZM202.901 82.5807H199.404V106.581H202.901V82.5807ZM187.404 94.5807V111.094H211.404V94.5807H187.404ZM187.404 111.094C187.404 113.587 185.383 115.608 182.89 115.608V139.608C198.638 139.608 211.404 126.842 211.404 111.094H187.404ZM182.89 115.608H177.936V139.608H182.89V115.608ZM177.936 115.608C175.443 115.608 173.422 113.587 173.422 111.094H149.422C149.422 126.842 162.188 139.608 177.936 139.608V115.608ZM173.422 111.094V94.5807H149.422V111.094H173.422ZM161.422 82.5807H144.908V106.581H161.422V82.5807ZM144.908 82.5807C142.415 82.5807 140.394 80.5598 140.394 78.0669H116.394C116.394 93.8146 129.16 106.581 144.908 106.581V82.5807ZM140.394 78.0669V73.1128H116.394V78.0669H140.394ZM140.394 73.1128C140.394 70.6199 142.415 68.599 144.908 68.599V44.599C129.16 44.599 116.394 57.365 116.394 73.1128H140.394ZM144.908 68.599H161.422V44.599H144.908V68.599ZM173.422 56.599V53.1009H149.422V56.599H173.422Z" fill="white" mask="url(#path-2-outside-1_1765_4)"/> <rect x="162.854" y="25" width="35.1193" height="101.174" rx="14.2569" fill="white" stroke="white" stroke-width="12"/> <rect x="129.826" y="58.0273" width="101.174" height="35.1193" rx="14.2569" fill="white" stroke="white" stroke-width="12"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M161.422 53.1009C151.092 48.4513 139.632 45.8643 127.569 45.8643C81.9673 45.8643 45 82.8316 45 128.433C45 174.035 81.9673 211.002 127.569 211.002C173.17 211.002 210.138 174.035 210.138 128.433C210.138 116.37 207.551 104.911 202.901 94.5807H199.404V111.094C199.404 116.193 197.093 120.751 193.463 123.78C193.569 125.317 193.624 126.869 193.624 128.433C193.624 164.914 164.05 194.488 127.569 194.488C91.0876 194.488 61.5138 164.914 61.5138 128.433C61.5138 91.9519 91.0876 62.378 127.569 62.378C129.133 62.378 130.685 62.4324 132.223 62.5394C135.252 58.909 139.81 56.599 144.908 56.599H161.422V53.1009Z" fill="#2F2F2F"/> <path d="M87.936 149.074V149.074C109.825 170.963 145.313 170.963 167.202 149.074V149.074" stroke="#2F2F2F" stroke-width="16" stroke-linecap="round"/> <circle cx="105.275" cy="107.788" r="9.90826" fill="#2F2F2F"/> <circle cx="149.862" cy="107.788" r="9.90826" fill="#2F2F2F"/> <rect x="168.854" y="31" width="23.1193" height="89.1743" rx="8.25688" fill="#2F2F2F"/> <rect x="135.826" y="64.0273" width="89.1743" height="23.1193" rx="8.25688" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Reactions";
  reRender = false;
  showOnLock = true;
  setButton = async function (editor, button, extra) {
    let cursorModule = this.parent.cursor;
    this.hidden = false;
    let selectKeys = Object.keys(editor.selecting);
    if (selectKeys.length > 1) {
      button.style.display = "none";
      button.removeAttribute("loaded");
      if (this.hidden == false) {
        this.hidden = true;
        cursorModule.updateActionUI();
      }
      return;
    }
    let selectID = selectKeys[0];
    let runReactionRequest = async () => {
      selectKeys = Object.keys(editor.selecting);
      if (selectKeys.length > 1) {
        button.style.display = "none";
        button.removeAttribute("loaded");
        if (this.hidden == false) {
          this.hidden = true;
          cursorModule.updateActionUI();
        }
        return;
      }
      selectID = selectKeys[0];
      let reactions = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"] div[reactions]');
      if (reactions != null && reactions.childElementCount < 2) {
        if (button.hasAttribute("selected") == true) {
          //let frame = button.closest(".eSelectBar");
          //button.removeAttribute("selected");
          //frame.querySelector(".eActionContainerContent").innerHTML = "";
          //frame.querySelector(".eActionContainer").removeAttribute("module");
          await cursorModule.clickAction({ target: button });
        }
        button.style.display = "none";
        button.removeAttribute("loaded");
        button.setAttribute("disabled", "");
        if (this.hidden == false) {
          this.hidden = true;
          cursorModule.updateActionUI();
        }
        //cursorModule.redrawActionUI(true);
        return;
      }
      if (button.hasAttribute("loaded") == true) {
        return;
      }
      button.setAttribute("loaded", "");
      button.style.display = "unset";
      if (this.hidden == true) {
        this.hidden = false;
        cursorModule.updateActionUI();
      }
      this.reactionCache = {};
      this.memberCache = {};
      let [code, body] = await sendRequest("GET", "lessons/members/reaction/members?annotation=" + selectID, null, { session: editor.session });
      if (code == 200 && this.currentSelect == selectID) {
        for (let i = 0; i < body.reactions.length; i++) {
          let reaction = body.reactions[i];
          let reactID = reaction._id.split("_");
          this.reactionCache[reactID[1]] = this.reactionCache[reactID[1]] ?? {};
          this.reactionCache[reactID[1]][reaction._id] = reaction.added;
        }
        if (body.members != null) {
          this.memberCache = { ...this.memberCache, ...getObject(body.members, "_id") };
        }
      } else {
        return;
      }
      button.removeAttribute("disabled");
    }
    editor.newReactionUpdate = (body) => {
      selectKeys = Object.keys(editor.selecting);
      selectID = selectKeys[0];
      this.currentSelect = selectID;
      let selectBar = editor.page.querySelector(".eSelectBar");
      button = selectBar.querySelector('.eTool[action="pages/editor/toolbar/reactions"]');
      let frame = selectBar.querySelector('.eActionContainer[module="pages/editor/toolbar/reactions"]');
      runReactionRequest();
      if (this.reactionCache == null) {
        return;
      }
      this.reactionCache[body.reaction.emoji] = this.reactionCache[body.reaction.emoji] ?? {};
      let cache = this.reactionCache[body.reaction.emoji];
      let reactID;
      if (body.member != null) {
        reactID = body.reaction.annotation + "_" + body.reaction.emoji + "_" + body.member._id;
      }
      if (body.change > 0) {
        cache[reactID] = body.added;
        this.memberCache[body.member._id] = body.member;
        if (frame != null) {
          let emojiButton = frame.querySelector(".eSubToolReactionSidebar").querySelector('button[emoji="' + body.reaction.emoji + '"]');
          if (emojiButton == null) {
            this.insertReactionButton(body.reaction.emoji);
          } else if (emojiButton.hasAttribute("selected") == true) {
            this.insertReactionMember(body.member._id, body.added);
          }
          this.updateActionUI();
        }
        button.removeAttribute("disabled");
        cursorModule.redrawActionUI(true);
      } else if (body.change < 0) {
        delete cache[reactID];
        if (frame != null) {
          let emojiButton = frame.querySelector('button[emoji="' + body.reaction.emoji + '"]');
          if (emojiButton.hasAttribute("selected") == true) {
            if (body.member._id != null) {
              let emojiMemberSection = frame.querySelector('.eSubToolReactionMember[collaborator="' + body.member._id + '"]');
              if (emojiMemberSection != null) {
                emojiMemberSection.remove();
              }
            } else {
              this.annoymousCount--;
              let titleCount = frame.querySelector(".eSubToolReactionTempShow");
              if (this.annoymousCount > 0) {
                let addS = "";
                if (this.annoymousCount > 1) {
                  addS = "s";
                }
                titleCount.querySelector("div[titlecount]").innerHTML = `<b>+${this.annoymousCount}</b> Additional Reaction${addS}`;
                titleCount.style.display = "flex";
              } else {
                titleCount.style.display = "none";
              }
            }
            this.updateActionUI();
          }
        }
      } else if (body.change == null) {
        cache = {};
      }
      if (Object.keys(cache).length < 1) {
        delete this.reactionCache[body.reaction.emoji];
        if (frame != null) {
          let emojiButtonSidebar = frame.querySelector(".eSubToolReactionSidebar");
          let emojiButton = emojiButtonSidebar.querySelector('button[emoji="' + body.reaction.emoji + '"]');
          emojiButton.remove();
          if (emojiButton.hasAttribute("selected") == true && emojiButtonSidebar.firstElementChild != null) {
            emojiButtonSidebar.firstElementChild.setAttribute("selected", "");
            this.updateReactionView();
          }
        }
      }
    }
    if (this.currentSelect == selectID) {
      runReactionRequest();
      return;
    }
    button.setAttribute("disabled", "");
    this.currentSelect = selectID;
    await runReactionRequest();
  }
  html = `
  <div class="eSubToolReactionHolder">
    <div class="eSubToolReactionSidebar"></div>
    <div class="eSubToolReactionMembers">
      <div class="eSubToolReactionMemberTitle">
        <div title></div>
        <button remove title="Remove this reaction from the sticky note."><img src="./images/editor/file/delete.svg"></button>
      </div>
      <div class="eSubToolReactionMemberSection"></div>
    </div>
  </div>
  `;
  css = {
    ".eSubToolReactionHolder": `display: flex; width: max-content; max-width: 100%; max-height: fit-content`,
    ".eSubToolReactionSidebar": `display: flex; flex-direction: column; width: 38px; min-width: 38px; max-height: 238px; padding: 6px; gap: 6px; border-right: solid 4px var(--theme); overflow: auto; scrollbar-width: none`,
    ".eSubToolReactionSidebar::-webkit-scrollbar": `display: none`,
    ".eSubToolReactionSidebar button": `display: flex; width: 38px; height: 38px; min-height: 38px; justify-content: center; align-items: center; border-radius: 10px`,
    ".eSubToolReactionSidebar button:hover": `background: var(--hover)`,
    ".eSubToolReactionSidebar button[selected]": `background: var(--theme) !important`,
    ".eSubToolReactionSidebar button img": `width: 32px; height: 32px; transform: scale(.95); object-fit: none; filter: drop-shadow(0px 0px 8px var(--pageColor));`,
    ".eSubToolReactionMembers": `max-width: 100%; max-height: 250px; overflow: auto`,
    ".eSubToolReactionMemberTitle": `position: sticky; display: flex; width: 100%; top: 0px; background: var(--theme); justify-content: space-between; align-items: center`,
    ".eSubToolReactionMemberTitle div[title]": `width: 100%; margin: 8px; font-size: 18px; font-weight: 600; color: #fff; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolReactionMemberTitle button": `display: none; width: 32px; height: 32px; margin: 6px; background: var(--pageColor); color: #fff; border-radius: 10px; justify-content: center; align-items: center`,
    ".eSubToolReactionMemberTitle button img": `width: 22px; height: 22px`,
    ".eSubToolReactionMemberSection": `display: flex; flex-direction: column; min-height: 163px; height: calc(100% - 44px)`,
    ".eSubToolReactionMember": `display: flex; padding: 4px; align-items: center`,
    //".eSubToolReactionMember:not(:first-child)": `border-top: solid 2px var(--hover)`,
    ".eSubToolReactionMember div[cursor]": `width: 22px; min-width: 22px; height: 22px; margin: 3px; background: var(--pageColor); border-radius: 10px 18px 18px`,
    ".eSubToolReactionMember div[holder]": `display: flex; width: calc(100% - 26px); white-space: nowrap; overflow: hidden; justify-content: space-between`,
    ".eSubToolReactionMember div[holder] div[name]": `display: inline; margin: 0 12px 0 6px; font-size: 16px; font-weight: 600`,
    ".eSubToolReactionMember div[holder] div[email]": `display: inline; font-size: 16px; font-weight: 500`,
    ".eSubToolReactionTempShow": `display: none; flex-direction: column; width: calc(100% - 24px); padding: 12px; margin-top: auto; align-items: center`,
    ".eSubToolReactionTempShow div[titlecount]": `font-size: 20px; font-weight: 600`,
    ".eSubToolReactionTempShow div[titlecount] b": `font-weight: 700; color: var(--theme)`,
    ".eSubToolReactionTempShow div[info]": `max-width: 297px; margin-top: 6px; font-size: 14px; font-weight: 500`,
    ".eSubToolReactionTempShow div[info] a": `display: none; color: var(--theme); font-size: 16px; font-weight: 700; line-height: 30px`
  };
  js = async function (frame, toolID, extra) {
    this.updateActionUI = extra.updateActionUI;
    let button = extra.frame.querySelector('.eTool[action="pages/editor/toolbar/reactions"]');
    if (this.reactionCache == null) {
      extra.module.clickAction({ target: button });
      return;
    }

    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;

    let emojiModule = await this.loadModule("dropdowns/editor/tools/emojis");
    if (emojiModule == null) {
      extra.module.clickAction({ target: button });
      return;
    }
    emojiModule.createEmojiObject();

    let emojiButtonSidebar = frame.querySelector(".eSubToolReactionSidebar");
    let emojiMemberSection = frame.querySelector(".eSubToolReactionMemberSection");
    let removeReactionButton = frame.querySelector(".eSubToolReactionMemberTitle button[remove]");

    removeReactionButton.addEventListener("click", async () => {
      removeReactionButton.setAttribute("disabled", "");
      await sendRequest("DELETE", "lessons/members/reaction/delete?annotation=" + this.currentSelect + "&emoji=" + emojiButtonSidebar.querySelector("button[selected]").getAttribute("emoji").replace(/ /g, "_"), null, { session: editor.session });
      removeReactionButton.removeAttribute("disabled");
    });

    this.insertReactionButton = (emojiName) => {
      if (emojiButtonSidebar.querySelector('.eSubToolReaction[emoji="' + emojiName + '"]') != null) {
        return;
      }
      let emoji = emojiModule.emojiObject[emojiName];
      emojiButtonSidebar.insertAdjacentHTML("afterbegin", `<button emoji="${emojiName}" title="${emoji.short_name.replace(/_/g, " ")}"><img src="./images/editor/emojis/twitter32.png" style="object-position: ${-((emoji.sheet_x * emojiModule.sheetSize) + 1)}px ${-((emoji.sheet_y * emojiModule.sheetSize) + 1)}px"></button>`);
    }

    let reactionKeys = Object.keys(this.reactionCache);
    for (let i = 0; i < reactionKeys.length; i++) {
      this.insertReactionButton(reactionKeys[i]);
    }
    emojiButtonSidebar.firstElementChild.setAttribute("selected", "");

    this.annoymousCount = 0;
    let largestOrder = 0;
    this.insertReactionMember = (userid, added) => {
      let member = this.memberCache[userid];
      let tempSection = emojiMemberSection.querySelector(".eSubToolReactionTempShow");
      if (member == null) {
        this.annoymousCount++;
        tempSection.style.display = "flex";
        let addS = "";
        if (this.annoymousCount > 1) {
          addS = "s";
        }
        tempSection.querySelector("div[titlecount]").innerHTML = `<b>+${this.annoymousCount}</b> Additional Reaction${addS}`;
        return;
      }
      emojiMemberSection.insertAdjacentHTML("afterbegin", `<div class="eSubToolReactionMember" new>
        <div cursor></div>
        <div holder>
          <div name></div>
          <div email></div>
        </div>
      </div>`);
      let newMemberTile = emojiMemberSection.querySelector(".eSubToolReactionMember[new]");
      newMemberTile.removeAttribute("new");
      newMemberTile.setAttribute("collaborator", userid);
      newMemberTile.querySelector("div[cursor]").style.border = "solid 3px " + member.color;
      let name = newMemberTile.querySelector("div[name]");
      name.textContent = member.name;
      name.title = member.name;
      if (member.email != null) {
        let email = newMemberTile.querySelector("div[email]");
        email.textContent = member.email;
        email.title = member.email;
      }
      let order = Math.round(((added ?? getEpoch()) / 2000000000000) * 2147483647);
      if (order > largestOrder) {
        largestOrder = order + 1;
        tempSection.style.order = order;
      }
      newMemberTile.style.order = order;
    }
    this.updateReactionView = () => {
      let selected = emojiButtonSidebar.querySelector("button[selected]");
      if (selected == null) {
        return;
      }
      let emoji = selected.getAttribute("emoji");
      let title = emojiModule.emojiObject[emoji].short_name.split("_");
      for (let i = 0; i < title.length; i++) {
        title[i] = title[i].substring(0, 1).toUpperCase() + title[i].substring(1);
      }
      frame.querySelector(".eSubToolReactionMemberTitle div[title]").textContent = title.join(" ");
      this.annoymousCount = 0;
      largestOrder = 0;
      emojiMemberSection.innerHTML = `<div class="eSubToolReactionTempShow">
        <div titlecount></div>
        <div info>To save storage space, Markify may loose track of who reacted!</div>
      </div>`;
      /*let openDropdown = emojiMemberSection.querySelector(".eSubToolReactionTempShow a");
      openDropdown.addEventListener("click", async () => {
        await sleep(1);
        dropdownModule.open(editor.page.querySelector(".eShare"), "dropdowns/editor/share/options");
      });
      if (editor.getSelf().access > 3) {
        openDropdown.style.display = "unset";
        removeReactionButton.style.display = "flex";
      }*/
      if (editor.getSelf().access > 3 && extra.frame.querySelector(".eSelectHolder").hasAttribute("locked") == false) {
        removeReactionButton.style.display = "flex";
      }
      let reactionMembers = this.reactionCache[emoji];
      let reactionMembersKeys = Object.keys(reactionMembers);
      for (let i = 0; i < reactionMembersKeys.length; i++) {
        this.insertReactionMember(reactionMembersKeys[i].split("_")[2], reactionMembers[reactionMembersKeys[i]]);
      }
      this.updateActionUI();
    }
    emojiButtonSidebar.addEventListener("click", (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let button = target.closest("button");
      if (button == null) {
        return;
      }
      let selected = emojiButtonSidebar.querySelector("button[selected]");
      if (selected != null) {
        selected.removeAttribute("selected");
      }
      button.setAttribute("selected", "");
      this.updateReactionView();
    });
    this.updateReactionView();
  }
};

// Textbox Functions
modules["pages/editor/toolbar/textedit"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_800_56" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_800_56)"> <rect x="111" y="47" width="34" height="162" rx="17" stroke="white" stroke-width="12"/> <path d="M128 211.485L131.536 215.021C134.724 218.209 139.048 220 143.556 220H177C186.389 220 194 212.389 194 203C194 193.611 186.389 186 177 186H128H79C69.6112 186 62 193.611 62 203C62 212.389 69.6112 220 79 220H112.444C116.952 220 121.276 218.209 124.464 215.021L128 211.485Z" stroke="white" stroke-width="12"/> <path d="M128 44.5147L131.536 40.9792C134.724 37.7911 139.048 36 143.556 36H177C186.389 36 194 43.6112 194 53C194 62.3888 186.389 70 177 70H128H79C69.6112 70 62 62.3888 62 53C62 43.6112 69.6112 36 79 36H112.444C116.952 36 121.276 37.7911 124.464 40.9792L128 44.5147Z" stroke="white" stroke-width="12"/> <rect x="117" y="53" width="22" height="150" rx="11" fill="#2F2F2F"/> <path d="M68 203C68 196.925 72.9249 192 79 192H128H177C183.075 192 188 196.925 188 203V203C188 209.075 183.075 214 177 214H143.556C140.639 214 137.841 212.841 135.778 210.778L128 203L120.222 210.778C118.159 212.841 115.361 214 112.444 214H79C72.9249 214 68 209.075 68 203V203Z" fill="#2F2F2F"/> <path d="M68 53C68 59.0751 72.9249 64 79 64H128H177C183.075 64 188 59.0751 188 53V53C188 46.9249 183.075 42 177 42H143.556C140.639 42 137.841 43.1589 135.778 45.2218L128 53L120.222 45.2218C118.159 43.1589 115.361 42 112.444 42H79C72.9249 42 68 46.9249 68 53V53Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Edit Text";
  divideAfter = true;
  multiSelect = false;
  setButton = function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let annoTx = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"] div[contenteditable]');
    if (annoTx == null) {
      button.removeAttribute("selecthighlight");
    } else {
      if (button.parentElement.hasAttribute("locked") == true) {
        annoTx.removeAttribute("contenteditable");
      }
      button.setAttribute("selecthighlight", "");
    }
  }
  pastEvents = [];
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};

    if (original.lock == true) {
      return;
    }

    let annoElem = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"]');
    if (annoElem == null) {
      return;
    }
    let annoTx = annoElem.querySelector("div[edit]");
    if (annoTx == null) {
      return;
    }

    if (annoTx.hasAttribute("contenteditable") == false) {
      let scrollLeft = annoElem.scrollLeft ?? 0;
      let scrollTop = annoElem.scrollTop ?? 0;
      annoTx.setAttribute("contenteditable", "true");
      annoTx.focus();
      if (scrollLeft > 0 || scrollTop > 0) {
        annoElem.scrollTo(scrollLeft, scrollTop);
      }

      if (extra.setCaretPosition != true || document.caretRangeFromPoint == null) {
        if (window.getSelection && document.createRange) {
          let range = document.createRange();
          range.selectNodeContents(annoTx);
          let sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.body.createTextRange) {
          let range = document.body.createTextRange();
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

    let saveHistory = true;
    //let lastClock;
    let lastCaret = {};
    let setLastCaret = (position, offset) => {
      if (window.getSelection != null) {
        let textBox = window.getSelection().baseNode.parentElement.closest("div[edit]");
        if (textBox != null) {
          lastCaret[position + "Element"] = textBox;
          lastCaret[position + "Position"] = utils.getCurrentCaretPosition(textBox);
        }
      }
    }
    let inputListener = async (event) => {
      selectID = Object.keys(editor.selecting)[0];
      original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};

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
      editor.selecting[selectID].d = editor.selecting[selectID].d ?? JSON.parse(JSON.stringify(original.d ?? {}));
      editor.selecting[selectID].d.b = addText;
      saveObj.d.b = addText;
      if (original.f == "sticky") {
        saveObj.sig = editor.getSelf().name;
      }
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
      await extra.saveSelecting(saveObj, true, saveHistory, lastCaret);
      if (saveHistory == true) {
        let lastHistory = utils.history[utils.location];
        if (lastHistory != null) {
          lastHistory.caret = lastHistory.caret ?? {};
          lastHistory.caret.undoElement = lastCaret.undoElement;
          lastHistory.caret.undoPosition = lastCaret.undoPosition;
        }
      }
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

    let keydownListener = (event) => {
      if (event != null && [" ", "Enter", "Backspace"].includes(event.key) == true) {
        setLastCaret("undo");
      }
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "keydown", listener: keydownListener });
    annoTx.addEventListener("keydown", keydownListener);

    let keyupListener = async () => {
      let lastHistory = utils.history[utils.location];
      if (lastHistory != null) {
        lastHistory.caret = lastHistory.caret ?? {};
        setLastCaret("redo");
        lastHistory.caret.redoElement = lastCaret.redoElement;
        lastHistory.caret.redoPosition = lastCaret.redoPosition;
      }
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "keyup", listener: keyupListener });
    annoTx.addEventListener("keyup", keyupListener);

    let pasteListener = (event) => {
      // Cancel paste
      event.preventDefault();

      // Insert text manually
      document.execCommand("insertHTML", false, (event.originalEvent ?? event).clipboardData.getData("text/plain")); //.replace(/\n\n/g, "</br>")
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "paste", listener: pasteListener });
    annoTx.addEventListener("paste", pasteListener);

    extra.updateToolActions(extra.frame);
  }
};

// Embed Functions
modules["pages/editor/toolbar/setembed"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_800_56" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_800_56)"> <rect x="111" y="47" width="34" height="162" rx="17" stroke="white" stroke-width="12"/> <path d="M128 211.485L131.536 215.021C134.724 218.209 139.048 220 143.556 220H177C186.389 220 194 212.389 194 203C194 193.611 186.389 186 177 186H128H79C69.6112 186 62 193.611 62 203C62 212.389 69.6112 220 79 220H112.444C116.952 220 121.276 218.209 124.464 215.021L128 211.485Z" stroke="white" stroke-width="12"/> <path d="M128 44.5147L131.536 40.9792C134.724 37.7911 139.048 36 143.556 36H177C186.389 36 194 43.6112 194 53C194 62.3888 186.389 70 177 70H128H79C69.6112 70 62 62.3888 62 53C62 43.6112 69.6112 36 79 36H112.444C116.952 36 121.276 37.7911 124.464 40.9792L128 44.5147Z" stroke="white" stroke-width="12"/> <rect x="117" y="53" width="22" height="150" rx="11" fill="#2F2F2F"/> <path d="M68 203C68 196.925 72.9249 192 79 192H128H177C183.075 192 188 196.925 188 203V203C188 209.075 183.075 214 177 214H143.556C140.639 214 137.841 212.841 135.778 210.778L128 203L120.222 210.778C118.159 212.841 115.361 214 112.444 214H79C72.9249 214 68 209.075 68 203V203Z" fill="#2F2F2F"/> <path d="M68 53C68 59.0751 72.9249 64 79 64H128H177C183.075 64 188 59.0751 188 53V53C188 46.9249 183.075 42 177 42H143.556C140.639 42 137.841 43.1589 135.778 45.2218L128 53L120.222 45.2218C118.159 43.1589 115.361 42 112.444 42H79C72.9249 42 68 46.9249 68 53V53Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Set Link";
  multiSelect = false;
  setButton = function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let inputText = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"] input');
    if (document.activeElement != inputText) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  }
  pastEvents = [];
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    
    if (original.lock == true) {
      return;
    }

    let annoElem = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"]');
    if (annoElem == null) {
      return;
    }
    let detailsHolder = annoElem.querySelector("div[details]");
    if (detailsHolder == null) {
      return;
    }

    let linkInputHolder = detailsHolder.querySelector("div[input]");
    let infoHolder = detailsHolder.querySelector("div[info]");

    if (linkInputHolder.hasAttribute("visible") == true && original.embed != null && original.d != null) {
      linkInputHolder.removeAttribute("visible");
      infoHolder.style.removeProperty("display");
      return;
    }

    linkInputHolder.removeAttribute("disabled");

    let annoTx = linkInputHolder.querySelector("input");
    if (annoTx.parentElement.hasAttribute("disabled") == true) {
      return;
    }

    if (document.activeElement != annoTx) {
      linkInputHolder.setAttribute("visible", "");
      infoHolder.style.display = "none";
      await sleep();
      annoTx.select();
    }

    let updateEmbedSize = () => {
      let embedFrame = annoElem.querySelector("iframe");
      if (embedFrame != null) {
        let frameWidth = original.s[0] - 16;
        let defaultMaxWidth = 800;
        if (frameWidth < 300) {
          defaultMaxWidth = 300;
        }
        let embedWidth = Math.max(frameWidth, defaultMaxWidth);
        let scale = frameWidth / embedWidth;
        embedFrame.style.width = embedWidth + "px";
        embedFrame.style.height = ((original.s[1] - 24 - detailsHolder.offsetHeight) * (1 / scale)) + "px";
        embedFrame.style.transform = "scale(" + scale + ")";
      }
    }

    for (let i = 0; i < this.pastEvents.length; i++) {
      let remEvent = this.pastEvents[i];
      remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
    }
    this.pastEvents = [];

    let finishListener = async () => {
      if (annoTx.value.startsWith("http://") == false && annoTx.value.startsWith("https://") == false) {
        annoTx.value = "https://" + annoTx.value;
      }
      if (isValidURL(annoTx.value) == false) {
        annoTx.select();
        alert.open("error", "<b>Invalid Link</b>That link is invalid, check it and try again.");
        return;
      }
      await extra.saveSelecting({ d: annoTx.value, embed: null }, true);
      if (connected == true) {
        linkInputHolder.setAttribute("disabled", "");
        utils.syncSave(true);
      }
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "change", listener: finishListener });
    annoTx.addEventListener("change", finishListener);

    let unselectListener = async () => {
      if (original.embed != null) {
        annoTx.blur();
        linkInputHolder.removeAttribute("visible");
        infoHolder.style.removeProperty("display");
        await sleep();
      }
      extra.updateToolActions(extra.frame);
      updateEmbedSize();
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "blur", listener: unselectListener });
    annoTx.addEventListener("blur", unselectListener);

    let selectListener = () => {
      extra.updateToolActions(extra.frame);
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "focus", listener: selectListener });
    annoTx.addEventListener("focus", selectListener);

    extra.updateToolActions(extra.frame);
    updateEmbedSize();
  }
};
modules["pages/editor/toolbar/openlink"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2337_3" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2337_3)"> <path d="M62.0313 194.114L194.554 61.5918" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M74.5537 61.5918H194.554" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M194.554 181.592V61.5918" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M62.0313 194.114L194.554 61.5918" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M74.5537 61.5918H194.554" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M194.554 181.592V61.5918" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> </g> </svg>`;
  tooltip = "Open Link";
  multiSelect = false;
  setButton = function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    if (preferenceTool.d != null) {
      button.style.display = "unset";
    } else {
      button.style.display = "none";
    }
  }
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    
    if (original.d != null) {
      window.open(original.d);
    }
  }
};
modules["pages/editor/toolbar/enlarge"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2337_30" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2337_30)"> <path d="M58 102V78C58 66.9543 66.9543 58 78 58H102" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M198 102V78C198 66.9543 189.046 58 178 58H154" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M58 154V178C58 189.046 66.9543 198 78 198H102" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M198 154V178C198 189.046 189.046 198 178 198H154" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M58 102V78C58 66.9543 66.9543 58 78 58H102" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M198 102V78C198 66.9543 189.046 58 178 58H154" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M58 154V178C58 189.046 66.9543 198 78 198H102" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M198 154V178C198 189.046 189.046 198 178 198H154" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> </g> </svg>`;
  tooltip = "Enlarge";
  multiSelect = false;
  setButton = function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    if (preferenceTool.embed != null && preferenceTool.embed.url != null) {
      button.style.display = "unset";
    } else {
      button.style.display = "none";
    }
  }
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let modal = await this.loadModule("modal");
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    modal.open("modals/editor/embed", extra.button, (original.embed ?? {}).title ?? (new URL(original.d)).hostname, false);
  }
};
modules["modals/editor/embed"] = class {
  html = `<div class="emFrame"><iframe allowfullscreen></iframe></div>`;
  css = {
    ".emFrame": `width: calc(100vw - 37px); height: calc(100vh - 77px); max-width: 1000px; max-height: 700px`,
    ".emFrame iframe": `position: absolute; left: 0px; top: 0px; width: 100% !important; height: 100% !important; transform: unset !important; background: var(--pageColor); border: none`
  };
  js = async function (frame, extra) {
    frame.closest(".modalContent").style.padding = "4px 0px 0px";
    let editor = await findModule(extra.button);
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    if (original.embed != null && original.embed.url != null) {
      frame.querySelector(".emFrame iframe").src = original.embed.url;
    }
    frame.closest(".fixedItemHolder").addEventListener("click", async () => {
      (await this.loadModule("modal")).close();
    });
    //let embedHolder = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"] div[content]');
    //let embedFrame = embedHolder.querySelector("iframe");
    //if (embedFrame != null) {
  }
}

// Page Functions
modules["pages/editor/toolbar/settitle"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_800_56" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_800_56)"> <rect x="111" y="47" width="34" height="162" rx="17" stroke="white" stroke-width="12"/> <path d="M128 211.485L131.536 215.021C134.724 218.209 139.048 220 143.556 220H177C186.389 220 194 212.389 194 203C194 193.611 186.389 186 177 186H128H79C69.6112 186 62 193.611 62 203C62 212.389 69.6112 220 79 220H112.444C116.952 220 121.276 218.209 124.464 215.021L128 211.485Z" stroke="white" stroke-width="12"/> <path d="M128 44.5147L131.536 40.9792C134.724 37.7911 139.048 36 143.556 36H177C186.389 36 194 43.6112 194 53C194 62.3888 186.389 70 177 70H128H79C69.6112 70 62 62.3888 62 53C62 43.6112 69.6112 36 79 36H112.444C116.952 36 121.276 37.7911 124.464 40.9792L128 44.5147Z" stroke="white" stroke-width="12"/> <rect x="117" y="53" width="22" height="150" rx="11" fill="#2F2F2F"/> <path d="M68 203C68 196.925 72.9249 192 79 192H128H177C183.075 192 188 196.925 188 203V203C188 209.075 183.075 214 177 214H143.556C140.639 214 137.841 212.841 135.778 210.778L128 203L120.222 210.778C118.159 212.841 115.361 214 112.444 214H79C72.9249 214 68 209.075 68 203V203Z" fill="#2F2F2F"/> <path d="M68 53C68 59.0751 72.9249 64 79 64H128H177C183.075 64 188 59.0751 188 53V53C188 46.9249 183.075 42 177 42H143.556C140.639 42 137.841 43.1589 135.778 45.2218L128 53L120.222 45.2218C118.159 43.1589 115.361 42 112.444 42H79C72.9249 42 68 46.9249 68 53V53Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Page Title";
  multiSelect = false;
  setButton = function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let annoTx = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"] div[title][contenteditable]');
    if (annoTx == null) {
      button.removeAttribute("selecthighlight");
    } else {
      if (button.parentElement.hasAttribute("locked") == true) {
        annoTx.removeAttribute("contenteditable");
      }
      button.setAttribute("selecthighlight", "");
    }
  }
  pastEvents = [];
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};

    if (original.lock == true) {
      return;
    }

    let annoElem = editor.page.querySelector('.eAnnotation[anno="' + selectID + '"]');
    if (annoElem == null) {
      return;
    }
    let annoTx = annoElem.querySelector("div[title]");
    if (annoTx == null) {
      return;
    }

    if (annoTx.hasAttribute("contenteditable") == false) {
      annoTx.style.display = "unset";
      annoTx.setAttribute("contenteditable", "true");

      if (extra.setCaretPosition != true || document.caretRangeFromPoint == null) {
        if (window.getSelection && document.createRange) {
          let range = document.createRange();
          range.selectNodeContents(annoTx);
          let sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.body.createTextRange) {
          let range = document.body.createTextRange();
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
      if (annoTx.textContent.length < 1) {
        annoTx.style.removeProperty("display");
      }
      annoTx.scrollTo(0, 0);
      annoTx.removeAttribute("contenteditable");
    }

    for (let i = 0; i < this.pastEvents.length; i++) {
      let remEvent = this.pastEvents[i];
      remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
    }
    this.pastEvents = [];

    let finishListener = () => {
      annoTx.textContent = annoTx.textContent.substring(0, 100);
      extra.saveSelecting({ title: cleanString(annoTx.textContent) }, true);
      if (annoTx.textContent.length < 1) {
        annoTx.style.removeProperty("display");
      }
      annoTx.scrollTo(0, 0);
      annoTx.removeAttribute("contenteditable");
      extra.updateToolActions(extra.frame);
      utils.clearSelection();
    };
    this.pastEvents.push({ type: "event", parent: annoTx, name: "blur", listener: finishListener });
    annoTx.addEventListener("blur", finishListener);

    let keyListener = (event) => {
      if (event != null && ["Enter"].includes(event.key) == true) {
        event.preventDefault();
        finishListener();
      }
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "keydown", listener: keyListener });
    annoTx.addEventListener("keydown", keyListener);

    let pasteListener = (event) => {
      // Cancel paste
      event.preventDefault();

      // Insert text manually
      document.execCommand("insertHTML", false, (event.originalEvent ?? event).clipboardData.getData("text/plain")); //.replace(/\n\n/g, "</br>")
    }
    this.pastEvents.push({ type: "event", parent: annoTx, name: "paste", listener: pasteListener });
    annoTx.addEventListener("paste", pasteListener);

    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/uploadpage"] = class {
  button = ``;
  //tooltip: "Upload PDF",
  //multiSelect: false,
  setButton = function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    if (selectKeys.length == 1 && preferenceTool.source == null) {
      button.querySelector("div").innerHTML = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2387_72" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2387_72)"> <path d="M56 145V165C56 181.569 69.4315 195 86 195H171C187.569 195 201 181.569 201 165V145" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M128 60V156" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M128 60L164 96" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M128 60L92 96" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M56 145V165C56 181.569 69.4315 195 86 195H171C187.569 195 201 181.569 201 165V145" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M128 60V156" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M128 60L164 96" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M128 60L92 96" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> </g> </svg>`;
      button.setAttribute("tooltip", "Upload PDF");
      this.mode = "upload";
    } else {
      button.querySelector("div").innerHTML = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2527_10" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2527_10)"> <path d="M163 128L93 128" stroke="white" stroke-width="44" stroke-linecap="square"/> <circle cx="128" cy="128" r="75" stroke="white" stroke-width="44"/> <circle cx="128" cy="128" r="75" stroke="#2F2F2F" stroke-width="20"/> <path d="M163 128L93 128" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> </g> </svg>`,
      button.setAttribute("tooltip", "Remove PDF");
      this.mode = "remove";
    }
  }
  maxFileSize = (500 * 10 * 1024 * 1024) + 1; // 5 GB File Limit // Will be 10 MB per page
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let utils = editor.utils;
    let alertModule = await this.loadModule("alert");
    
    if (this.mode == "remove") {
      await extra.saveSelecting({ source: null, number: null, rotation: null }, true);
      extra.updateToolActions(extra.frame);
      return;
    }

    if (Object.keys(editor.selecting)[0].startsWith("pending_") == true) {
      await utils.syncSave(true);
    }

    let input = extra.frame.querySelector(".eSubToolUploadPageInput");
    if (input == null) {
      extra.frame.querySelector(".eSelectHolder").insertAdjacentHTML("beforeend", `<input class="eSubToolUploadPageInput" type="file" accept="application/pdf" multiple="true" hidden="true">`);
      input = extra.frame.querySelector(".eSubToolUploadPageInput");
    }
    let processUpload = async (files, event) => {
      event.preventDefault();
      if (files == null) {
        return;
      }
      let selectID = Object.keys(editor.selecting)[0];
      if (selectID.startsWith("pending_") == true) {
        return;
      }
      if (files.length > 50) {
        return alertModule.open("warning", "<b>File Overload</b>Woah their! Markify only supports bulk uploads of up to 50 files at once.", { time: 10 });
      }
      let sendFormData = new FormData();
      let fileSize = 0;
      let passedFiles = 0;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.kind == "file") {
          file = file.getAsFile();
        }
        if (file.kind != "string") {
          if (file.type == "application/pdf") {
            fileSize += file.size;
            if (fileSize > this.maxFileSize) {
              return alertModule.open("error", "<b>Exceeded Size Limit</b><div>Lessons are limited to a max size of <u>3 GB</u> total</div>", { time: 10 });
              //passedFile = false;
              //break;
            }
            sendFormData.append("file" + i, file);
            passedFiles++;
            /*
            if (file.size < this.maxFileSize) {
              sendFormData.append("file" + i, file);
              passedFile = true;
            } else {
              alertModule.open("warning", "<b>" + file.name + " Failed to Upload</b>Files are limited to a max size of 50 MB", { time: 10 });
            }
            */
          } else {
            alertModule.open("warning", "<b>" + file.name + " Failed to Upload</b>Only PDF files are currently supported", { time: 10 });
          }
        }
      }
      input.value = "";
      if (passedFiles > 0) {
        extra.button.setAttribute("disabled", "");
        let uploadAlert = await alertModule.open("info", `<b>Uploading Documents</b>Uploading your PDF${addS(passedFiles)} and inserting into the lesson!`, { time: "never" });
        let [code, body] = await sendRequest("POST", "lessons/save/file?annotation=" + selectID, sendFormData, { session: editor.session, noFileType: true });
        alertModule.close(uploadAlert);
        extra.button.removeAttribute("disabled");
        if (code == 200) {
          if (body.saves != null) {
            for (let i = 0; i < body.saves.length; i++) {
              let save = body.saves[i];
              await utils.save(save, null, save.sync ?? getEpoch());
              editor.selecting[save._id] = editor.selecting[save._id] ?? {};
            }
            extra.module.updateBox();
          }
          if (body.historyUpdate != null) {
            utils.pushHistory("update", body.historyUpdate);
          }
          if (body.historyAdd != null) {
            utils.pushHistory("remove", body.historyAdd);
          }
        }
      }
    }
    input.addEventListener("change", (event) => {
      processUpload(event.target.files, event);
    });
    input.click();
  }
};
modules["pages/editor/toolbar/resize"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2384_8" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2384_8)"> <rect x="50" y="49" width="157" height="157" rx="36" stroke="white" stroke-width="32"/> <rect x="72" y="71" width="113" height="113" rx="14" stroke="white" stroke-width="12"/> <rect x="56" y="55" width="145" height="145" rx="30" stroke="#2F2F2F" stroke-width="20"/> <path d="M140 84H172" stroke="white" stroke-width="24" stroke-linecap="round"/> <path d="M172 116.5L172 84.5" stroke="white" stroke-width="24" stroke-linecap="round"/> <path d="M117 171H85" stroke="white" stroke-width="24" stroke-linecap="round"/> <path d="M85 138.5L85 170.5" stroke="white" stroke-width="24" stroke-linecap="round"/> <path d="M85 171L172 84" stroke="white" stroke-width="24" stroke-linecap="round"/> <path d="M135 121L172 84" stroke="#2F2F2F" stroke-width="12" stroke-linecap="round"/> <path d="M140 84H172" stroke="#2F2F2F" stroke-width="12" stroke-linecap="round"/> <path d="M172 116.5L172 84.5" stroke="#2F2F2F" stroke-width="12" stroke-linecap="round"/> <path d="M122 134L85 171" stroke="#2F2F2F" stroke-width="12" stroke-linecap="round"/> <path d="M117 171H85" stroke="#2F2F2F" stroke-width="12" stroke-linecap="round"/> <path d="M85 138.5L85 170.5" stroke="#2F2F2F" stroke-width="12" stroke-linecap="round"/> </g> </svg>`;
  tooltip = "Resize";
  divideAfter = true;
  html = `
  <div class="eSubToolResizeHolder">
    <div class="eSubToolResizeSizeHolder">
      <button class="border" width="816" height="1056"><div class="eSubToolResizeSizeTitle">Letter</div><div class="eSubToolResizeSizeInfo">8.5" x 11"</div></button>
      <button class="border" width="1056" height="1632"><div class="eSubToolResizeSizeTitle">Tabloid</div><div class="eSubToolResizeSizeInfo">11" x 17"</div></button>
      <button class="border" width="559.68" height="793.92"><div class="eSubToolResizeSizeTitle">A5</div><div class="eSubToolResizeSizeInfo">5.8" x 8.3"</div></button>
      <button class="border" width="793.92" height="1122.24"><div class="eSubToolResizeSizeTitle">A4</div><div class="eSubToolResizeSizeInfo">8.3" x 11.7"</div></button>
      <button class="border" width="1122.24" height="1587.84"><div class="eSubToolResizeSizeTitle">A3</div><div class="eSubToolResizeSizeInfo">11.7" x 16.5"</div></button>
      <button class="border" width="665.28" height="944.64"><div class="eSubToolResizeSizeTitle">B5</div><div class="eSubToolResizeSizeInfo">6.9" x 9.8"</div></button>
      <button class="border" width="944.64" height="1334.4"><div class="eSubToolResizeSizeTitle">B4</div><div class="eSubToolResizeSizeInfo">9.8" x 13.9"</div></button>
      <button class="border" width="960" height="720"><div class="eSubToolResizeSizeTitle">4:3</div><div class="eSubToolResizeSizeInfo">10" x 7.5"</div></button>
      <button class="border" width="960" height="1706.67"><div class="eSubToolResizeSizeTitle">16:9</div><div class="eSubToolResizeSizeInfo">10" x 17.8"</div></button>
    </div>
    <div class="eSubToolResizeCustomSizeHolder">
      <div class="eSubToolResizeNumberHolder" width><b>Width</b><div max="50" contenteditable></div>in</div>
      <div class="eSubToolResizeNumberHolder" height><b>Height</b><div max="50" contenteditable></div>in</div>
    </div>
  </div>
  `;
  css = {
    ".eSubToolResizeHolder": `box-sizing: border-box; max-width: 100%; padding: 6px`,
    ".eSubToolResizeSizeHolder": `display: flex; flex-wrap: wrap; width: 336px; max-width: 100%; justify-content: center`,
    ".eSubToolResizeSizeHolder button": `box-sizing: border-box; display: flex; flex-direction: column; width: 100px; padding: 6px; margin: 6px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 12px`,
    ".eSubToolResizeSizeHolder button .eSubToolResizeSizeTitle": `color: var(--theme); font-size: 18px; font-weight: 600`,
    ".eSubToolResizeSizeHolder button .eSubToolResizeSizeInfo": `color: var(--darkGray); font-size: 15px; font-weight: 500`,
    ".eSubToolResizeSizeHolder button:hover": `--borderColor: var(--hover)`,
    ".eSubToolResizeHolder button[selected]": `--borderColor: var(--theme); background: var(--hover)`,
    ".eSubToolResizeCustomSizeHolder": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 8px; justify-content: center; align-items: center`,
    ".eSubToolResizeNumberHolder": `display: flex; flex-wrap: wrap; margin: 0px 10px; justify-content: center; align-items: center`,
    ".eSubToolResizeNumberHolder div[contenteditable]": `width: fit-content; max-width: 60px; padding: 4px 6px; margin: 6px 4px 6px 8px; --borderColor: var(--secondary); outline: unset; border: solid 3px var(--borderColor); border-radius: 20px; color: var(--theme); font-size: 16px; font-weight: 600; white-space: nowrap; overflow: hidden; transition: .2s`
  };
  setPreferenceTool = function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
  };
  pageBorderSize = 4;
  ppi = 96; // Pixels per inch
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    this.setPreferenceTool(editor);
    let sizeHolder = frame.querySelector(".eSubToolResizeSizeHolder");
    let sizeOptions = sizeHolder.children;
    let customSizeHolder = frame.querySelector(".eSubToolResizeCustomSizeHolder");
    let customSizeWidth = customSizeHolder.querySelector(".eSubToolResizeNumberHolder[width] div[contenteditable]");
    let customSizeHeight = customSizeHolder.querySelector(".eSubToolResizeNumberHolder[height] div[contenteditable]");
    let updateSelected = (noTextBox) => {
      let selectID = Object.keys(editor.selecting)[0];
      let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
      for (let i = 0; i < sizeOptions.length; i++) {
        let option = sizeOptions[i];
        if ((original.s[0] == parseFloat(option.getAttribute("width")) + (this.pageBorderSize * 2)) && (original.s[1] == parseFloat(option.getAttribute("height")) + (this.pageBorderSize * 2))) {
          option.setAttribute("selected", "");
        } else {
          option.removeAttribute("selected");
        }
      }
      if (noTextBox != true) {
        customSizeWidth.textContent = Math.round(((original.s[0] - (this.pageBorderSize * 2)) / this.ppi) * 100) / 100;
        customSizeHeight.textContent = Math.round(((original.s[1] - (this.pageBorderSize * 2)) / this.ppi) * 100) / 100;
      }
      extra.updateActionUI();
    }

    sizeHolder.addEventListener("click", async (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      element = element.closest("button");
      if (element == null) {
        return;
      }
      let width = parseFloat(element.getAttribute("width")) + (this.pageBorderSize * 2);
      let height = parseFloat(element.getAttribute("height")) + (this.pageBorderSize * 2);
      await extra.saveSelecting({ s: [width, height] }, true);
      updateSelected();
      if (Object.keys(editor.selecting).length > 0) {
        editor.preferences.tools.page.size = [width, height];
      }
    });

    customSizeHolder.addEventListener("mousedown", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
    });
    customSizeHolder.addEventListener("keydown", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      if (event.key == "Enter") {
        event.preventDefault();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseFloat(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key && (event.keyCode != 190 || textBox.hasAttribute("nodecimal"))) {
          event.preventDefault();
          return textBoxError(textBox, "Must be a number");
        } else if (textInt > parseFloat(textBox.getAttribute("max"))) {
          event.preventDefault();
          return textBoxError(textBox, "Must be less than " + textBox.getAttribute("max"));
        } else if (textInt < 1) {
          event.preventDefault();
          return textBoxError(textBox, "Must be greater than 1");
        }
      }
      updateSelected(true);
    });
    customSizeHolder.addEventListener("focusout", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      let textInt = parseFloat(textBox.textContent) ?? 0;
      if (textInt > parseFloat(textBox.getAttribute("max"))) {
        textBox.textContent = textBox.getAttribute("max");
      } else if (textInt < 1) {
        textBox.textContent = 1;
      }
    });

    let saveCustomSize = async () => {
      let widthSet = parseFloat(customSizeWidth.textContent);
      let heightSet = parseFloat(customSizeHeight.textContent);
      if (widthSet > 0 && heightSet > 0) {
        await extra.saveSelecting({ s: [
          Math.round(((widthSet * this.ppi) + (this.pageBorderSize * 2)) * 100) / 100,
          Math.round(((heightSet * this.ppi) + (this.pageBorderSize * 2)) * 100) / 100
        ] }, true);
      }
      updateSelected();
    }
    customSizeWidth.addEventListener("focusout", saveCustomSize);
    customSizeHeight.addEventListener("focusout", saveCustomSize);

    updateSelected();
  }
};
modules["pages/editor/toolbar/hidepage"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2388_117" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2388_117)"> <path d="M41 127.162L53.8865 111.018C91.9186 63.3708 164.349 63.3708 202.381 111.018L215.268 127.162" stroke="white" stroke-width="44" stroke-linecap="round"/> <path d="M41 128L53.8865 144.144C91.9186 191.791 164.349 191.791 202.381 144.144L215.268 128" stroke="white" stroke-width="44" stroke-linecap="round"/> <circle cx="128" cy="128" r="32" fill="white"/> <path d="M41 127.162L53.8865 111.018C91.9186 63.3708 164.349 63.3708 202.381 111.018L215.268 127.162" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <path d="M41 128L53.8865 144.144C91.9186 191.791 164.349 191.791 202.381 144.144L215.268 128" stroke="#2F2F2F" stroke-width="20" stroke-linecap="round"/> <circle cx="128" cy="128" r="20" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Hide Page";
  setButton = function (editor, button) {
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    if (preferenceTool.hidden != true) {
      button.removeAttribute("selecthighlight");
      button.setAttribute("tooltip", "Hide Page");
    } else {
      button.setAttribute("selecthighlight", "");
      button.setAttribute("tooltip", "Reveal Page");
    }
  }
  js = async function (frame, toolID, extra) {
    await extra.saveSelecting({ hidden: !(extra.button.hasAttribute("selecthighlight")) }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/rotatepage"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2782_5" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_2782_5)"> <rect x="62" y="84" width="132" height="132" rx="36" stroke="white" stroke-width="32"/> <rect x="84" y="106" width="88" height="88" rx="14" stroke="white" stroke-width="12"/> <rect x="68" y="90" width="120" height="120" rx="30" stroke="#2F2F2F" stroke-width="20"/> <path d="M166 52H188.185C209.07 52 226 68.107 226 89.8151V112" stroke="white" stroke-width="28" stroke-linecap="round"/> <path d="M174.601 80.3995C180.068 85.8668 188.932 85.8668 194.399 80.3995C199.867 74.9322 199.867 66.0678 194.399 60.6005L174.601 80.3995ZM184.899 51.1005L175 41.201L155.201 61L165.101 70.8995L184.899 51.1005ZM194.399 60.6005L184.899 51.1005L165.101 70.8995L174.601 80.3995L194.399 60.6005Z" fill="white"/> <path d="M165.101 33.1005L155.201 43L175 62.799L184.899 52.8995L165.101 33.1005ZM194.399 43.3995C199.867 37.9322 199.867 29.0678 194.399 23.6005C188.932 18.1332 180.068 18.1332 174.601 23.6005L194.399 43.3995ZM184.899 52.8995L194.399 43.3995L174.601 23.6005L165.101 33.1005L184.899 52.8995Z" fill="white"/> <path d="M155.65 61.4499C150.431 56.2309 150.431 47.7691 155.65 42.55L165.1 33.1001L184 52L165.1 70.8999L155.65 61.4499Z" fill="white"/> <path d="M166 52.001H188.185C209.07 52.001 226 68.108 226 89.8161V112.001" stroke="#2F2F2F" stroke-width="12" stroke-linecap="round"/> <path d="M180.257 74.7426C182.601 77.0858 186.399 77.0858 188.743 74.7426C191.086 72.3995 191.086 68.6005 188.743 66.2574L180.257 74.7426ZM174.243 51.7574L170 47.5147L161.515 56L165.757 60.2426L174.243 51.7574ZM188.743 66.2574L174.243 51.7574L165.757 60.2426L180.257 74.7426L188.743 66.2574Z" fill="#2F2F2F"/> <path d="M165.757 43.7574L161.515 48L170 56.4853L174.243 52.2426L165.757 43.7574ZM188.743 37.7426C191.086 35.3995 191.086 31.6005 188.743 29.2574C186.399 26.9142 182.601 26.9142 180.257 29.2574L188.743 37.7426ZM174.243 52.2426L188.743 37.7426L180.257 29.2574L165.757 43.7574L174.243 52.2426Z" fill="#2F2F2F"/> <path d="M161.757 56.2426C159.414 53.8995 159.414 50.1005 161.757 47.7574L166 43.5147L174.485 52L166 60.4853L161.757 56.2426Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Rotate Page";
  setButton = function (editor, button) {
    if (button.closest(".eSelectHolder").hasAttribute("locked") == true) {
      button.style.removeProperty("display");
      return;
    }
    let selectKeys = Object.keys(editor.selecting);
    let preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
    if (preferenceTool.source != null && preferenceTool.number != null) {
      button.style.display = "unset";
    } else {
      button.style.display = "none";
    }
  }
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    let selectKeys = Object.keys(editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      let anno = { ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) };
      if (anno.source == null || anno.number == null) {
        continue;
      }
      let setRotate = (anno.rotation ?? 0) - 90;
      if (setRotate < 0) {
        setRotate = 360 + setRotate;
      }
      editor.selecting[selectID] = {
        rotation: setRotate,
        s: [anno.s[1], anno.s[0]]
      };
    }
    extra.module.action = "save";
    await extra.module.endAction();
  }
};

modules["pages/editor/toolbar/fontsize"] = class {
  button = `<div class="eSubToolFontSize"></div>`;
  tooltip = "Font Size";
  setButton = function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    original.d = original.d ?? {};
    let buttonTx = button.querySelector(".eSubToolFontSize");
    let size = original.d.s;
    if (size == null) {
      let preferences = editor.preferences.tools[original.f];
      if (preferences != null && preferences.size != null) {
        size = preferences.size;
      }
    }
    buttonTx.textContent = size ?? 18;
    if (original.f != "sticky") {
      buttonTx.style.color = "#" + original.c;
    } else {
      buttonTx.style.color = "var(--theme)";
    }
  };
  html = `
    <div class="eSubToolFontSizeContainer">
      <button class="eFontSizeOption" small>Small</button>
      <button class="eFontSizeOption" medium>Medium</button>
      <button class="eFontSizeOption" large>Large</button>
      <div class="eFontSizeLine"></div>
      <div class="eFontSizeInput border"><div class="eFontSizeBox" contenteditable></div></div>
    </div>
  `;
  css = {
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
  };
  setPreferenceTool = function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
  }
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    this.setPreferenceTool(editor);
    this.preferenceTool.d = this.preferenceTool.d ?? {};
    let selectedS = this.preferenceTool.d.s;
    if (selectedS == null) {
      let preferences = editor.preferences.tools[this.preferenceTool.f];
      if (preferences != null && preferences.size != null) {
        selectedS = preferences.size;
      }
    }
    selectedS = selectedS ?? 18;

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
      let textInt = parseInt(textBox.textContent) ?? selectedS;
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

modules["pages/editor/toolbar/bold"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_808_8" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_808_8)"> <mask id="path-2-outside-1_808_8" maskUnits="userSpaceOnUse" x="44" y="37" width="178" height="185" fill="black"> <rect fill="white" x="44" y="37" width="178" height="185"/> <path d="M56.1 210V49H138.44C159.6 49 175.393 52.91 185.82 60.73C196.247 68.3967 201.46 78.5167 201.46 91.09C201.46 99.37 199.237 106.653 194.79 112.94C190.497 119.073 184.363 123.98 176.39 127.66C168.57 131.187 159.217 132.95 148.33 132.95L152.93 121.91C164.277 121.91 174.167 123.673 182.6 127.2C191.033 130.573 197.55 135.557 202.15 142.15C206.903 148.59 209.28 156.487 209.28 165.84C209.28 179.793 203.607 190.68 192.26 198.5C181.067 206.167 164.66 210 143.04 210H56.1ZM101.18 177.11H139.36C147.18 177.11 153.083 175.807 157.07 173.2C161.21 170.44 163.28 166.3 163.28 160.78C163.28 155.26 161.21 151.197 157.07 148.59C153.083 145.83 147.18 144.45 139.36 144.45H97.96V112.94H132.46C140.127 112.94 145.877 111.637 149.71 109.03C153.543 106.423 155.46 102.513 155.46 97.3C155.46 92.0867 153.543 88.2533 149.71 85.8C145.877 83.1933 140.127 81.89 132.46 81.89H101.18V177.11Z"/> </mask> <path d="M56.1 210H44.1V222H56.1V210ZM56.1 49V37H44.1V49H56.1ZM185.82 60.73L178.62 70.33L178.665 70.3641L178.711 70.3978L185.82 60.73ZM194.79 112.94L184.993 106.01L184.976 106.034L184.959 106.058L194.79 112.94ZM176.39 127.66L181.323 138.599L181.371 138.577L181.419 138.556L176.39 127.66ZM148.33 132.95L137.253 128.335L130.33 144.95H148.33V132.95ZM152.93 121.91V109.91H144.93L141.853 117.295L152.93 121.91ZM182.6 127.2L177.97 138.271L178.057 138.307L178.143 138.342L182.6 127.2ZM202.15 142.15L192.308 149.016L192.4 149.147L192.495 149.276L202.15 142.15ZM192.26 198.5L199.041 208.4L199.055 208.391L199.07 208.381L192.26 198.5ZM101.18 177.11H89.18V189.11H101.18V177.11ZM157.07 173.2L163.637 183.244L163.682 183.214L163.726 183.185L157.07 173.2ZM157.07 148.59L150.239 158.456L150.455 158.605L150.676 158.745L157.07 148.59ZM97.96 144.45H85.96V156.45H97.96V144.45ZM97.96 112.94V100.94H85.96V112.94H97.96ZM149.71 109.03L156.458 118.953L156.458 118.953L149.71 109.03ZM149.71 85.8L142.962 95.7231L143.101 95.8171L143.241 95.9073L149.71 85.8ZM101.18 81.89V69.89H89.18V81.89H101.18ZM68.1 210V49H44.1V210H68.1ZM56.1 61H138.44V37H56.1V61ZM138.44 61C158.494 61 171.21 64.7722 178.62 70.33L193.02 51.13C179.577 41.0478 160.706 37 138.44 37V61ZM178.711 70.3978C186.169 75.8814 189.46 82.4639 189.46 91.09H213.46C213.46 74.5694 206.324 60.9119 192.929 51.0622L178.711 70.3978ZM189.46 91.09C189.46 97.085 187.897 101.905 184.993 106.01L204.587 119.87C210.577 111.401 213.46 101.655 213.46 91.09H189.46ZM184.959 106.058C182.08 110.172 177.743 113.819 171.361 116.764L181.419 138.556C190.983 134.141 198.914 127.974 204.621 119.822L184.959 106.058ZM171.457 116.721C165.545 119.387 157.958 120.95 148.33 120.95V144.95C160.476 144.95 171.595 142.986 181.323 138.599L171.457 116.721ZM159.407 137.565L164.007 126.525L141.853 117.295L137.253 128.335L159.407 137.565ZM152.93 133.91C163.059 133.91 171.311 135.486 177.97 138.271L187.23 116.129C177.022 111.86 165.495 109.91 152.93 109.91V133.91ZM178.143 138.342C184.694 140.962 189.217 144.585 192.308 149.016L211.992 135.284C205.883 126.529 197.372 120.185 187.057 116.058L178.143 138.342ZM192.495 149.276C195.479 153.319 197.28 158.604 197.28 165.84H221.28C221.28 154.369 218.327 143.861 211.805 135.024L192.495 149.276ZM197.28 165.84C197.28 175.906 193.499 183.072 185.45 188.619L199.07 208.381C213.715 198.288 221.28 183.681 221.28 165.84H197.28ZM185.479 188.6C177.148 194.306 163.559 198 143.04 198V222C165.761 222 184.986 218.027 199.041 208.4L185.479 188.6ZM143.04 198H56.1V222H143.04V198ZM101.18 189.11H139.36V165.11H101.18V189.11ZM139.36 189.11C148.161 189.11 156.812 187.706 163.637 183.244L150.503 163.156C149.355 163.907 146.199 165.11 139.36 165.11V189.11ZM163.726 183.185C171.613 177.927 175.28 169.796 175.28 160.78H151.28C151.28 162.033 151.051 162.546 150.994 162.658C150.963 162.721 150.881 162.904 150.414 163.215L163.726 183.185ZM175.28 160.78C175.28 151.763 171.592 143.553 163.464 138.435L150.676 158.745C150.897 158.884 150.985 158.975 151.004 158.995C151.019 159.012 151.024 159.017 151.035 159.04C151.048 159.065 151.28 159.52 151.28 160.78H175.28ZM163.901 138.724C157.018 133.959 148.253 132.45 139.36 132.45V156.45C146.107 156.45 149.149 157.701 150.239 158.456L163.901 138.724ZM139.36 132.45H97.96V156.45H139.36V132.45ZM109.96 144.45V112.94H85.96V144.45H109.96ZM97.96 124.94H132.46V100.94H97.96V124.94ZM132.46 124.94C141.112 124.94 149.716 123.537 156.458 118.953L142.962 99.1069C142.037 99.736 139.142 100.94 132.46 100.94V124.94ZM156.458 118.953C164.028 113.806 167.46 105.908 167.46 97.3H143.46C143.46 98.4328 143.256 98.8429 143.247 98.8606C143.238 98.879 143.237 98.8809 143.228 98.8912C143.216 98.9046 143.146 98.9822 142.962 99.1069L156.458 118.953ZM167.46 97.3C167.46 88.6942 164.009 80.704 156.179 75.6927L143.241 95.9073C143.38 95.9961 143.403 96.033 143.371 95.9977C143.335 95.959 143.304 95.9104 143.289 95.8816C143.253 95.8096 143.46 96.1589 143.46 97.3H167.46ZM156.458 75.8769C149.716 71.2927 141.112 69.89 132.46 69.89V93.89C139.142 93.89 142.037 95.094 142.962 95.7231L156.458 75.8769ZM132.46 69.89H101.18V93.89H132.46V69.89ZM89.18 81.89V177.11H113.18V81.89H89.18Z" fill="white" mask="url(#path-2-outside-1_808_8)"/> <path d="M56.1 210V49H138.44C159.6 49 175.393 52.91 185.82 60.73C196.247 68.3967 201.46 78.5167 201.46 91.09C201.46 99.37 199.237 106.653 194.79 112.94C190.497 119.073 184.363 123.98 176.39 127.66C168.57 131.187 159.217 132.95 148.33 132.95L152.93 121.91C164.277 121.91 174.167 123.673 182.6 127.2C191.033 130.573 197.55 135.557 202.15 142.15C206.903 148.59 209.28 156.487 209.28 165.84C209.28 179.793 203.607 190.68 192.26 198.5C181.067 206.167 164.66 210 143.04 210H56.1ZM101.18 177.11H139.36C147.18 177.11 153.083 175.807 157.07 173.2C161.21 170.44 163.28 166.3 163.28 160.78C163.28 155.26 161.21 151.197 157.07 148.59C153.083 145.83 147.18 144.45 139.36 144.45H97.96V112.94H132.46C140.127 112.94 145.877 111.637 149.71 109.03C153.543 106.423 155.46 102.513 155.46 97.3C155.46 92.0867 153.543 88.2533 149.71 85.8C145.877 83.1933 140.127 81.89 132.46 81.89H101.18V177.11Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Bold";
  divideBefore = true;
  setButton = function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    original.d = original.d ?? {};
    if (original.d.bo != true) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  }
  js = async function (frame, toolID, extra) {
    await extra.saveSelecting({ d: { bo: !(extra.button.hasAttribute("selecthighlight")) } }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/italic"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_808_19" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_808_19)"> <mask id="path-2-outside-1_808_19" maskUnits="userSpaceOnUse" x="82" y="37" width="99" height="185" fill="black"> <rect fill="white" x="82" y="37" width="99" height="185"/> <path d="M96.67 210L128.87 49H166.36L134.16 210H96.67Z"/> </mask> <path d="M96.67 210L84.903 207.647L82.0324 222H96.67V210ZM128.87 49V37H119.032L117.103 46.6466L128.87 49ZM166.36 49L178.127 51.3534L180.998 37H166.36V49ZM134.16 210V222H143.998L145.927 212.353L134.16 210ZM108.437 212.353L140.637 51.3534L117.103 46.6466L84.903 207.647L108.437 212.353ZM128.87 61H166.36V37H128.87V61ZM154.593 46.6466L122.393 207.647L145.927 212.353L178.127 51.3534L154.593 46.6466ZM134.16 198H96.67V222H134.16V198Z" fill="white" mask="url(#path-2-outside-1_808_19)"/> <path d="M96.67 210L128.87 49H166.36L134.16 210H96.67Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Italic";
  setButton = function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    original.d = original.d ?? {};
    if (original.d.it != true) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  }
  js = async function (frame, toolID, extra) {
    await extra.saveSelecting({ d: { it: !(extra.button.hasAttribute("selecthighlight")) } }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/underline"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_808_24" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_808_24)"> <mask id="path-2-outside-1_808_24" maskUnits="userSpaceOnUse" x="52" y="25" width="152" height="167" fill="black"> <rect fill="white" x="52" y="25" width="152" height="167"/> <path d="M127.991 179.4C108.125 179.4 92.5914 173.867 81.3914 162.8C70.1914 151.733 64.5914 135.933 64.5914 115.4V37H96.9914V114.2C96.9914 127.533 99.7247 137.133 105.191 143C110.658 148.867 118.325 151.8 128.191 151.8C138.058 151.8 145.725 148.867 151.191 143C156.658 137.133 159.391 127.533 159.391 114.2V37H191.391V115.4C191.391 135.933 185.791 151.733 174.591 162.8C163.391 173.867 147.858 179.4 127.991 179.4Z"/> </mask> <path d="M81.3914 162.8L89.8257 154.264L89.8257 154.264L81.3914 162.8ZM64.5914 37V25H52.5914V37H64.5914ZM96.9914 37H108.991V25H96.9914V37ZM105.191 143L96.4121 151.181L96.4121 151.181L105.191 143ZM151.191 143L159.971 151.181L159.971 151.181L151.191 143ZM159.391 37V25H147.391V37H159.391ZM191.391 37H203.391V25H191.391V37ZM174.591 162.8L183.026 171.336L183.026 171.336L174.591 162.8ZM127.991 167.4C110.414 167.4 98.2292 162.567 89.8257 154.264L72.9571 171.336C86.9536 185.166 105.836 191.4 127.991 191.4V167.4ZM89.8257 154.264C81.5415 146.078 76.5914 133.743 76.5914 115.4H52.5914C52.5914 138.123 58.8413 157.388 72.9571 171.336L89.8257 154.264ZM76.5914 115.4V37H52.5914V115.4H76.5914ZM64.5914 49H96.9914V25H64.5914V49ZM84.9914 37V114.2H108.991V37H84.9914ZM84.9914 114.2C84.9914 128.684 87.8744 142.018 96.4121 151.181L113.971 134.819C111.575 132.248 108.991 126.382 108.991 114.2H84.9914ZM96.4121 151.181C104.655 160.027 115.819 163.8 128.191 163.8V139.8C120.83 139.8 116.661 137.706 113.971 134.819L96.4121 151.181ZM128.191 163.8C140.564 163.8 151.728 160.027 159.971 151.181L142.412 134.819C139.722 137.706 135.552 139.8 128.191 139.8V163.8ZM159.971 151.181C168.508 142.018 171.391 128.684 171.391 114.2H147.391C147.391 126.382 144.808 132.248 142.412 134.819L159.971 151.181ZM171.391 114.2V37H147.391V114.2H171.391ZM159.391 49H191.391V25H159.391V49ZM179.391 37V115.4H203.391V37H179.391ZM179.391 115.4C179.391 133.743 174.441 146.078 166.157 154.264L183.026 171.336C197.142 157.388 203.391 138.123 203.391 115.4H179.391ZM166.157 154.264C157.754 162.567 145.569 167.4 127.991 167.4V191.4C150.147 191.4 169.029 185.166 183.026 171.336L166.157 154.264Z" fill="white" mask="url(#path-2-outside-1_808_24)"/> <rect x="47" y="192" width="162" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M127.991 179.4C108.125 179.4 92.5914 173.867 81.3914 162.8C70.1914 151.733 64.5914 135.933 64.5914 115.4V37H96.9914V114.2C96.9914 127.533 99.7247 137.133 105.191 143C110.658 148.867 118.325 151.8 128.191 151.8C138.058 151.8 145.725 148.867 151.191 143C156.658 137.133 159.391 127.533 159.391 114.2V37H191.391V115.4C191.391 135.933 185.791 151.733 174.591 162.8C163.391 173.867 147.858 179.4 127.991 179.4Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Underline";
  setButton = function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    original.d = original.d ?? {};
    if (original.d.ul != true) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  }
  js = async function (frame, toolID, extra) {
    await extra.saveSelecting({ d: { ul: !(extra.button.hasAttribute("selecthighlight")) } }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/strikethrough"] = class {
  button = `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_810_34" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_810_34)"> <mask id="path-2-outside-1_810_34" maskUnits="userSpaceOnUse" x="46" y="34" width="162" height="191" fill="black"> <rect fill="white" x="46" y="34" width="162" height="191"/> <path d="M127.155 212.76C114.275 212.76 101.932 211.073 90.125 207.7C78.3184 204.173 68.8117 199.65 61.605 194.13L74.255 166.07C81.155 170.977 89.2817 175.04 98.635 178.26C108.142 181.327 117.725 182.86 127.385 182.86C134.745 182.86 140.648 182.17 145.095 180.79C149.695 179.257 153.068 177.187 155.215 174.58C157.362 171.973 158.435 168.983 158.435 165.61C158.435 161.317 156.748 157.943 153.375 155.49C150.002 152.883 145.555 150.813 140.035 149.28C134.515 147.593 128.382 146.06 121.635 144.68C115.042 143.147 108.372 141.307 101.625 139.16C95.0317 137.013 88.975 134.253 83.455 130.88C77.935 127.507 73.4117 123.06 69.885 117.54C66.5117 112.02 64.825 104.967 64.825 96.38C64.825 87.18 67.2784 78.8233 72.185 71.31C77.245 63.6433 84.7584 57.5867 94.725 53.14C104.845 48.54 117.495 46.24 132.675 46.24C142.795 46.24 152.762 47.4667 162.575 49.92C172.388 52.22 181.052 55.7467 188.565 60.5L177.065 88.79C169.552 84.4967 162.038 81.3533 154.525 79.36C147.012 77.2133 139.652 76.14 132.445 76.14C125.238 76.14 119.335 76.9833 114.735 78.67C110.135 80.3567 106.838 82.58 104.845 85.34C102.852 87.9467 101.855 91.0133 101.855 94.54C101.855 98.68 103.542 102.053 106.915 104.66C110.288 107.113 114.735 109.107 120.255 110.64C125.775 112.173 131.832 113.707 138.425 115.24C145.172 116.773 151.842 118.537 158.435 120.53C165.182 122.523 171.315 125.207 176.835 128.58C182.355 131.953 186.802 136.4 190.175 141.92C193.702 147.44 195.465 154.417 195.465 162.85C195.465 171.897 192.935 180.177 187.875 187.69C182.815 195.203 175.225 201.26 165.105 205.86C155.138 210.46 142.488 212.76 127.155 212.76Z"/> </mask> <path d="M90.125 207.7L86.6906 219.198L86.7594 219.219L86.8284 219.238L90.125 207.7ZM61.605 194.13L50.6653 189.198L46.7553 197.871L54.3081 203.657L61.605 194.13ZM74.255 166.07L81.2093 156.291L69.3141 147.832L63.3153 161.138L74.255 166.07ZM98.635 178.26L94.7289 189.606L94.8396 189.645L94.951 189.681L98.635 178.26ZM145.095 180.79L148.652 192.251L148.771 192.214L148.89 192.174L145.095 180.79ZM155.215 174.58L145.952 166.952L145.952 166.952L155.215 174.58ZM153.375 155.49L146.038 164.985L146.176 165.092L146.317 165.195L153.375 155.49ZM140.035 149.28L136.528 160.756L136.675 160.801L136.823 160.842L140.035 149.28ZM121.635 144.68L118.917 156.368L119.073 156.404L119.23 156.437L121.635 144.68ZM101.625 139.16L97.91 150.57L97.9483 150.583L97.9866 150.595L101.625 139.16ZM83.455 130.88L77.1976 141.119L77.1976 141.119L83.455 130.88ZM69.885 117.54L59.6457 123.797L59.7082 123.9L59.7727 124.001L69.885 117.54ZM72.185 71.31L62.1697 64.6999L62.1537 64.7242L62.1378 64.7485L72.185 71.31ZM94.725 53.14L99.6143 64.0988L99.6526 64.0817L99.6907 64.0644L94.725 53.14ZM162.575 49.92L159.665 61.5617L159.751 61.5832L159.837 61.6034L162.575 49.92ZM188.565 60.5L199.682 65.0189L203.46 55.7236L194.981 50.359L188.565 60.5ZM177.065 88.79L171.111 99.2089L183.018 106.012L188.182 93.3089L177.065 88.79ZM154.525 79.36L151.228 90.8983L151.338 90.9295L151.448 90.9587L154.525 79.36ZM114.735 78.67L110.604 67.4035L110.604 67.4035L114.735 78.67ZM104.845 85.34L114.377 92.6294L114.477 92.499L114.573 92.3659L104.845 85.34ZM106.915 104.66L99.5777 114.155L99.7158 114.262L99.857 114.365L106.915 104.66ZM120.255 110.64L117.043 122.202L117.043 122.202L120.255 110.64ZM138.425 115.24L135.707 126.928L135.736 126.935L135.766 126.942L138.425 115.24ZM158.435 120.53L154.962 132.017L154.999 132.027L155.035 132.038L158.435 120.53ZM176.835 128.58L183.092 118.341L183.092 118.341L176.835 128.58ZM190.175 141.92L179.936 148.177L179.998 148.28L180.063 148.381L190.175 141.92ZM187.875 187.69L197.828 194.393L197.828 194.393L187.875 187.69ZM165.105 205.86L160.139 194.936L160.108 194.95L160.076 194.964L165.105 205.86ZM127.155 200.76C115.335 200.76 104.105 199.214 93.4217 196.162L86.8284 219.238C99.7585 222.933 113.215 224.76 127.155 224.76V200.76ZM93.5595 196.202C82.6825 192.953 74.6193 188.983 68.902 184.603L54.3081 203.657C63.0042 210.317 73.9542 215.394 86.6906 219.198L93.5595 196.202ZM72.5447 199.062L85.1947 171.002L63.3153 161.138L50.6653 189.198L72.5447 199.062ZM67.3008 175.849C75.2784 181.522 84.4676 186.074 94.7289 189.606L102.541 166.914C94.0958 164.006 87.0317 160.431 81.2093 156.291L67.3008 175.849ZM94.951 189.681C105.607 193.118 116.432 194.86 127.385 194.86V170.86C119.018 170.86 110.676 169.535 102.319 166.839L94.951 189.681ZM127.385 194.86C135.337 194.86 142.586 194.133 148.652 192.251L141.538 169.329C138.711 170.207 134.153 170.86 127.385 170.86V194.86ZM148.89 192.174C154.745 190.223 160.402 187.158 164.478 182.208L145.952 166.952C145.734 167.216 144.645 168.291 141.3 169.406L148.89 192.174ZM164.478 182.208C168.392 177.456 170.435 171.77 170.435 165.61H146.435C146.435 166.197 146.331 166.491 145.952 166.952L164.478 182.208ZM170.435 165.61C170.435 157.61 167.017 150.574 160.433 145.785L146.317 165.195C146.484 165.317 146.538 165.381 146.528 165.371C146.516 165.356 146.476 165.305 146.437 165.227C146.398 165.149 146.392 165.11 146.399 165.141C146.407 165.178 146.435 165.324 146.435 165.61H170.435ZM160.712 145.995C155.767 142.173 149.778 139.532 143.247 137.718L136.823 160.842C141.332 162.095 144.236 163.594 146.038 164.985L160.712 145.995ZM143.542 137.804C137.598 135.988 131.09 134.365 124.04 132.923L119.23 156.437C125.674 157.755 131.432 159.199 136.528 160.756L143.542 137.804ZM124.353 132.992C118.084 131.534 111.721 129.779 105.263 127.725L97.9866 150.595C105.023 152.834 112 154.759 118.917 156.368L124.353 132.992ZM105.34 127.75C99.5735 125.872 94.3786 123.492 89.7124 120.641L77.1976 141.119C83.5715 145.015 90.4899 148.155 97.91 150.57L105.34 127.75ZM89.7124 120.641C85.7679 118.23 82.5555 115.083 79.9974 111.079L59.7727 124.001C64.2679 131.037 70.1022 136.783 77.1976 141.119L89.7124 120.641ZM80.1244 111.283C78.2211 108.168 76.825 103.462 76.825 96.38H52.825C52.825 106.471 54.8023 115.872 59.6457 123.797L80.1244 111.283ZM76.825 96.38C76.825 89.4481 78.6335 83.3821 82.2323 77.8715L62.1378 64.7485C55.9233 74.2645 52.825 84.9119 52.825 96.38H76.825ZM82.2004 77.9201C85.7806 72.4955 91.3377 67.7914 99.6143 64.0988L89.8357 42.1812C78.179 47.3819 68.7095 54.7911 62.1697 64.6999L82.2004 77.9201ZM99.6907 64.0644C107.791 60.3824 118.618 58.24 132.675 58.24V34.24C116.372 34.24 101.899 36.6976 89.7594 42.2156L99.6907 64.0644ZM132.675 58.24C141.814 58.24 150.804 59.3464 159.665 61.5617L165.485 38.2783C154.72 35.5869 143.776 34.24 132.675 34.24V58.24ZM159.837 61.6034C168.519 63.6382 175.907 66.692 182.149 70.6409L194.981 50.359C186.196 44.8013 176.258 40.8017 165.313 38.2366L159.837 61.6034ZM177.448 55.981L165.948 84.271L188.182 93.3089L199.682 65.0189L177.448 55.981ZM183.019 78.3711C174.702 73.6189 166.228 70.0497 157.602 67.7613L151.448 90.9587C157.849 92.657 164.401 95.3744 171.111 99.2089L183.019 78.3711ZM157.822 67.8217C149.326 65.3944 140.856 64.14 132.445 64.14V88.14C138.447 88.14 144.697 89.0323 151.228 90.8983L157.822 67.8217ZM132.445 64.14C124.431 64.14 116.994 65.0604 110.604 67.4035L118.866 89.9365C121.676 88.9062 126.046 88.14 132.445 88.14V64.14ZM110.604 67.4035C104.699 69.5687 99.0017 72.9351 95.1169 78.3141L114.573 92.3659C114.675 92.2248 115.571 91.1447 118.866 89.9365L110.604 67.4035ZM95.3127 78.0506C91.596 82.9109 89.855 88.5881 89.855 94.54H113.855C113.855 93.4385 114.107 92.9824 114.377 92.6294L95.3127 78.0506ZM89.855 94.54C89.855 102.524 93.3658 109.355 99.5777 114.155L114.252 95.1646C114.018 94.9836 113.904 94.8598 113.862 94.8099C113.823 94.7638 113.831 94.7647 113.853 94.8084C113.875 94.853 113.882 94.883 113.88 94.8728C113.877 94.8584 113.855 94.7567 113.855 94.54H89.855ZM99.857 114.365C104.736 117.913 110.621 120.418 117.043 122.202L123.467 99.0778C118.849 97.795 115.841 96.3137 113.973 94.9552L99.857 114.365ZM117.043 122.202C122.753 123.788 128.977 125.363 135.707 126.928L141.143 103.552C134.687 102.05 128.797 100.558 123.467 99.0778L117.043 122.202ZM135.766 126.942C142.24 128.413 148.639 130.105 154.962 132.017L161.908 109.043C155.045 106.969 148.103 105.134 141.085 103.538L135.766 126.942ZM155.035 132.038C160.865 133.761 166.025 136.037 170.578 138.819L183.092 118.341C176.605 114.376 169.499 111.286 161.835 109.022L155.035 132.038ZM170.578 138.819C174.473 141.2 177.555 144.282 179.936 148.177L200.414 135.663C196.048 128.518 190.237 122.707 183.092 118.341L170.578 138.819ZM180.063 148.381C182.048 151.488 183.465 156.056 183.465 162.85H207.465C207.465 152.777 205.355 143.392 200.287 135.459L180.063 148.381ZM183.465 162.85C183.465 169.505 181.65 175.452 177.922 180.987L197.828 194.393C204.221 184.902 207.465 174.288 207.465 162.85H183.465ZM177.922 180.987C174.356 186.281 168.697 191.046 160.139 194.936L170.071 216.784C181.753 211.474 191.274 204.125 197.828 194.393L177.922 180.987ZM160.076 194.964C152.182 198.608 141.397 200.76 127.155 200.76V224.76C143.58 224.76 158.095 222.312 170.134 216.756L160.076 194.964Z" fill="white" mask="url(#path-2-outside-1_810_34)"/> <rect x="22" y="111" width="212" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <path d="M127.155 212.76C114.275 212.76 101.932 211.073 90.125 207.7C78.3184 204.173 68.8117 199.65 61.605 194.13L74.255 166.07C81.155 170.977 89.2817 175.04 98.635 178.26C108.142 181.327 117.725 182.86 127.385 182.86C134.745 182.86 140.648 182.17 145.095 180.79C149.695 179.257 153.068 177.187 155.215 174.58C157.362 171.973 158.435 168.983 158.435 165.61C158.435 161.317 156.748 157.943 153.375 155.49C150.002 152.883 145.555 150.813 140.035 149.28C134.515 147.593 128.382 146.06 121.635 144.68C115.042 143.147 108.372 141.307 101.625 139.16C95.0317 137.013 88.975 134.253 83.455 130.88C77.935 127.507 73.4117 123.06 69.885 117.54C66.5117 112.02 64.825 104.967 64.825 96.38C64.825 87.18 67.2784 78.8233 72.185 71.31C77.245 63.6433 84.7584 57.5867 94.725 53.14C104.845 48.54 117.495 46.24 132.675 46.24C142.795 46.24 152.762 47.4667 162.575 49.92C172.388 52.22 181.052 55.7467 188.565 60.5L177.065 88.79C169.552 84.4967 162.038 81.3533 154.525 79.36C147.012 77.2133 139.652 76.14 132.445 76.14C125.238 76.14 119.335 76.9833 114.735 78.67C110.135 80.3567 106.838 82.58 104.845 85.34C102.852 87.9467 101.855 91.0133 101.855 94.54C101.855 98.68 103.542 102.053 106.915 104.66C110.288 107.113 114.735 109.107 120.255 110.64C125.775 112.173 131.832 113.707 138.425 115.24C145.172 116.773 151.842 118.537 158.435 120.53C165.182 122.523 171.315 125.207 176.835 128.58C182.355 131.953 186.802 136.4 190.175 141.92C193.702 147.44 195.465 154.417 195.465 162.85C195.465 171.897 192.935 180.177 187.875 187.69C182.815 195.203 175.225 201.26 165.105 205.86C155.138 210.46 142.488 212.76 127.155 212.76Z" fill="#2F2F2F"/> </g> </svg>`;
  tooltip = "Strikethrough";
  setButton = function (editor, button) {
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    original.d = original.d ?? {};
    if (original.d.st != true) {
      button.removeAttribute("selecthighlight");
    } else {
      button.setAttribute("selecthighlight", "");
    }
  }
  js = async function (frame, toolID, extra) {
    await extra.saveSelecting({ d: { st: !(extra.button.hasAttribute("selecthighlight")) } }, true);
    extra.updateToolActions(extra.frame);
  }
};
modules["pages/editor/toolbar/textalign"] = class {
  button = ``;
  tooltip = "Text Alignment";
  options = {
    left: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_815_89" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_815_89)"> <rect x="47" y="171" width="138" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="47" y="111" width="112" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="47" y="51" width="162" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg>`,
    center: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_815_84" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_815_84)"> <rect x="59" y="171" width="138" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="72" y="111" width="112" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="47" y="51" width="162" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg>`,
    right: `<svg width="50" height="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_815_76" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"/> </mask> <g mask="url(#mask0_815_76)"> <rect x="71" y="171" width="138" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="97" y="111" width="112" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> <rect x="47" y="51" width="162" height="34" rx="17" fill="#2F2F2F" stroke="white" stroke-width="12"/> </g> </svg>`
  };
  setButton = function (editor, button) {
    let buttonImg = button.querySelector("div");
    let selectID = Object.keys(editor.selecting)[0];
    let original = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
    original.d = original.d ?? {};
    let selectedAl = original.d.al ?? "left";
    if (selectedAl == "left") {
      buttonImg.innerHTML = this.options.left;
    } else if (selectedAl == "center") {
      buttonImg.innerHTML = this.options.center;
    } else if (selectedAl == "right") {
      buttonImg.innerHTML = this.options.right;
    }
  }
  html = `
    <div class="eSubToolTextAlignContainer">
      <button class="eTool" tooltip="Left Align" left option><div></div></button>
      <button class="eTool" tooltip="Center Align" center option><div></div></button>
      <button class="eTool" tooltip="Right Align" right option><div></div></button>
    </div>
  `;
  css = {
    ".eSubToolTextAlignContainer": `display: flex; width: 100%; height: 50px; gap: 6px; overflow: auto; border-radius: inherit`,
    ".eSubToolTextAlignContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolTextAlignContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolTextAlignContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
  setPreferenceTool = function (editor) {
    let selectKeys = Object.keys(editor.selecting);
    this.preferenceTool = ({ ...((editor.annotations[selectKeys[selectKeys.length - 1]] ?? {}).render ?? {}), ...(editor.selecting[selectKeys[selectKeys.length - 1]] ?? {}) }) ?? {};
  }
  js = async function (frame, toolID, extra) {
    let toolbarModule = this.parent;
    let editor = toolbarModule.parent;
    this.setPreferenceTool(editor);
    this.preferenceTool.d = this.preferenceTool.d ?? {};
    let selectedAl = this.preferenceTool.d.al ?? "left";

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